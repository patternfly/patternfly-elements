// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

export default {
  input: "rhelement.js",
  output: {
    file: "rhelement.umd.js",
    format: "umd",
    name: "RHElement"
  },
  plugins: [
    resolve(),
    babel({
      // exclude: "node_modules/**" // only transpile our source code
    }),
    uglify()
  ]
};
