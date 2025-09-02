import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [sveltekit(), tailwindcss()],
    server: {
        port: 3000,
        proxy: {
            "/api": "http://localhost:8000" // this only applies when vite is running
        }
    }
});