"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const numberUtils_1 = require("../src/numberUtils");
describe("NumberUtils", () => {
    describe("clamp", () => {
        it("should clamp number within range", () => {
            expect((0, numberUtils_1.clamp)(5, 1, 10)).toBe(5);
            expect((0, numberUtils_1.clamp)(0, 1, 10)).toBe(1);
            expect((0, numberUtils_1.clamp)(15, 1, 10)).toBe(10);
        });
    });
    describe("random", () => {
        it("should generate random number within range", () => {
            const result = (0, numberUtils_1.random)(1, 10);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThan(10);
        });
    });
    describe("randomInt", () => {
        it("should generate random integer within range", () => {
            const result = (0, numberUtils_1.randomInt)(1, 10);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(10);
            expect(Number.isInteger(result)).toBe(true);
        });
    });
    describe("round", () => {
        it("should round number to specified decimals", () => {
            expect((0, numberUtils_1.round)(3.14159, 2)).toBe(3.14);
            expect((0, numberUtils_1.round)(3.6)).toBe(4);
            expect((0, numberUtils_1.round)(3.14159, 4)).toBe(3.1416);
        });
    });
    describe("toFixed", () => {
        it("should format number with fixed decimals", () => {
            expect((0, numberUtils_1.toFixed)(3.14159, 2)).toBe("3.14");
            expect((0, numberUtils_1.toFixed)(3, 2)).toBe("3.00");
        });
    });
    describe("isEven", () => {
        it("should check if number is even", () => {
            expect((0, numberUtils_1.isEven)(2)).toBe(true);
            expect((0, numberUtils_1.isEven)(3)).toBe(false);
            expect((0, numberUtils_1.isEven)(0)).toBe(true);
        });
    });
    describe("isOdd", () => {
        it("should check if number is odd", () => {
            expect((0, numberUtils_1.isOdd)(3)).toBe(true);
            expect((0, numberUtils_1.isOdd)(2)).toBe(false);
            expect((0, numberUtils_1.isOdd)(1)).toBe(true);
        });
    });
    describe("isPrime", () => {
        it("should check if number is prime", () => {
            expect((0, numberUtils_1.isPrime)(2)).toBe(true);
            expect((0, numberUtils_1.isPrime)(3)).toBe(true);
            expect((0, numberUtils_1.isPrime)(4)).toBe(false);
            expect((0, numberUtils_1.isPrime)(17)).toBe(true);
            expect((0, numberUtils_1.isPrime)(1)).toBe(false);
            expect((0, numberUtils_1.isPrime)(0)).toBe(false);
        });
    });
    describe("factorial", () => {
        it("should calculate factorial", () => {
            expect((0, numberUtils_1.factorial)(0)).toBe(1);
            expect((0, numberUtils_1.factorial)(1)).toBe(1);
            expect((0, numberUtils_1.factorial)(5)).toBe(120);
            expect((0, numberUtils_1.factorial)(-1)).toBe(-1);
        });
    });
    describe("fibonacci", () => {
        it("should calculate fibonacci number", () => {
            expect((0, numberUtils_1.fibonacci)(0)).toBe(0);
            expect((0, numberUtils_1.fibonacci)(1)).toBe(1);
            expect((0, numberUtils_1.fibonacci)(6)).toBe(8);
            expect((0, numberUtils_1.fibonacci)(10)).toBe(55);
        });
    });
    describe("gcd", () => {
        it("should calculate greatest common divisor", () => {
            expect((0, numberUtils_1.gcd)(12, 18)).toBe(6);
            expect((0, numberUtils_1.gcd)(48, 18)).toBe(6);
            expect((0, numberUtils_1.gcd)(7, 13)).toBe(1);
        });
    });
    describe("lcm", () => {
        it("should calculate least common multiple", () => {
            expect((0, numberUtils_1.lcm)(4, 6)).toBe(12);
            expect((0, numberUtils_1.lcm)(3, 5)).toBe(15);
        });
    });
    describe("percentage", () => {
        it("should calculate percentage", () => {
            expect((0, numberUtils_1.percentage)(25, 100)).toBe(25);
            expect((0, numberUtils_1.percentage)(1, 4)).toBe(25);
            expect((0, numberUtils_1.percentage)(3, 4)).toBe(75);
        });
    });
    describe("percentageOf", () => {
        it("should calculate percentage of total", () => {
            expect((0, numberUtils_1.percentageOf)(50, 200)).toBe(100);
            expect((0, numberUtils_1.percentageOf)(25, 100)).toBe(25);
        });
    });
    describe("sum", () => {
        it("should calculate sum of array", () => {
            expect((0, numberUtils_1.sum)([1, 2, 3, 4, 5])).toBe(15);
            expect((0, numberUtils_1.sum)([])).toBe(0);
            expect((0, numberUtils_1.sum)([5])).toBe(5);
        });
    });
    describe("average", () => {
        it("should calculate average of array", () => {
            expect((0, numberUtils_1.average)([1, 2, 3, 4, 5])).toBe(3);
            expect((0, numberUtils_1.average)([10, 20])).toBe(15);
            expect((0, numberUtils_1.average)([])).toBe(0);
        });
    });
    describe("median", () => {
        it("should calculate median of array", () => {
            expect((0, numberUtils_1.median)([1, 2, 3, 4, 5])).toBe(3);
            expect((0, numberUtils_1.median)([1, 2, 3, 4])).toBe(2.5);
            expect((0, numberUtils_1.median)([5, 1, 3])).toBe(3);
        });
    });
    describe("mode", () => {
        it("should find mode of array", () => {
            expect((0, numberUtils_1.mode)([1, 2, 2, 3, 3, 3])).toEqual([3]);
            expect((0, numberUtils_1.mode)([1, 1, 2, 2])).toEqual([1, 2]);
        });
    });
    describe("min", () => {
        it("should find minimum value", () => {
            expect((0, numberUtils_1.min)([3, 1, 4, 1, 5])).toBe(1);
            expect((0, numberUtils_1.min)([10])).toBe(10);
        });
    });
    describe("max", () => {
        it("should find maximum value", () => {
            expect((0, numberUtils_1.max)([3, 1, 4, 1, 5])).toBe(5);
            expect((0, numberUtils_1.max)([10])).toBe(10);
        });
    });
    describe("range", () => {
        it("should calculate range of array", () => {
            expect((0, numberUtils_1.range)([1, 5, 3, 9, 2])).toBe(8);
            expect((0, numberUtils_1.range)([5])).toBe(0);
        });
    });
    describe("standardDeviation", () => {
        it("should calculate standard deviation", () => {
            const result = (0, numberUtils_1.standardDeviation)([2, 4, 4, 4, 5, 5, 7, 9]);
            expect(result).toBeCloseTo(2, 0);
        });
    });
    describe("variance", () => {
        it("should calculate variance", () => {
            const result = (0, numberUtils_1.variance)([2, 4, 4, 4, 5, 5, 7, 9]);
            expect(result).toBeCloseTo(4, 0);
        });
    });
    describe("toDegrees", () => {
        it("should convert radians to degrees", () => {
            expect((0, numberUtils_1.toDegrees)(Math.PI)).toBeCloseTo(180);
            expect((0, numberUtils_1.toDegrees)(Math.PI / 2)).toBeCloseTo(90);
        });
    });
    describe("toRadians", () => {
        it("should convert degrees to radians", () => {
            expect((0, numberUtils_1.toRadians)(180)).toBeCloseTo(Math.PI);
            expect((0, numberUtils_1.toRadians)(90)).toBeCloseTo(Math.PI / 2);
        });
    });
    describe("formatNumber", () => {
        it("should format number with locale", () => {
            const result = (0, numberUtils_1.formatNumber)(1234.56);
            expect(typeof result).toBe("string");
            expect(result).toContain("1");
        });
    });
    describe("inRange", () => {
        it("should check if number is in range", () => {
            expect((0, numberUtils_1.inRange)(5, 1, 10)).toBe(true);
            expect((0, numberUtils_1.inRange)(0, 1, 10)).toBe(false);
            expect((0, numberUtils_1.inRange)(11, 1, 10)).toBe(false);
            expect((0, numberUtils_1.inRange)(1, 1, 10)).toBe(true);
            expect((0, numberUtils_1.inRange)(10, 1, 10)).toBe(true);
        });
    });
    describe("lerp", () => {
        it("should interpolate between two values", () => {
            expect((0, numberUtils_1.lerp)(0, 10, 0.5)).toBe(5);
            expect((0, numberUtils_1.lerp)(10, 20, 0)).toBe(10);
            expect((0, numberUtils_1.lerp)(10, 20, 1)).toBe(20);
        });
    });
    describe("map", () => {
        it("should map value from one range to another", () => {
            expect((0, numberUtils_1.map)(5, 0, 10, 0, 100)).toBe(50);
            expect((0, numberUtils_1.map)(2.5, 0, 5, 0, 10)).toBe(5);
        });
    });
});
