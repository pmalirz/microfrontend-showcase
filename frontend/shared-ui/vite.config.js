import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import pkg from './package.json' with { type: 'json' };

const deps = pkg.dependencies;

export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'sharedUI',
            filename: 'remoteEntry.js',
            exposes: {
                './SharedButton': './src/SharedButton.tsx',
            },
            shared: {
                react: {
                    requiredVersion: deps.react,
                    singleton: true,
                },
                'react-dom': {
                    requiredVersion: deps['react-dom'],
                    singleton: true,
                }
            }
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
