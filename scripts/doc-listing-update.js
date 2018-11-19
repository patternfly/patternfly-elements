const parser = require("node-html-parser");
const fs = require("fs");
const path = require("path");

const elementsDir = path.join(__dirname, "../elements");

let elementNames = fs
  .readdirSync(elementsDir)
  .filter(file => fs.statSync(path.join(elementsDir, file)).isDirectory());

// Remove rhelement core from listing
elementNames = elementNames.filter(folder => folder !== "rhelement");

// Remove themesets and sass helpers from the listings
elementNames = elementNames.filter(
  folder => !folder.includes("themeset") && !folder.includes("sass")
);

let markup = "";
elementNames.forEach(
  element =>
    (markup += `\n\t\t\t\t\t<li><a href="../elements/${element}/demo">${element}</a></li>`)
);

const wrapper = path.join(__dirname, "../doc/wrapper.html");
const index = path.join(__dirname, "../doc/index.html");

// Read in the wrapper template
fs.readFile(wrapper, (err, data) => {
  if (err) throw err;
  const content = data.toString();
  const root = parser.parse(content, { script: true, style: true });
  root.querySelector("#demos").set_content(markup);
  // Output the updated index file
  fs.writeFile(index, root.toString(), function(err) {
    if (err) throw err;
  });
});

// From the wrapper.html, get the ID element #demos and replace with the above markup
const outFile = path.join(__dirname, "../doc/index.html");

// fs.writeFileSync(outFile);
