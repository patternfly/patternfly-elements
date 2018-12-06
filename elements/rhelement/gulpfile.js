const path = require("path");
const fs = require("fs");
const del = require("del");

const gulp = require("gulp");
const shell = require("gulp-shell");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const cleanCSS = require("gulp-clean-css");
const trim = require("gulp-trim");
const clean = require("gulp-clean");

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
  return gulp.src(path.join(paths.src, "*")).pipe(gulp.dest(paths.dist));
});

// Deprecated clean task
// gulp.task("clean", () => {
//   return del(["rhelement.js", "./**/*.umd.*", "./*.css", "./*.js.map"]);
// });

gulp.task("compile", () => {
  return gulp
    .src(["rhelement.js", "reveal.js"], { cwd: paths.dist })
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
    .pipe(gulp.dest(paths.dist));
});

gulp.task("minify-css", () => {
  return gulp
    .src(path.join(paths.src, "*.css"))
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest(paths.dist));
});

gulp.task("watch", () => {
  return gulp.watch(path.join(paths.src, "**/*"), gulp.series("build"));
});

gulp.task("bundle", shell.task("../../node_modules/.bin/rollup -c"));

gulp.task(
  "build",
  gulp.series("clean", "copy", "compile", "minify-css", "bundle")
);

gulp.task("default", gulp.series("build"));

gulp.task("dev", gulp.series("build", "watch"));
