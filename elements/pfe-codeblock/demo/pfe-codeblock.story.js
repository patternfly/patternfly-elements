import { storiesOf } from "@storybook/polymer";
import { withActions } from "@storybook/addon-actions";
import * as bridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeCodeblock from "../dist/pfe-codeblock";

const stories = storiesOf("Codeblock", module);
// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});
// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeCodeblock.tag, data.prop, data.slots);
};

// Use these to get dynamically generated content
// const defaultHeading = tools.autoHeading(true);
const defaultContent = "<pre codeblock-container><code>&#x3C;p&#x3E;some paragraph text&#x3C;/p&#x3E;</code></pre>";

stories.addDecorator(bridge.withKnobs);

stories.add(PfeCodeblock.tag, () => {
  let config = {};
  const props = PfeCodeblock.properties;

  //-- Set any custom defaults just for storybook here

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeCodeblock);

  const slots = PfeCodeblock.slots;

  //-- Set any custom content for the slots here

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has[""] to get user content
  // prettier-ignore
  config.slots = [{
    content: defaultContent
  }];

  //-- Reset default values show they don't render in the markup
  // if (config.prop["codeLanguage"] === "default") {
  //   config.prop["codeLanguage"] = "";
  // }

  const rendered = template(config);
  return tools.preview(rendered);
});
