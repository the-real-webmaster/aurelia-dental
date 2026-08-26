const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const htmlFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith(".html"));

htmlFiles.forEach((file) => {
  let c = fs.readFileSync(path.join(ROOT, file), "utf8");
  let n = c;

  if (!n.includes("js/demo-banner.js")) {
    n = n.replace(
      '<script src="js/data.js" defer></script>\n<script src="js/scroll-lock.js"',
      '<script src="js/data.js" defer></script>\n<script src="js/demo-banner.js" defer></script>\n<script src="js/scroll-lock.js"'
    );
  }

  if (!n.includes('preconnect" href="https://cdn.jsdelivr.net"')) {
    n = n.replace(
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link href="https://fonts.googleapis.com',
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n  <link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>\n  <link href="https://fonts.googleapis.com'
    );
  }

  if (!n.includes('class="footer__demo"')) {
    n = n.replace(
      '    <div class="footer__bottom">\n      <p>©',
      '    <div class="footer__bottom">\n      <p class="footer__demo">Демо-проект — пример сайта для стоматологии. <a href="https://github.com/the-real-webmaster" target="_blank" rel="noopener noreferrer">Связаться с автором</a></p>\n      <p>©'
    );
  }

  n = n.replace(
    /(<div class="ba__layer ba__layer--before">\s*<img src=")assets\/images\/ba-case\.jpg"/,
    '$1assets/images/result-before.jpg"'
  );
  n = n.replace(
    /(<div class="ba__layer ba__after">\s*<img src=")assets\/images\/ba-case\.jpg"/,
    '$1assets/images/result-after.jpg"'
  );

  if (n !== c) fs.writeFileSync(path.join(ROOT, file), n);
});

console.log("Patched", htmlFiles.length, "HTML files");
