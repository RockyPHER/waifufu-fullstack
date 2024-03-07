// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
      "@/images/**/*": "./public/images/**/*",
    },
  },
  plugins: [react(), svgr()],
});
