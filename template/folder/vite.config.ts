import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './src',
  build: {
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
})
