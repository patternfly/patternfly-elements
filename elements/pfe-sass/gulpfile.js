// rollup.config.js
const gulpFactory = require("../../scripts/gulpfile.factory.js");
const pfelementPackage = require("./package.json");

const { task, src, dest, watch, parallel, series } = require("gulp");

const fs = require("fs");

const clean = require("gulp-clean");
const mergeStream = require("merge-stream");
const globSass = require("gulp-sass-globbing");

const banner = require("gulp-banner");

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

task("prepend:license", () => {
  return src("pfe-sass.scss", {
    cwd: "./src"
  })
  .pipe(
    banner(
      `/*\n * @license\n${fs
        .readFileSync("LICENSE.txt", "utf8")
        .split("\n")
        .map(line => ` * ${line}\n`)
        .join("")}*/\n\n`
    )
  )
  .pipe(dest("./"));
});

task("build", series(
    "clean",
    "sass:globbing",
    "prepend:license"
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
