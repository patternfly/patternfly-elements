const fs = require("fs");
const path = require("path");

const elementsDir = path.join(__dirname, "../elements");

let elementNames = fs.readdirSync(elementsDir).filter(file => fs.statSync(path.join(elementsDir, file)).isDirectory());

// Remove sass helpers from the listings
elementNames = elementNames.filter(folder => !folder.includes("sass"));

// Copy the LICENSE.txt file from root to the root for each element
if (fs.existsSync("LICENSE.txt")) {
  elementNames.forEach(element => {
    fs.copyFile("LICENSE.txt", path.join("elements", element, "LICENSE.txt"), err => {
      if (err) throw err;
      console.log(`LICENSE.txt was copied to ${element}`);
    });
  });
}
