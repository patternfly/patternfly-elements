import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";

function esmConfig({ elementName, className } = {}) {
  return {
    input: `${elementName}.js`,
    output: {
      file: `${elementName}.js`,
      format: "esm",
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs()
      // terser()
    ],
    external: id => id.startsWith("..")
  };
}

function umdConfig({ elementName, className } = {}) {
  return {
    input: `${elementName}.umd.js`,
    output: {
      file: `${elementName}.umd.js`,
      format: "umd",
      sourcemap: true,
      name: className
    },
    plugins: [
      resolve(),
      commonjs(),
      babel()
      // uglify()
    ],
    external: id => id.startsWith("..")
  };
}

function esmMinify({ elementName, className } = {}) {
  return {
    input: `${elementName}.js`,
    output: {
      file: `${elementName}.min.js`,
      format: "esm",
      sourcemap: true
    },
    plugins: [
      terser({
        output: {
          comments: function(node, comment) {
            var text = comment.value;
            var type = comment.type;
            if (type == "comment2") {
              // multiline comment
              return /@preserve|@license|@cc_on/i.test(text);
            }
          }
        }
      })
    ],
    external: id => id.startsWith("..")
  };
}

function umdMinify({ elementName, className } = {}) {
  return {
    input: `${elementName}.umd.js`,
    output: {
      file: `${elementName}.umd.min.js`,
      format: "umd",
      sourcemap: true,
      name: className
    },
    plugins: [uglify()],
    external: id => id.startsWith("..")
  };
}

export default function factory({ elementName, className } = {}) {
  return [
    esmConfig({ elementName, className }),
    umdConfig({ elementName, className }),
    esmMinify({ elementName, className }),
    umdMinify({ elementName, className })
  ];
}
