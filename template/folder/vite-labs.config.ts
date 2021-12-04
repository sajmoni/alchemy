import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    target: 'es2020',
    cssCodeSplit: false,
  },
  root: './src/labs',
  publicDir: '../public',
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
})
