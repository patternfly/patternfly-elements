import { storiesOf } from "@storybook/polymer";
import { withActions } from "@storybook/addon-actions";
import * as bridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeButton from "../dist/pfe-button";

const stories = storiesOf("Button", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeButton.tag, data.prop, data.slots);
};

stories.addDecorator(bridge.withKnobs);

// Log events under "Actions" tab
stories.addDecorator(withActions("pfe-button:click"));

stories.add(PfeButton.tag, () => {
  let config = {};

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(PfeButton);

  // Trigger the auto generation of the knobs for slots
  // config.has = tools.autoContentKnobs(PfeButton);

  // prettier-ignore
  config.slots = [{
    content: tools.customTag({
      tag: "button",
      content: "My button"
    })
  }];

  const rendered = template(config);

  const variants = PfeButton.properties.variant.values;

  return (
    tools.preview(rendered) +
    `<hr/>
    <h2>At a glance</h2>
    <section>
      <h3>Variants</h3>
      ${variants
        .map(
          variant => `
        <pfe-button variant="${variant}">
          <button>${variant.sentenceCase()}</button>
        </pfe-button>
      `
        )
        .join("")}
    </section>
    <section style="margin-top: 20px">
      <h3>Disabled</h3>
      ${variants
        .map(
          variant => `
        <pfe-button variant="${variant}">
          <button disabled>${variant.sentenceCase()}</button>
        </pfe-button>
      `
        )
        .join("")}
    </section>
  `
  );
});
