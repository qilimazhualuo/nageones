/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier/skip-formatting'
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: {
            // 非 react 项目关闭 jsx 语法校验,默认为 true
            jsx: false
        }
    },
    rules: {
        'vue/multi-word-component-names': 'off',
        'no-case-declarations': 'off'
    },
    parse: 'babel-eslint'
}
