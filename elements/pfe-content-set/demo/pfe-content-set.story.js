/*
 * Copyright 2018 Red Hat, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { storiesOf } from "@storybook/polymer";
import {
  withKnobs,
  text,
  select,
  number
} from "@storybook/addon-knobs/polymer";
import { escapeHTML } from "../../../.storybook/utils.js";

import PfeContentSet from "../pfe-content-set";

const lorem = require("lorem-ipsum");

const stories = storiesOf("Content set", module);
stories.addDecorator(withKnobs);

stories.add(PfeContentSet.tag, () => {
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
    wind: "wind",
    earth: "earth"
  };
  const variantDefault = "wind";
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
        panel: `<h2 style="margin-top: 0;">${lorem(headingConfig).replace(/^\w/, c =>
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
<pfe-content-set${orientationAttr}${variantAttr}>
${Array(countVar)
    .join(0)
    .split(0)
    .map(
      (item, i) => `
  <h3 pfe-content-set--header style="margin: 0;">${sets[i].heading}</h3>
  <div pfe-content-set--panel>
    ${sets[i].panel}
  </div>`)
    .join("")}
</pfe-content-set>
`;

  return `
<section>
    <h2>Content set</h2>
    ${template}
</section>
<section>
    <h2>Markup</h2>
    <pre style="white-space: pre-wrap; margin: 0;">${escapeHTML(template)}</pre>
</section>`;
});
