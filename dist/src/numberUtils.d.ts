/**
 * Number utility functions
 */
export declare const clamp: (num: number, min: number, max: number) => number;
export declare const random: (min: number, max: number) => number;
export declare const randomInt: (min: number, max: number) => number;
export declare const round: (num: number, decimals?: number) => number;
export declare const toFixed: (num: number, decimals: number) => string;
export declare const isEven: (num: number) => boolean;
export declare const isOdd: (num: number) => boolean;
export declare const isPrime: (num: number) => boolean;
export declare const factorial: (num: number) => number;
export declare const fibonacci: (n: number) => number;
export declare const gcd: (a: number, b: number) => number;
export declare const lcm: (a: number, b: number) => number;
export declare const percentage: (value: number, total: number) => number;
export declare const percentageOf: (percent: number, total: number) => number;
export declare const average: (numbers: number[]) => number;
export declare const median: (numbers: number[]) => number;
export declare const mode: (numbers: number[]) => number[];
export declare const sum: (numbers: number[]) => number;
export declare const product: (numbers: number[]) => number;
export declare const max: (numbers: number[]) => number;
export declare const min: (numbers: number[]) => number;
export declare const range: (numbers: number[]) => number;
export declare const standardDeviation: (numbers: number[]) => number;
export declare const variance: (numbers: number[]) => number;
export declare const toRadians: (degrees: number) => number;
export declare const toDegrees: (radians: number) => number;
export declare const formatNumber: (num: number, locale?: string) => string;
export declare const formatCurrency: (num: number, currency?: string, locale?: string) => string;
export declare const formatPercent: (num: number, locale?: string) => string;
export declare const lerp: (start: number, end: number, t: number) => number;
export declare const map: (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => number;
export declare const inRange: (num: number, min: number, max: number) => boolean;
