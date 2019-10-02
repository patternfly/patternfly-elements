import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import { PfeCollapse } from "../pfe-collapse";

const stories = storiesOf("Collapse", module);

stories.addDecorator(storybookBridge.withKnobs);

const template = (data = {}) => {
  return tools.component(PfeCollapse.tag, data.prop, data.slots);
};

stories.add(PfeCollapse.tag,  () => {
  let config = {};

  const props = PfeCollapse.properties;
  const slots = PfeCollapse.slots;

  config.slots = [];

  config.slots.push({
    content:
      tools.component("pfe-collapse-toggle", {}, [
        {
          content: tools.customTag({
            tag: "h3",
            content: "Toggle Control"
          })
        }
      ]) +
      tools.component("pfe-collapse-panel", {}, [
        {
          content: tools.autoContent(5, 3)
        }
      ])
  });

  let rendered = template(config);
  return tools.preview(rendered);
});
