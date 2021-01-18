import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeModal from "../dist/pfe-modal";
import PfeCta from "../../pfe-cta/dist/pfe-cta";

const stories = storiesOf("Modal", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

const defaultHeader = tools.autoHeading();
const defaultContent = tools.autoContent();

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeModal.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeModal.tag, () => {
  // tools.context();

  let config = {};

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeModal);

  const slots = PfeModal.slots;

  slots.trigger.default = "Launch modal";
  slots.header.default = defaultHeader;
  slots.body.default = defaultContent;

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, storybookBridge);

  // prettier-ignore
  config.slots = [{
    slot: "pfe-modal--trigger",
    tag: "button",
    content: config.has.trigger
  }, {
    slot: "pfe-modal--header",
    content: tools.customTag({
      tag: "h3",
      content: config.has.header
    })
  }, {
    content: config.has.body + tools.component(PfeCta.tag, {}, [{
      content: tools.customTag({
        tag: "a",
        attributes: {
          href: "#"
        },
        content: "Learn more"
      })
    }])
  }];

  const render = template(config);
  return tools.preview(render);
});
