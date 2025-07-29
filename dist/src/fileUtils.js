"use strict";
/**
 * File utility functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.compressImage = exports.arrayToCSV = exports.parseCSV = exports.sanitizeFileName = exports.generateUniqueFileName = exports.validateFileSize = exports.validateFileType = exports.readFileAsArrayBuffer = exports.readFileAsDataURL = exports.readFileAsText = exports.downloadFile = exports.getMimeType = exports.isCodeFile = exports.isArchiveFile = exports.isDocumentFile = exports.isAudioFile = exports.isVideoFile = exports.isImageFile = exports.getFileNameWithoutExtension = exports.getFileName = exports.getFileExtensionFromPath = exports.formatFileSize = void 0;
const formatFileSize = (bytes) => {
    if (bytes === 0)
        return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
exports.formatFileSize = formatFileSize;
const getFileExtensionFromPath = (filename) => {
    const lastDot = filename.lastIndexOf(".");
    return lastDot !== -1 ? filename.slice(lastDot + 1).toLowerCase() : "";
};
exports.getFileExtensionFromPath = getFileExtensionFromPath;
const getFileName = (filepath) => {
    if (!filepath)
        return "";
    const normalizedPath = filepath.replace(/\\/g, "/");
    const parts = normalizedPath.split("/");
    return parts[parts.length - 1] || "";
};
exports.getFileName = getFileName;
const getFileNameWithoutExtension = (filename) => {
    const lastDot = filename.lastIndexOf(".");
    return lastDot !== -1 ? filename.slice(0, lastDot) : filename;
};
exports.getFileNameWithoutExtension = getFileNameWithoutExtension;
const isImageFile = (filename) => {
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico", "tiff"];
    const extension = (0, exports.getFileExtensionFromPath)(filename);
    return imageExtensions.includes(extension);
};
exports.isImageFile = isImageFile;
const isVideoFile = (filename) => {
    const videoExtensions = ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv", "m4v", "3gp"];
    const extension = (0, exports.getFileExtensionFromPath)(filename);
    return videoExtensions.includes(extension);
};
exports.isVideoFile = isVideoFile;
const isAudioFile = (filename) => {
    const audioExtensions = ["mp3", "wav", "ogg", "aac", "flac", "m4a", "wma"];
    const extension = (0, exports.getFileExtensionFromPath)(filename);
    return audioExtensions.includes(extension);
};
exports.isAudioFile = isAudioFile;
const isDocumentFile = (filename) => {
    const documentExtensions = ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "rtf"];
    const extension = (0, exports.getFileExtensionFromPath)(filename);
    return documentExtensions.includes(extension);
};
exports.isDocumentFile = isDocumentFile;
const isArchiveFile = (filename) => {
    const archiveExtensions = ["zip", "rar", "7z", "tar", "gz", "bz2", "xz"];
    const extension = (0, exports.getFileExtensionFromPath)(filename);
    return archiveExtensions.includes(extension);
};
exports.isArchiveFile = isArchiveFile;
const isCodeFile = (filename) => {
    const codeExtensions = [
        "js",
        "ts",
        "jsx",
        "tsx",
        "html",
        "css",
        "scss",
        "sass",
        "less",
        "py",
        "java",
        "c",
        "cpp",
        "h",
        "hpp",
        "cs",
        "php",
        "rb",
        "go",
        "rs",
        "swift",
        "kt",
        "dart",
        "vue",
        "svelte",
        "json",
        "xml",
        "yaml",
        "yml",
    ];
    const extension = (0, exports.getFileExtensionFromPath)(filename);
    return codeExtensions.includes(extension);
};
exports.isCodeFile = isCodeFile;
const getMimeType = (filename) => {
    const extension = (0, exports.getFileExtensionFromPath)(filename);
    const mimeTypes = {
        // Images
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp",
        svg: "image/svg+xml",
        bmp: "image/bmp",
        ico: "image/x-icon",
        tiff: "image/tiff",
        // Videos
        mp4: "video/mp4",
        avi: "video/x-msvideo",
        mov: "video/quicktime",
        wmv: "video/x-ms-wmv",
        flv: "video/x-flv",
        webm: "video/webm",
        mkv: "video/x-matroska",
        // Audio
        mp3: "audio/mpeg",
        wav: "audio/wav",
        ogg: "audio/ogg",
        aac: "audio/aac",
        flac: "audio/flac",
        m4a: "audio/mp4",
        // Documents
        pdf: "application/pdf",
        doc: "application/msword",
        docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        xls: "application/vnd.ms-excel",
        xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ppt: "application/vnd.ms-powerpoint",
        pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        txt: "text/plain",
        // Web
        html: "text/html",
        css: "text/css",
        js: "application/javascript",
        json: "application/json",
        xml: "application/xml",
        // Archives
        zip: "application/zip",
        rar: "application/x-rar-compressed",
        "7z": "application/x-7z-compressed",
        tar: "application/x-tar",
        gz: "application/gzip",
    };
    return mimeTypes[extension] || "application/octet-stream";
};
exports.getMimeType = getMimeType;
const downloadFile = (content, filename, mimeType) => {
    const blob = content instanceof Blob
        ? content
        : new Blob([content], {
            type: mimeType || (0, exports.getMimeType)(filename),
        });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
exports.downloadFile = downloadFile;
const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file);
    });
};
exports.readFileAsText = readFileAsText;
const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
};
exports.readFileAsDataURL = readFileAsDataURL;
const readFileAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
};
exports.readFileAsArrayBuffer = readFileAsArrayBuffer;
const validateFileType = (file, allowedTypes) => {
    const extension = (0, exports.getFileExtensionFromPath)(file.name);
    return allowedTypes.map((type) => type.toLowerCase()).includes(extension);
};
exports.validateFileType = validateFileType;
const validateFileSize = (file, maxSizeInBytes) => {
    return file.size <= maxSizeInBytes;
};
exports.validateFileSize = validateFileSize;
const generateUniqueFileName = (originalName) => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    const lastDot = originalName.lastIndexOf(".");
    const extension = lastDot !== -1 ? originalName.slice(lastDot + 1) : "";
    const nameWithoutExt = (0, exports.getFileNameWithoutExtension)(originalName);
    return extension
        ? `${nameWithoutExt}_${timestamp}_${random}.${extension}`
        : `${nameWithoutExt}_${timestamp}_${random}`;
};
exports.generateUniqueFileName = generateUniqueFileName;
const sanitizeFileName = (filename) => {
    // Remove or replace invalid characters
    return filename
        .replace(/[<>:"/\\|?*]/g, "_")
        .replace(/\s+/g, "_")
        .replace(/_{2,}/g, "_")
        .replace(/^_+|_+$/g, "");
};
exports.sanitizeFileName = sanitizeFileName;
const parseCSV = (csvText, delimiter = ",") => {
    const lines = csvText.split("\n");
    const result = [];
    for (const line of lines) {
        if (line.trim() === "")
            continue;
        const row = [];
        let current = "";
        let inQuotes = false;
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
                inQuotes = !inQuotes;
            }
            else if (char === delimiter && !inQuotes) {
                row.push(current.trim());
                current = "";
            }
            else {
                current += char;
            }
        }
        row.push(current.trim());
        result.push(row);
    }
    return result;
};
exports.parseCSV = parseCSV;
const arrayToCSV = (data, delimiter = ",") => {
    return data
        .map((row) => row
        .map((cell) => {
        const stringCell = String(cell);
        // Escape quotes and wrap in quotes if contains delimiter or quotes
        if (stringCell.includes(delimiter) || stringCell.includes('"') || stringCell.includes("\n")) {
            return `"${stringCell.replace(/"/g, '""')}"`;
        }
        return stringCell;
    })
        .join(delimiter))
        .join("\n");
};
exports.arrayToCSV = arrayToCSV;
const compressImage = (file, quality = 0.8, maxWidth = 1920, maxHeight = 1080) => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            // Calculate new dimensions
            let { width, height } = img;
            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }
            if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
            }
            canvas.width = width;
            canvas.height = height;
            // Draw and compress
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob);
                }
                else {
                    reject(new Error("Failed to compress image"));
                }
            }, "image/jpeg", quality);
        };
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = URL.createObjectURL(file);
    });
};
exports.compressImage = compressImage;
