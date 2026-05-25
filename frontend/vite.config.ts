import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    wayfinder({
  formVariants: true,
} as any),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  root: './',
  build: {
    outDir: 'dist',
  }
});