"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const urlUtils_1 = require("../src/urlUtils");
describe("UrlUtils", () => {
    describe("parseUrl", () => {
        it("should parse valid URLs", () => {
            const url = (0, urlUtils_1.parseUrl)("https://example.com/path?query=1#hash");
            expect(url).toBeInstanceOf(URL);
            expect(url === null || url === void 0 ? void 0 : url.hostname).toBe("example.com");
            expect(url === null || url === void 0 ? void 0 : url.pathname).toBe("/path");
            expect(url === null || url === void 0 ? void 0 : url.search).toBe("?query=1");
            expect(url === null || url === void 0 ? void 0 : url.hash).toBe("#hash");
        });
        it("should return null for invalid URLs", () => {
            expect((0, urlUtils_1.parseUrl)("invalid-url")).toBeNull();
            expect((0, urlUtils_1.parseUrl)("")).toBeNull();
            expect((0, urlUtils_1.parseUrl)("http://")).toBeNull();
        });
    });
    describe("isValidUrl", () => {
        it("should validate URLs", () => {
            expect((0, urlUtils_1.isValidUrl)("https://example.com")).toBe(true);
            expect((0, urlUtils_1.isValidUrl)("http://test.org")).toBe(true);
            expect((0, urlUtils_1.isValidUrl)("ftp://files.example.com")).toBe(true);
            expect((0, urlUtils_1.isValidUrl)("invalid-url")).toBe(false);
            expect((0, urlUtils_1.isValidUrl)("")).toBe(false);
        });
    });
    describe("getQueryParams", () => {
        it("should extract query parameters", () => {
            const params = (0, urlUtils_1.getQueryParams)("https://example.com?name=John&age=30&city=NYC");
            expect(params).toEqual({
                name: "John",
                age: "30",
                city: "NYC",
            });
        });
        it("should handle URLs without query params", () => {
            expect((0, urlUtils_1.getQueryParams)("https://example.com")).toEqual({});
            expect((0, urlUtils_1.getQueryParams)("https://example.com/path")).toEqual({});
        });
        it("should handle invalid URLs", () => {
            expect((0, urlUtils_1.getQueryParams)("invalid-url")).toEqual({});
        });
    });
    describe("addQueryParams", () => {
        it("should add query parameters", () => {
            const result = (0, urlUtils_1.addQueryParams)("https://example.com", { name: "John", age: "30" });
            expect(result).toContain("name=John");
            expect(result).toContain("age=30");
            expect(result).toContain("https://example.com");
        });
        it("should handle existing query parameters", () => {
            const result = (0, urlUtils_1.addQueryParams)("https://example.com?existing=value", { new: "param" });
            expect(result).toContain("existing=value");
            expect(result).toContain("new=param");
        });
        it("should return original URL if invalid", () => {
            const invalidUrl = "invalid-url";
            expect((0, urlUtils_1.addQueryParams)(invalidUrl, { test: "value" })).toBe(invalidUrl);
        });
    });
    describe("removeQueryParams", () => {
        it("should remove specified query parameters", () => {
            const result = (0, urlUtils_1.removeQueryParams)("https://example.com?name=John&age=30&city=NYC", ["age", "city"]);
            expect(result).toContain("name=John");
            expect(result).not.toContain("age=30");
            expect(result).not.toContain("city=NYC");
        });
        it("should handle non-existent parameters", () => {
            const result = (0, urlUtils_1.removeQueryParams)("https://example.com?name=John", ["nonexistent"]);
            expect(result).toContain("name=John");
        });
        it("should return original URL if invalid", () => {
            const invalidUrl = "invalid-url";
            expect((0, urlUtils_1.removeQueryParams)(invalidUrl, ["test"])).toBe(invalidUrl);
        });
    });
    describe("getQueryParam", () => {
        it("should get specific query parameter", () => {
            const url = "https://example.com?name=John&age=30";
            expect((0, urlUtils_1.getQueryParam)(url, "name")).toBe("John");
            expect((0, urlUtils_1.getQueryParam)(url, "age")).toBe("30");
            expect((0, urlUtils_1.getQueryParam)(url, "nonexistent")).toBeNull();
        });
        it("should return null for invalid URLs", () => {
            expect((0, urlUtils_1.getQueryParam)("invalid-url", "test")).toBeNull();
        });
    });
    describe("hasQueryParam", () => {
        it("should check if query parameter exists", () => {
            const url = "https://example.com?name=John&age=30";
            expect((0, urlUtils_1.hasQueryParam)(url, "name")).toBe(true);
            expect((0, urlUtils_1.hasQueryParam)(url, "age")).toBe(true);
            expect((0, urlUtils_1.hasQueryParam)(url, "nonexistent")).toBe(false);
        });
        it("should return false for invalid URLs", () => {
            expect((0, urlUtils_1.hasQueryParam)("invalid-url", "test")).toBe(false);
        });
    });
    describe("clearQueryParams", () => {
        it("should remove all query parameters", () => {
            const result = (0, urlUtils_1.clearQueryParams)("https://example.com?name=John&age=30");
            expect(result).toBe("https://example.com/");
            expect(result).not.toContain("?");
        });
        it("should handle URLs without query params", () => {
            const result = (0, urlUtils_1.clearQueryParams)("https://example.com");
            expect(result).toBe("https://example.com/");
        });
        it("should return original URL if invalid", () => {
            const invalidUrl = "invalid-url";
            expect((0, urlUtils_1.clearQueryParams)(invalidUrl)).toBe(invalidUrl);
        });
    });
    describe("getDomain", () => {
        it("should extract domain from URL", () => {
            expect((0, urlUtils_1.getDomain)("https://example.com/path")).toBe("example.com");
            expect((0, urlUtils_1.getDomain)("http://sub.domain.com")).toBe("sub.domain.com");
            expect((0, urlUtils_1.getDomain)("ftp://files.example.org")).toBe("files.example.org");
        });
        it("should return null for invalid URLs", () => {
            expect((0, urlUtils_1.getDomain)("invalid-url")).toBeNull();
        });
    });
    describe("getProtocol", () => {
        it("should extract protocol from URL", () => {
            expect((0, urlUtils_1.getProtocol)("https://example.com")).toBe("https:");
            expect((0, urlUtils_1.getProtocol)("http://example.com")).toBe("http:");
            expect((0, urlUtils_1.getProtocol)("ftp://files.example.com")).toBe("ftp:");
        });
        it("should return null for invalid URLs", () => {
            expect((0, urlUtils_1.getProtocol)("invalid-url")).toBeNull();
        });
    });
    describe("getPort", () => {
        it("should extract port from URL", () => {
            expect((0, urlUtils_1.getPort)("https://example.com:8080")).toBe("8080");
            expect((0, urlUtils_1.getPort)("http://localhost:3000")).toBe("3000");
            expect((0, urlUtils_1.getPort)("https://example.com")).toBe("");
        });
        it("should return null for invalid URLs", () => {
            expect((0, urlUtils_1.getPort)("invalid-url")).toBeNull();
        });
    });
    describe("getPath", () => {
        it("should extract path from URL", () => {
            expect((0, urlUtils_1.getPath)("https://example.com/path/to/page")).toBe("/path/to/page");
            expect((0, urlUtils_1.getPath)("https://example.com")).toBe("/");
            expect((0, urlUtils_1.getPath)("https://example.com/")).toBe("/");
        });
        it("should return null for invalid URLs", () => {
            expect((0, urlUtils_1.getPath)("invalid-url")).toBeNull();
        });
    });
    describe("getHash", () => {
        it("should extract hash from URL", () => {
            expect((0, urlUtils_1.getHash)("https://example.com#section")).toBe("#section");
            expect((0, urlUtils_1.getHash)("https://example.com/path#hash")).toBe("#hash");
            expect((0, urlUtils_1.getHash)("https://example.com")).toBe("");
        });
        it("should return null for invalid URLs", () => {
            expect((0, urlUtils_1.getHash)("invalid-url")).toBeNull();
        });
    });
    describe("buildUrl", () => {
        it("should build URL from components", () => {
            const url = (0, urlUtils_1.buildUrl)({
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
            const url = (0, urlUtils_1.buildUrl)({
                protocol: "http",
                hostname: "example.com",
            });
            expect(url).toContain("http://example.com");
        });
        it("should include port", () => {
            const url = (0, urlUtils_1.buildUrl)({
                hostname: "localhost",
                port: 3000,
            });
            expect(url).toContain("localhost:3000");
        });
    });
    describe("joinPaths", () => {
        it("should join path segments", () => {
            expect((0, urlUtils_1.joinPaths)("api", "users", "123")).toBe("api/users/123");
            expect((0, urlUtils_1.joinPaths)("/api/", "/users/", "/123/")).toBe("api/users/123");
            expect((0, urlUtils_1.joinPaths)("", "api", "", "users")).toBe("api/users");
        });
        it("should handle empty paths", () => {
            expect((0, urlUtils_1.joinPaths)()).toBe("");
            expect((0, urlUtils_1.joinPaths)("", "", "")).toBe("");
        });
    });
    describe("isAbsoluteUrl", () => {
        it("should identify absolute URLs", () => {
            expect((0, urlUtils_1.isAbsoluteUrl)("https://example.com")).toBe(true);
            expect((0, urlUtils_1.isAbsoluteUrl)("http://example.com")).toBe(true);
            expect((0, urlUtils_1.isAbsoluteUrl)("HTTP://EXAMPLE.COM")).toBe(true);
            expect((0, urlUtils_1.isAbsoluteUrl)("/relative/path")).toBe(false);
            expect((0, urlUtils_1.isAbsoluteUrl)("relative/path")).toBe(false);
            expect((0, urlUtils_1.isAbsoluteUrl)("ftp://example.com")).toBe(false);
        });
    });
    describe("isRelativeUrl", () => {
        it("should identify relative URLs", () => {
            expect((0, urlUtils_1.isRelativeUrl)("/relative/path")).toBe(true);
            expect((0, urlUtils_1.isRelativeUrl)("relative/path")).toBe(true);
            expect((0, urlUtils_1.isRelativeUrl)("../path")).toBe(true);
            expect((0, urlUtils_1.isRelativeUrl)("https://example.com")).toBe(false);
            expect((0, urlUtils_1.isRelativeUrl)("http://example.com")).toBe(false);
        });
    });
    describe("makeAbsolute", () => {
        it("should convert relative URLs to absolute", () => {
            const result = (0, urlUtils_1.makeAbsolute)("/path", "https://example.com");
            expect(result).toBe("https://example.com/path");
        });
        it("should return absolute URLs unchanged", () => {
            const absolute = "https://other.com/path";
            expect((0, urlUtils_1.makeAbsolute)(absolute, "https://example.com")).toBe(absolute);
        });
        it("should handle invalid base URLs", () => {
            const relative = "/path";
            expect((0, urlUtils_1.makeAbsolute)(relative, "invalid-base")).toBe(relative);
        });
    });
    describe("isSameOrigin", () => {
        it("should check if URLs have same origin", () => {
            expect((0, urlUtils_1.isSameOrigin)("https://example.com/path1", "https://example.com/path2")).toBe(true);
            expect((0, urlUtils_1.isSameOrigin)("https://example.com", "http://example.com")).toBe(false);
            expect((0, urlUtils_1.isSameOrigin)("https://example.com", "https://other.com")).toBe(false);
        });
        it("should handle invalid URLs", () => {
            expect((0, urlUtils_1.isSameOrigin)("invalid", "https://example.com")).toBe(false);
            expect((0, urlUtils_1.isSameOrigin)("https://example.com", "invalid")).toBe(false);
        });
    });
    describe("isSameDomain", () => {
        it("should check if URLs have same domain", () => {
            expect((0, urlUtils_1.isSameDomain)("https://example.com/path1", "https://example.com/path2")).toBe(true);
            expect((0, urlUtils_1.isSameDomain)("https://example.com", "http://example.com")).toBe(true);
            expect((0, urlUtils_1.isSameDomain)("https://example.com", "https://other.com")).toBe(false);
        });
        it("should handle invalid URLs", () => {
            expect((0, urlUtils_1.isSameDomain)("invalid", "https://example.com")).toBe(false);
            expect((0, urlUtils_1.isSameDomain)("https://example.com", "invalid")).toBe(false);
        });
    });
    describe("isSecure", () => {
        it("should identify secure URLs", () => {
            expect((0, urlUtils_1.isSecure)("https://example.com")).toBe(true);
            expect((0, urlUtils_1.isSecure)("http://example.com")).toBe(false);
            expect((0, urlUtils_1.isSecure)("ftp://example.com")).toBe(false);
        });
        it("should handle invalid URLs", () => {
            expect((0, urlUtils_1.isSecure)("invalid-url")).toBe(false);
        });
    });
    describe("makeSecure", () => {
        it("should convert HTTP to HTTPS", () => {
            expect((0, urlUtils_1.makeSecure)("http://example.com")).toBe("https://example.com/");
            expect((0, urlUtils_1.makeSecure)("https://example.com")).toBe("https://example.com/");
        });
        it("should return original URL if invalid", () => {
            const invalidUrl = "invalid-url";
            expect((0, urlUtils_1.makeSecure)(invalidUrl)).toBe(invalidUrl);
        });
    });
    describe("makeInsecure", () => {
        it("should convert HTTPS to HTTP", () => {
            expect((0, urlUtils_1.makeInsecure)("https://example.com")).toBe("http://example.com/");
            expect((0, urlUtils_1.makeInsecure)("http://example.com")).toBe("http://example.com/");
        });
        it("should return original URL if invalid", () => {
            const invalidUrl = "invalid-url";
            expect((0, urlUtils_1.makeInsecure)(invalidUrl)).toBe(invalidUrl);
        });
    });
    describe("encodeQueryString", () => {
        it("should encode query parameters", () => {
            const params = { name: "John Doe", age: 30, active: true };
            const result = (0, urlUtils_1.encodeQueryString)(params);
            expect(result).toContain("name=John%20Doe");
            expect(result).toContain("age=30");
            expect(result).toContain("active=true");
        });
        it("should handle special characters", () => {
            const params = { "special chars": "!@#$%^&*()" };
            const result = (0, urlUtils_1.encodeQueryString)(params);
            expect(result).toContain("special%20chars");
            expect(result).toContain("!%40%23%24%25%5E%26*()");
        });
    });
    describe("decodeQueryString", () => {
        it("should decode query string", () => {
            const queryString = "name=John%20Doe&age=30&active=true";
            const result = (0, urlUtils_1.decodeQueryString)(queryString);
            expect(result).toEqual({
                name: "John Doe",
                age: "30",
                active: "true",
            });
        });
        it("should handle query string with leading ?", () => {
            const result = (0, urlUtils_1.decodeQueryString)("?name=John&age=30");
            expect(result).toEqual({
                name: "John",
                age: "30",
            });
        });
        it("should handle empty query string", () => {
            expect((0, urlUtils_1.decodeQueryString)("")).toEqual({});
            expect((0, urlUtils_1.decodeQueryString)("?")).toEqual({});
        });
        it("should handle malformed query string", () => {
            const result = (0, urlUtils_1.decodeQueryString)("name=John&=&age=30&invalid");
            expect(result.name).toBe("John");
            expect(result.age).toBe("30");
        });
    });
    describe("getFileExtension", () => {
        it("should extract file extension from URL", () => {
            expect((0, urlUtils_1.getFileExtension)("https://example.com/file.pdf")).toBe("pdf");
            expect((0, urlUtils_1.getFileExtension)("https://example.com/image.PNG")).toBe("PNG");
            expect((0, urlUtils_1.getFileExtension)("https://example.com/path/script.js")).toBe("js");
        });
        it("should return null for URLs without extension", () => {
            expect((0, urlUtils_1.getFileExtension)("https://example.com/path")).toBeNull();
            expect((0, urlUtils_1.getFileExtension)("https://example.com/")).toBeNull();
        });
        it("should handle invalid URLs", () => {
            expect((0, urlUtils_1.getFileExtension)("invalid-url")).toBeNull();
        });
    });
    describe("removeFileExtension", () => {
        it("should remove file extension from URL", () => {
            const result = (0, urlUtils_1.removeFileExtension)("https://example.com/file.pdf");
            expect(result).toBe("https://example.com/file");
            expect(result).not.toContain(".pdf");
        });
        it("should handle URLs without extension", () => {
            const url = "https://example.com/path";
            expect((0, urlUtils_1.removeFileExtension)(url)).toBe(url);
        });
        it("should return original URL if invalid", () => {
            const invalidUrl = "invalid-url";
            expect((0, urlUtils_1.removeFileExtension)(invalidUrl)).toBe(invalidUrl);
        });
    });
    describe("isImageUrl", () => {
        it("should identify image URLs", () => {
            expect((0, urlUtils_1.isImageUrl)("https://example.com/image.jpg")).toBe(true);
            expect((0, urlUtils_1.isImageUrl)("https://example.com/photo.PNG")).toBe(true);
            expect((0, urlUtils_1.isImageUrl)("https://example.com/icon.svg")).toBe(true);
            expect((0, urlUtils_1.isImageUrl)("https://example.com/pic.webp")).toBe(true);
            expect((0, urlUtils_1.isImageUrl)("https://example.com/document.pdf")).toBe(false);
            expect((0, urlUtils_1.isImageUrl)("https://example.com/video.mp4")).toBe(false);
        });
        it("should handle URLs without extension", () => {
            expect((0, urlUtils_1.isImageUrl)("https://example.com/path")).toBe(false);
        });
    });
    describe("isVideoUrl", () => {
        it("should identify video URLs", () => {
            expect((0, urlUtils_1.isVideoUrl)("https://example.com/movie.mp4")).toBe(true);
            expect((0, urlUtils_1.isVideoUrl)("https://example.com/clip.AVI")).toBe(true);
            expect((0, urlUtils_1.isVideoUrl)("https://example.com/video.webm")).toBe(true);
            expect((0, urlUtils_1.isVideoUrl)("https://example.com/film.mkv")).toBe(true);
            expect((0, urlUtils_1.isVideoUrl)("https://example.com/image.jpg")).toBe(false);
            expect((0, urlUtils_1.isVideoUrl)("https://example.com/audio.mp3")).toBe(false);
        });
        it("should handle URLs without extension", () => {
            expect((0, urlUtils_1.isVideoUrl)("https://example.com/path")).toBe(false);
        });
    });
    describe("isAudioUrl", () => {
        it("should identify audio URLs", () => {
            expect((0, urlUtils_1.isAudioUrl)("https://example.com/song.mp3")).toBe(true);
            expect((0, urlUtils_1.isAudioUrl)("https://example.com/audio.WAV")).toBe(true);
            expect((0, urlUtils_1.isAudioUrl)("https://example.com/music.flac")).toBe(true);
            expect((0, urlUtils_1.isAudioUrl)("https://example.com/sound.ogg")).toBe(true);
            expect((0, urlUtils_1.isAudioUrl)("https://example.com/video.mp4")).toBe(false);
            expect((0, urlUtils_1.isAudioUrl)("https://example.com/image.jpg")).toBe(false);
        });
        it("should handle URLs without extension", () => {
            expect((0, urlUtils_1.isAudioUrl)("https://example.com/path")).toBe(false);
        });
    });
});
