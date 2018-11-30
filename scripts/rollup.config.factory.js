import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import path from "path";

function esmConfig({ elementName, className } = {}) {
  const esmFilename = path.join("./dist", `${elementName}.js`);

  return {
    input: esmFilename,
    output: {
      file: esmFilename,
      format: "esm",
      sourcemap: true
    },
    plugins: [resolve(), commonjs()],
    external: id => id.startsWith(".")
  };
}

function umdConfig({ elementName, className } = {}) {
  const umdFilename = path.join("./dist", `${elementName}.umd.js`);

  return {
    input: umdFilename,
    output: {
      file: umdFilename,
      format: "umd",
      sourcemap: true,
      name: className
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        // exclude: "node_modules/**" // only transpile our source code
      }),
      uglify()
    ],
    external: id => id.startsWith("..")
  };
}

export default function factory({ elementName, className } = {}) {
  return [
    esmConfig({ elementName, className }),
    umdConfig({ elementName, className })
  ];
}
