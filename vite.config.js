import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/open\.er-api\.com\/.*/i,
            handler: 'NetworkFirst', // প্রথমে নেটওয়ার্ক দেখবে, না থাকলে ক্যাশ থেকে কারেন্সি দেখাবে
            options: { cacheName: 'currency-cache' }
          }
        ]
      },
      manifest: {
        name: 'Calculator Pro',
        short_name: 'CalcPro',
        theme_color: '#121212',
        background_color: '#121212',
        display: 'standalone',
        orientation: 'portrait'
      }
    })
  ]
})
