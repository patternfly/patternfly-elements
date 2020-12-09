import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfePrimaryDetail from "../dist/pfe-primary-detail";

const stories = storiesOf("Primary detail", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfePrimaryDetail.tag, data.prop, data.slots);
};

// Use these to get dynamically generated content
// const defaultHeading = tools.autoHeading(true);
const defaultContent = tools.autoContent(1, 2);

stories.addDecorator(bridge.withKnobs);

stories.add(PfePrimaryDetail.tag, () => {
  let config = {};
  const props = PfePrimaryDetail.properties;

  //-- Set any custom defaults just for storybook here

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfePrimaryDetail);

  const slots = PfePrimaryDetail.slots;

  //-- Set any custom content for the slots here

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has[""] to get user content
  // prettier-ignore
  config.slots = [{
    content: defaultContent
  }];

  //-- Reset default values show they don't render in the markup
  // if (config.prop[""] === "default") {
  //   config.prop[""] = "";
  // }

  const rendered = template(config);
  return tools.preview(rendered);
});
