const {
  task,
  src,
  dest,
  watch,
  parallel,
  series
} = require("gulp");

const pfelementPackage = require("./package.json");
const version = pfelementPackage.version;
const elementName = pfelementPackage.pfelement.elementName;

const paths = {
  source: "./",
  compiled: "./",
  temp: "./_temp"
};

const clean = require("gulp-clean");
const mergeStream = require("merge-stream");
const globSass = require("gulp-sass-globbing");
const sassdoc = require("sassdoc");

// Delete the temp directory
task("clean", () => {
  return src(["__*.scss", "demo/*.html", "demo/assets"], {
    cwd: paths.compiled,
    read: false,
    allowEmpty: true
  }).pipe(clean());
});

// Custom gulp for sass globbing
task("sass:globbing", () => {
  let stream = mergeStream();
  ["extends", "functions", "maps", "mixins", "variables"].forEach(folder => {
    stream.add(
      src([
        `${folder}/_*.scss`
        // `!${folder}/_deprecated*.scss`,
      ])
      .pipe(
        globSass({
          path: `__${folder}.scss`
        }, {
          signature: `// generated with sass globbing, v${version}`
        })
      )
      .pipe(dest(paths.compiled))
    );
  });

  return stream;
});

task("build:sassdoc", () => {
  return src(["{extends,functions,maps,mixins,variables}/_*.scss", "pfe-sass.scss"], {
    cwd: paths.compiled,
    allowEmpty: true
  }).pipe(sassdoc());
});

task("build", series("clean", parallel("build:sassdoc", "sass:globbing")));

task("watch", () => watch(
  ["{extends,functions,maps,mixins,variables}/_*.scss", "pfe-sass.scss"], {
    cwd: paths.compiled
  },
  series("build")
));

task("dev", parallel("build", "watch"));

task("default", series("build"));
