import { storiesOf } from "@storybook/polymer";
import { withKnobs } from "@storybook/addon-knobs/polymer";
import { withActions } from "@storybook/addon-actions";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
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

const template = (data = {}) =>
  tools.component(PfeIcon.tag, data.prop, [], true);

stories.add(PfeIcon.tag, () => {
  let config = {};

  const props = PfeIcon.properties;
  props.icon.enum = icons.rh_icon.concat(icons.web_icon);
  props.icon.default = props.icon.enum[0];

  props.size.default = "xl";

  PfeIcon.addIconSet("local", "./", function resolveIconName(
    name,
    iconSetName,
    iconSetPath
  ) {
    var iconName = name.replace(iconSetName + "-", "");
    var iconId = iconSetName + "-icon-" + iconName;
    return iconSetPath + "/" + iconId + ".svg";
  });

  // Build the knobs and read in their selections
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  let rendered = template(config);

  return tools.preview(rendered);
});
