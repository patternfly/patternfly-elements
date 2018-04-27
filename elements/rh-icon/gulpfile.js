const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const sass = require("gulp-sass");
const nodesass = require("node-sass");
const stripCssComments = require("strip-css-comments");
const gulpStripCssComments = require("gulp-strip-css-comments");
const trim = require("gulp-trim");
const del = require("del");
const fs = require("fs");

const path = require("path");
const svgSprite = require("gulp-svg-sprite");

let watcher;

gulp.task("clean", () => {
  return del(["./*.compiled.*"]);
});

gulp.task("sass", () => {
  return gulp
    .src(["./*.scss"])
    .pipe(sass())
    .pipe(gulpStripCssComments())
    .pipe(trim())
    .pipe(sass.sync().on("error", sass.logError))
    .pipe(gulp.dest("./"));
});

gulp.task("replaceStyles", () => {
  return gulp
    .src("./rh-icon.js")
    .pipe(
      replace(/(iconTemplate\.innerHTML = `)(`;)/, (match, p1, p2) => {
        const html = fs
          .readFileSync("./src/rh-icon.html")
          .toString()
          .trim();

        const cssResult = nodesass.renderSync({
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
    .src("./src/rh-icon.js")
    .pipe(
      replace(
        /<svg xmlns[\s\S]*?<\/svg>/g,
        "" + fs.readFileSync("./rh-icons.svg")
      )
    )
    .pipe(gulp.dest("./"));
});

gulp.task("compile", () => {
  return gulp
    .src(["./rh-icon.js"])
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

gulp.task("stopwatch", done => {
  watcher.close();
  done();
});

gulp.task("watch", () => {
  watcher = gulp.watch(
    ["./rh-icon.js", "./*.scss"],
    gulp.series(
      "stopwatch",
      "sass",
      "replaceStyles",
      "clean",
      "compile",
      "watch"
    )
  );
  return watcher;
});

gulp.task("svgs", gulp.series("svgSprite", "stuffSprite"));

gulp.task(
  "default",
  gulp.series("clean", "sass", "svgs", "replaceStyles", "compile")
);

gulp.task("dev", gulp.series("default", "watch"));
