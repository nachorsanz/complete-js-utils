import {
  parseUrl,
  isValidUrl,
  getQueryParams,
  addQueryParams,
  removeQueryParams,
  getQueryParam,
  hasQueryParam,
  clearQueryParams,
  getDomain,
  getProtocol,
  getPort,
  getPath,
  getHash,
  buildUrl,
  joinPaths,
  isAbsoluteUrl,
  isRelativeUrl,
  makeAbsolute,
  isSameOrigin,
  isSameDomain,
  isSecure,
  makeSecure,
  makeInsecure,
  encodeQueryString,
  decodeQueryString,
  getFileExtension,
  removeFileExtension,
  isImageUrl,
  isVideoUrl,
  isAudioUrl,
} from "../src/urlUtils";

describe("UrlUtils", () => {
  describe("parseUrl", () => {
    it("should parse valid URLs", () => {
      const url = parseUrl("https://example.com/path?query=1#hash");
      expect(url).toBeInstanceOf(URL);
      expect(url?.hostname).toBe("example.com");
      expect(url?.pathname).toBe("/path");
      expect(url?.search).toBe("?query=1");
      expect(url?.hash).toBe("#hash");
    });

    it("should return null for invalid URLs", () => {
      expect(parseUrl("invalid-url")).toBeNull();
      expect(parseUrl("")).toBeNull();
      expect(parseUrl("http://")).toBeNull();
    });
  });

  describe("isValidUrl", () => {
    it("should validate URLs", () => {
      expect(isValidUrl("https://example.com")).toBe(true);
      expect(isValidUrl("http://test.org")).toBe(true);
      expect(isValidUrl("ftp://files.example.com")).toBe(true);
      expect(isValidUrl("invalid-url")).toBe(false);
      expect(isValidUrl("")).toBe(false);
    });
  });

  describe("getQueryParams", () => {
    it("should extract query parameters", () => {
      const params = getQueryParams("https://example.com?name=John&age=30&city=NYC");
      expect(params).toEqual({
        name: "John",
        age: "30",
        city: "NYC",
      });
    });

    it("should handle URLs without query params", () => {
      expect(getQueryParams("https://example.com")).toEqual({});
      expect(getQueryParams("https://example.com/path")).toEqual({});
    });

    it("should handle invalid URLs", () => {
      expect(getQueryParams("invalid-url")).toEqual({});
    });
  });

  describe("addQueryParams", () => {
    it("should add query parameters", () => {
      const result = addQueryParams("https://example.com", { name: "John", age: "30" });
      expect(result).toContain("name=John");
      expect(result).toContain("age=30");
      expect(result).toContain("https://example.com");
    });

    it("should handle existing query parameters", () => {
      const result = addQueryParams("https://example.com?existing=value", { new: "param" });
      expect(result).toContain("existing=value");
      expect(result).toContain("new=param");
    });

    it("should return original URL if invalid", () => {
      const invalidUrl = "invalid-url";
      expect(addQueryParams(invalidUrl, { test: "value" })).toBe(invalidUrl);
    });
  });

  describe("removeQueryParams", () => {
    it("should remove specified query parameters", () => {
      const result = removeQueryParams("https://example.com?name=John&age=30&city=NYC", ["age", "city"]);
      expect(result).toContain("name=John");
      expect(result).not.toContain("age=30");
      expect(result).not.toContain("city=NYC");
    });

    it("should handle non-existent parameters", () => {
      const result = removeQueryParams("https://example.com?name=John", ["nonexistent"]);
      expect(result).toContain("name=John");
    });

    it("should return original URL if invalid", () => {
      const invalidUrl = "invalid-url";
      expect(removeQueryParams(invalidUrl, ["test"])).toBe(invalidUrl);
    });
  });

  describe("getQueryParam", () => {
    it("should get specific query parameter", () => {
      const url = "https://example.com?name=John&age=30";
      expect(getQueryParam(url, "name")).toBe("John");
      expect(getQueryParam(url, "age")).toBe("30");
      expect(getQueryParam(url, "nonexistent")).toBeNull();
    });

    it("should return null for invalid URLs", () => {
      expect(getQueryParam("invalid-url", "test")).toBeNull();
    });
  });

  describe("hasQueryParam", () => {
    it("should check if query parameter exists", () => {
      const url = "https://example.com?name=John&age=30";
      expect(hasQueryParam(url, "name")).toBe(true);
      expect(hasQueryParam(url, "age")).toBe(true);
      expect(hasQueryParam(url, "nonexistent")).toBe(false);
    });

    it("should return false for invalid URLs", () => {
      expect(hasQueryParam("invalid-url", "test")).toBe(false);
    });
  });

  describe("clearQueryParams", () => {
    it("should remove all query parameters", () => {
      const result = clearQueryParams("https://example.com?name=John&age=30");
      expect(result).toBe("https://example.com/");
      expect(result).not.toContain("?");
    });

    it("should handle URLs without query params", () => {
      const result = clearQueryParams("https://example.com");
      expect(result).toBe("https://example.com/");
    });

    it("should return original URL if invalid", () => {
      const invalidUrl = "invalid-url";
      expect(clearQueryParams(invalidUrl)).toBe(invalidUrl);
    });
  });

  describe("getDomain", () => {
    it("should extract domain from URL", () => {
      expect(getDomain("https://example.com/path")).toBe("example.com");
      expect(getDomain("http://sub.domain.com")).toBe("sub.domain.com");
      expect(getDomain("ftp://files.example.org")).toBe("files.example.org");
    });

    it("should return null for invalid URLs", () => {
      expect(getDomain("invalid-url")).toBeNull();
    });
  });

  describe("getProtocol", () => {
    it("should extract protocol from URL", () => {
      expect(getProtocol("https://example.com")).toBe("https:");
      expect(getProtocol("http://example.com")).toBe("http:");
      expect(getProtocol("ftp://files.example.com")).toBe("ftp:");
    });

    it("should return null for invalid URLs", () => {
      expect(getProtocol("invalid-url")).toBeNull();
    });
  });

  describe("getPort", () => {
    it("should extract port from URL", () => {
      expect(getPort("https://example.com:8080")).toBe("8080");
      expect(getPort("http://localhost:3000")).toBe("3000");
      expect(getPort("https://example.com")).toBe("");
    });

    it("should return null for invalid URLs", () => {
      expect(getPort("invalid-url")).toBeNull();
    });
  });

  describe("getPath", () => {
    it("should extract path from URL", () => {
      expect(getPath("https://example.com/path/to/page")).toBe("/path/to/page");
      expect(getPath("https://example.com")).toBe("/");
      expect(getPath("https://example.com/")).toBe("/");
    });

    it("should return null for invalid URLs", () => {
      expect(getPath("invalid-url")).toBeNull();
    });
  });

  describe("getHash", () => {
    it("should extract hash from URL", () => {
      expect(getHash("https://example.com#section")).toBe("#section");
      expect(getHash("https://example.com/path#hash")).toBe("#hash");
      expect(getHash("https://example.com")).toBe("");
    });

    it("should return null for invalid URLs", () => {
      expect(getHash("invalid-url")).toBeNull();
    });
  });

  describe("buildUrl", () => {
    it("should build URL from components", () => {
      const url = buildUrl({
        hostname: "example.com",
        pathname: "/path",
        search: "query=value",
        hash: "section",
      });

      expect(url).toContain("https://example.com");
      expect(url).toContain("/path");
      expect(url).toContain("?query=value");
      expect(url).toContain("#section");
    });

    it("should use custom protocol", () => {
      const url = buildUrl({
        protocol: "http",
        hostname: "example.com",
      });
      expect(url).toContain("http://example.com");
    });

    it("should include port", () => {
      const url = buildUrl({
        hostname: "localhost",
        port: 3000,
      });
      expect(url).toContain("localhost:3000");
    });
  });

  describe("joinPaths", () => {
    it("should join path segments", () => {
      expect(joinPaths("api", "users", "123")).toBe("api/users/123");
      expect(joinPaths("/api/", "/users/", "/123/")).toBe("api/users/123");
      expect(joinPaths("", "api", "", "users")).toBe("api/users");
    });

    it("should handle empty paths", () => {
      expect(joinPaths()).toBe("");
      expect(joinPaths("", "", "")).toBe("");
    });
  });

  describe("isAbsoluteUrl", () => {
    it("should identify absolute URLs", () => {
      expect(isAbsoluteUrl("https://example.com")).toBe(true);
      expect(isAbsoluteUrl("http://example.com")).toBe(true);
      expect(isAbsoluteUrl("HTTP://EXAMPLE.COM")).toBe(true);
      expect(isAbsoluteUrl("/relative/path")).toBe(false);
      expect(isAbsoluteUrl("relative/path")).toBe(false);
      expect(isAbsoluteUrl("ftp://example.com")).toBe(false);
    });
  });

  describe("isRelativeUrl", () => {
    it("should identify relative URLs", () => {
      expect(isRelativeUrl("/relative/path")).toBe(true);
      expect(isRelativeUrl("relative/path")).toBe(true);
      expect(isRelativeUrl("../path")).toBe(true);
      expect(isRelativeUrl("https://example.com")).toBe(false);
      expect(isRelativeUrl("http://example.com")).toBe(false);
    });
  });

  describe("makeAbsolute", () => {
    it("should convert relative URLs to absolute", () => {
      const result = makeAbsolute("/path", "https://example.com");
      expect(result).toBe("https://example.com/path");
    });

    it("should return absolute URLs unchanged", () => {
      const absolute = "https://other.com/path";
      expect(makeAbsolute(absolute, "https://example.com")).toBe(absolute);
    });

    it("should handle invalid base URLs", () => {
      const relative = "/path";
      expect(makeAbsolute(relative, "invalid-base")).toBe(relative);
    });
  });

  describe("isSameOrigin", () => {
    it("should check if URLs have same origin", () => {
      expect(isSameOrigin("https://example.com/path1", "https://example.com/path2")).toBe(true);
      expect(isSameOrigin("https://example.com", "http://example.com")).toBe(false);
      expect(isSameOrigin("https://example.com", "https://other.com")).toBe(false);
    });

    it("should handle invalid URLs", () => {
      expect(isSameOrigin("invalid", "https://example.com")).toBe(false);
      expect(isSameOrigin("https://example.com", "invalid")).toBe(false);
    });
  });

  describe("isSameDomain", () => {
    it("should check if URLs have same domain", () => {
      expect(isSameDomain("https://example.com/path1", "https://example.com/path2")).toBe(true);
      expect(isSameDomain("https://example.com", "http://example.com")).toBe(true);
      expect(isSameDomain("https://example.com", "https://other.com")).toBe(false);
    });

    it("should handle invalid URLs", () => {
      expect(isSameDomain("invalid", "https://example.com")).toBe(false);
      expect(isSameDomain("https://example.com", "invalid")).toBe(false);
    });
  });

  describe("isSecure", () => {
    it("should identify secure URLs", () => {
      expect(isSecure("https://example.com")).toBe(true);
      expect(isSecure("http://example.com")).toBe(false);
      expect(isSecure("ftp://example.com")).toBe(false);
    });

    it("should handle invalid URLs", () => {
      expect(isSecure("invalid-url")).toBe(false);
    });
  });

  describe("makeSecure", () => {
    it("should convert HTTP to HTTPS", () => {
      expect(makeSecure("http://example.com")).toBe("https://example.com/");
      expect(makeSecure("https://example.com")).toBe("https://example.com/");
    });

    it("should return original URL if invalid", () => {
      const invalidUrl = "invalid-url";
      expect(makeSecure(invalidUrl)).toBe(invalidUrl);
    });
  });

  describe("makeInsecure", () => {
    it("should convert HTTPS to HTTP", () => {
      expect(makeInsecure("https://example.com")).toBe("http://example.com/");
      expect(makeInsecure("http://example.com")).toBe("http://example.com/");
    });

    it("should return original URL if invalid", () => {
      const invalidUrl = "invalid-url";
      expect(makeInsecure(invalidUrl)).toBe(invalidUrl);
    });
  });

  describe("encodeQueryString", () => {
    it("should encode query parameters", () => {
      const params = { name: "John Doe", age: 30, active: true };
      const result = encodeQueryString(params);

      expect(result).toContain("name=John%20Doe");
      expect(result).toContain("age=30");
      expect(result).toContain("active=true");
    });

    it("should handle special characters", () => {
      const params = { "special chars": "!@#$%^&*()" };
      const result = encodeQueryString(params);
      expect(result).toContain("special%20chars");
      expect(result).toContain("!%40%23%24%25%5E%26*()");
    });
  });

  describe("decodeQueryString", () => {
    it("should decode query string", () => {
      const queryString = "name=John%20Doe&age=30&active=true";
      const result = decodeQueryString(queryString);

      expect(result).toEqual({
        name: "John Doe",
        age: "30",
        active: "true",
      });
    });

    it("should handle query string with leading ?", () => {
      const result = decodeQueryString("?name=John&age=30");
      expect(result).toEqual({
        name: "John",
        age: "30",
      });
    });

    it("should handle empty query string", () => {
      expect(decodeQueryString("")).toEqual({});
      expect(decodeQueryString("?")).toEqual({});
    });

    it("should handle malformed query string", () => {
      const result = decodeQueryString("name=John&=&age=30&invalid");
      expect(result.name).toBe("John");
      expect(result.age).toBe("30");
    });
  });

  describe("getFileExtension", () => {
    it("should extract file extension from URL", () => {
      expect(getFileExtension("https://example.com/file.pdf")).toBe("pdf");
      expect(getFileExtension("https://example.com/image.PNG")).toBe("PNG");
      expect(getFileExtension("https://example.com/path/script.js")).toBe("js");
    });

    it("should return null for URLs without extension", () => {
      expect(getFileExtension("https://example.com/path")).toBeNull();
      expect(getFileExtension("https://example.com/")).toBeNull();
    });

    it("should handle invalid URLs", () => {
      expect(getFileExtension("invalid-url")).toBeNull();
    });
  });

  describe("removeFileExtension", () => {
    it("should remove file extension from URL", () => {
      const result = removeFileExtension("https://example.com/file.pdf");
      expect(result).toBe("https://example.com/file");
      expect(result).not.toContain(".pdf");
    });

    it("should handle URLs without extension", () => {
      const url = "https://example.com/path";
      expect(removeFileExtension(url)).toBe(url);
    });

    it("should return original URL if invalid", () => {
      const invalidUrl = "invalid-url";
      expect(removeFileExtension(invalidUrl)).toBe(invalidUrl);
    });
  });

  describe("isImageUrl", () => {
    it("should identify image URLs", () => {
      expect(isImageUrl("https://example.com/image.jpg")).toBe(true);
      expect(isImageUrl("https://example.com/photo.PNG")).toBe(true);
      expect(isImageUrl("https://example.com/icon.svg")).toBe(true);
      expect(isImageUrl("https://example.com/pic.webp")).toBe(true);
      expect(isImageUrl("https://example.com/document.pdf")).toBe(false);
      expect(isImageUrl("https://example.com/video.mp4")).toBe(false);
    });

    it("should handle URLs without extension", () => {
      expect(isImageUrl("https://example.com/path")).toBe(false);
    });
  });

  describe("isVideoUrl", () => {
    it("should identify video URLs", () => {
      expect(isVideoUrl("https://example.com/movie.mp4")).toBe(true);
      expect(isVideoUrl("https://example.com/clip.AVI")).toBe(true);
      expect(isVideoUrl("https://example.com/video.webm")).toBe(true);
      expect(isVideoUrl("https://example.com/film.mkv")).toBe(true);
      expect(isVideoUrl("https://example.com/image.jpg")).toBe(false);
      expect(isVideoUrl("https://example.com/audio.mp3")).toBe(false);
    });

    it("should handle URLs without extension", () => {
      expect(isVideoUrl("https://example.com/path")).toBe(false);
    });
  });

  describe("isAudioUrl", () => {
    it("should identify audio URLs", () => {
      expect(isAudioUrl("https://example.com/song.mp3")).toBe(true);
      expect(isAudioUrl("https://example.com/audio.WAV")).toBe(true);
      expect(isAudioUrl("https://example.com/music.flac")).toBe(true);
      expect(isAudioUrl("https://example.com/sound.ogg")).toBe(true);
      expect(isAudioUrl("https://example.com/video.mp4")).toBe(false);
      expect(isAudioUrl("https://example.com/image.jpg")).toBe(false);
    });

    it("should handle URLs without extension", () => {
      expect(isAudioUrl("https://example.com/path")).toBe(false);
    });
  });
});
