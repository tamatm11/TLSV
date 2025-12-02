/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // Thêm đoạn này để fix cảnh báo vàng
  build: {
    chunkSizeWarningLimit: 1000, // Tăng giới hạn cảnh báo lên 1000kb (1MB)
  },
});
