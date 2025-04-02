import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://3-14-252-137:5000',
        changeOrigin: true,
      }
    }
  },
  plugins: [react()]
})
