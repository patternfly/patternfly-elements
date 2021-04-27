module.exports = function factory({
  version,
  pfelement: { elementName, className, assets = [] },
  prebundle = [],
  postbundle = []
} = {}) {
  elementName = elementName.replace(/s$/, "");
  const {
    task,
    src,
    dest,
    watch,
    parallel,
    series
  } = require("gulp");

  // const sassdoc = require("sassdoc");

  const paths = {
    root: "./",
    source: "./src",
    compiled: "./dist",
    temp: "./_temp"
  };

  // Append a set of default files for publication
  let files = assets.concat([
    `${elementName}.js`,
    `${elementName}--*.css`,
    `${elementName}--*.min.css`,
    `${elementName}*.map`,
    `${elementName}.json`
  ]);

  // Dedupe any items
  files = files.filter((item, index) => files.indexOf(item) === index);

  // Tooling
  const _ = require("lodash");
  const fs = require("fs");
  const path = require("path");
  const replace = require("gulp-replace");
  const del = require("del");
  const gulpif = require("gulp-if");
  const gulpmatch = require("gulp-match");

  // Rollup
  const shell = require("gulp-shell");

  // JavaScript
  const banner = require("gulp-banner");
  const rename = require("gulp-rename");

  // Styles
  const sass = require("gulp-sass");
  sass.compiler = require("node-sass");

  const postcss = require("gulp-postcss");
  const sourcemaps = require("gulp-sourcemaps");
  const autoprefixer = require("autoprefixer");
  const cleanCSS = require("gulp-clean-css");
  const postcssCustomProperties = require("postcss-custom-properties");

  // Markup
  const decomment = require("decomment");

  // Delete the temp directory
  task("clean", () => del([paths.temp, paths.compiled], {
      cwd: paths.root,
      read: false,
      allowEmpty: true
    })
  );

  // Compile the sass into css, compress, autoprefix
  task("compile:styles", () => src(`${paths.source}/*.{scss,css}`, {
      base: paths.source
    })
    .pipe(sourcemaps.init())
    // Compile the Sass into CSS
    .pipe(
      sass({
        outputStyle: "expanded",
        // Pointing to the global node modules path
        includePaths: ["../../node_modules"]
      })
      .on("error", gulpif(!process.env.CI, sass.logError, (err) => {
        sass.logError;
        process.exit(1);
      }))
    )
    // Adds autoprefixing to the compiled sass
    .pipe(
      postcss([
        postcssCustomProperties(),
        autoprefixer({
          grid: "autoplace"
        })
      ])
    )
    // Write the sourcemap
    .pipe(sourcemaps.write(".", {
      sourceRoot: "../src"
    }))
    // Output the unminified file
    .pipe(dest(paths.temp))
    // Write the sourcemap
    .pipe(sourcemaps.write("../dist"))
  );

  // Compile the sass into css, compress, autoprefix
  task("minify:styles", () => src(`${paths.temp}/*.{scss,css}`, {
      base: paths.temp
    })
    .pipe(sourcemaps.init())
    // Minify the file
    .pipe(
      cleanCSS({
        compatibility: "ie11"
      })
    )
    // Add the .min suffix
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    // Write the sourcemap
    .pipe(sourcemaps.write(".", {
      sourceRoot: "../src"
    }))
    // Output the minified file
    .pipe(dest(paths.temp))
  );

  const getURL = (string, type) => {
    const re = new RegExp(`get\\s+${type}Url\\([^)]*\\)\\s*{\\s*return\\s+"([^"]+)"`, "g");
    const parse = re.exec(string);
    return typeof parse === "object" && parse !== null ? parse[1] : null;
  };

  const fetchHtml = url => {
    // Check for the html template
    if (url && fs.existsSync(path.join(paths.source, url))) {
      // Returns a string with the cleaned up HTML
      return decomment(
        fs
        .readFileSync(path.join(paths.source, url))
        .toString()
        .trim()
      );
    }
    return null;
  };

  const fetchStylesheet = url => {
    let result = null;
    let filename = null;
    if (url && fs.existsSync(path.join(paths.source, url))) {
      // Get the compiled css styles from the temp directory
      if (path.extname(url) === ".scss") {
        filename = path.join(paths.temp, `${path.basename(url, ".scss")}.min.css`);
      } else if (path.extname(url) === ".css") {
        filename = path.join(paths.temp, `${path.basename(url, ".css")}.min.css`);
      } else {
        console.error(`No current method exists for parsing styles in this format: *${path.extname(url)}`);
      }

      // Read in the content of the compiled file
      if (fs.existsSync(filename)) result = fs.readFileSync(filename);
      else console.error(`Compiled CSS asset ${filename} cannot be found.`);

      result = result
        .toString()
        .trim()
        .replace(/\n/, " ");
      // If the string is not empty, add to the results variable
      if (result !== "") return `\n<style>${result}</style>\n`;
    }

    return result;
  };

  const fetchProperties = url => {
    if (url && fs.existsSync(path.join(paths.source, url))) {
      let schemaObj = JSON.parse(fs.readFileSync(path.join(paths.source, url)));
      if (schemaObj && typeof schemaObj === "object" && schemaObj.properties.attributes) {
        properties = schemaObj.properties.attributes.properties;
        return JSON.stringify(properties);
      }
    }

    return "{}";
  };

  const fetchSlots = url => {
    if (url && fs.existsSync(path.join(paths.source, url))) {
      let schemaObj = JSON.parse(fs.readFileSync(path.join(paths.source, url)));
      if (schemaObj && typeof schemaObj === "object" && schemaObj.properties.slots) {
        slots = schemaObj.properties.slots.properties;
        return JSON.stringify(slots);
      }
    }

    return "{}";
  };

  const embedExternal = (classStatement, character, jsFile) => {
    // Extract the urls for template, style, and schema
    // -- Would prefer to do this by require'ing and asking it directly, but without
    //    node.js support for ES modules, we're stuck with this.
    const oneLineFile = jsFile
      .slice(character)
      .split("\n")
      .join(" ");

    let html = fetchHtml(getURL(oneLineFile, "template"));
    let cssResult = fetchStylesheet(getURL(oneLineFile, "style"));
    let properties = fetchProperties(getURL(oneLineFile, "schema"));
    let slots = fetchSlots(getURL(oneLineFile, "schema"));

    let template = classStatement;
    template += `

  // Injected at build-time
  static get version() {
    return "${version}";
  }`;
    if (cssResult || html) {
      template += `

  // Injected at build-time
  get html() {
    return \`${cssResult}${html}\`;
  }`;
    }
    // @TODO: Deprecated for 1.0
    if (properties !== "{}") {
      template += `

  // @TODO: Deprecating in 1.0 release
  // Injected at build-time
  static get schemaProperties() {
    return ${properties};
  }`;
    }
    if (slots !== "{}") {
      template += `

  // Injected at build-time
  static get slots() {
    return ${slots};
  }`;
    }

    return `${template}\n`;
  };

  task("merge", () => {
    return (
      src(`${elementName}*.js`, {
        cwd: paths.source
      })
        .pipe(replace(/extends\s+P[Ff][Ee][A-z0-9_$]*\s+{/g, embedExternal))
        .pipe(
          replace(/{{version}}/g, version)
        )
        .pipe(
          banner(
            `/*!
 * PatternFly Elements: ${className} ${version}
 * @license
${fs
  .readFileSync("LICENSE.txt", "utf8")
  .split("\n")
  .map(line => ` * ${line}\n`)
  .join("")}*/\n\n`
        )
      )
      .pipe(dest(paths.temp))
    );
  });

  task("copy:src", () => {
    return src(["*.js", "*.json", `!${elementName}*.js`], {
      cwd: paths.source
    }).pipe(dest(paths.temp));
  });

  task("copy:compiled", () => {
    return src(["*"], {
      cwd: paths.temp
    }).pipe(gulpif(file => (files.length > 0 && gulpmatch(file, files)) || files.length === 0, dest(paths.compiled)));
  });

  task("compile", () => {
    return src(`${elementName}*.js`, {
        cwd: paths.temp
      })
      .pipe(replace(/^(import .*?)(['"]\.\.\/\.\.\/(?!\.\.\/).*)\.js(['"];)$/gm, "$1$2$3"))
      .pipe(
        rename({
          suffix: ".umd"
        })
      )
      .pipe(dest(paths.temp));
  });

  task("bundle", shell.task("../../node_modules/.bin/rollup -c"));

  // Delete the temp directory
  task("clean:post", () => del(["*.min.css", "*.umd.js"], {
      cwd: paths.temp,
      read: false,
      allowEmpty: true
    })
  );

  task(
    "build",
    series(
      "clean",
      "compile:styles",
      "minify:styles",
      "merge",
      "copy:src",
      "copy:compiled",
      ...prebundle,
      "compile",
      "bundle",
      ...postbundle,
      "clean:post"
    )
  );

  task("watch", (done) => {
    watch(path.join(paths.source, "*"), series("build"));
    done();
  });

  task("dev", series("build", "watch"));

  task("default", series("build"));

  // Custom tasks for components with no JS to compile
  task(
    "build:nojs",
    series("clean", "compile:styles", "minify:styles", "copy:src", "copy:compiled", ...prebundle, ...postbundle, "clean:post")
  );

  task("watch:nojs", (done) => {
    watch(path.join(paths.source, "*"), series("build:nojs"));
    done();
  });

  task("dev:nojs", parallel("build:nojs", "watch:nojs"));
};
