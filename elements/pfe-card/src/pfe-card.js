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

class PfeCard extends PFElement {
  static get tag() {
    return "pfe-card";
  }

  get styleUrl() {
    return "pfe-card.scss";
  }

  get templateUrl() {
    return "pfe-card.html";
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {
    return ["color"];
  }

  constructor() {
    super(PfeCard, { type: PfeCard.PfeType });
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);

    // If the observer is defined in the attribute properties
    if (attr === "color") {
      this._colorChanged(attr, oldValue, newValue);
    }
  }

  // Update the color attribute and contexts
  _colorChanged(attr, oldValue, newValue) {
    // If the new value has a dark background, update children elements
    this._updateContext(newValue);
  }

  // Set the children's context if parent background is dark
  _updateContext(context) {
    if (["darkest", "dark", "complement", "accent"].includes(context)) {
      ["pfe-cta"].forEach(elementName => {
        const els = [...this.querySelectorAll(`${elementName}`)];
        els.forEach(el => {
          const myContainer = el.closest("[pfe-type='container']");
          if (myContainer === this || myContainer === null) {
            el.setAttribute("on", "dark");
          }
        });
      });
    }
  }
}

PFElement.create(PfeCard);

export default PfeCard;
