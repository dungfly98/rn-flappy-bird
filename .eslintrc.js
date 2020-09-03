module.exports = {
    root: true,
    extends: [
        '@react-native-community',
        'airbnb-typescript',
        'prettier',
        'prettier/@typescript-eslint',
        'prettier/react',
        'plugin:@typescript-eslint/recommended'
    ],
    parser: `@typescript-eslint/parser`,
    parserOptions: {
        project: `./tsconfig.json`
    },
    plugins: [
        // ESLint 支持使用第三方插件。在使用插件之前，你必须使用 npm 安装它。
        'react',
        'react-native'
    ],
    rules: {
        'import/no-unresolved': 0,
        'class-methods-use-this': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
        'import/prefer-default-export': 0,
        '@typescript-eslint/no-use-before-define': 0,
        'react/destructuring-assignment': 0,
        'prefer-destructuring': 0,
        '@typescript-eslint/no-empty-interface': 0,
        'no-console': 0,
        'global-require': 0,
        'no-plusplus': 0,
        'no-param-reassign': 0,
        'no-empty': 0,
        'react/prefer-stateless-function': 0,
        'react/static-property-placement': 0
    }
};
