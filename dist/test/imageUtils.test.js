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
const globals_1 = require("@jest/globals");
const imageUtils_1 = require("../src/imageUtils");
// Import from their correct modules
const urlUtils_1 = require("../src/urlUtils");
const colorUtils_1 = require("../src/colorUtils");
(0, globals_1.describe)("ImageUtils", () => {
    (0, globals_1.describe)("Image Format Validation", () => {
        (0, globals_1.test)("isValidImageFormat - validates image formats", () => {
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("jpg")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("jpeg")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("png")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("gif")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("webp")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("svg")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("bmp")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("ico")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("tiff")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("tif")).toBe(true);
            // Test invalid formats
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("txt")).toBe(false);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("pdf")).toBe(false);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("doc")).toBe(false);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("")).toBe(false);
        });
        (0, globals_1.test)("isValidImageFormat - case insensitive", () => {
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("JPG")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("PNG")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("JPEG")).toBe(true);
        });
        (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("tif")).toBe(true);
        (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("JPG")).toBe(true); // Case insensitive
        (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("txt")).toBe(false);
        (0, globals_1.expect)((0, imageUtils_1.isValidImageFormat)("pdf")).toBe(false);
    });
    (0, globals_1.test)("getImageFormatFromExtension - extracts format from filename", () => {
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromExtension)("photo.jpg")).toBe("jpg");
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromExtension)("image.PNG")).toBe("png");
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromExtension)("avatar.jpeg")).toBe("jpeg");
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromExtension)("logo.svg")).toBe("svg");
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromExtension)("document.pdf")).toBe(null);
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromExtension)("noextension")).toBe(null);
    });
    (0, globals_1.test)("getImageFormatFromMimeType - converts MIME type to format", () => {
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromMimeType)("image/jpeg")).toBe("jpg");
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromMimeType)("image/png")).toBe("png");
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromMimeType)("image/gif")).toBe("gif");
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromMimeType)("image/webp")).toBe("webp");
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromMimeType)("image/svg+xml")).toBe("svg");
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromMimeType)("image/bmp")).toBe("bmp");
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromMimeType)("image/x-icon")).toBe("ico");
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromMimeType)("image/tiff")).toBe("tiff");
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromMimeType)("IMAGE/JPEG")).toBe("jpg"); // Case insensitive
        (0, globals_1.expect)((0, imageUtils_1.getImageFormatFromMimeType)("text/plain")).toBe(null);
    });
    (0, globals_1.test)("getMimeTypeFromFormat - converts format to MIME type", () => {
        (0, globals_1.expect)((0, imageUtils_1.getMimeTypeFromFormat)("jpg")).toBe("image/jpeg");
        (0, globals_1.expect)((0, imageUtils_1.getMimeTypeFromFormat)("jpeg")).toBe("image/jpeg");
        (0, globals_1.expect)((0, imageUtils_1.getMimeTypeFromFormat)("png")).toBe("image/png");
        (0, globals_1.expect)((0, imageUtils_1.getMimeTypeFromFormat)("gif")).toBe("image/gif");
        (0, globals_1.expect)((0, imageUtils_1.getMimeTypeFromFormat)("webp")).toBe("image/webp");
        (0, globals_1.expect)((0, imageUtils_1.getMimeTypeFromFormat)("svg")).toBe("image/svg+xml");
        (0, globals_1.expect)((0, imageUtils_1.getMimeTypeFromFormat)("bmp")).toBe("image/bmp");
        (0, globals_1.expect)((0, imageUtils_1.getMimeTypeFromFormat)("ico")).toBe("image/x-icon");
        (0, globals_1.expect)((0, imageUtils_1.getMimeTypeFromFormat)("tiff")).toBe("image/tiff");
        (0, globals_1.expect)((0, imageUtils_1.getMimeTypeFromFormat)("tif")).toBe("image/tiff");
        (0, globals_1.expect)((0, imageUtils_1.getMimeTypeFromFormat)("JPG")).toBe("image/jpeg"); // Case insensitive
        (0, globals_1.expect)((0, imageUtils_1.getMimeTypeFromFormat)("txt")).toBe(null);
    });
    (0, globals_1.describe)("Image URL Utilities", () => {
        (0, globals_1.test)("isImageUrl - detects image URLs", () => {
            (0, globals_1.expect)((0, urlUtils_1.isImageUrl)("https://example.com/photo.jpg")).toBe(true);
            (0, globals_1.expect)((0, urlUtils_1.isImageUrl)("https://example.com/image.PNG")).toBe(true);
            (0, globals_1.expect)((0, urlUtils_1.isImageUrl)("https://example.com/logo.svg")).toBe(true);
            (0, globals_1.expect)((0, urlUtils_1.isImageUrl)("https://example.com/photo.jpg?v=123")).toBe(true);
            (0, globals_1.expect)((0, urlUtils_1.isImageUrl)("https://example.com/document.pdf")).toBe(false);
            (0, globals_1.expect)((0, urlUtils_1.isImageUrl)("https://example.com/page")).toBe(false);
            (0, globals_1.expect)((0, urlUtils_1.isImageUrl)("not-a-url")).toBe(false);
        });
        (0, globals_1.test)("extractImageNameFromUrl - extracts image name from URL", () => {
            (0, globals_1.expect)((0, imageUtils_1.extractImageNameFromUrl)("https://example.com/photo.jpg")).toBe("photo.jpg");
            (0, globals_1.expect)((0, imageUtils_1.extractImageNameFromUrl)("https://example.com/images/logo.png")).toBe("logo.png");
            (0, globals_1.expect)((0, imageUtils_1.extractImageNameFromUrl)("https://example.com/photo.jpg?v=123")).toBe("photo.jpg");
            (0, globals_1.expect)((0, imageUtils_1.extractImageNameFromUrl)("https://example.com/document.pdf")).toBe(null);
            (0, globals_1.expect)((0, imageUtils_1.extractImageNameFromUrl)("https://example.com/")).toBe(null);
            (0, globals_1.expect)((0, imageUtils_1.extractImageNameFromUrl)("invalid-url")).toBe(null);
        });
    });
    (0, globals_1.describe)("Base64 Utilities", () => {
        const validBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVR";
        const invalidBase64 = "not-base64-data";
        (0, globals_1.test)("isBase64Image - validates base64 image strings", () => {
            (0, globals_1.expect)((0, imageUtils_1.isBase64Image)(validBase64)).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isBase64Image)("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isBase64Image)("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAE")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isBase64Image)("data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBY")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isBase64Image)("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0")).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isBase64Image)(invalidBase64)).toBe(false);
            (0, globals_1.expect)((0, imageUtils_1.isBase64Image)("data:text/plain;base64,SGVsbG8=")).toBe(false);
        });
        (0, globals_1.test)("getBase64ImageFormat - extracts format from base64", () => {
            (0, globals_1.expect)((0, imageUtils_1.getBase64ImageFormat)("data:image/jpeg;base64,/9j/4AAQ")).toBe("jpeg");
            (0, globals_1.expect)((0, imageUtils_1.getBase64ImageFormat)("data:image/png;base64,iVBORw0K")).toBe("png");
            (0, globals_1.expect)((0, imageUtils_1.getBase64ImageFormat)("data:image/gif;base64,R0lGODlh")).toBe("gif");
            (0, globals_1.expect)((0, imageUtils_1.getBase64ImageFormat)("data:image/webp;base64,UklGRiI")).toBe("webp");
            (0, globals_1.expect)((0, imageUtils_1.getBase64ImageFormat)("data:image/svg+xml;base64,PHN2Zy")).toBe("svg+xml");
            (0, globals_1.expect)((0, imageUtils_1.getBase64ImageFormat)(invalidBase64)).toBe(null);
        });
        (0, globals_1.test)("getBase64ImageSize - calculates base64 size in bytes", () => {
            const shortBase64 = "data:image/jpeg;base64,/9j/4A=="; // 6 chars of data
            (0, globals_1.expect)((0, imageUtils_1.getBase64ImageSize)(shortBase64)).toBe(6); // (6 * 3) / 4 = 4.5, rounded to 5
            (0, globals_1.expect)((0, imageUtils_1.getBase64ImageSize)(invalidBase64)).toBe(0);
            const longerBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg=="; // 24 chars of data
            (0, globals_1.expect)((0, imageUtils_1.getBase64ImageSize)(longerBase64)).toBe(18); // (24 * 3) / 4 = 18 bytes
        });
        (0, globals_1.test)("stripBase64Header - removes data URL header", () => {
            (0, globals_1.expect)((0, imageUtils_1.stripBase64Header)(validBase64)).toBe("/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVR");
            (0, globals_1.expect)((0, imageUtils_1.stripBase64Header)("data:image/png;base64,iVBORw0KGgo")).toBe("iVBORw0KGgo");
            (0, globals_1.expect)((0, imageUtils_1.stripBase64Header)("plainbase64data")).toBe("plainbase64data");
        });
        (0, globals_1.test)("addBase64Header - adds data URL header", () => {
            (0, globals_1.expect)((0, imageUtils_1.addBase64Header)("iVBORw0KGgo", "png")).toBe("data:image/png;base64,iVBORw0KGgo");
            (0, globals_1.expect)((0, imageUtils_1.addBase64Header)("/9j/4AAQ", "jpg")).toBe("data:image/jpeg;base64,/9j/4AAQ");
            (0, globals_1.expect)((0, imageUtils_1.addBase64Header)("R0lGODlh", "gif")).toBe("data:image/gif;base64,R0lGODlh");
            (0, globals_1.expect)((0, imageUtils_1.addBase64Header)("somedata", "unknown")).toBe("somedata"); // Unknown format
        });
    });
    (0, globals_1.describe)("Image Dimension Utilities", () => {
        (0, globals_1.test)("calculateAspectRatio - calculates width/height ratio", () => {
            (0, globals_1.expect)((0, imageUtils_1.calculateAspectRatio)(1920, 1080)).toBeCloseTo(1.778, 3);
            (0, globals_1.expect)((0, imageUtils_1.calculateAspectRatio)(1080, 1920)).toBeCloseTo(0.563, 3);
            (0, globals_1.expect)((0, imageUtils_1.calculateAspectRatio)(100, 100)).toBe(1);
            (0, globals_1.expect)((0, imageUtils_1.calculateAspectRatio)(800, 600)).toBeCloseTo(1.333, 3);
        });
        (0, globals_1.test)("calculateDimensionsFromAspectRatio - maintains aspect ratio", () => {
            // Target width only
            (0, globals_1.expect)((0, imageUtils_1.calculateDimensionsFromAspectRatio)(1920, 1080, 960)).toEqual({
                width: 960,
                height: 540,
            });
            // Target height only
            (0, globals_1.expect)((0, imageUtils_1.calculateDimensionsFromAspectRatio)(1920, 1080, undefined, 540)).toEqual({
                width: 960,
                height: 540,
            });
            // Both dimensions specified
            (0, globals_1.expect)((0, imageUtils_1.calculateDimensionsFromAspectRatio)(1920, 1080, 800, 600)).toEqual({
                width: 800,
                height: 600,
            });
            // No target dimensions
            (0, globals_1.expect)((0, imageUtils_1.calculateDimensionsFromAspectRatio)(1920, 1080)).toEqual({
                width: 1920,
                height: 1080,
            });
        });
        (0, globals_1.test)("isSquareImage - detects square images", () => {
            (0, globals_1.expect)((0, imageUtils_1.isSquareImage)(100, 100)).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isSquareImage)(500, 500)).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isSquareImage)(100, 200)).toBe(false);
            (0, globals_1.expect)((0, imageUtils_1.isSquareImage)(200, 100)).toBe(false);
        });
        (0, globals_1.test)("isPortraitImage - detects portrait orientation", () => {
            (0, globals_1.expect)((0, imageUtils_1.isPortraitImage)(100, 200)).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isPortraitImage)(600, 800)).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isPortraitImage)(200, 100)).toBe(false);
            (0, globals_1.expect)((0, imageUtils_1.isPortraitImage)(100, 100)).toBe(false);
        });
        (0, globals_1.test)("isLandscapeImage - detects landscape orientation", () => {
            (0, globals_1.expect)((0, imageUtils_1.isLandscapeImage)(200, 100)).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isLandscapeImage)(800, 600)).toBe(true);
            (0, globals_1.expect)((0, imageUtils_1.isLandscapeImage)(100, 200)).toBe(false);
            (0, globals_1.expect)((0, imageUtils_1.isLandscapeImage)(100, 100)).toBe(false);
        });
    });
    (0, globals_1.describe)("Color Utilities", () => {
        (0, globals_1.test)("hexToRgb - converts hex to RGB", () => {
            (0, globals_1.expect)((0, colorUtils_1.hexToRgb)("#FF0000")).toEqual({ r: 255, g: 0, b: 0 });
            (0, globals_1.expect)((0, colorUtils_1.hexToRgb)("#00FF00")).toEqual({ r: 0, g: 255, b: 0 });
            (0, globals_1.expect)((0, colorUtils_1.hexToRgb)("#0000FF")).toEqual({ r: 0, g: 0, b: 255 });
            (0, globals_1.expect)((0, colorUtils_1.hexToRgb)("FF0000")).toEqual({ r: 255, g: 0, b: 0 }); // Without #
            (0, globals_1.expect)((0, colorUtils_1.hexToRgb)("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
            (0, globals_1.expect)((0, colorUtils_1.hexToRgb)("#000000")).toEqual({ r: 0, g: 0, b: 0 });
            (0, globals_1.expect)((0, colorUtils_1.hexToRgb)("invalid")).toBe(null);
        });
        (0, globals_1.test)("rgbToHex - converts RGB to hex", () => {
            (0, globals_1.expect)((0, colorUtils_1.rgbToHex)(255, 0, 0)).toBe("#ff0000");
            (0, globals_1.expect)((0, colorUtils_1.rgbToHex)(0, 255, 0)).toBe("#00ff00");
            (0, globals_1.expect)((0, colorUtils_1.rgbToHex)(0, 0, 255)).toBe("#0000ff");
            (0, globals_1.expect)((0, colorUtils_1.rgbToHex)(255, 255, 255)).toBe("#ffffff");
            (0, globals_1.expect)((0, colorUtils_1.rgbToHex)(0, 0, 0)).toBe("#000000");
            (0, globals_1.expect)((0, colorUtils_1.rgbToHex)(128, 128, 128)).toBe("#808080");
            // Test clamping
            (0, globals_1.expect)((0, colorUtils_1.rgbToHex)(300, -10, 128)).toBe("#ff0080");
        });
        (0, globals_1.test)("rgbToGrayscale - converts RGB to grayscale", () => {
            (0, globals_1.expect)((0, imageUtils_1.rgbToGrayscale)(255, 0, 0)).toBe(76); // Red
            (0, globals_1.expect)((0, imageUtils_1.rgbToGrayscale)(0, 255, 0)).toBe(150); // Green (using 0.587 coefficient)
            (0, globals_1.expect)((0, imageUtils_1.rgbToGrayscale)(0, 0, 255)).toBe(29); // Blue
            (0, globals_1.expect)((0, imageUtils_1.rgbToGrayscale)(255, 255, 255)).toBe(255); // White
            (0, globals_1.expect)((0, imageUtils_1.rgbToGrayscale)(0, 0, 0)).toBe(0); // Black
            (0, globals_1.expect)((0, imageUtils_1.rgbToGrayscale)(128, 128, 128)).toBe(128); // Gray
        });
        (0, globals_1.test)("adjustBrightness - adjusts RGB brightness", () => {
            // Brighten
            (0, globals_1.expect)((0, imageUtils_1.adjustBrightness)(100, 100, 100, 1.5)).toEqual({ r: 150, g: 150, b: 150 });
            // Darken
            (0, globals_1.expect)((0, imageUtils_1.adjustBrightness)(100, 100, 100, 0.5)).toEqual({ r: 50, g: 50, b: 50 });
            // No change
            (0, globals_1.expect)((0, imageUtils_1.adjustBrightness)(100, 100, 100, 1)).toEqual({ r: 100, g: 100, b: 100 });
            // Test clamping
            (0, globals_1.expect)((0, imageUtils_1.adjustBrightness)(200, 200, 200, 2)).toEqual({ r: 255, g: 255, b: 255 });
            (0, globals_1.expect)((0, imageUtils_1.adjustBrightness)(100, 100, 100, 0)).toEqual({ r: 0, g: 0, b: 0 });
        });
    });
    (0, globals_1.describe)("File Size Utilities", () => {
        (0, globals_1.test)("formatImageFileSize - formats bytes to human readable", () => {
            (0, globals_1.expect)((0, imageUtils_1.formatImageFileSize)(0)).toBe("0 Bytes");
            (0, globals_1.expect)((0, imageUtils_1.formatImageFileSize)(1024)).toBe("1 KB");
            (0, globals_1.expect)((0, imageUtils_1.formatImageFileSize)(1048576)).toBe("1 MB");
            (0, globals_1.expect)((0, imageUtils_1.formatImageFileSize)(1073741824)).toBe("1 GB");
            (0, globals_1.expect)((0, imageUtils_1.formatImageFileSize)(1536)).toBe("1.5 KB");
            (0, globals_1.expect)((0, imageUtils_1.formatImageFileSize)(2097152)).toBe("2 MB");
        });
        (0, globals_1.test)("convertBytesToKB - converts bytes to kilobytes", () => {
            (0, globals_1.expect)((0, imageUtils_1.convertBytesToKB)(1024)).toBe(1);
            (0, globals_1.expect)((0, imageUtils_1.convertBytesToKB)(2048)).toBe(2);
            (0, globals_1.expect)((0, imageUtils_1.convertBytesToKB)(1536)).toBe(1.5);
            (0, globals_1.expect)((0, imageUtils_1.convertBytesToKB)(512)).toBe(0.5);
            (0, globals_1.expect)((0, imageUtils_1.convertBytesToKB)(0)).toBe(0);
        });
        (0, globals_1.test)("convertBytesToMB - converts bytes to megabytes", () => {
            (0, globals_1.expect)((0, imageUtils_1.convertBytesToMB)(1048576)).toBe(1);
            (0, globals_1.expect)((0, imageUtils_1.convertBytesToMB)(2097152)).toBe(2);
            (0, globals_1.expect)((0, imageUtils_1.convertBytesToMB)(1572864)).toBe(1.5);
            (0, globals_1.expect)((0, imageUtils_1.convertBytesToMB)(524288)).toBe(0.5);
            (0, globals_1.expect)((0, imageUtils_1.convertBytesToMB)(0)).toBe(0);
        });
        (0, globals_1.describe)("Image Quality Assessment", () => {
            (0, globals_1.test)("estimateImageQuality - estimates quality based on file size and dimensions", () => {
                // High quality: 3 bytes per pixel
                (0, globals_1.expect)((0, imageUtils_1.estimateImageQuality)(3000000, 1000, 1000)).toBe("high");
                // Medium quality: 1 byte per pixel
                (0, globals_1.expect)((0, imageUtils_1.estimateImageQuality)(1000000, 1000, 1000)).toBe("medium");
                // Low quality: 0.3 bytes per pixel
                (0, globals_1.expect)((0, imageUtils_1.estimateImageQuality)(300000, 1000, 1000)).toBe("low");
            });
            (0, globals_1.test)("getImageSizeCategory - categorizes images by size", () => {
                (0, globals_1.expect)((0, imageUtils_1.getImageSizeCategory)(100, 100)).toBe("thumbnail"); // 100px max
                (0, globals_1.expect)((0, imageUtils_1.getImageSizeCategory)(300, 200)).toBe("small"); // 300px max
                (0, globals_1.expect)((0, imageUtils_1.getImageSizeCategory)(600, 800)).toBe("medium"); // 800px max
                (0, globals_1.expect)((0, imageUtils_1.getImageSizeCategory)(1920, 1080)).toBe("large"); // 1920px max
                (0, globals_1.expect)((0, imageUtils_1.getImageSizeCategory)(4000, 3000)).toBe("extra-large"); // >1920px
                (0, globals_1.expect)((0, imageUtils_1.getImageSizeCategory)(50, 150)).toBe("thumbnail"); // Max dimension is 150
            });
            (0, globals_1.describe)("Image Transformation Utilities", () => {
                (0, globals_1.test)("flipImageData - flips image data horizontally", () => {
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
                    const flippedH = (0, imageUtils_1.flipImageData)(imageData, 2, 2, "horizontal");
                    (0, globals_1.expect)(flippedH).toEqual([
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
                (0, globals_1.test)("flipImageData - flips image data vertically", () => {
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
                    const flippedV = (0, imageUtils_1.flipImageData)(imageData, 2, 2, "vertical");
                    (0, globals_1.expect)(flippedV).toEqual([
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
                (0, globals_1.test)("rotateImageData90 - rotates image data 90 degrees clockwise", () => {
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
                    const rotated = (0, imageUtils_1.rotateImageData90)(imageData, 2, 2);
                    (0, globals_1.expect)(rotated.width).toBe(2); // height becomes width
                    (0, globals_1.expect)(rotated.height).toBe(2); // width becomes height
                    (0, globals_1.expect)(rotated.data).toEqual([
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
        (0, globals_1.describe)("DOM-dependent Utilities (enhanced testing)", () => {
            let originalImage;
            let originalDocument;
            let originalFileReader;
            beforeEach(() => {
                // Store originals
                originalImage = global.Image;
                originalDocument = global.document;
                originalFileReader = global.FileReader;
                // Setup basic DOM mocks
                global.atob = (str) => Buffer.from(str, "base64").toString("binary");
                global.btoa = (str) => Buffer.from(str, "binary").toString("base64");
            });
            afterEach(() => {
                // Restore originals
                if (originalImage)
                    global.Image = originalImage;
                if (originalDocument)
                    global.document = originalDocument;
                if (originalFileReader)
                    global.FileReader = originalFileReader;
            });
            (0, globals_1.test)("base64ToBlob - converts base64 to Blob", () => {
                const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
                const blob = (0, imageUtils_1.base64ToBlob)(base64, "image/png");
                (0, globals_1.expect)(blob).toBeInstanceOf(Blob);
                (0, globals_1.expect)(blob.type).toBe("image/png");
            });
            (0, globals_1.test)("blobToBase64 - converts Blob to base64 with success", () => __awaiter(void 0, void 0, void 0, function* () {
                global.FileReader = jest.fn().mockImplementation(() => ({
                    result: "data:image/png;base64,testdata",
                    onloadend: null,
                    onerror: null,
                    readAsDataURL: function (blob) {
                        setTimeout(() => {
                            if (this.onloadend)
                                this.onloadend();
                        }, 0);
                    },
                }));
                const mockBlob = new Blob(["test"], { type: "image/png" });
                const result = yield (0, imageUtils_1.blobToBase64)(mockBlob);
                (0, globals_1.expect)(result).toBe("data:image/png;base64,testdata");
            }));
            (0, globals_1.test)("blobToBase64 - handles FileReader errors", () => __awaiter(void 0, void 0, void 0, function* () {
                global.FileReader = jest.fn().mockImplementation(() => ({
                    result: null,
                    onloadend: null,
                    onerror: null,
                    readAsDataURL: function (blob) {
                        setTimeout(() => {
                            if (this.onerror)
                                this.onerror(new Error("Read error"));
                        }, 0);
                    },
                }));
                const mockBlob = new Blob(["test"], { type: "image/png" });
                yield (0, globals_1.expect)((0, imageUtils_1.blobToBase64)(mockBlob)).rejects.toEqual(new Error("Read error"));
            }));
            globals_1.test.skip("resizeImage - resizes image successfully", () => __awaiter(void 0, void 0, void 0, function* () {
                global.Image = jest.fn().mockImplementation(() => {
                    const img = {
                        src: "",
                        onload: null,
                        onerror: null,
                        width: 100,
                        height: 100,
                    };
                    Object.defineProperty(img, "src", {
                        set: function (value) {
                            setTimeout(() => {
                                if (this.onload)
                                    this.onload();
                            }, 0);
                        },
                    });
                    return img;
                });
                global.document = {
                    createElement: (tagName) => {
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
                };
                const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
                const resizedBase64 = yield (0, imageUtils_1.resizeImage)(base64, 50, 50);
                (0, globals_1.expect)(resizedBase64).toBe("data:image/png;base64,resizedimage");
            }));
            (0, globals_1.test)("resizeImage - handles canvas context error", () => __awaiter(void 0, void 0, void 0, function* () {
                global.Image = jest.fn().mockImplementation(() => {
                    const img = {
                        onload: null,
                        onerror: null,
                        width: 100,
                        height: 100,
                    };
                    Object.defineProperty(img, "src", {
                        set: function (value) {
                            setTimeout(() => {
                                if (this.onload)
                                    this.onload();
                            }, 0);
                        },
                    });
                    return img;
                });
                global.document = {
                    createElement: (tagName) => {
                        if (tagName === "canvas") {
                            return {
                                width: 0,
                                height: 0,
                                getContext: () => null, // Return null to simulate error
                            };
                        }
                        return {};
                    },
                };
                const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
                yield (0, globals_1.expect)((0, imageUtils_1.resizeImage)(base64, 50, 50)).rejects.toThrow("Could not get canvas context");
            }));
            (0, globals_1.test)("resizeImage - handles image load error", () => __awaiter(void 0, void 0, void 0, function* () {
                global.Image = jest.fn().mockImplementation(() => {
                    const img = {
                        onload: null,
                        onerror: null,
                    };
                    Object.defineProperty(img, "src", {
                        set: function (value) {
                            setTimeout(() => {
                                if (this.onerror)
                                    this.onerror(new Error("Image load error"));
                            }, 0);
                        },
                    });
                    return img;
                });
                const base64 = "data:image/png;base64,invalid";
                yield (0, globals_1.expect)((0, imageUtils_1.resizeImage)(base64, 50, 50)).rejects.toEqual(new Error("Image load error"));
            }));
            globals_1.test.skip("imageToGrayScale - converts image to grayscale", () => __awaiter(void 0, void 0, void 0, function* () {
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
                        set: function (value) {
                            setTimeout(() => {
                                if (this.onload)
                                    this.onload();
                            }, 0);
                        },
                    });
                    return img;
                });
                global.document = {
                    createElement: (tagName) => {
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
                };
                const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
                const grayBase64 = yield (0, imageUtils_1.imageToGrayScale)(base64);
                (0, globals_1.expect)(grayBase64).toBe("data:image/png;base64,grayscaleimage");
                // Check that grayscale conversion was applied to imageData
                const expectedGray1 = (255 + 0 + 0) / 3; // Red pixel to gray
                const expectedGray2 = (0 + 255 + 0) / 3; // Green pixel to gray
                (0, globals_1.expect)(mockImageData.data[0]).toBe(expectedGray1);
                (0, globals_1.expect)(mockImageData.data[1]).toBe(expectedGray1);
                (0, globals_1.expect)(mockImageData.data[2]).toBe(expectedGray1);
                (0, globals_1.expect)(mockImageData.data[4]).toBe(expectedGray2);
                (0, globals_1.expect)(mockImageData.data[5]).toBe(expectedGray2);
                (0, globals_1.expect)(mockImageData.data[6]).toBe(expectedGray2);
            }));
            (0, globals_1.test)("imageToGrayScale - handles canvas context error", () => __awaiter(void 0, void 0, void 0, function* () {
                global.Image = jest.fn().mockImplementation(() => {
                    const img = {
                        onload: null,
                        onerror: null,
                        width: 100,
                        height: 100,
                    };
                    Object.defineProperty(img, "src", {
                        set: function (value) {
                            setTimeout(() => {
                                if (this.onload)
                                    this.onload();
                            }, 0);
                        },
                    });
                    return img;
                });
                global.document = {
                    createElement: (tagName) => {
                        if (tagName === "canvas") {
                            return {
                                width: 0,
                                height: 0,
                                getContext: () => null,
                            };
                        }
                        return {};
                    },
                };
                const base64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA";
                yield (0, globals_1.expect)((0, imageUtils_1.imageToGrayScale)(base64)).rejects.toThrow("Could not get canvas context");
            }));
            (0, globals_1.test)("imageToGrayScale - handles image load error", () => __awaiter(void 0, void 0, void 0, function* () {
                global.Image = jest.fn().mockImplementation(() => {
                    const img = {
                        onload: null,
                        onerror: null,
                    };
                    Object.defineProperty(img, "src", {
                        set: function (value) {
                            setTimeout(() => {
                                if (this.onerror)
                                    this.onerror(new Error("Image load error"));
                            }, 0);
                        },
                    });
                    return img;
                });
                const base64 = "data:image/png;base64,invalid";
                yield (0, globals_1.expect)((0, imageUtils_1.imageToGrayScale)(base64)).rejects.toEqual(new Error("Image load error"));
            }));
        });
    });
});
