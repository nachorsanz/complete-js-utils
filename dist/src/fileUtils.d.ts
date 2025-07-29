/**
 * File utility functions
 */
export declare const formatFileSize: (bytes: number) => string;
export declare const getFileExtensionFromPath: (filename: string) => string;
export declare const getFileName: (filepath: string) => string;
export declare const getFileNameWithoutExtension: (filename: string) => string;
export declare const isImageFile: (filename: string) => boolean;
export declare const isVideoFile: (filename: string) => boolean;
export declare const isAudioFile: (filename: string) => boolean;
export declare const isDocumentFile: (filename: string) => boolean;
export declare const isArchiveFile: (filename: string) => boolean;
export declare const isCodeFile: (filename: string) => boolean;
export declare const getMimeType: (filename: string) => string;
export declare const downloadFile: (content: string | Blob, filename: string, mimeType?: string) => void;
export declare const readFileAsText: (file: File) => Promise<string>;
export declare const readFileAsDataURL: (file: File) => Promise<string>;
export declare const readFileAsArrayBuffer: (file: File) => Promise<ArrayBuffer>;
export declare const validateFileType: (file: File, allowedTypes: string[]) => boolean;
export declare const validateFileSize: (file: File, maxSizeInBytes: number) => boolean;
export declare const generateUniqueFileName: (originalName: string) => string;
export declare const sanitizeFileName: (filename: string) => string;
export declare const parseCSV: (csvText: string, delimiter?: string) => string[][];
export declare const arrayToCSV: (data: any[][], delimiter?: string) => string;
export declare const compressImage: (file: File, quality?: number, maxWidth?: number, maxHeight?: number) => Promise<Blob>;
