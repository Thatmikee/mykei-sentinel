import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("/react/") ||
              id.includes("/react-dom/") ||
              id.includes("/react-router")
            ) {
              return "react-vendor";
            }
            if (id.includes("framer-motion")) {
              return "framer";
            }
            if (id.includes("@tanstack")) {
              return "query";
            }
            if (id.includes("@radix-ui")) {
              return "ui";
            }
            if (
              id.includes("jspdf") ||
              id.includes("html2canvas") ||
              id.includes("dompurify")
            ) {
              return "pdf";
            }
          }
        },
      },
    },
  },
});
