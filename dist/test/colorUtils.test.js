"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorUtils_1 = require("../src/colorUtils");
describe("ColorUtils", () => {
    describe("hexToRgb", () => {
        it("should convert hex to RGB", () => {
            expect((0, colorUtils_1.hexToRgb)("#FF0000")).toEqual({ r: 255, g: 0, b: 0 });
            expect((0, colorUtils_1.hexToRgb)("#00FF00")).toEqual({ r: 0, g: 255, b: 0 });
            expect((0, colorUtils_1.hexToRgb)("#0000FF")).toEqual({ r: 0, g: 0, b: 255 });
            expect((0, colorUtils_1.hexToRgb)("FF0000")).toEqual({ r: 255, g: 0, b: 0 });
            expect((0, colorUtils_1.hexToRgb)("#fff")).toEqual({ r: 255, g: 255, b: 255 });
        });
        it("should return null for invalid hex", () => {
            expect((0, colorUtils_1.hexToRgb)("invalid")).toBeNull();
            expect((0, colorUtils_1.hexToRgb)("#GG0000")).toBeNull();
            expect((0, colorUtils_1.hexToRgb)("")).toBeNull();
        });
    });
    describe("rgbToHex", () => {
        it("should convert RGB to hex", () => {
            expect((0, colorUtils_1.rgbToHex)(255, 0, 0)).toBe("#ff0000");
            expect((0, colorUtils_1.rgbToHex)(0, 255, 0)).toBe("#00ff00");
            expect((0, colorUtils_1.rgbToHex)(0, 0, 255)).toBe("#0000ff");
            expect((0, colorUtils_1.rgbToHex)(255, 255, 255)).toBe("#ffffff");
            expect((0, colorUtils_1.rgbToHex)(0, 0, 0)).toBe("#000000");
        });
        it("should handle decimal values by rounding", () => {
            expect((0, colorUtils_1.rgbToHex)(255.7, 0.3, 0.9)).toBe("#ff0001");
            expect((0, colorUtils_1.rgbToHex)(128.5, 128.5, 128.5)).toBe("#818181");
        });
    });
    describe("rgbToHsl", () => {
        it("should convert RGB to HSL", () => {
            expect((0, colorUtils_1.rgbToHsl)(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 });
            expect((0, colorUtils_1.rgbToHsl)(0, 255, 0)).toEqual({ h: 120, s: 100, l: 50 });
            expect((0, colorUtils_1.rgbToHsl)(0, 0, 255)).toEqual({ h: 240, s: 100, l: 50 });
            expect((0, colorUtils_1.rgbToHsl)(255, 255, 255)).toEqual({ h: 0, s: 0, l: 100 });
            expect((0, colorUtils_1.rgbToHsl)(0, 0, 0)).toEqual({ h: 0, s: 0, l: 0 });
        });
    });
    describe("hslToRgb", () => {
        it("should convert HSL to RGB", () => {
            expect((0, colorUtils_1.hslToRgb)(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });
            expect((0, colorUtils_1.hslToRgb)(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });
            expect((0, colorUtils_1.hslToRgb)(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 });
            expect((0, colorUtils_1.hslToRgb)(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });
            expect((0, colorUtils_1.hslToRgb)(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });
        });
    });
    describe("rgbToHsv", () => {
        it("should convert RGB to HSV", () => {
            expect((0, colorUtils_1.rgbToHsv)(255, 0, 0)).toEqual({ h: 0, s: 100, v: 100 });
            expect((0, colorUtils_1.rgbToHsv)(0, 255, 0)).toEqual({ h: 120, s: 100, v: 100 });
            expect((0, colorUtils_1.rgbToHsv)(0, 0, 255)).toEqual({ h: 240, s: 100, v: 100 });
            expect((0, colorUtils_1.rgbToHsv)(255, 255, 255)).toEqual({ h: 0, s: 0, v: 100 });
            expect((0, colorUtils_1.rgbToHsv)(0, 0, 0)).toEqual({ h: 0, s: 0, v: 0 });
        });
    });
    describe("hsvToRgb", () => {
        it("should convert HSV to RGB", () => {
            expect((0, colorUtils_1.hsvToRgb)(0, 100, 100)).toEqual({ r: 255, g: 0, b: 0 });
            expect((0, colorUtils_1.hsvToRgb)(120, 100, 100)).toEqual({ r: 0, g: 255, b: 0 });
            expect((0, colorUtils_1.hsvToRgb)(240, 100, 100)).toEqual({ r: 0, g: 0, b: 255 });
            expect((0, colorUtils_1.hsvToRgb)(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });
            expect((0, colorUtils_1.hsvToRgb)(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });
        });
    });
    describe("lighten", () => {
        it("should lighten a color", () => {
            const originalHex = "#808080";
            const lightened = (0, colorUtils_1.lighten)(originalHex, 20);
            expect(lightened).not.toBe(originalHex);
            // Should return original hex if invalid
            expect((0, colorUtils_1.lighten)("invalid", 20)).toBe("invalid");
        });
        it("should not exceed maximum lightness", () => {
            const veryLight = (0, colorUtils_1.lighten)("#f0f0f0", 50);
            expect(veryLight).toBeTruthy();
        });
    });
    describe("darken", () => {
        it("should darken a color", () => {
            const originalHex = "#808080";
            const darkened = (0, colorUtils_1.darken)(originalHex, 20);
            expect(darkened).not.toBe(originalHex);
            // Should return original hex if invalid
            expect((0, colorUtils_1.darken)("invalid", 20)).toBe("invalid");
        });
        it("should not go below minimum lightness", () => {
            const veryDark = (0, colorUtils_1.darken)("#101010", 50);
            expect(veryDark).toBeTruthy();
        });
    });
    describe("saturate", () => {
        it("should increase saturation", () => {
            const originalHex = "#808080";
            const saturated = (0, colorUtils_1.saturate)(originalHex, 50);
            expect(saturated).not.toBe(originalHex);
            // Should return original hex if invalid
            expect((0, colorUtils_1.saturate)("invalid", 50)).toBe("invalid");
        });
    });
    describe("desaturate", () => {
        it("should decrease saturation", () => {
            const originalHex = "#ff0000";
            const desaturated = (0, colorUtils_1.desaturate)(originalHex, 50);
            expect(desaturated).not.toBe(originalHex);
            // Should return original hex if invalid
            expect((0, colorUtils_1.desaturate)("invalid", 50)).toBe("invalid");
        });
    });
    describe("complement", () => {
        it("should return complementary color", () => {
            expect((0, colorUtils_1.complement)("#ff0000")).not.toBe("#ff0000");
            expect((0, colorUtils_1.complement)("invalid")).toBe("invalid");
        });
        it("should return cyan for red", () => {
            const redComplement = (0, colorUtils_1.complement)("#ff0000");
            expect(redComplement).toBeTruthy();
            expect(redComplement).not.toBe("#ff0000");
        });
    });
    describe("analogous", () => {
        it("should return analogous colors", () => {
            const colors = (0, colorUtils_1.analogous)("#ff0000");
            expect(colors).toHaveLength(3);
            expect(colors[0]).toBe("#ff0000");
            expect(colors[1]).not.toBe("#ff0000");
            expect(colors[2]).not.toBe("#ff0000");
        });
        it("should accept custom angle", () => {
            const colors = (0, colorUtils_1.analogous)("#ff0000", 45);
            expect(colors).toHaveLength(3);
        });
        it("should handle invalid hex", () => {
            const colors = (0, colorUtils_1.analogous)("invalid");
            expect(colors).toEqual(["invalid"]);
        });
    });
    describe("triadic", () => {
        it("should return triadic colors", () => {
            const colors = (0, colorUtils_1.triadic)("#ff0000");
            expect(colors).toHaveLength(3);
            expect(colors[0]).toBe("#ff0000");
        });
        it("should handle invalid hex", () => {
            const colors = (0, colorUtils_1.triadic)("invalid");
            expect(colors).toEqual(["invalid"]);
        });
    });
    describe("tetradic", () => {
        it("should return tetradic colors", () => {
            const colors = (0, colorUtils_1.tetradic)("#ff0000");
            expect(colors).toHaveLength(4);
            expect(colors[0]).toBe("#ff0000");
        });
        it("should handle invalid hex", () => {
            const colors = (0, colorUtils_1.tetradic)("invalid");
            expect(colors).toEqual(["invalid"]);
        });
    });
    describe("monochromatic", () => {
        it("should return monochromatic colors with default steps", () => {
            const colors = (0, colorUtils_1.monochromatic)("#ff0000");
            expect(colors).toHaveLength(5);
        });
        it("should return custom number of steps", () => {
            const colors = (0, colorUtils_1.monochromatic)("#ff0000", 7);
            expect(colors).toHaveLength(7);
        });
        it("should handle invalid hex", () => {
            const colors = (0, colorUtils_1.monochromatic)("invalid");
            expect(colors).toEqual(["invalid"]);
        });
    });
    describe("getContrast", () => {
        it("should calculate contrast ratio", () => {
            const contrast = (0, colorUtils_1.getContrast)("#ffffff", "#000000");
            expect(contrast).toBeGreaterThan(1);
            // Same colors should have contrast ratio of 1
            const sameContrast = (0, colorUtils_1.getContrast)("#ff0000", "#ff0000");
            expect(sameContrast).toBe(1);
        });
        it("should handle invalid colors", () => {
            const contrast = (0, colorUtils_1.getContrast)("invalid", "#000000");
            expect(contrast).toBe(1);
        });
    });
    describe("isLight", () => {
        it("should determine if color is light", () => {
            expect((0, colorUtils_1.isLight)("#ffffff")).toBe(true);
            expect((0, colorUtils_1.isLight)("#000000")).toBe(false);
            expect((0, colorUtils_1.isLight)("#808080")).toBe(false); // Medium gray
            expect((0, colorUtils_1.isLight)("#f0f0f0")).toBe(true);
        });
        it("should handle invalid hex", () => {
            expect((0, colorUtils_1.isLight)("invalid")).toBe(false);
        });
    });
    describe("isDark", () => {
        it("should determine if color is dark", () => {
            expect((0, colorUtils_1.isDark)("#ffffff")).toBe(false);
            expect((0, colorUtils_1.isDark)("#000000")).toBe(true);
            expect((0, colorUtils_1.isDark)("#808080")).toBe(true); // Medium gray
            expect((0, colorUtils_1.isDark)("#f0f0f0")).toBe(false);
        });
        it("should be opposite of isLight", () => {
            const testColors = ["#ffffff", "#000000", "#ff0000", "#808080"];
            testColors.forEach((color) => {
                expect((0, colorUtils_1.isDark)(color)).toBe(!(0, colorUtils_1.isLight)(color));
            });
        });
    });
    describe("randomColor", () => {
        it("should generate random hex color", () => {
            const color = (0, colorUtils_1.randomColor)();
            expect(color).toMatch(/^#[0-9a-f]{6}$/);
        });
        it("should generate different colors", () => {
            const color1 = (0, colorUtils_1.randomColor)();
            const color2 = (0, colorUtils_1.randomColor)();
            // Very unlikely to be the same (though theoretically possible)
            expect(color1).toBeTruthy();
            expect(color2).toBeTruthy();
        });
    });
    describe("rgbString", () => {
        it("should create RGB string", () => {
            expect((0, colorUtils_1.rgbString)(255, 0, 0)).toBe("rgb(255, 0, 0)");
            expect((0, colorUtils_1.rgbString)(0, 255, 0)).toBe("rgb(0, 255, 0)");
            expect((0, colorUtils_1.rgbString)(0, 0, 255)).toBe("rgb(0, 0, 255)");
        });
        it("should create RGBA string with alpha", () => {
            expect((0, colorUtils_1.rgbString)(255, 0, 0, 0.5)).toBe("rgba(255, 0, 0, 0.5)");
            expect((0, colorUtils_1.rgbString)(0, 255, 0, 1)).toBe("rgba(0, 255, 0, 1)");
            expect((0, colorUtils_1.rgbString)(0, 0, 255, 0)).toBe("rgba(0, 0, 255, 0)");
        });
    });
    describe("hslString", () => {
        it("should create HSL string", () => {
            expect((0, colorUtils_1.hslString)(0, 100, 50)).toBe("hsl(0, 100%, 50%)");
            expect((0, colorUtils_1.hslString)(120, 100, 50)).toBe("hsl(120, 100%, 50%)");
            expect((0, colorUtils_1.hslString)(240, 100, 50)).toBe("hsl(240, 100%, 50%)");
        });
        it("should create HSLA string with alpha", () => {
            expect((0, colorUtils_1.hslString)(0, 100, 50, 0.5)).toBe("hsla(0, 100%, 50%, 0.5)");
            expect((0, colorUtils_1.hslString)(120, 100, 50, 1)).toBe("hsla(120, 100%, 50%, 1)");
            expect((0, colorUtils_1.hslString)(240, 100, 50, 0)).toBe("hsla(240, 100%, 50%, 0)");
        });
    });
});
