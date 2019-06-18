import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeAccordion from "../pfe-accordion";

const stories = storiesOf("Accordion", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeAccordion.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeAccordion.tag, () => {
  let config = {};
  let headings = [];
  let panels = [];

  // const props = PfeAccordion.properties;
  const props = {
    on: {
      title: "Theme",
      type: "string",
      enum: [
        "light",
        "dark"
      ],
      default: "light",
      prefixed: false
    }
  };

  config.prop = tools.autoPropKnobs(props, storybookBridge);

  //-- Add content to light DOM
  // const slots = PfeAccordion.slots;
  config.slots = [];

  // Let the user determine number of accordions
  let accordionCount = storybookBridge.number("Count", 5, {
    min: 1,
    max: 10
  });

  // Ask user if they want to add any custom content
  const customContent = storybookBridge.boolean(
    "Use custom content?",
    false,
    "Content"
  );
    
  // Let the user customize the header + panel set
  if (customContent) {
    for (let i = 0; i < accordionCount; i++) {
      headings[i] = storybookBridge.text(`Heading ${i + 1}`, "", "accordion-set");
      panels[i] = storybookBridge.text(`Panel ${i + 1}`, "", "accordion-set");
    }
  }

  // Use dynamic content for the rest
  for (let i = 0; i < accordionCount; i++) {
    config.slots.push({
      content:
        tools.component("pfe-accordion-header", {}, [
          {
            content: tools.customTag({
              tag: "h2",
              content: customContent ? headings[i] : tools.autoHeading()
            })
          }
        ]) +
        tools.component("pfe-accordion-panel", {}, [
          {
            content: customContent ? panels[i] : tools.autoContent(5, 3)
          }
        ])
    });
  }

  const render = template(config);
  const output = tools.preview(render);
  return output;
});
