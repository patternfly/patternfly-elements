import { storiesOf } from "@storybook/polymer";
import { withKnobs } from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeAutocomplete from "../dist/pfe-autocomplete";

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

function subscribe() {
  setTimeout(() => {
    const staticAutocomplete = document.querySelector("pfe-autocomplete");

    staticAutocomplete.autocompleteRequest = function(params, callback) {
      const regx = new RegExp("^" + params.query, "i");
      callback(items.filter(item => regx.test(item)));
    };
  }, 0);
}

stories.add("pfe-autocomplete", () => {
  document.querySelector("body").style.backgroundColor = "#fff";
  document.querySelector("body").style.setProperty("--context", "light");

  let config = {};

  config.prop = tools.autoPropKnobs(PfeAutocomplete);

  let pfeAutocompleteMarkup = `
    <pfe-autocomplete id="static" ${tools.listProperties(config.prop)}>
      <input placeholder="Enter your search term" />
    </pfe-autocomplete>
  `;

  let preview = tools.code(pfeAutocompleteMarkup);

  // this hooks everything back up when the knobs change
  subscribe();

  return `
    ${pfeAutocompleteMarkup}
    ${preview}
    <hr/>
    <p>Example terms to search for:</p>
    <ul>
      ${items.map(item => `<li>${item}</li>`).join("")}
    </ul>
  `;
});
