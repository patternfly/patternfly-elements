module.exports = function factory({
  elementName,
  className,
  precompile = ["clean", "compress"]
} = {}) {
  const fs = require("fs");
  const path = require("path");

  const gulp = require("gulp");
  const rename = require("gulp-rename");
  const replace = require("gulp-replace");
  const stripCssComments = require("strip-css-comments");
  const trim = require("trim");
  const decomment = require("decomment");
  const sass = require("node-sass");
  const shell = require("gulp-shell");
  const clean = require("gulp-clean");
  const terser = require("gulp-terser");

  const paths = {
    base: "./",
    src: "./src",
    dist: "./dist",
    test: "./test",
    temp: "./tmp",
    demo: "./demo"
  };

  gulp.task("merge", () => {
    return gulp
      .src(path.join(paths.src, `${elementName}.js`))
      .pipe(
        replace(
          /extends\s+PFElement\s+{/g,
          (classStatement, character, jsFile) => {
            // extract the templateUrl and styleUrl with regex.  Would prefer to do
            // this by require'ing rh-something.js and asking it directly, but without
            // node.js support for ES modules, we're stuck with this.
            const oneLineFile = jsFile
              .slice(character)
              .split("\n")
              .join(" ");
            const [
              ,
              templateUrl
            ] = /get\s+templateUrl\([^)]*\)\s*{\s*return\s+"([^"]+)"/.exec(
              oneLineFile
            );

            let html = fs
              .readFileSync(path.join(paths.src, templateUrl))
              .toString()
              .trim();

            html = decomment(html);

            const [
              ,
              styleUrl
            ] = /get\s+styleUrl\([^)]*\)\s*{\s*return\s+"([^"]+)"/.exec(
              oneLineFile
            );

            const styleFilePath = path.join(paths.src, styleUrl);

            let cssResult = sass.renderSync({
              file: styleFilePath
            }).css;

            cssResult = stripCssComments(cssResult).trim();

            return `${classStatement}
  get html() {
    return \`
<style>
${cssResult}
</style>
${html}\`;
  }
`;
          }
        )
      )
      .pipe(gulp.dest(paths.temp));
  });

  gulp.task("clean", () => {
    return gulp
      .src(path.join(paths.dist, "*"), { read: false, allowEmpty: true })
      .pipe(clean());
  });

  gulp.task("compress", () => {
    return gulp
      .src(path.join(paths.temp, `${elementName}.js`))
      .pipe(
        terser({
          mangle: false,
          ecma: 6
        })
      )
      .pipe(gulp.dest(paths.dist));
  });

  gulp.task("compile", () => {
    return gulp
      .src(path.join(paths.src, `${elementName}.js`))
      .pipe(
        replace(
          /^(import .*?)(['"]\.\.\/(?!\.\.\/).*)\.js(['"];)$/gm,
          "$1$2.umd$3"
        )
      )
      .pipe(
        rename({
          suffix: ".umd"
        })
      )
      .pipe(gulp.dest(paths.dist));
  });

  gulp.task("copy:assets", () => {
    return gulp
      .src(["LICENSE.txt", "README.md", "package.json"], {
        cwd: paths.base
      })
      .pipe(gulp.dest(paths.dist));
  });

  gulp.task("watch", () => {
    return gulp.watch(path.join(paths.src, "*"), gulp.series("build"));
  });

  gulp.task("bundle", shell.task("../../node_modules/.bin/rollup -c"));

  gulp.task("clean:temp", () => {
    return gulp
      .src(paths.temp, { read: false, allowEmpty: true })
      .pipe(clean());
  });

  const buildTasks = [
    "merge",
    ...precompile,
    "copy:assets",
    "compile",
    "bundle",
    "clean:temp"
  ];

  gulp.task("build", gulp.series(...buildTasks));

  gulp.task("default", gulp.series("build"));

  gulp.task("dev", gulp.series("build", "watch"));

  return gulp;
};
