import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeContentSet from "../dist/pfe-content-set";
import PfeCta from "../../pfe-cta/dist/pfe-cta";

const stories = storiesOf("Content set", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeContentSet.tag, data.prop, data.slots);
};

const cta = tools.component("pfe-cta", {}, [
  {
    content: tools.customTag({
      tag: "a",
      attributes: {
        href: "#"
      },
      content: "Learn more"
    })
  }
]);

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeContentSet.tag, () => {
  tools.context();

  let config = {};
  let headings = [];
  let panels = [];

  // const props = PfeContentSet.schemaProperties;

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeContentSet);

  // Let the user determine number of tabs
  let countVar = storybookBridge.number("Count", 3, {
    min: 1,
    max: 10
  });

  // Ask user if they want to add any custom content
  const customContent = storybookBridge.boolean("Use custom content?", false, "Content");

  // Let the user customize the first header + panel set
  if (customContent) {
    for (let i = 0; i < countVar; i++) {
      headings[i] = storybookBridge.text(`Heading ${i + 1}`, "", "set");
      panels[i] = storybookBridge.text(`Panel ${i + 1}`, "", "set");
    }
  }

  let content = "";
  for (let i = 0; i < countVar; i++) {
    content +=
      tools.customTag({
        tag: "h3",
        attributes: {
          "pfe-content-set--header": true
        },
        content: customContent ? headings[i] : tools.autoHeading(true).replace(/^\w/, c => c.toUpperCase())
      }) +
      tools.customTag({
        tag: "div",
        attributes: {
          "pfe-content-set--panel": true
        },
        content: customContent ? panels[i] : tools.autoContent(1, 2) + cta
      });
  }

  config.slots = [
    {
      content: content
    }
  ];

  // Some attribute values don't need to be included in the markup
  if (!config.prop.vertical) {
    config.prop.vertical = null;
  }

  const render = template(config);
  const output = tools.preview(render);
  return output;
});
