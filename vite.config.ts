import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  return {
    plugins: [
      tailwindcss(),
      react(), 
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['clinova_logo.jpg'],
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg}'],
          navigateFallback: '/index.html',
          maximumFileSizeToCacheInBytes: 8 * 1024 * 1024
        },
        manifest: {
          name: 'Clinova OS',
          short_name: 'Clinova',
          description: 'Clinical Intelligence System',
          theme_color: '#0E0E10',
          background_color: '#0E0E10',
          display: 'standalone',
          icons: [
            {
              src: 'clinova_logo.jpg',
              sizes: '192x192 512x512 1024x1024',
              type: 'image/jpeg',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'dist',
      rollupOptions: {
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return;
          warn(warning);
        }
      }
    }
  };
});
