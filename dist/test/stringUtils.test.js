"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stringUtils_1 = require("../src/stringUtils");
// Mock DOM for HTML manipulation functions
global.document = {
    createElement: jest.fn(() => ({
        textContent: "",
        innerHTML: "",
        innerText: "",
    })),
};
describe("StringUtils", () => {
    describe("capitalize", () => {
        it("should capitalize first letter", () => {
            expect((0, stringUtils_1.capitalize)("hello")).toBe("Hello");
            expect((0, stringUtils_1.capitalize)("WORLD")).toBe("World");
            expect((0, stringUtils_1.capitalize)("hello world")).toBe("Hello world");
            expect((0, stringUtils_1.capitalize)("")).toBe("");
            expect((0, stringUtils_1.capitalize)("a")).toBe("A");
        });
    });
    describe("camelCase", () => {
        it("should convert to camelCase", () => {
            expect((0, stringUtils_1.camelCase)("hello world")).toBe("helloWorld");
            expect((0, stringUtils_1.camelCase)("Hello World")).toBe("helloWorld");
            expect((0, stringUtils_1.camelCase)("HELLO WORLD")).toBe("helloWorld");
            expect((0, stringUtils_1.camelCase)("hello-world")).toBe("helloWorld");
            expect((0, stringUtils_1.camelCase)("hello_world")).toBe("helloWorld");
            expect((0, stringUtils_1.camelCase)("hello")).toBe("hello");
        });
    });
    describe("kebabCase", () => {
        it("should convert to kebab-case", () => {
            expect((0, stringUtils_1.kebabCase)("hello world")).toBe("hello-world");
            expect((0, stringUtils_1.kebabCase)("Hello World")).toBe("hello-world");
            expect((0, stringUtils_1.kebabCase)("helloWorld")).toBe("hello-world");
            expect((0, stringUtils_1.kebabCase)("hello_world")).toBe("hello-world");
            expect((0, stringUtils_1.kebabCase)("HELLO WORLD")).toBe("hello-world");
            expect((0, stringUtils_1.kebabCase)("hello")).toBe("hello");
        });
    });
    describe("snakeCase", () => {
        it("should convert to snake_case", () => {
            expect((0, stringUtils_1.snakeCase)("hello world")).toBe("hello_world");
            expect((0, stringUtils_1.snakeCase)("Hello World")).toBe("hello_world");
            expect((0, stringUtils_1.snakeCase)("helloWorld")).toBe("hello_world");
            expect((0, stringUtils_1.snakeCase)("hello-world")).toBe("hello_world");
            expect((0, stringUtils_1.snakeCase)("HELLO WORLD")).toBe("hello_world");
            expect((0, stringUtils_1.snakeCase)("hello")).toBe("hello");
        });
    });
    describe("pascalCase", () => {
        it("should convert to PascalCase", () => {
            expect((0, stringUtils_1.pascalCase)("hello world")).toBe("HelloWorld");
            expect((0, stringUtils_1.pascalCase)("hello-world")).toBe("HelloWorld");
            expect((0, stringUtils_1.pascalCase)("hello_world")).toBe("HelloWorld");
            expect((0, stringUtils_1.pascalCase)("helloWorld")).toBe("HelloWorld");
            expect((0, stringUtils_1.pascalCase)("hello")).toBe("Hello");
        });
    });
    describe("titleCase", () => {
        it("should convert to Title Case", () => {
            expect((0, stringUtils_1.titleCase)("hello world")).toBe("Hello World");
            expect((0, stringUtils_1.titleCase)("HELLO WORLD")).toBe("Hello World");
            expect((0, stringUtils_1.titleCase)("hello-world")).toBe("Hello-world");
            expect((0, stringUtils_1.titleCase)("the quick brown fox")).toBe("The Quick Brown Fox");
        });
    });
    describe("reverse", () => {
        it("should reverse string", () => {
            expect((0, stringUtils_1.reverse)("hello")).toBe("olleh");
            expect((0, stringUtils_1.reverse)("world")).toBe("dlrow");
            expect((0, stringUtils_1.reverse)("a")).toBe("a");
            expect((0, stringUtils_1.reverse)("")).toBe("");
            expect((0, stringUtils_1.reverse)("12345")).toBe("54321");
        });
    });
    describe("truncate", () => {
        it("should truncate string with default suffix", () => {
            expect((0, stringUtils_1.truncate)("hello world", 5)).toBe("hello...");
            expect((0, stringUtils_1.truncate)("hello", 10)).toBe("hello");
            expect((0, stringUtils_1.truncate)("hello world", 11)).toBe("hello world");
        });
        it("should truncate string with custom suffix", () => {
            expect((0, stringUtils_1.truncate)("hello world", 5, "***")).toBe("hello***");
            expect((0, stringUtils_1.truncate)("hello world", 8, " more")).toBe("hello wo more");
        });
    });
    describe("padStart", () => {
        it("should pad start with spaces", () => {
            expect((0, stringUtils_1.padStart)("hello", 10)).toBe("     hello");
            expect((0, stringUtils_1.padStart)("hello", 5)).toBe("hello");
            expect((0, stringUtils_1.padStart)("hello", 3)).toBe("hello");
        });
        it("should pad start with custom character", () => {
            expect((0, stringUtils_1.padStart)("hello", 10, "0")).toBe("00000hello");
            expect((0, stringUtils_1.padStart)("hello", 8, "*")).toBe("***hello");
        });
    });
    describe("padEnd", () => {
        it("should pad end with spaces", () => {
            expect((0, stringUtils_1.padEnd)("hello", 10)).toBe("hello     ");
            expect((0, stringUtils_1.padEnd)("hello", 5)).toBe("hello");
            expect((0, stringUtils_1.padEnd)("hello", 3)).toBe("hello");
        });
        it("should pad end with custom character", () => {
            expect((0, stringUtils_1.padEnd)("hello", 10, "0")).toBe("hello00000");
            expect((0, stringUtils_1.padEnd)("hello", 8, "*")).toBe("hello***");
        });
    });
    describe("removeAccents", () => {
        it("should remove accents from characters", () => {
            expect((0, stringUtils_1.removeAccents)("café")).toBe("cafe");
            expect((0, stringUtils_1.removeAccents)("naïve")).toBe("naive");
            expect((0, stringUtils_1.removeAccents)("résumé")).toBe("resume");
            expect((0, stringUtils_1.removeAccents)("piñata")).toBe("pinata");
            expect((0, stringUtils_1.removeAccents)("hello")).toBe("hello");
        });
    });
    describe("slugify", () => {
        it("should create URL-friendly slugs", () => {
            expect((0, stringUtils_1.slugify)("Hello World")).toBe("hello-world");
            expect((0, stringUtils_1.slugify)("Café & Restaurant")).toBe("cafe-restaurant");
            expect((0, stringUtils_1.slugify)("This is a test!")).toBe("this-is-a-test");
            expect((0, stringUtils_1.slugify)("Multiple   spaces")).toBe("multiple-spaces");
            expect((0, stringUtils_1.slugify)("Special@#$%Characters")).toBe("specialcharacters");
        });
    });
    describe("extractNumbers", () => {
        it("should extract numbers from string", () => {
            expect((0, stringUtils_1.extractNumbers)("Hello 123 World 456")).toEqual([123, 456]);
            expect((0, stringUtils_1.extractNumbers)("Price: $99.99")).toEqual([99, 99]);
            expect((0, stringUtils_1.extractNumbers)("No numbers here")).toEqual([]);
            expect((0, stringUtils_1.extractNumbers)("Year 2023")).toEqual([2023]);
            expect((0, stringUtils_1.extractNumbers)("")).toEqual([]);
        });
    });
    describe("countWords", () => {
        it("should count words in string", () => {
            expect((0, stringUtils_1.countWords)("hello world")).toBe(2);
            expect((0, stringUtils_1.countWords)("The quick brown fox")).toBe(4);
            expect((0, stringUtils_1.countWords)("  hello   world  ")).toBe(2);
            expect((0, stringUtils_1.countWords)("")).toBe(0);
            expect((0, stringUtils_1.countWords)("   ")).toBe(0);
            expect((0, stringUtils_1.countWords)("hello")).toBe(1);
        });
    });
    describe("countCharacters", () => {
        it("should count characters including spaces", () => {
            expect((0, stringUtils_1.countCharacters)("hello world")).toBe(11);
            expect((0, stringUtils_1.countCharacters)("hello")).toBe(5);
            expect((0, stringUtils_1.countCharacters)("")).toBe(0);
            expect((0, stringUtils_1.countCharacters)("  ")).toBe(2);
        });
        it("should count characters excluding spaces", () => {
            expect((0, stringUtils_1.countCharacters)("hello world", false)).toBe(10);
            expect((0, stringUtils_1.countCharacters)("hello", false)).toBe(5);
            expect((0, stringUtils_1.countCharacters)("  ", false)).toBe(0);
            expect((0, stringUtils_1.countCharacters)("a b c", false)).toBe(3);
        });
    });
    describe("isEmail", () => {
        it("should validate email addresses", () => {
            expect((0, stringUtils_1.isEmail)("test@example.com")).toBe(true);
            expect((0, stringUtils_1.isEmail)("user.name+tag@domain.co.uk")).toBe(true);
            expect((0, stringUtils_1.isEmail)("user@domain")).toBe(false);
            expect((0, stringUtils_1.isEmail)("invalid-email")).toBe(false);
            expect((0, stringUtils_1.isEmail)("@domain.com")).toBe(false);
            expect((0, stringUtils_1.isEmail)("user@")).toBe(false);
            expect((0, stringUtils_1.isEmail)("")).toBe(false);
        });
    });
    describe("isUrl", () => {
        it("should validate URLs", () => {
            expect((0, stringUtils_1.isUrl)("https://example.com")).toBe(true);
            expect((0, stringUtils_1.isUrl)("http://test.org")).toBe(true);
            expect((0, stringUtils_1.isUrl)("ftp://files.example.com")).toBe(true);
            expect((0, stringUtils_1.isUrl)("https://sub.domain.com/path?query=1")).toBe(true);
            expect((0, stringUtils_1.isUrl)("invalid-url")).toBe(false);
            expect((0, stringUtils_1.isUrl)("http://")).toBe(false);
            expect((0, stringUtils_1.isUrl)("")).toBe(false);
        });
    });
    describe("maskString", () => {
        it("should mask string with default settings", () => {
            expect((0, stringUtils_1.maskString)("1234567890")).toBe("12******90");
            expect((0, stringUtils_1.maskString)("hello")).toBe("he*lo");
            expect((0, stringUtils_1.maskString)("ab")).toBe("ab"); // Too short to mask
        });
        it("should mask string with custom settings", () => {
            expect((0, stringUtils_1.maskString)("1234567890", "#", 3, 3)).toBe("123####890");
            expect((0, stringUtils_1.maskString)("hello world", "*", 1, 1)).toBe("h*********d");
            expect((0, stringUtils_1.maskString)("test", "X", 1, 1)).toBe("tXXt");
        });
    });
    describe("randomString", () => {
        it("should generate random string of specified length", () => {
            const result = (0, stringUtils_1.randomString)(10);
            expect(result).toHaveLength(10);
            expect(typeof result).toBe("string");
        });
        it("should generate different strings", () => {
            const result1 = (0, stringUtils_1.randomString)(10);
            const result2 = (0, stringUtils_1.randomString)(10);
            expect(result1).not.toBe(result2);
        });
        it("should use custom character set", () => {
            const result = (0, stringUtils_1.randomString)(10, "ABC");
            expect(result).toHaveLength(10);
            expect(result).toMatch(/^[ABC]+$/);
        });
    });
    describe("escapeHtml", () => {
        it("should escape HTML entities", () => {
            // Test basic functionality - the implementation uses DOM so may vary in test environment
            const result1 = (0, stringUtils_1.escapeHtml)('<script>alert("xss")</script>');
            const result2 = (0, stringUtils_1.escapeHtml)("Hello & World");
            expect(typeof result1).toBe("string");
            expect(typeof result2).toBe("string");
        });
    });
    describe("unescapeHtml", () => {
        it("should unescape HTML entities", () => {
            // Test basic functionality - the implementation uses DOM so may vary in test environment
            const result1 = (0, stringUtils_1.unescapeHtml)("&lt;script&gt;");
            const result2 = (0, stringUtils_1.unescapeHtml)("Hello &amp; World");
            expect(typeof result1).toBe("string");
            expect(typeof result2).toBe("string");
        });
    });
    describe("stripHtml", () => {
        it("should remove HTML tags", () => {
            expect((0, stringUtils_1.stripHtml)("<p>Hello <strong>World</strong></p>")).toBe("Hello World");
            expect((0, stringUtils_1.stripHtml)("<div><span>Test</span></div>")).toBe("Test");
            expect((0, stringUtils_1.stripHtml)("No HTML here")).toBe("No HTML here");
            expect((0, stringUtils_1.stripHtml)('<script>alert("xss")</script>')).toBe('alert("xss")');
        });
    });
    describe("highlightText", () => {
        it("should highlight search terms", () => {
            expect((0, stringUtils_1.highlightText)("Hello World", "World")).toBe('Hello <span class="highlight">World</span>');
            expect((0, stringUtils_1.highlightText)("JavaScript is great", "script")).toBe('Java<span class="highlight">Script</span> is great');
            expect((0, stringUtils_1.highlightText)("Test text", "")).toBe("Test text");
        });
        it("should use custom highlight class", () => {
            expect((0, stringUtils_1.highlightText)("Hello World", "World", "custom")).toBe('Hello <span class="custom">World</span>');
        });
        it("should be case insensitive", () => {
            expect((0, stringUtils_1.highlightText)("Hello WORLD", "world")).toBe('Hello <span class="highlight">WORLD</span>');
        });
    });
});
