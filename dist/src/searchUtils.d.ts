export declare const searchInArray: <T>(array: T[], key: keyof T, value: string) => T[];
export declare const searchWithMultipleKeys: <T>(array: T[], keys: (keyof T)[], value: string) => T[];
export declare const searchWithCustomComparator: <T>(array: T[], comparator: (item: T) => boolean) => T[];
