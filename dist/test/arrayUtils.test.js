"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arrayUtils_1 = require("../src/arrayUtils");
describe("ArrayUtils", () => {
    const testData = [
        { id: 1, name: "Alice", age: 25, category: "A" },
        { id: 2, name: "Bob", age: 30, category: "B" },
        { id: 3, name: "Charlie", age: 25, category: "A" },
        { id: 4, name: "David", age: 35, category: "B" },
    ];
    describe("groupByKey", () => {
        it("should group array by specified key", () => {
            const result = (0, arrayUtils_1.groupByKey)(testData, "category");
            expect(result).toEqual({
                A: [testData[0], testData[2]],
                B: [testData[1], testData[3]],
            });
        });
    });
    describe("countByKey", () => {
        it("should count occurrences by key", () => {
            const result = (0, arrayUtils_1.countByKey)(testData, "category");
            expect(result).toEqual({ A: 2, B: 2 });
        });
    });
    describe("sumBy", () => {
        it("should sum values by key", () => {
            const result = (0, arrayUtils_1.sumBy)(testData, "age");
            expect(result).toBe(115);
        });
    });
    describe("averageBy", () => {
        it("should calculate average by key", () => {
            const result = (0, arrayUtils_1.averageBy)(testData, "age");
            expect(result).toBe(28.75);
        });
        it("should return 0 for empty array", () => {
            expect((0, arrayUtils_1.averageBy)([], "age")).toBe(0);
        });
    });
    describe("uniqueBy", () => {
        it("should return unique items by key", () => {
            const result = (0, arrayUtils_1.uniqueBy)(testData, "age");
            expect(result).toHaveLength(3);
            expect(result.map((item) => item.age)).toEqual([25, 30, 35]);
        });
    });
    describe("intersectionBy", () => {
        it("should find intersection by key", () => {
            const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
            const array2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
            const result = (0, arrayUtils_1.intersectionBy)(array1, array2, "id");
            expect(result).toHaveLength(2);
            expect(result.map((item) => item.id)).toEqual([2, 3]);
        });
    });
    describe("differenceBy", () => {
        it("should find difference by key", () => {
            const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
            const array2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
            const result = (0, arrayUtils_1.differenceBy)(array1, array2, "id");
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe(1);
        });
    });
    describe("unionBy", () => {
        it("should create union by key", () => {
            const array1 = [{ id: 1 }, { id: 2 }];
            const array2 = [{ id: 2 }, { id: 3 }];
            const result = (0, arrayUtils_1.unionBy)(array1, array2, "id");
            expect(result).toHaveLength(3);
            expect(result.map((item) => item.id)).toEqual([1, 2, 3]);
        });
    });
    describe("partition", () => {
        it("should partition array based on predicate", () => {
            const [evens, odds] = (0, arrayUtils_1.partition)([1, 2, 3, 4, 5], (n) => n % 2 === 0);
            expect(evens).toEqual([2, 4]);
            expect(odds).toEqual([1, 3, 5]);
        });
    });
    describe("sample", () => {
        it("should return random element from array", () => {
            const result = (0, arrayUtils_1.sample)([1, 2, 3, 4, 5]);
            expect([1, 2, 3, 4, 5]).toContain(result);
        });
        it("should return undefined for empty array", () => {
            expect((0, arrayUtils_1.sample)([])).toBeUndefined();
        });
    });
    describe("sampleSize", () => {
        it("should return specified number of random elements", () => {
            const arr = [1, 2, 3, 4, 5];
            const result = (0, arrayUtils_1.sampleSize)(arr, 3);
            expect(result).toHaveLength(3);
            result.forEach((item) => expect(arr).toContain(item));
        });
        it("should return entire array if n is larger than array length", () => {
            const arr = [1, 2, 3];
            const result = (0, arrayUtils_1.sampleSize)(arr, 5);
            expect(result).toHaveLength(3);
        });
    });
    describe("takeWhile", () => {
        it("should take elements while predicate is true", () => {
            const result = (0, arrayUtils_1.takeWhile)([1, 2, 3, 4, 5], (n) => n < 4);
            expect(result).toEqual([1, 2, 3]);
        });
    });
    describe("dropWhile", () => {
        it("should drop elements while predicate is true", () => {
            const result = (0, arrayUtils_1.dropWhile)([1, 2, 3, 4, 5], (n) => n < 4);
            expect(result).toEqual([4, 5]);
        });
    });
    describe("first", () => {
        it("should return first element", () => {
            expect((0, arrayUtils_1.first)([1, 2, 3])).toBe(1);
            expect((0, arrayUtils_1.first)([])).toBeUndefined();
        });
    });
    describe("last", () => {
        it("should return last element", () => {
            expect((0, arrayUtils_1.last)([1, 2, 3])).toBe(3);
            expect((0, arrayUtils_1.last)([])).toBeUndefined();
        });
    });
    describe("nth", () => {
        it("should return element at specified index", () => {
            const arr = [1, 2, 3, 4, 5];
            expect((0, arrayUtils_1.nth)(arr, 2)).toBe(3);
            expect((0, arrayUtils_1.nth)(arr, -1)).toBe(5);
            expect((0, arrayUtils_1.nth)(arr, 10)).toBeUndefined();
        });
    });
    describe("pull", () => {
        it("should remove specified values", () => {
            const result = (0, arrayUtils_1.pull)([1, 2, 3, 4, 5], 2, 4);
            expect(result).toEqual([1, 3, 5]);
        });
    });
    describe("pullAt", () => {
        it("should remove and return elements at specified indexes", () => {
            const arr = [1, 2, 3, 4, 5];
            const result = (0, arrayUtils_1.pullAt)(arr, [1, 3]);
            expect(result).toEqual([4, 2]); // elementos removidos en orden correcto
            expect(arr).toEqual([1, 3, 5]); // array restante
        });
    });
    describe("zip", () => {
        it("should zip two arrays", () => {
            const result = (0, arrayUtils_1.zip)([1, 2, 3], ["a", "b", "c"]);
            expect(result).toEqual([
                [1, "a"],
                [2, "b"],
                [3, "c"],
            ]);
        });
        it("should handle arrays of different lengths", () => {
            const result = (0, arrayUtils_1.zip)([1, 2], ["a", "b", "c"]);
            expect(result).toEqual([
                [1, "a"],
                [2, "b"],
            ]);
        });
    });
    describe("unzip", () => {
        it("should unzip array of pairs", () => {
            const [first, second] = (0, arrayUtils_1.unzip)([
                [1, "a"],
                [2, "b"],
                [3, "c"],
            ]);
            expect(first).toEqual([1, 2, 3]);
            expect(second).toEqual(["a", "b", "c"]);
        });
    });
    describe("zipWith", () => {
        it("should zip with custom function", () => {
            const result = (0, arrayUtils_1.zipWith)([1, 2, 3], [4, 5, 6], (a, b) => a + b);
            expect(result).toEqual([5, 7, 9]);
        });
    });
    describe("xor", () => {
        it("should return symmetric difference", () => {
            const result = (0, arrayUtils_1.xor)([1, 2, 3], [3, 4, 5]);
            expect(result.sort()).toEqual([1, 2, 4, 5]);
        });
    });
    describe("move", () => {
        it("should move element to different position", () => {
            const result = (0, arrayUtils_1.move)([1, 2, 3, 4, 5], 1, 3);
            expect(result).toEqual([1, 3, 4, 2, 5]);
        });
    });
    describe("transpose", () => {
        it("should transpose matrix", () => {
            const matrix = [
                [1, 2, 3],
                [4, 5, 6],
            ];
            const result = (0, arrayUtils_1.transpose)(matrix);
            expect(result).toEqual([
                [1, 4],
                [2, 5],
                [3, 6],
            ]);
        });
        it("should handle empty matrix", () => {
            expect((0, arrayUtils_1.transpose)([])).toEqual([]);
        });
    });
    describe("isSubset", () => {
        it("should check if array is subset", () => {
            expect((0, arrayUtils_1.isSubset)([1, 2], [1, 2, 3, 4])).toBe(true);
            expect((0, arrayUtils_1.isSubset)([1, 5], [1, 2, 3, 4])).toBe(false);
        });
    });
    describe("isSuperset", () => {
        it("should check if array is superset", () => {
            expect((0, arrayUtils_1.isSuperset)([1, 2, 3, 4], [1, 2])).toBe(true);
            expect((0, arrayUtils_1.isSuperset)([1, 2, 3], [1, 5])).toBe(false);
        });
    });
    describe("frequency", () => {
        it("should return frequency map", () => {
            const result = (0, arrayUtils_1.frequency)([1, 2, 2, 3, 3, 3]);
            expect(result.get(1)).toBe(1);
            expect(result.get(2)).toBe(2);
            expect(result.get(3)).toBe(3);
        });
    });
    describe("mostFrequent", () => {
        it("should return most frequent element", () => {
            const result = (0, arrayUtils_1.mostFrequent)([1, 2, 2, 3, 3, 3]);
            expect(result).toBe(3);
        });
        it("should return undefined for empty array", () => {
            expect((0, arrayUtils_1.mostFrequent)([])).toBeUndefined();
        });
    });
    describe("leastFrequent", () => {
        it("should return least frequent element", () => {
            const result = (0, arrayUtils_1.leastFrequent)([1, 2, 2, 3, 3, 3]);
            expect(result).toBe(1);
        });
        it("should return undefined for empty array", () => {
            expect((0, arrayUtils_1.leastFrequent)([])).toBeUndefined();
        });
    });
});
