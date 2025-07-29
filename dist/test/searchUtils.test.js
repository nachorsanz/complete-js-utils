"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const searchUtils_1 = require("../src/searchUtils");
(0, globals_1.test)("searches in array of objects by key", () => {
    const array = [{ name: "Alice" }, { name: "Bob" }];
    const results = (0, searchUtils_1.searchInArray)(array, "name", "bob");
    (0, globals_1.expect)(results).toEqual([{ name: "Bob" }]);
});
(0, globals_1.test)("searches in array of objects by multiple keys", () => {
    const array = [
        { name: "Alice", city: "New York" },
        { name: "Bob", city: "Los Angeles" },
    ];
    const results = (0, searchUtils_1.searchWithMultipleKeys)(array, ["name", "city"], "los");
    (0, globals_1.expect)(results).toEqual([{ name: "Bob", city: "Los Angeles" }]);
});
(0, globals_1.test)("searches in array of objects using a custom comparator", () => {
    const array = [{ name: "Alice" }, { name: "Bob" }];
    const results = (0, searchUtils_1.searchWithCustomComparator)(array, (item) => item.name.startsWith("A"));
    (0, globals_1.expect)(results).toEqual([{ name: "Alice" }]);
});
