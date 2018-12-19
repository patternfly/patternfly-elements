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

import PFElement from "../pfelement/pfelement.js";

class PfeBand extends PFElement {
  static get tag() {
    return "pfe-band";
  }

  get schemaUrl() {
    return "pfe-band.json";
  }

  get templateUrl() {
    return "pfe-band.html";
  }

  get styleUrl() {
    return "pfe-band.scss";
  }

  get asidePosition() {
    return {
      desktop: this.getAttribute("pfe-aside-desktop"),
      mobile: this.getAttribute("pfe-aside-mobile"),
      height: this.getAttribute("pfe-aside-height")
    };
  }

  static get observedAttributes() {
    return [
      "pfe-aside-desktop",
      "pfe-aside-mobile",
      "pfe-aside-height",
      "pfe-color",
      "pfe-img-src"
    ];
  }

  static get cascadingAttributes() {
    return {
      "pfe-aside-desktop": ".pfe-band__container",
      "pfe-aside-mobile": ".pfe-band__container",
      "pfe-aside-height": ".pfe-band__container"
    };
  }

  // Declare the type of this component
  static get pfeType() {
    return PFElement.pfeType.container;
  }

  constructor() {
    super(PfeBand);
  }

  connectedCallback() {
    super.connectedCallback();

    // If a color is defined, update context for children
    if (this["pfe-color"]) {
      this._updateContext(this["pfe-color"].value);
    }
  }

  // disconnectedCallback() {}

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);

    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  _basicAttributeChanged(attr, oldValue, newValue) {
    // this.setAttribute(attr, newValue);
    this[attr].value = newValue;
  }

  // Update the color attribute and contexts
  _colorChanged(attr, oldValue, newValue) {
    // this.setAttribute(attr, newValue);
    this[attr].value = newValue;
    // If the new value has a dark background, update children elements
    this._updateContext(newValue);
  }

  // Update the background image
  _imgSrcChanged(attr, oldValue, newValue) {
    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }

  // Set the children's context if parent background is dark
  _updateContext(context) {
    if (["darkest", "dark"].includes(context)) {
      ["pfe-cta"].forEach(elementName => {
        const els = [...this.querySelectorAll(elementName)];
        els.forEach(el => {
          el.setAttribute("on", "dark");
        });
      });
    }
  }
}

PFElement.create(PfeBand);

export { PfeBand as default };
