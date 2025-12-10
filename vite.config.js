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
      "/yakoa": {
        target: "https://docs-demo.ip-api-sandbox.yakoa.io",
        changeOrigin: true,
        secure: false,
        rewrite: (p) => p.replace(/^\/yakoa/, ""),
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            // Forward API key header
            if (req.headers["x-api-key"]) {
              proxyReq.setHeader("x-api-key", req.headers["x-api-key"]);
            }
          });
        }
      }
    },
  },
})




