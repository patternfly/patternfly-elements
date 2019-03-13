import { storiesOf } from "@storybook/polymer";
import { withKnobs, text } from '@storybook/addon-knobs/polymer';
import { escapeHTML } from "../../../.storybook/utils.js";
import "../pfe-markdown";

const stories = storiesOf("Markdown", module);
stories.addDecorator(withKnobs);

stories.add(
  "pfe-markdown",
  () => {
    const markdown = text("Markdown", `# Here is some markdown

And some some more

### Here is a heading level 3

And a [link](https://redhat.com)`);

    const markdownElement = `
<pfe-markdown>
  <div pfe-markdown-container># Here is some markdown</div>
</pfe-markdown>`;

    return `
      <pfe-markdown>
        <div pfe-markdown-container>${markdown}</div>
      </pfe-markdown>

      <section>
        <h2>Markup</h2>
        <pre style="margin-left:15px;"><code>${escapeHTML(markdownElement)}</code>
        </pre>
      </section>
    `
  }
);
