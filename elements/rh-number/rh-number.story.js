import { storiesOf } from "@storybook/polymer";
import { withKnobs, text } from "@storybook/addon-knobs/polymer";
import "./rh-number";

const stories = storiesOf("Number", module);
stories.addDecorator(withKnobs);

stories.add("rh-number", () => {
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
            &lt;rh-number type="ordinal"&gt;${ordinal}&lt;/rh-number&gt;
          </td>
          <td>
            <rh-number type="ordinal">${ordinal}</rh-number>
          </td>
        </tr>
        <tr>
          <td>Bytes</td>
          <td>
            &lt;rh-number type="bytes"&gt;${bytes}&lt;/rh-number&gt;
          </td>
          <td>
            <rh-number type="bytes">${bytes}</rh-number>
          </td>
        </tr>
        <tr>
          <td>Abbreviation</td>
          <td>
            &lt;rh-number type="abbrev"&gt;${abbreviation}&lt;/rh-number&gt;
          </td>
          <td>
            <rh-number type="abbrev">${abbreviation}</rh-number>
          </td>
        </tr>
        <tr>
          <td>Percent</td>
          <td>
            &lt;rh-number type="percent"&gt;${percent}&lt;/rh-number&gt;
          </td>
          <td>
            <rh-number type="percent">${percent}</rh-number>
          </td>
        </tr>
        <tr>
          <td>e</td>
          <td>
            &lt;rh-number type="e"&gt;${e}&lt;/rh-number&gt;
          </td>
          <td>
            <rh-number type="e">${e}</rh-number>
          </td>
        </tr>
        <tr>
          <td>Thousands</td>
          <td>
            &lt;rh-number type="thousands"&gt;${thousands}&lt;/rh-number&gt;
          </td>
          <td>
            <rh-number type="thousands">${thousands}</rh-number>
          </td>
        </tr>
      </tbody>
    </table>
  `;
});
