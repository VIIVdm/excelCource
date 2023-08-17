module.exports = {
    parser: '@babel/eslint-parser',
    parserOptions: {
        babelOptions: {
            configFile: './babel.config.json',
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ['eslint:recommended', 'google'],
    rules: {
        'semi': 'off',
        'comma-dangle': 'off',
        'indent': 'off',
        'require-jsdoc': 'off',
        'operator-linebreak': 'off',
        'no-debugger': 'off',
        'no-unused-vars': 'off'
    }
  }
