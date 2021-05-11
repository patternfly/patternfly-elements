import { storiesOf } from "@storybook/polymer";
import { withActions } from "@storybook/addon-actions";
import * as bridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeProgressSteps from "../dist/pfe-progress-steps.js";

const stories = storiesOf("Progress stepper", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeProgressSteps.tag, data.prop, data.slots);
};

// Use these to get dynamically generated content
// const defaultHeading = tools.autoHeading(true);
const defaultContent = tools.autoContent(1, 2);

stories.addDecorator(bridge.withKnobs);

stories.add(PfeProgressSteps.tag, () => {
  let config = {};

  const item = (title, description, state = "", current = false) => {
    return `<pfe-progress-steps-item${state ? ` state="${state}"` : ""}${current ? ` current` : ""}>
  <div slot="title">${title}</div>
  <a slot="link" href="#">${description}</a>
</pfe-progress-steps-item$>`
  };

  //-- Build your slots here using config.has[""] to get user content
  // prettier-ignore
  config.slots = [{
    content: 
      item("Current", "View current step", "active", true) + 
      item("Next", "View next step") + 
      item("Last", "View last step")
  }];

  const rendered = template(config);
  return tools.preview(rendered);
});
