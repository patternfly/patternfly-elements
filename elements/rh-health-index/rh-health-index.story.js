import { storiesOf } from "@storybook/polymer";
import { withKnobs, text, select } from "@storybook/addon-knobs/polymer";
import "./rh-health-index";

const stories = storiesOf("Health Index", module);
stories.addDecorator(withKnobs);

stories.add("rh-health-index", () => {
  const grades = ["A", "B", "C", "D", "E", "F"];
  const healthIndexValue = select("Health Index", grades, grades[0]);

  return `
    <style>
      div {
        margin-bottom: 16px;
      }
    </style>

    <section>
      <h2>Your RHElement</h2>
      <rh-health-index health-index="${healthIndexValue}">${healthIndexValue}</rh-health-index>
    </section>
    <section>
      <h2>Markup</h2>
      <pre style="margin-left:15px;">
<code>&lt;rh-health-index health-index="${healthIndexValue}"&gt;${healthIndexValue}&lt;/rh-health-index&gt;</code>
      </pre>
    </section>
    <section>
      <h2>At a glance</h2>
      ${grades
        .map(grade =>
          `
          <div>
            <rh-health-index health-index="${grade}">${grade}</rh-health-index>
          </div>
      `.trim()
        )
        .join("\n")}
    </section>
  `;
});
