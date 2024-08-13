import { expect, test } from "@jest/globals";
import { searchInArray, searchWithMultipleKeys, searchWithCustomComparator } from "../src/searchUtils";

test("searches in array of objects by key", () => {
  const array = [{ name: "Alice" }, { name: "Bob" }];
  const results = searchInArray(array, "name", "bob");
  expect(results).toEqual([{ name: "Bob" }]);
});

test("searches in array of objects by multiple keys", () => {
  const array = [
    { name: "Alice", city: "New York" },
    { name: "Bob", city: "Los Angeles" },
  ];
  const results = searchWithMultipleKeys(array, ["name", "city"], "los");
  expect(results).toEqual([{ name: "Bob", city: "Los Angeles" }]);
});

test("searches in array of objects using a custom comparator", () => {
  const array = [{ name: "Alice" }, { name: "Bob" }];
  const results = searchWithCustomComparator(array, (item) => item.name.startsWith("A"));
  expect(results).toEqual([{ name: "Alice" }]);
});
