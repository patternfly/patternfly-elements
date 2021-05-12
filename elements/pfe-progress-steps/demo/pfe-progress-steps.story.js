import { storiesOf } from "@storybook/polymer";
import { withActions } from "@storybook/addon-actions";
import * as bridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeProgressSteps from "../dist/pfe-progress-steps.js";

const stories = storiesOf("Progress stepper", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeProgressSteps.tag, data.prop, data.slots);
};

const item = (title, description, state = "", current = false) => `
<pfe-progress-steps-item${state ? ` state="${state}"` : ""}${current ? ` current` : ""}>
${title ? `<div slot="title">${title}</div>` : ""}
${description ? `<a slot="link" href="#">${description}</a>` : ""}
</pfe-progress-steps-item>`;

stories.addDecorator(bridge.withKnobs);

stories.add(PfeProgressSteps.tag, () => {
  let config = {};
  
  config.prop = tools.autoPropKnobs(PfeProgressSteps);

  // Let the user determine number of accordions
  const itemCount = bridge.number("Count", 3, {
    min: 2,
    max: 5
  }, "count");
  
  let content = "";

  for (let i = 0; i < itemCount; i++) {
    let defaultTitle = "Next";
    let defaultState = null;

    if (i === 0) {
      defaultTitle = "Current";
      defaultState = "done";
    } else if (i === 1) {
      defaultState = "active";
    } else if (i === (itemCount - 1)) {
      defaultTitle = "Last";
    }

    const title = bridge.text(`Title for item ${i + 1}`, defaultTitle, "steps-item");
    const description = bridge.text(`Description for item ${i + 1}`, `View ${defaultTitle.toLowerCase()} step`, "steps-item");
    const state = bridge.select(`State of item ${i + 1}`, {
      "active": "active",
      "inactive": null,
      "done": "done",
      "error": "error"
    }, defaultState, "steps-item");

    content += item(title, description, state, i === 1 ? true : false);
  }


  // prettier-ignore
  config.slots = [{
    content: content
  }];

  const rendered = template(config);
  return tools.preview(rendered);
});
