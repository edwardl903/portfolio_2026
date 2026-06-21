import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    proxy: {
      '/api-chess': {
        target: 'https://chesslyzer-app-51eb54138df6.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-chess/, ''),
      },
    },
  },
})
