const path = require("path");
const fs = require("fs");

const gulp = require("gulp");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const sass = require("gulp-sass");
const stripCssComments = require("gulp-strip-css-comments");
const trim = require("gulp-trim");
const del = require("del");
const shell = require("gulp-shell");

let watcher;

const paths = {
  base: "./",
  src: "./src",
  dist: "./dist",
  test: "./test",
  temp: "./tmp",
  demo: "./demo"
};

gulp.task("clean", () => {
  return del([path.join(paths.dist, "*")]);
});

gulp.task("sass", () => {
  return gulp
    .src([path.join(paths.src, "*.scss")])
    .pipe(sass())
    .pipe(stripCssComments())
    .pipe(trim())
    .pipe(gulp.dest(paths.dist));
});

gulp.task("replaceStyles", () => {
  return gulp
    .src(path.join(paths.src, "cp-theme.js"))
    .pipe(
      replace(
        /<style id="\${templateId}-style"><\/style>/g,
        '<style id="${templateId}-style">' +
          fs.readFileSync(path.join(paths.dist, "cp-theme.css")) +
          "</style>"
      )
    )
    .pipe(gulp.dest(paths.dist));
});

gulp.task("compile", () => {
  return gulp
    .src([path.join(paths.dist, "cp-theme.js")])
    .pipe(
      rename({
        suffix: ".umd"
      })
    )
    .pipe(gulp.dest(paths.dist));
});

gulp.task("stopwatch", done => {
  watcher.close();
  done();
});

gulp.task("watch", () => {
  watcher = gulp.watch(
    [path.join(paths.src, "*")],
    gulp.series("stopwatch", "build", "watch")
  );
  return watcher;
});

gulp.task("bundle", shell.task("../../node_modules/.bin/rollup -c"));

gulp.task(
  "build",
  gulp.series("clean", "sass", "replaceStyles", "compile", "bundle")
);

gulp.task("default", gulp.series("build"));

gulp.task("dev", gulp.series("default", "watch"));
