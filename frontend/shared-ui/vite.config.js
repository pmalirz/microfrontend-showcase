import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'sharedUI',
            filename: 'remoteEntry.js',
            exposes: {
                './SharedButton': './src/SharedButton.jsx',
            },
            shared: ['react', 'react-dom']
        }),
    ],
    build: {
        target: 'esnext',
        minify: false,
        cssCodeSplit: false
    },
    server: {
        port: 3011,
        cors: true,
    },
    preview: {
        port: 3011,
        cors: true,
    }
});
