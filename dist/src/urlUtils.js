"use strict";
/**
 * URL utility functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAudioUrl = exports.isVideoUrl = exports.isImageUrl = exports.removeFileExtension = exports.getFileExtension = exports.decodeQueryString = exports.encodeQueryString = exports.makeInsecure = exports.makeSecure = exports.isSecure = exports.isSameDomain = exports.isSameOrigin = exports.makeAbsolute = exports.isRelativeUrl = exports.isAbsoluteUrl = exports.joinPaths = exports.buildUrl = exports.getHash = exports.getPath = exports.getPort = exports.getProtocol = exports.getDomain = exports.clearQueryParams = exports.hasQueryParam = exports.getQueryParam = exports.removeQueryParams = exports.addQueryParams = exports.getQueryParams = exports.isValidUrl = exports.parseUrl = void 0;
const parseUrl = (url) => {
    try {
        return new URL(url);
    }
    catch (_a) {
        return null;
    }
};
exports.parseUrl = parseUrl;
const isValidUrl = (url) => {
    return (0, exports.parseUrl)(url) !== null;
};
exports.isValidUrl = isValidUrl;
const getQueryParams = (url) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    if (!parsedUrl)
        return {};
    const params = {};
    parsedUrl.searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
};
exports.getQueryParams = getQueryParams;
const addQueryParams = (url, params) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    if (!parsedUrl)
        return url;
    Object.entries(params).forEach(([key, value]) => {
        parsedUrl.searchParams.set(key, value);
    });
    return parsedUrl.toString();
};
exports.addQueryParams = addQueryParams;
const removeQueryParams = (url, paramNames) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    if (!parsedUrl)
        return url;
    paramNames.forEach((name) => {
        parsedUrl.searchParams.delete(name);
    });
    return parsedUrl.toString();
};
exports.removeQueryParams = removeQueryParams;
const getQueryParam = (url, paramName) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    if (!parsedUrl)
        return null;
    return parsedUrl.searchParams.get(paramName);
};
exports.getQueryParam = getQueryParam;
const hasQueryParam = (url, paramName) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    if (!parsedUrl)
        return false;
    return parsedUrl.searchParams.has(paramName);
};
exports.hasQueryParam = hasQueryParam;
const clearQueryParams = (url) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    if (!parsedUrl)
        return url;
    parsedUrl.search = "";
    return parsedUrl.toString();
};
exports.clearQueryParams = clearQueryParams;
const getDomain = (url) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    return parsedUrl ? parsedUrl.hostname : null;
};
exports.getDomain = getDomain;
const getProtocol = (url) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    return parsedUrl ? parsedUrl.protocol : null;
};
exports.getProtocol = getProtocol;
const getPort = (url) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    return parsedUrl ? parsedUrl.port : null;
};
exports.getPort = getPort;
const getPath = (url) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    return parsedUrl ? parsedUrl.pathname : null;
};
exports.getPath = getPath;
const getHash = (url) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    return parsedUrl ? parsedUrl.hash : null;
};
exports.getHash = getHash;
const buildUrl = (options) => {
    const url = new URL(`${options.protocol || "https"}://${options.hostname}`);
    if (options.port) {
        url.port = String(options.port);
    }
    if (options.pathname) {
        url.pathname = options.pathname;
    }
    if (options.search) {
        url.search = options.search.startsWith("?") ? options.search : `?${options.search}`;
    }
    if (options.hash) {
        url.hash = options.hash.startsWith("#") ? options.hash : `#${options.hash}`;
    }
    return url.toString();
};
exports.buildUrl = buildUrl;
const joinPaths = (...paths) => {
    return paths
        .map((path) => path.replace(/^\/+|\/+$/g, ""))
        .filter((path) => path.length > 0)
        .join("/");
};
exports.joinPaths = joinPaths;
const isAbsoluteUrl = (url) => {
    return /^https?:\/\//i.test(url);
};
exports.isAbsoluteUrl = isAbsoluteUrl;
const isRelativeUrl = (url) => {
    return !(0, exports.isAbsoluteUrl)(url);
};
exports.isRelativeUrl = isRelativeUrl;
const makeAbsolute = (relativeUrl, baseUrl) => {
    if ((0, exports.isAbsoluteUrl)(relativeUrl)) {
        return relativeUrl;
    }
    try {
        return new URL(relativeUrl, baseUrl).toString();
    }
    catch (_a) {
        return relativeUrl;
    }
};
exports.makeAbsolute = makeAbsolute;
const isSameOrigin = (url1, url2) => {
    const parsed1 = (0, exports.parseUrl)(url1);
    const parsed2 = (0, exports.parseUrl)(url2);
    if (!parsed1 || !parsed2)
        return false;
    return parsed1.origin === parsed2.origin;
};
exports.isSameOrigin = isSameOrigin;
const isSameDomain = (url1, url2) => {
    const parsed1 = (0, exports.parseUrl)(url1);
    const parsed2 = (0, exports.parseUrl)(url2);
    if (!parsed1 || !parsed2)
        return false;
    return parsed1.hostname === parsed2.hostname;
};
exports.isSameDomain = isSameDomain;
const isSecure = (url) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    return parsedUrl ? parsedUrl.protocol === "https:" : false;
};
exports.isSecure = isSecure;
const makeSecure = (url) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    if (!parsedUrl)
        return url;
    parsedUrl.protocol = "https:";
    return parsedUrl.toString();
};
exports.makeSecure = makeSecure;
const makeInsecure = (url) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    if (!parsedUrl)
        return url;
    parsedUrl.protocol = "http:";
    return parsedUrl.toString();
};
exports.makeInsecure = makeInsecure;
const encodeQueryString = (params) => {
    return Object.entries(params)
        .map(([key, value]) => {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(String(value));
        return `${encodedKey}=${encodedValue}`;
    })
        .join("&");
};
exports.encodeQueryString = encodeQueryString;
const decodeQueryString = (queryString) => {
    const params = {};
    const cleanQuery = queryString.replace(/^\?/, "");
    if (!cleanQuery)
        return params;
    cleanQuery.split("&").forEach((pair) => {
        const [key, value] = pair.split("=").map(decodeURIComponent);
        if (key) {
            params[key] = value || "";
        }
    });
    return params;
};
exports.decodeQueryString = decodeQueryString;
const getFileExtension = (url) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    if (!parsedUrl)
        return null;
    const pathname = parsedUrl.pathname;
    const lastDot = pathname.lastIndexOf(".");
    if (lastDot === -1)
        return null;
    return pathname.slice(lastDot + 1);
};
exports.getFileExtension = getFileExtension;
const removeFileExtension = (url) => {
    const parsedUrl = (0, exports.parseUrl)(url);
    if (!parsedUrl)
        return url;
    const pathname = parsedUrl.pathname;
    const lastDot = pathname.lastIndexOf(".");
    if (lastDot !== -1) {
        parsedUrl.pathname = pathname.slice(0, lastDot);
    }
    return parsedUrl.toString();
};
exports.removeFileExtension = removeFileExtension;
const isImageUrl = (url) => {
    const extension = (0, exports.getFileExtension)(url);
    if (!extension)
        return false;
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"];
    return imageExtensions.includes(extension.toLowerCase());
};
exports.isImageUrl = isImageUrl;
const isVideoUrl = (url) => {
    const extension = (0, exports.getFileExtension)(url);
    if (!extension)
        return false;
    const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"];
    return videoExtensions.includes(extension.toLowerCase());
};
exports.isVideoUrl = isVideoUrl;
const isAudioUrl = (url) => {
    const extension = (0, exports.getFileExtension)(url);
    if (!extension)
        return false;
    const audioExtensions = ["mp3", "wav", "ogg", "aac", "flac", "m4a"];
    return audioExtensions.includes(extension.toLowerCase());
};
exports.isAudioUrl = isAudioUrl;
