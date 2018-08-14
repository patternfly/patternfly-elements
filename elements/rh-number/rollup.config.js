// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";

const ESM_config = {
  input: "rh-number.js",
  output: {
    file: "rh-number.js",
    format: "esm",
    sourcemap: true
  },
  plugins: [resolve(), commonjs()],
  external: id => id.startsWith(".")
};

const UMD_config = {
  input: "rh-number.umd.js",
  output: {
    file: "rh-number.umd.js",
    format: "umd",
    sourcemap: true,
    name: "RhNumber",
    globals: id => (id.endsWith("rhelement.js") ? "RHElement" : undefined)
    // "../../rhelement/rhelement.umd.js": "RHElement"
  },
  plugins: [
    resolve(),
    commonjs(),
    babel({
      // exclude: "node_modules/**" // only transpile our source code
    }),
    uglify()
  ],
  external: id => /^\.\.?\/[^.]/.test(id)
};

export default [ESM_config, UMD_config];
