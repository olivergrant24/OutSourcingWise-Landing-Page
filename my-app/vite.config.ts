import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
  },
  build: {
    assetsInlineLimit: 500000,
    sourcemap: false,
    rollupOptions: {
      output: {
        assetFileNames: "assets/[hash][extname]",
        chunkFileNames: "assets/[hash].js",
        entryFileNames: "assets/[hash].js",
      },
    },
  },
});
