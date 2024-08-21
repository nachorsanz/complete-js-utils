import { sortArray, sortByMultipleKeys, sortByCustomComparator } from "../src/sortUtils";
import { expect, test } from "@jest/globals";

test("sorts array of objects by key", () => {
  const array = [
    { name: "Bob", age: 25 },
    { name: "Alice", age: 30 },
  ];
  const sortedArray = sortArray(array, "age", "asc");
  expect(sortedArray).toEqual([
    { name: "Bob", age: 25 },
    { name: "Alice", age: 30 },
  ]);
});

test("sorts array of objects by multiple keys", () => {
  const array = [
    { name: "Bob", age: 25 },
    { name: "Alice", age: 30 },
    { name: "Bob", age: 20 },
  ];
  const sortedArray = sortByMultipleKeys(array, [
    { key: "name", order: "asc" },
    { key: "age", order: "asc" },
  ]);
  expect(sortedArray).toEqual([
    { name: "Alice", age: 30 },
    { name: "Bob", age: 20 },
    { name: "Bob", age: 25 },
  ]);
});

test("sorts array of objects using a custom comparator", () => {
  const array = [
    { name: "Bob", age: 25 },
    { name: "Alice", age: 30 },
  ];
  const sortedArray = sortByCustomComparator(array, (a, b) => a.age - b.age);
  expect(sortedArray).toEqual([
    { name: "Bob", age: 25 },
    { name: "Alice", age: 30 },
  ]);
});
