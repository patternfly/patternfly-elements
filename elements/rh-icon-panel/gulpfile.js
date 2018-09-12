const path = require("path");
const fs = require("fs");

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
    .src("./rh-icon-panel.js")
    .pipe(
      replace(
        /^(import .*?)(['"]\.\.\/(?!\.\.\/).*)(\.js['"];)$/gm,
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
    .src("./src/rh-icon-panel.js")
    .pipe(
      replace(
        /extends\s+RHElement\s+{/g,
        (classStatement, character, jsFile) => {
          // extract the templateUrl and styleUrl with regex.  Would prefer to do
          // this by require'ing rh-something.js and asking it directly, but without
          // node.js support for ES modules, we're stuck with this.
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

          let html = fs
            .readFileSync(path.join("./src", templateUrl))
            .toString()
            .trim();

          html = decomment(html);

          const [
            ,
            styleUrl
          ] = /get\s+styleUrl\([^)]*\)\s*{\s*return\s+"([^"]+)"/.exec(
            oneLineFile
          );

          const styleFilePath = path.join("./src", styleUrl);

          let cssResult = sass.renderSync({
            file: styleFilePath
          }).css;

          cssResult = stripCssComments(cssResult).trim();

          return `${classStatement}
  get html() {
    return \`
<style>
${cssResult}
</style>
${html}\`;
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

gulp.task("build", gulp.series("merge", "compile", "bundle"));

gulp.task("default", gulp.series("build"));

gulp.task("dev", gulp.series("build", "watch"));
