import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

const cleaner = require("clean-html");

import PfeBand from "../pfe-band.js";

let theme = "base";

const stories = storiesOf("Band", module);

// Define the templates to be used
const template = (data = {}) => {
  return tools.component(PfeBand.tag, data.prop, data.slots);
};

const defaultContent = {
  header: tools.autoHeading(),
  body: tools.component("article", {
    content: tools.autoContent(4, 3)
  }),
  aside: tools.component(
    "pfe-card",
    {
      slot: "pfe-band--aside",
      color: `${["darker", "darkest", "complement", "accent"].includes(theme) ? "lightest" : "complement"}`
    },
    [
      {
        tag: "h3",
        slot: "header",
        content: "Aside"
      },
      {
        content: tools.autoContent(1, 1, true)
      },
      {
        content: tools.component(
          "pfe-cta",
          {
            slot: "footer",
            priority: "tertiary"
          },
          [
            {
              content: '<a href="#">Learn more</a>'
            }
          ]
        )
      }
    ]
  ),
  footer: tools.component(
    "pfe-cta",
    {
      slot: "pfe-band--footer",
      priority: "primary"
    },
    [
      {
        content: '<a href="#">Learn more</a>'
      }
    ]
  )
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeBand.tag, () => {
  let config = {};
  const props = PfeBand.properties;
  const slots = PfeBand.slots;

  //-- Add default content to slot objects
  Object.entries(slots).forEach(slot => {
    let supportedComponents = [];
    if (slot[1].type === "array") {
      slot[1].items.oneOf.forEach(item =>
        supportedComponents.push(
          Object.entries(item)
            .map(i => i[1])
            .join("")
        )
      );
    }
    slot[1].canContain = supportedComponents;
  });

  ["header", "body", "aside", "footer"].forEach(region => {
    // Build the default content for that region
    slots[region].default = defaultContent[region];
  });

  props.color.default = "light";

  config.prop = tools.autoPropKnobs(props, storybookBridge);
  config.has = tools.autoContentKnobs(slots, storybookBridge);

  theme = config.prop.color;

  // Don't print the attribute if it's the default value
  ["color", "aside-desktop", "aside-mobile", "aside-height"].forEach(p => {
    if (config.prop[p] === PfeBand.properties[p].default) {
      config.prop[p] = "";
    }
  });

  config.slots = [
    {
      content: tools.customTag({
        tag: "h1",
        slot: "pfe-band--header",
        content: config.has.header
      })
    },
    {
      content: config.has.body
    },
    {
      content: config.has.footer
    },
    {
      content: config.has.aside
    }
  ];

  let rendered = template(config);

  return tools.preview(rendered);
});
