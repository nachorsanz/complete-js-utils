/**
 * Object utility functions
 */
export declare const clone: <T>(obj: T) => T;
export declare const merge: <T extends object, U extends object>(target: T, source: U) => T & U;
export declare const pick: <T extends object, K extends keyof T>(obj: T, keys: K[]) => Pick<T, K>;
export declare const omit: <T extends object, K extends keyof T>(obj: T, keys: K[]) => Omit<T, K>;
export declare const get: <T>(obj: any, path: string, defaultValue?: T) => T;
export declare const set: (obj: any, path: string, value: any) => void;
export declare const has: (obj: any, path: string) => boolean;
export declare const isEmpty: (obj: any) => boolean;
export declare const isEqual: (a: any, b: any) => boolean;
export declare const keys: <T extends object>(obj: T) => Array<keyof T>;
export declare const values: <T extends object>(obj: T) => Array<T[keyof T]>;
export declare const entries: <T extends object>(obj: T) => Array<[keyof T, T[keyof T]]>;
export declare const fromEntries: <K extends string | number | symbol, V>(entries: Array<[K, V]>) => Record<K, V>;
export declare const mapValues: <T extends object, U>(obj: T, fn: (value: T[keyof T], key: keyof T) => U) => Record<keyof T, U>;
export declare const mapKeys: <T extends object, K extends string | number | symbol>(obj: T, fn: (value: T[keyof T], key: keyof T) => K) => Record<K, T[keyof T]>;
export declare const invert: <T extends Record<string | number, string | number>>(obj: T) => Record<T[keyof T], keyof T>;
export declare const groupBy: <T>(array: T[], fn: (item: T) => string | number) => Record<string | number, T[]>;
export declare const countBy: <T>(array: T[], fn: (item: T) => string | number) => Record<string | number, number>;
export declare const indexBy: <T>(array: T[], fn: (item: T) => string | number) => Record<string | number, T>;
export declare const flatten: (obj: any, separator?: string) => Record<string, any>;
export declare const unflatten: (obj: Record<string, any>, separator?: string) => any;
