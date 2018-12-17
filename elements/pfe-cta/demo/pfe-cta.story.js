import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import "../dist/pfe-cta";
// import cpTheme from '../../themes/cp-theme/dist/cp-theme.js';

const stories = storiesOf("Call To Action", module);
stories.addDecorator(withKnobs);

stories.add("pfe-cta", () => {
  const priorityType = "Priority";
  const colorType = "Color";
  const label = "Text";

  const priorityOptions = {
    default: "default",
    primary: "primary",
    secondary: "secondary"
  };

  const colorOptions = {
    default: "default",
    base: "base",
    complement: "complement",
    accent: "accent"
  };

  const priorityDefault = "default";
  const colorDefault = "default";
  const textDefault = "Become a Member";

  const value = select(priorityType, priorityOptions, priorityDefault);
  const colorValue = select(colorType, colorOptions, colorDefault);
  const textValue = text(label, textDefault);

  let valueAttr = value != "default" ? ` priority="${value}"` : "";
  let colorAttr = colorValue != "default" ? ` color="${colorValue}"` : "";

  return `
  <style>
    div {
      margin-bottom: 40px;
    }

    pfe-cta {
      margin-right: 10px;
    }
  </style>

  <section>
    <h2>Your PFElement</h2>
    <pfe-cta${valueAttr}${colorAttr}><a href="#">${textValue}</a></pfe-cta>
  </section>
  <section>
    <h2>Markup</h2>
    <pre><code>&lt;pfe-cta${valueAttr}${colorAttr}&gt;&lt;a href="#"&gt;${textValue}&lt;/a&gt;&lt;/pfe-cta&gt;</code></pre>
  </section>
  <section>
    <h2>At a glance</h2>
    <div>
      <h3>Defaults</h3>
      <pfe-cta><a href="#">Default</a></pfe-cta>
      <pfe-cta priority="primary"><a href="#">Primary</a></pfe-cta>
      <pfe-cta priority="secondary"><a href="#">Secondary</a></pfe-cta>
    </div>
    <div>
      <h3>Color: Base</h3>
      <pfe-cta color="base"><a href="#">Default</a></pfe-cta>
      <pfe-cta priority="primary" color="base"><a href="#">Primary</a></pfe-cta>
      <pfe-cta priority="secondary" color="base"><a href="#">Secondary</a></pfe-cta>
    </div>
    <div>
      <h3>Color: Complement</h3>
      <pfe-cta color="complement"><a href="#">Default</a></pfe-cta>
      <pfe-cta priority="primary" color="complement"><a href="#">Primary</a></pfe-cta>
      <pfe-cta priority="secondary" color="complement"><a href="#">Secondary</a></pfe-cta>
    </div>
    <div>
      <h3>Color: Accent</h3>
      <pfe-cta color="accent"><a href="#">Default</a></pfe-cta>
      <pfe-cta priority="primary" color="accent"><a href="#">Primary</a></pfe-cta>
      <pfe-cta priority="secondary" color="accent"><a href="#">Secondary</a></pfe-cta>
    </div>
  </section>
  `;
});
