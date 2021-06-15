module.exports = function factory({
  version,
  pfelement: {
    elementName,
    className,
    assets = []
  },
  prebundle = []
} = {}) {
  const {
    task,
    src,
    dest,
    watch,
    parallel,
    series
  } = require("gulp");

  const paths = {
    root: "./",
    source: "./src",
    compiled: "./dist",
    temp: "./_temp"
  };

  // Append a set of default files for publication
  let files = assets.concat([
    `${elementName}.js`,
    `${elementName}--*.css`,
    `${elementName}--*.min.css`,
    `${elementName}--*.min.css.map`,
    `${elementName}.json`
  ]);

  // Dedupe any items
  files = files.filter((item, index) => files.indexOf(item) === index);

  // Tooling
  const fs = require("fs");
  const path = require("path");
  const replace = require("gulp-replace");
  const del = require("del");
  const gulpif = require("gulp-if");
  const gulpmatch = require("gulp-match");

  // Rollup
  const shell = require("gulp-shell");

  // JavaScript
  const banner = require("gulp-banner");
  const rename = require("gulp-rename");

  // Styles
  const sass = require("gulp-sass");
  sass.compiler = require("node-sass");

  const postcss = require("gulp-postcss");
  const sourcemaps = require("gulp-sourcemaps");
  const autoprefixer = require("autoprefixer");
  const cleanCSS = require("gulp-clean-css");
  const postcssCustomProperties = require("postcss-custom-properties");

  // Markup
  const decomment = require("decomment");

  // Delete the temp directory
  task("clean", () => del([
      paths.temp,
      paths.compiled
    ], {
      cwd: paths.root,
      read: false,
      allowEmpty: true
    }));

  // Compile the sass into css, compress, autoprefix
  task("compile:styles", () => src("*.{scss,css}", {
      cwd: paths.source
    })
    .pipe(sourcemaps.init())
    .pipe(
      sass().on('error', sass.logError)
    )
    // Compile the Sass into CSS
    .pipe(
      sass({
        outputStyle: "expanded"
      }).on("error", sass.logError)
    )
    // Adds autoprefixing to the compiled sass
    .pipe(
      postcss([postcssCustomProperties(), autoprefixer({
        grid: "autoplace"
      })])
    )
    // Write the sourcemap
    .pipe(sourcemaps.write("./"))
    // Output the unminified file
    .pipe(dest(paths.temp))
  );

  // Compile the sass into css, compress, autoprefix
  task("minify:styles", () => src("*.{scss,css}", {
      cwd: paths.temp
    })
    .pipe(sourcemaps.init())
    // Minify the file
    .pipe(
      cleanCSS({
        compatibility: "ie11"
      })
    )
    // Add the .min suffix
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    // Write the sourcemap
    .pipe(sourcemaps.write("./"))
    // Output the minified file
    .pipe(dest(paths.temp))
  );

  // Returns a string with the cleaned up HTML
  const htmlCompiler = htmlFile => decomment(
    fs
    .readFileSync(htmlFile)
    .toString()
    .trim()
  );

  const getURLs = (string, types) => {
    let urls = {};
    types.forEach(type => {
      const re = new RegExp(
        `get\\s+${type}Url\\([^)]*\\)\\s*{\\s*return\\s+"([^"]+)"`,
        "g"
      );
      const parse = re.exec(string);
      urls[type] =
        typeof parse === "object" && parse !== null ? parse[1] : null;
    });
    return urls;
  };

  task("merge", () => src(`${elementName}*.js`, {
      cwd: paths.source
    })
    .pipe(
      replace(
        /extends\s+P[Ff][Ee][A-z0-9_$]*\s+{/g,
        (classStatement, character, jsFile) => {
          // Extract the urls for template, style, and schema
          // -- Would prefer to do this by require'ing and asking it directly, but without
          //    node.js support for ES modules, we're stuck with this.
          const oneLineFile = jsFile
            .slice(character)
            .split("\n")
            .join(" ");

          let url = getURLs(oneLineFile, ["template", "style", "schema"]);
          let html = "";
          let cssResult = "";
          let properties = "";
          let slots = "";

          // Check for the html template
          let is_defined = url.template !== null;
          let file_exists = fs.existsSync(
            path.join(paths.source, url.template || "")
          );
          if (is_defined && file_exists) {
            html = htmlCompiler(path.join(paths.source, url.template || ""));
          }

          // Check for the stylesheet template
          is_defined = url.style !== null;
          file_exists = fs.existsSync(
            path.join(paths.source, url.style || "")
          );
          if (is_defined && file_exists) {
            let result = "";
            // Get the compiled css styles from the temp directory
            let css_styles = path.join(
              paths.temp,
              `${path.basename(url.style, ".scss")}.min.css`
            );
            // Read in the content of the compiled file
            if (fs.existsSync(css_styles)) {
              result = fs.readFileSync(css_styles);
            } else {
              console.error(
                `Compiled CSS asset ${css_styles} cannot be found.`
              );
            }
            // If the string is not empty, add to the results variable
            if (result.toString() !== "") {
              cssResult = `<style>${result}</style>`;
            }
          }

          is_defined = url.schema !== null;
          file_exists = fs.existsSync(
            path.join(paths.source, url.schema || "")
          );
          if (is_defined && file_exists) {
            properties = "{}";
            slots = "{}";
            let schemaObj = JSON.parse(
              fs.readFileSync(path.join(paths.source, url.schema))
            );
            if (schemaObj && typeof schemaObj === "object") {
              if (schemaObj.properties.attributes) {
                properties = schemaObj.properties.attributes.properties;
                properties = JSON.stringify(properties);
              }
              if (schemaObj.properties.slots) {
                slots = schemaObj.properties.slots.properties;
                slots = JSON.stringify(slots);
              }
            }
          }

          let template = classStatement;
          template += `
  static get version() {
    return "${version}";
  }`;
          if (cssResult || html) {
            template += `

  get html() {
    return \`${cssResult}${html}\`;
  }`;
          }
          if (properties) {
            template += `

  static get properties() {
    return ${properties};
  }`;
          }
          if (slots) {
            template += `

  static get slots() {
    return ${slots};
  }`;
          }

          return template;
        }
      )
    )
    .pipe(
      banner(
        `/*!
 * PatternFly Elements: ${className} ${version}
 * @license
${fs
  .readFileSync("LICENSE.txt", "utf8")
  .split("\n")
  .map(line => ` * ${line}\n`)
  .join("")}*/\n\n`
      )
    )
    .pipe(dest(paths.temp)));

  task("copy:src", () => src(["*.js", "*.json", `!${elementName}*.js`], {
    cwd: paths.source
  }).pipe(dest(paths.temp)));

  task("copy:compiled", () => src(["*"], {
    cwd: paths.temp
  }).pipe(gulpif((file) => (files.length > 0 && gulpmatch(file, files)) || files.length === 0, dest(paths.compiled))));

  task("compile", () => src(`${elementName}*.js`, {
      cwd: paths.temp
    })
    .pipe(
      replace(
        /^(import .*?)(['"]\.\.\/\.\.\/(?!\.\.\/).*)\.js(['"];)$/gm,
        "$1$2.umd$3"
      )
    )
    .pipe(
      rename({
        suffix: ".umd"
      })
    )
    .pipe(dest(paths.temp)));

  task("bundle", () => shell.task("../../node_modules/.bin/rollup -c"));

  // Delete the temp directory
  task("clean:post", () => del([
      "*.min.css",
      "*.umd.js"
    ], {
      cwd: paths.temp,
      read: false,
      allowEmpty: true
    }));

  task(
    "build",
    series(
      "clean",
      "compile:styles",
      "minify:styles",
      "merge",
      "copy:src",
      "copy:compiled",
      ...prebundle,
      "compile",
      "bundle",
      "clean:post"
    )
  );

  task("watch",  () => {
    watch(path.join(paths.source, "*"), series("build"));
  });

  task("dev", parallel("build", "watch"));

  task("default", series("build"));

  // Custom tasks for components with no JS to compile
  task(
    "build:nojs",
    series(
      "clean",
      "compile:styles",
      "minify:styles",
      "copy:src",
      "copy:compiled",
      ...prebundle,
      "clean:post"
    )
  );

  task("watch:nojs", async () => {
    watch(path.join(paths.source, "*"), series("build:nojs"));
  });

  task("dev:nojs", parallel("build:nojs", "watch:nojs"));
};
