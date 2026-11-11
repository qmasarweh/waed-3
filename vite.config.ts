import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { waedCacheBustPlugin } from "./vite.cacheBustPlugin";

export default defineConfig(({ mode }) => {
  // Load .env.[mode] into config (needed so bluehost mode picks up VITE_BASE=/)
  const env = loadEnv(mode, process.cwd(), "");
  const base = env.VITE_BASE || process.env.VITE_BASE || "/waed-industrial-site/";

  return {
    // GitHub Pages: /waed-industrial-site/ | Bluehost public_html: /
    base,
    plugins: [react(), waedCacheBustPlugin()],
    server: {
      port: 5173,
      host: true,
      // Cloudflare quick tunnels rotate hostnames
      allowedHosts: [".trycloudflare.com", "localhost", "127.0.0.1"],
      watch: {
        // Large mp4s / temp upscaler files lock on Windows and crash the watcher (EBUSY)
        ignored: ["**/public/video/**", "**/tmp-upscale/**"],
      },
    },
    build: { assetsInlineLimit: 0 },
  };
});
