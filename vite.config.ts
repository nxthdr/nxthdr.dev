import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      // Proxy ClickHouse requests to avoid CORS issues (must come first - more specific)
      '/api/query': {
        target: 'https://clickhouse.nxthdr.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/query/, ''),
        secure: true
      },
      // Proxy Peerlab API requests
      '/api/peerlab': {
        target: 'http://0.0.0.0:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/peerlab/, '/api'),
        secure: false
      },
      // Proxy Saimiris API requests
      '/api/saimiris': {
        target: 'http://0.0.0.0:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/saimiris/, '/api'),
        secure: false
      }
    }
  }
})
