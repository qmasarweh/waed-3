import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";

/**
 * Strong deploy cache-bust for GitHub Pages / Safari:
 * - Injects a unique build id into index.html every production build
 * - Writes build-id.txt next to the app (fetched with cache: 'no-store')
 * Stale phones can detect a new deploy even when index.html was cached.
 */
export function waedCacheBustPlugin(): Plugin {
  let outDir = "dist";
  let base = "/";
  let buildId = `dev-${Date.now().toString(36)}`;
  let isBuild = false;

  return {
    name: "waed-cache-bust",
    configResolved(config) {
      outDir = config.build.outDir;
      base = config.base || "/";
      isBuild = config.command === "build";
      if (isBuild) {
        buildId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
      }
    },
    transformIndexHtml(html) {
      return html
        .replaceAll("__WAED_BUILD_ID__", buildId)
        .replaceAll("__WAED_BASE__", base.endsWith("/") ? base : `${base}/`);
    },
    closeBundle() {
      if (!isBuild) return;
      const target = path.resolve(outDir, "build-id.txt");
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.writeFileSync(target, `${buildId}\n`, "utf8");
    },
  };
}
