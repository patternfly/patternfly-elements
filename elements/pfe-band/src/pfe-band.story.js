import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";

import {
  escapeHTML,
  autoPropKnobs,
  autoContentKnobs,
  component,
  autoHeading,
  autoContent,
  customTag
} from "../../../.storybook/utils.js";

const cleaner = require("clean-html");

import PfeBand from "../pfe-band.js";

const darkThemes = ["darker", "darkest", "complement", "accent"];

const stories = storiesOf("Band", module);

// Define the templates to be used
const template = (data = {}) => {
  return component("pfe-band", data.prop, [
    {
      slot: "header",
      content: data.has.header
    },
    {
      content: data.has.body
    },
    {
      slot: "footer",
      content: data.has.footer
    },
    {
      slot: "aside",
      component: data.has.aside
    }
  ]);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeBand.tag, () => {
  const config = {};
  const props = PfeBand.properties;
  const slots = PfeBand.slots;

  //-- Add default content to slot objects

  // Build the default header content
  slots.header.default = customTag({
    tag: "h1",
    content: autoHeading()
  });

  // Build the default body content
  slots.body.default = autoContent(4, 3);

  // Build the default footer component
  slots.footer.default = component(
    "pfe-cta",
    {
      priority: "primary"
    },
    [
      {
        content: '<a href="#">Learn more</a>'
      }
    ]
  );

  // Build the default aside component
  slots.aside.default = component(
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
        content: autoContent(1, 1, true)
      },
      {
        content: component(
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

  config.prop = autoPropKnobs(props, storybookBridge);
  config.has = autoContentKnobs(slots, storybookBridge);

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
${escapeHTML(rendered)}
</pre>
`;
});
