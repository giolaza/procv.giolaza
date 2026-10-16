import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react-oxc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/app.jsx'],
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        host: '127.0.0.1',
        port: 5175,
        strictPort: true,
        cors: true,
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
