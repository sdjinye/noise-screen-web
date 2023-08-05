module.exports = {
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser', // Specifies the ESLint parser
		ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		ecmaFeatures: {
			tsx: true, // Allows for the parsing of JSX
			jsx: true
		}
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'prettier', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
		'plugin:prettier/recommended' // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		eqeqeq: ['warn', 'always'],
		'no-tabs': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-multiple-empty-lines': ['warn'],
		'no-useless-return': 'off',
		'@typescript-eslint/no-empty-function': 'warn',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-this-alias': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'vue/max-attributes-per-line': 'off',
		'vue/html-self-closing': 'off',
		'vue/attribute-hyphenation': 'off',
		'vue/attributes-order': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/html-indent': 'off',
		// 'vue/require-explicit-emits': 'off',
		'vue/custom-event-name-casing': 'off',
		'vue/no-unused-vars': 'warn',
		'prefer-const': 'warn',
		'prefer-rest-params': 'warn'
	}
}
