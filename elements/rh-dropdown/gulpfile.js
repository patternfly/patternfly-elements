const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const stripCssComments = require("strip-css-comments");
const trim = require("trim");
const fs = require("fs");
const sass = require("node-sass");

gulp.task("compile", () => {
  return gulp
    .src("./rh-dropdown.js")
    .pipe(
      replace(
        /^(import .*?)(['"]\.\.\/(?!\.\.\/).*)(\.js['"];)$/gm,
        "$1$2.compiled$3"
      )
    )
    .pipe(babel())
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".compiled"
      })
    )
    .pipe(gulp.dest("./"));
});

gulp.task("watch", () => {
  return gulp.watch("./src/*", gulp.series("merge", "compile"));
});

gulp.task("merge", () => {
  return gulp
    .src("./src/rh-dropdown.js")
    .pipe(
      replace(/(template\.innerHTML = `)(`;)/, (match, p1, p2) => {
        const html = fs
          .readFileSync("./src/rh-dropdown.html")
          .toString()
          .trim();

        const cssResult = sass.renderSync({
          file: "./src/rh-dropdown.scss"
        }).css;

        return `${p1}
<style>${stripCssComments(cssResult).trim()}</style>
${html}
${p2}`;
      })
    )
    .pipe(gulp.dest("./"));
});

gulp.task("default", gulp.series("merge", "compile"));

gulp.task("dev", gulp.series("merge", "compile", "watch"));
