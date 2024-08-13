import { searchInArray } from "../src/searchUtils";
import { expect, test } from "@jest/globals";

test("searches in array of objects by key", () => {
  const array = [{ name: "Alice" }, { name: "Bob" }];
  const results = searchInArray(array, "name", "bob");
  expect(results).toEqual([{ name: "Bob" }]);
});
