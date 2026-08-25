import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const base = process.env.VITE_BASE_PATH ?? '/workshop-code/'

export default defineConfig({
  base,
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    tanstackStart({
      router: { basepath: base.replace(/^\/|\/$/g, '') },
      spa: { enabled: true },
      prerender: { enabled: true, crawlLinks: true, failOnError: true, concurrency: 4 },
    }),
    viteReact(),
  ],
})
