import { storiesOf } from "@storybook/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";
import { escapeHTML } from "../../../.storybook/utils.js";

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
  const number = storybookBridge.number(PfeBadge.properties.number.title, 50);
  const state = storybookBridge.select(PfeBadge.properties.state.title, PfeBadge.properties.state.enum, PfeBadge.properties.state.default);
  const threshold = storybookBridge.number(PfeBadge.properties["pfe-threshold"].title, 100);

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

  const staticTextExamples = [
    {
      text: "default"
    },
    {
      text: "info",
      state: "info"
    },
    {
      text: "important",
      state: "important"
    },
    {
      text: "success",
      state: "success"
    },
    {
      text: "critical",
      state: "critical"
    },
    {
      text: "moderate",
      state: "moderate"
    }
  ];

  const customBadge = `<pfe-badge pfe-state="${state}" pfe-threshold="${threshold}" number="${number}">${number}</pfe-badge>`;

  return `
    <h1>Dynamic example</h1>
    <h2>Use knobs to customize this badge!</h2>

    ${customBadge}

    <section>
      <h2>Markup</h2>
      <pre><code>${escapeHTML(customBadge)}</code>
      </pre>
    </section>
    
    <h1>Static examples with numbers</h1>
    ${staticNumberExamples
      .map(
        ex => `
          <pfe-badge pfe-state="${ex.state}" number="${ex.number}" pfe-threshold="${ex.threshold}">${number}</pfe-badge>
        `
      )
      .join("\n")}

    <h1>Static examples with text and color options</h1>
    ${staticTextExamples
      .map(
        ex => `
          <pfe-badge pfe-state="${ex.state}" text="${ex.text}">${ex.text}</pfe-badge>
        `
      )
      .join("\n")}
  `;
});