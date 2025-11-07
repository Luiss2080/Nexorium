import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: false,
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost/Nexorium/system",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/Nexorium/system": {
        target: "http://localhost",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "@components": resolve(__dirname, "src/components"),
      "@pages": resolve(__dirname, "src/pages"),
      "@layouts": resolve(__dirname, "src/layouts"),
      "@assets": resolve(__dirname, "src/assets"),
      "@styles": resolve(__dirname, "src/assets/styles"),
      "@utils": resolve(__dirname, "src/utils"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@context": resolve(__dirname, "src/context"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  base: "/",
});
