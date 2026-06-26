import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "src"),
      "@assets": path.resolve(rootDir, "attached_assets")
    },
    dedupe: ["react", "react-dom"]
  },
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  server: {
    port: 5173,
    strictPort: false,
    host: "0.0.0.0"
  },
  preview: {
    port: 4173,
    host: "0.0.0.0"
  }
});
