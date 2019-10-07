// rollup.config.js
const gulpFactory = require("../../scripts/gulpfile.factory.js");
const pfelementPackage = require("./package.json");

const { task, src, dest, watch, parallel, series } = require("gulp");

const paths = {
  source: "./src",
  compiled: "./",
  temp: "./_temp"
};

const fs = require("fs");
const mergeStream = require("merge-stream");
const globSass = require("gulp-sass-globbing");

const banner = require("gulp-banner");

// Custom gulp for sass globbing
task("sass:globbing", () => {
    let stream = mergeStream();
    ["extends", "functions", "maps", "mixins", "variables"].forEach((folder) => {
        stream.add(src(`${paths.source}/${folder}/_*.scss`)
            .pipe(globSass({
                path: `__${folder}.scss`
            }))
            .pipe(dest(paths.compiled))
        );
    });

    return stream;
});

task("copy:sass", () => {
  return src(["pfe-sass.scss"], {
    cwd: paths.source
  }).pipe(dest(paths.compiled));
});

gulpFactory(pfelementPackage);
