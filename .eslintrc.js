module.exports = {
    "root": true, // 禁止持续查找配置文件，一旦找到就停止查找配置文件
    "env": { // 环境变量
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true // 启动Node环境变量 如__dirname
    },
    "extends": [// 共享配置
        "airbnb-base",
        "plugin:prettier/recommended",
    ],
    "parserOptions": { // 解析器选项
        "ecmaVersion": "latest" // ES的版本，默认为5
        // "sourceType": "module" // 源代码存放的位置 script|module 默认为script
    },
    // "parse": "babel-eslint", // 默认情况下ESLint使用Espree解析器
    "plugins": ["eslint-plugin-prettier"],
    "rules": {
        "prettier/prettier": "error", // 不符合prettier则抛出错误
        "camelcase": 2, // 除了常量 命名采用骆驼拼写法variableName
        "no-cond-assign": 2, // 禁止在条件中使用常量表达式
        "no-unused-expressions": [1,{
            allowShortCircuit: true,
            allowTernary: true,
            allowTaggedTemplates: true
        }], // 禁止出现未使用过的表达式
        "no-dupe-args": 2, // 禁止 function 定义中出现重名参数
        "no-use-before-define": 2, // 禁止在变量定义之前使用它们
        "no-redeclare": 2,
        "no-multi-assign":2,
        "eqeqeq":2, // 要求使用 === 和 !==
        "prettier/prettier": [
            "error",{
                "endOfLine": "auto"
            }
        ],
        // 禁止出现未使用过的变量
        "no-unused-vars": [1, { 
            // 允许声明未使用变量
            "vars": "local",
            // 参数不检查
            "args": "none" 
        }],
        "no-var": 1,
        "no-alert": 2,
        "no-cond-assign": 2, // 禁止在条件表达式中使用赋值语句
        "consistent-return": 0,
        "no-underscore-dangle": 0
    }
}
