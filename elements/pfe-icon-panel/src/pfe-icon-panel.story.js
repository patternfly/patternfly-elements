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
