import { storiesOf } from "@storybook/polymer";
import { withKnobs, text } from "@storybook/addon-knobs";
import "../dist/pfe-number.js";

const stories = storiesOf("Number", module);

// Add the readme
import readme from "../README.md";
stories.addParameters({
  notes: {
    markdown: readme
  }
});

stories.addDecorator(withKnobs);

stories.add("pfe-number", () => {
  const ordinal = text("Ordinal", "1");
  const bytes = text("Bytes", "2017");
  const abbreviation = text("Abbreviation", "12345");
  const percent = text("Percent", "0.5678");
  const e = text("e", "2000000");
  const thousands = text("Thousands", "987654321.123456789");

  return `
    <style>
      #rhNumberTable thead th {
        text-align: left;
      }

      #rhNumberTable th,
      #rhNumberTable td {
        padding: 5px;
      }
    </style>

    <table id="rhNumberTable" >
      <thead>
        <tr>
          <th>Type</th>
          <th>Markup</th>
          <th>Formatted Number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ordinal</td>
          <td>
            &lt;pfe-number type="ordinal" number="${ordinal}"&gt;${ordinal}&lt;/pfe-number&gt;
          </td>
          <td>
            <pfe-number type="ordinal" number="${ordinal}">${ordinal}</pfe-number>
          </td>
        </tr>
        <tr>
          <td>Bytes</td>
          <td>
            &lt;pfe-number type="bytes" number="${bytes}"&gt;${bytes}&lt;/pfe-number&gt;
          </td>
          <td>
            <pfe-number type="bytes" number="${bytes}">${bytes}</pfe-number>
          </td>
        </tr>
        <tr>
          <td>Abbreviation</td>
          <td>
            &lt;pfe-number type="abbrev" number="${abbreviation}"&gt;${abbreviation}&lt;/pfe-number&gt;
          </td>
          <td>
            <pfe-number type="abbrev" number="${abbreviation}">${abbreviation}</pfe-number>
          </td>
        </tr>
        <tr>
          <td>Percent</td>
          <td>
            &lt;pfe-number type="percent" number="${percent}"&gt;${percent}&lt;/pfe-number&gt;
          </td>
          <td>
            <pfe-number type="percent" number="${percent}">${percent}</pfe-number>
          </td>
        </tr>
        <tr>
          <td>e</td>
          <td>
            &lt;pfe-number type="e" number="${e}"&gt;${e}&lt;/pfe-number&gt;
          </td>
          <td>
            <pfe-number type="e" number="${e}">${e}</pfe-number>
          </td>
        </tr>
        <tr>
          <td>Thousands</td>
          <td>
            &lt;pfe-number type="thousands" number="${thousands}"&gt;${thousands}&lt;/pfe-number&gt;
          </td>
          <td>
            <pfe-number type="thousands" number="${thousands}">${thousands}</pfe-number>
          </td>
        </tr>
      </tbody>
    </table>
  `;
});
