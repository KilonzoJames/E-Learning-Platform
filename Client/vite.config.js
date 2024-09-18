import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://e-learning-platform-1-10z1.onrender.com'
    }
  },
  plugins: [react()],
})
