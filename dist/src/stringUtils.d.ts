/**
 * String utility functions
 */
export declare const capitalize: (str: string) => string;
export declare const camelCase: (str: string) => string;
export declare const kebabCase: (str: string) => string;
export declare const snakeCase: (str: string) => string;
export declare const pascalCase: (str: string) => string;
export declare const titleCase: (str: string) => string;
export declare const reverse: (str: string) => string;
export declare const truncate: (str: string, length: number, suffix?: string) => string;
export declare const padStart: (str: string, targetLength: number, padString?: string) => string;
export declare const padEnd: (str: string, targetLength: number, padString?: string) => string;
export declare const removeAccents: (str: string) => string;
export declare const slugify: (str: string) => string;
export declare const extractNumbers: (str: string) => number[];
export declare const countWords: (str: string) => number;
export declare const countCharacters: (str: string, includeSpaces?: boolean) => number;
export declare const isEmail: (str: string) => boolean;
export declare const isUrl: (str: string) => boolean;
export declare const maskString: (str: string, maskChar?: string, visibleStart?: number, visibleEnd?: number) => string;
export declare const randomString: (length: number, chars?: string) => string;
export declare const escapeHtml: (str: string) => string;
export declare const unescapeHtml: (str: string) => string;
export declare const stripHtml: (str: string) => string;
export declare const highlightText: (text: string, searchTerm: string, highlightClass?: string) => string;
