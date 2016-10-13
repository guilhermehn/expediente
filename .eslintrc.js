module.exports = {
  extends: [
    'eslint:recommended'
  ],

  rules: {
    indent: [2, 2],
    quotes: [2, 'single'],
    semi: [2, 'never'],
    'comma-dangle': [1, 'never'],
    'no-cond-assign': [2],
    'no-spaced-func': [2],
    'no-multiple-empty-lines': [2, {'max': 1}],
    curly: [2],
    eqeqeq: [2]
  },

  env: {
    es6: true,
    mocha: true,
    node: true
  },

  parserOptions: {
    ecmaVersion: 6
  }
}