/**
 * Object utility functions
 */

import { camelCase, snakeCase } from "./stringUtils";

export const clone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map((item) => clone(item)) as unknown as T;
  if (obj instanceof Object) {
    const clonedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = clone(obj[key]);
      }
    }
    return clonedObj as T;
  }
  return obj;
};

export const merge = <T extends object, U extends object>(target: T, source: U): T & U => {
  const result = { ...target } as T & U;

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = (result as any)[key];

      if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
        (result as any)[key] = merge(targetValue, sourceValue);
      } else {
        (result as any)[key] = sourceValue;
      }
    }
  }

  return result;
};

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => {
    delete result[key];
  });
  return result;
};

export const get = <T>(obj: any, path: string, defaultValue?: T): T => {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result == null || typeof result !== "object") {
      return defaultValue as T;
    }
    result = result[key];
  }

  return result !== undefined ? result : (defaultValue as T);
};

export const set = (obj: any, path: string, value: any): void => {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== "object") {
      current[key] = {};
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
};

export const has = (obj: any, path: string): boolean => {
  const keys = path.split(".");
  let current = obj;

  for (const key of keys) {
    if (current == null || typeof current !== "object" || !(key in current)) {
      return false;
    }
    current = current[key];
  }

  return true;
};

export const isEmpty = (obj: any): boolean => {
  if (obj == null) return true;
  if (Array.isArray(obj) || typeof obj === "string") return obj.length === 0;
  if (obj instanceof Map || obj instanceof Set) return obj.size === 0;
  return Object.keys(obj).length === 0;
};

export const isEqual = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => isEqual(item, b[index]));
  }

  if (isPlainObject(a) && isPlainObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((key) => isEqual((a as any)[key], (b as any)[key]));
  }

  return false;
};

export const keys = <T extends object>(obj: T): Array<keyof T> => {
  return Object.keys(obj) as Array<keyof T>;
};

export const values = <T extends object>(obj: T): Array<T[keyof T]> => {
  return Object.values(obj);
};

export const entries = <T extends object>(obj: T): Array<[keyof T, T[keyof T]]> => {
  return Object.entries(obj) as Array<[keyof T, T[keyof T]]>;
};

export const fromEntries = <K extends string | number | symbol, V>(entries: Array<[K, V]>): Record<K, V> => {
  return Object.fromEntries(entries) as Record<K, V>;
};

export const mapValues = <T extends object, U>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => U,
): Record<keyof T, U> => {
  const result = {} as Record<keyof T, U>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = fn(obj[key], key);
    }
  }
  return result;
};

export const mapKeys = <T extends object, K extends string | number | symbol>(
  obj: T,
  fn: (value: T[keyof T], key: keyof T) => K,
): Record<K, T[keyof T]> => {
  const result = {} as Record<K, T[keyof T]>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = fn(obj[key], key);
      result[newKey] = obj[key];
    }
  }
  return result;
};

export const invert = <T extends Record<string | number, string | number>>(obj: T): Record<T[keyof T], keyof T> => {
  const result = {} as Record<T[keyof T], keyof T>;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[obj[key]] = key;
    }
  }
  return result;
};

export const groupBy = <T>(array: T[], fn: (item: T) => string | number): Record<string | number, T[]> => {
  return array.reduce((groups, item) => {
    const key = fn(item);
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string | number, T[]>);
};

export const countBy = <T>(array: T[], fn: (item: T) => string | number): Record<string | number, number> => {
  return array.reduce((counts, item) => {
    const key = fn(item);
    counts[key] = (counts[key] || 0) + 1;
    return counts;
  }, {} as Record<string | number, number>);
};

export const indexBy = <T>(array: T[], fn: (item: T) => string | number): Record<string | number, T> => {
  return array.reduce((index, item) => {
    const key = fn(item);
    index[key] = item;
    return index;
  }, {} as Record<string | number, T>);
};

export const flatten = (obj: any, separator: string = "."): Record<string, any> => {
  const result: Record<string, any> = {};

  function flattenRecursive(current: any, prefix: string = "") {
    for (const key in current) {
      if (current.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}${separator}${key}` : key;
        if (isPlainObject(current[key])) {
          flattenRecursive(current[key], newKey);
        } else {
          result[newKey] = current[key];
        }
      }
    }
  }

  flattenRecursive(obj);
  return result;
};

export const unflatten = (obj: Record<string, any>, separator: string = "."): any => {
  const result: any = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      set(result, key.replace(new RegExp(`\\${separator}`, "g"), "."), obj[key]);
    }
  }

  return result;
};

// Helper function
const isPlainObject = (value: any): value is object => {
  return value != null && typeof value === "object" && value.constructor === Object;
};

export const camelCaseObjectKeys = (obj: Record<string, unknown>, deep: boolean = false): Record<string, unknown> => {
  if (!isPlainObject(obj)) return {};
  if (isEmpty(obj)) return {};
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelKey = camelCase(key);
      if (deep && isPlainObject(obj[key])) {
        result[camelKey] = camelCaseObjectKeys(obj[key] as Record<string, unknown>, true);
      } else if (deep && Array.isArray(obj[key])) {
        result[camelKey] = (obj[key] as unknown[]).map((item) =>
          isPlainObject(item) ? camelCaseObjectKeys(item as Record<string, unknown>, true) : item,
        );
      } else {
        result[camelKey] = obj[key];
      }
    }
  }
  return result;
}

export const snakeCaseObjectKeys = (obj: Record<string, unknown>, deep: boolean = false): Record<string, unknown> => {
  if (!isPlainObject(obj)) return {};
  if (isEmpty(obj)) return {};
  const result: Record<string, unknown> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const snakeKey = snakeCase(key);
      if (deep && isPlainObject(obj[key])) {
        result[snakeKey] = snakeCaseObjectKeys(obj[key] as Record<string, unknown>, true);
      } else if (deep && Array.isArray(obj[key])) {
        result[snakeKey] = (obj[key] as unknown[]).map((item) =>
          isPlainObject(item) ? snakeCaseObjectKeys(item as Record<string, unknown>, true) : item,
        );
      } else {
        result[snakeKey] = obj[key];
      }
    }
  }
  return result;
}
