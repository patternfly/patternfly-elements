const {
  task,
  src,
  dest,
  watch,
  parallel,
  series
} = require("gulp");

const browser_support = [
  "last 2 versions",
  "Firefox > 51",
  "iOS > 7",
  "ie 11"
];

const paths = {
  source: "./src",
  compiled: "./",
  temp: "./tmp"
};

// Tooling
const fs = require("fs");
const path = require("path");
const replace = require("gulp-replace");
const clean = require("gulp-clean");

// JavaScript
const rename = require("gulp-rename");

// Styles
const sass = require("gulp-sass");
sass.compiler = require("node-sass");

const postcss = require('gulp-postcss');
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcssCustomProperties = require("postcss-custom-properties");

// Compile the sass into css, compress, autoprefix
task("compile:sass", () => {
  return src("pfe-{base,layouts}.scss", {
      cwd: paths.source
    })
    .pipe(sourcemaps.init())
    // Compile the Sass into CSS
    .pipe(
      sass({
        outputStyle: "expanded"
      }).on("error", sass.logError)
    )
    // Adds autoprefixing to the compiled sass
    .pipe(
      postcss([
        postcssCustomProperties(),
        autoprefixer(browser_support)
      ])
    )
    // Write the sourcemap
    .pipe(sourcemaps.write(paths.compiled))
    // Output the unminified file
    .pipe(dest(paths.compiled));
});

task("minify:css", () => {
  return src(["pfe-{base,layouts}.css"], {
      cwd: paths.compiled
    })
    // Minify the file
    .pipe(
      cleanCSS({
        compatibility: "ie11"
      })
    )
    // Add the .min suffix
    .pipe(rename({
      suffix: ".min"
    }))
    // Output the minified file
    .pipe(dest(paths.compiled));
});

task("clean", () => {
  return src([
      `*.{css,map}`
    ], {
      cwd: paths.compiled,
      read: false,
      allowEmpty: true
    })
    .pipe(clean());
});

task("build", series("clean", "compile:sass", "minify:css"));

task("watch", () => {
  return watch(path.join(paths.source, "*"), series("build"));
});

task("dev", parallel("build", "watch"));

task("default", series("build"));
