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

class PfeHealthIndex extends PFElement {
  static get tag() {
    return "pfe-health-index";
  }

  get templateUrl() {
    return "pfe-health-index.html";
  }

  get styleUrl() {
    return "pfe-health-index.scss";
  }

  static get observedAttributes() {
    return ["health-index", "size"];
  }

  constructor() {
    super(PfeHealthIndex, { delayRender: true });
    this.size = null;
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    switch (attr) {
      case "size":
        this.size = newValue;
        this.render();
        break;
      case "health-index":
        this.render();
        const healthIndex = newValue.toLowerCase();
        const healthIndexUpperCase = newValue.toUpperCase();
        const boxes = [...this.shadowRoot.querySelectorAll(".box")];
        this.innerHTML = healthIndexUpperCase;
        
        boxes.forEach(box => {
          if (box.classList.contains(healthIndex)) {
            console.log(this);
            box.classList.add("active");
            console.log(box);
          } else {
            box.classList.remove("active");
          }
        });

        if (this.size !== "lg") {
          this.shadowRoot.querySelector(
            "#healthIndex"
          ).innerText = healthIndexUpperCase;
        }

        if (!this.shadowRoot.querySelector(".box.active")) {
          console.warn(
            `${
            PfeHealthIndex.tag
            }: a valid health-index was not provided. Please use A, B, C, D, E, or F`
          );
        }
      default:
    }
  }
}

PFElement.create(PfeHealthIndex);

export default PfeHealthIndex;
