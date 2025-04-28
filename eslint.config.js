import js from '@eslint/js';
import globals from 'globals';

import prettierConfig from 'eslint-config-prettier';

// Plugins
import prettierPlugin from 'eslint-plugin-prettier';
import reactDomPlugin from 'eslint-plugin-react-dom';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import reactXPlugin from 'eslint-plugin-react-x';

import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
      'react-dom': reactDomPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      'react-x': reactXPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      ...reactDomPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...reactXPlugin.configs['recommended-typescript'].rules,
    },
  }
);
