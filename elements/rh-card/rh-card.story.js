import { storiesOf } from "@storybook/polymer";
import {
  withKnobs,
  text,
  select,
  boolean
} from "@storybook/addon-knobs/polymer";
import "./rh-card";
import cpTheme from "../../themes/cp-theme/cp-theme.js";
import { escapeHTML } from "../../.storybook/utils.js";

const stories = storiesOf("Card", module);
stories.addDecorator(withKnobs);

stories.add("rh-card", () => {
  const colorLabel = "Color";
  const ctaLabel = "Call to Action";
  const ctaTypeLabel = "Priority";
  const colorDefault = "default";
  const ctaDefault = false;
  const ctaTypeDefault = "default";
  let ctaPriorityValue = "";
  let cardFooter = "";
  let cardFooterString = "";
  let valueAttr = "";
  let ctaOnDark = "";
  let colorAttr = "";

  const colorOptions = {
    lightest: "lightest",
    light: "light",
    default: "default",
    dark: "dark",
    darkest: "darkest",
    complement: "complement",
    accent: "accent"
  };

  const ctaTypeOptions = {
    default: "default",
    primary: "primary",
    secondary: "secondary"
  };

  const colorValue = select(colorLabel, colorOptions, colorDefault);
  const ctaValue = boolean(ctaLabel, ctaDefault);

  if (ctaValue != false) {
    let ctaPriorityValue = select(ctaTypeLabel, ctaTypeOptions, ctaTypeDefault);
    valueAttr =
      ctaPriorityValue != "default" ? ` priority="${ctaPriorityValue}"` : "";
    if (
      colorValue != "lightest" &&
      colorValue != "light" &&
      colorValue != "default"
    ) {
      ctaOnDark = ' on="dark"';
    }
    cardFooter = `\n  <div slot="footer"><rh-cta${valueAttr}${ctaOnDark}><a href="#">Learn more</a></div>`;
  }

  colorAttr = colorValue != "default" ? ` color="${colorValue}"` : "";

  return `

  <style>
  .custom-card {
    width: 40%;
  }

  .demo-cards {
    display: flex;
    flex-wrap: wrap;
  }

  .demo-cards > rh-card {
    margin: 0 16px 32px;
    width: calc(35% - 32px);
  }
  </style>

  <section>
    <h2>Your RHElement</h2>
    <rh-card class="custom-card"${colorAttr}>
      <h2 slot="header">Card Heading</h2>
      <p>Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>${cardFooter}
    </rh-card>
  </section>
  <section>
    <h2>Markup</h2>
    <pre style="margin-left:15px;">
<code>&lt;rh-card${colorAttr}&gt;
  &lt;h2 slot="header"&gt;Card Heading&lt/h2&gt;
  &lt;p&gt;Become a Member&lt;/p&gt;${escapeHTML(cardFooter)}
&lt;/rh-card&gt;</code>
  </pre>
  </section>
  <section>
    <h2>At a glance</h2>
    <div class="demo-cards">
      <rh-card color="lightest">
        <h2 slot="header">Lightest card</h2>
        <p>This is the lightest rh-card.</p>
        <div slot="footer"><rh-cta priority="primary"><a href="#">Learn more</a></rh-cta></div>
      </rh-card>
      <rh-card color="light">
        <h2 slot="header">Light card</h2>
        <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
        <p>Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.</p>
        <div slot="footer"><rh-cta priority="secondary"><a href="#">Learn more</a></rh-cta></div>
      </rh-card>
      <rh-card>
        <h2 slot="header">Default card</h2>
        Unwrapped item. This is the default rh-card.
        <div slot="footer"><rh-cta priority="secondary"><a href="#">Learn more</a></rh-cta></div>
      </rh-card>
      <rh-card color="dark">
        <h2 slot="header">Dark Card</h2>
        <p>This is the dark rh-card.</p>
        <div slot="footer"><rh-cta priority="secondary" on="dark"><a href="#">Learn more</a></rh-cta></div>
      </rh-card>
      <rh-card color="darkest">
        <h2 slot="header">Darkest Card</h2>
        <p>This is the darkest rh-card.</p>
        <div slot="footer"><rh-cta priority="secondary" on="dark"><a href="#">Learn more</a></rh-cta></div>
      </rh-card>
      <rh-card color="complement">
        <h2 slot="header">Complement Card</h2>
        <p>This is the complement rh-card.</p>
        <div slot="footer"><rh-cta priority="secondary" on="dark"><a href="#">Learn more</a></rh-cta></div>
      </rh-card>
      <rh-card color="accent">
        <h2 slot="header">Accent Card</h2>
        <p>This is the accent rh-card. Leverage agile frameworks to provide a robust synopsis for high level overviews.</p>
      </rh-card>
    </div>
  </section>

  `;
});
