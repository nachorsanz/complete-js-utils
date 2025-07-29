import {
  clamp,
  random,
  randomInt,
  round,
  toFixed,
  isEven,
  isOdd,
  isPrime,
  factorial,
  fibonacci,
  gcd,
  lcm,
  percentage,
  percentageOf,
  average,
  median,
  mode,
  sum,
  product,
  max,
  min,
  range,
  standardDeviation,
  variance,
  toRadians,
  toDegrees,
  formatNumber,
  formatCurrency,
  formatPercent,
  lerp,
  map,
  inRange,
} from "../src/numberUtils";

describe("NumberUtils", () => {
  describe("clamp", () => {
    it("should clamp number within range", () => {
      expect(clamp(5, 1, 10)).toBe(5);
      expect(clamp(0, 1, 10)).toBe(1);
      expect(clamp(15, 1, 10)).toBe(10);
    });
  });

  describe("random", () => {
    it("should generate random number within range", () => {
      const result = random(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(10);
    });
  });

  describe("randomInt", () => {
    it("should generate random integer within range", () => {
      const result = randomInt(1, 10);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
      expect(Number.isInteger(result)).toBe(true);
    });
  });

  describe("round", () => {
    it("should round number to specified decimals", () => {
      expect(round(3.14159, 2)).toBe(3.14);
      expect(round(3.6)).toBe(4);
      expect(round(3.14159, 4)).toBe(3.1416);
    });
  });

  describe("toFixed", () => {
    it("should format number with fixed decimals", () => {
      expect(toFixed(3.14159, 2)).toBe("3.14");
      expect(toFixed(3, 2)).toBe("3.00");
    });
  });

  describe("isEven", () => {
    it("should check if number is even", () => {
      expect(isEven(2)).toBe(true);
      expect(isEven(3)).toBe(false);
      expect(isEven(0)).toBe(true);
    });
  });

  describe("isOdd", () => {
    it("should check if number is odd", () => {
      expect(isOdd(3)).toBe(true);
      expect(isOdd(2)).toBe(false);
      expect(isOdd(1)).toBe(true);
    });
  });

  describe("isPrime", () => {
    it("should check if number is prime", () => {
      expect(isPrime(2)).toBe(true);
      expect(isPrime(3)).toBe(true);
      expect(isPrime(4)).toBe(false);
      expect(isPrime(17)).toBe(true);
      expect(isPrime(1)).toBe(false);
      expect(isPrime(0)).toBe(false);
    });
  });

  describe("factorial", () => {
    it("should calculate factorial", () => {
      expect(factorial(0)).toBe(1);
      expect(factorial(1)).toBe(1);
      expect(factorial(5)).toBe(120);
      expect(factorial(-1)).toBe(-1);
    });
  });

  describe("fibonacci", () => {
    it("should calculate fibonacci number", () => {
      expect(fibonacci(0)).toBe(0);
      expect(fibonacci(1)).toBe(1);
      expect(fibonacci(6)).toBe(8);
      expect(fibonacci(10)).toBe(55);
    });
  });

  describe("gcd", () => {
    it("should calculate greatest common divisor", () => {
      expect(gcd(12, 18)).toBe(6);
      expect(gcd(48, 18)).toBe(6);
      expect(gcd(7, 13)).toBe(1);
    });
  });

  describe("lcm", () => {
    it("should calculate least common multiple", () => {
      expect(lcm(4, 6)).toBe(12);
      expect(lcm(3, 5)).toBe(15);
    });
  });

  describe("percentage", () => {
    it("should calculate percentage", () => {
      expect(percentage(25, 100)).toBe(25);
      expect(percentage(1, 4)).toBe(25);
      expect(percentage(3, 4)).toBe(75);
    });
  });

  describe("percentageOf", () => {
    it("should calculate percentage of total", () => {
      expect(percentageOf(50, 200)).toBe(100);
      expect(percentageOf(25, 100)).toBe(25);
    });
  });

  describe("sum", () => {
    it("should calculate sum of array", () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
      expect(sum([])).toBe(0);
      expect(sum([5])).toBe(5);
    });
  });

  describe("average", () => {
    it("should calculate average of array", () => {
      expect(average([1, 2, 3, 4, 5])).toBe(3);
      expect(average([10, 20])).toBe(15);
      expect(average([])).toBe(0);
    });
  });

  describe("median", () => {
    it("should calculate median of array", () => {
      expect(median([1, 2, 3, 4, 5])).toBe(3);
      expect(median([1, 2, 3, 4])).toBe(2.5);
      expect(median([5, 1, 3])).toBe(3);
    });
  });

  describe("mode", () => {
    it("should find mode of array", () => {
      expect(mode([1, 2, 2, 3, 3, 3])).toEqual([3]);
      expect(mode([1, 1, 2, 2])).toEqual([1, 2]);
    });
  });

  describe("min", () => {
    it("should find minimum value", () => {
      expect(min([3, 1, 4, 1, 5])).toBe(1);
      expect(min([10])).toBe(10);
    });
  });

  describe("max", () => {
    it("should find maximum value", () => {
      expect(max([3, 1, 4, 1, 5])).toBe(5);
      expect(max([10])).toBe(10);
    });
  });

  describe("range", () => {
    it("should calculate range of array", () => {
      expect(range([1, 5, 3, 9, 2])).toBe(8);
      expect(range([5])).toBe(0);
    });
  });

  describe("standardDeviation", () => {
    it("should calculate standard deviation", () => {
      const result = standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]);
      expect(result).toBeCloseTo(2, 0);
    });
  });

  describe("variance", () => {
    it("should calculate variance", () => {
      const result = variance([2, 4, 4, 4, 5, 5, 7, 9]);
      expect(result).toBeCloseTo(4, 0);
    });
  });

  describe("toDegrees", () => {
    it("should convert radians to degrees", () => {
      expect(toDegrees(Math.PI)).toBeCloseTo(180);
      expect(toDegrees(Math.PI / 2)).toBeCloseTo(90);
    });
  });

  describe("toRadians", () => {
    it("should convert degrees to radians", () => {
      expect(toRadians(180)).toBeCloseTo(Math.PI);
      expect(toRadians(90)).toBeCloseTo(Math.PI / 2);
    });
  });

  describe("formatNumber", () => {
    it("should format number with locale", () => {
      const result = formatNumber(1234.56);
      expect(typeof result).toBe("string");
      expect(result).toContain("1");
    });
  });

  describe("inRange", () => {
    it("should check if number is in range", () => {
      expect(inRange(5, 1, 10)).toBe(true);
      expect(inRange(0, 1, 10)).toBe(false);
      expect(inRange(11, 1, 10)).toBe(false);
      expect(inRange(1, 1, 10)).toBe(true);
      expect(inRange(10, 1, 10)).toBe(true);
    });
  });

  describe("lerp", () => {
    it("should interpolate between two values", () => {
      expect(lerp(0, 10, 0.5)).toBe(5);
      expect(lerp(10, 20, 0)).toBe(10);
      expect(lerp(10, 20, 1)).toBe(20);
    });
  });

  describe("map", () => {
    it("should map value from one range to another", () => {
      expect(map(5, 0, 10, 0, 100)).toBe(50);
      expect(map(2.5, 0, 5, 0, 10)).toBe(5);
    });
  });
});
