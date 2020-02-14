import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

const cleaner = require("clean-html");

import PfeBand from "../dist/pfe-band.js";
// -- @TODO We can import properties from these
// -- to allow dynamic field generation
// import PfeCta from "../dist/pfe-cta.js";
// import PfeCard from "../dist/pfe-card.js";

let theme = "base";

const stories = storiesOf("Band", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the templates to be used
const template = (data = {}) =>
  tools.component(PfeBand.tag, data.prop, data.slots);

// prettier-ignore
const defaultContent = {
  header: tools.customTag({
    tag: "header",
    content: tools.customTag({
      tag: "h1",
      content: tools.autoHeading()
    })
  }),
  body: tools.customTag({
    tag: "article",
    content: tools.autoContent(4, 3)
  }),
  aside: tools.component("pfe-card", {
    color: `${["darker", "darkest", "complement", "accent"].includes(theme) ? "lightest" : "complement"}`
  }, [{
    tag: "h3",
    slot: "header",
    content: "Aside"
  }, {
    content: tools.autoContent(1, 1, true)
  }, {
    content: tools.component("pfe-cta", {
      slot: "footer",
      priority: "tertiary"
    }, [{
      tag: "a",
      attributes: {
        href: "#"
      },
      content: "Learn more"
    }])
  }]),
  footer: tools.component("pfe-cta", {
    priority: "primary"
  }, [{
    tag: "a",
    attributes: {
      href: "#"
    },
    content: "Learn more"
  }])
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeBand.tag, () => {
  let config = {};

  const props = PfeBand.properties;

  // -- Customize the default selection for the preview
  props.color.default = "lightest";

  // Set required fields for storybook interface
  props.color.required = true;
  props["aside-desktop"].required = true;
  props["aside-mobile"].required = true;
  props["aside-height"].required = true;

  // Build the knobs and read in their selections
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  const slots = PfeBand.slots;

  // Ask user if they want to add any custom content
  const customContent = storybookBridge.boolean(
    "Use custom content?",
    false,
    "Content"
  );

  // -- Attach the default content for that region
  ["header", "body", "aside", "footer"].forEach(region => {
    slots[region].default = defaultContent[region];
    if (customContent) {
      slots[region].value = storybookBridge.text(
        `${region.replace(/^\w/, c => c.toUpperCase())}`,
        "",
        `${region}`
      );
    }
  });

  // config.has = tools.autoContentKnobs(slots, storybookBridge);

  // Don't print the attribute in the example if it's the default value
  ["color", "aside-desktop", "aside-mobile", "aside-height"].forEach(p => {
    if (config.prop[p] === PfeBand.properties[p].default) {
      config.prop[p] = "";
    }
  });

  // prettier-ignore
  config.slots = [{
    slot: "pfe-band--header",
    content: customContent ? slots.header.value : slots.header.default
  }, {
    content: customContent ? slots.body.value : slots.body.default
  }, {
    slot: "pfe-band--footer",
    content: customContent ? slots.footer.value : slots.footer.default
  }, {
    slot: "pfe-band--aside",
    content: customContent ? slots.aside.value : slots.aside.default
  }];

  let rendered = template(config);

  return tools.preview(rendered);
});
