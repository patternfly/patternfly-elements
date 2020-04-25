import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeButton from "../dist/pfe-button";

const stories = storiesOf("Button", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeButton.tag, data.prop, data.slots);
};

// Use these to get dynamically generated content
// const defaultHeading = tools.autoHeading(true);
const defaultContent = tools.autoContent(1, 2);

stories.addDecorator(bridge.withKnobs);

stories.add(PfeButton.tag, () => {
  let config = {};
  const props = PfeButton.properties;

  //-- Set any custom defaults just for storybook here

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, bridge);

  const slots = PfeButton.slots;

  //-- Set any custom content for the slots here

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has[""] to get user content
  // prettier-ignore
  config.slots = [{
    content: tools.customTag({
      tag: "button",
      content: "My Button"
    })
  }];

  //-- Reset default values show they don't render in the markup
  // if (config.prop[""] === "default") {
  //   config.prop[""] = "";
  // }

  const rendered = template(config);
  return tools.preview(rendered);
});

stories.add("At a glance", () => {
  const variants = PfeButton.properties.variant.enum;

  return `
    <style>
      pfe-button button {
        text-transform: capitalize;
      }
    </style>

    <h2>At a glance</h2>
    <section>
      <h3>Variants</h3>
      ${variants
        .map(
          variant => `
        <pfe-button pfe-variant="${variant}">
          <button>${variant}</button>
        </pfe-button>
      `
        )
        .join("")}
    </section>
    <section>
      <h3>Disabled</h3>
      ${variants
        .map(
          variant => `
        <pfe-button pfe-variant="${variant}">
          <button disabled>${variant}</button>
        </pfe-button>
      `
        )
        .join("")}
    </section>
  `;
});
