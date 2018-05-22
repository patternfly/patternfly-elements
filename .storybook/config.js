import { configure } from "@storybook/polymer";
import { setOptions } from "@storybook/addon-options";
const req = require.context("../elements", true, /\.story\.js$/);

setOptions({
  name: "RHElements"
});

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
