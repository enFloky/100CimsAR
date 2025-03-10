import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/100CimsAR/",
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
    exclude: ["three"], // 📌 Evita càrrega doble de Three.js
  },
  resolve: {
    alias: {
      three: "three" // 📌 Força totes les llibreries a utilitzar la mateixa versió de Three.js
    }
  }
});
