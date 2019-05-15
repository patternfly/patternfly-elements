import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeHealthIndex from "../pfe-health-index";

// import cpTheme from "../../../themes/cp-theme/cp-theme.js";

const stories = storiesOf("Health Index", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeHealthIndex.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeHealthIndex.tag, () => {
  let config = {};
  // const props = PfeCta.properties;
  // Manually defining props but this can be done in a schema instead
  const props = {
    "health-index": {
      title: "Health Index",
      type: "string",
      enum: ["A", "B", "C", "D", "E", "F"],
      default: "A",
      required: true
    }
  };

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  // Fallback date is the "content" for this component
  config.slots = [
    {
      content: config.prop["health-index"]
    }
  ];

  const render = template(config);
  return tools.preview(render);
});
