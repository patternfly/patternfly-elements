const { task, src, dest, watch, parallel, series } = require("gulp");

const pfelementPackage = require("./package.json");
const version = pfelementPackage.version;
const elementName = pfelementPackage.pfelement.elementName;

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
  return src(["*.scss", paths.temp], {
    cwd: paths.compiled,
    read: false,
    allowEmpty: true
  }).pipe(clean());
});

task("copy:sass", () => {
  return src([`${elementName}.scss`], {
    cwd: paths.source
  }).pipe(dest(paths.compiled));
});

// Custom gulp for sass globbing
task("sass:globbing", () => {
    let stream = mergeStream();
    ["extends", "functions", "mixins", "variables"].forEach((folder) => {
        stream.add(src([`${folder}/_*.scss`], {
          cwd: paths.source
        })
          .pipe(globSass({
              path: `__${folder}.scss`
          }, {
            signature: `// generated with sass globbing, v${version}`
          }))
          .pipe(dest(paths.compiled))
        );
    });

    return stream;
});

task("build", series("clean", "copy:sass", "sass:globbing"));

task("watch", () => {
  return watch(path.join(paths.source, "*"), series("build"));
});

task("dev", parallel("build", "watch"));

task("default", series("build"));
