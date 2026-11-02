import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Domain root, so a Bluehost upload into public_html loads assets correctly.
  base: "/",
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    // Cloudflare quick tunnels rotate hostnames
    allowedHosts: [".trycloudflare.com", "localhost", "127.0.0.1"],
    watch: {
      // Large mp4s lock on Windows and crash the watcher (EBUSY)
      ignored: ["**/public/video/**"],
    },
  },
  build: { assetsInlineLimit: 0 },
});
