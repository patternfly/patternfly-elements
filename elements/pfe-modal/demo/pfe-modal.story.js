import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";
import PfeModal from "../pfe-modal";

const stories = storiesOf("Modal", module	);


// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeModal.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);


stories.add(PfeModal.tag, () => {
  let config = {};
  const props = PfeModal.properties;

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, storybookBridge);

  const slots = PfeModal.slots;

  // Trigger the auto generation of the knobs for slots
  config.has = tools.autoContentKnobs(slots, storybookBridge);

  // prettier-ignore
  config.slots = [{
    slot: "pfe-card--trigger",
    tag: "a",
    content: "launch"
  }, {
    slot: "pfe-modal--header",
    content: tools.customTag({
      tag: "h3",
      content: config.has.header
    })
  }, {
    content: config.has.body
  }];

	const render = template(config);
  return tools.preview(render);
});
