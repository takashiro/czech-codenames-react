module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		'linebreak-style': 'off',
		indent: [
			'error',
			'tab',
		],
		'no-tabs': 'off',
		'no-use-before-define': 'off',
		'react/jsx-indent': [
			'error',
			'tab',
		],
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['js', 'tsx'],
			}
		],
	},
};
