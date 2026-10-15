/** Minimal storage interface so tests can inject a mock. */
export interface StorageStore {
  get(key: string): Promise<unknown> | unknown;
  set(key: string, value: unknown): Promise<void> | void;
  delete(key: string): Promise<void> | void;
}

/** Shared storage helpers used by preferences and workspace. Every read passes
 * through a sanitizer; every write strips non-JSON values. */
export async function read<T>(
  key: string,
  sanitize: (raw: unknown) => T,
  store: StorageStore,
): Promise<T> {
  try {
    return sanitize(await store.get(key));
  } catch (e) {
    console.warn(`Storage read failed for key "${key}":`, e);
    return sanitize(undefined);
  }
}

export async function write<T>(key: string, value: T, store: StorageStore): Promise<void> {
  try {
    const plain = JSON.parse(JSON.stringify(value));
    await store.set(key, plain);
  } catch (e) {
    console.warn(`Storage write failed for key "${key}":`, e);
  }
}
