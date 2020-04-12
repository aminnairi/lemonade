"use strict";

module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "@aminnairi"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    rules: {
        "new-cap": "off"
    },
    overrides: [
        {
            files: [
                "rollup.config.js",
            ],
            parserOptions: {
                sourceType: "module"
            }
        }
    ]
};
