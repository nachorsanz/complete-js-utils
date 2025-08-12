import {
  sortArray,
  sortByMultipleKeys,
  sortByCustomComparator,
  minBy,
  maxBy,
  shuffleArray,
  reverseArray,
  rotateArray,
  chunkArray,
  flattenArray,
  compactArray,
  removeDuplicates,
  removeFalsyValues,
  removeFalsyAndDuplicates,
  removeItem,
  removeItems,
  removeItemByIndex,
  removeItemsByIndex,
  removeItemsByCondition,
  removeItemsByProperty,
  removeItemsByProperties,
  removeItemsByPropertiesCondition,
  removeFalsyItems,
  removeFalsyItemsByProperty,
  removeFalsyItemsByProperties,
  removeFalsyItemsByPropertiesCondition,
} from "../src/sortUtils";
import { expect, test, describe } from "@jest/globals";

describe("SortUtils", () => {
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

  test("sorts array desc order", () => {
    const array = [
      { name: "Bob", age: 25 },
      { name: "Alice", age: 30 },
    ];
    const sorted = sortArray(array, "age", "desc");
    expect(sorted[0].age).toBe(30);
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

  test("finds minimum element by key", () => {
    const array = [
      { name: "Bob", age: 25 },
      { name: "Alice", age: 30 },
      { name: "Charlie", age: 20 },
    ];
    const minElement = minBy(array, "age");
    expect(minElement).toEqual({ name: "Charlie", age: 20 });
  });

  test("finds maximum element by key", () => {
    const array = [
      { name: "Bob", age: 25 },
      { name: "Alice", age: 30 },
      { name: "Charlie", age: 20 },
    ];
    const maxElement = maxBy(array, "age");
    expect(maxElement).toEqual({ name: "Alice", age: 30 });
  });

  test("shuffles array", () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffleArray(array);
    expect(shuffled).toHaveLength(5);
    expect(shuffled).toEqual(expect.arrayContaining(array));
  });

  test("reverses array", () => {
    const array = [1, 2, 3, 4, 5];
    const reversed = reverseArray(array);
    expect(reversed).toEqual([5, 4, 3, 2, 1]);
    expect(array).toEqual([1, 2, 3, 4, 5]); // Original unchanged
  });

  test("rotates array", () => {
    const array = [1, 2, 3, 4, 5];
    const rotated = rotateArray(array, 2);
    expect(rotated).toEqual([3, 4, 5, 1, 2]);
  });

  test("rotates with times greater than length", () => {
    const array = [1, 2, 3];
    const rotated = rotateArray(array, 5); // naive slice still returns a value
    expect(rotated).toEqual([...array.slice(5), ...array.slice(0, 5)]);
  });

  test("chunks array", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8];
    const chunked = chunkArray(array, 3);
    expect(chunked).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8],
    ]);
  });

  test("chunks exact multiples of size", () => {
    const array = [1, 2, 3, 4, 5, 6];
    const chunked = chunkArray(array, 3);
    expect(chunked).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
  });

  test("flattens array", () => {
    const array = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const flattened = flattenArray(array);
    expect(flattened).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("compacts array", () => {
    const array = [1, null, 2, undefined, 3, null];
    const compacted = compactArray(array);
    expect(compacted).toEqual([1, 2, 3]);
  });

  test("removes duplicates", () => {
    const array = [1, 2, 2, 3, 3, 3, 4];
    const unique = removeDuplicates(array);
    expect(unique).toEqual([1, 2, 3, 4]);
  });

  test("removes falsy values", () => {
    const array = [1, 0, 2, false, 3, "", 4, null, 5, undefined];
    const filtered = removeFalsyValues(array);
    expect(filtered).toEqual([1, 2, 3, 4, 5]);
  });

  test("removes falsy values and duplicates", () => {
    const array = [1, 0, 2, false, 2, 3, "", 3, 4, null, 4, 5, undefined];
    const cleaned = removeFalsyAndDuplicates(array);
    expect(cleaned).toEqual([1, 2, 3, 4, 5]);
  });

  test("removes specific item", () => {
    const array = [1, 2, 3, 2, 4];
    const filtered = removeItem(array, 2);
    expect(filtered).toEqual([1, 3, 4]);
  });

  test("removes multiple items", () => {
    const array = [1, 2, 3, 4, 5];
    const filtered = removeItems(array, [2, 4]);
    expect(filtered).toEqual([1, 3, 5]);
  });

  test("removes item by index", () => {
    const array = [1, 2, 3, 4, 5];
    const filtered = removeItemByIndex(array, 2);
    expect(filtered).toEqual([1, 2, 4, 5]);
  });

  test("removes items by multiple indexes", () => {
    const array = [1, 2, 3, 4, 5];
    const filtered = removeItemsByIndex(array, [1, 3]);
    expect(filtered).toEqual([1, 3, 5]);
  });

  test("removes items by condition", () => {
    const array = [1, 2, 3, 4, 5, 6];
    const filtered = removeItemsByCondition(array, (x) => x % 2 === 0);
    expect(filtered).toEqual([1, 3, 5]);
  });

  test("removes items by property", () => {
    const array = [
      { name: "Alice", active: true },
      { name: "Bob", active: false },
      { name: "Charlie", active: true },
    ];
    const filtered = removeItemsByProperty(array, "active", [false]);
    expect(filtered).toEqual([
      { name: "Alice", active: true },
      { name: "Charlie", active: true },
    ]);
  });

  test("removes items by multiple properties", () => {
    const array = [
      { name: "Alice", age: 25, active: true },
      { name: "Bob", age: 30, active: false },
      { name: "Charlie", age: 25, active: true },
    ];
    const filtered = removeItemsByProperties(array, ["age", "active"], [25, true]);
    expect(filtered).toEqual([{ name: "Bob", age: 30, active: false }]);
  });

  test("removes items by properties condition", () => {
    const array = [
      { name: "Alice", age: 25, score: 85 },
      { name: "Bob", age: 30, score: 90 },
      { name: "Charlie", age: 25, score: 75 },
    ];
    const filtered = removeItemsByPropertiesCondition(
      array,
      ["age", "score"],
      (values) => values[0] === 25 && (values[1] as number) < 80,
    );
    expect(filtered).toEqual([
      { name: "Alice", age: 25, score: 85 },
      { name: "Bob", age: 30, score: 90 },
    ]);
  });

  test("removes falsy items", () => {
    const array = [1, 0, 2, false, 3, "", 4, null, 5, undefined];
    const filtered = removeFalsyItems(array);
    expect(filtered).toEqual([1, 2, 3, 4, 5]);
  });

  test("removes falsy items by property", () => {
    const array = [
      { name: "Alice", active: true },
      { name: "Bob", active: false },
      { name: "Charlie", active: "" },
      { name: "David", active: "yes" },
    ];
    const filtered = removeFalsyItemsByProperty(array, "active");
    expect(filtered).toEqual([
      { name: "Alice", active: true },
      { name: "David", active: "yes" },
    ]);
  });

  test("removes falsy items by multiple properties", () => {
    const array = [
      { name: "Alice", email: "alice@test.com", phone: "123" },
      { name: "Bob", email: "", phone: "456" },
      { name: "Charlie", email: "charlie@test.com", phone: "" },
      { name: "David", email: "david@test.com", phone: "789" },
    ];
    const filtered = removeFalsyItemsByProperties(array, ["email", "phone"]);
    expect(filtered).toEqual([
      { name: "Alice", email: "alice@test.com", phone: "123" },
      { name: "David", email: "david@test.com", phone: "789" },
    ]);
  });

  test("removes falsy items by properties condition", () => {
    const array = [
      { name: "Alice", score: 85, grade: "B" },
      { name: "Bob", score: 0, grade: "F" },
      { name: "Charlie", score: 90, grade: "" },
      { name: "David", score: 75, grade: "C" },
    ];
    const filtered = removeFalsyItemsByPropertiesCondition(
      array,
      ["score", "grade"],
      (values) => Boolean(values[0]) && Boolean(values[1]),
    );
    expect(filtered).toEqual([
      { name: "Alice", score: 85, grade: "B" },
      { name: "David", score: 75, grade: "C" },
    ]);
  });
});
