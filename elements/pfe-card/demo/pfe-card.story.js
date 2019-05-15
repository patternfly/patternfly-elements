import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

// Add custom styles
const styles = `<style>
  *,
  *:after,
  *:before {
      box-sizing: border-box;
      -moz-box-sizing: border-box;
  }
  body {
      margin: 0; /* Removes default 8px margin */
  }
  h1, h2, h3, h4, h5, h6 {
      margin-top: 0;
      margin-bottom: 0;
  }
</style>`;

import PfeCard from "../pfe-card";

const stories = storiesOf("Card", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeCard.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

const defaultHeading = tools.autoHeading(true);
const defaultBody = tools.autoContent(1, 2);

stories.add(PfeCard.tag, () => {
  let config = {};
  const props = PfeCard.properties;

  // Set the storybook default to something more exciting
  props.color.default == "complement";

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  const slots = PfeCard.slots;

  //-- Add default content to slot objects

  // Build the default header content
  slots.header.default = defaultHeading;

  // Build the default body content
  slots.body.default = defaultBody;

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, storybookBridge);

  // Add the footer slot manually, does not accept user input via field
  slots.footer = {
    title: "Footer"
  };

  // Create an object for the footer attributes
  let footerAttrs = {};
  let ctaText;
  let ctaLink;

  // Manually ask user if they want a CTA included
  const ctaValue = storybookBridge.boolean(
    "Include a call-to-action?",
    true,
    "Call-to-action"
  );

  // If they do, prompt them for the cta text and style
  if (ctaValue) {
    ctaText = storybookBridge.text("Text", "Learn more", "Call-to-action");
    ctaLink = storybookBridge.text("Link", "#", "Call-to-action");
    const ctaPriorityValue = storybookBridge.select(
      "Priority",
      {
        null: "default",
        primary: "primary",
        secondary: "secondary"
      },
      "",
      "Call-to-action"
    );

    // Print the priority attribute if it's not default
    if (ctaPriorityValue !== "") {
      footerAttrs.priority = ctaPriorityValue;
    }
  }

  // Build the default footer component
  slots.footer.default = "";

  // If the link exists, add the default value for the footer slot
  if (ctaValue) {
    slots.footer.default = tools.component("pfe-cta", footerAttrs, [
      {
        content: `<a href="${ctaLink}">${ctaText}</a>`
      }
    ]);
  }

  // prettier-ignore
  config.slots = [{
    slot: "pfe-card--header",
    content: tools.customTag({
      tag: "h3",
      content: config.has.header
    })
  }, {
    content: config.has.body
  }, {
    slot: "pfe-card--footer",
    content: slots.footer ? slots.footer.default : ""
  }];

  // Some attribute values don't need to be included in the markup
  if (config.prop.color === "base") {
    config.prop.color = "";
  }

  if (config.prop.size === "standard") {
    config.prop.size = "";
  }

  const rendered = template(config);

  return styles + tools.preview(rendered);
});
