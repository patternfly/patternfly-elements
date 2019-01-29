import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeContentSet from "../pfe-content-set";

const stories = storiesOf("Content set", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeContentSet.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

const defaultHeading = tools.autoHeading(true);
const defaultPanel = tools.autoContent(1, 2);

stories.add(PfeContentSet.tag, () => {
  let config = {};

  // const props = PfeContentSet.properties;
  // Manually defining props but this can be done in a schema instead
  const props = {
    orientation: {
      title: "Orientation",
      type: "string",
      enum: ["horizontal", "vertical"],
      default: "Horizontal",
      required: true
    },
    "pfe-variant": {
      title: "Variant",
      type: "string",
      enum: ["primary", "secondary"]
    }
  };

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  const countLabel = "# of sets";
  const countDefault = 3;
  const countVar = storybookBridge.number(countLabel, countDefault);

  const sets = [];
  Array(countVar)
    .join(0)
    .split(0)
    .map((item, i) =>
      sets.push({
        heading: defaultHeading.replace(/^\w/, c => c.toUpperCase()),
        panel: defaultPanel
      })
    );

  config.slots = [
    {
      content: Array(countVar)
        .join(0)
        .split(0)
        .map((item, i) =>
          tools.component("pfe-content-set-group", {}, [
            {
              content:
                tools.customTag(
                  {
                    tag: "h2",
                    attributes: {
                      heading: true
                    },
                    content: sets[i].heading
                  },
                  "pfe"
                ) + sets[i].panel
            }
          ])
        )
        .join("")
    }
  ];

  // Some attribute values don't need to be included in the markup
  if (config.prop.orientation === "horizontal") {
    config.prop.orientation = null;
  }
  if (config.prop.orientation === "vertical") {
    // If the value is vertical, don't print an orientation attribute
    config.prop.orientation = null;
    // Add the vertical attribute set to true
    config.prop.vertical = true;
  }

  const render = template(config);
  const output = tools.preview(render);
  return output;
});
