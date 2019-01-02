import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

const cleaner = require("clean-html");

import PfeBand from "../pfe-band.js";

const darkThemes = ["darker", "darkest", "complement", "accent"];

const stories = storiesOf("Band", module);

// Define the templates to be used
const template = (data = {}) => {
  return tools.component(PfeBand.tag, data.prop, data.slots);
};
const defaultHeading = tools.autoHeading();

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

  // Build the default header content
  slots.header.default = defaultHeading;

  // Build the default body content
  slots.body.default = tools.autoContent(4, 3);

  // Build the default footer component
  slots.footer.default = tools.component(
    "pfe-cta",
    {
      slot: "footer",
      priority: "primary"
    },
    [
      {
        content: '<a href="#">Learn more</a>'
      }
    ]
  );

  // Build the default aside component
  slots.aside.default = tools.component(
    "pfe-card",
    {
      slot: "aside",
      color: darkThemes.includes(props["pfe-color"])
        ? "lightest"
        : "complement",
      on: darkThemes.includes(props["pfe-color"]) ? "" : "dark"
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
            priority: "tertiary",
            on: darkThemes.includes(props["pfe-color"]) ? "dark" : ""
          },
          [
            {
              content: '<a href="#">Learn more</a>'
            }
          ]
        )
      }
    ]
  );

  props["pfe-color"].default = "light";

  config.prop = tools.autoPropKnobs(props, storybookBridge);
  config.has = tools.autoContentKnobs(slots, storybookBridge);

  // Don't print the attribute if it's the default value
  [
    "pfe-color",
    "pfe-aside-desktop",
    "pfe-aside-mobile",
    "pfe-aside-height"
  ].forEach(p => {
    if (config.prop[p] === PfeBand.properties[p].default) {
      config.prop[p] = "";
    }
  });

  config.slots = [
    {
      content: tools.customTag({
        tag: "h1",
        slot: "header",
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

  cleaner.clean(
    rendered,
    {
      indent: "    ",
      "remove-attributes": [],
      wrap: 0
    },
    html => (rendered = html)
  );

  return `${rendered}
<pre style="white-space: pre-wrap; padding: 20px 50px; background-color: #f0f0f0; font-weight: bold;border: 1px solid #bccc;">
${tools.escapeHTML(rendered)}
</pre>
`;
});
