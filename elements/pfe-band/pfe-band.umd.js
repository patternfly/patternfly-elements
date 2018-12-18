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

import PFElement from "../pfelement/pfelement.umd";

class PfeBand extends PFElement {
  get html() {
    return `
<div class="pfe-band__wrapper">
  <div class="pfe-band__container">
    ${this.has_slot("aside") && this.asidePosition.includes("full") && this.asidePosition.includes("top") ? `<slot class="pfe-band__aside" name="aside"></slot>` : ''}
    <section class="pfe-band__main">
      ${this.has_slot("header") ? `<slot class="pfe-band__header" name="header"></slot>` : ''}
      <div class="pfe-band__content">
        ${this.has_slot("aside") && !this.asidePosition.includes("full") && this.asidePosition.includes("top") ? `<slot class="pfe-band__aside" name="aside"></slot>` : ''}
        <slot class="pfe-band__body"></slot>
        ${this.has_slot("aside") && !this.asidePosition.includes("full") && !this.asidePosition.includes("top") ? `<slot class="pfe-band__aside" name="aside"></slot>` : ''}
      </div>
      ${this.has_slot("footer") ? `<slot class="pfe-band__footer" name="footer"></slot>` : ''}
    </section>
    ${this.has_slot("aside") && this.asidePosition.includes("full") && !this.asidePosition.includes("top") ? `<slot class="pfe-band__aside" name="aside"></slot>` : ''}
  </div>
</div>`;
  }

  static get properties() {
    return {"pfe-color":{"title":"Background color","name":"pfe-color","type":"string","enum":["lightest","light","base","dark","darkest","complement","accent"],"default":"base","observer":"_colorChanged"},"pfe-img-src":{"title":"Background image","name":"pfe-img-src","type":"string","default":"","observer":"_imgSrcChanged"}};
  }

  static get tag() {
    return "pfe-band";
  }

  get schemaUrl() {
    return "pfe-band.json";
  }

  get templateUrl() {
    return "pfe-band.html";
  }

  get styleUrl() {
    return "pfe-band.scss";
  }

  get asidePosition() {
    // X: right, left
    // Y: full, body
    // MOBILE: top, bottom
    // Push the aside position selector to the wrappers
    let array = [];
    let aside_props = this.getAttribute("pfe-aside");
    if (aside_props) {
      array = aside_props.split(" ");
    }
    return array;
  }

  static get observedAttributes() {
    return ["pfe-aside", "pfe-img-src"];
  }

  static get cascadingAttributes() {
    return {
      aside: ".pfe-band__wrapper"
    };
  }

  // Declare the type of this component
  static get pfeType() {
    return PFElement.pfeType.container;
  }

  constructor() {
    super(PfeBand);
    // Map the imported properties json to real props on the element
    // @notice static getter of properties is built via tooling
    // to edit modify src/pfe-band.json
    let props = PfeBand.properties;
    for (let p in props) {
      if (props.hasOwnProperty(p)) {
        if (this.hasAttribute(p)) {
          this[p] = this.getAttribute(p);
        } else {
          this.setAttribute(p, props[p].value);
          this[p] = props[p].value;
        }
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    // This is where it has content and should have width!
    // this.shadowRoot.style.setProperty("--pfe-eq--width", this.size().width);
    // this.shadowRoot.style.setProperty("--pfe-eq--height", this.size().height);
  }

  // disconnectedCallback() {}

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);

    switch (attr) {
      case "pfe-img-src": {
        // Set the image as the background image
        this.shadowRoot.querySelector(
          ".pfe-band__wrapper"
        ).style.backgroundImage = newValue ? `url('${newValue}')` : ``;
        break;
      }
    }
  }
}

PFElement.create(PfeBand);

export { PfeBand as default };
