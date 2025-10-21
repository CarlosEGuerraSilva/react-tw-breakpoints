import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig(
  {
    ignores: [
      'dist/',
      'node_modules/',
      'coverage/',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.spec.ts',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettierRecommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts'],
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
  },
);
