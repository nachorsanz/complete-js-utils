import {
  groupByKey,
  countByKey,
  sumBy,
  averageBy,
  uniqueBy,
  intersectionBy,
  differenceBy,
  unionBy,
  partition,
  sample,
  sampleSize,
  takeWhile,
  dropWhile,
  findIndex,
  findLastIndex,
  first,
  last,
  nth,
  pull,
  pullAt,
  zip,
  unzip,
  zipWith,
  xor,
  move,
  transpose,
  isSubset,
  isSuperset,
  frequency,
  mostFrequent,
  leastFrequent,
} from "../src/arrayUtils";

describe("ArrayUtils", () => {
  const testData = [
    { id: 1, name: "Alice", age: 25, category: "A" },
    { id: 2, name: "Bob", age: 30, category: "B" },
    { id: 3, name: "Charlie", age: 25, category: "A" },
    { id: 4, name: "David", age: 35, category: "B" },
  ];

  describe("groupByKey", () => {
    it("should group array by specified key", () => {
      const result = groupByKey(testData, "category");
      expect(result).toEqual({
        A: [testData[0], testData[2]],
        B: [testData[1], testData[3]],
      });
    });
  });

  describe("countByKey", () => {
    it("should count occurrences by key", () => {
      const result = countByKey(testData, "category");
      expect(result).toEqual({ A: 2, B: 2 });
    });
  });

  describe("sumBy", () => {
    it("should sum values by key", () => {
      const result = sumBy(testData, "age");
      expect(result).toBe(115);
    });
  });

  describe("averageBy", () => {
    it("should calculate average by key", () => {
      const result = averageBy(testData, "age");
      expect(result).toBe(28.75);
    });

    it("should return 0 for empty array", () => {
      expect(averageBy([], "age")).toBe(0);
    });
  });

  describe("uniqueBy", () => {
    it("should return unique items by key", () => {
      const result = uniqueBy(testData, "age");
      expect(result).toHaveLength(3);
      expect(result.map((item) => item.age)).toEqual([25, 30, 35]);
    });
  });

  describe("intersectionBy", () => {
    it("should find intersection by key", () => {
      const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const array2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
      const result = intersectionBy(array1, array2, "id");
      expect(result).toHaveLength(2);
      expect(result.map((item) => item.id)).toEqual([2, 3]);
    });
  });

  describe("differenceBy", () => {
    it("should find difference by key", () => {
      const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
      const array2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
      const result = differenceBy(array1, array2, "id");
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(1);
    });
  });

  describe("unionBy", () => {
    it("should create union by key", () => {
      const array1 = [{ id: 1 }, { id: 2 }];
      const array2 = [{ id: 2 }, { id: 3 }];
      const result = unionBy(array1, array2, "id");
      expect(result).toHaveLength(3);
      expect(result.map((item) => item.id)).toEqual([1, 2, 3]);
    });
  });

  describe("partition", () => {
    it("should partition array based on predicate", () => {
      const [evens, odds] = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);
      expect(evens).toEqual([2, 4]);
      expect(odds).toEqual([1, 3, 5]);
    });
  });

  describe("sample", () => {
    it("should return random element from array", () => {
      const result = sample([1, 2, 3, 4, 5]);
      expect([1, 2, 3, 4, 5]).toContain(result);
    });

    it("should return undefined for empty array", () => {
      expect(sample([])).toBeUndefined();
    });
  });

  describe("sampleSize", () => {
    it("should return specified number of random elements", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = sampleSize(arr, 3);
      expect(result).toHaveLength(3);
      result.forEach((item) => expect(arr).toContain(item));
    });

    it("should return entire array if n is larger than array length", () => {
      const arr = [1, 2, 3];
      const result = sampleSize(arr, 5);
      expect(result).toHaveLength(3);
    });
  });

  describe("takeWhile", () => {
    it("should take elements while predicate is true", () => {
      const result = takeWhile([1, 2, 3, 4, 5], (n) => n < 4);
      expect(result).toEqual([1, 2, 3]);
    });
  });

  describe("dropWhile", () => {
    it("should drop elements while predicate is true", () => {
      const result = dropWhile([1, 2, 3, 4, 5], (n) => n < 4);
      expect(result).toEqual([4, 5]);
    });
  });

  describe("findIndex", () => {
    it("should find index of element that matches predicate", () => {
      expect(findIndex([1, 2, 3, 4], (x) => x > 2)).toBe(2);
      expect(findIndex([1, 2, 3], (x) => x === 2)).toBe(1);
    });
    
    it("should return -1 when no element matches", () => {
      expect(findIndex([1, 2, 3], (x) => x > 10)).toBe(-1); // Line 122 coverage
      expect(findIndex([], (x) => x > 0)).toBe(-1);
    });
  });

  describe("findLastIndex", () => {
    it("should find last index of element that matches predicate", () => {
      expect(findLastIndex([1, 2, 3, 2, 4], (x) => x === 2)).toBe(3);
      expect(findLastIndex([1, 2, 3, 4], (x) => x > 2)).toBe(3);
    });
    
    it("should return -1 when no element matches", () => {
      expect(findLastIndex([1, 2, 3], (x) => x > 10)).toBe(-1); // Line 131 coverage
      expect(findLastIndex([], (x) => x > 0)).toBe(-1);
    });
  });

  describe("first", () => {
    it("should return first element", () => {
      expect(first([1, 2, 3])).toBe(1);
      expect(first([])).toBeUndefined();
    });
  });

  describe("last", () => {
    it("should return last element", () => {
      expect(last([1, 2, 3])).toBe(3);
      expect(last([])).toBeUndefined();
    });
  });

  describe("nth", () => {
    it("should return element at specified index", () => {
      const arr = [1, 2, 3, 4, 5];
      expect(nth(arr, 2)).toBe(3);
      expect(nth(arr, -1)).toBe(5);
      expect(nth(arr, 10)).toBeUndefined();
    });
  });

  describe("pull", () => {
    it("should remove specified values", () => {
      const result = pull([1, 2, 3, 4, 5], 2, 4);
      expect(result).toEqual([1, 3, 5]);
    });
  });

  describe("pullAt", () => {
    it("should remove and return elements at specified indexes", () => {
      const arr = [1, 2, 3, 4, 5];
      const result = pullAt(arr, [1, 3]);
      expect(result).toEqual([4, 2]); // elementos removidos en orden correcto
      expect(arr).toEqual([1, 3, 5]); // array restante
    });
  });

  describe("zip", () => {
    it("should zip two arrays", () => {
      const result = zip([1, 2, 3], ["a", "b", "c"]);
      expect(result).toEqual([
        [1, "a"],
        [2, "b"],
        [3, "c"],
      ]);
    });

    it("should handle arrays of different lengths", () => {
      const result = zip([1, 2], ["a", "b", "c"]);
      expect(result).toEqual([
        [1, "a"],
        [2, "b"],
      ]);
    });
  });

  describe("unzip", () => {
    it("should unzip array of pairs", () => {
      const [first, second] = unzip([
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
      const result = zipWith([1, 2, 3], [4, 5, 6], (a, b) => a + b);
      expect(result).toEqual([5, 7, 9]);
    });
  });

  describe("xor", () => {
    it("should return symmetric difference", () => {
      const result = xor([1, 2, 3], [3, 4, 5]);
      expect(result.sort()).toEqual([1, 2, 4, 5]);
    });
  });

  describe("move", () => {
    it("should move element to different position", () => {
      const result = move([1, 2, 3, 4, 5], 1, 3);
      expect(result).toEqual([1, 3, 4, 2, 5]);
    });
  });

  describe("transpose", () => {
    it("should transpose matrix", () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
      ];
      const result = transpose(matrix);
      expect(result).toEqual([
        [1, 4],
        [2, 5],
        [3, 6],
      ]);
    });

    it("should handle empty matrix", () => {
      expect(transpose([])).toEqual([]);
    });
  });

  describe("isSubset", () => {
    it("should check if array is subset", () => {
      expect(isSubset([1, 2], [1, 2, 3, 4])).toBe(true);
      expect(isSubset([1, 5], [1, 2, 3, 4])).toBe(false);
    });
  });

  describe("isSuperset", () => {
    it("should check if array is superset", () => {
      expect(isSuperset([1, 2, 3, 4], [1, 2])).toBe(true);
      expect(isSuperset([1, 2, 3], [1, 5])).toBe(false);
    });
  });

  describe("frequency", () => {
    it("should return frequency map", () => {
      const result = frequency([1, 2, 2, 3, 3, 3]);
      expect(result.get(1)).toBe(1);
      expect(result.get(2)).toBe(2);
      expect(result.get(3)).toBe(3);
    });
  });

  describe("mostFrequent", () => {
    it("should return most frequent element", () => {
      const result = mostFrequent([1, 2, 2, 3, 3, 3]);
      expect(result).toBe(3);
    });

    it("should return undefined for empty array", () => {
      expect(mostFrequent([])).toBeUndefined();
    });
  });

  describe("leastFrequent", () => {
    it("should return least frequent element", () => {
      const result = leastFrequent([1, 2, 2, 3, 3, 3]);
      expect(result).toBe(1);
    });

    it("should return undefined for empty array", () => {
      expect(leastFrequent([])).toBeUndefined();
    });
  });
});
