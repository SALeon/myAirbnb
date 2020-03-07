module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript/base',
    'plugin:prettier/recommended'
  ],
  rules: {
    // 'array-element-newline': ["error", "consistent", { "minItems": 3 }]
  }
};
