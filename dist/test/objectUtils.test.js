"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objectUtils_1 = require("../src/objectUtils");
describe("ObjectUtils", () => {
    const testObject = {
        name: "John",
        age: 30,
        address: {
            city: "New York",
            zip: "10001",
        },
        hobbies: ["reading", "coding"],
    };
    describe("clone", () => {
        it("should deep clone object", () => {
            const cloned = (0, objectUtils_1.clone)(testObject);
            expect(cloned).toEqual(testObject);
            expect(cloned).not.toBe(testObject);
            expect(cloned.address).not.toBe(testObject.address);
        });
        it("should handle primitive values", () => {
            expect((0, objectUtils_1.clone)(5)).toBe(5);
            expect((0, objectUtils_1.clone)("test")).toBe("test");
            expect((0, objectUtils_1.clone)(null)).toBe(null);
        });
    });
    describe("merge", () => {
        it("should merge objects deeply", () => {
            const obj1 = { a: 1, b: { c: 2 } };
            const obj2 = { b: { d: 3 }, e: 4 };
            const result = (0, objectUtils_1.merge)(obj1, obj2);
            expect(result).toEqual({
                a: 1,
                b: { c: 2, d: 3 },
                e: 4,
            });
        });
    });
    describe("pick", () => {
        it("should pick specified properties", () => {
            const result = (0, objectUtils_1.pick)(testObject, ["name", "age"]);
            expect(result).toEqual({ name: "John", age: 30 });
        });
    });
    describe("omit", () => {
        it("should omit specified properties", () => {
            const result = (0, objectUtils_1.omit)(testObject, ["age"]);
            expect(result).not.toHaveProperty("age");
            expect(result).toHaveProperty("name");
        });
    });
    describe("get", () => {
        it("should get nested property value", () => {
            expect((0, objectUtils_1.get)(testObject, "name")).toBe("John");
            expect((0, objectUtils_1.get)(testObject, "address.city")).toBe("New York");
            expect((0, objectUtils_1.get)(testObject, "address.country", "USA")).toBe("USA");
        });
    });
    describe("set", () => {
        it("should set nested property value", () => {
            const obj = (0, objectUtils_1.clone)(testObject);
            (0, objectUtils_1.set)(obj, "address.country", "USA");
            expect((0, objectUtils_1.get)(obj, "address.country")).toBe("USA");
        });
    });
    describe("has", () => {
        it("should check if object has property", () => {
            expect((0, objectUtils_1.has)(testObject, "name")).toBe(true);
            expect((0, objectUtils_1.has)(testObject, "address.city")).toBe(true);
            expect((0, objectUtils_1.has)(testObject, "address.country")).toBe(false);
        });
    });
    describe("isEmpty", () => {
        it("should check if object is empty", () => {
            expect((0, objectUtils_1.isEmpty)({})).toBe(true);
            expect((0, objectUtils_1.isEmpty)({ a: 1 })).toBe(false);
            expect((0, objectUtils_1.isEmpty)([])).toBe(true);
            expect((0, objectUtils_1.isEmpty)([1])).toBe(false);
            expect((0, objectUtils_1.isEmpty)("")).toBe(true);
            expect((0, objectUtils_1.isEmpty)("test")).toBe(false);
        });
    });
    describe("isEqual", () => {
        it("should compare objects deeply", () => {
            const obj1 = { a: 1, b: { c: 2 } };
            const obj2 = { a: 1, b: { c: 2 } };
            const obj3 = { a: 1, b: { c: 3 } };
            expect((0, objectUtils_1.isEqual)(obj1, obj2)).toBe(true);
            expect((0, objectUtils_1.isEqual)(obj1, obj3)).toBe(false);
        });
    });
    describe("keys", () => {
        it("should get object keys", () => {
            const result = (0, objectUtils_1.keys)({ a: 1, b: 2, c: 3 });
            expect(result).toEqual(["a", "b", "c"]);
        });
    });
    describe("values", () => {
        it("should get object values", () => {
            const result = (0, objectUtils_1.values)({ a: 1, b: 2, c: 3 });
            expect(result).toEqual([1, 2, 3]);
        });
    });
    describe("entries", () => {
        it("should get object entries", () => {
            const result = (0, objectUtils_1.entries)({ a: 1, b: 2 });
            expect(result).toEqual([
                ["a", 1],
                ["b", 2],
            ]);
        });
    });
    describe("fromEntries", () => {
        it("should create object from entries", () => {
            const result = (0, objectUtils_1.fromEntries)([
                ["a", 1],
                ["b", 2],
            ]);
            expect(result).toEqual({ a: 1, b: 2 });
        });
    });
    describe("mapValues", () => {
        it("should map object values", () => {
            const result = (0, objectUtils_1.mapValues)({ a: 1, b: 2 }, (value) => value * 2);
            expect(result).toEqual({ a: 2, b: 4 });
        });
    });
    describe("mapKeys", () => {
        it("should map object keys", () => {
            const result = (0, objectUtils_1.mapKeys)({ a: 1, b: 2 }, (key) => String(key).toUpperCase());
            expect(result).toEqual({ 1: 1, 2: 2 }); // Keys se convierten a string del valor
        });
    });
    describe("invert", () => {
        it("should invert object keys and values", () => {
            const result = (0, objectUtils_1.invert)({ a: "x", b: "y", c: "z" });
            expect(result).toEqual({ x: "a", y: "b", z: "c" });
        });
    });
    describe("groupBy", () => {
        it("should group array by function result", () => {
            const items = [
                { category: "A", value: 1 },
                { category: "B", value: 2 },
                { category: "A", value: 3 },
            ];
            const result = (0, objectUtils_1.groupBy)(items, (item) => item.category);
            expect(result.A).toHaveLength(2);
            expect(result.B).toHaveLength(1);
        });
    });
    describe("countBy", () => {
        it("should count array items by function result", () => {
            const items = ["a", "b", "a", "c", "b", "a"];
            const result = (0, objectUtils_1.countBy)(items, (item) => item);
            expect(result).toEqual({ a: 3, b: 2, c: 1 });
        });
    });
    describe("indexBy", () => {
        it("should index array by function result", () => {
            const items = [
                { id: 1, name: "Alice" },
                { id: 2, name: "Bob" },
            ];
            const result = (0, objectUtils_1.indexBy)(items, (item) => item.id);
            expect(result[1]).toEqual({ id: 1, name: "Alice" });
            expect(result[2]).toEqual({ id: 2, name: "Bob" });
        });
    });
    describe("flatten", () => {
        it("should flatten nested object", () => {
            const nested = { a: { b: { c: 1 } }, d: 2 };
            const result = (0, objectUtils_1.flatten)(nested);
            expect(result).toEqual({ "a.b.c": 1, d: 2 });
        });
    });
    describe("unflatten", () => {
        it("should unflatten object", () => {
            const flattened = { "a.b.c": 1, d: 2 };
            const result = (0, objectUtils_1.unflatten)(flattened);
            expect(result).toEqual({ a: { b: { c: 1 } }, d: 2 });
        });
    });
});
