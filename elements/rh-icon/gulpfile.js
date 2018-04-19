const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const stripCssComments = require("strip-css-comments");
const trim = require("trim");
const del = require("del");
const fs = require("fs");
const sass = require("node-sass");

gulp.task("compile", () => {
  return gulp
    .src("./rh-icon.js")
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
    .src("./src/rh-icon.js")
    .pipe(
      replace(/(template\.innerHTML = `)(`;)/, (match, p1, p2) => {
        const html = fs
          .readFileSync("./src/rh-icon.html")
          .toString()
          .trim();

        const cssResult = sass.renderSync({
          file: "./src/rh-icon.scss"
        }).css;

        return `${p1}
<style>${stripCssComments(cssResult).trim()}</style>
${html}
${p2}`;
      })
    )
    .pipe(gulp.dest("./"));
});

gulp.task("svgSprite", function() {
  return gulp
    .src("./svg/*.svg")
    .pipe(
      svgSprite({
        mode: {
          symbol: true
        },
        svg: {
          xmlDeclaration: false,
          doctypeDeclaration: false,
          namespaceIDs: false,
          namespaceClassnames: false,
          preserveAspectRatio: true
        }
      })
    )
    .pipe(rename("rh-icons.svg"))
    .pipe(gulp.dest("./"));
});

gulp.task("stuffSprite", () => {
  return gulp
    .src("./rh-icon.js")
    .pipe(
      replace(
        /<svg xmlns[\s\S]*?<\/svg>/g,
        "" + fs.readFileSync("./rh-icons.svg")
      )
    )
    .pipe(gulp.dest("./"));
});

gulp.task("svgs", gulp.series("svgSprite", "stuffSprite"));

gulp.task("default", gulp.series("svgs", "merge", "compile"));

gulp.task("dev", gulp.series("svgs", "merge", "compile", "watch"));
