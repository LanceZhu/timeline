module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'standard',
    '@vue/typescript'
  ],
  parserOptions: {
    // parser: 'babel-eslint',
    parser: '@typescript-eslint/parser',
    "ecmaFeatures": {
        "legacyDecorators": true
    }
  },
  // add your custom rules here
  rules: {
    'no-console': 'warn'
  }
}
