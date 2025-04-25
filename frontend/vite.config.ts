import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
      paraglideVitePlugin({ project: './project.inlang', outdir: './src/paraglide' }),
      solid(),
      tailwindcss()
  ],
  server: {
      port: 3000,
      proxy: {
          "/api": "http://localhost:8000"
      }
  }
})
