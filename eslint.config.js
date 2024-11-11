import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';


export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			js.configs.recommended,
			eslintPluginPrettierRecommended,
			...tseslint.configs.recommended,
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			"prettier/prettier": [
				"error",
				{
					"useTabs": true,
					"tabWidth": 2,
					"singleQuote": true,
					"trailingCommas": "es5",
					"semi": true
				}
			],
			"id-length": [
				"error",
				{
					"min": 3,
					"properties": "never",
					"exceptions": [
						"_",
						"id"
					]
				}
			],
			"lines-between-class-members": ["error", "always"]
		},
	},
)
