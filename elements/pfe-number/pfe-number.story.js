/*
 * Copyright 2019 Red Hat, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { storiesOf } from "@storybook/polymer";
import { withKnobs, text } from "@storybook/addon-knobs/polymer";
import "../pfe-number.js";

const stories = storiesOf("Number", module);
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
            &lt;pfe-number type="ordinal"&gt;${ordinal}&lt;/pfe-number&gt;
          </td>
          <td>
            <pfe-number type="ordinal">${ordinal}</pfe-number>
          </td>
        </tr>
        <tr>
          <td>Bytes</td>
          <td>
            &lt;pfe-number type="bytes"&gt;${bytes}&lt;/pfe-number&gt;
          </td>
          <td>
            <pfe-number type="bytes">${bytes}</pfe-number>
          </td>
        </tr>
        <tr>
          <td>Abbreviation</td>
          <td>
            &lt;pfe-number type="abbrev"&gt;${abbreviation}&lt;/pfe-number&gt;
          </td>
          <td>
            <pfe-number type="abbrev">${abbreviation}</pfe-number>
          </td>
        </tr>
        <tr>
          <td>Percent</td>
          <td>
            &lt;pfe-number type="percent"&gt;${percent}&lt;/pfe-number&gt;
          </td>
          <td>
            <pfe-number type="percent">${percent}</pfe-number>
          </td>
        </tr>
        <tr>
          <td>e</td>
          <td>
            &lt;pfe-number type="e"&gt;${e}&lt;/pfe-number&gt;
          </td>
          <td>
            <pfe-number type="e">${e}</pfe-number>
          </td>
        </tr>
        <tr>
          <td>Thousands</td>
          <td>
            &lt;pfe-number type="thousands"&gt;${thousands}&lt;/pfe-number&gt;
          </td>
          <td>
            <pfe-number type="thousands">${thousands}</pfe-number>
          </td>
        </tr>
      </tbody>
    </table>
  `;
});
