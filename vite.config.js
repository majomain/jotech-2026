import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { defineConfig } from 'vite';
import { caseStudies } from './src/data/caseStudies.js';
import { getCaseStudyShareMeta, homeShareMeta } from './src/data/shareMeta.js';
import { injectShareMetaHtml } from './scripts/injectShareMetaHtml.js';

function writeHtml(filePath, html) {
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

/**
 * Emits crawlable HTML for the homepage and each case study route so social
 * crawlers (Google Docs, Slack, etc.) get correct OG tags without running JS.
 */
function socialPrerender() {
  return {
    name: 'social-prerender',
    closeBundle() {
      const outDir = join(process.cwd(), 'dist');
      const template = readFileSync(join(outDir, 'index.html'), 'utf8');

      // Ensure homepage meta is authoritative after Vite's HTML transform.
      writeHtml(join(outDir, 'index.html'), injectShareMetaHtml(template, homeShareMeta));
      // Cloudflare SPA / Pages 404 fallback.
      copyFileSync(join(outDir, 'index.html'), join(outDir, '404.html'));

      for (const study of caseStudies) {
        const meta = getCaseStudyShareMeta(study);
        const html = injectShareMetaHtml(template, meta);
        const slugDir = join(outDir, 'work', study.slug);
        writeHtml(join(slugDir, 'index.html'), html);
      }
    },
  };
}

export default defineConfig({
  plugins: [socialPrerender()],
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
