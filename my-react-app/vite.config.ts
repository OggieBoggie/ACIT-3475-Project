import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

// https://vitejs.dev/config/
export default defineConfig({
  root, 
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        testing: resolve(root, 'testing', 'index.html'),
        generate: resolve(root, 'generate', 'index.html'),
        view: resolve(root, 'view', 'index.html'),
        upload: resolve(root, 'upload', 'index.html'),
      },
    },
  },
})
