import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',
  // Allow Vite to pre-bundle `lucide-react` so icons are served from
  // the vendor bundle instead of individual files like
  // /node_modules/lucide-react/dist/esm/icons/fingerprint.js which some
  // ad/privacy extensions block (net::ERR_BLOCKED_BY_CLIENT).
});
