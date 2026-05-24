import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  base: '/',
  build: {
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
