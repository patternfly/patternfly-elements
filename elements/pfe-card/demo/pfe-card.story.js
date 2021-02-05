import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
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
</style>`;

import PfeCard from "../dist/pfe-card";

const stories = storiesOf("Card", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeCard.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs({ escapeHTML: false }));

const defaultHeading = tools.autoHeading(true);
const defaultBody = tools.autoContent(1, 2);

stories.add(PfeCard.tag, () => {
  let config = {};

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeCard, {
    color: { default: "complement", required: true }
  });

  const slots = PfeCard.slots;

  //-- Add default content to slot objects

  // Build the default header content
  slots.header.default = defaultHeading;

  // Build the default body content
  slots.body.default = defaultBody;

  // Manually ask user if they want an image included
  const imageValue = storybookBridge.boolean("Include a sample image?", true, "Image");

  let overflowAttr = [];
  let ctaValue;
  let image = "";
  let region = "body";

  // If they do, prompt them for the image properties
  if (imageValue) {
    let overflow = storybookBridge.select(
      "Image overflow?",
      {
        "no overflow": null,
        "top & sides": "top",
        "bottom & sides": "bottom",
        "sides only": "sides"
      },
      "top & sides",
      "Image"
    );

    // Create the overflow attribute value based on user selections
    switch (overflow) {
      case "top":
        overflowAttr.push("top");
        overflowAttr.push("right");
        overflowAttr.push("left");
        break;
      case "bottom":
        overflowAttr.push("right");
        overflowAttr.push("bottom");
        overflowAttr.push("left");
        region = "footer";
        break;
      case "sides":
        overflowAttr.push("right");
        overflowAttr.push("left");
        break;
    }

    image = `<img src=\"https://placekitten.com/1000/300\" ${
      overflowAttr.length > 0 ? `overflow=\"${overflowAttr.join(" ")}\"` : ""
    }/>`;
  }

  // Create an object for the footer attributes
  let footerAttrs = {};

  if (!imageValue || (imageValue && !overflowAttr.includes("bottom"))) {
    let ctaText;
    let ctaLink;

    // Manually ask user if they want a CTA included
    ctaValue = storybookBridge.boolean("Include a call-to-action?", true, "Call-to-action");

    // If they do, prompt them for the cta text and style
    if (ctaValue) {
      ctaText = storybookBridge.text("Text", "Learn more", "Call-to-action");
      ctaLink = storybookBridge.text("Link", "#", "Call-to-action");
      const ctaPriorityValue = storybookBridge.select(
        "Priority",
        {
          default: null,
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

    if (ctaValue) {
      // If the link exists, add the default value for the footer slot
      slots.footer.default = tools.component("pfe-cta", footerAttrs, [
        {
          content: `<a href="${ctaLink}">${ctaText}</a>`
        }
      ]);
    } else {
      slots.footer.default = "";
    }
  }

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, storybookBridge);

  config.slots = [];

  if (config.has.header.length > 0) {
    config.slots.push({
      slot: "pfe-card--header",
      content: tools.customTag({
        tag: "h3",
        content: config.has.header
      })
    });
  }

  config.slots.push({
    content: region !== "footer" ? image + config.has.body : config.has.body
  });

  if (ctaValue && config.has.footer.length > 0) {
    config.slots.push({
      slot: "pfe-card--footer",
      content: region === "footer" ? image : config.has.footer
    });
  }

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
