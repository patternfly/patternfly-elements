const {
  task,
  src,
  watch,
  series
} = require("gulp");

// const pfelementPackage = require("./package.json");
// const version = pfelementPackage.version;
// const elementName = pfelementPackage.pfelement.elementName;

const paths = {
  source: "./",
  compiled: "./",
  temp: "./_temp"
};

const clean = require("gulp-clean");
const sassdoc = require("sassdoc");

// Delete the demo assets
task("clean", () => src(["demo/*.html", "demo/assets"], {
  cwd: paths.compiled,
  read: false,
  allowEmpty: true
}).pipe(clean()));

task("build:sassdoc", () => src(["{extends,functions,maps,mixins,variables}/_*.scss", "pfe-sass.scss"], {
  cwd: paths.compiled,
  allowEmpty: true
}).pipe(sassdoc()));

task("build", series("clean", "build:sassdoc"));

task("watch", async () => {
  watch(["{extends,functions,maps,mixins,variables}/_*.scss", "pfe-sass.scss"], {
    cwd: paths.compiled
  }, series("build:sassdoc"));
});

task("dev", series("build", "watch"));

task("default", series("build"));
