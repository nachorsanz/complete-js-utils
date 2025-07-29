"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWeakPassword = exports.isStrongPassword = exports.matchesPattern = exports.hasLength = exports.isUppercase = exports.isLowercase = exports.isNumeric = exports.isAlphanumeric = exports.isAlpha = exports.isInRange = exports.isPrimeNumber = exports.isOddNumber = exports.isEvenNumber = exports.isFloat = exports.isInteger = exports.isZero = exports.isNegative = exports.isPositive = exports.isJson = exports.isBase64 = exports.isHexColor = exports.isPostalCode = exports.isPhoneNumber = exports.isCreditCard = exports.isMacAddress = exports.isIpAddress = exports.isUuid = exports.isUrlValid = exports.isEmailValid = exports.isNotEmpty = exports.isError = exports.isRegExp = exports.isDate = exports.isNil = exports.isUndefined = exports.isNull = exports.isFunction = exports.isObject = exports.isArray = exports.isBoolean = exports.isNumber = exports.isString = void 0;
const isString = (value) => {
    return typeof value === "string";
};
exports.isString = isString;
const isNumber = (value) => {
    return typeof value === "number" && !isNaN(value);
};
exports.isNumber = isNumber;
const isBoolean = (value) => {
    return typeof value === "boolean";
};
exports.isBoolean = isBoolean;
const isArray = (value) => {
    return Array.isArray(value);
};
exports.isArray = isArray;
const isObject = (value) => {
    return value !== null && typeof value === "object" && !Array.isArray(value);
};
exports.isObject = isObject;
const isFunction = (value) => {
    return typeof value === "function";
};
exports.isFunction = isFunction;
const isNull = (value) => {
    return value === null;
};
exports.isNull = isNull;
const isUndefined = (value) => {
    return value === undefined;
};
exports.isUndefined = isUndefined;
const isNil = (value) => {
    return value == null;
};
exports.isNil = isNil;
const isDate = (value) => {
    return value instanceof Date && !isNaN(value.getTime());
};
exports.isDate = isDate;
const isRegExp = (value) => {
    return value instanceof RegExp;
};
exports.isRegExp = isRegExp;
const isError = (value) => {
    return value instanceof Error;
};
exports.isError = isError;
const isNotEmpty = (value) => {
    if ((0, exports.isNil)(value))
        return false;
    if ((0, exports.isString)(value))
        return value.trim().length > 0;
    if ((0, exports.isArray)(value))
        return value.length > 0;
    if ((0, exports.isObject)(value))
        return Object.keys(value).length > 0;
    if (value instanceof Map || value instanceof Set)
        return value.size > 0;
    return true;
};
exports.isNotEmpty = isNotEmpty;
const isEmailValid = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};
exports.isEmailValid = isEmailValid;
const isUrlValid = (value) => {
    try {
        new URL(value);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.isUrlValid = isUrlValid;
const isUuid = (value) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
};
exports.isUuid = isUuid;
const isIpAddress = (value) => {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Regex.test(value) || ipv6Regex.test(value);
};
exports.isIpAddress = isIpAddress;
const isMacAddress = (value) => {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    return macRegex.test(value);
};
exports.isMacAddress = isMacAddress;
const isCreditCard = (value) => {
    const ccRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3[0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})$/;
    return ccRegex.test(value.replace(/\s/g, ""));
};
exports.isCreditCard = isCreditCard;
const isPhoneNumber = (value, countryCode) => {
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
exports.isPhoneNumber = isPhoneNumber;
const isPostalCode = (value, countryCode) => {
    const patterns = {
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
exports.isPostalCode = isPostalCode;
const isHexColor = (value) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
};
exports.isHexColor = isHexColor;
const isBase64 = (value) => {
    try {
        return btoa(atob(value)) === value;
    }
    catch (_a) {
        return false;
    }
};
exports.isBase64 = isBase64;
const isJson = (value) => {
    try {
        JSON.parse(value);
        return true;
    }
    catch (_a) {
        return false;
    }
};
exports.isJson = isJson;
const isPositive = (value) => {
    return (0, exports.isNumber)(value) && value > 0;
};
exports.isPositive = isPositive;
const isNegative = (value) => {
    return (0, exports.isNumber)(value) && value < 0;
};
exports.isNegative = isNegative;
const isZero = (value) => {
    return (0, exports.isNumber)(value) && value === 0;
};
exports.isZero = isZero;
const isInteger = (value) => {
    return (0, exports.isNumber)(value) && Number.isInteger(value);
};
exports.isInteger = isInteger;
const isFloat = (value) => {
    return (0, exports.isNumber)(value) && !Number.isInteger(value);
};
exports.isFloat = isFloat;
const isEvenNumber = (value) => {
    return (0, exports.isInteger)(value) && value % 2 === 0;
};
exports.isEvenNumber = isEvenNumber;
const isOddNumber = (value) => {
    return (0, exports.isInteger)(value) && value % 2 !== 0;
};
exports.isOddNumber = isOddNumber;
const isPrimeNumber = (value) => {
    if (!(0, exports.isInteger)(value) || value < 2)
        return false;
    for (let i = 2; i <= Math.sqrt(value); i++) {
        if (value % i === 0)
            return false;
    }
    return true;
};
exports.isPrimeNumber = isPrimeNumber;
const isInRange = (value, min, max, inclusive = true) => {
    if (!(0, exports.isNumber)(value))
        return false;
    return inclusive ? value >= min && value <= max : value > min && value < max;
};
exports.isInRange = isInRange;
const isAlpha = (value) => {
    return /^[a-zA-Z]+$/.test(value);
};
exports.isAlpha = isAlpha;
const isAlphanumeric = (value) => {
    return /^[a-zA-Z0-9]+$/.test(value);
};
exports.isAlphanumeric = isAlphanumeric;
const isNumeric = (value) => {
    return /^-?\d*\.?\d+$/.test(value) && !isNaN(Number(value));
};
exports.isNumeric = isNumeric;
const isLowercase = (value) => {
    return value === value.toLowerCase();
};
exports.isLowercase = isLowercase;
const isUppercase = (value) => {
    return value === value.toUpperCase();
};
exports.isUppercase = isUppercase;
const hasLength = (value, min, max) => {
    const length = value.length;
    if (min !== undefined && length < min)
        return false;
    if (max !== undefined && length > max)
        return false;
    return true;
};
exports.hasLength = hasLength;
const matchesPattern = (value, pattern) => {
    return pattern.test(value);
};
exports.matchesPattern = matchesPattern;
const isStrongPassword = (value) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongRegex.test(value);
};
exports.isStrongPassword = isStrongPassword;
const isWeakPassword = (value) => {
    return !(0, exports.isStrongPassword)(value);
};
exports.isWeakPassword = isWeakPassword;
