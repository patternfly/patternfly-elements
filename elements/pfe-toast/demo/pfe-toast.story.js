import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeToast from "../dist/pfe-toast";

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

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeToast);

  config.slots = [
    {
      content: tools.customTag({
        tag: "p",
        content: "Let's get toasty!"
      })
    }
  ];

  const render = template(config);

  return `
  <button onclick="document.querySelector('pfe-toast').toggle()">Toggle toast</button>
  ${tools.preview(render)}
  `;
});
