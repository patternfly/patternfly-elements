import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import { merge } from "lodash";

import { PfeJumpLinksNav, PfeJumpLinksPanel } from "../dist/pfe-jump-links";
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
            PfeJumpLinksNav.tag,
            merge(data.navProp, {
              slot: data.navProp.horizontal ? null : "pfe-band--aside"
            }),
            [],
            true
          ) +
          tools.component(PfeJumpLinksPanel.tag, merge(data.panelProp, {}), [
            {
              content: autoContent
            }
          ])
      }
    ]
  );
};

stories.addDecorator(bridge.withKnobs);

stories.add("pfe-jump-links", () => {
  let config = {};

  // Trigger the auto generation of the knobs for attributes
  config.navProp = tools.autoPropKnobs(PfeJumpLinksNav, {}, "Navigation");
  config.panelProp = tools.autoPropKnobs(PfeJumpLinksPanel, {}, "Panel");

  const rendered = template(config);
  return tools.preview(rendered);
});
