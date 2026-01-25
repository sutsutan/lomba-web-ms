import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import path from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/js/main.tsx', // ← CUMA INI DOANG!
      ],
      refresh: true,
    }),
    react(),
    wayfinder({
      formVariants: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
    },
  },
})