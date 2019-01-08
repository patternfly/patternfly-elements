import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeCard from "../pfe-card";

// import cpTheme from "../../../themes/cp-theme/cp-theme.js";

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
  // const props = PfeCard.properties;
  // Manually defining props but this can be done in a schema instead
  const props = {
    color: {
      title: "Color",
      type: "string",
      enum: [
        "lightest",
        "light",
        "default",
        "dark",
        "darkest",
        "complement",
        "accent"
      ],
      default: "complement"
    },
    size: {
      title: "Padding size",
      type: "string",
      enum: ["small", "standard"],
      default: "standard"
    }
  };

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  // const slots = PfeCard.slots;
  // Manually defining the slots but this can be done in a schema instead
  const slots = {
    header: {
      title: "Header"
    },
    body: {
      title: "Body"
    }
  };

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
        default: "default",
        primary: "primary",
        secondary: "secondary"
      },
      "default",
      "Call-to-action"
    );

    // Print the priority attribute if it's not default
    if (ctaPriorityValue !== "default") {
      footerAttrs.priority = ctaPriorityValue;
    }

    // If the card uses a dark theme, add the on="dark" attribute
    if (
      ["dark", "darkest", "accent", "complement"].includes(config.prop.color)
    ) {
      footerAttrs.on = "dark";
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

  config.slots = [
    {
      slot: "header",
      content: tools.customTag({
        tag: "h3",
        content: config.has.header
      })
    },
    {
      content: config.has.body
    },
    {
      slot: "footer",
      content: slots.footer ? slots.footer.default : ""
    }
  ];

  // Some attribute values don't need to be included in the markup
  if (config.prop.color === "default") {
    config.prop.color = "";
  }

  if (config.prop.size === "standard") {
    config.prop.size = "";
  }

  const render = template(config);
  const output = tools.preview(render);
  return output;
});
