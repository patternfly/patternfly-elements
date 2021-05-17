import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeChip from "../dist/pfe-chip";

const stories = storiesOf("Chip", module);

// Add the documentation
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeChip.tag, data.prop, data.slots);
};

let defaultContent = "Chip";

stories.addDecorator(bridge.withKnobs);

stories.add(PfeChip.tag, () => {
  let config = {};

  // const props = PfeChip.properties;

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeChip);

  const slots = PfeChip.slots;

  slots.badge.title = "Optional badge count";
  slots.badge.type = "number";

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has["badge"] to get user content
  // prettier-ignore
  config.slots = [{
    content: config.has.default || defaultContent
  }];

  const rendered = template(config);
  return tools.preview(rendered);
});
