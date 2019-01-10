import { storiesOf } from "@storybook/polymer";
import {
  withKnobs,
  text,
  select,
  number
} from "@storybook/addon-knobs/polymer";
import { escapeHTML } from "../../../.storybook/utils.js";

import PfeHideShow from "../pfe-hide-show";

const lorem = require("lorem-ipsum");

const stories = storiesOf("Hide-show", module);
stories.addDecorator(withKnobs);

stories.add(PfeHideShow.tag, () => {
  const orientationLabel = "Orientation";
  const orientationOptions = {
    "": "Horizontal",
    vertical: "Vertical"
  };
  const orientationDefault = "";
  const orientation = select(
    orientationLabel,
    orientationOptions,
    orientationDefault
  );
  const orientationAttr = orientation ? ` ${orientation}` : "";

  const variantLabel = "Variant";
  const variantOptions = {
    "": "default",
    primary: "Primary",
    secondary: "Secondary"
  };
  const variantDefault = "";
  const variant = select(variantLabel, variantOptions, variantDefault);
  const variantAttr = variant ? ` pfe-variant="${variant}"` : "";

  const countLabel = "# of sets";
  const countDefault = 3;
  const countVar = number(countLabel, countDefault);

  const headingConfig = {
    count: 2,
    units: "words",
    format: "plain"
  };

  const sets = [];
  Array(countVar)
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
<pfe-hide-show${orientationAttr}${variantAttr}>
${Array(countVar)
    .join(0)
    .split(0)
    .map(
      (item, i) => `
    <pfe-hide-show-set>
        <h2 pfe-heading>${sets[i].heading}</h2>
        ${sets[i].panel}
    </pfe-hide-show-set>
`
    )
    .join("")}
</pfe-hide-show>
`;

  return `
<section>
    <h2>Hide-Show</h2>
    ${template}
</section>
<section>
    <h2>Markup</h2>
    <pre style="white-space: pre-wrap; margin: 0;">${escapeHTML(template)}</pre>
</section>`;
});
