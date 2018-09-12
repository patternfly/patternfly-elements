import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import "./rh-card";
import cpTheme from "../../themes/cp-theme/cp-theme.js";

const stories = storiesOf("Card", module);
stories.addDecorator(withKnobs);

stories.add("rh-card", () => {
  return `

  <style>
  /* For demo only */
  .demo-cards {
    display: flex;
    flex-wrap: wrap;
  }

  .demo-cards > rh-card {
    margin: 0 16px 32px;
    width: calc(33% - 32px);
  }
  </style>

  <section>
    <h2>Your RHElement</h2>
    <rh-card>
      Card
    </rh-card>
  </section>
  <section>
    <h2>Markup</h2>
    <pre><code>&lt;rh-card&gt;Become a Member&lt;/rh-card&gt;</code></pre>
  </section>
  <section>
    <h2>At a glance</h2>
    <div class="demo-cards">
      <rh-card color="lightest">
        <h2 slot="header">Lightest card</h2>
        <p>This is the lightest rh-card and <a href="#">a link</a>.</p>
        <div slot="footer"><rh-cta priority="primary"><a href="#">Learn more</a></rh-cta></div>
      </rh-card>
      <rh-card color="light">
        <h2 slot="header">Light card</h2>

        <p>
          This is the light rh-card and <a href="#">a link</a>.
        </p>
        <p>
          Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.
        </p>
        <p>
          Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.
        </p>

        <div slot="footer"><rh-cta priority="secondary"><a href="#">Learn more</a></rh-cta></div>
      </rh-card>
      <rh-card>
        <h2 slot="header">Default card</h2>
        Unwrapped item. This is the default rh-card and <a href="#">a link</a>.
        <div slot="footer"><rh-cta priority="secondary"><a href="#">Learn more</a></rh-cta></div>
      </rh-card>
      <rh-card color="dark">
        <h2 slot="header">Dark Card</h2>
        <p>This is the dark rh-card and <a href="#">a link</a>.</p>
        <div slot="footer"><rh-cta priority="secondary" on="dark"><a href="#">Learn more</a></rh-cta></div>
      </rh-card>
      <rh-card color="darkest">
        <h2 slot="header">Darkest Card</h2>
        <p>This is the darkest rh-card and <a href="#">a link</a>.</p>
        <div slot="footer"><rh-cta priority="secondary" on="dark"><a href="#">Learn more</a></rh-cta></div>
      </rh-card>
      <rh-card color="complement">
        <h2 slot="header">Complement Card</h2>
        <p>This is the complement rh-card and <a href="#">a link</a>.</p>
        <div slot="footer"><rh-cta priority="secondary" on="dark"><a href="#">Learn more</a></rh-cta></div>
      </rh-card>
      <rh-card color="accent">
        <h2 slot="header">Accent Card</h2>
        <p>This is the accent rh-card and <a href="#">a link</a>. Leverage agile frameworks to provide a robust synopsis for high level overviews.</p>
      </rh-card>
    </div>
  </section>

  `;
});
