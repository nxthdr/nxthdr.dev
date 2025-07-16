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
      // Proxy API requests to avoid CORS issues
      '/api': {
        target: 'http://0.0.0.0:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
