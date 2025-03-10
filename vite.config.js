import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/100CimsAR/", // 👈 ESSENCIAL per GitHub Pages
  build: {
    outDir: "dist", // 👈 Assegura que la build es genera dins dist/
  },
});
