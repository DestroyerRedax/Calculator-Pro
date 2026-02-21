import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false // আপাতত আইকন জনিত এরর এড়াতে এটি false রাখুন, বিল্ড হয়ে যাবে।
    })
  ],
  build: {
    outDir: 'dist',
  }
})
