import { host } from "./host";
import { describeServiceError, signOutOfKaneo } from "./service";

/**
 * Drop the stored Kaneo token. The token lives in the local service, so this
 * is a call to it rather than the host's integration session.
 */
export async function disconnect(): Promise<void> {
  try {
    await signOutOfKaneo();
  } catch (error) {
    console.error("Disconnect Kaneo failed:", error);
    await host.toast({
      kind: "error",
      message: `Could not disconnect from Kaneo. ${describeServiceError(error)}`,
      dismiss: true,
    });
  }
}
