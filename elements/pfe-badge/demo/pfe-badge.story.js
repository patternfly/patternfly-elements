import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs";
import * as tools from "../../../.storybook/utils.js";

import PfeBadge from "../dist/pfe-badge";

const stories = storiesOf("Badge", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeBadge.tag, () => {
  let config = {};

  config.prop = tools.autoPropKnobs(PfeBadge, {
    state: {
      required: true
    },
    number: {
      default: 50,
      required: true
    },
    threshold: {
      default: 100
    }
  });

  const staticNumberExamples = [
    {
      number: 1,
      state: "info",
      threshold: null
    },
    {
      number: 17,
      state: "info",
      threshold: 10
    },
    {
      number: 900,
      state: "info",
      threshold: 100
    }
  ];

  const staticStateExamples = [
    {
      number: 10
    },
    {
      number: 20,
      state: "info"
    },
    {
      number: 30,
      state: "important"
    },
    {
      number: 40,
      state: "success"
    },
    {
      number: 50,
      state: "critical"
    },
    {
      number: 60,
      state: "moderate"
    }
  ];

  const customBadge = `<pfe-badge ${tools.listProperties(config.prop)}>${config.prop["number"]}</pfe-badge>`;

  return `
    ${tools.preview(customBadge)}
    <hr/>
    <h2>Static examples with threshold</h2>
    ${staticNumberExamples
      .map(
        ex => `
          <pfe-badge state="${ex.state}" number="${ex.number}" ${
          ex.threshold !== null ? `threshold="${ex.threshold}"` : ""
        }>${ex.number}</pfe-badge>
        `
      )
      .join("\n")}
    <br/>
    <h2 style="margin-top: 20px">Static examples with multiple state options</h2>
    ${staticStateExamples
      .map(
        ex => `
          <pfe-badge state="${ex.state}" number="${ex.number}">${ex.number}</pfe-badge>
        `
      )
      .join("\n")}
  `;
});
