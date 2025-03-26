import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

const alias  =  {
    '@src': './src',
    '@config': './src/config',
    '@shared': './src/shared',
    '@modules': './src/modules'
};

export default defineConfig({
    test: {
        include: ['**/*.e2e-spec.ts'],
        globals: true,
        alias,
        root: './',
        testTimeout: 16000,
        setupFiles: [
            'dotenv/config'
        ]
    },
    resolve: {
        alias
    },
    plugins: [swc.vite({
        module: { type: 'es6' }
    })]
});
