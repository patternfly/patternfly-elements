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

  get styleUrl() {
    return "rh-hide-show.css";
  }

  get templateUrl() {
    return "rh-hide-show.html";
  }

  isTab() {
    return this.parentNode.offsetWidth > 768;
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
      color: "rh-accordion",
      "render-as": "rh-hide-show-set"
    };
  }

  // Declare the type of this component
  static get rhType() {
    return RHElement.rhType.combo;
  }

  constructor() {
    super(RhHideShow);
  }

  connectedCallback() {
    super.connectedCallback();

    // let tag = document.createElement("rh-accordion");
    // if (this.isTab()) {
    //   tag = document.createElement("rh-tabs");
    // }

    // if (this.children.length > 0) {
    //   Array.from(this.children).forEach(child => {
    //     tag.appendChild(child);
    //   });
    // }
    // this.shadowRoot.innerHTML = "";
    // // Add the element to the shadow DOM
    // this.shadowRoot.appendChild(tag);
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

class RhHideShowSet extends RHElement {
  static get tag() {
    return "rh-hide-show-set";
  }

  get styleUrl() {
    return "rh-hide-show.css";
  }

  get templateUrl() {
    return "rh-hide-show-set.html";
  }

  isTab() {
    return this.parentNode.parentNode.offsetWidth > 768;
  }

  // static get observedAttributes() {
  //   return [];
  // }

  // Declare the type of this component
  static get rhType() {
    return RHElement.rhType.component;
  }

  constructor() {
    super(RhHideShowSet);
  }

  connectedCallback() {
    super.connectedCallback();

    // if (this.children.length > 0) {
    //   let tag_header;
    //   let tag_panel;

    //   // Create an array from the child nodes
    //   let header = Array.from(this.children).filter(
    //     child => child.slot === "rh-hide-show-set--header"
    //   );
    //   let panels = Array.from(this.children).filter(
    //     child => child.slot !== "rh-hide-show-set--header"
    //   );

    //   // Check if this should be a tab or accordion
    //   if (this.isTab()) {
    //     // Build the header section
    //     tag_header = document.createElement("rh-tab");
    //     tag_header.setAttribute("slot", "tab");
    //     tag_header.setAttribute("role", "heading");
    //     // Build the panel section
    //     tag_panel = document.createElement("rh-tab-panel");
    //     tag_panel.setAttribute("slot", "panel");
    //     tag_panel.setAttribute("role", "region");

    //     if (header.length > 0) {
    //       tag_header.innerText = header[0].innerText;
    //     }
    //   } else {
    //     tag_header = document.createElement("rh-accordion-header");
    //     tag_panel = document.createElement("rh-accordion-panel");
    //     if (header.length > 0) {
    //       header.forEach(child => {
    //         tag_header.appendChild(child);
    //       });
    //     }
    //   }

    //   if (panels.length > 0) {
    //     panels.forEach(child => {
    //       tag_panel.appendChild(child);
    //     });
    //   }

    //   this.shadowRoot.innerHTML = "";
    //   // Add the header to the shadow DOM
    //   this.shadowRoot.appendChild(tag_header);
    //   // Add the panel to the shadow DOM
    //   this.shadowRoot.appendChild(tag_panel);
    // }
  }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

RHElement.create(RhHideShowSet);
RHElement.create(RhHideShow);

// export default RhHideShow;
// export default RhHideShowSet;
