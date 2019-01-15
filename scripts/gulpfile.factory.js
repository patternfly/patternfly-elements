module.exports = function factory({
  elementName,
  className,
  precompile = []
} = {}) {
  const fs = require("fs");
  const path = require("path");

  const gulp = require("gulp");
  const rename = require("gulp-rename");
  const replace = require("gulp-replace");
  const stripCssComments = require("strip-css-comments");
  const trim = require("trim");
  const decomment = require("decomment");
  const sass = require("node-sass");
  const shell = require("gulp-shell");

  gulp.task("compile", () => {
    return gulp
      .src(`./${elementName}.js`)
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
      .pipe(gulp.dest("./"));
  });

  gulp.task("merge", () => {
    return gulp
      .src(`./src/${elementName}.js`)
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

            let url = {};
            ["template", "style", "schema"].forEach(type => {
              const re = new RegExp(
                `get\\s+${type}Url\\([^)]*\\)\\s*{\\s*return\\s+"([^"]+)"`,
                "g"
              );
              const parse = re.exec(oneLineFile);
              url[type] =
                typeof parse === "object" && parse !== null ? parse[1] : null;
            });

            // Initialize sections to empty strings
            let html = "";
            let cssResult = "";

            // Initialize properties and slots to empty objects
            let properties = "{}";
            let slots = "{}";

            // If the template url is defined and the file exists
            if (
              url.template !== null &&
              fs.existsSync(path.join("./src", url.template))
            ) {
              // Add the contents of the file to the html variable
              html = fs
                .readFileSync(path.join("./src", url.template))
                .toString()
                .trim();
              html = decomment(html);
            }

            // If the style url is defined and the file exists
            if (
              url.style !== null &&
              fs.existsSync(path.join("./src", url.style))
            ) {
              // Add the css rendered version to the css variable
              let rawCSS = sass.renderSync({
                file: path.join("./src", url.style)
              }).css;
              rawCSS = stripCssComments(rawCSS).trim();
              // If any CSS has been rendered, wrap it in style tags
              if (rawCSS.toString() !== "") {
                cssResult = `<style>${rawCSS}</style>`;
              }
            }

            // If the schema url is defined and the file exists
            if (
              url.schema !== null &&
              fs.existsSync(path.join("./src", url.schema))
            ) {
              // Parse the json file in it's entirety
              let schemaObj = JSON.parse(
                fs.readFileSync(path.join("./src", url.schema))
              );
              // If the schema object exists
              if (schemaObj && typeof schemaObj === "object") {
                // Get the attribute values and assign them to properties
                if (schemaObj.properties.attributes) {
                  properties = schemaObj.properties.attributes.properties;
                  // Convert back to a string
                  properties = JSON.stringify(properties);
                }
                // If the slots are defined, assign them to slots object
                if (schemaObj.properties.slots) {
                  slots = schemaObj.properties.slots.properties;
                  // Convert back to a string
                  slots = JSON.stringify(slots);
                }
              }
            }

            // Return the necessary functions to inject into the template
            return `${classStatement}
  get html() {
    return \`${cssResult}${html}\`;
  }

  static get properties() {
    return ${properties};
  }

  static get slots() {
    return ${slots};
  }`;
          }
        )
      )
      .pipe(gulp.dest("./"));
  });

  gulp.task("watch", () => {
    return gulp.watch("./src/*", gulp.series("build"));
  });

  gulp.task("bundle", shell.task("../../node_modules/.bin/rollup -c"));

  const buildTasks = ["merge", ...precompile, "compile", "bundle"];

  gulp.task("build", gulp.series(...buildTasks));

  gulp.task("default", gulp.series("build"));

  gulp.task("dev", gulp.series("build", "watch"));

  return gulp;
};
