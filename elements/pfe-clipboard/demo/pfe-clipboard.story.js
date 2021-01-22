import { storiesOf } from "@storybook/polymer";
import { withActions } from "@storybook/addon-actions";
import * as bridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeClipboard from "../dist/pfe-clipboard";
import PfeIcon from "../../pfe-icon/dist/pfe-icon";

const stories = storiesOf("Clipboard", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  },
  knobs: {
    escapeHTML: false
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

  //-- Set any custom defaults just for storybook here

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeClipboard, {
    role: { hidden: true },
    tabindex: { hidden: true }
  });

  const slots = PfeClipboard.slots;

  //-- Set any custom content for the slots here
  slots.text.default = "";
  slots.textSuccess.default = "";
  slots.icon.default = "";

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has["icon"] to get user content
  // prettier-ignore

  config.slots = [
    {
      content: config.has.text
    },
    {
      slot: "text--success",
      content: config.has.textSuccess
    },
    {
      slot: "icon",
      content: config.has.icon
    }
  ];

  const rendered = template(config);

  return tools.preview(rendered);
});
