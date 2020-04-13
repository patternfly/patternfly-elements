import { storiesOf } from "@storybook/polymer";
import PfeDropdown from "../dist/pfe-dropdown";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

const stories = storiesOf("Dropdown", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeDropdown.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeDropdown.tag, () => {
  let config = {};
  const props = PfeDropdown.properties;

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  config.slots = [
    {
      content: tools.customTag({
        tag: "pfe-dropdown-item",
        attributes: {
          "pfe-item-type": `link`
        },
        content: "<a href='https://bit.ly/3b9wvWg'>Link 1</a>"
      })
    }
  ];

  const render = template(config);

  return tools.preview(render);
});
