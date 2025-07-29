/**
 * Extended array utility functions
 */
export declare const groupByKey: <T>(array: T[], key: keyof T) => Record<string, T[]>;
export declare const countByKey: <T>(array: T[], key: keyof T) => Record<string, number>;
export declare const sumBy: <T>(array: T[], key: keyof T) => number;
export declare const averageBy: <T>(array: T[], key: keyof T) => number;
export declare const uniqueBy: <T>(array: T[], key: keyof T) => T[];
export declare const intersectionBy: <T>(array1: T[], array2: T[], key: keyof T) => T[];
export declare const differenceBy: <T>(array1: T[], array2: T[], key: keyof T) => T[];
export declare const unionBy: <T>(array1: T[], array2: T[], key: keyof T) => T[];
export declare const partition: <T>(array: T[], predicate: (item: T) => boolean) => [T[], T[]];
export declare const sample: <T>(array: T[]) => T | undefined;
export declare const sampleSize: <T>(array: T[], n: number) => T[];
export declare const takeWhile: <T>(array: T[], predicate: (item: T) => boolean) => T[];
export declare const dropWhile: <T>(array: T[], predicate: (item: T) => boolean) => T[];
export declare const findIndex: <T>(array: T[], predicate: (item: T) => boolean) => number;
export declare const findLastIndex: <T>(array: T[], predicate: (item: T) => boolean) => number;
export declare const first: <T>(array: T[]) => T | undefined;
export declare const last: <T>(array: T[]) => T | undefined;
export declare const nth: <T>(array: T[], index: number) => T | undefined;
export declare const pull: <T>(array: T[], ...values: T[]) => T[];
export declare const pullAt: <T>(array: T[], indexes: number[]) => T[];
export declare const zip: <T, U>(array1: T[], array2: U[]) => Array<[T, U]>;
export declare const unzip: <T, U>(array: Array<[T, U]>) => [T[], U[]];
export declare const zipWith: <T, U, R>(array1: T[], array2: U[], fn: (a: T, b: U) => R) => R[];
export declare const xor: <T>(array1: T[], array2: T[]) => T[];
export declare const move: <T>(array: T[], fromIndex: number, toIndex: number) => T[];
export declare const transpose: <T>(matrix: T[][]) => T[][];
export declare const isSubset: <T>(subset: T[], superset: T[]) => boolean;
export declare const isSuperset: <T>(superset: T[], subset: T[]) => boolean;
export declare const frequency: <T>(array: T[]) => Map<T, number>;
export declare const mostFrequent: <T>(array: T[]) => T | undefined;
export declare const leastFrequent: <T>(array: T[]) => T | undefined;
