import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import "../pfe-health-index.js";

const stories = storiesOf("Health Index", module);
stories.addDecorator(withKnobs);

stories.add("pfe-health-index", () => {
  const grades = ["A", "B", "C", "D", "E", "F"];
  const healthIndexValue = select("Health Index", grades, grades[0]);

  return `
    <style>
      div {
        margin-bottom: 16px;
      }
    </style>

    <section>
      <h2>Your PFElement</h2>
      <pfe-health-index health-index="${healthIndexValue}">${healthIndexValue}</pfe-health-index>
    </section>
    <section>
      <h2>Markup</h2>
      <pre style="margin-left:15px;">
<code>&lt;pfe-health-index health-index="${healthIndexValue}"&gt;${healthIndexValue}&lt;/pfe-health-index&gt;</code>
      </pre>
    </section>
    <section>
      <h2>At a glance</h2>
      ${grades
        .map(grade =>
          `
          <div>
            <pfe-health-index health-index="${grade}">${grade}</pfe-health-index>
          </div>
      `.trim()
        )
        .join("\n")}
    </section>
  `;
});
