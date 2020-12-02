const glob = require("glob");
const fs = require("fs");
const path = require("path");
const leasot = require("leasot");
const template = require("lodash.template");

const elementsDir = path.join(__dirname, "../elements");
const index = path.join(__dirname, "../examples/index.html");
const wrapper = path.join(__dirname, "../examples/wrapper.html");

let elementNames = fs.readdirSync(elementsDir).filter(file => fs.statSync(path.join(elementsDir, file)).isDirectory());

// Reduce list to only those with demo pages
elementNames = elementNames.filter(folder => fs.existsSync(`${elementsDir}/${folder}/demo/index.html`));

let items = [];

// -> todos contains the array of todos/fixme/polyfills, parsed
glob(`${elementsDir}/*/src/*.js`, (er, files) => {
  files.forEach(file => {
    items = items.concat(
      leasot.parse(fs.readFileSync(file, "utf8"), {
        extension: ".js",
        customTags: ["POLYFILL"],
        filename: file
      })
    );
  });

  let regex = new RegExp(/\[(.*?)\]\((.*?)\)/g);

  // -> markdown output of the todos
  let output = "";
  output += leasot.report(items, "markdown");

  output = output.replace(regex, (full, label, link) => {
    return (
      "[" +
      path
        .basename(label, ".js")
        .split("--")
        .slice(-1)
        .pop() +
      "](" +
      path.relative(__dirname, link) +
      ")"
    );
  });

  let markup = "";
  let cardTemplate = (element, description) => `
    <pfe-card color="lightest" border>
      <h2>${element}</h2>
      ${description ? `<p>${description}</p>` : ""}
      <pfe-cta slot="pfe-card--footer"><a
          href="../elements/${element}/demo">View demo page</a></pfe-cta>
    </pfe-card>
  `;

  elementNames.forEach(element => {
    let description = require(`${elementsDir}/${element}/package.json`).description;
    markup += `\n\t\t\t\t${cardTemplate(element, description)}`;
  });

  markup += "\n\t\t\t";

  // Read and interpolate template
  const tmpl = fs.readFileSync(wrapper, "utf8");
  const compiledTpl = template(tmpl);
  const newContents = compiledTpl({
    components: markup,
    todo: items.length > 0 ? output : ""
  });

  // // Read in the wrapper template
  fs.readFile(wrapper, (err, data) => {
    if (err) throw err;
    //   // Output the updated index file
    fs.writeFile(index, newContents, function(err) {
      if (err) throw err;
    });
  });
});
