import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeHealthIndex from "../dist/pfe-health-index";

const stories = storiesOf("Health Index", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeHealthIndex.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeHealthIndex.tag, () => {
  let config = {};

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeHealthIndex);

  // Fallback date is the "content" for this component
  config.slots = [
    {
      content: config.prop["health-index"]
    }
  ];

  const render = template(config);
  return tools.preview(render);
});
