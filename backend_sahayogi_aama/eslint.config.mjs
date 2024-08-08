import js from '@eslint/js';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Add Node.js globals
        ...globals.jest,
      },
    },
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
    },
  },
  js.configs.recommended,
  // react.configs.flat.recommended,
  js.configs.recommended,
  react.configs.recommended,
  reactHooks.configs.recommended,
  jsxA11y.configs.recommended,
  {
    settings: {
      react: {
        version: 'detect', // Auto-detect React version
      },
    },
  },
  {
    rules: {
      // Add any custom rules here
    },
  },
];
