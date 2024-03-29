module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/require-await': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'no-restricted-imports': ['error', {
      'patterns': ['.*']
    }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'default',
        format: ['camelCase']
      },
      {
        selector: 'import',
        format: ['camelCase', 'snake_case', 'StrictPascalCase']
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
};
