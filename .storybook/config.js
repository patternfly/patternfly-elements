import { configure } from "@storybook/polymer";
import { setOptions } from "@storybook/addon-options";
const req = require.context("../elements", true, /\.story\.js$/);

setOptions({
  name: "RHElements",
  addonPanelInRight: true
});

function loadStories() {
  req.keys().forEach(filename => {
    if (filename.includes("node_modules")) {
      return;
    }

    return req(filename);
  });
}

configure(loadStories, module);
