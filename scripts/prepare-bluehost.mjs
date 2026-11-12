import { writeFileSync, existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "..", "bluehost");
const indexPath = join(root, "index.html");

if (!existsSync(indexPath)) {
  console.error("bluehost/index.html missing — run build:bluehost first");
  process.exit(1);
}

const html = readFileSync(indexPath, "utf8");
const issues = [];

const requiredFiles = [
  "send-enquiry.php",
  ".htaccess",
  "robots.txt",
  "sitemap.xml",
  "build-id.txt",
  "img/hero-facility.jpg",
  "img/hero-facility-mobile.jpg",
  "img/hero-redesign/slide-01.jpg",
  "img/hero-redesign/slide-01-phone.jpg",
  "img/hero-redesign/slide-01-portrait.jpg",
  "img/hero-redesign/slide-02.jpg",
  "img/hero-redesign/slide-02-phone.jpg",
  "img/hero-redesign/slide-02-portrait.jpg",
  "img/hero-redesign/slide-03.jpg",
  "img/hero-redesign/slide-03-phone.jpg",
  "img/hero-redesign/slide-03-portrait.jpg",
  "img/hero-redesign/slide-04.jpg",
  "img/hero-redesign/slide-04-phone.jpg",
  "img/hero-redesign/slide-04-portrait.jpg",
  "img/hero-redesign/waed-hero-lockup.png",
  "img/enaya/logo.jpg",
  "img/leen-x/logo.svg",
  "video/waed-intro.mp4",
  "video/waed-intro-mobile.mp4",
];

for (const rel of requiredFiles) {
  if (!existsSync(join(root, ...rel.split("/")))) {
    issues.push(`missing ${rel}`);
  }
}

if (!html.includes('src="/assets/')) {
  issues.push("index.html must load scripts from /assets/ (root base)");
}
if (/waed-industrial-(site|website)/.test(html)) {
  issues.push("index.html still contains a GitHub Pages base path");
}
if (!/var BASE = "\/"/.test(html)) {
  issues.push('cache-bust BASE must be "/" for Bluehost');
}
if (!/var BUILD = "[A-Za-z0-9._-]+"/.test(html)) {
  issues.push("valid BUILD id missing from index.html");
}
if (!html.includes("waed-build-id:")) {
  issues.push("namespaced Safari cache-bust key missing");
}
if (!html.includes('name="description"') || !html.includes("<title>")) {
  issues.push("SEO title/description missing");
}

const assetsDir = join(root, "assets");
const assetFiles = existsSync(assetsDir) ? readdirSync(assetsDir) : [];
const jsBundles = assetFiles.filter((f) => /^index-.*\.js$/.test(f));
const cssBundles = assetFiles.filter((f) => /^index-.*\.css$/.test(f));
if (jsBundles.length !== 1) issues.push(`expected 1 JS bundle, found ${jsBundles.length}`);
if (cssBundles.length !== 1) issues.push(`expected 1 CSS bundle, found ${cssBundles.length}`);

if (jsBundles.length === 1) {
  const js = readFileSync(join(assetsDir, jsBundles[0]), "utf8");
  if (!js.includes("send-enquiry.php")) issues.push("enquiry endpoint missing from JS bundle");
  if (!js.includes("maxTouchPoints")) issues.push("iPhone/touch intro-skip missing from JS bundle");
}

writeFileSync(
  join(root, "404.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>WAED Industrial</title>
    <script>
      sessionStorage.redirect = location.href;
      location.replace("/");
    </script>
  </head>
  <body></body>
</html>
`,
);

writeFileSync(
  join(root, "UPLOAD-README.txt"),
  `WAED Industrial — Bluehost upload package
========================================

THIS is the client production package for waediic.com.

Upload EVERYTHING inside this bluehost folder into public_html
(or the domain document root). Do not nest it inside another folder.
Do not upload the site/ source folder.

Required layout after upload:
  public_html/index.html
  public_html/send-enquiry.php
  public_html/.htaccess
  public_html/robots.txt
  public_html/sitemap.xml
  public_html/build-id.txt
  public_html/assets/
  public_html/img/
  public_html/video/

Enquiry form:
  Contact form POSTs to /send-enquiry.php
  Mail goes to info@waediic.com via PHP mail()
  From / envelope sender: info@waediic.com (must exist as a mailbox)

After upload checklist:
  1. PHP 7.4+ (8.x preferred)
  2. info@waediic.com mailbox exists
  3. Test contact form (check inbox + spam once)
  4. Open /brands and /brands/leen-x (SPA routing via .htaccess)
  5. Open on an iPhone in a Private tab (intro is skipped on phones)
  6. Confirm /robots.txt and /sitemap.xml

Safari/iPhone note:
  Phones skip the intro video splash so they never get stuck on a navy screen.
  build-id.txt + cache-bust in index.html force stale Safari shells to refresh.
`,
);

if (issues.length) {
  console.error("Bluehost package issues:\n- " + issues.join("\n- "));
  process.exit(1);
}

console.log("Bluehost package verified at", root);
console.log("JS:", jsBundles[0]);
console.log("CSS:", cssBundles[0]);
