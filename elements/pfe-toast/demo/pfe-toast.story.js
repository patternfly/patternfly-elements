import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";
import PfeToast from "../pfe-toast";

const stories = storiesOf("Toast", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeToast.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeToast.tag, () => {
  let config = {};
  config.slots = [{
    content: "Get toasted!"
  }];
  const render = template(config);
  return tools.preview(render);
});
