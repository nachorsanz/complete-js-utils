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
});
