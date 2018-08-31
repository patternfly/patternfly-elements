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

class RhSearchResult extends RHElement {
  static get tag() {
    return "rh-search-result";
  }

  get styleUrl() {
    return "rh-search-result.scss";
  }

  get templateUrl() {
    return "rh-search-result.html";
  }

  constructor() {
    super(RhSearchResult);

    this._headingId = "#heading";

    const headingSlot = this.shadowRoot.querySelector('[name="heading"]');
    headingSlot.addEventListener("slotchange", () => {
      this._transport(headingSlot, this._headingId);
    });

    this._transport(headingSlot, this._headingId);
  }

  _transport(slot, destination) {
    const nodes = slot.assignedNodes();

    if (!nodes.length) {
      return;
    }

    this.shadowRoot.querySelector(destination).innerHTML = nodes[0].outerHTML;
  }
}

RHElement.create(RhSearchResult);
