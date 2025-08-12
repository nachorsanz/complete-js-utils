// Post-build fix for ESM: rename ESM JS files to .mjs and rewrite relative imports/exports
// This avoids Node's MODULE_TYPELESS_PACKAGE_JSON warning without setting "type":"module".
const fs = require("fs");
const path = require("path");

const esmDir = path.join(__dirname, "..", "dist", "esm");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    if (d.isDirectory()) return walk(p);
    return [p];
  });
}

function rewriteRelativeSpecifiers(code) {
  // Replace import/export specifiers for relative paths to use .mjs
  // Matches: import ... from "./x" | "./x.js" and export ... from "./x"
  return code
    .replace(/((?:import|export)\s[^;]*?from\s+["'])(\.\.\/.+?|\.\/.+?)(["'])/g, (m, p1, spec, p3) => {
      if (!spec.startsWith("./") && !spec.startsWith("../")) return m;
      if (spec.endsWith(".mjs")) return m;
      if (spec.endsWith(".js")) return p1 + spec.slice(0, -3) + ".mjs" + p3;
      return p1 + spec + ".mjs" + p3;
    })
    .replace(/(import\s*\(\s*["'])(\.\.\/.+?|\.\/.+?)(["']\s*\))/g, (m, p1, spec, p3) => {
      if (!spec.startsWith("./") && !spec.startsWith("../")) return m;
      if (spec.endsWith(".mjs")) return m;
      if (spec.endsWith(".js")) return p1 + spec.slice(0, -3) + ".mjs" + p3;
      return p1 + spec + ".mjs" + p3;
    });
}

try {
  const files = walk(esmDir).filter((f) => f.endsWith(".js"));
  // First, rewrite contents to use .mjs specifiers
  for (const file of files) {
    const code = fs.readFileSync(file, "utf8");
    const out = rewriteRelativeSpecifiers(code);
    if (out !== code) fs.writeFileSync(file, out, "utf8");
  }
  // Then, rename .js -> .mjs
  for (const file of files.sort((a, b) => b.length - a.length)) {
    const target = file.slice(0, -3) + ".mjs";
    fs.renameSync(file, target);
  }
  console.log("ESM: renamed .js to .mjs and fixed relative specifiers");
} catch (e) {
  console.error("fix-esm-extensions failed:", e.stack || e.message);
  process.exit(1);
}
