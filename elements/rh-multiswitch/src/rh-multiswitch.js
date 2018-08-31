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

class RhMultiswitch extends RHElement {
  static get tag() {
    return "rh-multiswitch";
  }

  get styleUrl() {
    return "rh-multiswitch.scss";
  }

  get templateUrl() {
    return "rh-multiswitch.html";
  }

  constructor() {
    super(RhMultiswitch);

    this._slotChange = this._slotChange.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    let slot = this.shadowRoot.querySelector("slot");
    slot.addEventListener("slotchange", this._slotChange);
  }

  disconnectedCallback() {}

  _slotChange(event) {
    // Make sure we're applying proper form semantics
    const firstChild = this.children[0];
    if (!firstChild) {
      console.warn(
        "The first child in the light DOM must be a fieldset (<fieldset>) with a legend"
      );
    } else if (firstChild && firstChild.tagName.toLowerCase() !== "fieldset") {
      console.warn(
        "The first child in the light DOM must be a fieldset (<fieldset>) with a legend"
      );
    } else {
      let fieldset = this.querySelector("fieldset");
      fieldset.classList.add("rh-multiswitch__fieldset");

      // Wrap everything with a <div>
      let wrapper = document.createElement("div");
      wrapper.classList.add("rh-multiswitch__container");
      while (fieldset.childNodes.length > 0) {
        wrapper.appendChild(fieldset.childNodes[0]);
      }
      fieldset.appendChild(wrapper);

      // Add a "slide" at the end
      let slide = document.createElement("a");
      slide.classList.add("rh-multiswitch__slide");
      slide.setAttribute("aria-hidden", "true");
      wrapper.appendChild(slide);

      let legend = this.querySelector("legend");
      fieldset.insertBefore(legend, wrapper);

      let fieldsetClone = fieldset.cloneNode(true);

      // TODO: Figure out how to clear children before appending so the copy is clean.
      this.shadowRoot.appendChild(fieldsetClone);
    }
  }
}

RHElement.create(RhMultiswitch);
