import { resolve } from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  root: './src',
  // Needed for itch.io
  base: './',
  build: {
    outDir: '../dist',
    cssCodeSplit: false,
    emptyOutDir: true,
    chunkSizeWarningLimit: 2000,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
})
