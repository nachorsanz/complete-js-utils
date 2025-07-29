/**
 * URL utility functions
 */
export declare const parseUrl: (url: string) => URL | null;
export declare const isValidUrl: (url: string) => boolean;
export declare const getQueryParams: (url: string) => Record<string, string>;
export declare const addQueryParams: (url: string, params: Record<string, string>) => string;
export declare const removeQueryParams: (url: string, paramNames: string[]) => string;
export declare const getQueryParam: (url: string, paramName: string) => string | null;
export declare const hasQueryParam: (url: string, paramName: string) => boolean;
export declare const clearQueryParams: (url: string) => string;
export declare const getDomain: (url: string) => string | null;
export declare const getProtocol: (url: string) => string | null;
export declare const getPort: (url: string) => string | null;
export declare const getPath: (url: string) => string | null;
export declare const getHash: (url: string) => string | null;
export declare const buildUrl: (options: {
    protocol?: string;
    hostname: string;
    port?: string | number;
    pathname?: string;
    search?: string;
    hash?: string;
}) => string;
export declare const joinPaths: (...paths: string[]) => string;
export declare const isAbsoluteUrl: (url: string) => boolean;
export declare const isRelativeUrl: (url: string) => boolean;
export declare const makeAbsolute: (relativeUrl: string, baseUrl: string) => string;
export declare const isSameOrigin: (url1: string, url2: string) => boolean;
export declare const isSameDomain: (url1: string, url2: string) => boolean;
export declare const isSecure: (url: string) => boolean;
export declare const makeSecure: (url: string) => string;
export declare const makeInsecure: (url: string) => string;
export declare const encodeQueryString: (params: Record<string, any>) => string;
export declare const decodeQueryString: (queryString: string) => Record<string, string>;
export declare const getFileExtension: (url: string) => string | null;
export declare const removeFileExtension: (url: string) => string;
export declare const isImageUrl: (url: string) => boolean;
export declare const isVideoUrl: (url: string) => boolean;
export declare const isAudioUrl: (url: string) => boolean;
