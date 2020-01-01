import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-re";

const importRegex = /^(import .*?)(['"]\.\.\/\.\.\/(?!\.\.\/).*)\.js(['"];)$/gm;

const babelSettings = {
  presets: [["env", { modules: false }]],
  plugins: ["external-helpers"]
};

const paths = {
  root: "./",
  source: "./src",
  compiled: "./dist",
  temp: "./_temp"
};

function esmConfig({ elementName, className } = {}) {
  return {
    input: `${paths.temp}/${elementName}.js`,
    output: {
      file: `${paths.compiled}/${elementName}.js`,
      format: "esm",
      sourcemap: true
    },
    plugins: [resolve(), commonjs()],
    external: id => id.startsWith("..")
  };
}

function umdConfig({ elementName, className } = {}) {
  return {
    input: `${paths.temp}/${elementName}.umd.js`,
    output: {
      file: `${paths.compiled}/${elementName}.umd.js`,
      format: "umd",
      sourcemap: true,
      name: className
    },
    plugins: [
      replace({
        patterns: [
          {
            test: importRegex,
            replace: "$1$2.umd$3"
          }
        ]
      }),
      resolve(),
      commonjs(),
      babel(babelSettings)
    ],
    external: id => id.startsWith("..")
  };
}

function esmMinConfig({ elementName, className } = {}) {
  return {
    input: `${paths.temp}/${elementName}.js`,
    output: {
      file: `${paths.compiled}/${elementName}.min.js`,
      format: "esm",
      sourcemap: true
    },
    plugins: [
      replace({
        patterns: [
          {
            test: importRegex,
            replace: "$1$2.min.js$3"
          }
        ]
      }),
      terser({
        output: {
          comments: /@preserve|@license|@cc_on/i
        }
      }),
      resolve(),
      commonjs()
    ],
    external: id => id.startsWith("..")
  };
}

function umdMinConfig({ elementName, className } = {}) {
  return {
    input: `${paths.temp}/${elementName}.umd.js`,
    output: {
      file: `${paths.compiled}/${elementName}.umd.min.js`,
      format: "umd",
      sourcemap: true,
      name: className
    },
    plugins: [
      replace({
        patterns: [
          {
            test: importRegex,
            replace: "$1$2.umd.min$3"
            // ".js" is not included here to maintain compability with the AMD
            // module format, see umdConfig above for more info.
          }
        ]
      }),
      resolve(),
      commonjs(),
      babel(babelSettings),
      uglify()
    ],
    external: id => id.startsWith("..")
  };
}

export default function factory({ elementName, className } = {}) {
  return [
    esmConfig({ elementName, className }),
    umdConfig({ elementName, className }),
    esmMinConfig({ elementName, className }),
    umdMinConfig({ elementName, className })
  ];
}
