import { storiesOf } from "@storybook/polymer";
import {
  withKnobs,
  text,
  select,
  boolean
} from "@storybook/addon-knobs/polymer";
import "./rh-icon";

const stories = storiesOf("Icon", module);
stories.addDecorator(withKnobs);

stories.add("rh-icon", () => {
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

  let value = valueSelect != "default" ? ` icon="rh-icon-${valueSelect}"` : "";
  let size = sizeSelect != "default" ? ` size="${sizeSelect}"` : "";

  return `

  <section>
    <h2>Your RHElement</h2>
    <rh-icon${value}${circled}${iconColor}${size}></rh-icon>
  </section>
  <section>
    <h2>Markup</h2>
    <pre><code>&lt;rh-icon${value}${circled}${iconColor}${size}&gt;&lt;/rh-icon&gt;</code></pre>
  </section>

  `;
});
