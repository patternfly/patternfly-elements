// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

const ESM_config = {
  input: "rhelement.js",
  output: {
    file: "rhelement.js",
    format: "esm",
    sourcemap: true
  },
  plugins: [resolve(), commonjs()],
  external: id => id.startsWith(".")
};

const UMD_config = {
  input: "rhelement.umd.js",
  output: {
    file: "rhelement.umd.js",
    format: "umd",
    sourcemap: true,
    name: "RHElement"
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      // exclude: "node_modules/**" // only transpile our source code
    }),
    uglify()
  ]
};

export default [ESM_config, UMD_config];
