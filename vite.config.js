import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/100CimsAR/', // Base del repositori GitHub Pages
});
