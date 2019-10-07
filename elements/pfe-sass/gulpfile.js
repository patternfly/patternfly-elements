const { task, src, dest, watch, parallel, series } = require("gulp");

const pfelementPackage = require("./package.json");

const paths = {
  source: "./src",
  compiled: "./",
  temp: "./_temp"
};

const clean = require("gulp-clean");
const mergeStream = require("merge-stream");
const globSass = require("gulp-sass-globbing");

// Delete the temp directory
task("clean", () => {
  return src(["*.{js,css,map}", "!gulpfile.js", "!rollup.config.js", paths.temp], {
    cwd: paths.compiled,
    read: false,
    allowEmpty: true
  }).pipe(clean());
});

// Custom gulp for sass globbing
task("sass:globbing", () => {
    let stream = mergeStream();
    ["extends", "functions", "maps", "mixins", "variables"].forEach((folder) => {
        stream.add(src(`${paths.source}/${folder}/_*.scss`)
            .pipe(globSass({
                path: `__${folder}.scss`
            }, {
              signature: `// generated with sass globbing, v${pfelementPackage.version}`
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

task("build", series("clean", "sass:globbing", "copy:sass"));

task("watch", () => {
  return watch(path.join(paths.source, "*"), series("build"));
});

task("dev", parallel("build", "watch"));

task("default", series("build"));
