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
    return this.getAttribute("aside-position").split(" ");
  }

  static get observedAttributes() {
    return ["img-src"];
  }

  constructor() {
    super(RhBand);
  }

  connectedCallback() {
    super.connectedCallback();
    this._queueAction({
      type: "copyAttribute",
      data: {
        name: "aside-position",
        to: ".rh-band__wrapper"
      }
    });
  }

  // disconnectedCallback() {}

  attributeChangedCallback(attr, oldValue, newValue) {
    const imgSrc = newValue;
    // Set the image as the background image
    if (imgSrc) {
      this.shadowRoot.querySelector(".rh-band__wrapper").style.backgroundImage =
        "url('" + imgSrc + "')";
    }
  }
}

RHElement.create(RhBand, { type: "container" });

export default RhBand;
