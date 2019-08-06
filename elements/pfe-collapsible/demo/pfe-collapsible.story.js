import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import { PfeCollapsible } from "../pfe-collapsible";

const stories = storiesOf("Collapsible", module);

stories.addDecorator(storybookBridge.withKnobs);

const template = (data = {}) => {
  return tools.component(PfeCollapsible.tag, data.prop, data.slots);
};

stories.add(PfeCollapsible.tag,  () => {
  let config = {};

  const props = PfeCollapsible.properties;
  const slots = PfeCollapsible.slots;

  config.slots = [];

  config.slots.push({
    content:
      tools.component("pfe-collapsible-toggle", {}, [
        {
          content: tools.customTag({
            tag: "h3",
            content: "Toggle Control"
          })
        }
      ]) +
      tools.component("pfe-collapsible-panel", {}, [
        {
          content: tools.autoContent(5, 3)
        }
      ])
  });

  let rendered = template(config);
  return tools.preview(rendered);
});
