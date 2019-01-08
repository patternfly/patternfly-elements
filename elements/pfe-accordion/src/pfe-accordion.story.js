import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeAccordion from "../pfe-accordion";

const stories = storiesOf("Accordion", module);

const defaultHeader = tools.autoHeading();
const defaultContent = tools.autoContent(5, 3);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeAccordion.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeAccordion.tag, () => {
  let config = {};
  // const props = PfeAccordion.properties;
  // const slots = PfeAccordion.slots;

  //-- Add content to light DOM
  config.slots = [];

  // Let the user determine number of accordions
  let accordionCount = storybookBridge.number("Count", 5, {
    min: 1,
    max: 10
  });

  // Let the user customize the first header + panel set
  let header = storybookBridge.text("Header", defaultHeader, "accordion-set");
  let content = storybookBridge.text("Panel", defaultContent, "accordion-set");

  config.slots.push({
    content:
      tools.component("pfe-accordion-header", {}, [
        {
          content: tools.customTag({
            tag: "h2",
            content: header
          })
        }
      ]) +
      tools.component("pfe-accordion-panel", {}, [
        {
          content: content
        }
      ])
  });

  // Use dynamic content for the rest
  for (let i = 1; i < accordionCount; i++) {
    config.slots.push({
      content:
        tools.component("pfe-accordion-header", {}, [
          {
            content: tools.customTag({
              tag: "h2",
              content: tools.autoHeading()
            })
          }
        ]) +
        tools.component("pfe-accordion-panel", {}, [
          {
            content: tools.autoContent(5, 3)
          }
        ])
    });
  }

  const render = template(config);
  const output = tools.preview(render);
  return output;
});
