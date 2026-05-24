import { defineConfig } from 'vite';

export default defineConfig({
  base: '/jotech-2026/',
  build: {
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
