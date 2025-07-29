"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileUtils_1 = require("../src/fileUtils");
// Mock DOM APIs for testing
global.document = {
    createElement: jest.fn((tagName) => {
        const element = {
            tagName: tagName.toUpperCase(),
            href: "",
            download: "",
            click: jest.fn(),
            appendChild: jest.fn(),
            removeChild: jest.fn(),
        };
        return element;
    }),
    body: {
        appendChild: jest.fn(),
        removeChild: jest.fn(),
    },
};
global.URL = {
    createObjectURL: jest.fn(() => "blob:mock-url"),
    revokeObjectURL: jest.fn(),
};
global.FileReader = class {
    constructor() {
        this.onload = null;
        this.onerror = null;
        this.result = null;
    }
    readAsText(file) {
        setTimeout(() => {
            this.result = "mock file content";
            if (this.onload)
                this.onload({});
        }, 0);
    }
    readAsDataURL(file) {
        setTimeout(() => {
            this.result = "data:text/plain;base64,bW9jayBmaWxlIGNvbnRlbnQ=";
            if (this.onload)
                this.onload({});
        }, 0);
    }
    readAsArrayBuffer(file) {
        setTimeout(() => {
            this.result = new ArrayBuffer(8);
            if (this.onload)
                this.onload({});
        }, 0);
    }
};
global.Blob = class {
    constructor(parts, options) {
        this.parts = parts;
        this.options = options;
    }
};
describe("FileUtils", () => {
    describe("formatFileSize", () => {
        it("should format file sizes correctly", () => {
            expect((0, fileUtils_1.formatFileSize)(0)).toBe("0 Bytes");
            expect((0, fileUtils_1.formatFileSize)(1024)).toBe("1 KB");
            expect((0, fileUtils_1.formatFileSize)(1024 * 1024)).toBe("1 MB");
            expect((0, fileUtils_1.formatFileSize)(1024 * 1024 * 1024)).toBe("1 GB");
            expect((0, fileUtils_1.formatFileSize)(1024 * 1024 * 1024 * 1024)).toBe("1 TB");
            expect((0, fileUtils_1.formatFileSize)(1536)).toBe("1.5 KB");
            expect((0, fileUtils_1.formatFileSize)(1234567)).toBe("1.18 MB");
        });
    });
    describe("getFileExtensionFromPath", () => {
        it("should extract file extensions", () => {
            expect((0, fileUtils_1.getFileExtensionFromPath)("file.txt")).toBe("txt");
            expect((0, fileUtils_1.getFileExtensionFromPath)("image.PNG")).toBe("png");
            expect((0, fileUtils_1.getFileExtensionFromPath)("path/to/file.js")).toBe("js");
            expect((0, fileUtils_1.getFileExtensionFromPath)("file.tar.gz")).toBe("gz");
            expect((0, fileUtils_1.getFileExtensionFromPath)("noextension")).toBe("");
            expect((0, fileUtils_1.getFileExtensionFromPath)("")).toBe("");
        });
    });
    describe("getFileName", () => {
        it("should extract filename from path", () => {
            expect((0, fileUtils_1.getFileName)("/path/to/file.txt")).toBe("file.txt");
            expect((0, fileUtils_1.getFileName)("C:\\Windows\\file.exe")).toBe("file.exe");
            expect((0, fileUtils_1.getFileName)("file.txt")).toBe("file.txt");
            expect((0, fileUtils_1.getFileName)("/path/to/")).toBe("");
            expect((0, fileUtils_1.getFileName)("")).toBe("");
        });
    });
    describe("getFileNameWithoutExtension", () => {
        it("should remove extension from filename", () => {
            expect((0, fileUtils_1.getFileNameWithoutExtension)("file.txt")).toBe("file");
            expect((0, fileUtils_1.getFileNameWithoutExtension)("image.PNG")).toBe("image");
            expect((0, fileUtils_1.getFileNameWithoutExtension)("file.tar.gz")).toBe("file.tar");
            expect((0, fileUtils_1.getFileNameWithoutExtension)("noextension")).toBe("noextension");
            expect((0, fileUtils_1.getFileNameWithoutExtension)("")).toBe("");
        });
    });
    describe("isImageFile", () => {
        it("should identify image files", () => {
            expect((0, fileUtils_1.isImageFile)("image.jpg")).toBe(true);
            expect((0, fileUtils_1.isImageFile)("photo.PNG")).toBe(true);
            expect((0, fileUtils_1.isImageFile)("icon.svg")).toBe(true);
            expect((0, fileUtils_1.isImageFile)("pic.webp")).toBe(true);
            expect((0, fileUtils_1.isImageFile)("document.pdf")).toBe(false);
            expect((0, fileUtils_1.isImageFile)("video.mp4")).toBe(false);
            expect((0, fileUtils_1.isImageFile)("noextension")).toBe(false);
        });
    });
    describe("isVideoFile", () => {
        it("should identify video files", () => {
            expect((0, fileUtils_1.isVideoFile)("movie.mp4")).toBe(true);
            expect((0, fileUtils_1.isVideoFile)("clip.AVI")).toBe(true);
            expect((0, fileUtils_1.isVideoFile)("video.webm")).toBe(true);
            expect((0, fileUtils_1.isVideoFile)("film.mkv")).toBe(true);
            expect((0, fileUtils_1.isVideoFile)("audio.mp3")).toBe(false);
            expect((0, fileUtils_1.isVideoFile)("image.jpg")).toBe(false);
            expect((0, fileUtils_1.isVideoFile)("document.pdf")).toBe(false);
        });
    });
    describe("isAudioFile", () => {
        it("should identify audio files", () => {
            expect((0, fileUtils_1.isAudioFile)("song.mp3")).toBe(true);
            expect((0, fileUtils_1.isAudioFile)("audio.WAV")).toBe(true);
            expect((0, fileUtils_1.isAudioFile)("music.flac")).toBe(true);
            expect((0, fileUtils_1.isAudioFile)("sound.ogg")).toBe(true);
            expect((0, fileUtils_1.isAudioFile)("video.mp4")).toBe(false);
            expect((0, fileUtils_1.isAudioFile)("image.jpg")).toBe(false);
            expect((0, fileUtils_1.isAudioFile)("document.pdf")).toBe(false);
        });
    });
    describe("isDocumentFile", () => {
        it("should identify document files", () => {
            expect((0, fileUtils_1.isDocumentFile)("document.pdf")).toBe(true);
            expect((0, fileUtils_1.isDocumentFile)("text.TXT")).toBe(true);
            expect((0, fileUtils_1.isDocumentFile)("spreadsheet.xlsx")).toBe(true);
            expect((0, fileUtils_1.isDocumentFile)("presentation.pptx")).toBe(true);
            expect((0, fileUtils_1.isDocumentFile)("image.jpg")).toBe(false);
            expect((0, fileUtils_1.isDocumentFile)("video.mp4")).toBe(false);
            expect((0, fileUtils_1.isDocumentFile)("audio.mp3")).toBe(false);
        });
    });
    describe("isArchiveFile", () => {
        it("should identify archive files", () => {
            expect((0, fileUtils_1.isArchiveFile)("archive.zip")).toBe(true);
            expect((0, fileUtils_1.isArchiveFile)("backup.RAR")).toBe(true);
            expect((0, fileUtils_1.isArchiveFile)("compressed.7z")).toBe(true);
            expect((0, fileUtils_1.isArchiveFile)("tarball.tar")).toBe(true);
            expect((0, fileUtils_1.isArchiveFile)("document.pdf")).toBe(false);
            expect((0, fileUtils_1.isArchiveFile)("image.jpg")).toBe(false);
        });
    });
    describe("isCodeFile", () => {
        it("should identify code files", () => {
            expect((0, fileUtils_1.isCodeFile)("script.js")).toBe(true);
            expect((0, fileUtils_1.isCodeFile)("component.TSX")).toBe(true);
            expect((0, fileUtils_1.isCodeFile)("style.css")).toBe(true);
            expect((0, fileUtils_1.isCodeFile)("config.json")).toBe(true);
            expect((0, fileUtils_1.isCodeFile)("data.yml")).toBe(true);
            expect((0, fileUtils_1.isCodeFile)("main.py")).toBe(true);
            expect((0, fileUtils_1.isCodeFile)("document.pdf")).toBe(false);
            expect((0, fileUtils_1.isCodeFile)("image.jpg")).toBe(false);
        });
    });
    describe("getMimeType", () => {
        it("should return correct MIME types", () => {
            expect((0, fileUtils_1.getMimeType)("image.jpg")).toBe("image/jpeg");
            expect((0, fileUtils_1.getMimeType)("document.pdf")).toBe("application/pdf");
            expect((0, fileUtils_1.getMimeType)("script.js")).toBe("application/javascript");
            expect((0, fileUtils_1.getMimeType)("style.css")).toBe("text/css");
            expect((0, fileUtils_1.getMimeType)("data.json")).toBe("application/json");
            expect((0, fileUtils_1.getMimeType)("unknown.xyz")).toBe("application/octet-stream");
        });
    });
    describe("downloadFile", () => {
        it("should trigger file download", () => {
            // Test that the function doesn't throw an error
            expect(() => (0, fileUtils_1.downloadFile)("test content", "test.txt")).not.toThrow();
        });
        it("should handle Blob content", () => {
            const blob = new Blob(["test content"]);
            expect(() => (0, fileUtils_1.downloadFile)(blob, "test.txt")).not.toThrow();
        });
    });
    describe("readFileAsText", () => {
        it("should read file as text", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockFile = new File(["content"], "test.txt", { type: "text/plain" });
            const result = yield (0, fileUtils_1.readFileAsText)(mockFile);
            expect(result).toBe("mock file content");
        }));
    });
    describe("readFileAsDataURL", () => {
        it("should read file as data URL", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockFile = new File(["content"], "test.txt", { type: "text/plain" });
            const result = yield (0, fileUtils_1.readFileAsDataURL)(mockFile);
            expect(result).toBe("data:text/plain;base64,bW9jayBmaWxlIGNvbnRlbnQ=");
        }));
    });
    describe("readFileAsArrayBuffer", () => {
        it("should read file as array buffer", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockFile = new File(["content"], "test.txt", { type: "text/plain" });
            const result = yield (0, fileUtils_1.readFileAsArrayBuffer)(mockFile);
            expect(result).toBeInstanceOf(ArrayBuffer);
        }));
    });
    describe("validateFileType", () => {
        it("should validate file types", () => {
            const txtFile = new File(["content"], "test.txt", { type: "text/plain" });
            const jpgFile = new File(["content"], "image.jpg", { type: "image/jpeg" });
            expect((0, fileUtils_1.validateFileType)(txtFile, ["txt", "pdf"])).toBe(true);
            expect((0, fileUtils_1.validateFileType)(jpgFile, ["txt", "pdf"])).toBe(false);
            expect((0, fileUtils_1.validateFileType)(jpgFile, ["jpg", "png", "gif"])).toBe(true);
            expect((0, fileUtils_1.validateFileType)(txtFile, ["TXT"])).toBe(true); // Case insensitive
        });
    });
    describe("validateFileSize", () => {
        it("should validate file sizes", () => {
            const smallFile = new File(["small"], "small.txt", { type: "text/plain" });
            const largeFile = new File([new ArrayBuffer(2000)], "large.bin", { type: "application/octet-stream" });
            expect((0, fileUtils_1.validateFileSize)(smallFile, 1000)).toBe(true);
            expect((0, fileUtils_1.validateFileSize)(largeFile, 1000)).toBe(false);
            expect((0, fileUtils_1.validateFileSize)(largeFile, 3000)).toBe(true);
        });
    });
    describe("generateUniqueFileName", () => {
        it("should generate unique filenames", () => {
            const original = "test.txt";
            const unique1 = (0, fileUtils_1.generateUniqueFileName)(original);
            const unique2 = (0, fileUtils_1.generateUniqueFileName)(original);
            expect(unique1).not.toBe(original);
            expect(unique2).not.toBe(original);
            expect(unique1).not.toBe(unique2);
            expect(unique1).toMatch(/test_\d+_[a-z0-9]+\.txt/);
            expect(unique2).toMatch(/test_\d+_[a-z0-9]+\.txt/);
        });
        it("should preserve extension", () => {
            expect((0, fileUtils_1.generateUniqueFileName)("document.pdf")).toMatch(/\.pdf$/);
            expect((0, fileUtils_1.generateUniqueFileName)("image.PNG")).toMatch(/\.PNG$/);
            expect((0, fileUtils_1.generateUniqueFileName)("noext")).not.toMatch(/\./);
        });
    });
    describe("sanitizeFileName", () => {
        it("should sanitize filenames", () => {
            expect((0, fileUtils_1.sanitizeFileName)("valid-name.txt")).toBe("valid-name.txt");
            expect((0, fileUtils_1.sanitizeFileName)("file with spaces.txt")).toBe("file_with_spaces.txt");
            expect((0, fileUtils_1.sanitizeFileName)("bad<>chars.txt")).toBe("bad_chars.txt");
            expect((0, fileUtils_1.sanitizeFileName)("multiple   spaces.txt")).toBe("multiple_spaces.txt");
            expect((0, fileUtils_1.sanitizeFileName)("___starts_and_ends___.txt")).toBe("starts_and_ends_.txt");
            expect((0, fileUtils_1.sanitizeFileName)('file"with|bad*chars?.txt')).toBe("file_with_bad_chars_.txt");
        });
    });
    describe("parseCSV", () => {
        it("should parse CSV data", () => {
            const csvData = `name,age,city
John,25,New York
Jane,30,Boston
Bob,35,Chicago`;
            const result = (0, fileUtils_1.parseCSV)(csvData);
            expect(result).toEqual([
                ["name", "age", "city"],
                ["John", "25", "New York"],
                ["Jane", "30", "Boston"],
                ["Bob", "35", "Chicago"],
            ]);
        });
        it("should handle custom delimiter", () => {
            const csvData = "name;age;city\nJohn;25;New York";
            const result = (0, fileUtils_1.parseCSV)(csvData, ";");
            expect(result).toEqual([
                ["name", "age", "city"],
                ["John", "25", "New York"],
            ]);
        });
        it("should handle quoted fields", () => {
            const csvData = 'name,description\n"John","A person with, comma"';
            const result = (0, fileUtils_1.parseCSV)(csvData);
            expect(result).toEqual([
                ["name", "description"],
                ["John", "A person with, comma"],
            ]);
        });
        it("should skip empty lines", () => {
            const csvData = "name,age\n\nJohn,25\n\nJane,30\n";
            const result = (0, fileUtils_1.parseCSV)(csvData);
            expect(result).toEqual([
                ["name", "age"],
                ["John", "25"],
                ["Jane", "30"],
            ]);
        });
    });
    describe("arrayToCSV", () => {
        it("should convert array to CSV", () => {
            const data = [
                ["name", "age", "city"],
                ["John", 25, "New York"],
                ["Jane", 30, "Boston"],
            ];
            const result = (0, fileUtils_1.arrayToCSV)(data);
            expect(result).toBe("name,age,city\nJohn,25,New York\nJane,30,Boston");
        });
        it("should handle custom delimiter", () => {
            const data = [
                ["name", "age"],
                ["John", 25],
            ];
            const result = (0, fileUtils_1.arrayToCSV)(data, ";");
            expect(result).toBe("name;age\nJohn;25");
        });
        it("should escape special characters", () => {
            const data = [
                ["name", "description"],
                ["John", "A person with, comma"],
                ["Jane", 'Quote: "Hello"'],
                ["Bob", "Line\nbreak"],
            ];
            const result = (0, fileUtils_1.arrayToCSV)(data);
            expect(result).toContain('"A person with, comma"');
            expect(result).toContain('"Quote: ""Hello"""');
            expect(result).toContain('"Line\nbreak"');
        });
    });
    describe("compressImage", () => {
        // Mock Image and Canvas for testing
        const mockCanvas = {
            width: 0,
            height: 0,
            getContext: jest.fn(() => ({
                drawImage: jest.fn(),
            })),
            toBlob: jest.fn((callback, type, quality) => {
                const blob = new Blob(["compressed image data"]);
                callback(blob);
            }),
        };
        beforeEach(() => {
            global.document.createElement = jest.fn((tagName) => {
                if (tagName === "canvas")
                    return mockCanvas;
                return {};
            });
            global.Image = class {
                constructor() {
                    this.onload = null;
                    this.onerror = null;
                    this.width = 1920;
                    this.height = 1080;
                }
                set src(value) {
                    setTimeout(() => {
                        if (this.onload)
                            this.onload();
                    }, 0);
                }
            };
        });
        it("should compress image", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockFile = new File(["image data"], "image.jpg", { type: "image/jpeg" });
            const result = yield (0, fileUtils_1.compressImage)(mockFile);
            expect(result).toBeInstanceOf(Blob);
            expect(mockCanvas.toBlob).toHaveBeenCalled();
        }));
        it("should use custom quality and dimensions", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockFile = new File(["image data"], "image.jpg", { type: "image/jpeg" });
            yield (0, fileUtils_1.compressImage)(mockFile, 0.5, 800, 600);
            expect(mockCanvas.toBlob).toHaveBeenCalledWith(expect.any(Function), "image/jpeg", 0.5);
        }));
    });
});
