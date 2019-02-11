import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

const cleaner = require("clean-html");

import PfeBand from "../pfe-band.js";
// -- @TODO We can import properties from these
// -- to allow dynamic field generation
// import PfeCta from "../pfe-cta.js";
// import PfeCard from "../pfe-card.js";

let theme = "base";

const stories = storiesOf("Band", module);

// Define the templates to be used
const template = (data = {}) =>
  tools.component(PfeBand.tag, data.prop, data.slots, "pfe");

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
  const slots = PfeBand.slots;

  //-- Add default content to slot objects
  Object.entries(slots).forEach(slot => {
    let supportedComponents = [];
    if (slot[1].type === "array") {
      slot[1].items.oneOf.forEach(item =>
        supportedComponents.push(
          Object.entries(item)
            .map(i => i[1])
            .join("")
        )
      );
    }
    slot[1].canContain = supportedComponents;
  });

  // -- Attach the default content for that region
  ["header", "body", "aside", "footer"].forEach(region => {
    slots[region].default = defaultContent[region];
  });

  // -- Customize the default selection for the preview
  props.color.default = "light";

  // Build the knobs and read in their selections
  config.prop = tools.autoPropKnobs(props, storybookBridge);
  config.has = tools.autoContentKnobs(slots, storybookBridge);

  // Don't print the attribute in the example if it's the default value
  ["color", "aside-desktop", "aside-mobile", "aside-height"].forEach(p => {
    if (config.prop[p] === PfeBand.properties[p].default) {
      config.prop[p] = "";
    }
  });

  // prettier-ignore
  config.slots = [{
    slot: "pfe-band--header",
    content: config.has.header
  }, {
    content: config.has.body
  }, {
    slot: "pfe-band--footer",
    content: config.has.footer
  }, {
    slot: "pfe-band--aside",
    content: config.has.aside
  }];

  let rendered = template(config);

  return tools.preview(rendered);
});
