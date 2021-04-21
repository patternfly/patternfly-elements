const gulpFactory = require("../../scripts/gulpfile.factory.js");
const pfelementPackage = require("./package.json");

const { task, src, series } = require("gulp");
const jsdoc = require("gulp-jsdoc3");
const del = require("del");

task("clean:jsdoc", () =>
  del(["demo/**", "!demo/example.html"], {
    read: false,
    allowEmpty: true
  })
);

task("build:jsdoc", cb => {
  src(["README.md", "dist/pfelement.js"], {
    read: false,
    allowEmpty: true
  }).pipe(
    jsdoc(
      {
        opts: {
          destination: "demo/",
          template: "../../node_modules/foodoc/template"
        },
        // https://github.com/steveush/foodoc#configuring-the-template
        templates: {
          systemName: "PatternFly Elements",
          systemSummary: "A set of community-created web components based on PatternFly design.",
          systemLogo: "../../brand/logo/svg/pfe-icon-white-shaded.svg",
          favicon: "../../brand/logo/svg/pfe-icon-blue-shaded.svg",
          systemColor: "rgb(0, 64, 128)",
          copyright: "©2021 Red Hat, Inc.",
          includeDate: true,
          dateFormat: "YYYY MMM DD",
          showAccessFilter: false,
          collapseSymbols: false,
          stylesheets: ["../pfe-styles/dist/pfe-base.min.css"]
        }
      },
      cb
    )
  );
});

task("jsdoc", series("clean:jsdoc", "build:jsdoc"));

gulpFactory(Object.assign(pfelementPackage, { postbundle: ["jsdoc"] }));
