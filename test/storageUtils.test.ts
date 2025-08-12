import {
  safeLocalStorage,
  safeSessionStorage,
  setJSON,
  getJSON,
  remove,
  clear,
  namespacedStorage,
} from "../src/storageUtils";
import { describe, test, expect } from "@jest/globals";

describe("StorageUtils", () => {
  test("safe storages are usable", () => {
    safeLocalStorage.setItem("k", "v");
    expect(safeLocalStorage.getItem("k")).toBe("v");
    safeLocalStorage.removeItem("k");
    expect(safeLocalStorage.getItem("k")).toBeNull();

    safeSessionStorage.setItem("k", "v");
    expect(safeSessionStorage.getItem("k")).toBe("v");
  });

  test("JSON helpers", () => {
    setJSON(safeLocalStorage, "obj", { a: 1 });
    expect(getJSON(safeLocalStorage, "obj", { a: 0 })).toEqual({ a: 1 });
    expect(getJSON(safeLocalStorage, "missing", { b: 2 })).toEqual({ b: 2 });
  // invalid JSON should fallback
  safeLocalStorage.setItem("bad", "{invalid}");
  expect(getJSON(safeLocalStorage, "bad", { ok: false })).toEqual({ ok: false });
  });

  test("remove and clear", () => {
    safeLocalStorage.setItem("a", "1");
    remove(safeLocalStorage, "a");
    expect(safeLocalStorage.getItem("a")).toBeNull();

    safeLocalStorage.setItem("a", "1");
    safeLocalStorage.setItem("b", "2");
    clear(safeLocalStorage);
    expect(safeLocalStorage.getItem("a")).toBeNull();
    expect(safeLocalStorage.getItem("b")).toBeNull();
  });

  test("namespaced storage", () => {
    const ns = namespacedStorage(safeLocalStorage, "app");
    ns.set("x", "1");
    expect(ns.get("x")).toBe("1");
    ns.setJSON("y", { c: 3 });
    expect(ns.getJSON("y", { c: 0 })).toEqual({ c: 3 });
    ns.remove("x");
    expect(ns.get("x")).toBeNull();
  });

  test("session storage works similarly", () => {
    safeSessionStorage.setItem("s", "1");
    expect(safeSessionStorage.getItem("s")).toBe("1");
    setJSON(safeSessionStorage, "j", { k: 2 });
    expect(getJSON(safeSessionStorage, "j", { k: 0 })).toEqual({ k: 2 });
    clear(safeSessionStorage);
    expect(safeSessionStorage.getItem("s")).toBeNull();
  });

  test("falls back to in-memory storage if native storage fails", () => {
    const originalLS = (global as any).window?.localStorage;
    (global as any).window.localStorage = {
      getItem() {
        return null;
      },
      setItem() {
        throw new Error("fail");
      },
      removeItem() {},
      clear() {},
    } as any;

    jest.isolateModules(() => {
      // Re-import module to re-run createSafeStorage with failing localStorage
      const mod = require("../src/storageUtils");
      const ls = mod.safeLocalStorage as Storage;
      // Should not throw and should store/retrieve values (in-memory fallback)
      ls.setItem("t", "1");
      expect(ls.getItem("t")).toBe("1");
      ls.removeItem("t");
      expect(ls.getItem("t")).toBeNull();
    });

    // restore
    (global as any).window.localStorage = originalLS;
  });
});
