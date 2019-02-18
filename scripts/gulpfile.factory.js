module.exports = function factory({
  elementName,
  className,
  precompile = []
} = {}) {
  const { task, src, dest, watch, parallel, series } = require("gulp");

  const paths = {
    source: "./src",
    compiled: "./",
    temp: "./tmp"
  };

  // Tooling
  const fs = require("fs");
  const path = require("path");
  const replace = require("gulp-replace");
  const merge = require("merge-stream");
  const clean = require("gulp-clean");

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

  // Markup
  const trim = require("trim");
  const decomment = require("decomment");

  // Compile the sass into css, compress, autoprefix
  task("compile:sass", () => {
    return src(path.join(paths.source, "**/*.scss"))
      .pipe(sourcemaps.init())
      .pipe(
        sass({
          outputStyle: "compressed"
        }).on("error", sass.logError)
      )
      .pipe(
        postcss([
          autoprefixer({
            browsers: [
              "last 2 versions",
              "Firefox > 40",
              "iOS > 5"
            ]
          })
        ])
      )
      .pipe(sourcemaps.write(paths.compiled))
      .pipe(dest(paths.temp));
  });

  // Move the map file to the compiled location
  task("move:maps", () => {
    return src(path.join(paths.temp, "*.map"))
      .pipe(dest(paths.compiled));
  });
 
  // Delete the temp directory
  task("clean", function () {
      return src([
        paths.temp
      ], {
        read: false,
        allowEmpty: true
      })
          .pipe(clean());
  });

  // Returns a string with the cleaned up HTML
  const htmlCompiler = (htmlFile) => {
    return decomment(
      fs.readFileSync(htmlFile)
      .toString()
      .trim());
  };

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

  task("merge", () => {
    return src(path.join(paths.source, "**/*.js"))
      .pipe(
        replace(
          /extends\s+PFElement\s+{/g,
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
            let file_exists = fs.existsSync(path.join(paths.source, url.template || ""));
            if (is_defined && file_exists) {
              html = htmlCompiler(path.join(paths.source, url.template || ""));
            }

            // Check for the stylesheet template
            is_defined = url.style !== null;
            file_exists = fs.existsSync(path.join(paths.source, url.style || ""));
            if (is_defined && file_exists) {
              let result = "";
              // Get the compiled css styles from the temp directory
              let css_styles = path.join(paths.temp, `${path.basename(url.style, ".scss")}.css`);
              // As a backup, check for the compiled css styles in the source directory
              let backup_styles = path.join(paths.source, `${path.basename(url.style, ".scss")}.css`);
              // Read in the content of the compiled file
              if(fs.existsSync(css_styles)) {
                result = fs.readFileSync(css_styles);
              } else if(fs.existsSync(backup_styles)) {
                result = fs.readFileSync(backup_styles);
              } else {
                console.warn("Compiled CSS assets cannot be found.");
              }
              // If the string is not empty, add to the results variable
              if (result.toString() !== "") {
                cssResult = `<style>${result}</style>`;
              }
            }

            is_defined = url.schema !== null;
            file_exists = fs.existsSync(path.join(paths.source, url.schema || ""));
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
            if(cssResult || html) {
              template += ` get html() { return \`${cssResult}${html}\`; }`;
            }
            if(properties) {
              template += ` static get properties() { return ${properties}; }`;
            }
            if(slots) {
              template += ` static get slots() { return ${slots}; }`;
            }

            return template;
          }
        )
      )
      .pipe(
        banner(
          `/*\n${fs
            .readFileSync("LICENSE.txt", "utf8")
            .split("\n")
            .map(line => ` * ${line}\n`)
            .join("")}*/\n\n`
        )
      )
      .pipe(dest(paths.compiled));
  });

  task("compile", () => {
    return src(`./${elementName}.js`)
      .pipe(
        replace(
          /^(import .*?)(['"]\.\.\/(?!\.\.\/).*)\.js(['"];)$/gm,
          "$1$2.umd$3"
        )
      )
      .pipe(
        rename({
          suffix: ".umd"
        })
      )
      .pipe(dest(paths.compiled));
  });

  task("bundle", shell.task("../../node_modules/.bin/rollup -c"));

  task("build", series("compile:sass", "merge", ...precompile, parallel("compile", "move:maps", "bundle"), "clean"));

  task("watch", () => {
    return watch(path.join(paths.source, "*"), "build"); 
  });

  task("dev", parallel("build", "watch"));

  task("default", series("build"));
};
