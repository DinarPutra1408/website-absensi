import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import { envField } from 'astro/config'; // Impor resmi Astro Env
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro'; // Impor fitur PWA

export default defineConfig({
  output: 'server',
  adapter: vercel(),

  server: {
    headers: {
      "Content-Security-Policy": "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob: 'unsafe-inline';"
    }
  },

  // Taruh di astro.config.mjs kamu
  integrations: [
    AstroPWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true // <-- TAMBAHKAN BARIS INI BIAR DI LOKAL GA 404 LAGI!
      },
      manifest: {
        name: 'MM Tandes Barat',
        short_name: 'MM Tandes',
        description: 'Sistem Manajemen Muda Mudi Desa Tandes Barat',
        theme_color: '#090d16', 
        background_color: '#090d16',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  
  // FIX DI SINI: 'env' ditaruh di root utama, BUKAN di dalam 'experimental' lagi!
  env: {
    schema: {
      SECRET_SHEETS_API_URL: envField.string({
        context: 'server',
        access: 'secret',
        optional: true
      }),
      PUBLIC_SECRET_SHEETS_API_URL: envField.string({
        context: 'client', 
        access: 'public',  
        optional: true
      }),
    }
  },

  vite: {
    plugins: [tailwindcss()]
  }
});