const path = require('path');
const { execSync } = require('child_process');

let env =
	execSync('git branch --show-current').toString().trim() == 'main'
		? 'production'
		: 'development';
env = 'production';

module.exports = {
	mode: env,
	entry: {
		index: './src/index.ts',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].min.js',
		library: {
			type: 'commonjs-module',
			name: 'py-datetime',
		},
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
			},
			{
				test: /\.(d.ts)$/,
				include: [path.join(__dirname, 'src')],
				loader: 'null-loader',
			},
		],
	},
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
	devtool: env == 'production' ? false : 'eval',
};
