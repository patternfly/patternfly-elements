import { storiesOf } from "@storybook/polymer";
import { withKnobs } from "@storybook/addon-knobs";
import { withActions } from "@storybook/addon-actions";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";
import PfeIcon from "../dist/pfe-icon";
import icons from "./icon-sets.json";

const stories = storiesOf("Icon", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

stories.addDecorator(withKnobs);

// Log events
stories.addDecorator(withActions("pfe-icon:add-icon-set"));

const template = (data = {}) => tools.component(PfeIcon.tag, data.prop, [], true);

stories.add(PfeIcon.tag, () => {
  tools.context();

  let config = {};

  // Build the knobs and read in their selections
  config.prop = tools.autoPropKnobs(PfeIcon, {
    icon: {
      values: icons.rh_icon.concat(icons.web_icon),
      default: icons.rh_icon[0]
    },
    size: {
      default: "xl"
    }
  });

  let rendered = template(config);

  return tools.preview(rendered);
});
