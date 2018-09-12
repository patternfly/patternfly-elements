const path = require("path");
const fs = require("fs");
const del = require("del");

const gulp = require("gulp");
const shell = require("gulp-shell");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const cleanCSS = require("gulp-clean-css");
const trim = require("gulp-trim");

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
  return gulp.watch("./rhelement.js", gulp.series("build"));
});

gulp.task("bundle", shell.task("../../node_modules/.bin/rollup -c"));

gulp.task("build", gulp.series("clean", "compile", "minify-css", "bundle"));

gulp.task("default", gulp.series("build"));

gulp.task("dev", gulp.series("build", "watch"));
