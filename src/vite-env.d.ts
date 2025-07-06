import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8080, // or 5173, if that's what you're using
    allowedHosts: ['.ngrok-free.app'], // Allow all ngrok domains
  },
})
