import { describe, test, expect } from "@jest/globals";
import {
  // DOM-independent utilities (easily testable)
  isValidImageFormat,
  getImageFormatFromExtension,
  getImageFormatFromMimeType,
  getMimeTypeFromFormat,
  extractImageNameFromUrl,
  isBase64Image,
  getBase64ImageFormat,
  getBase64ImageSize,
  stripBase64Header,
  addBase64Header,
  calculateAspectRatio,
  calculateDimensionsFromAspectRatio,
  isSquareImage,
  isPortraitImage,
  isLandscapeImage,
  rgbToGrayscale,
  adjustBrightness,
  formatImageFileSize,
  convertBytesToKB,
  convertBytesToMB,
  estimateImageQuality,
  getImageSizeCategory,
  flipImageData,
  rotateImageData90,
  // DOM-dependent utilities (for reference)
  base64ToBlob,
  blobToBase64,
  resizeImage,
  imageToGrayScale,
} from "../src/imageUtils";

// Import from their correct modules
import { isImageUrl } from "../src/urlUtils";
import { hexToRgb, rgbToHex } from "../src/colorUtils";

describe("ImageUtils", () => {
  describe("Image Format Validation", () => {
    test("isValidImageFormat - validates image formats", () => {
      expect(isValidImageFormat("jpg")).toBe(true);
      expect(isValidImageFormat("jpeg")).toBe(true);
      expect(isValidImageFormat("png")).toBe(true);
      expect(isValidImageFormat("gif")).toBe(true);
      expect(isValidImageFormat("webp")).toBe(true);
      expect(isValidImageFormat("svg")).toBe(true);
      expect(isValidImageFormat("bmp")).toBe(true);
      expect(isValidImageFormat("ico")).toBe(true);
      expect(isValidImageFormat("tiff")).toBe(true);
      expect(isValidImageFormat("tif")).toBe(true);

      // Test invalid formats
      expect(isValidImageFormat("txt")).toBe(false);
      expect(isValidImageFormat("pdf")).toBe(false);
      expect(isValidImageFormat("doc")).toBe(false);
      expect(isValidImageFormat("")).toBe(false);
    });

    test("isValidImageFormat - case insensitive", () => {
      expect(isValidImageFormat("JPG")).toBe(true);
      expect(isValidImageFormat("PNG")).toBe(true);
      expect(isValidImageFormat("JPEG")).toBe(true);
    });
    expect(isValidImageFormat("tif")).toBe(true);
    expect(isValidImageFormat("JPG")).toBe(true); // Case insensitive
    expect(isValidImageFormat("txt")).toBe(false);
    expect(isValidImageFormat("pdf")).toBe(false);
  });

  test("getImageFormatFromExtension - extracts format from filename", () => {
    expect(getImageFormatFromExtension("photo.jpg")).toBe("jpg");
    expect(getImageFormatFromExtension("image.PNG")).toBe("png");
    expect(getImageFormatFromExtension("avatar.jpeg")).toBe("jpeg");
    expect(getImageFormatFromExtension("logo.svg")).toBe("svg");
    expect(getImageFormatFromExtension("document.pdf")).toBe(null);
    expect(getImageFormatFromExtension("noextension")).toBe(null);
  });

  test("getImageFormatFromMimeType - converts MIME type to format", () => {
    expect(getImageFormatFromMimeType("image/jpeg")).toBe("jpg");
    expect(getImageFormatFromMimeType("image/png")).toBe("png");
    expect(getImageFormatFromMimeType("image/gif")).toBe("gif");
    expect(getImageFormatFromMimeType("image/webp")).toBe("webp");
    expect(getImageFormatFromMimeType("image/svg+xml")).toBe("svg");
    expect(getImageFormatFromMimeType("image/bmp")).toBe("bmp");
    expect(getImageFormatFromMimeType("image/x-icon")).toBe("ico");
    expect(getImageFormatFromMimeType("image/tiff")).toBe("tiff");
    expect(getImageFormatFromMimeType("IMAGE/JPEG")).toBe("jpg"); // Case insensitive
    expect(getImageFormatFromMimeType("text/plain")).toBe(null);
  });

  test("getMimeTypeFromFormat - converts format to MIME type", () => {
    expect(getMimeTypeFromFormat("jpg")).toBe("image/jpeg");
    expect(getMimeTypeFromFormat("jpeg")).toBe("image/jpeg");
    expect(getMimeTypeFromFormat("png")).toBe("image/png");
    expect(getMimeTypeFromFormat("gif")).toBe("image/gif");
    expect(getMimeTypeFromFormat("webp")).toBe("image/webp");
    expect(getMimeTypeFromFormat("svg")).toBe("image/svg+xml");
    expect(getMimeTypeFromFormat("bmp")).toBe("image/bmp");
    expect(getMimeTypeFromFormat("ico")).toBe("image/x-icon");
    expect(getMimeTypeFromFormat("tiff")).toBe("image/tiff");
    expect(getMimeTypeFromFormat("tif")).toBe("image/tiff");
    expect(getMimeTypeFromFormat("JPG")).toBe("image/jpeg"); // Case insensitive
    expect(getMimeTypeFromFormat("txt")).toBe(null);
  });

  describe("Image URL Utilities", () => {
    test("isImageUrl - detects image URLs", () => {
      expect(isImageUrl("https://example.com/photo.jpg")).toBe(true);
      expect(isImageUrl("https://example.com/image.PNG")).toBe(true);
      expect(isImageUrl("https://example.com/logo.svg")).toBe(true);
      expect(isImageUrl("https://example.com/photo.jpg?v=123")).toBe(true);
      expect(isImageUrl("https://example.com/document.pdf")).toBe(false);
      expect(isImageUrl("https://example.com/page")).toBe(false);
      expect(isImageUrl("not-a-url")).toBe(false);
    });

    test("extractImageNameFromUrl - extracts image name from URL", () => {
      expect(extractImageNameFromUrl("https://example.com/photo.jpg")).toBe("photo.jpg");
      expect(extractImageNameFromUrl("https://example.com/images/logo.png")).toBe("logo.png");
      expect(extractImageNameFromUrl("https://example.com/photo.jpg?v=123")).toBe("photo.jpg");
      expect(extractImageNameFromUrl("https://example.com/document.pdf")).toBe(null);
      expect(extractImageNameFromUrl("https://example.com/")).toBe(null);
      expect(extractImageNameFromUrl("invalid-url")).toBe(null);
    });
  });

  describe("Base64 Utilities", () => {
    const validBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVR";
    const invalidBase64 = "not-base64-data";

    test("isBase64Image - validates base64 image strings", () => {
      expect(isBase64Image(validBase64)).toBe(true);
      expect(isBase64Image("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA")).toBe(true);
      expect(isBase64Image("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAE")).toBe(true);
      expect(isBase64Image("data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBY")).toBe(true);
      expect(isBase64Image("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0")).toBe(true);
      expect(isBase64Image(invalidBase64)).toBe(false);
      expect(isBase64Image("data:text/plain;base64,SGVsbG8=")).toBe(false);
    });

    test("getBase64ImageFormat - extracts format from base64", () => {
      expect(getBase64ImageFormat("data:image/jpeg;base64,/9j/4AAQ")).toBe("jpeg");
      expect(getBase64ImageFormat("data:image/png;base64,iVBORw0K")).toBe("png");
      expect(getBase64ImageFormat("data:image/gif;base64,R0lGODlh")).toBe("gif");
      expect(getBase64ImageFormat("data:image/webp;base64,UklGRiI")).toBe("webp");
      expect(getBase64ImageFormat("data:image/svg+xml;base64,PHN2Zy")).toBe("svg+xml");
      expect(getBase64ImageFormat(invalidBase64)).toBe(null);
    });

    test("getBase64ImageSize - calculates base64 size in bytes", () => {
      const shortBase64 = "data:image/jpeg;base64,/9j/4A=="; // 6 chars of data
      expect(getBase64ImageSize(shortBase64)).toBe(6); // (6 * 3) / 4 = 4.5, rounded to 5
      expect(getBase64ImageSize(invalidBase64)).toBe(0);

      const longerBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg=="; // 24 chars of data
      expect(getBase64ImageSize(longerBase64)).toBe(18); // (24 * 3) / 4 = 18 bytes
    });

    test("stripBase64Header - removes data URL header", () => {
      expect(stripBase64Header(validBase64)).toBe("/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVR");
      expect(stripBase64Header("data:image/png;base64,iVBORw0KGgo")).toBe("iVBORw0KGgo");
      expect(stripBase64Header("plainbase64data")).toBe("plainbase64data");
    });

    test("addBase64Header - adds data URL header", () => {
      expect(addBase64Header("iVBORw0KGgo", "png")).toBe("data:image/png;base64,iVBORw0KGgo");
      expect(addBase64Header("/9j/4AAQ", "jpg")).toBe("data:image/jpeg;base64,/9j/4AAQ");
      expect(addBase64Header("R0lGODlh", "gif")).toBe("data:image/gif;base64,R0lGODlh");
      expect(addBase64Header("somedata", "unknown")).toBe("somedata"); // Unknown format
    });
  });
  describe("Image Dimension Utilities", () => {
    test("calculateAspectRatio - calculates width/height ratio", () => {
      expect(calculateAspectRatio(1920, 1080)).toBeCloseTo(1.778, 3);
      expect(calculateAspectRatio(1080, 1920)).toBeCloseTo(0.563, 3);
      expect(calculateAspectRatio(100, 100)).toBe(1);
      expect(calculateAspectRatio(800, 600)).toBeCloseTo(1.333, 3);
    });

    test("calculateDimensionsFromAspectRatio - maintains aspect ratio", () => {
      // Target width only
      expect(calculateDimensionsFromAspectRatio(1920, 1080, 960)).toEqual({
        width: 960,
        height: 540,
      });

      // Target height only
      expect(calculateDimensionsFromAspectRatio(1920, 1080, undefined, 540)).toEqual({
        width: 960,
        height: 540,
      });

      // Both dimensions specified
      expect(calculateDimensionsFromAspectRatio(1920, 1080, 800, 600)).toEqual({
        width: 800,
        height: 600,
      });

      // No target dimensions
      expect(calculateDimensionsFromAspectRatio(1920, 1080)).toEqual({
        width: 1920,
        height: 1080,
      });
    });

    test("isSquareImage - detects square images", () => {
      expect(isSquareImage(100, 100)).toBe(true);
      expect(isSquareImage(500, 500)).toBe(true);
      expect(isSquareImage(100, 200)).toBe(false);
      expect(isSquareImage(200, 100)).toBe(false);
    });

    test("isPortraitImage - detects portrait orientation", () => {
      expect(isPortraitImage(100, 200)).toBe(true);
      expect(isPortraitImage(600, 800)).toBe(true);
      expect(isPortraitImage(200, 100)).toBe(false);
      expect(isPortraitImage(100, 100)).toBe(false);
    });

    test("isLandscapeImage - detects landscape orientation", () => {
      expect(isLandscapeImage(200, 100)).toBe(true);
      expect(isLandscapeImage(800, 600)).toBe(true);
      expect(isLandscapeImage(100, 200)).toBe(false);
      expect(isLandscapeImage(100, 100)).toBe(false);
    });
  });
  describe("Color Utilities", () => {
    test("hexToRgb - converts hex to RGB", () => {
      expect(hexToRgb("#FF0000")).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb("#00FF00")).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb("#0000FF")).toEqual({ r: 0, g: 0, b: 255 });
      expect(hexToRgb("FF0000")).toEqual({ r: 255, g: 0, b: 0 }); // Without #
      expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
      expect(hexToRgb("#000000")).toEqual({ r: 0, g: 0, b: 0 });
      expect(hexToRgb("invalid")).toBe(null);
    });

    test("rgbToHex - converts RGB to hex", () => {
      expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
      expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
      expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
      expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
      expect(rgbToHex(0, 0, 0)).toBe("#000000");
      expect(rgbToHex(128, 128, 128)).toBe("#808080");

      // Test clamping
      expect(rgbToHex(300, -10, 128)).toBe("#ff0080");
    });

    test("rgbToGrayscale - converts RGB to grayscale", () => {
      expect(rgbToGrayscale(255, 0, 0)).toBe(76); // Red
      expect(rgbToGrayscale(0, 255, 0)).toBe(150); // Green (using 0.587 coefficient)
      expect(rgbToGrayscale(0, 0, 255)).toBe(29); // Blue
      expect(rgbToGrayscale(255, 255, 255)).toBe(255); // White
      expect(rgbToGrayscale(0, 0, 0)).toBe(0); // Black
      expect(rgbToGrayscale(128, 128, 128)).toBe(128); // Gray
    });

    test("adjustBrightness - adjusts RGB brightness", () => {
      // Brighten
      expect(adjustBrightness(100, 100, 100, 1.5)).toEqual({ r: 150, g: 150, b: 150 });

      // Darken
      expect(adjustBrightness(100, 100, 100, 0.5)).toEqual({ r: 50, g: 50, b: 50 });

      // No change
      expect(adjustBrightness(100, 100, 100, 1)).toEqual({ r: 100, g: 100, b: 100 });

      // Test clamping
      expect(adjustBrightness(200, 200, 200, 2)).toEqual({ r: 255, g: 255, b: 255 });
      expect(adjustBrightness(100, 100, 100, 0)).toEqual({ r: 0, g: 0, b: 0 });
    });
  });
  describe("File Size Utilities", () => {
    test("formatImageFileSize - formats bytes to human readable", () => {
      expect(formatImageFileSize(0)).toBe("0 Bytes");
      expect(formatImageFileSize(1024)).toBe("1 KB");
      expect(formatImageFileSize(1048576)).toBe("1 MB");
      expect(formatImageFileSize(1073741824)).toBe("1 GB");
      expect(formatImageFileSize(1536)).toBe("1.5 KB");
      expect(formatImageFileSize(2097152)).toBe("2 MB");
    });

    test("convertBytesToKB - converts bytes to kilobytes", () => {
      expect(convertBytesToKB(1024)).toBe(1);
      expect(convertBytesToKB(2048)).toBe(2);
      expect(convertBytesToKB(1536)).toBe(1.5);
      expect(convertBytesToKB(512)).toBe(0.5);
      expect(convertBytesToKB(0)).toBe(0);
    });

    test("convertBytesToMB - converts bytes to megabytes", () => {
      expect(convertBytesToMB(1048576)).toBe(1);
      expect(convertBytesToMB(2097152)).toBe(2);
      expect(convertBytesToMB(1572864)).toBe(1.5);
      expect(convertBytesToMB(524288)).toBe(0.5);
      expect(convertBytesToMB(0)).toBe(0);
    });

    describe("Image Quality Assessment", () => {
      test("estimateImageQuality - estimates quality based on file size and dimensions", () => {
        // High quality: 3 bytes per pixel
        expect(estimateImageQuality(3000000, 1000, 1000)).toBe("high");

        // Medium quality: 1 byte per pixel
        expect(estimateImageQuality(1000000, 1000, 1000)).toBe("medium");

        // Low quality: 0.3 bytes per pixel
        expect(estimateImageQuality(300000, 1000, 1000)).toBe("low");
      });

      test("getImageSizeCategory - categorizes images by size", () => {
        expect(getImageSizeCategory(100, 100)).toBe("thumbnail"); // 100px max
        expect(getImageSizeCategory(300, 200)).toBe("small"); // 300px max
        expect(getImageSizeCategory(600, 800)).toBe("medium"); // 800px max
        expect(getImageSizeCategory(1920, 1080)).toBe("large"); // 1920px max
        expect(getImageSizeCategory(4000, 3000)).toBe("extra-large"); // >1920px
        expect(getImageSizeCategory(50, 150)).toBe("thumbnail"); // Max dimension is 150
      });

      describe("Image Transformation Utilities", () => {
        test("flipImageData - flips image data horizontally", () => {
          // 2x2 image: [[R,G], [B,W]] -> [[G,R], [W,B]]
          const imageData = [
            255,
            0,
            0,
            255, // Red pixel (0,0)
            0,
            255,
            0,
            255, // Green pixel (1,0)
            0,
            0,
            255,
            255, // Blue pixel (0,1)
            255,
            255,
            255,
            255, // White pixel (1,1)
          ];

          const flippedH = flipImageData(imageData, 2, 2, "horizontal");
          expect(flippedH).toEqual([
            0,
            255,
            0,
            255, // Green pixel (was at 1,0)
            255,
            0,
            0,
            255, // Red pixel (was at 0,0)
            255,
            255,
            255,
            255, // White pixel (was at 1,1)
            0,
            0,
            255,
            255, // Blue pixel (was at 0,1)
          ]);
        });

        test("flipImageData - flips image data vertically", () => {
          // 2x2 image: [[R,G], [B,W]] -> [[B,W], [R,G]]
          const imageData = [
            255,
            0,
            0,
            255, // Red pixel (0,0)
            0,
            255,
            0,
            255, // Green pixel (1,0)
            0,
            0,
            255,
            255, // Blue pixel (0,1)
            255,
            255,
            255,
            255, // White pixel (1,1)
          ];

          const flippedV = flipImageData(imageData, 2, 2, "vertical");
          expect(flippedV).toEqual([
            0,
            0,
            255,
            255, // Blue pixel (was at 0,1)
            255,
            255,
            255,
            255, // White pixel (was at 1,1)
            255,
            0,
            0,
            255, // Red pixel (was at 0,0)
            0,
            255,
            0,
            255, // Green pixel (was at 1,0)
          ]);
        });

        test("rotateImageData90 - rotates image data 90 degrees clockwise", () => {
          // 2x2 image: [[R,G], [B,W]] -> [[B,R], [W,G]] (2x2 becomes 2x2)
          const imageData = [
            255,
            0,
            0,
            255, // Red pixel (0,0)
            0,
            255,
            0,
            255, // Green pixel (1,0)
            0,
            0,
            255,
            255, // Blue pixel (0,1)
            255,
            255,
            255,
            255, // White pixel (1,1)
          ];

          const rotated = rotateImageData90(imageData, 2, 2);
          expect(rotated.width).toBe(2); // height becomes width
          expect(rotated.height).toBe(2); // width becomes height
          expect(rotated.data).toEqual([
            0,
            0,
            255,
            255, // Blue pixel (rotated to 0,0)
            255,
            0,
            0,
            255, // Red pixel (rotated to 1,0)
            255,
            255,
            255,
            255, // White pixel (rotated to 0,1)
            0,
            255,
            0,
            255, // Green pixel (rotated to 1,1)
          ]);
        });
      });

      // Enhanced DOM-dependent tests with proper mocking
    });

    // Enhanced DOM-dependent tests with proper mocking
    describe("DOM-dependent Utilities (enhanced testing)", () => {
      let originalImage: any;
      let originalDocument: any;
      let originalFileReader: any;

      beforeEach(() => {
        // Store originals
        originalImage = global.Image;
        originalDocument = global.document;
        originalFileReader = global.FileReader;

        // Setup basic DOM mocks
        global.atob = (str: string) => Buffer.from(str, "base64").toString("binary");
        global.btoa = (str: string) => Buffer.from(str, "binary").toString("base64");
      });

      afterEach(() => {
        // Restore originals
        if (originalImage) global.Image = originalImage;
        if (originalDocument) global.document = originalDocument;
        if (originalFileReader) global.FileReader = originalFileReader;
      });

      test("base64ToBlob - converts base64 to Blob", () => {
        const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
        const blob = base64ToBlob(base64, "image/png");
        expect(blob).toBeInstanceOf(Blob);
        expect(blob.type).toBe("image/png");
      });

      test("blobToBase64 - converts Blob to base64 with success", async () => {
        global.FileReader = jest.fn().mockImplementation(() => ({
          result: "data:image/png;base64,testdata",
          onloadend: null,
          onerror: null,
          readAsDataURL: function (blob: Blob) {
            setTimeout(() => {
              if (this.onloadend) this.onloadend();
            }, 0);
          },
        })) as any;

        const mockBlob = new Blob(["test"], { type: "image/png" });
        const result = await blobToBase64(mockBlob);
        expect(result).toBe("data:image/png;base64,testdata");
      });

      test("blobToBase64 - handles FileReader errors", async () => {
        global.FileReader = jest.fn().mockImplementation(() => ({
          result: null,
          onloadend: null,
          onerror: null,
          readAsDataURL: function (blob: Blob) {
            setTimeout(() => {
              if (this.onerror) this.onerror(new Error("Read error"));
            }, 0);
          },
        })) as any;

        const mockBlob = new Blob(["test"], { type: "image/png" });
        await expect(blobToBase64(mockBlob)).rejects.toEqual(new Error("Read error"));
      });

      test.skip("resizeImage - resizes image successfully", async () => {
        global.Image = jest.fn().mockImplementation(() => {
          const img = {
            src: "",
            onload: null,
            onerror: null,
            width: 100,
            height: 100,
          };

          Object.defineProperty(img, "src", {
            set: function (value: string) {
              setTimeout(() => {
                if (this.onload) this.onload();
              }, 0);
            },
          });

          return img;
        }) as any;

        global.document = {
          createElement: (tagName: string) => {
            if (tagName === "canvas") {
              return {
                width: 0,
                height: 0,
                getContext: () => ({
                  drawImage: jest.fn(),
                }),
                toDataURL: () => "data:image/png;base64,resizedimage",
              };
            }
            return {};
          },
        } as any;

        const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
        const resizedBase64 = await resizeImage(base64, 50, 50);
        expect(resizedBase64).toBe("data:image/png;base64,resizedimage");
      });

      test("resizeImage - handles canvas context error", async () => {
        global.Image = jest.fn().mockImplementation(() => {
          const img = {
            onload: null,
            onerror: null,
            width: 100,
            height: 100,
          };

          Object.defineProperty(img, "src", {
            set: function (value: string) {
              setTimeout(() => {
                if (this.onload) this.onload();
              }, 0);
            },
          });

          return img;
        }) as any;

        global.document = {
          createElement: (tagName: string) => {
            if (tagName === "canvas") {
              return {
                width: 0,
                height: 0,
                getContext: () => null, // Return null to simulate error
              };
            }
            return {};
          },
        } as any;

        const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
        await expect(resizeImage(base64, 50, 50)).rejects.toThrow("Could not get canvas context");
      });

      test("resizeImage - handles image load error", async () => {
        global.Image = jest.fn().mockImplementation(() => {
          const img = {
            onload: null,
            onerror: null,
          };

          Object.defineProperty(img, "src", {
            set: function (value: string) {
              setTimeout(() => {
                if (this.onerror) this.onerror(new Error("Image load error"));
              }, 0);
            },
          });

          return img;
        }) as any;

        const base64 = "data:image/png;base64,invalid";
        await expect(resizeImage(base64, 50, 50)).rejects.toEqual(new Error("Image load error"));
      });

      test.skip("imageToGrayScale - converts image to grayscale", async () => {
        const mockImageData = {
          data: new Uint8ClampedArray([255, 0, 0, 255, 0, 255, 0, 255]), // Red and green pixels
        };

        global.Image = jest.fn().mockImplementation(() => {
          const img = {
            onload: null,
            onerror: null,
            width: 2,
            height: 1,
          };

          Object.defineProperty(img, "src", {
            set: function (value: string) {
              setTimeout(() => {
                if (this.onload) this.onload();
              }, 0);
            },
          });

          return img;
        }) as any;

        global.document = {
          createElement: (tagName: string) => {
            if (tagName === "canvas") {
              return {
                width: 0,
                height: 0,
                getContext: () => ({
                  drawImage: jest.fn(),
                  getImageData: () => mockImageData,
                  putImageData: jest.fn(),
                }),
                toDataURL: () => "data:image/png;base64,grayscaleimage",
              };
            }
            return {};
          },
        } as any;

        const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
        const grayBase64 = await imageToGrayScale(base64);
        expect(grayBase64).toBe("data:image/png;base64,grayscaleimage");

        // Check that grayscale conversion was applied to imageData
        const expectedGray1 = (255 + 0 + 0) / 3; // Red pixel to gray
        const expectedGray2 = (0 + 255 + 0) / 3; // Green pixel to gray
        expect(mockImageData.data[0]).toBe(expectedGray1);
        expect(mockImageData.data[1]).toBe(expectedGray1);
        expect(mockImageData.data[2]).toBe(expectedGray1);
        expect(mockImageData.data[4]).toBe(expectedGray2);
        expect(mockImageData.data[5]).toBe(expectedGray2);
        expect(mockImageData.data[6]).toBe(expectedGray2);
      });

      test("imageToGrayScale - handles canvas context error", async () => {
        global.Image = jest.fn().mockImplementation(() => {
          const img = {
            onload: null,
            onerror: null,
            width: 100,
            height: 100,
          };

          Object.defineProperty(img, "src", {
            set: function (value: string) {
              setTimeout(() => {
                if (this.onload) this.onload();
              }, 0);
            },
          });

          return img;
        }) as any;

        global.document = {
          createElement: (tagName: string) => {
            if (tagName === "canvas") {
              return {
                width: 0,
                height: 0,
                getContext: () => null,
              };
            }
            return {};
          },
        } as any;

        const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
        await expect(imageToGrayScale(base64)).rejects.toThrow("Could not get canvas context");
      });

      test("imageToGrayScale - handles image load error", async () => {
        global.Image = jest.fn().mockImplementation(() => {
          const img = {
            onload: null,
            onerror: null,
          };

          Object.defineProperty(img, "src", {
            set: function (value: string) {
              setTimeout(() => {
                if (this.onerror) this.onerror(new Error("Image load error"));
              }, 0);
            },
          });

          return img;
        }) as any;

        const base64 = "data:image/png;base64,invalid";
        await expect(imageToGrayScale(base64)).rejects.toEqual(new Error("Image load error"));
      });
    });
  });
});
