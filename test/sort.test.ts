import { sortArray } from "../src/sortUtils";
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
