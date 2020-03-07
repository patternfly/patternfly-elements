import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeChip from "../dist/pfe-chip";

const stories = storiesOf("Chip", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeChip.tag, data.prop, data.slots);
};

// Use these to get dynamically generated content
// const defaultHeading = tools.autoHeading(true);
const defaultContent = tools.autoContent(1, 2);

stories.addDecorator(bridge.withKnobs);

stories.add(PfeChip.tag, () => {
  let config = {};
  const props = PfeChip.properties;

  //-- Set any custom defaults just for storybook here

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, bridge);

  const slots = PfeChip.slots;

  //-- Set any custom content for the slots here

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has["badge"] to get user content
  // prettier-ignore
  config.slots = [{
    content: defaultContent
  }];

  //-- Reset default values show they don't render in the markup
  // if (config.prop["aria-label"] === "default") {
  //   config.prop["aria-label"] = "";
  // }

  const rendered = template(config);
  return tools.preview(rendered);
});
