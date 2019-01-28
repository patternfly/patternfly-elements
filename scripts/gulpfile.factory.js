module.exports = function factory({
  elementName,
  className,
  precompile = []
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
  const banner = require("gulp-banner");

  gulp.task("merge", () => {
    return gulp
      .src(`./src/${elementName}.js`)
      .pipe(
        replace(
          /extends\s+PFElement\s+{/g,
          (classStatement, character, jsFile) => {
            // Extract the urls for template, style, and schema
            // -- Would prefer to do this by require'ing and asking it directly, but without
            //    node.js support for ES modules, we're stuck with this.
            const oneLineFile = jsFile
              .slice(character)
              .split("\n")
              .join(" ");

            let url = {};
            ["template", "style", "schema"].forEach(type => {
              const re = new RegExp(
                `get\\s+${type}Url\\([^)]*\\)\\s*{\\s*return\\s+"([^"]+)"`,
                "g"
              );
              const parse = re.exec(oneLineFile);
              url[type] =
                typeof parse === "object" && parse !== null ? parse[1] : null;
            });

            let html = "";
            let cssResult = "";
            let properties = "";
            let slots = "";

            let pathDefined = url.template !== null;
            let fileExists = fs.existsSync(path.join("./src", url.template));
            if (pathDefined && fileExists) {
              html = fs
                .readFileSync(path.join("./src", url.template))
                .toString()
                .trim();
              html = decomment(html);
            }

            pathDefined = url.style !== null;
            fileExists = fs.existsSync(path.join("./src", url.style));
            if (pathDefined && fileExists) {
              let rawCSS = sass.renderSync({
                file: path.join("./src", url.style)
              }).css;
              rawCSS = stripCssComments(rawCSS).trim();
              if (rawCSS.toString() !== "") {
                cssResult = `<style>${rawCSS}</style>`;
              }
            }

            pathDefined = url.schema !== null;
            fileExists = fs.existsSync(path.join("./src", url.schema));
            if (pathDefined && fileExists) {
              properties = "{}";
              slots = "{}";
              let schemaObj = JSON.parse(
                fs.readFileSync(path.join("./src", url.schema))
              );
              if (schemaObj && typeof schemaObj === "object") {
                if (schemaObj.properties.attributes) {
                  properties = schemaObj.properties.attributes.properties;
                  properties = JSON.stringify(properties);
                }
                if (schemaObj.properties.slots) {
                  slots = schemaObj.properties.slots.properties;
                  slots = JSON.stringify(slots);
                }
              }
            }

            return `${classStatement}
  get html() {
    return \`${cssResult}
${html}\`;
  }${
    properties
      ? `

  static get properties() {
    return ${properties};
  }`
      : ""
  }${
              slots
                ? `

  static get slots() {
    return ${slots};
  }`
                : ""
            }
`;
          }
        )
      )
      .pipe(
        banner(
          `/*\n${fs
            .readFileSync("LICENSE.txt", "utf8")
            .split("\n")
            .map(line => ` * ${line}\n`)
            .join("")}*/\n\n`
        )
      )
      .pipe(gulp.dest("./"));
  });

  gulp.task("compile", () => {
    return gulp
      .src(`./${elementName}.js`)
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
      .pipe(gulp.dest("./"));
  });

  gulp.task("watch", () => {
    return gulp.watch("./src/*", gulp.series("build"));
  });

  gulp.task("bundle", shell.task("../../node_modules/.bin/rollup -c"));

  const buildTasks = ["merge", ...precompile, "compile", "bundle"];

  gulp.task("build", gulp.series(...buildTasks));

  gulp.task("default", gulp.series("build"));

  gulp.task("dev", gulp.series("build", "watch"));

  return gulp;
};
