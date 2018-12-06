// rollup.config.js
const gulpFactory = require("../../scripts/gulpfile.factory.js");
const rhelementPackage = require("./package.json");

const fs = require("fs");
const path = require("path");
const gulp = require("gulp");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const svgSprite = require("gulp-svg-sprite");

const paths = {
  base: "./",
  src: "./src",
  dist: "./dist",
  test: "./test",
  temp: "./tmp",
  demo: "./demo"
};

// Custom gulp tasks for rh-icon
gulp.task("svgSprite", function() {
  return gulp
    .src("./svg/*.svg")
    .pipe(
      svgSprite({
        mode: {
          symbol: true
        },
        svg: {
          xmlDeclaration: false,
          doctypeDeclaration: false,
          namespaceIDs: false,
          namespaceClassnames: false,
          preserveAspectRatio: true
        }
      })
    )
    .pipe(rename("rh-icons.svg"))
    .pipe(gulp.dest(paths.temp));
});

gulp.task("stuffSprite", () => {
  return gulp
    .src(path.join(paths.src, "rh-icon.js"))
    .pipe(
      replace(
        /<svg xmlns[\s\S]*?<\/svg>/g,
        "" + fs.readFileSync(path.join(paths.temp, "rh-icons.svg"))
      )
    )
    .pipe(gulp.dest(paths.dist));
});

gulp.task("combineAndStuff", gulp.series("svgSprite", "stuffSprite"));

// call the central gulp build, and pass in the custom tasks to be run pre-bundle
gulpFactory({
  ...rhelementPackage.rhelement,
  precompile: ["combineAndStuff"]
});
