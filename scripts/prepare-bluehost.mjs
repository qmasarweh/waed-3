import { copyFileSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(process.cwd(), "..", "bluehost");
const indexPath = join(root, "index.html");

if (!existsSync(indexPath)) {
  console.error("bluehost/index.html missing — run build:bluehost first");
  process.exit(1);
}

const html = readFileSync(indexPath, "utf8");
const issues = [];

if (!html.includes('src="/assets/') && !html.includes("src=\"/assets/")) {
  // Vite may emit absolute /assets with base /
  if (!html.includes("/assets/")) {
    issues.push("index.html does not reference /assets/ scripts");
  }
}

if (!existsSync(join(root, "send-enquiry.php"))) {
  issues.push("send-enquiry.php missing from bluehost package");
}
if (!existsSync(join(root, ".htaccess"))) {
  issues.push(".htaccess missing from bluehost package");
}
if (!existsSync(join(root, "robots.txt"))) {
  issues.push("robots.txt missing");
}
if (!existsSync(join(root, "sitemap.xml"))) {
  issues.push("sitemap.xml missing");
}
if (!existsSync(join(root, "img", "hero-facility.jpg"))) {
  issues.push("hero image missing (Open Graph asset)");
}

writeFileSync(
  join(root, "404.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>WAED Industrial</title>
    <script>sessionStorage.redirect = location.href;</script>
    <meta http-equiv="refresh" content="0;URL='/'" />
  </head>
  <body></body>
</html>
`,
);

writeFileSync(
  join(root, "UPLOAD-README.txt"),
  `WAED Industrial — Bluehost upload package
========================================

Upload EVERYTHING inside this bluehost folder into public_html
(or the domain document root). Do not nest it inside another folder.

Required layout after upload:
  public_html/index.html
  public_html/send-enquiry.php
  public_html/.htaccess
  public_html/robots.txt
  public_html/sitemap.xml
  public_html/assets/
  public_html/img/
  public_html/video/
  public_html/fonts/   (if present)

Enquiry form:
  The contact form POSTs to /send-enquiry.php
  Mail is sent to info@waediic.com using PHP mail()
  From / envelope sender: info@waediic.com (must be a mailbox on the domain)

Bluehost checks after upload:
  1. PHP version 7.4 or newer (8.x preferred)
  2. Ensure info@waediic.com exists as an email account
  3. Test the contact form and confirm inbox delivery (and spam folder once)
  4. Visit /brands and /brands/leen-x to confirm SPA routing via .htaccess
  5. Confirm https://waediic.com/robots.txt and /sitemap.xml load

Do not upload the site/ source folder — only this built package.
`,
);

if (issues.length) {
  console.error("Bluehost package issues:\n- " + issues.join("\n- "));
  process.exit(1);
}

console.log("Bluehost package verified at", root);
