const path = require("path");
const fs = require("fs");

const gulp = require("gulp");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
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

gulp.task("default", gulp.series("clean", "compile"));

gulp.task("dev", gulp.series("default"));
