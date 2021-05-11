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

  //-- Build your slots here using config.has[""] to get user content
  // prettier-ignore
  config.slots = [{
    content: `<pfe-progress-steps-item state="active" current>
        <div slot="title">Current</div>
        <a slot="link" href="#">View current step</a>
      </pfe-progress-steps-item>
      <pfe-progress-steps-item>
        <div slot="title">Next</div>
        <a slot="link" href="#">View next step</a>
      </pfe-progress-steps-item>
      <pfe-progress-steps-item>
        <div slot="title">Last</div>
        <a slot="link" href="#">View last step</a>
      </pfe-progress-steps-item>`
  }];

  const rendered = template(config);
  return tools.preview(rendered);
});
