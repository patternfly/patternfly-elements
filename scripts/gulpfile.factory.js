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

            const [
              ,
              templateUrl
            ] = /get\s+templateUrl\([^)]*\)\s*{\s*return\s+"([^"]+)"/.exec(
              oneLineFile
            );
            const [
              ,
              styleUrl
            ] = /get\s+styleUrl\([^)]*\)\s*{\s*return\s+"([^"]+)"/.exec(
              oneLineFile
            );
            const [
              ,
              schemaUrl
            ] = /get\s+schemaUrl\([^)]*\)\s*{\s*return\s+"([^"]+)"/.exec(
              oneLineFile
            );

            let html = "";
            let cssResult = "";
            let schema = "{}";

            if (fs.existsSync(path.join("./src", templateUrl))) {
              html = fs
                .readFileSync(path.join("./src", templateUrl))
                .toString()
                .trim();
              html = decomment(html);
            }

            if (fs.existsSync(path.join("./src", styleUrl))) {
              let rawCSS = sass.renderSync({
                file: path.join("./src", styleUrl)
              }).css;
              rawCSS = stripCssComments(cssResult).trim();
              if (rawCSS && rawCSS !== "") {
                cssResult = `<style>${rawCSS}</style>`;
              }
            }

            if (fs.existsSync(path.join("./src", schemaUrl))) {
              let schemaObj = JSON.parse(
                fs.readFileSync(path.join("./src", schemaUrl))
              );
              if (schemaObj && typeof schemaObj === "object") {
                schema = schemaObj.properties;
                schema = JSON.stringify(schema);
              }
            }

            return `${classStatement}
  get html() {
    return \`${cssResult}
${html}\`;
  }

  static get properties() {
    return ${schema};
  }
`;
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
