import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
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

  console.log(config.prop);

  const customBadge = `<pfe-badge ${tools.listProperties(config.prop)}>${config.prop["pfe-c-number"]}</pfe-badge>`;
  let preview = tools.code(customBadge);

  return `
    <h1>Dynamic example</h1>
    <h2>Use knobs to customize this badge!</h2>

    ${customBadge}

    <section>
      <h2>Markup</h2>
      ${preview}
    </section>
    
    <h1>Static examples with threshold</h1>
    ${staticNumberExamples
      .map(
        ex => `
          <pfe-badge pfe-c-state="${ex.state}" pfe-c-number="${ex.number}" ${
          ex.threshold !== null ? `pfe-c-threshold="${ex.threshold}"` : ""
        }>${ex.number}</pfe-badge>
        `
      )
      .join("\n")}

    <h1>Static examples with multiple state options</h1>
    ${staticStateExamples
      .map(
        ex => `
          <pfe-badge pfe-c-state="${ex.state}" pfe-c-number="${ex.number}">${ex.number}</pfe-badge>
        `
      )
      .join("\n")}
  `;
});
