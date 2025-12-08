import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: {
    postcss: {},
  },
  server: {
    proxy: {
      '/api/sign': {
        target: 'https://sentrymark-c2pa.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/api/validate': {
        target: 'https://sentrymark-c2pa.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/api/health': {
        target: 'https://sentrymark-c2pa.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})




