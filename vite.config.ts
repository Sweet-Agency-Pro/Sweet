import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      png: { quality: 85 },
      jpeg: { quality: 85 },
      webp: { quality: 85 },
    }),
  ],
  root: './',
  // Allow Vite to pre-bundle `lucide-react` so icons are served from
  // the vendor bundle instead of individual files like
  // /node_modules/lucide-react/dist/esm/icons/fingerprint.js which some
  // ad/privacy extensions block (net::ERR_BLOCKED_BY_CLIENT).
});
