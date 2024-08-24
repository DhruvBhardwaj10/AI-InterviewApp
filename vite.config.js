import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    commonjs(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  optimizeDeps: {
    include: ['regenerator-runtime']
  },
});
