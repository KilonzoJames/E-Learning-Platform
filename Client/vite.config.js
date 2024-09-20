import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      // Redirect requests made to `/api` to the backend API
      '/api': {
        target: 'http://127.0.0.1:5555',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Optional: remove `/api` prefix
      }
    }
  },
  plugins: [react()],
})
