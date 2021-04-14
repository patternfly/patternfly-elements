import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeReadtime from "../dist/pfe-readtime";

const stories = storiesOf("Readtime", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeReadtime.tag, data.prop, data.slots);
};

// Use these to get dynamically generated content
const defaultContent = "%t-minutes to read";

stories.addDecorator(bridge.withKnobs);

stories.add(PfeReadtime.tag, () => {
  let config = {};

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeReadtime);

  const slots = PfeReadtime.slots;

  //-- Set any custom content for the slots here

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has[""] to get user content
  // prettier-ignore
  config.slots = [{
    content: defaultContent
  }];

  const rendered = template(config);
  return tools.preview(rendered);
});
