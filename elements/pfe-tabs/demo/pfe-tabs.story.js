import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeTabs from "../dist/pfe-tabs.js";
import PfeCta from "../../pfe-cta/dist/pfe-cta.js";

const stories = storiesOf("Tabs", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// prettier-ignore
const defaultCTA = tools.component("pfe-cta", {}, [{
  content: "<a href='#'>Learn more</a>"
}]);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeTabs.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeTabs.tag, () => {
  tools.context();

  let config = {};
  let tabs = [];
  let panels = [];

  const props = PfeTabs.schemaProperties;

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeTabs);

  const slots = PfeTabs.slots;

  //-- Add content to light DOM
  config.slots = [];

  // Let the user determine number of tabs
  let tabCount = storybookBridge.number("Count", 3, {
    min: 1,
    max: 10
  });

  // Ask user if they want to add any custom content
  const customContent = storybookBridge.boolean("Use custom content?", false, "Content");

  // Let the user customize the first header + panel set
  if (customContent) {
    for (let i = 0; i < tabCount; i++) {
      tabs[i] = storybookBridge.text(`Tab ${i + 1}`, "", "tabset");
      panels[i] = storybookBridge.text(`Panel ${i + 1}`, "", "tabset");
    }
  }

  for (let i = 0; i < tabCount; i++) {
    config.slots.push({
      slot: "tab",
      content: tools.component(
        "pfe-tab",
        {
          role: "heading"
        },
        [
          {
            content: customContent ? tabs[i] : tools.autoHeading(true)
          }
        ]
      )
    });

    config.slots.push({
      slot: "panel",
      content: tools.component(
        "pfe-tab-panel",
        {
          role: "region"
        },
        [
          {
            content: customContent ? panels[i] : tools.autoContent(3, 3) + defaultCTA
          }
        ]
      )
    });
  }

  // Some attribute values don't need to be included in the markup
  if (!config.prop.vertical) {
    config.prop.vertical = null;
  }

  const render = template(config);
  const output = tools.preview(render);
  return output;
});
