"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationUtils_1 = require("../src/validationUtils");
describe("ValidationUtils", () => {
    describe("isEmailValid", () => {
        it("should validate email addresses", () => {
            expect((0, validationUtils_1.isEmailValid)("test@example.com")).toBe(true);
            expect((0, validationUtils_1.isEmailValid)("user.name+tag@domain.com")).toBe(true);
            expect((0, validationUtils_1.isEmailValid)("invalid-email")).toBe(false);
            expect((0, validationUtils_1.isEmailValid)("test@")).toBe(false);
            expect((0, validationUtils_1.isEmailValid)("@example.com")).toBe(false);
        });
    });
    describe("isUrlValid", () => {
        it("should validate URLs", () => {
            expect((0, validationUtils_1.isUrlValid)("https://example.com")).toBe(true);
            expect((0, validationUtils_1.isUrlValid)("http://test.org")).toBe(true);
            expect((0, validationUtils_1.isUrlValid)("ftp://files.example.com")).toBe(true);
            expect((0, validationUtils_1.isUrlValid)("invalid-url")).toBe(false);
            expect((0, validationUtils_1.isUrlValid)("http://")).toBe(false);
        });
    });
    describe("isNumeric", () => {
        it("should validate numeric strings", () => {
            expect((0, validationUtils_1.isNumeric)("123")).toBe(true);
            expect((0, validationUtils_1.isNumeric)("123.45")).toBe(true);
            expect((0, validationUtils_1.isNumeric)("-123")).toBe(true);
            expect((0, validationUtils_1.isNumeric)("abc")).toBe(false);
            expect((0, validationUtils_1.isNumeric)("12a3")).toBe(false);
        });
    });
    describe("isAlpha", () => {
        it("should validate alphabetic strings", () => {
            expect((0, validationUtils_1.isAlpha)("hello")).toBe(true);
            expect((0, validationUtils_1.isAlpha)("WORLD")).toBe(true);
            expect((0, validationUtils_1.isAlpha)("hello123")).toBe(false);
            expect((0, validationUtils_1.isAlpha)("hello world")).toBe(false);
        });
    });
    describe("isAlphanumeric", () => {
        it("should validate alphanumeric strings", () => {
            expect((0, validationUtils_1.isAlphanumeric)("hello123")).toBe(true);
            expect((0, validationUtils_1.isAlphanumeric)("HELLO123")).toBe(true);
            expect((0, validationUtils_1.isAlphanumeric)("hello@world")).toBe(false);
            expect((0, validationUtils_1.isAlphanumeric)("hello world")).toBe(false);
        });
    });
    describe("isNotEmpty", () => {
        it("should check if value is not empty", () => {
            expect((0, validationUtils_1.isNotEmpty)("")).toBe(false);
            expect((0, validationUtils_1.isNotEmpty)("   ")).toBe(false);
            expect((0, validationUtils_1.isNotEmpty)(null)).toBe(false);
            expect((0, validationUtils_1.isNotEmpty)(undefined)).toBe(false);
            expect((0, validationUtils_1.isNotEmpty)("hello")).toBe(true);
            expect((0, validationUtils_1.isNotEmpty)(0)).toBe(true);
        });
    });
    describe("hasLength", () => {
        it("should validate string length", () => {
            expect((0, validationUtils_1.hasLength)("hello", 3, 10)).toBe(true);
            expect((0, validationUtils_1.hasLength)("hi", 3, 10)).toBe(false);
            expect((0, validationUtils_1.hasLength)("hello world test", 3, 10)).toBe(false);
            expect((0, validationUtils_1.hasLength)("hello", 5)).toBe(true);
            expect((0, validationUtils_1.hasLength)("hello")).toBe(true);
        });
    });
    describe("isHexColor", () => {
        it("should validate hex colors", () => {
            expect((0, validationUtils_1.isHexColor)("#FF0000")).toBe(true);
            expect((0, validationUtils_1.isHexColor)("#ff0000")).toBe(true);
            expect((0, validationUtils_1.isHexColor)("#F00")).toBe(true);
            expect((0, validationUtils_1.isHexColor)("FF0000")).toBe(false);
            expect((0, validationUtils_1.isHexColor)("#GG0000")).toBe(false);
        });
    });
    describe("isIpAddress", () => {
        it("should validate IP addresses", () => {
            expect((0, validationUtils_1.isIpAddress)("192.168.1.1")).toBe(true);
            expect((0, validationUtils_1.isIpAddress)("127.0.0.1")).toBe(true);
            expect((0, validationUtils_1.isIpAddress)("256.1.1.1")).toBe(false);
            expect((0, validationUtils_1.isIpAddress)("192.168.1")).toBe(false);
        });
    });
    describe("Type Validators", () => {
        it("should validate strings", () => {
            expect((0, validationUtils_1.isString)("hello")).toBe(true);
            expect((0, validationUtils_1.isString)(123)).toBe(false);
            expect((0, validationUtils_1.isString)(null)).toBe(false);
            expect((0, validationUtils_1.isString)(undefined)).toBe(false);
        });
        it("should validate numbers", () => {
            expect((0, validationUtils_1.isNumber)(123)).toBe(true);
            expect((0, validationUtils_1.isNumber)(12.5)).toBe(true);
            expect((0, validationUtils_1.isNumber)(NaN)).toBe(false); // NaN is NOT a valid number in our isNumber implementation
        });
        it("should validate booleans", () => {
            expect((0, validationUtils_1.isBoolean)(true)).toBe(true);
            expect((0, validationUtils_1.isBoolean)(false)).toBe(true);
            expect((0, validationUtils_1.isBoolean)("true")).toBe(false);
            expect((0, validationUtils_1.isBoolean)(1)).toBe(false);
        });
        it("should validate arrays", () => {
            expect((0, validationUtils_1.isArray)([])).toBe(true);
            expect((0, validationUtils_1.isArray)([1, 2, 3])).toBe(true);
            expect((0, validationUtils_1.isArray)("array")).toBe(false);
            expect((0, validationUtils_1.isArray)({})).toBe(false);
        });
        it("should validate objects", () => {
            expect((0, validationUtils_1.isObject)({})).toBe(true);
            expect((0, validationUtils_1.isObject)({ key: "value" })).toBe(true);
            expect((0, validationUtils_1.isObject)([])).toBe(false); // Arrays are not plain objects
            expect((0, validationUtils_1.isObject)(null)).toBe(false);
        });
        it("should validate functions", () => {
            expect((0, validationUtils_1.isFunction)(() => { })).toBe(true);
            expect((0, validationUtils_1.isFunction)(function () { })).toBe(true);
            expect((0, validationUtils_1.isFunction)("function")).toBe(false);
            expect((0, validationUtils_1.isFunction)({})).toBe(false);
        });
        it("should validate null", () => {
            expect((0, validationUtils_1.isNull)(null)).toBe(true);
            expect((0, validationUtils_1.isNull)(undefined)).toBe(false);
            expect((0, validationUtils_1.isNull)("")).toBe(false);
            expect((0, validationUtils_1.isNull)(0)).toBe(false);
        });
        it("should validate undefined", () => {
            expect((0, validationUtils_1.isUndefined)(undefined)).toBe(true);
            expect((0, validationUtils_1.isUndefined)(null)).toBe(false);
            expect((0, validationUtils_1.isUndefined)("")).toBe(false);
            expect((0, validationUtils_1.isUndefined)(0)).toBe(false);
        });
        it("should validate nil (null or undefined)", () => {
            expect((0, validationUtils_1.isNil)(null)).toBe(true);
            expect((0, validationUtils_1.isNil)(undefined)).toBe(true);
            expect((0, validationUtils_1.isNil)("")).toBe(false);
            expect((0, validationUtils_1.isNil)(0)).toBe(false);
        });
        it("should validate dates", () => {
            expect((0, validationUtils_1.isDate)(new Date())).toBe(true);
            expect((0, validationUtils_1.isDate)(new Date("2023-01-01"))).toBe(true);
            expect((0, validationUtils_1.isDate)("2023-01-01")).toBe(false);
            expect((0, validationUtils_1.isDate)(1640995200000)).toBe(false);
        });
        it("should validate RegExp", () => {
            expect((0, validationUtils_1.isRegExp)(/test/)).toBe(true);
            expect((0, validationUtils_1.isRegExp)(new RegExp("test"))).toBe(true);
            expect((0, validationUtils_1.isRegExp)("test")).toBe(false);
            expect((0, validationUtils_1.isRegExp)({})).toBe(false);
        });
        it("should validate Error objects", () => {
            expect((0, validationUtils_1.isError)(new Error("test"))).toBe(true);
            expect((0, validationUtils_1.isError)(new TypeError("test"))).toBe(true);
            expect((0, validationUtils_1.isError)("error")).toBe(false);
            expect((0, validationUtils_1.isError)({})).toBe(false);
        });
        it("should validate non-empty values", () => {
            expect((0, validationUtils_1.isNotEmpty)("hello")).toBe(true);
            expect((0, validationUtils_1.isNotEmpty)([1, 2, 3])).toBe(true);
            expect((0, validationUtils_1.isNotEmpty)({ key: "value" })).toBe(true);
            expect((0, validationUtils_1.isNotEmpty)("")).toBe(false);
            expect((0, validationUtils_1.isNotEmpty)([])).toBe(false);
            expect((0, validationUtils_1.isNotEmpty)({})).toBe(false);
            expect((0, validationUtils_1.isNotEmpty)(null)).toBe(false);
            expect((0, validationUtils_1.isNotEmpty)(undefined)).toBe(false);
        });
    });
    describe("Format Validators", () => {
        it("should validate UUIDs", () => {
            expect((0, validationUtils_1.isUuid)("123e4567-e89b-12d3-a456-426614174000")).toBe(true);
            expect((0, validationUtils_1.isUuid)("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
            expect((0, validationUtils_1.isUuid)("invalid-uuid")).toBe(false);
            expect((0, validationUtils_1.isUuid)("123e4567-e89b-12d3-a456")).toBe(false);
        });
        it("should validate MAC addresses", () => {
            expect((0, validationUtils_1.isMacAddress)("00:1B:44:11:3A:B7")).toBe(true);
            expect((0, validationUtils_1.isMacAddress)("00-1B-44-11-3A-B7")).toBe(true);
            expect((0, validationUtils_1.isMacAddress)("invalid-mac")).toBe(false);
        });
        it("should validate credit cards", () => {
            expect((0, validationUtils_1.isCreditCard)("4111111111111111")).toBe(true); // Visa test number
            expect((0, validationUtils_1.isCreditCard)("5555555555554444")).toBe(true); // Mastercard test number
            expect((0, validationUtils_1.isCreditCard)("1234567890123456")).toBe(false);
            expect((0, validationUtils_1.isCreditCard)("411111111111111")).toBe(false); // Wrong length
        });
        it("should validate phone numbers", () => {
            expect((0, validationUtils_1.isPhoneNumber)("+1234567890")).toBe(true);
            expect((0, validationUtils_1.isPhoneNumber)("invalid-phone")).toBe(false);
        });
        it("should validate postal codes", () => {
            expect((0, validationUtils_1.isPostalCode)("12345")).toBe(true); // US ZIP
            expect((0, validationUtils_1.isPostalCode)("12345-6789")).toBe(true); // US ZIP+4
            expect((0, validationUtils_1.isPostalCode)("M5V 3L9")).toBe(true); // Canadian
        });
        it("should validate hex colors", () => {
            expect((0, validationUtils_1.isHexColor)("#FF0000")).toBe(true);
            expect((0, validationUtils_1.isHexColor)("#ff0000")).toBe(true);
            expect((0, validationUtils_1.isHexColor)("#F00")).toBe(true);
            expect((0, validationUtils_1.isHexColor)("FF0000")).toBe(false); // Missing #
            expect((0, validationUtils_1.isHexColor)("#GG0000")).toBe(false); // Invalid hex
        });
        it("should validate Base64 strings", () => {
            expect((0, validationUtils_1.isBase64)("SGVsbG8gV29ybGQ=")).toBe(true);
            expect((0, validationUtils_1.isBase64)("Hello World!")).toBe(false);
            expect((0, validationUtils_1.isBase64)("SGVsbG8gV29ybGQ@")).toBe(false); // Invalid character
        });
        it("should validate JSON strings", () => {
            expect((0, validationUtils_1.isJson)('{"key": "value"}')).toBe(true);
            expect((0, validationUtils_1.isJson)("[1, 2, 3]")).toBe(true);
            expect((0, validationUtils_1.isJson)('"string"')).toBe(true);
            expect((0, validationUtils_1.isJson)("123")).toBe(true);
            expect((0, validationUtils_1.isJson)('{key: "value"}')).toBe(false); // Invalid JSON
            expect((0, validationUtils_1.isJson)('{"key": value}')).toBe(false); // Unquoted value
        });
    });
    describe("Number Validators", () => {
        it("should validate positive numbers", () => {
            expect((0, validationUtils_1.isPositive)(5)).toBe(true);
            expect((0, validationUtils_1.isPositive)(0.1)).toBe(true);
            expect((0, validationUtils_1.isPositive)(0)).toBe(false);
            expect((0, validationUtils_1.isPositive)(-5)).toBe(false);
        });
        it("should validate negative numbers", () => {
            expect((0, validationUtils_1.isNegative)(-5)).toBe(true);
            expect((0, validationUtils_1.isNegative)(-0.1)).toBe(true);
            expect((0, validationUtils_1.isNegative)(0)).toBe(false);
            expect((0, validationUtils_1.isNegative)(5)).toBe(false);
        });
        it("should validate zero", () => {
            expect((0, validationUtils_1.isZero)(0)).toBe(true);
            expect((0, validationUtils_1.isZero)(-0)).toBe(true);
            expect((0, validationUtils_1.isZero)(1)).toBe(false);
            expect((0, validationUtils_1.isZero)(-1)).toBe(false);
        });
        it("should validate integers", () => {
            expect((0, validationUtils_1.isInteger)(5)).toBe(true);
            expect((0, validationUtils_1.isInteger)(-5)).toBe(true);
            expect((0, validationUtils_1.isInteger)(0)).toBe(true);
            expect((0, validationUtils_1.isInteger)(5.5)).toBe(false);
        });
        it("should validate floats", () => {
            expect((0, validationUtils_1.isFloat)(5.5)).toBe(true);
            expect((0, validationUtils_1.isFloat)(-5.5)).toBe(true);
            expect((0, validationUtils_1.isFloat)(3.14159)).toBe(true);
        });
        it("should validate even numbers", () => {
            expect((0, validationUtils_1.isEvenNumber)(4)).toBe(true);
            expect((0, validationUtils_1.isEvenNumber)(0)).toBe(true);
            expect((0, validationUtils_1.isEvenNumber)(-4)).toBe(true);
            expect((0, validationUtils_1.isEvenNumber)(5)).toBe(false);
            expect((0, validationUtils_1.isEvenNumber)(5.5)).toBe(false);
        });
        it("should validate odd numbers", () => {
            expect((0, validationUtils_1.isOddNumber)(5)).toBe(true);
            expect((0, validationUtils_1.isOddNumber)(-5)).toBe(true);
            expect((0, validationUtils_1.isOddNumber)(4)).toBe(false);
            expect((0, validationUtils_1.isOddNumber)(0)).toBe(false);
            expect((0, validationUtils_1.isOddNumber)(5.5)).toBe(false);
        });
        it("should validate prime numbers", () => {
            expect((0, validationUtils_1.isPrimeNumber)(2)).toBe(true);
            expect((0, validationUtils_1.isPrimeNumber)(3)).toBe(true);
            expect((0, validationUtils_1.isPrimeNumber)(17)).toBe(true);
            expect((0, validationUtils_1.isPrimeNumber)(4)).toBe(false);
            expect((0, validationUtils_1.isPrimeNumber)(1)).toBe(false);
            expect((0, validationUtils_1.isPrimeNumber)(0)).toBe(false);
        });
        it("should validate numbers in range", () => {
            expect((0, validationUtils_1.isInRange)(5, 1, 10)).toBe(true);
            expect((0, validationUtils_1.isInRange)(1, 1, 10)).toBe(true);
            expect((0, validationUtils_1.isInRange)(10, 1, 10)).toBe(true);
            expect((0, validationUtils_1.isInRange)(0, 1, 10)).toBe(false);
            expect((0, validationUtils_1.isInRange)(11, 1, 10)).toBe(false);
        });
    });
    describe("String Validators", () => {
        it("should validate alphabetic strings", () => {
            expect((0, validationUtils_1.isAlpha)("Hello")).toBe(true);
            expect((0, validationUtils_1.isAlpha)("ABC")).toBe(true);
            expect((0, validationUtils_1.isAlpha)("Hello123")).toBe(false);
            expect((0, validationUtils_1.isAlpha)("Hello!")).toBe(false);
            expect((0, validationUtils_1.isAlpha)("")).toBe(false);
        });
        it("should validate alphanumeric strings", () => {
            expect((0, validationUtils_1.isAlphanumeric)("Hello123")).toBe(true);
            expect((0, validationUtils_1.isAlphanumeric)("ABC")).toBe(true);
            expect((0, validationUtils_1.isAlphanumeric)("123")).toBe(true);
            expect((0, validationUtils_1.isAlphanumeric)("Hello!")).toBe(false);
            expect((0, validationUtils_1.isAlphanumeric)("")).toBe(false);
        });
        it("should validate numeric strings", () => {
            expect((0, validationUtils_1.isNumeric)("123")).toBe(true);
            expect((0, validationUtils_1.isNumeric)("12.5")).toBe(true);
            expect((0, validationUtils_1.isNumeric)("-123")).toBe(true);
            expect((0, validationUtils_1.isNumeric)("123.456")).toBe(true);
            expect((0, validationUtils_1.isNumeric)("123abc")).toBe(false);
            expect((0, validationUtils_1.isNumeric)("")).toBe(false);
        });
        it("should validate lowercase strings", () => {
            expect((0, validationUtils_1.isLowercase)("hello")).toBe(true);
            expect((0, validationUtils_1.isLowercase)("hello world")).toBe(true);
            expect((0, validationUtils_1.isLowercase)("Hello")).toBe(false);
            expect((0, validationUtils_1.isLowercase)("HELLO")).toBe(false);
            expect((0, validationUtils_1.isLowercase)("")).toBe(true); // Empty string is considered lowercase
        });
        it("should validate uppercase strings", () => {
            expect((0, validationUtils_1.isUppercase)("HELLO")).toBe(true);
            expect((0, validationUtils_1.isUppercase)("HELLO WORLD")).toBe(true);
            expect((0, validationUtils_1.isUppercase)("Hello")).toBe(false);
            expect((0, validationUtils_1.isUppercase)("hello")).toBe(false);
            expect((0, validationUtils_1.isUppercase)("")).toBe(true); // Empty string is considered uppercase
        });
        it("should validate string length", () => {
            expect((0, validationUtils_1.hasLength)("hello", 5)).toBe(true);
            expect((0, validationUtils_1.hasLength)("hello", 3, 10)).toBe(true);
            expect((0, validationUtils_1.hasLength)("hello", 6)).toBe(false);
            expect((0, validationUtils_1.hasLength)("hello world test", 3, 10)).toBe(false);
            expect((0, validationUtils_1.hasLength)("hi", 3, 10)).toBe(false);
        });
        it("should validate pattern matching", () => {
            expect((0, validationUtils_1.matchesPattern)("hello", /^h/)).toBe(true);
            expect((0, validationUtils_1.matchesPattern)("hello", /^H/i)).toBe(true);
            expect((0, validationUtils_1.matchesPattern)("hello", /world/)).toBe(false);
            expect((0, validationUtils_1.matchesPattern)("123", /^\d+$/)).toBe(true);
        });
    });
    describe("Password Validators", () => {
        it("should validate strong passwords", () => {
            expect((0, validationUtils_1.isStrongPassword)("MyP@ssw0rd123")).toBe(true);
            expect((0, validationUtils_1.isStrongPassword)("StrongP@ss1")).toBe(true);
            expect((0, validationUtils_1.isStrongPassword)("password")).toBe(false); // No uppercase, numbers, symbols
            expect((0, validationUtils_1.isStrongPassword)("PASSWORD")).toBe(false); // No lowercase, numbers, symbols
            expect((0, validationUtils_1.isStrongPassword)("Password123")).toBe(false); // No symbols
            expect((0, validationUtils_1.isStrongPassword)("P@ss1")).toBe(false); // Too short
        });
        it("should validate weak passwords", () => {
            expect((0, validationUtils_1.isWeakPassword)("123456")).toBe(true);
            expect((0, validationUtils_1.isWeakPassword)("password")).toBe(true);
            expect((0, validationUtils_1.isWeakPassword)("qwerty")).toBe(true);
            expect((0, validationUtils_1.isWeakPassword)("MyP@ssw0rd123")).toBe(false); // This is strong
            expect((0, validationUtils_1.isWeakPassword)("ComplexP@ss1")).toBe(false); // This is strong
        });
    });
    describe("Phone Number Validation", () => {
        it("should validate phone numbers for different countries", () => {
            // US phone numbers
            expect((0, validationUtils_1.isPhoneNumber)("1234567890", "US")).toBe(true);
            expect((0, validationUtils_1.isPhoneNumber)("+11234567890", "US")).toBe(true);
            expect((0, validationUtils_1.isPhoneNumber)("123456789", "US")).toBe(false); // Too short
            // Spanish phone numbers
            expect((0, validationUtils_1.isPhoneNumber)("612345678", "ES")).toBe(true);
            expect((0, validationUtils_1.isPhoneNumber)("+34612345678", "ES")).toBe(true);
            expect((0, validationUtils_1.isPhoneNumber)("512345678", "ES")).toBe(false); // Invalid prefix
            // International format
            expect((0, validationUtils_1.isPhoneNumber)("+4407123456789")).toBe(true);
            expect((0, validationUtils_1.isPhoneNumber)("+1234567890123456")).toBe(false); // Too long
        });
    });
    describe("Postal Code Validation", () => {
        it("should validate postal codes for different countries", () => {
            // US postal codes
            expect((0, validationUtils_1.isPostalCode)("12345", "US")).toBe(true);
            expect((0, validationUtils_1.isPostalCode)("12345-6789", "US")).toBe(true);
            expect((0, validationUtils_1.isPostalCode)("1234", "US")).toBe(false); // Too short
            // UK postal codes
            expect((0, validationUtils_1.isPostalCode)("SW1A 1AA", "UK")).toBe(true);
            expect((0, validationUtils_1.isPostalCode)("M1 1AA", "UK")).toBe(true);
            // Canada postal codes
            expect((0, validationUtils_1.isPostalCode)("K1A 0A6", "CA")).toBe(true);
            expect((0, validationUtils_1.isPostalCode)("M5V 3A8", "CA")).toBe(true);
            // General format fallback
            expect((0, validationUtils_1.isPostalCode)("ABC123")).toBe(true);
            expect((0, validationUtils_1.isPostalCode)("AB")).toBe(false); // Too short
        });
    });
});
