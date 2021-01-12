import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
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
const template = (data = {}) => tools.component(PfeBand.tag, data.prop, data.slots);

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
    slot: "pfe-card--header",
    content: "Aside"
  }, {
    content: tools.autoContent(1, 1, true)
  }, {
    content: tools.component("pfe-cta", {
      slot: "pfe-card--footer"
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

  const overrides = {
    color: {
      default: "lightest",
      required: true
    }
  };

  _.each(["desktop", "mobile", "height"], item => {
    overrides[`aside${item.sentenceCase()}`] = { required: true };
  });

  // Build the knobs and read in their selections
  config.prop = tools.autoPropKnobs(PfeBand, overrides);

  const slots = PfeBand.slots;

  // Ask user if they want to add any custom content
  // const customContent = storybookBridge.boolean("Use custom content?", false, "Content");

  // // -- Attach the default content for that region
  // _.each(["header", "body", "aside", "footer"], region => {
  //   slots[region].default = defaultContent[region];
  //   if (customContent)
  //     slots[region].value = storybookBridge.text(`${region.replace(/^\w/, c => c.toUpperCase())}`, "", `${region}`);
  // });

  // config.has = tools.autoContentKnobs(slots, storybookBridge);

  // Don't print the attribute in the example if it's the default value
  _.each(["color", "asideDesktop", "asideMobile", "asideHeight"], p => {
    if (config.prop[p] === PfeBand.properties[p].default) {
      config.prop[p] = "";
    }
  });

  // prettier-ignore
  config.slots = [{
    slot: "pfe-band--header",
    // content: customContent ? slots.header.value : slots.header.default
    content: defaultContent.header
  }, {
    content: defaultContent.body
  }, {
    slot: "pfe-band--footer",
    content: defaultContent.footer
  }, {
    slot: "pfe-band--aside",
    content: defaultContent.aside
  }];

  let rendered = template(config);

  return tools.preview(rendered);
});
