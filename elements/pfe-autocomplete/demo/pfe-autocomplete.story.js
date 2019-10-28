import { storiesOf } from "@storybook/polymer";
<<<<<<< HEAD
import {
  withKnobs,
  text,
  select,
  boolean
} from "@storybook/addon-knobs/polymer";
import addons from '@storybook/addons';
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import CoreEvents from '@storybook/core-events';
import PfeAutocomplete from "../dist/pfe-autocomplete";
import * as tools from "../../../.storybook/utils.js";

const stories = storiesOf("Autocomplete", module);

const items = [
  "Item 1",
  "Item 2",
  "United States",
  "Chicago Cubs",
  "Red Hat",
  "Purple",
  "Curious George",
  "United Kingdom",
  "Elephant",
  "Baseball",
  "Bingo",
  "Book",
  "Android",
  "iOS",
  "Linux",
  "Red Hat Enterprise Linux"
];

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

stories.addDecorator(withKnobs);
stories.addDecorator(story => {
    addons.getChannel().emit(CoreEvents.REGISTER_SUBSCRIPTION, subscribe);
    return story();
  });

function subscribe() {
  setTimeout(() => {
    const staticAutocomplete = document.querySelector("#static");

    staticAutocomplete.autocompleteRequest = function(params, callback) {
      const regx = new RegExp("\^" + params.query, "i");
      callback(items.filter(item => regx.test(item)));
    };
  }, 0);

  return function unsubscribe() {};
}

stories.add("pfe-autocomplete", () => {
  let config = {};
  let props = {
    "init-value": {
      "title": "Initial value",
      "description": "An initial value to show in the input field",
      "type": "string",
      "prefixed": false
    },
    "is-disabled": {
      "title": "Is disabled",
      "description": "Disable the input",
      "type": "boolean",
      "prefixed": false
    }
  }

  config.prop = tools.autoPropKnobs(props, storybookBridge);

  let pfeAutocompleteMarkup = `
    <pfe-autocomplete id="static" ${tools.listProperties(config.prop)}>
      <input placeholder="Enter your search term" />
    </pfe-autocomplete>
  `;

  let preview = tools.code(pfeAutocompleteMarkup);

  return `
    ${pfeAutocompleteMarkup}
    ${preview}
    <p>Example terms to search for:</p>
    <ul>
      ${items.map(item => `<li>${item}</li>`).join("")}
    </ul>
  `;
=======
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import * as tools from "../../../.storybook/utils.js";

import PfeAutocomplete from "../pfe-autocomplete";

const stories = storiesOf("Autocomplete", module);

// Define the template to be used
const template = (data = {}) => {
  return tools.component(PfeAutocomplete.tag, data.prop, data.slots);
};

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeAutocomplete.tag, () => {
    let config = {};

    const props = {
        "is-disabled": {
            title: "Disabled",
            type: "boolean",
            default: false
        },
        "init-value": {
            title: "Initial value",
            type: "string"
        }
    };

    // Trigger the auto generation of the knobs for attributes
    config.prop = tools.autoPropKnobs(props, storybookBridge);

    config.slots = [{
        content: tools.customTag({
            tag: "input",
            attributes: {
                placeholder: "Enter your search term"
            }
        })
    }];

    const render = template(config);
    const output = tools.preview(render);
    return output;
>>>>>>> issue-325/css-enhancement-js-bugfix
});
