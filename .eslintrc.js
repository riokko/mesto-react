module.exports = {
  extends: ['prettier', 'airbnb'],
  rules: {
    'jsx-quotes': [1, 'prefer-double'],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: [],
        labelAttributes: [],
        controlComponents: [],
        assert: 'either',
        depth: 25,
      },
    ],
    'react/jsx-filename-extension': 'off',
    'no-underscore-dangle': 'off',
  },
  parser: 'babel-eslint',
  plugins: ['prettier', 'babel'],
};
