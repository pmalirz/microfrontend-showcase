import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
    plugins: [
        pluginReact(),
        pluginModuleFederation({
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
                    requiredVersion: false,
                },
                'react-dom': {
                    singleton: true,
                    requiredVersion: false,
                },
            },
        }),
    ],
    server: {
        port: 3003,
    },
    tools: {
        rspack: {
            output: {
                publicPath: 'http://localhost:3003/',
                library: {
                    name: 'remote3',
                    type: 'var',
                }
            }
        }
    }
});
