import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import "./rh-icon";

const stories = storiesOf("Icon", module);
stories.addDecorator(withKnobs);

stories.add("rh-icon", () => {
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
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl"
  };

  const valueSelect = select("Icon", iconOptions, "server");
  const colorSelect = select("Color", colorOptions, "default");
  const sizeSelect = select("Size", sizeOptions, "default");

  let value = valueSelect != "default" ? ` icon="rh-icon-${valueSelect}"` : "";
  let iconColor = colorSelect != "default" ? ` color="${colorSelect}"` : "";
  let size = sizeSelect != "default" ? ` size="${sizeSelect}"` : "";

  return `

  <section>
    <h2>Your RHElement</h2>
    <rh-icon${value}${iconColor}${size}</rh-icon>
  </section>
  <section>
    <h2>Markup</h2>
    <pre><code>&lt;rh-icon${value}${iconColor}${size}&gt;&lt;/rh-icon&gt;</code></pre>
  </section>

  `;
});
