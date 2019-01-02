const fs = require("fs");

const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const stripCssComments = require("gulp-strip-css-comments");
const cleanCSS = require("gulp-clean-css");
const trim = require("gulp-trim");
const del = require("del");
let watcher;

gulp.task("clean", () => {
  return del(["./*.css", "./*.min.css"]);
});

gulp.task("sass", () => {
  return gulp
    .src(["./src/*.scss"])
    .pipe(sass())
    .pipe(stripCssComments())
    .pipe(trim())
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

gulp.task("stopwatch", done => {
  watcher.close();
  done();
});

gulp.task("watch", () => {
  watcher = gulp.watch(
    ["./src/*.scss"],
    gulp.series("stopwatch", "sass", "watch")
  );
  return watcher;
});

gulp.task("build", gulp.series("clean", "sass", "minify-css"));

gulp.task("default", gulp.series("build"));

gulp.task("dev", gulp.series("default", "watch"));
