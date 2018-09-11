/*
 * Copyright 2018 Red Hat, Inc.
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
 */

import RHElement from "../rhelement/rhelement.js";
import numeral from "numeral";

// easy aliases for common format strings
const types = {
  abbrev: "0a", // or 'approx'?
  ordinal: "0o",
  percent: "0%",
  bytes: "0[.][00] ib",
  e: "0[.00]e+0",
  thousands: "0,0[.00]"
};

// use thin spaces to separate thousands chunks
// debugger;
numeral.locales.en.delimiters.thousands = " ";

class RhNumber extends RHElement {
  static get tag() {
    return "rh-number";
  }

  get styleUrl() {
    return "rh-number.scss";
  }

  get templateUrl() {
    return "rh-number.html";
  }

  static get observedAttributes() {
    return ["number", "format", "type"];
  }

  constructor() {
    super(RhNumber);
  }

  connectedCallback() {
    super.connectedCallback();
    this.connected = true;

    this._determineFormat();
    this._setInitialNumber();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    switch (attr) {
      case "type":
        this._determineFormat();
        break;
      case "format":
        this._updateNumber(this.getAttribute("number"), newVal);
        break;
      case "number":
        this._updateNumber(newVal, this.getAttribute("format"));
    }
  }

  _setInitialNumber() {
    const numberAttrDefined = !Number.isNaN(
      parseFloat(this.getAttribute("number"))
    );
    const numberContentDefined = !Number.isNaN(parseFloat(this.textContent));

    if (numberAttrDefined) {
      this.setAttribute("number", this.getAttribute("number"));
    } else if (numberContentDefined) {
      this.setAttribute("number", this.textContent);
    }
  }

  _determineFormat() {
    let type = this.getAttribute("type");

    if (type && types[type]) {
      this.setAttribute("format", types[type]);
    } else {
      this.setAttribute("format", this.getAttribute("format") || "0");
    }
  }

  _updateNumber(num, type) {
    this.shadowRoot.querySelector("span").textContent = this._format(num, type);
  }

  _format(num, type) {
    return numeral(num).format(type);
  }
}

RHElement.create(RhNumber);
