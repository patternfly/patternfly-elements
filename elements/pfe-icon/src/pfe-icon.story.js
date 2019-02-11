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
import {
  withKnobs,
  text,
  select,
  boolean
} from "@storybook/addon-knobs/polymer";
import "../pfe-icon.js";

const stories = storiesOf("Icon", module);
stories.addDecorator(withKnobs);

stories.add("pfe-icon", () => {
  let colorSelect = "";
  let circledSelect = "";
  let circled = "";
  let iconColor = "";

  const iconOptions = {
    server: "server",
    "server-stack": "server-stack"
  };

  const colorOptions = {
    default: "default",
    base: "base",
    complement: "complement",
    accent: "accent",
    critical: "critical",
    important: "important",
    moderate: "moderate",
    success: "success",
    info: "info"
  };

  const sizeOptions = {
    "2x": "2x",
    "3x": "3x",
    "4x": "4x",
    sm: "Small",
    md: "Medium",
    lg: "Large",
    xl: "Extra Large"
  };

  const circledOptions = {
    default: "default",
    base: "base",
    lightest: "lightest",
    light: "light",
    dark: "dark",
    darkest: "darkest",
    complement: "complement",
    accent: "accent"
  };

  const valueSelect = select("Icon", iconOptions, "server");
  const sizeSelect = select("Size", sizeOptions, "default");
  const circledBoolean = boolean("Circled", false);

  if (circledBoolean != false) {
    circledSelect = select("Circle Color", circledOptions, "default");
    circled =
      circledSelect != "default" ? ` circled="${circledSelect}"` : " circled";
  } else {
    colorSelect = select("Color", colorOptions, "default");
    iconColor = colorSelect != "default" ? ` color="${colorSelect}"` : "";
  }

  let value = valueSelect != "default" ? ` icon="pfe-icon-${valueSelect}"` : "";
  let size = sizeSelect != "default" ? ` size="${sizeSelect}"` : "";

  return `

  <section>
    <h2>Your PFElement</h2>
    <pfe-icon${value}${circled}${iconColor}${size}></pfe-icon>
  </section>
  <section>
    <h2>Markup</h2>
    <pre><code>&lt;pfe-icon${value}${circled}${iconColor}${size}&gt;&lt;/pfe-icon&gt;</code></pre>
  </section>

  `;
});
