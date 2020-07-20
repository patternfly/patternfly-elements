const { task, src, dest, watch, parallel, series } = require("gulp");

const pfelementPackage = require("./package.json");
const version = pfelementPackage.version;
const elementName = pfelementPackage.pfelement.elementName;

const paths = {
  source: "./src",
  compiled: "./",
  temp: "./_temp"
};

const path = require("path");
const clean = require("gulp-clean");
const mergeStream = require("merge-stream");
const globSass = require("gulp-sass-globbing");

// Delete the temp directory
task("clean", () => {
  return src(["__*.scss"], {
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
          globSass(
            {
              path: `__${folder}.scss`
            },
            {
              signature: `// generated with sass globbing, v${version}`
            }
          )
        )
        .pipe(dest(paths.compiled))
    );
  });

  return stream;
});

task("build", series("clean", "sass:globbing"));

task("watch", () => {
  return watch(
    ["{extends,functions,maps,mixins,variables}/_*.scss", "pfe-sass.scss"],
    {
      cwd: paths.compiled
    },
    series("build")
  );
});

task("dev", parallel("build", "watch"));

task("default", series("build"));
