import { storiesOf } from "@storybook/polymer";
import * as bridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeTextinput from "../dist/pfe-textinput";

const stories = storiesOf("Textinput", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

// Define the template to be used
const template = (data = {}) => {
  return tools.component("input", data.prop, data.slots, true);
};

const types = ["text", "password", "email", "search", "tel", "url"];

stories.addDecorator(bridge.withKnobs);

stories.add(PfeTextinput.tag, () => {
  let config = {};

  const props = {
    type: {
      title: "Type",
      type: "string",
      enum: types,
      default: "text"
    },
    placeholder: {
      title: "Placeholder",
      type: "string",
      default: "First Name"
    },
    disabled: {
      title: "Disabled",
      type: "boolean"
    }
  };

  // Trigger the auto generation of the knobs for attributes
  config.prop = tools.autoPropKnobs(props, bridge);
  config.slots = [];

  const render = `<pfe-textinput>${template(config)}</pfe-textinput>`;
  return tools.preview(render);
});

stories.add("At a glance", () => {
  return `
    <style>
      div {
        margin-bottom: 16px;
      }

      label {
        display: inline-block;
        width: 80px;
      }

      input {
        box-sizing: border-box;
      }
    </style>
    <h2>At a glance</h2>
    ${types
      .map(
        type => `
      <div>
        <label for="${type}">${type}</label>
        <pfe-textinput>
          <input type="${type}" id="${type}" placeholder="${type}">
        </pfe-textinput>
      </div>
    `
      )
      .join("")}
  `;
});
