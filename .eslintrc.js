module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "vue/html-indent": ["error", 4], // html
        "indent": [2, 4, { "SwitchCase": 1 }], // js
        'space-before-function-paren': [2, {
            'anonymous': 'always',
            'named': 'never'
        }],
        "space-in-parens": [0, 'never'] // 小括号里面要不要有空格
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
