// Custom compilation tasks
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
const clean = require("gulp-clean");
const terser = require("gulp-terser");

const paths = {
  base: "./",
  src: "./src",
  dist: "./dist",
  test: "./test",
  temp: "./tmp",
  demo: "./demo"
};

gulp.task("clean", () => {
  return gulp
    .src(path.join(paths.dist, "*"), { read: false, allowEmpty: true })
    .pipe(clean());
});

gulp.task("copy", () => {
  return gulp.src(path.join(paths.src, "**/*")).pipe(gulp.dest(paths.dist));
});

gulp.task("watch", () => {
  return gulp.watch(path.join(paths.src, "*"), gulp.series("build"));
});

const buildTasks = ["clean", "copy"];

gulp.task("build", gulp.series(...buildTasks));

gulp.task("default", gulp.series("build"));

gulp.task("dev", gulp.series("build", "watch"));
