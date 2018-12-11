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

class RhBand extends RHElement {
  static get tag() {
    return "rh-band";
  }

  get templateUrl() {
    return "rh-band.html";
  }

  get styleUrl() {
    return "rh-band.scss";
  }

  get asidePosition() {
    // X: right, left
    // Y: full, body
    // MOBILE: top, bottom
    // Push the aside position selector to the wrappers
    return this.getAttribute("aside").split(" ");
  }

  static get observedAttributes() {
    return ["aside", "img-src"];
  }

  static get cascadingAttributes() {
    return {
      aside: ".rh-band__wrapper"
    };
  }

  // Declare the type of this component
  static get rhType() {
    return RHElement.rhType.container;
  }

  constructor() {
    super(RhBand);
  }

  connectedCallback() {
    super.connectedCallback();

    // This is where it has content and should have width!
    // this.shadowRoot.style.setProperty("--rh-eq--width", this.size().width);
    // this.shadowRoot.style.setProperty("--rh-eq--height", this.size().height);
  }

  // disconnectedCallback() {}

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);

    switch (attr) {
      case "img-src": {
        // Set the image as the background image
        this.shadowRoot.querySelector(
          ".rh-band__wrapper"
        ).style.backgroundImage = newValue ? `url('${newValue}')` : ``;
        break;
      }
    }
  }
}

RHElement.create(RhBand);

export default RhBand;
