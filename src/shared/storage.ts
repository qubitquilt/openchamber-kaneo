import { host } from "./host";

/** Shared storage helpers used by preferences and workspace. Every read passes
 * through a sanitizer; every write strips non-JSON values. */
export async function read<T>(key: string, sanitize: (raw: unknown) => T): Promise<T> {
  try {
    return sanitize(await host.storage.get(key));
  } catch {
    return sanitize(undefined);
  }
}

export async function write<T>(key: string, value: T): Promise<void> {
  try {
    const plain = JSON.parse(JSON.stringify(value));
    await host.storage.set(key, plain);
  } catch {
    // Storage is a convenience. A full namespace must not break a surface.
  }
}
