/**
 * Color utility functions
 */
export interface RGB {
    r: number;
    g: number;
    b: number;
}
export interface HSL {
    h: number;
    s: number;
    l: number;
}
export interface HSV {
    h: number;
    s: number;
    v: number;
}
export declare const hexToRgb: (hex: string) => RGB | null;
export declare const rgbToHex: (r: number, g: number, b: number) => string;
export declare const rgbToHsl: (r: number, g: number, b: number) => HSL;
export declare const hslToRgb: (h: number, s: number, l: number) => RGB;
export declare const rgbToHsv: (r: number, g: number, b: number) => HSV;
export declare const hsvToRgb: (h: number, s: number, v: number) => RGB;
export declare const lighten: (hex: string, amount: number) => string;
export declare const darken: (hex: string, amount: number) => string;
export declare const saturate: (hex: string, amount: number) => string;
export declare const desaturate: (hex: string, amount: number) => string;
export declare const complement: (hex: string) => string;
export declare const analogous: (hex: string, angle?: number) => string[];
export declare const triadic: (hex: string) => string[];
export declare const tetradic: (hex: string) => string[];
export declare const monochromatic: (hex: string, steps?: number) => string[];
export declare const getContrast: (hex1: string, hex2: string) => number;
export declare const isLight: (hex: string) => boolean;
export declare const isDark: (hex: string) => boolean;
export declare const randomColor: () => string;
export declare const rgbString: (r: number, g: number, b: number, a?: number) => string;
export declare const hslString: (h: number, s: number, l: number, a?: number) => string;
