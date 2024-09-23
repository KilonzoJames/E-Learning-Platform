import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      // Redirect requests made to `/api` to the backend API
      '/api': {
        target: 'https://e-learning-platform-1-10z1.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Optional: remove `/api` prefix
      },
    }, // Make sure this comma is here
  },
  plugins: [react()], // Ensure correct placement here
});

