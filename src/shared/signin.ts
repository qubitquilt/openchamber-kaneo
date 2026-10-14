import { mountBanner, mountButton, mountSpinner, mountTextField } from "@openchamber/sdk/ui";

import { el } from "./dom";
import { host } from "./host";
import { loadPreferences, savePreferences } from "./preferences";
import {
  describeServiceError,
  pollDeviceSignIn,
  startDeviceSignIn,
  type DevicePoll,
  type DeviceStart,
} from "./service";
import { parseServerUrl } from "./workspace";

/**
 * The Kaneo device-authorization sign-in, the same flow as `kaneo login`: the
 * user names the server, the service asks Kaneo for a code, the user enters it
 * on Kaneo's own page, and the service polls until the token is issued. This
 * draws the server field and the code, and drives the polling; the token never
 * enters the page.
 *
 * Mount it wherever a surface shows its "not connected" state. The server URL
 * is remembered in the extension's own storage. It calls `onConnected` once the
 * service has the token, so the surface can reload. The returned function
 * disposes the polling when the surface unmounts.
 */
export function mountSignIn(root: HTMLElement, onConnected: () => void): () => void {
  let disposed = false;
  let runId = 0;
  let timer: number | null = null;
  let serverUrl = "";

  const clearTimer = () => {
    if (timer !== null) {
      window.clearTimeout(timer);
      timer = null;
    }
  };
  const active = (id: number) => !disposed && id === runId;
  const render = (node: HTMLElement) => {
    if (!disposed) root.replaceChildren(node);
  };

  const renderIdle = (error?: string) => {
    const card = el("div", { className: "signin-card" });
    card.append(
      el(
        "p",
        { className: "signin-hint" },
        "Connect to your Kaneo server. You will get a code to enter on Kaneo's own sign-in page.",
      ),
    );
    const fieldHolder = el("div", { className: "signin-field" });
    card.append(fieldHolder);
    mountTextField(fieldHolder, {
      label: "Kaneo server URL",
      value: serverUrl,
      placeholder: "https://cloud.kaneo.app",
      mono: true,
      ...(error ? { error } : { helper: "Optional. Defaults to the bundled origin." }),
      onChange: (value) => {
        serverUrl = value;
      },
    });
    const row = el("div", { className: "signin-row" });
    card.append(row);
    mountButton(row, {
      label: "Sign in with Kaneo",
      size: "sm",
      onClick: () => void begin(),
    });
    render(card);
  };

  const showIdle = async () => {
    const id = ++runId;
    clearTimer();
    const preferences = await loadPreferences().catch(() => null);
    if (!active(id)) return;
    serverUrl = preferences?.serverUrl ?? "";
    renderIdle();
  };

  const showError = (message: string, id: number) => {
    if (!active(id)) return;
    clearTimer();
    const holder = el("div", { className: "signin-fill" });
    mountBanner(holder, {
      tone: "error",
      title: "Kaneo",
      body: message,
      action: { label: "Start again", onClick: () => void showIdle() },
    });
    render(holder);
  };

  const showCode = (started: DeviceStart, id: number) => {
    if (!active(id)) return;
    const card = el("div", { className: "signin-card" });
    card.append(
      el("p", { className: "signin-hint" }, "Enter this code in your browser to sign in to Kaneo"),
    );
    card.append(el("div", { className: "signin-code" }, started.userCode));
    const row = el("div", { className: "signin-row" });
    card.append(row);
    mountButton(row, {
      label: "Open Kaneo",
      variant: "secondary",
      size: "sm",
      onClick: () => void host.openUrl(started.verificationUriComplete),
    });
    mountButton(row, {
      label: "Cancel",
      variant: "ghost",
      size: "sm",
      onClick: () => void showIdle(),
    });
    const waiting = el("div", { className: "signin-waiting" });
    card.append(waiting);
    mountSpinner(waiting, { label: "Waiting for approval" });
    render(card);
  };

  const schedule = (id: number, seconds: number) => {
    clearTimer();
    timer = window.setTimeout(() => void poll(id), Math.max(seconds, 3) * 1000);
  };

  const poll = async (id: number) => {
    if (!active(id)) return;
    let result: DevicePoll;
    try {
      result = await pollDeviceSignIn();
    } catch (error) {
      showError(describeServiceError(error), id);
      return;
    }
    if (!active(id)) return;
    switch (result.status) {
      case "pending":
        schedule(id, result.interval);
        return;
      case "connected":
        clearTimer();
        onConnected();
        return;
      case "expired":
        showError("The code expired. Start again.", id);
        return;
      case "denied":
        showError("Sign-in was denied on Kaneo.", id);
        return;
      default:
        showError(result.message, id);
    }
  };

  const begin = async (): Promise<void> => {
    const parsed = parseServerUrl(serverUrl);
    if (parsed.error) {
      renderIdle(parsed.error);
      return;
    }
    const id = ++runId;
    clearTimer();
    await savePreferences({ serverUrl: serverUrl.trim() }).catch(() => undefined);
    if (!active(id)) return;
    const holder = el("div", { className: "signin-fill" });
    mountSpinner(holder, { label: "Starting sign-in" });
    render(holder);
    let started: DeviceStart;
    try {
      started = await startDeviceSignIn(parsed.origin);
    } catch (error) {
      showError(describeServiceError(error), id);
      return;
    }
    if (!active(id)) return;
    showCode(started, id);
    schedule(id, started.interval);
    void host.openUrl(started.verificationUriComplete).catch(() => undefined);
  };

  void showIdle();
  return () => {
    disposed = true;
    clearTimer();
  };
}
