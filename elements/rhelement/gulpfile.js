const path = require("path");
const fs = require("fs");

const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const cleanCSS = require("gulp-clean-css");
const trim = require("gulp-trim");
const del = require("del");
let watcher;

gulp.task("clean", () => {
  return del(["./**/*.umd.*", "./*.min.css"]);
});

gulp.task("compile", () => {
  return gulp
    .src(
      [
        "./*.js",
        "./utilities/*.js",
        "!./gulpfile.js",
        "!./*.story.js",
        "!./rollup.config.js"
      ],
      {
        base: "."
      }
    )
    .pipe(
      replace(
        /^(import .*?)(['"]\.\.?\/(?!\.\.\/).*)(\.js['"];)$/gm,
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

gulp.task("minify-css", () => {
  return gulp
    .src("./*.css")
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("./"));
});

gulp.task("watch", () => {
  watcher = gulp.watch(
    ["./rhelement.js"],
    gulp.series("clean", "compile", "minify-css")
  );
  return watcher;
});

gulp.task("default", gulp.series("clean", "compile", "minify-css"));

gulp.task("dev", gulp.series("default", "watch"));
