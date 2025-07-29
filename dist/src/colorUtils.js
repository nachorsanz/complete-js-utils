"use strict";
/**
 * Color utility functions
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hslString = exports.rgbString = exports.randomColor = exports.isDark = exports.isLight = exports.getContrast = exports.monochromatic = exports.tetradic = exports.triadic = exports.analogous = exports.complement = exports.desaturate = exports.saturate = exports.darken = exports.lighten = exports.hsvToRgb = exports.rgbToHsv = exports.hslToRgb = exports.rgbToHsl = exports.rgbToHex = exports.hexToRgb = void 0;
const hexToRgb = (hex) => {
    // Handle 6-digit hex
    const longResult = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (longResult) {
        return {
            r: parseInt(longResult[1], 16),
            g: parseInt(longResult[2], 16),
            b: parseInt(longResult[3], 16),
        };
    }
    // Handle 3-digit hex
    const shortResult = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
    if (shortResult) {
        return {
            r: parseInt(shortResult[1] + shortResult[1], 16),
            g: parseInt(shortResult[2] + shortResult[2], 16),
            b: parseInt(shortResult[3] + shortResult[3], 16),
        };
    }
    return null;
};
exports.hexToRgb = hexToRgb;
const rgbToHex = (r, g, b) => {
    const toHex = (n) => {
        const clamped = Math.max(0, Math.min(255, Math.round(n)));
        const hex = clamped.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
exports.rgbToHex = rgbToHex;
const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s;
    const l = (max + min) / 2;
    if (max === min) {
        h = s = 0; // achromatic
    }
    else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                h = 0;
        }
        h /= 6;
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    };
};
exports.rgbToHsl = rgbToHsl;
const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    const hue2rgb = (p, q, t) => {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255),
    };
};
exports.hslToRgb = hslToRgb;
const rgbToHsv = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const diff = max - min;
    let h;
    const s = max === 0 ? 0 : diff / max;
    const v = max;
    if (diff === 0) {
        h = 0;
    }
    else {
        switch (max) {
            case r:
                h = ((g - b) / diff + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / diff + 2) / 6;
                break;
            case b:
                h = ((r - g) / diff + 4) / 6;
                break;
            default:
                h = 0;
        }
    }
    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100),
    };
};
exports.rgbToHsv = rgbToHsv;
const hsvToRgb = (h, s, v) => {
    h /= 360;
    s /= 100;
    v /= 100;
    const c = v * s;
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
    const m = v - c;
    let r, g, b;
    if (h < 1 / 6) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h < 2 / 6) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h < 3 / 6) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h < 4 / 6) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h < 5 / 6) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }
    return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
    };
};
exports.hsvToRgb = hsvToRgb;
const lighten = (hex, amount) => {
    const rgb = (0, exports.hexToRgb)(hex);
    if (!rgb)
        return hex;
    const hsl = (0, exports.rgbToHsl)(rgb.r, rgb.g, rgb.b);
    hsl.l = Math.min(100, hsl.l + amount);
    const newRgb = (0, exports.hslToRgb)(hsl.h, hsl.s, hsl.l);
    return (0, exports.rgbToHex)(newRgb.r, newRgb.g, newRgb.b);
};
exports.lighten = lighten;
const darken = (hex, amount) => {
    const rgb = (0, exports.hexToRgb)(hex);
    if (!rgb)
        return hex;
    const hsl = (0, exports.rgbToHsl)(rgb.r, rgb.g, rgb.b);
    hsl.l = Math.max(0, hsl.l - amount);
    const newRgb = (0, exports.hslToRgb)(hsl.h, hsl.s, hsl.l);
    return (0, exports.rgbToHex)(newRgb.r, newRgb.g, newRgb.b);
};
exports.darken = darken;
const saturate = (hex, amount) => {
    const rgb = (0, exports.hexToRgb)(hex);
    if (!rgb)
        return hex;
    const hsl = (0, exports.rgbToHsl)(rgb.r, rgb.g, rgb.b);
    hsl.s = Math.min(100, hsl.s + amount);
    const newRgb = (0, exports.hslToRgb)(hsl.h, hsl.s, hsl.l);
    return (0, exports.rgbToHex)(newRgb.r, newRgb.g, newRgb.b);
};
exports.saturate = saturate;
const desaturate = (hex, amount) => {
    const rgb = (0, exports.hexToRgb)(hex);
    if (!rgb)
        return hex;
    const hsl = (0, exports.rgbToHsl)(rgb.r, rgb.g, rgb.b);
    hsl.s = Math.max(0, hsl.s - amount);
    const newRgb = (0, exports.hslToRgb)(hsl.h, hsl.s, hsl.l);
    return (0, exports.rgbToHex)(newRgb.r, newRgb.g, newRgb.b);
};
exports.desaturate = desaturate;
const complement = (hex) => {
    const rgb = (0, exports.hexToRgb)(hex);
    if (!rgb)
        return hex;
    const hsl = (0, exports.rgbToHsl)(rgb.r, rgb.g, rgb.b);
    hsl.h = (hsl.h + 180) % 360;
    const newRgb = (0, exports.hslToRgb)(hsl.h, hsl.s, hsl.l);
    return (0, exports.rgbToHex)(newRgb.r, newRgb.g, newRgb.b);
};
exports.complement = complement;
const analogous = (hex, angle = 30) => {
    const rgb = (0, exports.hexToRgb)(hex);
    if (!rgb)
        return [hex];
    const hsl = (0, exports.rgbToHsl)(rgb.r, rgb.g, rgb.b);
    const color1 = (0, exports.hslToRgb)((hsl.h + angle) % 360, hsl.s, hsl.l);
    const color2 = (0, exports.hslToRgb)((hsl.h - angle + 360) % 360, hsl.s, hsl.l);
    const colors = [hex, (0, exports.rgbToHex)(color1.r, color1.g, color1.b), (0, exports.rgbToHex)(color2.r, color2.g, color2.b)];
    return colors;
};
exports.analogous = analogous;
const triadic = (hex) => {
    const rgb = (0, exports.hexToRgb)(hex);
    if (!rgb)
        return [hex];
    const hsl = (0, exports.rgbToHsl)(rgb.r, rgb.g, rgb.b);
    const color1 = (0, exports.hslToRgb)((hsl.h + 120) % 360, hsl.s, hsl.l);
    const color2 = (0, exports.hslToRgb)((hsl.h + 240) % 360, hsl.s, hsl.l);
    const colors = [hex, (0, exports.rgbToHex)(color1.r, color1.g, color1.b), (0, exports.rgbToHex)(color2.r, color2.g, color2.b)];
    return colors;
};
exports.triadic = triadic;
const tetradic = (hex) => {
    const rgb = (0, exports.hexToRgb)(hex);
    if (!rgb)
        return [hex];
    const hsl = (0, exports.rgbToHsl)(rgb.r, rgb.g, rgb.b);
    const color1 = (0, exports.hslToRgb)((hsl.h + 90) % 360, hsl.s, hsl.l);
    const color2 = (0, exports.hslToRgb)((hsl.h + 180) % 360, hsl.s, hsl.l);
    const color3 = (0, exports.hslToRgb)((hsl.h + 270) % 360, hsl.s, hsl.l);
    const colors = [
        hex,
        (0, exports.rgbToHex)(color1.r, color1.g, color1.b),
        (0, exports.rgbToHex)(color2.r, color2.g, color2.b),
        (0, exports.rgbToHex)(color3.r, color3.g, color3.b),
    ];
    return colors;
};
exports.tetradic = tetradic;
const monochromatic = (hex, steps = 5) => {
    const rgb = (0, exports.hexToRgb)(hex);
    if (!rgb)
        return [hex];
    const hsl = (0, exports.rgbToHsl)(rgb.r, rgb.g, rgb.b);
    const colors = [];
    for (let i = 0; i < steps; i++) {
        const lightness = Math.max(0, Math.min(100, hsl.l + (i - Math.floor(steps / 2)) * 20));
        const newRgb = (0, exports.hslToRgb)(hsl.h, hsl.s, lightness);
        colors.push((0, exports.rgbToHex)(newRgb.r, newRgb.g, newRgb.b));
    }
    return colors;
};
exports.monochromatic = monochromatic;
const getContrast = (hex1, hex2) => {
    const getLuminance = (hex) => {
        const rgb = (0, exports.hexToRgb)(hex);
        if (!rgb)
            return 0;
        const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
            c /= 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
};
exports.getContrast = getContrast;
const isLight = (hex) => {
    const rgb = (0, exports.hexToRgb)(hex);
    if (!rgb)
        return false;
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128;
};
exports.isLight = isLight;
const isDark = (hex) => {
    return !(0, exports.isLight)(hex);
};
exports.isDark = isDark;
const randomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return (0, exports.rgbToHex)(r, g, b);
};
exports.randomColor = randomColor;
const rgbString = (r, g, b, a) => {
    if (a !== undefined) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
};
exports.rgbString = rgbString;
const hslString = (h, s, l, a) => {
    if (a !== undefined) {
        return `hsla(${h}, ${s}%, ${l}%, ${a})`;
    }
    return `hsl(${h}, ${s}%, ${l}%)`;
};
exports.hslString = hslString;
