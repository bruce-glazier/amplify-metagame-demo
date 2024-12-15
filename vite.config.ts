import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { expect } from 'vitest';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,  // If you want to use global test utilities (like expect without importing it)
    environment: 'jsdom',  // Set test environment to jsdom
  }
})
