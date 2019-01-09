import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeTabs from "../pfe-tabs.js";

// import cpTheme from "../../../themes/cp-theme/cp-theme.js";

const stories = storiesOf("Tabs", module);

const defaultTab = tools.autoHeading(true);
const defaultPanel =
  tools.customTag({
    tag: "h3",
    content: tools.autoHeading()
  }) +
  tools.autoContent(3, 3) +
  tools.component("pfe-cta", {}, [
    {
      content: "<a href='#'>Learn more</a>"
    }
  ]);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeTabs.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeTabs.tag, () => {
  let config = {};
  // const props = PfeTabs.properties;
  // Manually defining props but this can be done in a schema instead
  const props = {
    vertical: {
      title: "Vertical orientation",
      type: "boolean",
      default: false
    }
  };

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  // const slots = PfeTabs.slots;

  //-- Add content to light DOM
  config.slots = [];

  // Let the user determine number of tabs
  let tabCount = storybookBridge.number("Count", 3, {
    min: 1,
    max: 10
  });

  // Let the user customize the first header + panel set
  let tab = storybookBridge.text("Tab", defaultTab, "tabset");
  let panel = storybookBridge.text("Panel", defaultPanel, "tabset");

  config.slots.push({
    content:
      tools.component(
        "pfe-tab",
        {
          role: "heading",
          slot: "tab"
        },
        [
          {
            content: tab
          }
        ]
      ) +
      tools.component(
        "pfe-tab-panel",
        {
          role: "region",
          slot: "panel"
        },
        [
          {
            content: panel
          }
        ]
      )
  });

  // Use dynamic content for the rest
  for (let i = 1; i < tabCount; i++) {
    config.slots.push({
      content:
        tools.component(
          "pfe-tab",
          {
            role: "heading",
            slot: "tab"
          },
          [
            {
              content: tools.autoHeading(true)
            }
          ]
        ) +
        tools.component(
          "pfe-tab-panel",
          {
            role: "region",
            slot: "panel"
          },
          [
            {
              content:
                tools.customTag({
                  tag: "h3",
                  content: tools.autoHeading()
                }) +
                tools.autoContent(3, 3) +
                tools.component("pfe-cta", {}, [
                  {
                    content: "<a href='#'>Learn more</a>"
                  }
                ])
            }
          ]
        )
    });
  }

  const render = template(config);
  const output = tools.preview(render);
  return output;
});
