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

class RhPagination extends RHElement {
  static get tag() {
    return "rh-pagination";
  }

  get templateUrl() {
    return "rh-pagination.html";
  }

  get styleUrl() {
    return "rh-pagination.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  _copySlottedNav() {
    const slot = this.shadowRoot.querySelector("slot");
    const slotted = this.children[0];
    const paging = document.createElement("nav");
    paging.innerHTML = slotted.innerHTML;
    this.shadowRoot.appendChild(paging);
  }

  constructor() {
    super(RhPagination.tag);
  }

  connectedCallback() {
    super.connectedCallback();
    this._copySlottedNav();
    // slot.addEventListener('slotchange', e => {
    //
    // });
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

RHElement.create(RhPagination);

export default RhPagination;
