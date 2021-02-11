import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";
import replace from "rollup-plugin-re";
import { get } from "lodash";

const importRegex = /^(import .*?)(['"]\.\.\/\.\.\/(?!\.\.\/).*?)(\.js)?(['"];)$/gm;

/**
 * This function map moduleIds to global variable names.  This is used when the
 * element currently being built imports another element (commonly pfelement),
 * so rollup needs to know what global variable PFElement uses.
 *
 * Sometimes the moduleId is an absolute directory path to the JS file, like
 * "/home/user/projects/patternfly-elements/elements/pfelement/dist/pfelement.js"
 * but fortunately, Node's require module resolution algorithm seems to support
 * ".." after a filename, which allows us jump up to the package.json, and from
 * there we can grab the pfelement.className property.  That className doubles
 * as the global variable name.
 *
 * Note: global variables are _only_ used in the UMD build.  UMD makes each
 * element available as an AMD module, a CJS module, and a global variable.  In
 * the latter case, this function determines what to name the global variable.
 */
function globals(moduleId) {
  const isFilepath = moduleId.includes("/");

  if (isFilepath) {
    // if it's a filepath, look up the pfelement className

    // u don't think this work like it be but it do
    const pkg = require(`${moduleId}/../../package.json`);
    return get(pkg, "pfelement.className");
  } else {
    // if it's not a filepath, it's probably already a className, so just return it
    return moduleId;
  }
}

const babelSettings = {
  presets: [["env", { modules: false }]],
  plugins: ["external-helpers", "transform-object-rest-spread"]
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
      globals,
      sourcemap: true,
      name: className
    },
    plugins: [
      replace({
        patterns: [
          {
            test: importRegex,
            replace: "$1$2.umd$4"
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
            replace: "$1$2.min.js$4"
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
      globals,
      name: className
    },
    plugins: [
      replace({
        patterns: [
          {
            test: importRegex,
            replace: "$1$2.umd.min$4"
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
