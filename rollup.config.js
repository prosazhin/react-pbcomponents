import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';
import eslint from '@rollup/plugin-eslint';
import terser from '@rollup/plugin-terser';
import dts from 'rollup-plugin-dts';

import packageJson from './package.json' assert { type: 'json' };
import tailwindConfig from './tailwind.config.js';

export default [
  {
    input: './src/index.ts',
    watch: {
      exclude: 'node_modules/**',
      include: 'src/**',
      buildDelay: 0,
      skipWrite: false,
    },
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'es',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss({
        config: {
          path: './postcss.config.mjs',
        },
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
        plugins: [tailwindcss(tailwindConfig)],
      }),
      eslint(),
      terser(),
    ],
  },
  {
    input: 'public/types/index.d.ts',
    output: [{ file: 'public/index.d.ts', format: 'es' }],
    plugins: [dts()],
    external: [/\.(css|less|scss)$/],
  },
];
