import RHElement from "../rhelement/rhelement.js";

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

class RhHideShow extends RHElement {
  get html() {
    return `
<style>
:host {
  display: block; }
</style>
${
      this.isTab()
        ? `<rh-tabs><slot name="header"></slot><slot></slot></rh-tabs>`
        : `<rh-accordion><rh-accordion-header><slot name="header"></slot></rh-accordion-header><rh-accordion-panel><slot></slot></rh-accordion-panel></rh-accordion>`
    }`;
  }

  static get tag() {
    return "rh-hide-show";
  }

  get templateUrl() {
    return "rh-hide-show.html";
  }

  get styleUrl() {
    return "rh-hide-show.scss";
  }

  isTab() {
    return this.parentNode.offsetWidth > 768;
  }

  // static get observedAttributes() {
  //   return [];
  // }

  // Declare the type of this component
  static get rhType() {
    return RHElement.rhType.combo;
  }

  constructor() {
    super(RhHideShow, { delayRender: true });
  }

  connectedCallback() {
    super.connectedCallback();
    this.render();
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

RHElement.create(RhHideShow);

export default RhHideShow;
//# sourceMappingURL=rh-hide-show.js.map
