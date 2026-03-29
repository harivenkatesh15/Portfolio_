import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',  // exact repo name on GitHub
  plugins: [react()],
})