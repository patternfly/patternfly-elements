import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeContentSet from "../pfe-content-set";
import PfeCta from "../../pfe-cta/pfe-cta";

const stories = storiesOf("Content set", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeContentSet.tag, data.prop, data.slots);
};

const cta = tools.component("pfe-cta", {}, [{
  content: tools.customTag({
    tag: "a",
    attributes: {
      href: "#"
    },
    content: "Learn more"
  })
}]);

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeContentSet.tag, () => {
  let config = {};
  let heading = [];
  let panel = [];

  const props = PfeContentSet.properties;

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  // Let the user determine number of tabs
  let countVar = storybookBridge.number("Count", 3, {
    min: 1,
    max: 10
  });

  // Ask user if they want to add any custom content
  const customContent = storybookBridge.boolean(
    "Use custom content?",
    false,
    "Content"
  );
    
  // Let the user customize the first header + panel set
  for (let i = 0; i < countVar; i++) {
    if (customContent) {
      heading[i] = storybookBridge.text(`Heading ${i + 1}`, "", "set");
      panel[i] = storybookBridge.text(`Panel ${i + 1}`, "", "set");
    } else {
      heading[i] = tools.autoHeading(true).replace(/^\w/, c => c.toUpperCase());
      panel[i] = tools.autoContent(1, 2) + cta;
    }
  }

  const content = Array(countVar)
    .join(0)
    .split(0)
    .map((item, i) =>
      tools.customTag({
        tag: "h3",
        attributes: {
          "pfe-content-set--header": true
        },
        content: heading[i]
      }) + tools.customTag({
        tag: "div",
        attributes: {
          "pfe-content-set--panel": true
        },
        content: panel[i]
      })
    )
    .join("");

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
