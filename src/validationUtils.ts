export const isString = (value: any): value is string => {
  return typeof value === "string";
};

export const isNumber = (value: any): value is number => {
  return typeof value === "number" && !isNaN(value);
};

export const isBoolean = (value: any): value is boolean => {
  return typeof value === "boolean";
};

export const isArray = (value: any): value is any[] => {
  return Array.isArray(value);
};

export const isObject = (value: any): value is object => {
  return value !== null && typeof value === "object" && !Array.isArray(value);
};

export const isFunction = (value: any): value is Function => {
  return typeof value === "function";
};

export const isNull = (value: any): value is null => {
  return value === null;
};

export const isUndefined = (value: any): value is undefined => {
  return value === undefined;
};

export const isNil = (value: any): value is null | undefined => {
  return value == null;
};

export const isDate = (value: any): value is Date => {
  return value instanceof Date && !isNaN(value.getTime());
};

export const isRegExp = (value: any): value is RegExp => {
  return value instanceof RegExp;
};

export const isError = (value: any): value is Error => {
  return value instanceof Error;
};

export const isNotEmpty = (value: any): boolean => {
  if (isNil(value)) return false;
  if (isString(value)) return value.trim().length > 0;
  if (isArray(value)) return value.length > 0;
  if (isObject(value)) return Object.keys(value).length > 0;
  if (value instanceof Map || value instanceof Set) return value.size > 0;
  return true;
};

export const isEmailValid = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isUrlValid = (value: string): boolean => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export const isUuid = (value: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
};

export const isIpAddress = (value: string): boolean => {
  const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(value) || ipv6Regex.test(value);
};

export const isMacAddress = (value: string): boolean => {
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  return macRegex.test(value);
};

export const isCreditCard = (value: string): boolean => {
  const ccRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/;
  return ccRegex.test(value.replace(/\s/g, ""));
};

export const isPhoneNumber = (value: string, countryCode?: string): boolean => {
  const cleaned = value.replace(/[\s\-\(\)]/g, "");

  if (countryCode === "US") {
    return /^(\+1)?[0-9]{10}$/.test(cleaned);
  }
  if (countryCode === "ES") {
    return /^(\+34)?[6-9][0-9]{8}$/.test(cleaned);
  }

  // General international format
  return /^(\+[1-9]\d{1,14})$/.test(cleaned);
};

export const isPostalCode = (value: string, countryCode?: string): boolean => {
  const patterns: Record<string, RegExp> = {
    US: /^\d{5}(-\d{4})?$/,
    ES: /^\d{5}$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
    CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
    DE: /^\d{5}$/,
    FR: /^\d{5}$/,
  };

  if (countryCode && patterns[countryCode]) {
    return patterns[countryCode].test(value);
  }

  // General pattern
  return /^[A-Z0-9\s\-]{3,10}$/i.test(value);
};

export const isHexColor = (value: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
};

export const isBase64 = (value: string): boolean => {
  try {
    return btoa(atob(value)) === value;
  } catch {
    return false;
  }
};

export const isJson = (value: string): boolean => {
  try {
    JSON.parse(value);
    return true;
  } catch {
    return false;
  }
};

export const isPositive = (value: number): boolean => {
  return isNumber(value) && value > 0;
};

export const isNegative = (value: number): boolean => {
  return isNumber(value) && value < 0;
};

export const isZero = (value: number): boolean => {
  return isNumber(value) && value === 0;
};

export const isInteger = (value: number): boolean => {
  return isNumber(value) && Number.isInteger(value);
};

export const isFloat = (value: number): boolean => {
  return isNumber(value) && !Number.isInteger(value);
};

export const isEvenNumber = (value: number): boolean => {
  return isInteger(value) && value % 2 === 0;
};

export const isOddNumber = (value: number): boolean => {
  return isInteger(value) && value % 2 !== 0;
};

export const isPrimeNumber = (value: number): boolean => {
  if (!isInteger(value) || value < 2) return false;
  for (let i = 2; i <= Math.sqrt(value); i++) {
    if (value % i === 0) return false;
  }
  return true;
};

export const isInRange = (value: number, min: number, max: number, inclusive: boolean = true): boolean => {
  if (!isNumber(value)) return false;
  return inclusive ? value >= min && value <= max : value > min && value < max;
};

export const isAlpha = (value: string): boolean => {
  return /^[a-zA-Z]+$/.test(value);
};

export const isAlphanumeric = (value: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(value);
};

export const isNumeric = (value: string): boolean => {
  return /^-?\d*\.?\d+$/.test(value) && !isNaN(Number(value));
};

export const isLowercase = (value: string): boolean => {
  return value === value.toLowerCase();
};

export const isUppercase = (value: string): boolean => {
  return value === value.toUpperCase();
};

export const hasLength = (value: string | any[], min?: number, max?: number): boolean => {
  const length = value.length;
  if (min !== undefined && length < min) return false;
  if (max !== undefined && length > max) return false;
  return true;
};

export const matchesPattern = (value: string, pattern: RegExp): boolean => {
  return pattern.test(value);
};

export const isStrongPassword = (value: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongRegex.test(value);
};

export const isWeakPassword = (value: string): boolean => {
  return !isStrongPassword(value);
};
