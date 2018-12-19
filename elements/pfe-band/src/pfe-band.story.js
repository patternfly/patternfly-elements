import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import * as storybookBridge from "@storybook/addon-knobs/polymer";

import { escapeHTML, dynamicKnobs } from "../../../.storybook/utils.js";

import PfeBand from "../pfe-band.js";

const stories = storiesOf("Band", module);

stories.addDecorator(storybookBridge.withKnobs);

stories.add(PfeBand.tag, () => {
  let attributes = "";
  const binding = dynamicKnobs(PfeBand.properties, storybookBridge);

  Object.entries(binding).forEach(prop => {
    let key = prop[0];
    let value = prop[1];
    // Ensure ke-bab case
    let kebab = key.replace(
      /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g,
      match => `-${match.toLowerCase()}`
    );
    if (value) attributes += ` ${kebab}="${value}"`;
  });

  console.log(binding);

  return `
<pfe-band${attributes}>
  <h1 slot="header">Lorem ipsum</h1>
  <article>
    <p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
    <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
    <pfe-cta priority="primary" slot="footer">
      <a href="#">Learn more</a>
    </pfe-cta>
  </article>
  <pfe-card color="complement" slot="aside">
    <h3 slot="header">Aside</h3>
    <p>Ut wisi enim ad minim veniam.</p>
    <pfe-cta slot="footer" priority="tertiary" on="dark">
      <a href="#">Learn more</a>
    </pfe-cta>
  </pfe-card>
</pfe-band>

<pre style="white-space: pre-wrap; padding: 20px 50px; background-color: #f0f0f0; font-weight: bold;border: 1px solid #bccc;">
${escapeHTML(`<pfe-band${attributes}>
  <h1 slot="header">Lorem ipsum</h1>
  <article>
    <p>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. </p>
    <p>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
    <pfe-cta priority="primary" slot="footer">
      <a href="#">Learn more</a>
    </pfe-cta>
  </article>
  <pfe-card color="complement" slot="aside">
    <h3 slot="header">Aside</h3>
    <p>Ut wisi enim ad minim veniam.</p>
    <pfe-cta slot="footer" priority="tertiary" on="dark">
      <a href="#">Learn more</a>
    </pfe-cta>
  </pfe-card>
</pfe-band>`)}
</pre>
`;
});
