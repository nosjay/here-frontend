module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // disable-error: state(vuex)
    'no-param-reassign': ['error', {'ignorePropertyModificationsFor': ['state']}],
    // Parsing error: x-invalid-end-tag
    'vue/no-parsing-error': ['error', {'x-invalid-end-tag': false}]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
