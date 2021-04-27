import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs";
import { withActions } from "@storybook/addon-actions";
import * as tools from "../../../.storybook/utils.js";

import PfePrimaryDetail from "../dist/pfe-primary-detail";

const stories = storiesOf("Primary detail", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfePrimaryDetail.tag, data.prop, data.slots);
};

// Randomly generated content
let lists = [];
let headings = [];
for (let i = 1; i <= 4; i++) {
  let list = [];
  for (let j = 1; j <= 6; j++) {
    list.push(tools.autoHeading(true));
  }
  headings.push(tools.autoHeading(true));
  lists.push(list);
}

stories.addDecorator(bridge.withKnobs);

// Log events
stories.addDecorator(withActions("pfe-primary-detail:hidden-tab", "pfe-primary-detail:shown-tab"));

stories.add(PfePrimaryDetail.tag, () => {
  let config = {};

  // Note: No customizable attributes on this component at this time
  // Trigger the auto generation of the knobs for attributes
  // config.prop = tools.autoPropKnobs(PfePrimaryDetail);

  config.slots = [];

  // Manually define the slotted content
  lists.forEach((list, idx) => {
    config.slots.push(
      {
        slot: "details-nav",
        tag: "h3",
        content: headings[idx]
      },
      {
        slot: "details",
        tag: "ul",
        content: list
          .map(content =>
            tools.customTag({
              tag: "li",
              content: tools.customTag({
                tag: "a",
                attributes: {
                  href: "#nowhere"
                },
                content: content
              })
            })
          )
          .join("")
      }
    );
  });

  config.slots.push({
    slot: "details-nav--footer",
    content: tools.component("pfe-cta", { priority: "primary" }, [
      {
        content: "<a href='#'>All products</a>"
      }
    ])
  });

  const rendered = template(config);
  return tools.preview(rendered);
});
