import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeMarkdown from "../dist/pfe-markdown.js";

const stories = storiesOf("Markdown", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the templates to be used
const template = (data = {}) => tools.component(PfeMarkdown.tag, data.prop, data.slots);

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeMarkdown.tag, () => {
  tools.context();

  let config = {};
  const slots = PfeMarkdown.slots;

  slots.default.default = `# Here is some markdown

And some some more

### Here is a heading level 3

And a [link](https://redhat.com)`;

  // Build the knobs and read in their selections
  config.prop = tools.autoPropKnobs(PfeMarkdown);
  config.has = tools.autoContentKnobs(slots, storybookBridge);

  config.slots = [
    {
      content: tools.customTag({
        tag: "div",
        attributes: {
          "pfe-markdown-container": true
        },
        content: config.has.default
      })
    }
  ];

  let rendered = template(config);
  return tools.preview(rendered);
});
