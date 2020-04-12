import {resolve} from "path";
import {terser} from "rollup-plugin-terser";

export default {
    input: resolve("lemonade.js"),

    output: {
        file: resolve("lemonade.min.js"),
        format: "cjs"
    },

    plugins: [
        terser()
    ]
};
