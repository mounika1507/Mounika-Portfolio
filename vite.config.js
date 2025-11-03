import { defineConfig } from 'vite'

// Proxy API requests to the backend during development
export default defineConfig({
  base: '/', // Netlify works with root path
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:7777',
        changeOrigin: true,
        secure: false,
      },
      '/faqs': {
        target: 'http://localhost:7777',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
