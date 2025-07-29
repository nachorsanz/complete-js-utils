// DOM-based utilities (existing)
export const base64ToBlob = (base64: string, contentType: string): Blob => {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length).fill(0).map((_, i) => byteCharacters.charCodeAt(i));
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
};

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const resizeImage = (base64: string, width: number, height: number): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
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
      } else {
        reject(new Error("Could not get canvas context"));
      }
    };
    img.onerror = reject;
  });
};

export const imageToGrayScale = (base64: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
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
      } else {
        reject(new Error("Could not get canvas context"));
      }
    };
    img.onerror = reject;
  });
};

// ===== NEW: DOM-independent utilities (easily testable) =====

// Image format validation
export const isValidImageFormat = (format: string): boolean => {
  const validFormats = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "ico", "tiff", "tif"];
  return validFormats.includes(format.toLowerCase());
};

export const getImageFormatFromExtension = (filename: string): string | null => {
  const extension = filename.split(".").pop()?.toLowerCase();
  return extension && isValidImageFormat(extension) ? extension : null;
};

export const getImageFormatFromMimeType = (mimeType: string): string | null => {
  const mimeToFormat: Record<string, string> = {
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

export const getMimeTypeFromFormat = (format: string): string | null => {
  const formatToMime: Record<string, string> = {
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

export const extractImageNameFromUrl = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const segments = pathname.split("/");
    const lastSegment = segments[segments.length - 1];

    // Check if the file has an image extension
    const hasImageExtension =
      lastSegment && /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico|tiff|tif)(\?.*)?$/i.test(lastSegment);

    return hasImageExtension ? lastSegment.split("?")[0] : null;
  } catch {
    return null;
  }
};

// Base64 utilities
export const isBase64Image = (base64: string): boolean => {
  const base64Regex = /^data:image\/(jpeg|jpg|png|gif|webp|svg\+xml|bmp|x-icon|tiff);base64,/i;
  return base64Regex.test(base64);
};

export const getBase64ImageFormat = (base64: string): string | null => {
  const match = base64.match(/^data:image\/([^;]+);base64,/i);
  return match ? match[1] : null;
};

export const getBase64ImageSize = (base64: string): number => {
  if (!isBase64Image(base64)) return 0;
  const base64Data = base64.split(",")[1];
  return Math.round((base64Data.length * 3) / 4);
};

export const stripBase64Header = (base64: string): string => {
  return base64.includes(",") ? base64.split(",")[1] : base64;
};

export const addBase64Header = (base64Data: string, format: string): string => {
  const mimeType = getMimeTypeFromFormat(format);
  return mimeType ? `data:${mimeType};base64,${base64Data}` : base64Data;
};

// Image dimension utilities
export const calculateAspectRatio = (width: number, height: number): number => {
  return width / height;
};

export const calculateDimensionsFromAspectRatio = (
  originalWidth: number,
  originalHeight: number,
  targetWidth?: number,
  targetHeight?: number,
): { width: number; height: number } => {
  const aspectRatio = calculateAspectRatio(originalWidth, originalHeight);

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

export const isSquareImage = (width: number, height: number): boolean => {
  return width === height;
};

export const isPortraitImage = (width: number, height: number): boolean => {
  return height > width;
};

export const isLandscapeImage = (width: number, height: number): boolean => {
  return width > height;
};

export const rgbToGrayscale = (r: number, g: number, b: number): number => {
  return Math.round(0.299 * r + 0.587 * g + 0.114 * b);
};

export const adjustBrightness = (
  r: number,
  g: number,
  b: number,
  factor: number,
): { r: number; g: number; b: number } => {
  return {
    r: Math.max(0, Math.min(255, Math.round(r * factor))),
    g: Math.max(0, Math.min(255, Math.round(g * factor))),
    b: Math.max(0, Math.min(255, Math.round(b * factor))),
  };
};

// File size utilities
export const formatImageFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const convertBytesToKB = (bytes: number): number => {
  return Math.round((bytes / 1024) * 100) / 100;
};

export const convertBytesToMB = (bytes: number): number => {
  return Math.round((bytes / (1024 * 1024)) * 100) / 100;
};

// Image quality assessment
export const estimateImageQuality = (fileSize: number, width: number, height: number): "low" | "medium" | "high" => {
  const pixelCount = width * height;
  const bytesPerPixel = fileSize / pixelCount;

  if (bytesPerPixel < 0.5) return "low";
  if (bytesPerPixel < 2) return "medium";
  return "high";
};

export const getImageSizeCategory = (
  width: number,
  height: number,
): "thumbnail" | "small" | "medium" | "large" | "extra-large" => {
  const maxDimension = Math.max(width, height);

  if (maxDimension <= 150) return "thumbnail";
  if (maxDimension <= 400) return "small";
  if (maxDimension <= 800) return "medium";
  if (maxDimension <= 1920) return "large";
  return "extra-large";
};

// Image transformation utilities
export const flipImageData = (
  imageData: number[],
  width: number,
  height: number,
  direction: "horizontal" | "vertical",
): number[] => {
  const result = new Array(imageData.length);
  const channels = 4; // RGBA

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const sourceIndex = (y * width + x) * channels;
      let targetIndex: number;

      if (direction === "horizontal") {
        targetIndex = (y * width + (width - 1 - x)) * channels;
      } else {
        targetIndex = ((height - 1 - y) * width + x) * channels;
      }

      for (let c = 0; c < channels; c++) {
        result[targetIndex + c] = imageData[sourceIndex + c];
      }
    }
  }

  return result;
};

export const rotateImageData90 = (
  imageData: number[],
  width: number,
  height: number,
): { data: number[]; width: number; height: number } => {
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
