import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './src',
  // Needed for itch.io
  base: './',
  build: {
    outDir: '../dist',
    cssCodeSplit: false,
    emptyOutDir: true,
    rollupOptions: {
      // These aren't used in production
      external: ['nano-panel', 'react-dom', 'react'],
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
})
