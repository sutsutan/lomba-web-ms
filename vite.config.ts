import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';


export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/js/main.tsx',
        'resources/js/index.css',
        'resources/js/app.css',
      ],
      refresh: true,
    }),
    react(),
    wayfinder({
      formVariants: true,
    }),
  ],
})