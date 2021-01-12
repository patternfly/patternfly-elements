import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import { PfeCollapse } from "../dist/pfe-collapse";

const stories = storiesOf("Collapse", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeCollapse.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);
const defaultContent = tools.autoContent(5, 3);

stories.add(PfeCollapse.tag, () => {
  let config = {};

  // const props = PfeCollapse.schemaProperties;
  // const slots = PfeCollapse.slots;

  config.slots = [
    {
      content:
        tools.component("pfe-collapse-toggle", {}, [
          {
            content: tools.customTag({
              tag: "button",
              attributes: {
                type: "button"
              },
              content: "Toggle Control"
            })
          }
        ]) +
        tools.component("pfe-collapse-panel", {}, [
          {
            content: defaultContent
          }
        ])
    }
  ];

  let rendered = template(config);
  return tools.preview(rendered);
});
