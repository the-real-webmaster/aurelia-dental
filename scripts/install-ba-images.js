/**
 * Installs before/after slider images as optimized WebP.
 * Run: node scripts/install-ba-images.js
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const SRC = path.join(
  process.env.USERPROFILE || "",
  ".cursor",
  "projects",
  "c-Users-user-Desktop-stam-SITE-1",
  "assets"
);
const OUT = path.join(__dirname, "..", "assets", "images");

const sources = [
  ["ba-before.png", "before-after-before.webp"],
  ["ba-after.png", "before-after-after.webp"],
];

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

function installPair(srcName, destName) {
  const src = path.join(SRC, srcName);
  const dest = path.join(OUT, destName);
  if (!fs.existsSync(src)) return false;

  try {
    execSync(
      `npx --yes sharp-cli -i "${src}" -o "${dest}" -f webp -q 85`,
      { stdio: "pipe", cwd: path.join(__dirname, "..") }
    );
  } catch {
    fs.copyFileSync(src, dest.replace(".webp", ".png"));
    fs.copyFileSync(src, dest);
  }

  if (!fs.existsSync(dest)) return false;
  console.log("✓", destName, "(" + Math.round(fs.statSync(dest).size / 1024) + " KB)");
  return true;
}

let ok = true;
for (const [src, dest] of sources) {
  if (!installPair(src, dest)) ok = false;
}

if (!ok) {
  console.error("Missing source images in", SRC);
  process.exit(1);
}

console.log("Before/after WebP images installed.");
