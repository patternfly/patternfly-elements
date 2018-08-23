const path = require("path");
const fs = require("fs");

const gulp = require("gulp");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const shell = require("gulp-shell");
const del = require("del");

gulp.task("clean", () => {
  return del(["./*.umd.*"]);
});

gulp.task("compile", () => {
  return gulp
    .src(["./*.js", "!./gulpfile.js"])
    .pipe(
      rename({
        suffix: ".umd"
      })
    )
    .pipe(gulp.dest("./"));
});

gulp.task("bundle", shell.task("../../node_modules/.bin/rollup -c"));

gulp.task("build", gulp.series("clean", "compile", "bundle"));

gulp.task("default", ["build"]);

gulp.task("dev", ["build"]);
