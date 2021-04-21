const Generator = require("yeoman-generator");
const _ = require("lodash");
const chalk = require("chalk");
const glob = require("glob");

module.exports = class extends Generator {
    constructor(args, options) {
        super(args, options);

        // If the user calls this generator manually and forgets to pass in an argument throw a useful error.
        if (args.length < 1) {
            throw new Error(
                // The indentation on this is weird so it appears correctly in the console.
                `${chalk.red.bold("Error:")} 🤔👇
        It looks like there may be an argument missing.
        Make sure you're passing the name of the element.
        Example: ${chalk.inverse('npm run create:test "pfe-toast"')}
        `
            );
        }
        this.argument("name", { type: String, required: true });
    }

    initializing() {
        // Create an object to contain all our name variations.
        this.name = {};

        // The parent generator is called from ./elements but the sub generator
        // is called from `./`. Make sure we're using the right path root depending
        // on how the generator is called.
        this.pathRoot = this.options.allProps ? '' : 'elements/';

        // If this was called directly (not from the parent) we can preserve
        // the file name to use it later.
        this.name.fileName = this.options.name;

        // If this was called directly check to make sure the element already exists
        // before adding the new test file.
        if (!this.options.allProps) {
            // We're looking for pfe-clipboard(or whatever element) to make sure it exists.
            const elementDirPath = glob.sync(
                `./elements/${this.name.fileName}/`
            );
            // If we can't find a folder with that name, throw a useful error.
            if (elementDirPath.length < 1) {
                throw new Error(
                    // The indentation on this is weird so it appears correctly in the console.
                    `${chalk.red.bold("No element found")} 🚫🔎
        No element found named ${chalk.bold(this.name.fileName)}.
        Does it exist within ${chalk.inverse("./elements/")}?
                    `
                );
            }
        }

        const rawName = this.options.name;
        // Preserve the raw name.
        this.name.raw = rawName;
        // Create a file name version of the name. If it already exists
        // use that instead.
        // i.e. pfe-toast
        this.name.fileName = _.kebabCase(rawName);
        // Create a class name version of the name.
        // pfe-toast => PfeToast
        this.name.className = _.upperFirst(_.camelCase(rawName));
        // File name and element name are the same.
        // This is mainly so it's more obvious what we're doing.
        this.name.elementName = this.name.fileName;

        // If called from the parent generator this will be populated.
        this.allProps = this.options.allProps || null;
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath("_element.spec.js"),
            this.destinationPath(
                `${this.pathRoot}${this.name.fileName}/test/${this.name.fileName}.spec.js`
            ),
            {
                className: this.name.className,
                elementName: this.name.elementName
            }
        );

        // If we're generating a new element we need to populate both the spec file
        // and a end-to-end test for visual regression testing.
        // This only happens if called from the parent generator.
        if (this.allProps) {
            this.fs.copyTpl(
                this.templatePath("_element_e2e.js"),
                this.destinationPath(
                    `${this.pathRoot}${this.name.fileName}/test/${this.name.fileName}_e2e.js`
                )
            );
        }
    }
};
