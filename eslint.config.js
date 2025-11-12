import config from 'semistandard'

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...[].concat(config),
    {
        files: ['**/*.vue', '**/*.js', '**/*.jsx'], // 指定需要使用该配置的文件类型
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    ecmaVersion: 'latest',
                    sourceType: 'module',
                    requireConfigFile: false,
                    jsx: true, // 关键配置：启用 JSX 语法
                },
            },
        },
        rules: {
            semi: [2, 'never'], // 尾部使用分号
            'no-console': 0, // 禁止出现console
            'no-debugger': 1, // 禁止出现debugger
            'no-duplicate-case': 2, // 禁止出现重复case
            'no-empty': 2, // 禁止出现空语句块
            'no-extra-parens': 0, // 禁止不必要的括号
            'no-func-assign': 2, // 禁止对Function声明重新赋值
            'no-unreachable': 2, // 禁止出现[return|throw]之后的代码块
            'no-else-return': 2, // 禁止if语句中return语句之后有else块
            'no-empty-function': 2, // 禁止出现空的函数块
            'no-lone-blocks': 2, // 禁用不必要的嵌套块
            'no-multi-spaces': 1, // 禁止使用多个空格
            'no-redeclare': 2, // 禁止多次声明同一变量
            'no-return-assign': 0, // 禁止在return语句中使用赋值语句
            'no-return-await': 2, // 禁用不必要的[return/await]
            'no-self-compare': 2, // 禁止自身比较表达式
            'no-useless-catch': 2, // 禁止不必要的catch子句
            'no-useless-return': 2, // 禁止不必要的return语句
            'no-mixed-spaces-and-tabs': 2, // 禁止空格和tab的混合缩进
            'no-multiple-empty-lines': 2, // 禁止出现多行空行
            'no-trailing-spaces': 2, // 禁止一行结束后面不要有空格
            'no-useless-call': 2, // 禁止不必要的.call()和.apply()
            'no-var': 2, // 禁止出现var用let和const代替
            'no-delete-var': 0, // 允许出现delete变量的使用
            'no-shadow': 0, // 允许变量声明与外层作用域的变量同名
            'no-case-declarations': 0, // 允许在case语句中使用声明语句
            'dot-notation': 2, // 要求尽可能地使用点号
            'no-prototype-builtins': 0, // 允许直接调用Object.prototypes上的方法
            'no-async-promise-executor': 0, // 允许在Promise executor函数中包含异步操作
            'default-case': 1, // 要求switch语句中有default分支
            'no-constant-binary-expression': 0, // 禁止在非空断言表达式中使用常量二进制表达式
            eqeqeq: 2, // 要求使用 === 和 !==
            curly: 2, // 要求所有控制语句使用一致的括号风格
            'space-before-blocks': 2, // 要求在块之前使用一致的空格
            'space-in-parens': 2, // 要求在圆括号内使用一致的空格
            'space-infix-ops': 2, // 要求操作符周围有空格
            'space-unary-ops': 2, // 要求在一元操作符前后使用一致的空格
            'switch-colon-spacing': 2, // 要求在switch的冒号左右有空格
            'arrow-spacing': 2, // 要求箭头函数的箭头前后使用一致的空格
            'array-bracket-spacing': 2, // 要求数组方括号中使用一致的空格
            'brace-style': 2, // 要求在代码块中使用一致的大括号风格
            camelcase: 0, // 要求使用骆驼拼写法命名约定
            indent: [2, 4, { SwitchCase: 1 }], // 要求使用JS一致缩进4个空格
            'max-depth': [1, 4], // 要求可嵌套的块的最大深度4
            'max-statements': [1, 100],     // 要求函数块最多允许的的语句数量100
            'max-nested-callbacks': [1, 6], // 要求回调函数最大嵌套深度3
            'max-statements-per-line': [1, { max: 1 }], // 要求每一行中所允许的最大语句数量
            quotes: [2, 'single', 'avoid-escape'], // 要求统一使用单引号符号
            'vue/require-default-prop': 0, // 关闭属性参数必须默认值
            'vue/singleline-html-element-content-newline': 0, // 关闭单行元素必须换行符
            'vue/multiline-html-element-content-newline': 0, // 关闭多行元素必须换行符
            'vue/max-attributes-per-line': [2, { singleline: 5 }], // 要求每一行标签的最大属性不超五个
            'vue/no-setup-props-destructure': 0, // 禁止在setup中对props解构
            'vue/multi-word-component-names': 0, // vue 组件名必须要有俩个单词
            'react/jsx-uses-react': 'off',
            'react/react-in-jsx-scope': 'off',
            'vue/jsx-uses-vars': 'error', // 检查JSX中的变量是否被使用
        },
    },
]
