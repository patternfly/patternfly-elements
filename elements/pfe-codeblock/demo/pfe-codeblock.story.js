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

stories.addDecorator(bridge.withKnobs);

stories.add(PfeCodeblock.tag, () => {
  let config = {};
  const props = PfeCodeblock.properties;

  //-- Set any custom defaults just for storybook here
  props.codeLanguage.default = "js";
  props.codeLineNumbers.default = true;

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeCodeblock, props);

  const slots = PfeCodeblock.slots;

  //-- Set any custom content for the slots here

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, bridge);

  //-- Build your slots here using config.has[""] to get user content
  // prettier-ignore
  config.slots = [{
    content: `<pre codeblock-container><code>let add = (x, y) => x + y;</code></pre>`
  }];

  //-- Reset default values show they don't render in the markup
  // if (config.prop["codeLanguage"] === "default") {
  //   config.prop["codeLanguage"] = "";
  // }

  const rendered = template(config);
  return tools.preview(rendered);
});
