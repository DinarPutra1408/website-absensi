import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import { envField } from 'astro/config'; // Impor resmi Astro Env

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'server',
  adapter: vercel(),

  server: {
    headers: {
      "Content-Security-Policy": "default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline' 'unsafe-eval'; img-src * data: blob: 'unsafe-inline';"
    }
  },

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