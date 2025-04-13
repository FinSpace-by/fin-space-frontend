const react = require('eslint-plugin-react')
const prettier = require('eslint-plugin-prettier')

module.exports = {
  files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: {
    react,
    prettier,
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'prettier/prettier': 'error',
  },
  ignores: ['node_modules', 'dist', 'build', '*.min.js', '*.bundle.js'],
}
