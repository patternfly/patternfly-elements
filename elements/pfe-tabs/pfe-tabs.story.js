import { storiesOf } from "@storybook/polymer";
import { withKnobs, select } from "@storybook/addon-knobs/polymer";
import { escapeHTML } from "../../.storybook/utils.js";

import "./pfe-tabs";

const lorem = require("lorem-ipsum");

const stories = storiesOf("Tabs", module);
stories.addDecorator(withKnobs);

stories.add("pfe-tabs", () => {
  const orientationLabel = "Orientation";
  const orientationConfig = {
    "": "Horizontal",
    vertical: "Vertical"
  };
  const orientationDefault = "Horizontal";
  const orientation = select(
    orientationLabel,
    orientationConfig,
    orientationDefault
  );
  const orientationAttr = orientation ? ` ${orientation}` : "";

  const variantLabel = "Variant";
  const variantConfig = {
    "": "default",
    primary: "Primary",
    secondary: "Secondary"
  };
  const variantDefault = "";
  const variant = select(variantLabel, variantConfig, variantDefault);
  const variantAttr = variant ? ` pfe-variant="${variant}"` : "";

  const headingConfig = {
    count: 2,
    units: "words",
    format: "plain"
  };

  const sets = [];
  Array(3)
    .join(0)
    .split(0)
    .map((item, i) =>
      sets.push({
        heading: lorem(headingConfig).replace(/^\w/, c => c.toUpperCase()),
        panel: `<h2>${lorem(headingConfig).replace(/^\w/, c =>
          c.toUpperCase()
        )}</h2>
    ${lorem({
      count: i + 1,
      units: "paragraphs",
      format: "html"
    })}`
      })
    );

  const template = `
<pfe-tabs${orientationAttr}${variantAttr}>
${Array(3)
    .join(0)
    .split(0)
    .map(
      (item, i) => `
  <pfe-tab role="heading" slot="tab">${sets[i].heading}</pfe-tab>
  <pfe-tab-panel role="region" slot="panel">
    ${sets[i].panel}
  </pfe-tab-panel>
  `
    )
    .join("")}
</pfe-tabs>
  `;

  return `
  <section>
    <h2>Preview</h2>
    ${template}
  </section>
  <section>
    <h2>Markup</h2>
    <pre style="white-space: pre-wrap; margin: 0;">${escapeHTML(template)}</pre>
  </section>
    `;
});
