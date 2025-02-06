import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ // https://vite.dev/config/
    base: '',
    server: {
        port: 3000,
    },
    plugins: [react()],
});
