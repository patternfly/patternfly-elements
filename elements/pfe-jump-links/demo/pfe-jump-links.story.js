import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import { merge } from "lodash";

import { PfeJumpLinks, PfeJumpLinksNav, PfeJumpLinksPanel } from "../dist/pfe-jump-links";

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
      "aside-mobile": "top"
    },
    [
      {
        content:
          tools.component(
            PfeJumpLinksNav.tag,
            merge(data.navProp, {
              // id: "jumplinks",
              slot: data.navProp.horizontal ? null : "pfe-band--aside"
            }),
            [],
            true
          ) +
          tools.component(
            PfeJumpLinksPanel.tag,
            merge(data.panelProp, {
              // scrolltarget: "jumplinks"
            }),
            [
              {
                content: autoContent
              }
            ]
          )
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
    PfeJumpLinksNav,
    {
      autobuild: {
        default: true,
        hidden: true
      }
    },
    "Navigation"
  );

  config.panelProp = tools.autoPropKnobs(PfeJumpLinksPanel, {}, "Panel");

  const rendered = template(config);
  return tools.preview(rendered);
});
