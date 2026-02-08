import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import pkg from './package.json';

const deps = pkg.dependencies;

export default defineConfig({
    plugins: [
        pluginReact(),
    ],
    server: {
        port: 3003,
    },
    tools: {
        rspack: (config, { rspack }) => {
            config.output = {
                ...config.output,
                publicPath: 'http://localhost:3003/',
                uniqueName: 'remote3',
            };

            // Explicitly set library type for Webpack interop
            if (config.output && !config.output.library) {
                config.output.library = {
                    name: 'remote3',
                    type: 'var',
                };
            }

            config.plugins?.push(new rspack.container.ModuleFederationPlugin({
                name: 'remote3',
                filename: 'remoteEntry.js',
                exposes: {
                    './Widget': './src/Widget.tsx',
                },
                remotes: {
                    sharedUI: `promise new Promise((resolve, reject) => {
                        const url = 'http://localhost:3020/sharedUI/remoteEntry.js';
                        import(url)
                            .then(module => resolve(module))
                            .catch(err => reject(err));
                    })`
                },
                shared: {
                    react: {
                        singleton: true,
                        requiredVersion: deps.react,
                    },
                    'react-dom': {
                        singleton: true,
                        requiredVersion: deps['react-dom'],
                    },
                },
            }));
            return config;
        }
    }
});
