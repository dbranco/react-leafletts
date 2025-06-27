// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@react-leafletts": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactLeafletts",
      formats: ["es", "cjs"],
      fileName: (format) => `react-leafletts.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "leaflet"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          leaflet: "L",
        },
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    alias: {
      "@react-leafletts": path.resolve(__dirname, "./src"),
    },
    coverage: {
      reporter: ["text", "html"],
    },
  },
  server: {
    fs: {
      allow: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "test/e2e/test-app"),
      ],
    },
  },
});
