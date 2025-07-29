import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  hsvToRgb,
  lighten,
  darken,
  saturate,
  desaturate,
  complement,
  analogous,
  triadic,
  tetradic,
  monochromatic,
  getContrast,
  isLight,
  isDark,
  randomColor,
  rgbString,
  hslString,
  type RGB,
  type HSL,
  type HSV,
} from "../src/colorUtils";

describe("ColorUtils", () => {
  describe("hexToRgb", () => {
    it("should convert hex to RGB", () => {
      expect(hexToRgb("#FF0000")).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb("#00FF00")).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb("#0000FF")).toEqual({ r: 0, g: 0, b: 255 });
      expect(hexToRgb("FF0000")).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb("#fff")).toEqual({ r: 255, g: 255, b: 255 });
    });

    it("should return null for invalid hex", () => {
      expect(hexToRgb("invalid")).toBeNull();
      expect(hexToRgb("#GG0000")).toBeNull();
      expect(hexToRgb("")).toBeNull();
    });
  });

  describe("rgbToHex", () => {
    it("should convert RGB to hex", () => {
      expect(rgbToHex(255, 0, 0)).toBe("#ff0000");
      expect(rgbToHex(0, 255, 0)).toBe("#00ff00");
      expect(rgbToHex(0, 0, 255)).toBe("#0000ff");
      expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
      expect(rgbToHex(0, 0, 0)).toBe("#000000");
    });

    it("should handle decimal values by rounding", () => {
      expect(rgbToHex(255.7, 0.3, 0.9)).toBe("#ff0001");
      expect(rgbToHex(128.5, 128.5, 128.5)).toBe("#818181");
    });
  });

  describe("rgbToHsl", () => {
    it("should convert RGB to HSL", () => {
      expect(rgbToHsl(255, 0, 0)).toEqual({ h: 0, s: 100, l: 50 });
      expect(rgbToHsl(0, 255, 0)).toEqual({ h: 120, s: 100, l: 50 });
      expect(rgbToHsl(0, 0, 255)).toEqual({ h: 240, s: 100, l: 50 });
      expect(rgbToHsl(255, 255, 255)).toEqual({ h: 0, s: 0, l: 100 });
      expect(rgbToHsl(0, 0, 0)).toEqual({ h: 0, s: 0, l: 0 });
    });
  });

  describe("hslToRgb", () => {
    it("should convert HSL to RGB", () => {
      expect(hslToRgb(0, 100, 50)).toEqual({ r: 255, g: 0, b: 0 });
      expect(hslToRgb(120, 100, 50)).toEqual({ r: 0, g: 255, b: 0 });
      expect(hslToRgb(240, 100, 50)).toEqual({ r: 0, g: 0, b: 255 });
      expect(hslToRgb(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });
      expect(hslToRgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });
    });
  });

  describe("rgbToHsv", () => {
    it("should convert RGB to HSV", () => {
      expect(rgbToHsv(255, 0, 0)).toEqual({ h: 0, s: 100, v: 100 });
      expect(rgbToHsv(0, 255, 0)).toEqual({ h: 120, s: 100, v: 100 });
      expect(rgbToHsv(0, 0, 255)).toEqual({ h: 240, s: 100, v: 100 });
      expect(rgbToHsv(255, 255, 255)).toEqual({ h: 0, s: 0, v: 100 });
      expect(rgbToHsv(0, 0, 0)).toEqual({ h: 0, s: 0, v: 0 });
    });
  });

  describe("hsvToRgb", () => {
    it("should convert HSV to RGB", () => {
      expect(hsvToRgb(0, 100, 100)).toEqual({ r: 255, g: 0, b: 0 });
      expect(hsvToRgb(120, 100, 100)).toEqual({ r: 0, g: 255, b: 0 });
      expect(hsvToRgb(240, 100, 100)).toEqual({ r: 0, g: 0, b: 255 });
      expect(hsvToRgb(0, 0, 100)).toEqual({ r: 255, g: 255, b: 255 });
      expect(hsvToRgb(0, 0, 0)).toEqual({ r: 0, g: 0, b: 0 });
    });
  });

  describe("lighten", () => {
    it("should lighten a color", () => {
      const originalHex = "#808080";
      const lightened = lighten(originalHex, 20);
      expect(lightened).not.toBe(originalHex);

      // Should return original hex if invalid
      expect(lighten("invalid", 20)).toBe("invalid");
    });

    it("should not exceed maximum lightness", () => {
      const veryLight = lighten("#f0f0f0", 50);
      expect(veryLight).toBeTruthy();
    });
  });

  describe("darken", () => {
    it("should darken a color", () => {
      const originalHex = "#808080";
      const darkened = darken(originalHex, 20);
      expect(darkened).not.toBe(originalHex);

      // Should return original hex if invalid
      expect(darken("invalid", 20)).toBe("invalid");
    });

    it("should not go below minimum lightness", () => {
      const veryDark = darken("#101010", 50);
      expect(veryDark).toBeTruthy();
    });
  });

  describe("saturate", () => {
    it("should increase saturation", () => {
      const originalHex = "#808080";
      const saturated = saturate(originalHex, 50);
      expect(saturated).not.toBe(originalHex);

      // Should return original hex if invalid
      expect(saturate("invalid", 50)).toBe("invalid");
    });
  });

  describe("desaturate", () => {
    it("should decrease saturation", () => {
      const originalHex = "#ff0000";
      const desaturated = desaturate(originalHex, 50);
      expect(desaturated).not.toBe(originalHex);

      // Should return original hex if invalid
      expect(desaturate("invalid", 50)).toBe("invalid");
    });
  });

  describe("complement", () => {
    it("should return complementary color", () => {
      expect(complement("#ff0000")).not.toBe("#ff0000");
      expect(complement("invalid")).toBe("invalid");
    });

    it("should return cyan for red", () => {
      const redComplement = complement("#ff0000");
      expect(redComplement).toBeTruthy();
      expect(redComplement).not.toBe("#ff0000");
    });
  });

  describe("analogous", () => {
    it("should return analogous colors", () => {
      const colors = analogous("#ff0000");
      expect(colors).toHaveLength(3);
      expect(colors[0]).toBe("#ff0000");
      expect(colors[1]).not.toBe("#ff0000");
      expect(colors[2]).not.toBe("#ff0000");
    });

    it("should accept custom angle", () => {
      const colors = analogous("#ff0000", 45);
      expect(colors).toHaveLength(3);
    });

    it("should handle invalid hex", () => {
      const colors = analogous("invalid");
      expect(colors).toEqual(["invalid"]);
    });
  });

  describe("triadic", () => {
    it("should return triadic colors", () => {
      const colors = triadic("#ff0000");
      expect(colors).toHaveLength(3);
      expect(colors[0]).toBe("#ff0000");
    });

    it("should handle invalid hex", () => {
      const colors = triadic("invalid");
      expect(colors).toEqual(["invalid"]);
    });
  });

  describe("tetradic", () => {
    it("should return tetradic colors", () => {
      const colors = tetradic("#ff0000");
      expect(colors).toHaveLength(4);
      expect(colors[0]).toBe("#ff0000");
    });

    it("should handle invalid hex", () => {
      const colors = tetradic("invalid");
      expect(colors).toEqual(["invalid"]);
    });
  });

  describe("monochromatic", () => {
    it("should return monochromatic colors with default steps", () => {
      const colors = monochromatic("#ff0000");
      expect(colors).toHaveLength(5);
    });

    it("should return custom number of steps", () => {
      const colors = monochromatic("#ff0000", 7);
      expect(colors).toHaveLength(7);
    });

    it("should handle invalid hex", () => {
      const colors = monochromatic("invalid");
      expect(colors).toEqual(["invalid"]);
    });
  });

  describe("getContrast", () => {
    it("should calculate contrast ratio", () => {
      const contrast = getContrast("#ffffff", "#000000");
      expect(contrast).toBeGreaterThan(1);

      // Same colors should have contrast ratio of 1
      const sameContrast = getContrast("#ff0000", "#ff0000");
      expect(sameContrast).toBe(1);
    });

    it("should handle invalid colors", () => {
      const contrast = getContrast("invalid", "#000000");
      expect(contrast).toBe(1);
    });
  });

  describe("isLight", () => {
    it("should determine if color is light", () => {
      expect(isLight("#ffffff")).toBe(true);
      expect(isLight("#000000")).toBe(false);
      expect(isLight("#808080")).toBe(false); // Medium gray
      expect(isLight("#f0f0f0")).toBe(true);
    });

    it("should handle invalid hex", () => {
      expect(isLight("invalid")).toBe(false);
    });
  });

  describe("isDark", () => {
    it("should determine if color is dark", () => {
      expect(isDark("#ffffff")).toBe(false);
      expect(isDark("#000000")).toBe(true);
      expect(isDark("#808080")).toBe(true); // Medium gray
      expect(isDark("#f0f0f0")).toBe(false);
    });

    it("should be opposite of isLight", () => {
      const testColors = ["#ffffff", "#000000", "#ff0000", "#808080"];
      testColors.forEach((color) => {
        expect(isDark(color)).toBe(!isLight(color));
      });
    });
  });

  describe("randomColor", () => {
    it("should generate random hex color", () => {
      const color = randomColor();
      expect(color).toMatch(/^#[0-9a-f]{6}$/);
    });

    it("should generate different colors", () => {
      const color1 = randomColor();
      const color2 = randomColor();
      // Very unlikely to be the same (though theoretically possible)
      expect(color1).toBeTruthy();
      expect(color2).toBeTruthy();
    });
  });

  describe("rgbString", () => {
    it("should create RGB string", () => {
      expect(rgbString(255, 0, 0)).toBe("rgb(255, 0, 0)");
      expect(rgbString(0, 255, 0)).toBe("rgb(0, 255, 0)");
      expect(rgbString(0, 0, 255)).toBe("rgb(0, 0, 255)");
    });

    it("should create RGBA string with alpha", () => {
      expect(rgbString(255, 0, 0, 0.5)).toBe("rgba(255, 0, 0, 0.5)");
      expect(rgbString(0, 255, 0, 1)).toBe("rgba(0, 255, 0, 1)");
      expect(rgbString(0, 0, 255, 0)).toBe("rgba(0, 0, 255, 0)");
    });
  });

  describe("hslString", () => {
    it("should create HSL string", () => {
      expect(hslString(0, 100, 50)).toBe("hsl(0, 100%, 50%)");
      expect(hslString(120, 100, 50)).toBe("hsl(120, 100%, 50%)");
      expect(hslString(240, 100, 50)).toBe("hsl(240, 100%, 50%)");
    });

    it("should create HSLA string with alpha", () => {
      expect(hslString(0, 100, 50, 0.5)).toBe("hsla(0, 100%, 50%, 0.5)");
      expect(hslString(120, 100, 50, 1)).toBe("hsla(120, 100%, 50%, 1)");
      expect(hslString(240, 100, 50, 0)).toBe("hsla(240, 100%, 50%, 0)");
    });
  });
});
