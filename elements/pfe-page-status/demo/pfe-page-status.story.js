import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfePageStatus from "../dist/pfe-page-status.js";

const stories = storiesOf("Page status", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

stories.addDecorator(storybookBridge.withKnobs);

const template = (data = {}) => tools.component(PfePageStatus.tag, data.prop, data.slots);

stories.add(PfePageStatus.tag, () => {
  let config = {};

  const props = PfePageStatus.schemaProperties;
  const slots = PfePageStatus.slots;

  // -- Customize the default selection for the preview
  props.status.default = "important";

  // Build the knobs and read in their selections
  config.prop = tools.autoPropKnobs(PfePageStatus);

  // Set a default value for the user-entered content
  slots.content.default = "Preview";

  // Build the knobs and read in their selections
  config.has = tools.autoContentKnobs(slots, storybookBridge);

  config.slots = [
    {
      content: config.has.content
    }
  ];

  let rendered = template(config);

  return tools.preview(rendered);
});
