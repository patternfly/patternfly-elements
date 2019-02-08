/*
 * Copyright 2019 Red Hat, Inc.
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
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import "../pfe-health-index.js";

const stories = storiesOf("Health Index", module);
stories.addDecorator(withKnobs);

stories.add("pfe-health-index", () => {
  const grades = ["A", "B", "C", "D", "E", "F"];
  const healthIndexValue = select("Health Index", grades, grades[0]);

  return `
    <style>
      div {
        margin-bottom: 16px;
      }
    </style>

    <section>
      <h2>Your PFElement</h2>
      <pfe-health-index health-index="${healthIndexValue}">${healthIndexValue}</pfe-health-index>
    </section>
    <section>
      <h2>Markup</h2>
      <pre style="margin-left:15px;">
<code>&lt;pfe-health-index health-index="${healthIndexValue}"&gt;${healthIndexValue}&lt;/pfe-health-index&gt;</code>
      </pre>
    </section>
    <section>
      <h2>At a glance</h2>
      ${grades
        .map(grade =>
          `
          <div>
            <pfe-health-index health-index="${grade}">${grade}</pfe-health-index>
          </div>
      `.trim()
        )
        .join("\n")}
    </section>
  `;
});
