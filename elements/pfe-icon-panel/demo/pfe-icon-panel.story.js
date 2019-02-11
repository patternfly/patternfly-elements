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
import "../pfe-icon-panel.js";

const stories = storiesOf("Icon", module);
stories.addDecorator(withKnobs);

stories.add("pfe-icon-panel", () => {
  let centeredBoolean = "";
  let stackedValue = "";
  let centeredValue = "";
  let circled = "";
  let circledSelect = "";

  const iconOptions = {
    server: "server",
    "server-stack": "server-stack"
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

  const iconSelect = select("Icon", iconOptions, "server");
  const circledBoolean = boolean("Circled", false);

  if (circledBoolean != false) {
    circledSelect = select("Circle Color", circledOptions, "default");
    circled =
      circledSelect != "default" ? ` circled="${circledSelect}"` : " circled";
  }

  const stackedBoolean = boolean("Stacked", false);

  if (stackedBoolean != false) {
    centeredBoolean = boolean("Centered", false);
    stackedValue = " stacked";
    if (centeredBoolean != false) {
      centeredValue = " centered";
    }
  }

  let iconValue = ` icon="pfe-icon-${iconSelect}"`;

  return `

  <style>
    pfe-icon-panel {
      width: 60%;
      margin-bottom: 15px;
    }

    .border-top {
      border-top: 1px solid #dedede;
    }
  </style>

  <section>
    <h2>Your PFElement</h2>
    <pfe-icon-panel${iconValue}${circled}${stackedValue}${centeredValue}>
      <h3 slot="header">Panel Header</h3>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </pfe-icon-panel>
  </section>
  <section>
    <h2>Markup</h2>
    <pre><code>&lt;pfe-icon-panel${iconValue}${circled}${stackedValue}${centeredValue}&gt;
    &lt;h3 slot="header"&gt;Panel Header&lt;/h3&gt;
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
&lt;/pfe-icon-panel&gt;</code></pre>
  </section>
  <section>
    <h2>At a glance</h2>
    <pfe-icon-panel icon="pfe-icon-server-stack">
      <h3 slot="header">Default</h3>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </pfe-icon-panel>
    <pfe-icon-panel icon="pfe-icon-server-stack" circled="dark">
      <h3 slot="header">Default and Circled</h3>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </pfe-icon-panel>
    <pfe-icon-panel icon="pfe-icon-server-stack" stacked>
      <h3 slot="header">Stacked</h3>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </pfe-icon-panel>
    <pfe-icon-panel icon="pfe-icon-server-stack" stacked centered>
      <h3 slot="header">Stacked and Centered</h3>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    </pfe-icon-panel>
  </section>


  `;
});
