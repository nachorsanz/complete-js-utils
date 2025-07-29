/**
 * URL utility functions
 */

export const parseUrl = (url: string): URL | null => {
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

export const isValidUrl = (url: string): boolean => {
  return parseUrl(url) !== null;
};

export const getQueryParams = (url: string): Record<string, string> => {
  const parsedUrl = parseUrl(url);
  if (!parsedUrl) return {};

  const params: Record<string, string> = {};
  parsedUrl.searchParams.forEach((value, key) => {
    params[key] = value;
  });

  return params;
};

export const addQueryParams = (url: string, params: Record<string, string>): string => {
  const parsedUrl = parseUrl(url);
  if (!parsedUrl) return url;

  Object.entries(params).forEach(([key, value]) => {
    parsedUrl.searchParams.set(key, value);
  });

  return parsedUrl.toString();
};

export const removeQueryParams = (url: string, paramNames: string[]): string => {
  const parsedUrl = parseUrl(url);
  if (!parsedUrl) return url;

  paramNames.forEach((name) => {
    parsedUrl.searchParams.delete(name);
  });

  return parsedUrl.toString();
};

export const getQueryParam = (url: string, paramName: string): string | null => {
  const parsedUrl = parseUrl(url);
  if (!parsedUrl) return null;

  return parsedUrl.searchParams.get(paramName);
};

export const hasQueryParam = (url: string, paramName: string): boolean => {
  const parsedUrl = parseUrl(url);
  if (!parsedUrl) return false;

  return parsedUrl.searchParams.has(paramName);
};

export const clearQueryParams = (url: string): string => {
  const parsedUrl = parseUrl(url);
  if (!parsedUrl) return url;

  parsedUrl.search = "";
  return parsedUrl.toString();
};

export const getDomain = (url: string): string | null => {
  const parsedUrl = parseUrl(url);
  return parsedUrl ? parsedUrl.hostname : null;
};

export const getProtocol = (url: string): string | null => {
  const parsedUrl = parseUrl(url);
  return parsedUrl ? parsedUrl.protocol : null;
};

export const getPort = (url: string): string | null => {
  const parsedUrl = parseUrl(url);
  return parsedUrl ? parsedUrl.port : null;
};

export const getPath = (url: string): string | null => {
  const parsedUrl = parseUrl(url);
  return parsedUrl ? parsedUrl.pathname : null;
};

export const getHash = (url: string): string | null => {
  const parsedUrl = parseUrl(url);
  return parsedUrl ? parsedUrl.hash : null;
};

export const buildUrl = (options: {
  protocol?: string;
  hostname: string;
  port?: string | number;
  pathname?: string;
  search?: string;
  hash?: string;
}): string => {
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

export const joinPaths = (...paths: string[]): string => {
  return paths
    .map((path) => path.replace(/^\/+|\/+$/g, ""))
    .filter((path) => path.length > 0)
    .join("/");
};

export const isAbsoluteUrl = (url: string): boolean => {
  return /^https?:\/\//i.test(url);
};

export const isRelativeUrl = (url: string): boolean => {
  return !isAbsoluteUrl(url);
};

export const makeAbsolute = (relativeUrl: string, baseUrl: string): string => {
  if (isAbsoluteUrl(relativeUrl)) {
    return relativeUrl;
  }

  try {
    return new URL(relativeUrl, baseUrl).toString();
  } catch {
    return relativeUrl;
  }
};

export const isSameOrigin = (url1: string, url2: string): boolean => {
  const parsed1 = parseUrl(url1);
  const parsed2 = parseUrl(url2);

  if (!parsed1 || !parsed2) return false;

  return parsed1.origin === parsed2.origin;
};

export const isSameDomain = (url1: string, url2: string): boolean => {
  const parsed1 = parseUrl(url1);
  const parsed2 = parseUrl(url2);

  if (!parsed1 || !parsed2) return false;

  return parsed1.hostname === parsed2.hostname;
};

export const isSecure = (url: string): boolean => {
  const parsedUrl = parseUrl(url);
  return parsedUrl ? parsedUrl.protocol === "https:" : false;
};

export const makeSecure = (url: string): string => {
  const parsedUrl = parseUrl(url);
  if (!parsedUrl) return url;

  parsedUrl.protocol = "https:";
  return parsedUrl.toString();
};

export const makeInsecure = (url: string): string => {
  const parsedUrl = parseUrl(url);
  if (!parsedUrl) return url;

  parsedUrl.protocol = "http:";
  return parsedUrl.toString();
};

export const encodeQueryString = (params: Record<string, any>): string => {
  return Object.entries(params)
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(String(value));
      return `${encodedKey}=${encodedValue}`;
    })
    .join("&");
};

export const decodeQueryString = (queryString: string): Record<string, string> => {
  const params: Record<string, string> = {};
  const cleanQuery = queryString.replace(/^\?/, "");

  if (!cleanQuery) return params;

  cleanQuery.split("&").forEach((pair) => {
    const [key, value] = pair.split("=").map(decodeURIComponent);
    if (key) {
      params[key] = value || "";
    }
  });

  return params;
};

export const getFileExtension = (url: string): string | null => {
  const parsedUrl = parseUrl(url);
  if (!parsedUrl) return null;

  const pathname = parsedUrl.pathname;
  const lastDot = pathname.lastIndexOf(".");

  if (lastDot === -1) return null;

  return pathname.slice(lastDot + 1);
};

export const removeFileExtension = (url: string): string => {
  const parsedUrl = parseUrl(url);
  if (!parsedUrl) return url;

  const pathname = parsedUrl.pathname;
  const lastDot = pathname.lastIndexOf(".");

  if (lastDot !== -1) {
    parsedUrl.pathname = pathname.slice(0, lastDot);
  }

  return parsedUrl.toString();
};

export const isImageUrl = (url: string): boolean => {
  const extension = getFileExtension(url);
  if (!extension) return false;

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico"];
  return imageExtensions.includes(extension.toLowerCase());
};

export const isVideoUrl = (url: string): boolean => {
  const extension = getFileExtension(url);
  if (!extension) return false;

  const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"];
  return videoExtensions.includes(extension.toLowerCase());
};

export const isAudioUrl = (url: string): boolean => {
  const extension = getFileExtension(url);
  if (!extension) return false;

  const audioExtensions = ["mp3", "wav", "ogg", "aac", "flac", "m4a"];
  return audioExtensions.includes(extension.toLowerCase());
};
