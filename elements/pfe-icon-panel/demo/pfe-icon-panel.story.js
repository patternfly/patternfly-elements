import { storiesOf } from "@storybook/polymer";
import { withKnobs } from "@storybook/addon-knobs";
import { withActions } from "@storybook/addon-actions";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";
import PfeIconPanel from "../dist/pfe-icon-panel.js";
import icons from "../../pfe-icon/demo/icon-sets.json";

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

const template = (data = {}) => tools.component(PfeIconPanel.tag, data.prop, data.slots, true);

const defaultHeading = tools.autoHeading(true);
const defaultBody = tools.autoContent(1, 1);

stories.add("pfe-icon-panel", () => {
  let config = {};

  const props = PfeIconPanel.schemaProperties;
  props.icon.enum = icons.rh_icon.concat(icons.web_icon);
  props.icon.default = props.icon.enum[0];

  props.circled.default = true;

  props.color.default = "complement";

  delete props.centered;

  // Build the knobs and read in their selections
  config.prop = tools.autoPropKnobs(PfeIconPanel, props);

  if (config.prop["pfe-stacked"] === true) {
    config.prop["pfe-centered"] = storybookBridge.boolean("Centered", false, "Attributes");
  }

  // const slots = PfeIconPanel.slots;

  config.slots = [
    {
      slot: "pfe-icon-panel--header",
      content: tools.customTag({
        tag: "h3",
        content: defaultHeading
      })
    },
    {
      content: defaultBody
    },
    {
      slot: "pfe-icon-panel--footer",
      content: tools.component("pfe-cta", {}, [
        {
          content: `<a href="#">Learn more</a>`
        }
      ])
    }
  ];

  let rendered = template(config);

  return tools.preview(rendered);
});
