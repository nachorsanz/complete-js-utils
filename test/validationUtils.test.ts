import {
  isEmailValid,
  isPhoneNumber,
  isUrlValid,
  isCreditCard,
  isIpAddress,
  isHexColor,
  hasLength,
  isAlpha,
  isAlphanumeric,
  isNumeric,
  isInteger,
  isFloat,
  isBoolean,
  isUuid,
  isJson,
  isBase64,
  isStrongPassword,
  isString,
  isNumber,
  isArray,
  isObject,
  isFunction,
  isNull,
  isUndefined,
  isNil,
  isDate,
  isRegExp,
  isError,
  isNotEmpty,
  isMacAddress,
  isPostalCode,
  isPositive,
  isNegative,
  isZero,
  isEvenNumber,
  isOddNumber,
  isPrimeNumber,
  isInRange,
  isLowercase,
  isUppercase,
  matchesPattern,
  isWeakPassword,
} from "../src/validationUtils";

describe("ValidationUtils", () => {
  describe("isEmailValid", () => {
    it("should validate email addresses", () => {
      expect(isEmailValid("test@example.com")).toBe(true);
      expect(isEmailValid("user.name+tag@domain.com")).toBe(true);
      expect(isEmailValid("invalid-email")).toBe(false);
      expect(isEmailValid("test@")).toBe(false);
      expect(isEmailValid("@example.com")).toBe(false);
    });
  });

  describe("isUrlValid", () => {
    it("should validate URLs", () => {
      expect(isUrlValid("https://example.com")).toBe(true);
      expect(isUrlValid("http://test.org")).toBe(true);
      expect(isUrlValid("ftp://files.example.com")).toBe(true);
      expect(isUrlValid("invalid-url")).toBe(false);
      expect(isUrlValid("http://")).toBe(false);
    });
  });

  describe("isNumeric", () => {
    it("should validate numeric strings", () => {
      expect(isNumeric("123")).toBe(true);
      expect(isNumeric("123.45")).toBe(true);
      expect(isNumeric("-123")).toBe(true);
      expect(isNumeric("abc")).toBe(false);
      expect(isNumeric("12a3")).toBe(false);
    });
  });

  describe("isAlpha", () => {
    it("should validate alphabetic strings", () => {
      expect(isAlpha("hello")).toBe(true);
      expect(isAlpha("WORLD")).toBe(true);
      expect(isAlpha("hello123")).toBe(false);
      expect(isAlpha("hello world")).toBe(false);
    });
  });

  describe("isAlphanumeric", () => {
    it("should validate alphanumeric strings", () => {
      expect(isAlphanumeric("hello123")).toBe(true);
      expect(isAlphanumeric("HELLO123")).toBe(true);
      expect(isAlphanumeric("hello@world")).toBe(false);
      expect(isAlphanumeric("hello world")).toBe(false);
    });
  });

  describe("isNotEmpty", () => {
    it("should check if value is not empty", () => {
      expect(isNotEmpty("")).toBe(false);
      expect(isNotEmpty("   ")).toBe(false);
      expect(isNotEmpty(null)).toBe(false);
      expect(isNotEmpty(undefined)).toBe(false);
      expect(isNotEmpty("hello")).toBe(true);
      expect(isNotEmpty(0)).toBe(true);
    });
  });

  describe("hasLength", () => {
    it("should validate string length", () => {
      expect(hasLength("hello", 3, 10)).toBe(true);
      expect(hasLength("hi", 3, 10)).toBe(false);
      expect(hasLength("hello world test", 3, 10)).toBe(false);
      expect(hasLength("hello", 5)).toBe(true);
      expect(hasLength("hello")).toBe(true);
    });
  });

  describe("isHexColor", () => {
    it("should validate hex colors", () => {
      expect(isHexColor("#FF0000")).toBe(true);
      expect(isHexColor("#ff0000")).toBe(true);
      expect(isHexColor("#F00")).toBe(true);
      expect(isHexColor("FF0000")).toBe(false);
      expect(isHexColor("#GG0000")).toBe(false);
    });
  });

  describe("isIpAddress", () => {
    it("should validate IP addresses", () => {
      expect(isIpAddress("192.168.1.1")).toBe(true);
      expect(isIpAddress("127.0.0.1")).toBe(true);
      expect(isIpAddress("256.1.1.1")).toBe(false);
      expect(isIpAddress("192.168.1")).toBe(false);
    });
  });

  describe("Type Validators", () => {
    it("should validate strings", () => {
      expect(isString("hello")).toBe(true);
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
    });

    it("should validate numbers", () => {
      expect(isNumber(123)).toBe(true);
      expect(isNumber(12.5)).toBe(true);
      expect(isNumber(NaN)).toBe(false); // NaN is NOT a valid number in our isNumber implementation
    });

    it("should validate booleans", () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean("true")).toBe(false);
      expect(isBoolean(1)).toBe(false);
    });

    it("should validate arrays", () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray("array")).toBe(false);
      expect(isArray({})).toBe(false);
    });

    it("should validate objects", () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ key: "value" })).toBe(true);
      expect(isObject([])).toBe(false); // Arrays are not plain objects
      expect(isObject(null)).toBe(false);
    });

    it("should validate functions", () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction("function")).toBe(false);
      expect(isFunction({})).toBe(false);
    });

    it("should validate null", () => {
      expect(isNull(null)).toBe(true);
      expect(isNull(undefined)).toBe(false);
      expect(isNull("")).toBe(false);
      expect(isNull(0)).toBe(false);
    });

    it("should validate undefined", () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined("")).toBe(false);
      expect(isUndefined(0)).toBe(false);
    });

    it("should validate nil (null or undefined)", () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
      expect(isNil("")).toBe(false);
      expect(isNil(0)).toBe(false);
    });

    it("should validate dates", () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate(new Date("2023-01-01"))).toBe(true);
      expect(isDate("2023-01-01")).toBe(false);
      expect(isDate(1640995200000)).toBe(false);
    });

    it("should validate RegExp", () => {
      expect(isRegExp(/test/)).toBe(true);
      expect(isRegExp(new RegExp("test"))).toBe(true);
      expect(isRegExp("test")).toBe(false);
      expect(isRegExp({})).toBe(false);
    });

    it("should validate Error objects", () => {
      expect(isError(new Error("test"))).toBe(true);
      expect(isError(new TypeError("test"))).toBe(true);
      expect(isError("error")).toBe(false);
      expect(isError({})).toBe(false);
    });

    it("should validate non-empty values", () => {
      expect(isNotEmpty("hello")).toBe(true);
      expect(isNotEmpty([1, 2, 3])).toBe(true);
      expect(isNotEmpty({ key: "value" })).toBe(true);
      expect(isNotEmpty("")).toBe(false);
      expect(isNotEmpty([])).toBe(false);
      expect(isNotEmpty({})).toBe(false);
      expect(isNotEmpty(null)).toBe(false);
      expect(isNotEmpty(undefined)).toBe(false);
    });
  });

  describe("Format Validators", () => {
    it("should validate UUIDs", () => {
      expect(isUuid("123e4567-e89b-12d3-a456-426614174000")).toBe(true);
      expect(isUuid("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
      expect(isUuid("invalid-uuid")).toBe(false);
      expect(isUuid("123e4567-e89b-12d3-a456")).toBe(false);
    });

    it("should validate MAC addresses", () => {
      expect(isMacAddress("00:1B:44:11:3A:B7")).toBe(true);
      expect(isMacAddress("00-1B-44-11-3A-B7")).toBe(true);
      expect(isMacAddress("invalid-mac")).toBe(false);
    });

    it("should validate credit cards", () => {
      expect(isCreditCard("4111111111111111")).toBe(true); // Visa test number
      expect(isCreditCard("5555555555554444")).toBe(true); // Mastercard test number
      expect(isCreditCard("1234567890123456")).toBe(false);
      expect(isCreditCard("411111111111111")).toBe(false); // Wrong length
    });

    it("should validate phone numbers", () => {
      expect(isPhoneNumber("+1234567890")).toBe(true);
      expect(isPhoneNumber("invalid-phone")).toBe(false);
    });

    it("should validate postal codes", () => {
      expect(isPostalCode("12345")).toBe(true); // US ZIP
      expect(isPostalCode("12345-6789")).toBe(true); // US ZIP+4
      expect(isPostalCode("M5V 3L9")).toBe(true); // Canadian
    });

    it("should validate hex colors", () => {
      expect(isHexColor("#FF0000")).toBe(true);
      expect(isHexColor("#ff0000")).toBe(true);
      expect(isHexColor("#F00")).toBe(true);
      expect(isHexColor("FF0000")).toBe(false); // Missing #
      expect(isHexColor("#GG0000")).toBe(false); // Invalid hex
    });

    it("should validate Base64 strings", () => {
      expect(isBase64("SGVsbG8gV29ybGQ=")).toBe(true);
      expect(isBase64("Hello World!")).toBe(false);
      expect(isBase64("SGVsbG8gV29ybGQ@")).toBe(false); // Invalid character
    });

    it("should validate JSON strings", () => {
      expect(isJson('{"key": "value"}')).toBe(true);
      expect(isJson("[1, 2, 3]")).toBe(true);
      expect(isJson('"string"')).toBe(true);
      expect(isJson("123")).toBe(true);
      expect(isJson('{key: "value"}')).toBe(false); // Invalid JSON
      expect(isJson('{"key": value}')).toBe(false); // Unquoted value
    });
  });

  describe("Number Validators", () => {
    it("should validate positive numbers", () => {
      expect(isPositive(5)).toBe(true);
      expect(isPositive(0.1)).toBe(true);
      expect(isPositive(0)).toBe(false);
      expect(isPositive(-5)).toBe(false);
    });

    it("should validate negative numbers", () => {
      expect(isNegative(-5)).toBe(true);
      expect(isNegative(-0.1)).toBe(true);
      expect(isNegative(0)).toBe(false);
      expect(isNegative(5)).toBe(false);
    });

    it("should validate zero", () => {
      expect(isZero(0)).toBe(true);
      expect(isZero(-0)).toBe(true);
      expect(isZero(1)).toBe(false);
      expect(isZero(-1)).toBe(false);
    });

    it("should validate integers", () => {
      expect(isInteger(5)).toBe(true);
      expect(isInteger(-5)).toBe(true);
      expect(isInteger(0)).toBe(true);
      expect(isInteger(5.5)).toBe(false);
    });

    it("should validate floats", () => {
      expect(isFloat(5.5)).toBe(true);
      expect(isFloat(-5.5)).toBe(true);
      expect(isFloat(3.14159)).toBe(true);
    });

    it("should validate even numbers", () => {
      expect(isEvenNumber(4)).toBe(true);
      expect(isEvenNumber(0)).toBe(true);
      expect(isEvenNumber(-4)).toBe(true);
      expect(isEvenNumber(5)).toBe(false);
      expect(isEvenNumber(5.5)).toBe(false);
    });

    it("should validate odd numbers", () => {
      expect(isOddNumber(5)).toBe(true);
      expect(isOddNumber(-5)).toBe(true);
      expect(isOddNumber(4)).toBe(false);
      expect(isOddNumber(0)).toBe(false);
      expect(isOddNumber(5.5)).toBe(false);
    });

    it("should validate prime numbers", () => {
      expect(isPrimeNumber(2)).toBe(true);
      expect(isPrimeNumber(3)).toBe(true);
      expect(isPrimeNumber(17)).toBe(true);
      expect(isPrimeNumber(4)).toBe(false);
      expect(isPrimeNumber(1)).toBe(false);
      expect(isPrimeNumber(0)).toBe(false);
    });

    it("should validate numbers in range", () => {
      expect(isInRange(5, 1, 10)).toBe(true);
      expect(isInRange(1, 1, 10)).toBe(true);
      expect(isInRange(10, 1, 10)).toBe(true);
      expect(isInRange(0, 1, 10)).toBe(false);
      expect(isInRange(11, 1, 10)).toBe(false);
    });
  });

  describe("String Validators", () => {
    it("should validate alphabetic strings", () => {
      expect(isAlpha("Hello")).toBe(true);
      expect(isAlpha("ABC")).toBe(true);
      expect(isAlpha("Hello123")).toBe(false);
      expect(isAlpha("Hello!")).toBe(false);
      expect(isAlpha("")).toBe(false);
    });

    it("should validate alphanumeric strings", () => {
      expect(isAlphanumeric("Hello123")).toBe(true);
      expect(isAlphanumeric("ABC")).toBe(true);
      expect(isAlphanumeric("123")).toBe(true);
      expect(isAlphanumeric("Hello!")).toBe(false);
      expect(isAlphanumeric("")).toBe(false);
    });

    it("should validate numeric strings", () => {
      expect(isNumeric("123")).toBe(true);
      expect(isNumeric("12.5")).toBe(true);
      expect(isNumeric("-123")).toBe(true);
      expect(isNumeric("123.456")).toBe(true);
      expect(isNumeric("123abc")).toBe(false);
      expect(isNumeric("")).toBe(false);
    });

    it("should validate lowercase strings", () => {
      expect(isLowercase("hello")).toBe(true);
      expect(isLowercase("hello world")).toBe(true);
      expect(isLowercase("Hello")).toBe(false);
      expect(isLowercase("HELLO")).toBe(false);
      expect(isLowercase("")).toBe(true); // Empty string is considered lowercase
    });

    it("should validate uppercase strings", () => {
      expect(isUppercase("HELLO")).toBe(true);
      expect(isUppercase("HELLO WORLD")).toBe(true);
      expect(isUppercase("Hello")).toBe(false);
      expect(isUppercase("hello")).toBe(false);
      expect(isUppercase("")).toBe(true); // Empty string is considered uppercase
    });

    it("should validate string length", () => {
      expect(hasLength("hello", 5)).toBe(true);
      expect(hasLength("hello", 3, 10)).toBe(true);
      expect(hasLength("hello", 6)).toBe(false);
      expect(hasLength("hello world test", 3, 10)).toBe(false);
      expect(hasLength("hi", 3, 10)).toBe(false);
    });

    it("should validate pattern matching", () => {
      expect(matchesPattern("hello", /^h/)).toBe(true);
      expect(matchesPattern("hello", /^H/i)).toBe(true);
      expect(matchesPattern("hello", /world/)).toBe(false);
      expect(matchesPattern("123", /^\d+$/)).toBe(true);
    });
  });

  describe("Password Validators", () => {
    it("should validate strong passwords", () => {
      expect(isStrongPassword("MyP@ssw0rd123")).toBe(true);
      expect(isStrongPassword("StrongP@ss1")).toBe(true);
      expect(isStrongPassword("password")).toBe(false); // No uppercase, numbers, symbols
      expect(isStrongPassword("PASSWORD")).toBe(false); // No lowercase, numbers, symbols
      expect(isStrongPassword("Password123")).toBe(false); // No symbols
      expect(isStrongPassword("P@ss1")).toBe(false); // Too short
    });

    it("should validate weak passwords", () => {
      expect(isWeakPassword("123456")).toBe(true);
      expect(isWeakPassword("password")).toBe(true);
      expect(isWeakPassword("qwerty")).toBe(true);
      expect(isWeakPassword("MyP@ssw0rd123")).toBe(false); // This is strong
      expect(isWeakPassword("ComplexP@ss1")).toBe(false); // This is strong
    });
  });

  describe("Phone Number Validation", () => {
    it("should validate phone numbers for different countries", () => {
      // US phone numbers
      expect(isPhoneNumber("1234567890", "US")).toBe(true);
      expect(isPhoneNumber("+11234567890", "US")).toBe(true);
      expect(isPhoneNumber("123456789", "US")).toBe(false); // Too short

      // Spanish phone numbers
      expect(isPhoneNumber("612345678", "ES")).toBe(true);
      expect(isPhoneNumber("+34612345678", "ES")).toBe(true);
      expect(isPhoneNumber("512345678", "ES")).toBe(false); // Invalid prefix

      // International format
      expect(isPhoneNumber("+4407123456789")).toBe(true);
      expect(isPhoneNumber("+1234567890123456")).toBe(false); // Too long
    });
  });

  describe("Postal Code Validation", () => {
    it("should validate postal codes for different countries", () => {
      // US postal codes
      expect(isPostalCode("12345", "US")).toBe(true);
      expect(isPostalCode("12345-6789", "US")).toBe(true);
      expect(isPostalCode("1234", "US")).toBe(false); // Too short

      // UK postal codes
      expect(isPostalCode("SW1A 1AA", "UK")).toBe(true);
      expect(isPostalCode("M1 1AA", "UK")).toBe(true);

      // Canada postal codes
      expect(isPostalCode("K1A 0A6", "CA")).toBe(true);
      expect(isPostalCode("M5V 3A8", "CA")).toBe(true);

      // General format fallback
      expect(isPostalCode("ABC123")).toBe(true);
      expect(isPostalCode("AB")).toBe(false); // Too short
    });
  });
});
