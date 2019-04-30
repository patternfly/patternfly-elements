import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeCta from "../pfe-cta";

const stories = storiesOf("Call to action", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeCta.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeCta.tag, () => {
  let config = {};
  // const props = PfeCta.properties;
  // Manually defining props but this can be done in a schema instead
  const props = {
    priority: {
      title: "Priority",
      type: "string",
      enum: ["primary", "secondary"],
      default: "primary"
    },
    color: {
      title: "Color",
      type: "string",
      enum: ["base", "complement", "accent"]
    }
  };

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  // const slots = PfeCard.slots;
  // Manually defining the slots but this can be done in a schema instead
  const slots = {
    text: {
      title: "Text"
    },
    link: {
      title: "Link"
    }
  };

  //-- Add default content to slot objects

  // Build the default text content
  slots.text.default = "Become a member";

  // Build the default link content
  slots.link.default = "https://www.redhat.com";

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, storybookBridge);

  config.slots = [
    {
      content: tools.customTag({
        tag: "a",
        attributes: {
          href: config.has.link
        },
        content: config.has.text
      })
    }
  ];

  const render = template(config);
  return tools.preview(render);
});

stories.add("At a glance", () => {
  return `
  <style>
    div {
      margin-bottom: 40px;
    }

    pfe-cta {
      margin-right: 10px;
    }
  </style>
  <section>
    <h2>At a glance</h2>
    <div>
      <h3>Defaults</h3>
      <pfe-cta><a href="#">Default</a></pfe-cta>
      <pfe-cta priority="primary"><a href="#">Primary</a></pfe-cta>
      <pfe-cta priority="secondary"><a href="#">Secondary</a></pfe-cta>
    </div>
    <div>
      <h3>Color: Base</h3>
      <pfe-cta color="base"><a href="#">Default</a></pfe-cta>
      <pfe-cta priority="primary" color="base"><a href="#">Primary</a></pfe-cta>
      <pfe-cta priority="secondary" color="base"><a href="#">Secondary</a></pfe-cta>
    </div>
    <div>
      <h3>Color: Complement</h3>
      <pfe-cta color="complement"><a href="#">Default</a></pfe-cta>
      <pfe-cta priority="primary" color="complement"><a href="#">Primary</a></pfe-cta>
      <pfe-cta priority="secondary" color="complement"><a href="#">Secondary</a></pfe-cta>
    </div>
    <div>
      <h3>Color: Accent</h3>
      <pfe-cta color="accent"><a href="#">Default</a></pfe-cta>
      <pfe-cta priority="primary" color="accent"><a href="#">Primary</a></pfe-cta>
      <pfe-cta priority="secondary" color="accent"><a href="#">Secondary</a></pfe-cta>
    </div>
  </section>
  `;
});
