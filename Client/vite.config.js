import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    proxy: {
      // Redirect requests to the backend API without the `/api` prefix
      '/api': {
        target: 'https://e-learning-platform-1-10z1.onrender.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Remove `/api` prefix
      },
    },
  },
  plugins: [react()], 
  build: {
    rollupOptions: {
      external: ["core-js-pure"],
    },
  },
});
