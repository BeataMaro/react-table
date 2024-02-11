/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig  } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";


// https://vitejs.dev/config/
export default defineConfig(() => {

  return {
    plugins: [svgr(), react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      css: true,
      coverage: {
        provider: 'c8',
        all: true,
        reporter: 'text',
        exclude: [
          '**/node_modules/**',
          '**/dist/**',
          '**/models/**',
          'src/main.tsx',
        ],
      },
    },
  }
})
