import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

const cleaner = require("clean-html");

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

  let rendered = template(config);

  cleaner.clean(
    rendered,
    {
      indent: "    ",
      "remove-attributes": [],
      wrap: 0
    },
    html => (rendered = html)
  );

  return `${rendered}
<pre style="white-space: pre-wrap; padding: 20px 50px; background-color: #f0f0f0; font-weight: bold;border: 1px solid #bccc;">
${tools.escapeHTML(rendered)}
</pre>
`;

  //   valueAttr =
  //     ctaPriorityValue != "default" ? ` priority="${ctaPriorityValue}"` : "";
  //   if (
  //     colorValue != "lightest" &&
  //     colorValue != "light" &&
  //     colorValue != "default"
  //   ) {
  //     ctaOnDark = ' on="dark"';
  //   }
  //   cardFooter = `\n  <div slot="footer"><pfe-cta${valueAttr}${ctaOnDark}><a href="#">Learn more</a></div>`;
  // }

  //   colorAttr = colorValue != "default" ? ` color="${colorValue}"` : "";

  //   return `

  //   <style>
  //   .custom-card {
  //     width: 40%;
  //   }

  //   .demo-cards {
  //     display: flex;
  //     flex-wrap: wrap;
  //   }

  //   .demo-cards > pfe-card {
  //     margin: 0 16px 32px;
  //     width: calc(35% - 32px);
  //   }
  //   </style>

  //   <section>
  //     <h2>Your PFElement</h2>
  //     <pfe-card class="custom-card"${colorAttr}>
  //       <h2 slot="header">Card Heading</h2>
  //       <p>Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>${cardFooter}
  //     </pfe-card>
  //   </section>
  //   <section>
  //     <h2>Markup</h2>
  //     <pre style="margin-left:15px;">
  // <code>&lt;pfe-card${colorAttr}&gt;
  //   &lt;h2 slot="header"&gt;Card Heading&lt/h2&gt;
  //   &lt;p&gt;Become a Member&lt;/p&gt;${escapeHTML(cardFooter)}
  // &lt;/pfe-card&gt;</code>
  //   </pre>
  //   </section>
  //   <section>
  //     <h2>At a glance</h2>
  //     <div class="demo-cards">
  //       <pfe-card color="lightest">
  //         <h2 slot="header">Lightest card</h2>
  //         <p>This is the lightest pfe-card.</p>
  //         <div slot="footer"><pfe-cta priority="primary"><a href="#">Learn more</a></pfe-cta></div>
  //       </pfe-card>
  //       <pfe-card color="light">
  //         <h2 slot="header">Light card</h2>
  //         <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
  //         <p>Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
  //         <div slot="footer"><pfe-cta priority="secondary"><a href="#">Learn more</a></pfe-cta></div>
  //       </pfe-card>
  //       <pfe-card>
  //         <h2 slot="header">Default card</h2>
  //         Unwrapped item. This is the default pfe-card.
  //         <div slot="footer"><pfe-cta priority="secondary"><a href="#">Learn more</a></pfe-cta></div>
  //       </pfe-card>
  //       <pfe-card color="dark">
  //         <h2 slot="header">Dark Card</h2>
  //         <p>This is the dark pfe-card.</p>
  //         <div slot="footer"><pfe-cta priority="secondary" on="dark"><a href="#">Learn more</a></pfe-cta></div>
  //       </pfe-card>
  //       <pfe-card color="darkest">
  //         <h2 slot="header">Darkest Card</h2>
  //         <p>This is the darkest pfe-card.</p>
  //         <div slot="footer"><pfe-cta priority="secondary" on="dark"><a href="#">Learn more</a></pfe-cta></div>
  //       </pfe-card>
  //       <pfe-card color="complement">
  //         <h2 slot="header">Complement Card</h2>
  //         <p>This is the complement pfe-card.</p>
  //         <div slot="footer"><pfe-cta priority="secondary" on="dark"><a href="#">Learn more</a></pfe-cta></div>
  //       </pfe-card>
  //       <pfe-card color="accent">
  //         <h2 slot="header">Accent Card</h2>
  //         <p>This is the accent pfe-card. Leverage agile frameworks to provide a robust synopsis for high level overviews.</p>
  //       </pfe-card>
  //     </div>
  //   </section>

  //   `;
});
