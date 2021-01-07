const Generator = require("yeoman-generator");

const _ = require("lodash");

const mkdirp = require("mkdirp");
const fs = require("fs");
const process = require("process");

const util = require("util");
const chalk = require("chalk");
const yosay = require("yosay");

const packageJson = require("../../package.json");

// Check for a config file to look for defaults
let config = {};
if (fs.existsSync("../project.conf.json")) {
  config = require("../../project.conf.json");
}

let isPfelement = false;
let demoTemplatePath;
let readmePath;

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  async prompting() {
    const done = this.async();
    this.log(yosay(`Welcome to the ${chalk.red("PatternFly Elements")} generator!`));

    this.prompt([
      {
        type: "list",
        name: "type",
        message: "What would you like to create?",
        choices: [
          {
            name: "A new PFElement in the core PatternFly Elements library",
            value: "pfelement"
          },
          {
            name: "A standalone web component that extends PFElement",
            value: "standalone"
          }
        ],
        default: this.options.type || config.type,
        when: () => !this.options.type && !config.type
      },
      {
        type: "list",
        name: "template_type",
        message: "What would you like to create?",
        choices: ["content", "container", "combo"],
        default: "container"
      },
      {
        type: "input",
        name: "name",
        message: "Element name (i.e. pfe-card)",
        validate: function(answer) {
          let parts = _.words(answer);
          if (answer.length < 1) {
            return "I get it, naming is hard; but it must have a name. You can always change it later.";
          } else if (parts.length < 2) {
            return "Elements should always have at least two parts. Check that you included the prefix for the name; for example, pfe-cta.";
          } else {
            return true;
          }
        },
        filter: function(response) {
          // Ensure it is passed to the results in kebab case
          return _.kebabCase(response);
        }
      },
      {
        type: "input",
        name: "authorName",
        message: "Author name",
        when: function(answers) {
          let ret = true;
          // Check that it doesn't exist in the default config first
          if (config.author) {
            ret = typeof config.author.name === "undefined";
          }
          return ret;
        }
      },
      {
        type: "confirm",
        name: "useSass",
        message: "Do you want to use Sass with this element?",
        when: function(answers) {
          // Check that it doesn't exist in the default config first
          return typeof config.useSass === "undefined";
        }
      },
      {
        type: "list",
        name: "sassLibrary",
        when: answers => {
          return answers.useSass && typeof config.sassLibrary === "undefined";
        },
        message: "Do want to use existing Sass dependencies?",
        choices: [
          {
            name: "pfe-sass",
            value: {
              pkg: "@patternfly/pfe-sass",
              path: "pfe-sass/pfe-sass"
            }
          },
          {
            name: "No thanks. I'll provide my own.",
            value: null
          }
        ]
      },
      {
        type: "input",
        name: "description",
        message: "Describe the element's purpose or goal."
      },
      {
        type: "input",
        name: "attributes",
        message: "List any attributes for the element, separated by commas (i.e., color, priority)",
        // validate: function(answer) {},
        filter: function(response) {
          // Strip any pfe prefixes, these are added dynamically, and remove any empty entries
          return response
            .replace(/pfe-/g, "")
            .split(",")
            .filter(s => s.length);
        }
      },
      {
        type: "input",
        name: "slots",
        message: "List any named slots for the element, separated by commas (i.e., header, footer)",
        // validate: function(answer) {},
        filter: function(response) {
          // remove whitespace, split on comma, and remove empty entries
          return response
            .replace(/\s/g, "")
            .split(",")
            .filter(s => s.length);
        }
      },
      {
        type: "input",
        name: "events",
        message: "List any events you want registered for the element, separated by commas (i.e., change, click)",
        // validate: function(answer) {},
        filter: function(response) {
          // remove whitespace, split on comma, and remove empty entries
          return response
            .replace(/\s/g, "")
            .split(",")
            .filter(s => s.length);
        }
      }
    ]).then(answers => {
      if (Object.keys(answers).length > 0) {
        let name = "";
        // Trim prefixing of the name
        answers.name.split("-").forEach(part => {
          if (part !== "pfe") {
            name += part + " ";
          }
        });
        // Trim the whitespace
        name = name.trim();

        const { version: pfelementVersion } = fs.existsSync(this.destinationPath("pfelement/package.json"))
          ? require(this.destinationPath("pfelement/package.json"))
          : "";

        const { version: pfeSassVersion } = fs.existsSync(this.destinationPath("pfe-sass/package.json"))
          ? require(this.destinationPath("pfe-sass/package.json"))
          : "";

        isPfelement = this.options.type === "pfelement" || config.type === "pfelement" || answers.type === "pfelement";
        demoTemplatePath = isPfelement ? "demo/pfelement-index.html" : "demo/standalone-index.html";
        readmePath = isPfelement ? "./pfelement-README.md" : "./standalone-README.md";
        const pfeElementLocation = isPfelement
          ? "../../pfelement/dist/pfelement.js"
          : "../../@patternfly/pfelement/dist/pfelement.js";
        const packageName = isPfelement ? `@patternfly/${answers.name}` : `${answers.name}`;
        const gulpFactoryLocation = isPfelement ? "../../scripts/gulpfile.factory.js" : "./scripts/gulpfile.factory.js";
        const rollupConfigLocation = isPfelement
          ? "../../scripts/rollup.config.factory.js"
          : "./scripts/rollup.config.factory.js";
        const testFileLocation = isPfelement
          ? `../dist/${answers.name}.js`
          : `../node_modules/${answers.name}/dist/${answers.name}.js`;

        this.props = {
          _: _,
          author: {
            name: config.author && config.author.name ? config.author.name : answers.authorName,
            email: config.author && config.author.email ? config.author.email : "",
            url: config.author && config.author.url ? config.author.url : ""
          },
          template_type: answers.template_type,
          name: answers.name,
          description: answers.description,
          elementName: answers.name,
          elementClassName: _.chain(answers.name)
            .camelCase()
            .upperFirst()
            .value(),
          readmeName: _.upperFirst(name),
          lowerCaseName: name,
          camelCaseName: _.camelCase(answers.name),
          useSass: config.useSass || answers.useSass,
          sassLibraryPkg: false,
          sassLibraryLocation: false,
          generatorPfelementVersion: packageJson.version,
          pfelementVersion,
          pfeSassVersion,
          dependencies: packageJson.dependencies,
          devDependencies: packageJson.devDependencies,
          pfeElementLocation: pfeElementLocation,
          isPfelement: isPfelement,
          packageName: packageName,
          gulpFactoryLocation: gulpFactoryLocation,
          rollupConfigLocation: rollupConfigLocation,
          attributes: answers.attributes,
          slots: answers.slots,
          events: answers.events,
          testFileLocation: testFileLocation
        };

        let useSass = config.useSass || answers.useSass;
        if (useSass) {
          let sassLibrary = config.sassLibrary || answers.sassLibrary;
          if (sassLibrary && sassLibrary.pkg) {
            this.props.sassLibraryPkg = sassLibrary.pkg;
          }

          if (sassLibrary && sassLibrary.path) {
            this.props.sassLibraryLocation = isPfelement
              ? "../../pfe-sass/pfe-sass"
              : "../node_modules/@patternfly/pfe-sass/pfe-sass";
          }
        }

        mkdirp.sync(this.props.elementName);
      } else {
        console.error("Prompting was existed without storing results.");
      }

      done();
    });
  }

  writing() {
    const files = [
      {
        template: "package.json",
        path: `${this.props.elementName}/package.json`
      },
      {
        template: "DISCOVERY.md",
        path: `${this.props.elementName}/DISCOVERY.md`
      },
      {
        template: readmePath,
        path: `${this.props.elementName}/README.md`
      },
      {
        template: "LICENSE.txt",
        path: `${this.props.elementName}/LICENSE.txt`
      },
      {
        template: "CHANGELOG.md",
        path: `${this.props.elementName}/CHANGELOG.md`
      },
      {
        template: "gulpfile.js",
        path: `${this.props.elementName}/gulpfile.js`
      },
      {
        template: "rollup.config.js",
        path: `${this.props.elementName}/rollup.config.js`
      },
      {
        template: demoTemplatePath,
        path: `${this.props.elementName}/demo/index.html`
      },
      {
        template: "src/element.ejs",
        path: `${this.props.elementName}/src/${this.props.elementName}.js`
      },
      {
        template: "src/element.html",
        path: `${this.props.elementName}/src/${this.props.elementName}.html`
      },
      {
        template: "test/element_test.html",
        path: `${this.props.elementName}/test/${this.props.elementName}_test.html`
      },
      {
        template: "test/index.html",
        path: `${this.props.elementName}/test/index.html`
      },
      {
        template: "test/element_react_test.html",
        path: `${this.props.elementName}/test/${this.props.elementName}_react_test.html`
      },
      {
        template: "test/element_vue_test.html",
        path: `${this.props.elementName}/test/${this.props.elementName}_vue_test.html`
      },
      {
        template: "test/element_e2e.js",
        path: `${this.props.elementName}/test/${this.props.elementName}_e2e.js`
      },
      {
        template: "test/element_test.js",
        path: `${this.props.elementName}/test/${this.props.elementName}_test.js`
      }
    ];

    if (Object.keys(this.props).length > 0) {
      try {
        files.forEach(file => {
          if (fs.existsSync(this.templatePath(file.template))) {
            this.fs.copyTpl(this.templatePath(file.template), this.destinationPath(file.path), this.props);
          }
        });

        if (this.props.useSass && fs.existsSync(this.templatePath("src/element.scss"))) {
          this.fs.copyTpl(
            this.templatePath("src/element.scss"),
            this.destinationPath(`${this.props.elementName}/src/${this.props.elementName}.scss`),
            this.props
          );
        } else if (fs.existsSync(this.templatePath("src/element.css"))) {
          this.fs.copyTpl(
            this.templatePath("src/element.css"),
            this.destinationPath(`${this.props.elementName}/src/${this.props.elementName}.css`),
            this.props
          );
        }

        if (isPfelement) {
          if (fs.existsSync(this.templatePath("demo/element.story.js"))) {
            this.fs.copyTpl(
              this.templatePath("demo/element.story.js"),
              this.destinationPath(`${this.props.elementName}/demo/${this.props.elementName}.story.js`),
              this.props
            );
          }
        } else {
          this.fs.copyTpl(
            this.templatePath("scripts/*"),
            this.destinationPath(`${this.props.elementName}/scripts`),
            this.props
          );

          this.fs.copy(
            this.templatePath("wct.conf.json"),
            this.destinationPath(`${this.props.elementName}/wct.conf.json`)
          );

          // PatternFly Elements don't need dot files b/c they're in the monorepo
          this.fs.copy(this.templatePath(".*"), this.destinationPath(`${this.props.elementName}`));
        }
      } catch (error) {
        console.log(error);
        console.log("//------ Properties set by yeoman:\n");
        console.log(util.inspect(this.props, { showHidden: false, depth: 4 }));
        console.log("-------------------------------------------//\n");
      }
    } else {
      console.error("Prompting was exited without storing values.");
    }
  }

  install() {
    process.chdir(this.props.elementName);

    this.installDependencies({
      npm: true,
      bower: false,
      yarn: false
    });
  }

  end() {
    this.spawnCommand("npm", ["run", "build"]);
  }
};
