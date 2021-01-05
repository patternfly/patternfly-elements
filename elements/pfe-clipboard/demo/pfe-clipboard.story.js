import { storiesOf } from "@storybook/polymer";
import { withActions } from "@storybook/addon-actions";
import * as bridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeClipboard from "../dist/pfe-clipboard";

const stories = storiesOf("Clipboard", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeClipboard.tag, data.prop, data.slots);
};

stories.addDecorator(bridge.withKnobs);

// Log events
stories.addDecorator(withActions("pfe-clipboard:copied"));

stories.add(PfeClipboard.tag, () => {
  let config = {};
  const props = PfeClipboard.properties;

  //-- Set any custom defaults just for storybook here

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeClipboard);

  const slots = PfeClipboard.slots;

  //-- Set any custom content for the slots here
  slots.default.default = "Copy URL";
  slots.textSuccess.default = "";
  slots.icon.default = "";

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has["icon"] to get user content
  // prettier-ignore

  config.slots = [];

  if (config.has.default.length > 0) {
    config.slots.push({
      content: config.has.default
    });
  }

  if (config.has.textSuccess.length > 0) {
    config.slots.push({
      slot: "pfe-clipboard--text--success",
      content: config.has.textSuccess
    });
  }

  if (config.has.icon.length > 0) {
    config.slots.push({
      slot: "pfe-clipboard--icon",
      content: config.has.icon
    });
  }

  // -- Reset default values show they don't render in the markup
  if (config.prop[""] === "default") {
    config.prop[""] = "";
  }

  const rendered = template(config);
  return tools.preview(rendered);
});
