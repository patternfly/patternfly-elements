import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";

import {
  escapeHTML,
  dynamicKnobs,
  component,
  autoHeading,
  autoContent
} from "../../../.storybook/utils.js";
const cleaner = require("clean-html");

import PfeBand from "../pfe-band.js";

const darkThemes = ["darker", "darkest", "complement", "accent"];

const stories = storiesOf("Band", module);

// Define the templates to be used
const template = (data = {}) => {
  return component("pfe-band", data.properties, [
    {
      tag: "h1",
      slot: "header",
      check: data.hasHeader,
      content: autoHeading()
    },
    {
      content: autoContent(4, 3)
    },
    {
      tag: "pfe-cta",
      slot: "footer",
      check: data.hasFooter,
      attributes: {
        priority: "primary"
      },
      content: '<a href="#">Learn more</a>'
    },
    {
      slot: "aside",
      check: data.hasAside,
      component: component(
        "pfe-card",
        {
          slot: "aside",
          color: darkThemes.includes(data.properties["pfe-color"])
            ? "lightest"
            : "complement"
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
            tag: "pfe-cta",
            slot: "footer",
            content: '<a href="#">Learn more</a>',
            attributes: {
              priority: "tertiary",
              on: darkThemes.includes(data.properties["pfe-color"])
                ? "dark"
                : ""
            }
          }
        ]
      )
    }
  ]);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeBand.tag, () => {
  const binding = {};

  binding.properties = dynamicKnobs(PfeBand.properties, storybookBridge);
  binding["hasHeader"] = storybookBridge["boolean"]("Header slot", true);
  binding["hasFooter"] = storybookBridge["boolean"]("Footer slot", true);
  binding["hasAside"] = storybookBridge["boolean"]("Aside slot", true);

  let rendered = template(binding);
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
