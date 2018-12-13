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
      this.isTab
        ? `
    <rh-tabs ${this.tabVariant} ${this.tabOrientation}>
      ${this.groupings
        .map(
          group => `
        <rh-tab role="heading" slot="tab">
          ${group.heading.innerText}
        </rh-tab>
        <rh-tab-panel role="region" slot="panel">
          ${group.body.outerHTML}
        </rh-tab-panel>
      `
        )
        .join("")}
    </rh-tabs>
  `
        : `
    <rh-accordion ${this.tabVariant}>
      ${this.groupings
        .map(
          group => `
        <rh-accordion-header>
          ${group.heading.outerHTML}
        </rh-accordion-header>
        <rh-accordion-panel>
          ${group.body.outerHTML}
        </rh-accordion-panel>
      `
        )
        .join("")}
    </rh-accordion>
  `
    }`;
  }

  static get tag() {
    return "rh-hide-show";
  }

  get styleUrl() {
    return "rh-hide-show.css";
  }

  get templateUrl() {
    return "rh-hide-show.html";
  }

  get isTab() {
    return this.parentNode.offsetWidth > 768;
  }

  get tabVariant() {
    if (this.getAttribute("rh-variant") === "primary") {
      return "rh-variant=primary color=striped";
    } else if (this.getAttribute("rh-variant") === "secondary") {
      return "rh-variant=secondary color=dark";
    } else {
      return "color=lightest";
    }
  }

  get tabOrientation() {
    if (this.hasAttribute("vertical")) {
      return "vertical";
    }
  }

  static get observedAttributes() {
    return ["vertical", "selected-index", "rh-variant", "theme", "color"];
  }

  static get cascadingAttributes() {
    return {
      vertical: "rh-tabs",
      "selected-index": "rh-tabs",
      "rh-variant": "rh-tabs",
      theme: "rh-accordion",
      color: "rh-accordion"
    };
  }

  // Declare the type of this component
  static get rhType() {
    return RHElement.rhType.combo;
  }

  constructor() {
    super(RhHideShow, {
      delayRender: true
    });

    this.groupings = [];

    this._observer = new MutationObserver(() => {
      const tempGrouping = [...this.querySelectorAll("rh-hide-show-set")];
      tempGrouping.forEach(group => {
        const tempGroup = {
          heading: group.querySelector("[heading]"),
          body: group.querySelector(":not([heading])")
        };

        this.groupings.push(tempGroup);
      });

      this.render();
    });

    this._observer.observe(this, {
      attributes: true,
      childList: true
    });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

RHElement.create(RhHideShow);

export default RhHideShow;
//# sourceMappingURL=rh-hide-show.js.map
