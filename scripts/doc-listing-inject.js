const fs = require("fs");
const path = require("path");

const elementsDir = path.join(__dirname, "../elements");

let elementNames = fs
  .readdirSync(elementsDir)
  .filter(file => fs.statSync(path.join(elementsDir, file)).isDirectory());

// Remove rhelement core from listing
elementNames = elementNames.filter(folder => folder !== "pfelement");

// Remove themesets and sass helpers from the listings
elementNames = elementNames.filter(
  folder => !folder.includes("themeset") && !folder.includes("sass")
);

let markup = "";
elementNames.forEach(
  element =>
    (markup += `\n\t\t\t\t\t<li><a href="../elements/${element}/demo">${element}</a></li>`)
);

const wrapper = path.join(__dirname, "../examples/wrapper.html");
const index = path.join(__dirname, "../examples/index.html");

// Read in the wrapper template
fs.readFile(wrapper, (err, data) => {
  if (err) throw err;
  let content = data.toString();
  content = content.replace("<!-- Inject list -->", markup + "\n\t\t\t\t");
  // Output the updated index file
  fs.writeFile(index, content, function(err) {
    if (err) throw err;
  });
});
