"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotateImageData90 = exports.flipImageData = exports.getImageSizeCategory = exports.estimateImageQuality = exports.convertBytesToMB = exports.convertBytesToKB = exports.formatImageFileSize = exports.adjustBrightness = exports.rgbToGrayscale = exports.isLandscapeImage = exports.isPortraitImage = exports.isSquareImage = exports.calculateDimensionsFromAspectRatio = exports.calculateAspectRatio = exports.addBase64Header = exports.stripBase64Header = exports.getBase64ImageSize = exports.getBase64ImageFormat = exports.isBase64Image = exports.extractImageNameFromUrl = exports.getMimeTypeFromFormat = exports.getImageFormatFromMimeType = exports.getImageFormatFromExtension = exports.isValidImageFormat = exports.imageToGrayScale = exports.resizeImage = exports.blobToBase64 = exports.base64ToBlob = void 0;
// DOM-based utilities (existing)
const base64ToBlob = (base64, contentType) => {
    const byteCharacters = atob(base64.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
};
exports.base64ToBlob = base64ToBlob;
const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};
exports.blobToBase64 = blobToBase64;
const resizeImage = (base64, width, height) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = base64;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL());
            }
            else {
                reject(new Error("Could not get canvas context"));
            }
        };
        img.onerror = reject;
    });
};
exports.resizeImage = resizeImage;
const imageToGrayScale = (base64) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = base64;
        img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                for (let i = 0; i < imageData.data.length; i += 4) {
                    const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
                    imageData.data[i] = avg;
                    imageData.data[i + 1] = avg;
                    imageData.data[i + 2] = avg;
                }
                ctx.putImageData(imageData, 0, 0);
                resolve(canvas.toDataURL());
            }
            else {
                reject(new Error("Could not get canvas context"));
            }
        };
        img.onerror = reject;
    });
};
exports.imageToGrayScale = imageToGrayScale;
// ===== NEW: DOM-independent utilities (easily testable) =====
// Image format validation
const isValidImageFormat = (format) => {
    const validFormats = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico", "tiff", "tif"];
    return validFormats.includes(format.toLowerCase());
};
exports.isValidImageFormat = isValidImageFormat;
const getImageFormatFromExtension = (filename) => {
    var _a;
    const extension = (_a = filename.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    return extension && (0, exports.isValidImageFormat)(extension) ? extension : null;
};
exports.getImageFormatFromExtension = getImageFormatFromExtension;
const getImageFormatFromMimeType = (mimeType) => {
    const mimeToFormat = {
        "image/jpeg": "jpg",
        "image/png": "png",
        "image/gif": "gif",
        "image/webp": "webp",
        "image/svg+xml": "svg",
        "image/bmp": "bmp",
        "image/x-icon": "ico",
        "image/tiff": "tiff",
    };
    return mimeToFormat[mimeType.toLowerCase()] || null;
};
exports.getImageFormatFromMimeType = getImageFormatFromMimeType;
const getMimeTypeFromFormat = (format) => {
    const formatToMime = {
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        svg: "image/svg+xml",
        bmp: "image/bmp",
        ico: "image/x-icon",
        tiff: "image/tiff",
        tif: "image/tiff",
    };
    return formatToMime[format.toLowerCase()] || null;
};
exports.getMimeTypeFromFormat = getMimeTypeFromFormat;
const extractImageNameFromUrl = (url) => {
    try {
        const urlObj = new URL(url);
        const pathname = urlObj.pathname;
        const segments = pathname.split("/");
        const lastSegment = segments[segments.length - 1];
        // Check if the file has an image extension
        const hasImageExtension = lastSegment && /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|tiff|tif)(\?.*)?$/i.test(lastSegment);
        return hasImageExtension ? lastSegment.split("?")[0] : null;
    }
    catch (_a) {
        return null;
    }
};
exports.extractImageNameFromUrl = extractImageNameFromUrl;
// Base64 utilities
const isBase64Image = (base64) => {
    const base64Regex = /^data:image\/(jpeg|jpg|png|gif|webp|svg\+xml|bmp|x-icon|tiff);base64,/i;
    return base64Regex.test(base64);
};
exports.isBase64Image = isBase64Image;
const getBase64ImageFormat = (base64) => {
    const match = base64.match(/^data:image\/([^;]+);base64,/i);
    return match ? match[1] : null;
};
exports.getBase64ImageFormat = getBase64ImageFormat;
const getBase64ImageSize = (base64) => {
    if (!(0, exports.isBase64Image)(base64))
        return 0;
    const base64Data = base64.split(",")[1];
    return Math.round((base64Data.length * 3) / 4);
};
exports.getBase64ImageSize = getBase64ImageSize;
const stripBase64Header = (base64) => {
    return base64.includes(",") ? base64.split(",")[1] : base64;
};
exports.stripBase64Header = stripBase64Header;
const addBase64Header = (base64Data, format) => {
    const mimeType = (0, exports.getMimeTypeFromFormat)(format);
    return mimeType ? `data:${mimeType};base64,${base64Data}` : base64Data;
};
exports.addBase64Header = addBase64Header;
// Image dimension utilities
const calculateAspectRatio = (width, height) => {
    return width / height;
};
exports.calculateAspectRatio = calculateAspectRatio;
const calculateDimensionsFromAspectRatio = (originalWidth, originalHeight, targetWidth, targetHeight) => {
    const aspectRatio = (0, exports.calculateAspectRatio)(originalWidth, originalHeight);
    if (targetWidth && !targetHeight) {
        return {
            width: targetWidth,
            height: Math.round(targetWidth / aspectRatio),
        };
    }
    if (targetHeight && !targetWidth) {
        return {
            width: Math.round(targetHeight * aspectRatio),
            height: targetHeight,
        };
    }
    if (targetWidth && targetHeight) {
        return { width: targetWidth, height: targetHeight };
    }
    return { width: originalWidth, height: originalHeight };
};
exports.calculateDimensionsFromAspectRatio = calculateDimensionsFromAspectRatio;
const isSquareImage = (width, height) => {
    return width === height;
};
exports.isSquareImage = isSquareImage;
const isPortraitImage = (width, height) => {
    return height > width;
};
exports.isPortraitImage = isPortraitImage;
const isLandscapeImage = (width, height) => {
    return width > height;
};
exports.isLandscapeImage = isLandscapeImage;
const rgbToGrayscale = (r, g, b) => {
    return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
};
exports.rgbToGrayscale = rgbToGrayscale;
const adjustBrightness = (r, g, b, factor) => {
    return {
        r: Math.max(0, Math.min(255, Math.round(r * factor))),
        g: Math.max(0, Math.min(255, Math.round(g * factor))),
        b: Math.max(0, Math.min(255, Math.round(b * factor))),
    };
};
exports.adjustBrightness = adjustBrightness;
// File size utilities
const formatImageFileSize = (bytes) => {
    if (bytes === 0)
        return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
exports.formatImageFileSize = formatImageFileSize;
const convertBytesToKB = (bytes) => {
    return Math.round((bytes / 1024) * 100) / 100;
};
exports.convertBytesToKB = convertBytesToKB;
const convertBytesToMB = (bytes) => {
    return Math.round((bytes / (1024 * 1024)) * 100) / 100;
};
exports.convertBytesToMB = convertBytesToMB;
// Image quality assessment
const estimateImageQuality = (fileSize, width, height) => {
    const pixelCount = width * height;
    const bytesPerPixel = fileSize / pixelCount;
    if (bytesPerPixel < 0.5)
        return "low";
    if (bytesPerPixel < 2)
        return "medium";
    return "high";
};
exports.estimateImageQuality = estimateImageQuality;
const getImageSizeCategory = (width, height) => {
    const maxDimension = Math.max(width, height);
    if (maxDimension <= 150)
        return "thumbnail";
    if (maxDimension <= 400)
        return "small";
    if (maxDimension <= 800)
        return "medium";
    if (maxDimension <= 1920)
        return "large";
    return "extra-large";
};
exports.getImageSizeCategory = getImageSizeCategory;
// Image transformation utilities
const flipImageData = (imageData, width, height, direction) => {
    const result = new Array(imageData.length);
    const channels = 4; // RGBA
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const sourceIndex = (y * width + x) * channels;
            let targetIndex;
            if (direction === "horizontal") {
                targetIndex = (y * width + (width - 1 - x)) * channels;
            }
            else {
                targetIndex = ((height - 1 - y) * width + x) * channels;
            }
            for (let c = 0; c < channels; c++) {
                result[targetIndex + c] = imageData[sourceIndex + c];
            }
        }
    }
    return result;
};
exports.flipImageData = flipImageData;
const rotateImageData90 = (imageData, width, height) => {
    const result = new Array(imageData.length);
    const channels = 4; // RGBA
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const sourceIndex = (y * width + x) * channels;
            const targetIndex = (x * height + (height - 1 - y)) * channels;
            for (let c = 0; c < channels; c++) {
                result[targetIndex + c] = imageData[sourceIndex + c];
            }
        }
    }
    return {
        data: result,
        width: height,
        height: width,
    };
};
exports.rotateImageData90 = rotateImageData90;
