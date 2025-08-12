/**
 * Storage utilities: safe wrappers around localStorage/sessionStorage + in-memory fallback
 */

export type StorageLike = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
};

const hasWindow = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

export class MemoryStorage implements StorageLike {
  private store = new Map<string, string>();
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  clear(): void {
    this.store.clear();
  }
}

export const createSafeStorage = (storage: StorageLike | null): StorageLike => {
  if (!storage) return new MemoryStorage();
  try {
    const testKey = "__test__";
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return storage;
  } catch {
    return new MemoryStorage();
  }
};

export const safeLocalStorage: StorageLike = createSafeStorage(hasWindow ? window.localStorage : null);
export const safeSessionStorage: StorageLike = createSafeStorage(hasWindow ? window.sessionStorage : null);

export const setJSON = (storage: StorageLike, key: string, value: unknown): void => {
  storage.setItem(key, JSON.stringify(value));
};

export const getJSON = <T>(storage: StorageLike, key: string, fallback: T): T => {
  const raw = storage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

export const remove = (storage: StorageLike, key: string): void => storage.removeItem(key);
export const clear = (storage: StorageLike): void => storage.clear();

export const namespacedStorage = (storage: StorageLike, namespace: string) => {
  const prefix = `${namespace}::`;
  const withNs = (key: string) => `${prefix}${key}`;
  return {
    set: (key: string, value: string) => storage.setItem(withNs(key), value),
    get: (key: string) => storage.getItem(withNs(key)),
    setJSON: (key: string, value: unknown) => setJSON(storage, withNs(key), value),
    getJSON: <T>(key: string, fallback: T) => getJSON<T>(storage, withNs(key), fallback),
    remove: (key: string) => storage.removeItem(withNs(key)),
  };
};
