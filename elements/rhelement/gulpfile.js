const path = require("path");
const fs = require("fs");

const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const replace = require("gulp-replace");

const trim = require("gulp-trim");
const del = require("del");
let watcher;

gulp.task("clean", () => {
  return del(["./*.umd.*"]);
});

gulp.task("compile", () => {
  return gulp
    .src(["./rhelement.js"])
    .pipe(
      replace(
        /^(import .*?)(['"]\.\.\/(?!\.\.\/).*)(\.js['"];)$/gm,
        "$1$2.umd$3"
      )
    )
    .pipe(gulp.dest("./"));
});

gulp.task("watch", () => {
  watcher = gulp.watch(["./rhelement.js"], gulp.series("clean", "compile"));
  return watcher;
});

gulp.task("default", gulp.series("clean", "compile"));

gulp.task("dev", gulp.series("default", "watch"));
