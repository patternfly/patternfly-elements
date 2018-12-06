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

class RhHideShow extends RHElement {
  static get tag() {
    return "rh-hide-show";
  }

  get templateUrl() {
    return "rh-hide-show.html";
  }

  get styleUrl() {
    return "rh-hide-show.scss";
  }

  documentIsFinishedLoading() {
    return /^complete|^i|^c/.test(document.readyState);
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(RhHideShow.tag);

    this._hideShowContainer = this.querySelector("rh-hide-show");
    this.tabsSet;
  }

  size() {
    return {
      width: this.offsetWidth,
      height: this.offsetHeight
    };
  }

  connectedCallback() {
    super.connectedCallback();

    // This is where it has content and should have width!
    // console.log(this.width());

    var tabsSet = false;
    var hideshowWidth = this.size().width;
    if (hideshowWidth > 768) {
      console.log("This should display as tabs.");
      var tabsSet = true;
    }
    console.log(hideshowWidth);
    console.log(tabsSet);

    return tabsSet;
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

RHElement.create(RhHideShow);

export default RhHideShow;
