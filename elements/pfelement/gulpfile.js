const path = require("path");
const fs = require("fs");
const del = require("del");

const gulp = require("gulp");
const shell = require("gulp-shell");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const cleanCSS = require("gulp-clean-css");
const trim = require("gulp-trim");
const banner = require("gulp-banner");

gulp.task("clean", () => {
  return del(["pfelement.js", "./**/*.umd.*", "./*.css", "./*.js.map"]);
});

gulp.task("compile", () => {
  return gulp
    .src(["./pfelement.js", "./reveal.js"])
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

gulp.task("copy", () => {
  return gulp
    .src(["./src/*"])
    .pipe(
      banner(
        `/*\n${fs
          .readFileSync("LICENSE.txt", "utf8")
          .split("\n")
          .map(line => ` * ${line}\n`)
          .join("")}*/\n\n`
      )
    )
    .pipe(gulp.dest("./"));
});

gulp.task("minify-css", () => {
  return gulp
    .src("./src/*.css")
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("./"));
});

gulp.task("watch", () => {
  return gulp.watch("./src/**/*", gulp.series("build"));
});

gulp.task("bundle", shell.task("../../node_modules/.bin/rollup -c"));

gulp.task(
  "build",
  gulp.series("clean", "copy", "compile", "minify-css", "bundle")
);

gulp.task("default", gulp.series("build"));

gulp.task("dev", gulp.series("build", "watch"));
