import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    cssCodeSplit: false,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
})
