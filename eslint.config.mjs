import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    ignores: [
      '**/dist/*',
      '**/node_modules/*',
      '**/*.env',
      '**/pnpm-lock.yaml',
      '**/*.sql',
      'eslint.config.mjs'
    ]
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      },

      globals: { ...globals.node, ...globals.jest }
    }
  },
  {
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',

      'no-restricted-imports': [
        'error',
        {
          patterns: ['.*']
        }
      ],

      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: ['camelCase']
        },
        {
          selector: 'import',
          format: ['camelCase', 'snake_case', 'StrictPascalCase', 'UPPER_CASE']
        },
        {
          selector: 'variable',
          format: ['camelCase', 'snake_case', 'StrictPascalCase']
        },
        {
          selector: 'function',
          format: ['camelCase', 'StrictPascalCase']
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow'
        },
        {
          selector: 'property',
          format: ['camelCase', 'snake_case', 'StrictPascalCase']
        },
        {
          selector: 'typeLike',
          format: ['PascalCase']
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE']
        },
        {
          selector: [
            'classProperty',
            'objectLiteralProperty',
            'typeProperty',
            'classMethod',
            'objectLiteralMethod',
            'typeMethod',
            'accessor',
            'enumMember',
            'property'
          ],

          format: null,
          modifiers: ['requiresQuotes']
        },
        {
          selector: ['property', 'parameter'],
          format: null,
          modifiers: ['unused']
        },
        {
          selector: 'objectLiteralProperty',
          format: ['UPPER_CASE', 'camelCase', 'snake_case', 'StrictPascalCase']
        }
      ]
    }
  }
);
