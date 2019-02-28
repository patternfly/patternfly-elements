// rollup.config.js
const gulpFactory = require("../../scripts/gulpfile.factory.js");
const pfelementPackage = require("./package.json");

const fs = require("fs");
const gulp = require("gulp");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const svgSprite = require("gulp-svg-sprite");

// Custom gulp tasks for pfe-icon
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
    .pipe(rename("pfe-icons.svg"))
    .pipe(gulp.dest("./"));
});

gulp.task("stuffSprite", () => {
  return gulp
    .src("./pfe-icon.js")
    .pipe(
      replace(
        /<svg xmlns[\s\S]*?<\/svg>/g,
        "" + fs.readFileSync("./pfe-icons.svg")
      )
    )
    .pipe(gulp.dest("./"));
});

gulp.task("combineAndStuff", gulp.series("svgSprite", "stuffSprite"));

// call the central gulp build, and pass in the custom tasks to be run pre-bundle
gulpFactory({
  ...pfelementPackage.pfelement,
  prebundle: ["combineAndStuff"]
});
