const eslint = require('@eslint/js');
const globals = require('globals');

module.exports = [
    eslint.configs.recommended,
    {
        ignores: ["eslint.config.js"]
    },
    {
        rules: {
            "no-unused-vars": "off"
        },
        languageOptions: {
            ecmaVersion: 2021,
            globals: {
                ...globals.browser
            }
        }
    }
];
