const path = require("path");
const fs = require("fs");

const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const sass = require("node-sass");
const stripCssComments = require("strip-css-comments");
const gulpStripCssComments = require("gulp-strip-css-comments");
const trim = require("gulp-trim");
const del = require("del");

const svgSprite = require("gulp-svg-sprite");

let watcher;

gulp.task("clean", () => {
  return del(["./*.compiled.*"]);
});

gulp.task("replaceStyles", () => {
  return gulp
    .src("./rh-icon.js")
    .pipe(
      replace(/extends\s+Rhelement\s+{/, (classStatement, line, jsFile) => {
        // extract the templateUrl and styleUrl with regex.  Would prefer to do
        // this by require'ing rh-card.js and asking it directly, but without
        // node.js support for ES modules, we're stuck with this.
        const oneLineFile = jsFile.split("\n").join(" ");
        const [
          ,
          templateUrl
        ] = /get\s+templateUrl\([^)]*\)\s*{\s*return\s+"([^"]+)"/.exec(
          oneLineFile
        );
        const [
          ,
          styleUrl
        ] = /get\s+styleUrl\([^)]*\)\s*{\s*return\s+"([^"]+)"/.exec(
          oneLineFile
        );

        const html = fs
          .readFileSync(path.join("./src", templateUrl))
          .toString()
          .trim();

        const cssResult = sass.renderSync({
          file: path.join("./src", styleUrl)
        }).css;

        return `${classStatement}
  get html() {
    return \`
<style>
${stripCssComments(cssResult).trim()}
</style>

${html}\`;
  }
`;
      })
    )
    .pipe(gulp.dest("./"));
});

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
    .pipe(rename("rh-icons.svg"))
    .pipe(gulp.dest("./"));
});

gulp.task("stuffSprite", () => {
  return gulp
    .src("./src/rh-icon.js")
    .pipe(
      replace(
        /<svg xmlns[\s\S]*?<\/svg>/g,
        "" + fs.readFileSync("./rh-icons.svg")
      )
    )
    .pipe(gulp.dest("./"));
});

gulp.task("compile", () => {
  return gulp
    .src(["./rh-icon.js"])
    .pipe(
      replace(
        /^(import .*?)(['"]\.\.\/(?!\.\.\/).*)(\.js['"];)$/gm,
        "$1$2.compiled$3"
      )
    )
    .pipe(babel())
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".compiled"
      })
    )
    .pipe(gulp.dest("./"));
});

gulp.task("stopwatch", done => {
  watcher.close();
  done();
});

gulp.task("watch", () => {
  watcher = gulp.watch(
    ["./rh-icon.js", "./*.scss"],
    gulp.series("stopwatch", "replaceStyles", "clean", "compile", "watch")
  );
  return watcher;
});

gulp.task("svgs", gulp.series("svgSprite", "stuffSprite"));

gulp.task("default", gulp.series("clean", "svgs", "replaceStyles", "compile"));

gulp.task("dev", gulp.series("default", "watch"));
