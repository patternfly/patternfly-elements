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

  // Create a link, action, and separator dropdown item
  const link = tools.customTag({
    tag: "pfe-dropdown-item",
    attributes: {
      "pfe-item-type": `link`
    },
    content: "<a href='https://bit.ly/3b9wvWg'>Link 1</a>"
  });

  const link2 = tools.customTag({
    tag: "pfe-dropdown-item",
    attributes: {
      "pfe-item-type": `link`
    },
    content: "<a href='https://bit.ly/3b9wvWg'>Link 2</a>"
  });

  const action = tools.customTag({
    tag: "pfe-dropdown-item",
    attributes: {
      "pfe-item-type": `action`
    },
    content: "<button>Action 1</button>"
  });

  const separator = tools.customTag({
    tag: "pfe-dropdown-item",
    attributes: {
      "pfe-item-type": `separator`
    }
  });

  config.slots = [
    {
      content: link + link2 + separator + action
    }
  ];

  const render = template(config);

  return tools.preview(render);
});
