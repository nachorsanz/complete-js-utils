"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sortUtils_1 = require("../src/sortUtils");
const globals_1 = require("@jest/globals");
(0, globals_1.describe)("SortUtils", () => {
    (0, globals_1.test)("sorts array of objects by key", () => {
        const array = [
            { name: "Bob", age: 25 },
            { name: "Alice", age: 30 },
        ];
        const sortedArray = (0, sortUtils_1.sortArray)(array, "age", "asc");
        (0, globals_1.expect)(sortedArray).toEqual([
            { name: "Bob", age: 25 },
            { name: "Alice", age: 30 },
        ]);
    });
    (0, globals_1.test)("sorts array of objects by multiple keys", () => {
        const array = [
            { name: "Bob", age: 25 },
            { name: "Alice", age: 30 },
            { name: "Bob", age: 20 },
        ];
        const sortedArray = (0, sortUtils_1.sortByMultipleKeys)(array, [
            { key: "name", order: "asc" },
            { key: "age", order: "asc" },
        ]);
        (0, globals_1.expect)(sortedArray).toEqual([
            { name: "Alice", age: 30 },
            { name: "Bob", age: 20 },
            { name: "Bob", age: 25 },
        ]);
    });
    (0, globals_1.test)("sorts array of objects using a custom comparator", () => {
        const array = [
            { name: "Bob", age: 25 },
            { name: "Alice", age: 30 },
        ];
        const sortedArray = (0, sortUtils_1.sortByCustomComparator)(array, (a, b) => a.age - b.age);
        (0, globals_1.expect)(sortedArray).toEqual([
            { name: "Bob", age: 25 },
            { name: "Alice", age: 30 },
        ]);
    });
    (0, globals_1.test)("finds minimum element by key", () => {
        const array = [
            { name: "Bob", age: 25 },
            { name: "Alice", age: 30 },
            { name: "Charlie", age: 20 },
        ];
        const minElement = (0, sortUtils_1.minBy)(array, "age");
        (0, globals_1.expect)(minElement).toEqual({ name: "Charlie", age: 20 });
    });
    (0, globals_1.test)("finds maximum element by key", () => {
        const array = [
            { name: "Bob", age: 25 },
            { name: "Alice", age: 30 },
            { name: "Charlie", age: 20 },
        ];
        const maxElement = (0, sortUtils_1.maxBy)(array, "age");
        (0, globals_1.expect)(maxElement).toEqual({ name: "Alice", age: 30 });
    });
    (0, globals_1.test)("shuffles array", () => {
        const array = [1, 2, 3, 4, 5];
        const shuffled = (0, sortUtils_1.shuffleArray)(array);
        (0, globals_1.expect)(shuffled).toHaveLength(5);
        (0, globals_1.expect)(shuffled).toEqual(globals_1.expect.arrayContaining(array));
    });
    (0, globals_1.test)("reverses array", () => {
        const array = [1, 2, 3, 4, 5];
        const reversed = (0, sortUtils_1.reverseArray)(array);
        (0, globals_1.expect)(reversed).toEqual([5, 4, 3, 2, 1]);
        (0, globals_1.expect)(array).toEqual([1, 2, 3, 4, 5]); // Original unchanged
    });
    (0, globals_1.test)("rotates array", () => {
        const array = [1, 2, 3, 4, 5];
        const rotated = (0, sortUtils_1.rotateArray)(array, 2);
        (0, globals_1.expect)(rotated).toEqual([3, 4, 5, 1, 2]);
    });
    (0, globals_1.test)("chunks array", () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8];
        const chunked = (0, sortUtils_1.chunkArray)(array, 3);
        (0, globals_1.expect)(chunked).toEqual([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8],
        ]);
    });
    (0, globals_1.test)("flattens array", () => {
        const array = [
            [1, 2],
            [3, 4],
            [5, 6],
        ];
        const flattened = (0, sortUtils_1.flattenArray)(array);
        (0, globals_1.expect)(flattened).toEqual([1, 2, 3, 4, 5, 6]);
    });
    (0, globals_1.test)("compacts array", () => {
        const array = [1, null, 2, undefined, 3, null];
        const compacted = (0, sortUtils_1.compactArray)(array);
        (0, globals_1.expect)(compacted).toEqual([1, 2, 3]);
    });
    (0, globals_1.test)("removes duplicates", () => {
        const array = [1, 2, 2, 3, 3, 3, 4];
        const unique = (0, sortUtils_1.removeDuplicates)(array);
        (0, globals_1.expect)(unique).toEqual([1, 2, 3, 4]);
    });
    (0, globals_1.test)("removes falsy values", () => {
        const array = [1, 0, 2, false, 3, "", 4, null, 5, undefined];
        const filtered = (0, sortUtils_1.removeFalsyValues)(array);
        (0, globals_1.expect)(filtered).toEqual([1, 2, 3, 4, 5]);
    });
    (0, globals_1.test)("removes falsy values and duplicates", () => {
        const array = [1, 0, 2, false, 2, 3, "", 3, 4, null, 4, 5, undefined];
        const cleaned = (0, sortUtils_1.removeFalsyAndDuplicates)(array);
        (0, globals_1.expect)(cleaned).toEqual([1, 2, 3, 4, 5]);
    });
    (0, globals_1.test)("removes specific item", () => {
        const array = [1, 2, 3, 2, 4];
        const filtered = (0, sortUtils_1.removeItem)(array, 2);
        (0, globals_1.expect)(filtered).toEqual([1, 3, 4]);
    });
    (0, globals_1.test)("removes multiple items", () => {
        const array = [1, 2, 3, 4, 5];
        const filtered = (0, sortUtils_1.removeItems)(array, [2, 4]);
        (0, globals_1.expect)(filtered).toEqual([1, 3, 5]);
    });
    (0, globals_1.test)("removes item by index", () => {
        const array = [1, 2, 3, 4, 5];
        const filtered = (0, sortUtils_1.removeItemByIndex)(array, 2);
        (0, globals_1.expect)(filtered).toEqual([1, 2, 4, 5]);
    });
    (0, globals_1.test)("removes items by multiple indexes", () => {
        const array = [1, 2, 3, 4, 5];
        const filtered = (0, sortUtils_1.removeItemsByIndex)(array, [1, 3]);
        (0, globals_1.expect)(filtered).toEqual([1, 3, 5]);
    });
    (0, globals_1.test)("removes items by condition", () => {
        const array = [1, 2, 3, 4, 5, 6];
        const filtered = (0, sortUtils_1.removeItemsByCondition)(array, (x) => x % 2 === 0);
        (0, globals_1.expect)(filtered).toEqual([1, 3, 5]);
    });
    (0, globals_1.test)("removes items by property", () => {
        const array = [
            { name: "Alice", active: true },
            { name: "Bob", active: false },
            { name: "Charlie", active: true },
        ];
        const filtered = (0, sortUtils_1.removeItemsByProperty)(array, "active", [false]);
        (0, globals_1.expect)(filtered).toEqual([
            { name: "Alice", active: true },
            { name: "Charlie", active: true },
        ]);
    });
    (0, globals_1.test)("removes items by multiple properties", () => {
        const array = [
            { name: "Alice", age: 25, active: true },
            { name: "Bob", age: 30, active: false },
            { name: "Charlie", age: 25, active: true },
        ];
        const filtered = (0, sortUtils_1.removeItemsByProperties)(array, ["age", "active"], [25, true]);
        (0, globals_1.expect)(filtered).toEqual([{ name: "Bob", age: 30, active: false }]);
    });
    (0, globals_1.test)("removes items by properties condition", () => {
        const array = [
            { name: "Alice", age: 25, score: 85 },
            { name: "Bob", age: 30, score: 90 },
            { name: "Charlie", age: 25, score: 75 },
        ];
        const filtered = (0, sortUtils_1.removeItemsByPropertiesCondition)(array, ["age", "score"], (values) => values[0] === 25 && values[1] < 80);
        (0, globals_1.expect)(filtered).toEqual([
            { name: "Alice", age: 25, score: 85 },
            { name: "Bob", age: 30, score: 90 },
        ]);
    });
    (0, globals_1.test)("removes falsy items", () => {
        const array = [1, 0, 2, false, 3, "", 4, null, 5, undefined];
        const filtered = (0, sortUtils_1.removeFalsyItems)(array);
        (0, globals_1.expect)(filtered).toEqual([1, 2, 3, 4, 5]);
    });
    (0, globals_1.test)("removes falsy items by property", () => {
        const array = [
            { name: "Alice", active: true },
            { name: "Bob", active: false },
            { name: "Charlie", active: "" },
            { name: "David", active: "yes" },
        ];
        const filtered = (0, sortUtils_1.removeFalsyItemsByProperty)(array, "active");
        (0, globals_1.expect)(filtered).toEqual([
            { name: "Alice", active: true },
            { name: "David", active: "yes" },
        ]);
    });
    (0, globals_1.test)("removes falsy items by multiple properties", () => {
        const array = [
            { name: "Alice", email: "alice@test.com", phone: "123" },
            { name: "Bob", email: "", phone: "456" },
            { name: "Charlie", email: "charlie@test.com", phone: "" },
            { name: "David", email: "david@test.com", phone: "789" },
        ];
        const filtered = (0, sortUtils_1.removeFalsyItemsByProperties)(array, ["email", "phone"]);
        (0, globals_1.expect)(filtered).toEqual([
            { name: "Alice", email: "alice@test.com", phone: "123" },
            { name: "David", email: "david@test.com", phone: "789" },
        ]);
    });
    (0, globals_1.test)("removes falsy items by properties condition", () => {
        const array = [
            { name: "Alice", score: 85, grade: "B" },
            { name: "Bob", score: 0, grade: "F" },
            { name: "Charlie", score: 90, grade: "" },
            { name: "David", score: 75, grade: "C" },
        ];
        const filtered = (0, sortUtils_1.removeFalsyItemsByPropertiesCondition)(array, ["score", "grade"], (values) => Boolean(values[0]) && Boolean(values[1]));
        (0, globals_1.expect)(filtered).toEqual([
            { name: "Alice", score: 85, grade: "B" },
            { name: "David", score: 75, grade: "C" },
        ]);
    });
});
