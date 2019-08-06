import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeProgressIndicator from "../pfe-progress-indicator.js";

const stories = storiesOf("Progress Indicator", module);

stories.addDecorator(storybookBridge.withKnobs);

const template = (data = {}) =>
  tools.component(PfeProgressIndicator.tag, data.prop, data.slots);

stories.add(PfeProgressIndicator.tag, () => {
  let config = {};

  const slots = PfeProgressIndicator.slots;

  // Build the knobs and read in their selections
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  // Set a default value for the user-entered content
  slots.content.default = "My loading message...";

  // Build the knobs and read in their selections
  config.has = tools.autoContentKnobs(slots, storybookBridge);

  config.slots = [{
    content: config.has.content
  }];

  let rendered = template(config);

  return tools.preview(rendered);
});