/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function config(env, argv) {
	const mode = argv && argv.mode === 'development' ? 'development' : 'production';
	return {
		mode,
		entry: {
			app: './src/index.js',
		},
		output: {
			filename: 'static/[name].js',
			path: path.resolve(__dirname, 'dist'),
		},
		resolveLoader: {
			modules: [path.resolve(__dirname, 'node_modules')],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						enforce: true,
						chunks: 'all',
					},
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.[tj]sx?$/,
					exclude: /node_modules/,
					use: 'ts-loader',
				},
				{
					test: /\.scss$/,
					exclude: /node_modules/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: false,
								sourceMap: mode === 'development',
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: mode === 'development',
							},
						},
					],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'static/[name].css',
				chunkFilename: 'static/[id].css',
			}),
			new HtmlWebpackPlugin({
				template: 'src/index.htm',
			}),
		],
		devtool: mode === 'development' ? 'inline-source-map' : undefined,
		devServer: {
			contentBase: path.join(__dirname, 'dist'),
			port: 5261,
			hot: true,
		},
	};
};
