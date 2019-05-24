// rollup.config.js
const gulpFactory = require("../../scripts/gulpfile.factory.js");
const pfelementPackage = require("./package.json");

const { task, src, dest, watch, parallel, series } = require("gulp");
const clean = require("gulp-clean");
const mergeStream = require("merge-stream");
const globSass = require("gulp-sass-globbing");

// Delete the temp directory
task("clean", () => {
    return src([
      "__*.scss"
    ], {
      cwd: "./",
      read: false,
      allowEmpty: true
    }).pipe(clean());
  });

// Custom gulp tasks for pfe-icon
task("sass:globbing", () => {
    let stream = mergeStream();
    ["extends", "functions", "maps", "mixins", "variables"].forEach((folder) => {
        stream.add(src(`./src/${folder}/_*.scss`)
            .pipe(globSass({
                path: `__${folder}.scss`
            }))
            .pipe(dest("./"))
        );
    });

    return stream;
});

task("build", series(
    "clean",
    "sass:globbing"
  )
);

task("watch", () => {
  return watch([
      "_*/_*.scss",
      "pfe-sass.scss"
    ], series("build"));
});

task("dev", parallel("build", "watch"));

task("default", series("build"));
