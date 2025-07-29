import {
  formatFileSize,
  getFileExtensionFromPath,
  getFileName,
  getFileNameWithoutExtension,
  isImageFile,
  isVideoFile,
  isAudioFile,
  isDocumentFile,
  isArchiveFile,
  isCodeFile,
  getMimeType,
  downloadFile,
  readFileAsText,
  readFileAsDataURL,
  readFileAsArrayBuffer,
  validateFileType,
  validateFileSize,
  generateUniqueFileName,
  sanitizeFileName,
  parseCSV,
  arrayToCSV,
  compressImage,
} from "../src/fileUtils";

// Mock DOM APIs for testing
global.document = {
  createElement: jest.fn((tagName: string) => {
    const element: any = {
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
} as any;

global.URL = {
  createObjectURL: jest.fn(() => "blob:mock-url"),
  revokeObjectURL: jest.fn(),
} as any;

global.FileReader = class {
  onload: ((event: any) => void) | null = null;
  onerror: ((event: any) => void) | null = null;
  result: string | ArrayBuffer | null = null;

  readAsText(file: File) {
    setTimeout(() => {
      this.result = "mock file content";
      if (this.onload) this.onload({} as any);
    }, 0);
  }

  readAsDataURL(file: File) {
    setTimeout(() => {
      this.result = "data:text/plain;base64,bW9jayBmaWxlIGNvbnRlbnQ=";
      if (this.onload) this.onload({} as any);
    }, 0);
  }

  readAsArrayBuffer(file: File) {
    setTimeout(() => {
      this.result = new ArrayBuffer(8);
      if (this.onload) this.onload({} as any);
    }, 0);
  }
} as any;

global.Blob = class {
  constructor(public parts: any[], public options?: BlobPropertyBag) {}
} as any;

describe("FileUtils", () => {
  describe("formatFileSize", () => {
    it("should format file sizes correctly", () => {
      expect(formatFileSize(0)).toBe("0 Bytes");
      expect(formatFileSize(1024)).toBe("1 KB");
      expect(formatFileSize(1024 * 1024)).toBe("1 MB");
      expect(formatFileSize(1024 * 1024 * 1024)).toBe("1 GB");
      expect(formatFileSize(1024 * 1024 * 1024 * 1024)).toBe("1 TB");
      expect(formatFileSize(1536)).toBe("1.5 KB");
      expect(formatFileSize(1234567)).toBe("1.18 MB");
    });
  });

  describe("getFileExtensionFromPath", () => {
    it("should extract file extensions", () => {
      expect(getFileExtensionFromPath("file.txt")).toBe("txt");
      expect(getFileExtensionFromPath("image.PNG")).toBe("png");
      expect(getFileExtensionFromPath("path/to/file.js")).toBe("js");
      expect(getFileExtensionFromPath("file.tar.gz")).toBe("gz");
      expect(getFileExtensionFromPath("noextension")).toBe("");
      expect(getFileExtensionFromPath("")).toBe("");
    });
  });

  describe("getFileName", () => {
    it("should extract filename from path", () => {
      expect(getFileName("/path/to/file.txt")).toBe("file.txt");
      expect(getFileName("C:\\Windows\\file.exe")).toBe("file.exe");
      expect(getFileName("file.txt")).toBe("file.txt");
      expect(getFileName("/path/to/")).toBe("");
      expect(getFileName("")).toBe("");
    });
  });

  describe("getFileNameWithoutExtension", () => {
    it("should remove extension from filename", () => {
      expect(getFileNameWithoutExtension("file.txt")).toBe("file");
      expect(getFileNameWithoutExtension("image.PNG")).toBe("image");
      expect(getFileNameWithoutExtension("file.tar.gz")).toBe("file.tar");
      expect(getFileNameWithoutExtension("noextension")).toBe("noextension");
      expect(getFileNameWithoutExtension("")).toBe("");
    });
  });

  describe("isImageFile", () => {
    it("should identify image files", () => {
      expect(isImageFile("image.jpg")).toBe(true);
      expect(isImageFile("photo.PNG")).toBe(true);
      expect(isImageFile("icon.svg")).toBe(true);
      expect(isImageFile("pic.webp")).toBe(true);
      expect(isImageFile("document.pdf")).toBe(false);
      expect(isImageFile("video.mp4")).toBe(false);
      expect(isImageFile("noextension")).toBe(false);
    });
  });

  describe("isVideoFile", () => {
    it("should identify video files", () => {
      expect(isVideoFile("movie.mp4")).toBe(true);
      expect(isVideoFile("clip.AVI")).toBe(true);
      expect(isVideoFile("video.webm")).toBe(true);
      expect(isVideoFile("film.mkv")).toBe(true);
      expect(isVideoFile("audio.mp3")).toBe(false);
      expect(isVideoFile("image.jpg")).toBe(false);
      expect(isVideoFile("document.pdf")).toBe(false);
    });
  });

  describe("isAudioFile", () => {
    it("should identify audio files", () => {
      expect(isAudioFile("song.mp3")).toBe(true);
      expect(isAudioFile("audio.WAV")).toBe(true);
      expect(isAudioFile("music.flac")).toBe(true);
      expect(isAudioFile("sound.ogg")).toBe(true);
      expect(isAudioFile("video.mp4")).toBe(false);
      expect(isAudioFile("image.jpg")).toBe(false);
      expect(isAudioFile("document.pdf")).toBe(false);
    });
  });

  describe("isDocumentFile", () => {
    it("should identify document files", () => {
      expect(isDocumentFile("document.pdf")).toBe(true);
      expect(isDocumentFile("text.TXT")).toBe(true);
      expect(isDocumentFile("spreadsheet.xlsx")).toBe(true);
      expect(isDocumentFile("presentation.pptx")).toBe(true);
      expect(isDocumentFile("image.jpg")).toBe(false);
      expect(isDocumentFile("video.mp4")).toBe(false);
      expect(isDocumentFile("audio.mp3")).toBe(false);
    });
  });

  describe("isArchiveFile", () => {
    it("should identify archive files", () => {
      expect(isArchiveFile("archive.zip")).toBe(true);
      expect(isArchiveFile("backup.RAR")).toBe(true);
      expect(isArchiveFile("compressed.7z")).toBe(true);
      expect(isArchiveFile("tarball.tar")).toBe(true);
      expect(isArchiveFile("document.pdf")).toBe(false);
      expect(isArchiveFile("image.jpg")).toBe(false);
    });
  });

  describe("isCodeFile", () => {
    it("should identify code files", () => {
      expect(isCodeFile("script.js")).toBe(true);
      expect(isCodeFile("component.TSX")).toBe(true);
      expect(isCodeFile("style.css")).toBe(true);
      expect(isCodeFile("config.json")).toBe(true);
      expect(isCodeFile("data.yml")).toBe(true);
      expect(isCodeFile("main.py")).toBe(true);
      expect(isCodeFile("document.pdf")).toBe(false);
      expect(isCodeFile("image.jpg")).toBe(false);
    });
  });

  describe("getMimeType", () => {
    it("should return correct MIME types", () => {
      expect(getMimeType("image.jpg")).toBe("image/jpeg");
      expect(getMimeType("document.pdf")).toBe("application/pdf");
      expect(getMimeType("script.js")).toBe("application/javascript");
      expect(getMimeType("style.css")).toBe("text/css");
      expect(getMimeType("data.json")).toBe("application/json");
      expect(getMimeType("unknown.xyz")).toBe("application/octet-stream");
    });
  });

  describe("downloadFile", () => {
    it("should trigger file download", () => {
      // Test that the function doesn't throw an error
      expect(() => downloadFile("test content", "test.txt")).not.toThrow();
    });

    it("should handle Blob content", () => {
      const blob = new Blob(["test content"]);
      expect(() => downloadFile(blob, "test.txt")).not.toThrow();
    });
  });

  describe("readFileAsText", () => {
    it("should read file as text", async () => {
      const mockFile = new File(["content"], "test.txt", { type: "text/plain" });
      const result = await readFileAsText(mockFile);
      expect(result).toBe("mock file content");
    });
  });

  describe("readFileAsDataURL", () => {
    it("should read file as data URL", async () => {
      const mockFile = new File(["content"], "test.txt", { type: "text/plain" });
      const result = await readFileAsDataURL(mockFile);
      expect(result).toBe("data:text/plain;base64,bW9jayBmaWxlIGNvbnRlbnQ=");
    });
  });

  describe("readFileAsArrayBuffer", () => {
    it("should read file as array buffer", async () => {
      const mockFile = new File(["content"], "test.txt", { type: "text/plain" });
      const result = await readFileAsArrayBuffer(mockFile);
      expect(result).toBeInstanceOf(ArrayBuffer);
    });
  });

  describe("validateFileType", () => {
    it("should validate file types", () => {
      const txtFile = new File(["content"], "test.txt", { type: "text/plain" });
      const jpgFile = new File(["content"], "image.jpg", { type: "image/jpeg" });

      expect(validateFileType(txtFile, ["txt", "pdf"])).toBe(true);
      expect(validateFileType(jpgFile, ["txt", "pdf"])).toBe(false);
      expect(validateFileType(jpgFile, ["jpg", "png", "gif"])).toBe(true);
      expect(validateFileType(txtFile, ["TXT"])).toBe(true); // Case insensitive
    });
  });

  describe("validateFileSize", () => {
    it("should validate file sizes", () => {
      const smallFile = new File(["small"], "small.txt", { type: "text/plain" });
      const largeFile = new File([new ArrayBuffer(2000)], "large.bin", { type: "application/octet-stream" });

      expect(validateFileSize(smallFile, 1000)).toBe(true);
      expect(validateFileSize(largeFile, 1000)).toBe(false);
      expect(validateFileSize(largeFile, 3000)).toBe(true);
    });
  });

  describe("generateUniqueFileName", () => {
    it("should generate unique filenames", () => {
      const original = "test.txt";
      const unique1 = generateUniqueFileName(original);
      const unique2 = generateUniqueFileName(original);

      expect(unique1).not.toBe(original);
      expect(unique2).not.toBe(original);
      expect(unique1).not.toBe(unique2);
      expect(unique1).toMatch(/test_\d+_[a-z0-9]+\.txt/);
      expect(unique2).toMatch(/test_\d+_[a-z0-9]+\.txt/);
    });

    it("should preserve extension", () => {
      expect(generateUniqueFileName("document.pdf")).toMatch(/\.pdf$/);
      expect(generateUniqueFileName("image.PNG")).toMatch(/\.PNG$/);
      expect(generateUniqueFileName("noext")).not.toMatch(/\./);
    });
  });

  describe("sanitizeFileName", () => {
    it("should sanitize filenames", () => {
      expect(sanitizeFileName("valid-name.txt")).toBe("valid-name.txt");
      expect(sanitizeFileName("file with spaces.txt")).toBe("file_with_spaces.txt");
      expect(sanitizeFileName("bad<>chars.txt")).toBe("bad_chars.txt");
      expect(sanitizeFileName("multiple   spaces.txt")).toBe("multiple_spaces.txt");
      expect(sanitizeFileName("___starts_and_ends___.txt")).toBe("starts_and_ends_.txt");
      expect(sanitizeFileName('file"with|bad*chars?.txt')).toBe("file_with_bad_chars_.txt");
    });
  });

  describe("parseCSV", () => {
    it("should parse CSV data", () => {
      const csvData = `name,age,city
John,25,New York
Jane,30,Boston
Bob,35,Chicago`;

      const result = parseCSV(csvData);
      expect(result).toEqual([
        ["name", "age", "city"],
        ["John", "25", "New York"],
        ["Jane", "30", "Boston"],
        ["Bob", "35", "Chicago"],
      ]);
    });

    it("should handle custom delimiter", () => {
      const csvData = "name;age;city\nJohn;25;New York";
      const result = parseCSV(csvData, ";");
      expect(result).toEqual([
        ["name", "age", "city"],
        ["John", "25", "New York"],
      ]);
    });

    it("should handle quoted fields", () => {
      const csvData = 'name,description\n"John","A person with, comma"';
      const result = parseCSV(csvData);
      expect(result).toEqual([
        ["name", "description"],
        ["John", "A person with, comma"],
      ]);
    });

    it("should skip empty lines", () => {
      const csvData = "name,age\n\nJohn,25\n\nJane,30\n";
      const result = parseCSV(csvData);
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

      const result = arrayToCSV(data);
      expect(result).toBe("name,age,city\nJohn,25,New York\nJane,30,Boston");
    });

    it("should handle custom delimiter", () => {
      const data = [
        ["name", "age"],
        ["John", 25],
      ];
      const result = arrayToCSV(data, ";");
      expect(result).toBe("name;age\nJohn;25");
    });

    it("should escape special characters", () => {
      const data = [
        ["name", "description"],
        ["John", "A person with, comma"],
        ["Jane", 'Quote: "Hello"'],
        ["Bob", "Line\nbreak"],
      ];

      const result = arrayToCSV(data);
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
      (global.document.createElement as jest.Mock) = jest.fn((tagName) => {
        if (tagName === "canvas") return mockCanvas;
        return {};
      });

      global.Image = class {
        onload: (() => void) | null = null;
        onerror: (() => void) | null = null;
        width = 1920;
        height = 1080;

        set src(value: string) {
          setTimeout(() => {
            if (this.onload) this.onload();
          }, 0);
        }
      } as any;
    });

    it("should compress image", async () => {
      const mockFile = new File(["image data"], "image.jpg", { type: "image/jpeg" });
      const result = await compressImage(mockFile);

      expect(result).toBeInstanceOf(Blob);
      expect(mockCanvas.toBlob).toHaveBeenCalled();
    });

    it("should use custom quality and dimensions", async () => {
      const mockFile = new File(["image data"], "image.jpg", { type: "image/jpeg" });
      await compressImage(mockFile, 0.5, 800, 600);

      expect(mockCanvas.toBlob).toHaveBeenCalledWith(expect.any(Function), "image/jpeg", 0.5);
    });
  });
});
