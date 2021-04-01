import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeSelect from "../dist/pfe-select";

const stories = storiesOf("Select", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

stories.addDecorator(storybookBridge.withKnobs);

const template = (data = {}) => {
  return tools.component(PfeSelect.tag, data.prop, data.slots);
};

stories.add(PfeSelect.tag, () => {
  let config = {};

  let options = [];
  let appendOptions = {};
  let customOptions = {};

  let htmlOptions = "";

  const defaultOptions = [
    { text: "Please select an option", value: "" },
    { text: "One", value: "1" },
    { text: "Two", value: "2" }
  ];

  const props = {
    invalid: {
      title: "pfe-invalid",
      type: "boolean",
      default: false,
      prefixed: true
    }
  };

  // Ask user if they want to add any custom options via pfeOptions setter method
  const isCustomOptions = storybookBridge.boolean("Use custom options", false, "Content");
  let script = "";
  let printData = [];
  let data = [];

  // Ask user if they want to append any options via addOptions API
  const isAppendOptions = storybookBridge.boolean("Append custom options via addOptions API?", false, "API");

  if (isCustomOptions) {
    // Let the user determine number of options
    let optionsCount = storybookBridge.number(
      "Count",
      2,
      {
        min: 1,
        max: 10
      },
      "Content"
    );

    data[0] = { text: "Please select an option", value: "", selected: true };

    for (let i = 0; i < optionsCount; i++) {
      data[i + 1] = { text: `Option ${i + 1}`, value: `${i + 1}`, selected: false };
    }
  }

  if (isCustomOptions) {
    customOptions = storybookBridge.object("Options", { data }, "Content");
  }

  if (isAppendOptions) {
    // Let the user determine number of options
    let appendCount = storybookBridge.number(
      "Append count",
      2,
      {
        min: 1,
        max: 10
      },
      "API"
    );

    for (let i = 0; i < appendCount; i++) {
      data[i] = { text: `Option ${i}`, value: `${i}`, selected: false };
    }
    appendOptions = storybookBridge.object("Options", { data }, "API");
  }

  if (customOptions && data) {
    data.forEach(item => {
      let obj = "{";
      Object.entries(item).forEach(i => {
        obj += `"${i[0]}": ${typeof i[1] === "boolean" ? (i[1] ? "true" : "false") : `"${i[1]}", `}`;
      });
      obj += "}";
      printData.push(obj);
    });
  }

  if (printData.length > 0) {
    script = `<script>
    let selectWithJSOptionsOnly = document.querySelector("pfe-select");
    customElements.whenDefined("pfe-select").then(() => {
      selectWithJSOptionsOnly.pfeOptions = [${printData.join(", ")}];
    });
  </script>`;
  }

  // use customOptions if exist otherwise use defaultOptions
  options = isCustomOptions ? customOptions.data : defaultOptions;

  // concat appendOptions if user choose to append options
  if (isAppendOptions) {
    options = options.concat(appendOptions.data);
  }

  // build htmlOptions
  for (let i = 0; i < options.length; i++) {
    htmlOptions =
      htmlOptions +
      tools.customTag({
        tag: "option",
        attributes: {
          value: options[i].value,
          selected: options[i].selected ? "" : undefined
        },
        content: options[i].text
      });
  }

  config.prop = tools.autoPropKnobs(PfeSelect);

  config.slots = [
    {
      content: tools.customTag({
        tag: "select",
        content: htmlOptions
      })
    }
  ];

  let rendered = template(config);
  return tools.preview(rendered) + `${script ? `<pre>${tools.escapeHTML(script.replace(/\=\"\"/g, ""))}</pre>` : ""}`;
});
