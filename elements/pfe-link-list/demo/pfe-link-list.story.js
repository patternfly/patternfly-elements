import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeLinkList from "../pfe-link-list";

const stories = storiesOf("Link list", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeLinkList.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeLinkList.tag, () => {
  let config = {};
  // const props = PfeLinkList.properties;

  // Trigger the auto generation of the knobs for attributes
  // config.prop = tools.autoPropKnobs(props, storybookBridge);

  let hasLabel = storybookBridge.boolean("Include labels?", true);

  let count = storybookBridge.number("Number of list items", 5, {
    min: 1,
    max: 10
  });

  let list = "";
  
  for(var i=0; i < count; i++) {
    list += tools.customTag({
      tag: "li",
      content: tools.customTag({
        tag: "a",
        attributes: {
          href: "#"
        },
        content: (hasLabel ? tools.customTag({
          tag: "span",
          content: "Label"
        }) : "") + tools.autoHeading(true)
      })
    });
  }

  // const slots = PfeLinkList.slots;

  // Trigger the auto generation of the knobs for slots
  // config.has = tools.autoContentKnobs(slots, storybookBridge);

  config.slots = [
    {
      content: tools.customTag({
        tag: "h3",
        content: tools.autoHeading(true)
      }) + tools.customTag({
        tag: "ul",
        attributes: {
          "aria-labelledby": "simple-list"
        },
        content: list
      })
    }
  ];

  const render = template(config);
  return tools.preview(render);
});
