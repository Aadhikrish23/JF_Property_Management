module.exports = {
  root: true,

  // ─── Parser ──────────────────────────────────────────────────────────────
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },

  // ─── Plugins ─────────────────────────────────────────────────────────────
  plugins: ['@typescript-eslint', 'import'],

  // ─── Extends ─────────────────────────────────────────────────────────────
  // eslint-config-prettier must be last to disable any formatting rules that
  // conflict with Prettier.
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
  ],

  // ─── Environment ─────────────────────────────────────────────────────────
  env: {
    node: true,
    es2022: true,
  },

  // ─── Rules ───────────────────────────────────────────────────────────────
  rules: {
    // TypeScript — type safety
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-return': 'warn',

    // Imports — order and resolution
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-unresolved': 'error',
    'import/no-duplicates': 'error',

    // General code quality
    'no-console': 'off',
    'no-var': 'error',
    'prefer-const': 'error',
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'no-eval': 'error',
    'no-implied-eval': 'error',

    // Security-relevant
    'no-new-func': 'error',
    'no-script-url': 'error',
  },

  // ─── Ignore patterns ─────────────────────────────────────────────────────
  ignorePatterns: ['dist/', 'node_modules/', 'prisma/', '*.js'],
};
