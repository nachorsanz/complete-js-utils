export declare const base64ToBlob: (base64: string, contentType: string) => Blob;
export declare const blobToBase64: (blob: Blob) => Promise<string>;
export declare const resizeImage: (base64: string, width: number, height: number) => Promise<string>;
export declare const imageToGrayScale: (base64: string) => Promise<string>;
