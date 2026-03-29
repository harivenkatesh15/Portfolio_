import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Portfolio_/',  // exact repo name on GitHub
  plugins: [react()],
})