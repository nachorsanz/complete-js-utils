export declare const base64ToBlob: (base64: string, contentType: string) => Blob;
export declare const blobToBase64: (blob: Blob) => Promise<string>;
export declare const resizeImage: (base64: string, width: number, height: number) => Promise<string>;
export declare const imageToGrayScale: (base64: string) => Promise<string>;
export declare const isValidImageFormat: (format: string) => boolean;
export declare const getImageFormatFromExtension: (filename: string) => string | null;
export declare const getImageFormatFromMimeType: (mimeType: string) => string | null;
export declare const getMimeTypeFromFormat: (format: string) => string | null;
export declare const extractImageNameFromUrl: (url: string) => string | null;
export declare const isBase64Image: (base64: string) => boolean;
export declare const getBase64ImageFormat: (base64: string) => string | null;
export declare const getBase64ImageSize: (base64: string) => number;
export declare const stripBase64Header: (base64: string) => string;
export declare const addBase64Header: (base64Data: string, format: string) => string;
export declare const calculateAspectRatio: (width: number, height: number) => number;
export declare const calculateDimensionsFromAspectRatio: (originalWidth: number, originalHeight: number, targetWidth?: number, targetHeight?: number) => {
    width: number;
    height: number;
};
export declare const isSquareImage: (width: number, height: number) => boolean;
export declare const isPortraitImage: (width: number, height: number) => boolean;
export declare const isLandscapeImage: (width: number, height: number) => boolean;
export declare const rgbToGrayscale: (r: number, g: number, b: number) => number;
export declare const adjustBrightness: (r: number, g: number, b: number, factor: number) => {
    r: number;
    g: number;
    b: number;
};
export declare const formatImageFileSize: (bytes: number) => string;
export declare const convertBytesToKB: (bytes: number) => number;
export declare const convertBytesToMB: (bytes: number) => number;
export declare const estimateImageQuality: (fileSize: number, width: number, height: number) => "low" | "medium" | "high";
export declare const getImageSizeCategory: (width: number, height: number) => "thumbnail" | "small" | "medium" | "large" | "extra-large";
export declare const flipImageData: (imageData: number[], width: number, height: number, direction: "horizontal" | "vertical") => number[];
export declare const rotateImageData90: (imageData: number[], width: number, height: number) => {
    data: number[];
    width: number;
    height: number;
};
