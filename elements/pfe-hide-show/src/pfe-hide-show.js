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

class PfeHideShow extends PFElement {
  static get tag() {
    return "pfe-hide-show";
  }

  get styleUrl() {
    return "pfe-hide-show.css";
  }

  get templateUrl() {
    return "pfe-hide-show.html";
  }

  get isTab() {
    return this.parentNode
      ? this.parentNode.offsetWidth > 768
      : window.outerWidth > 768;
  }

  get settings() {
    let settings = {};
    const variant = this.getAttribute("pfe-variant");
    if (variant === "primary") {
      settings.variant = variant;
      settings.color = "striped";
    } else if (variant === "secondary") {
      settings.variant = variant;
      settings.color = "dark";
    } else {
      settings.color = "lightest";
    }
    return settings;
  }

  get orientation() {
    if (this.hasAttribute("vertical")) {
      return " vertical";
    }
  }

  static get observedAttributes() {
    return ["pfe-vertical", "selected-index", "pfe-variant", "theme", "color"];
  }

  static get cascadingAttributes() {
    return {
      vertical: "pfe-tabs",
      "selected-index": "pfe-tabs",
      "pfe-variant": "pfe-tabs",
      theme: "pfe-accordion",
      color: "pfe-accordion"
    };
  }

  // Declare the type of this component
  static get pfeType() {
    return PFElement.pfeType.combo;
  }

  constructor() {
    super(PfeHideShow, {
      delayRender: true
    });

    this.groupings = [];

    this._observer = new MutationObserver(() => {
      const tempGrouping = [...this.querySelectorAll("pfe-hide-show-set")];

      tempGrouping.forEach(group => {
        const tempGroup = {
          heading: group.querySelector("[pfe-heading]"),
          body: [...group.querySelectorAll(":not([pfe-heading])")]
        };

        this.groupings.push(tempGroup);
      });

      this._observer.disconnect();
      this.render();
    });

    this._observer.observe(this, {
      attributes: true,
      childList: true
    });
  }
}

PFElement.create(PfeHideShow);

export default PfeHideShow;
