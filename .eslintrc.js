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
		'import/extensions': [
			'error',
			{
				extensions: [
					'js',
					'ts',
					'tsx',
				],
			},
		],
		'import/no-unresolved': 'off',
		'no-plusplus': 'off',
		'no-tabs': 'off',
		'no-use-before-define': 'off',
		'react/jsx-indent': [
			'error',
			'tab',
		],
		'react/jsx-indent-props': [
			'error',
			'tab',
		],
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['js', 'tsx'],
			},
		],
		'react/require-default-props': 'off',
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: [
					'js',
					'ts',
					'tsx',
				],
			},
		},
	},
};
