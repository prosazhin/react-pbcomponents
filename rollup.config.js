import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

export default [
	{
		input: './src/index.js',
		output: [
			{
				file: 'build/index.js',
				format: 'cjs',
			}
		],
		plugins: [
			postcss({
				modules: true,
				autoModules: true,
				extract: true,
				minimize: true,
				exec: true,
				use: [
					[ 'sass',
						{
							includePaths: [path.resolve('node_modules')],
						},
					],
				],
				plugins: [
					autoprefixer,
				],
			}),
			babel({
				exclude: 'node_modules/**',
				presets: ['@babel/preset-react']
			}),
			external(),
			resolve(),
			terser(),
		]
	}
];
