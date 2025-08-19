import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: 'all',
    disableHostCheck: true,
    // This allows all hosts including ngrok domains
    // Alternative: you can specify your ngrok domain specifically
    // allowedHosts: ['201e9bcfebae.ngrok-free.app', 'localhost']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  base: './',
})