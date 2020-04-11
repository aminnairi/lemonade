"use strict";

import { resolve } from "path";
import { terser } from "rollup-plugin-terser";

export default {
    input: resolve("lemonade.js"),

    plugins: [
        terser()
    ],

    output: {
        file: resolve("lemonade.min.js"),
        format: "cjs"
    }
};
