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

  const valueSelect = select("Icon", iconOptions, "server");
  const colorSelect = select("Color", colorOptions, "default");

  return `

  <section>
    <h2>Your RHElement</h2>
    <rh-icon icon="rh-icon-${valueSelect}" size="4x">
  </section>
  <section>
    <h2>Markup</h2>
    <pre><code>&lt;rh-icon&gt;&lt;/rh-icon&gt;</code></pre>
  </section>

  `;
});
