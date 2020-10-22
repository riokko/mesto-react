module.exports = {
    extends: ['prettier', 'airbnb-base', 'plugin:testing-library/recommended', 'plugin:react/recommended'],
    rules: {
        'jsx-quotes': [1, 'prefer-double'],
        'react/jsx-filename-extension': 'off',
        'no-underscore-dangle': 'off',
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'react/prop-types': 'off',
        'max-len': ['error', { code: 120 }],
        'import/prefer-default-export': 'off',
    },
    parser: 'babel-eslint',
    plugins: ['prettier', 'babel', 'testing-library'],
    env: {
        browser: true,
        node: true,
        jest: true,
    },
    globals: {
        document: false,
    },
};
