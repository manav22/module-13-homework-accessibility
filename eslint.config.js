/* eslint-disable @typescript-eslint/no-var-requires */
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const reactRecommended = require('eslint-plugin-react/configs/recommended');
const tsEslint = require('typescript-eslint');

module.exports = [
  ...tsEslint.configs.recommended,
  {
    ...reactRecommended,
    files: ['**/*.{js,cjs,jsx,ts,tsx}'],
  },
  eslintPluginPrettierRecommended,
];
