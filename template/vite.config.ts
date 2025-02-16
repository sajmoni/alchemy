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
    // Fix for issue when building with rollup
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  resolve: {
    alias: {
      '~': resolve(import.meta.dirname, 'src'),
    },
  },
})
