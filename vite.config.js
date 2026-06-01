import { copyFileSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    {
      name: 'spa-fallback',
      closeBundle() {
        const outDir = join(process.cwd(), 'dist');
        copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'));
      },
    },
  ],
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
