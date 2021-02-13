import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import { merge } from "lodash";

import PfeJumpLinks from "../dist/pfe-jump-links";

import PfeBand from "../../pfe-band/dist/pfe-band";

const stories = storiesOf("Jump links", module);

let autoContent = "";
for (let i = 0; i <= 3; i++) {
  autoContent +=
    `<h3 class="pfe-jump-links-panel__section" id="section${i + 1}">Section ${i + 1}</h3>` + tools.autoContent(2, 2);
}

// Define the template to be used
const template = (data = {}) => {
  return tools.component(
    PfeBand.tag,
    {
      "aside-desktop": "left",
      "aside-mobile": "top",
      color: "lightest"
    },
    [
      {
        content:
          tools.component(
            "pfe-jump-links-nav",
            merge(data.navProp, {
              slot: data.navProp.horizontal ? null : "pfe-band--aside"
            }),
            [],
            true
          ) +
          tools.component("pfe-jump-links-panel", merge(data.panelProp, {}), [
            {
              content: autoContent
            }
          ])
      }
    ]
  );
};

stories.addDecorator(bridge.withKnobs);

stories.add(PfeJumpLinks.tag, () => {
  let config = {};

  //-- Set any custom defaults just for storybook here

  // Trigger the auto generation of the knobs for attributes

  config.navProp = tools.autoPropKnobs(
    PfeJumpLinks,
    {
      autobuild: {
        title: "Autobuild",
        type: Boolean,
        default: true,
        hidden: true
      },
      horizontal: {
        title: "Horizontal",
        type: Boolean
      },
      srText: {
        title: "Screen reader text",
        type: String,
        default: "Jump to section",
        hidden: true
      },
      color: {
        title: "Color",
        type: String,
        values: ["darkest"]
      }
    },
    "Navigation"
  );

  config.panelProp = tools.autoPropKnobs(
    PfeJumpLinks,
    {
      offset: {
        title: "Offset",
        type: Number,
        observer: "_offsetChanged"
      }
    },
    "Panel"
  );

  const rendered = template(config);
  return tools.preview(rendered);
});
