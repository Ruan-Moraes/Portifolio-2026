import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const generateSeoFiles = (siteUrl: string): Plugin => ({
    name: 'generate-seo-files',
    closeBundle() {
        const today = new Date().toISOString().split('T')[0];

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
              <loc>${siteUrl}/</loc>
              <lastmod>${today}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          </urlset>`;

                  // Generate robots.txt
                  const robots = `# Robots.txt para Portfólio

          User-agent: *
          Allow: /

          # Sitemap
          Sitemap: ${siteUrl}/sitemap.xml

          # Bloquear arquivos desnecessários
          Disallow: /api/
          Disallow: /*.json$
          Disallow: /cv/*.md`;

        fs.writeFileSync(path.resolve('dist/sitemap.xml'), sitemap);
        fs.writeFileSync(path.resolve('dist/robots.txt'), robots);

        console.log('Criados sitemap.xml e robots.txt');
    },
});

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

    const siteUrl = env.VITE_SITE_URL || 'https://info.cern.ch/';

    return {
        plugins: [react(), generateSeoFiles(siteUrl)],
    };
});
