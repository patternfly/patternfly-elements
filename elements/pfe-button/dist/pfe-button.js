import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeButton 1.0.0-prerelease.39
 * @license
 * Copyright 2020 Red Hat, Inc.
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
 * 
*/

// @IE11
// watching for addition and removal of nodes so
// we can make sure we have the correct light DOM
// and so we can set the _externalBtn property
const parentObserverConfig = {
  childList: true
};

// watching for changes on the _externalBtn so we can
// update text in our shadow DOM when the _externalBtn
// changes
const externalBtnObserverConfig = {
  characterData: true,
  attributes: true,
  subtree: true,
  childList: true
};

// list of attributes that we DO NOT want to pass from
// the _externalBtn to our shadow DOM button. For example,
// the style attribute could ruin our encapsulated styles
// in the shadow DOM
const blackListedAttributes = ["style"];

class PfeButton extends PFElement {
  static get version() {
    return "1.0.0-prerelease.39";
  }

  get html() {
    return `<style>:host{display:inline-block}:host([hidden]){display:none}:host([pfe-variant=primary]) button,button{background-color:#06c;color:#fff;font-size:16px;padding:8px 16px;cursor:pointer;border-radius:3px;border:0;position:relative}:host([pfe-variant=primary]) button:after,button:after{position:absolute;top:0;left:0;right:0;bottom:0;content:""}:host([pfe-variant=primary]) button:focus,:host([pfe-variant=primary]) button:hover,button:focus,button:hover{background-color:#004080}:host([pfe-variant=secondary]) button{background-color:transparent;color:#06c}:host([pfe-variant=secondary]) button:after{border:1px solid #06c;border-radius:3px}:host([pfe-variant=secondary]) button:focus:after,:host([pfe-variant=secondary]) button:hover:after{border:2px solid #06c}:host([pfe-variant=tertiary]) button{background-color:transparent;color:#151515}:host([pfe-variant=tertiary]) button:after{border:1px solid #151515;border-radius:3px}:host([pfe-variant=tertiary]) button:focus:after,:host([pfe-variant=tertiary]) button:hover:after{border:2px solid #151515}:host([pfe-variant=danger]) button{background-color:#c9190b;color:#fff}:host([pfe-variant=danger]) button:focus,:host([pfe-variant=danger]) button:hover{background-color:#a30000}:host([pfe-variant=control]) button{background-color:transparent;color:#151515;border-radius:0}:host([pfe-variant=control]) button:after{border:1px solid #ededed;border-bottom-color:#8a8d90}:host([pfe-variant=control]) button:focus:after,:host([pfe-variant=control]) button:hover:after{border-bottom-width:2px;border-bottom-color:#06c}:host([pfe-variant=control][disabled]) button{background-color:transparent}:host([disabled]) button{background-color:#d2d2d2;color:#737679;pointer-events:none}:host([disabled]) button:focus,:host([disabled]) button:hover{background-color:#d2d2d2}:host([disabled]) button:focus:after,:host([disabled]) button:hover:after{border:0}:host([disabled]) button:after{border:0}
/*# sourceMappingURL=pfe-button.min.css.map */
</style><span id="internalBtn"></span>`;
  }

  static get properties() {
    return {"variant":{"title":"Style variant","type":"string","prefixed":true,"enum":["primary","secondary","tertiary","danger","control"]}};
  }

  static get slots() {
    return {"default":{"title":"Default slot","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "pfe-button";
  }

  get schemaUrl() {
    return "pfe-button.json";
  }

  get templateUrl() {
    return "pfe-button.html";
  }

  get styleUrl() {
    return "pfe-button.scss";
  }

  get disabled() {
    return this.hasAttribute("disabled");
  }

  static get events() {
    return {
      click: `${this.tag}:click`
    };
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get observedAttributes() {
    return ["disabled"];
  }

  constructor() {
    super(PfeButton, { type: PfeButton.PfeType });

    this._init = this._init.bind(this);
    this._parentObserverHandler = this._parentObserverHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._internalBtnContainer = this.shadowRoot.querySelector("#internalBtn");
    this._observer = new MutationObserver(this._parentObserverHandler);
    this._externalBtnClickHandler = this._externalBtnClickHandler.bind(this);
    this._externalBtnObserver = new MutationObserver(this._init);

    this.addEventListener("click", this._clickHandler);
  }

  connectedCallback() {
    super.connectedCallback();
    this._externalBtn = this.querySelector("button");

    if (this.children.length) {
      this._init();
    }

    this._observer.observe(this, parentObserverConfig);

    if (this._externalBtn) {
      this._externalBtnObserver.observe(
        this._externalBtn,
        externalBtnObserverConfig
      );
    }
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler);
    this._observer.disconnect();
    this._externalBtnObserver.disconnect();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    switch (attr) {
      case "disabled":
        if (!this._externalBtn) {
          return;
        }

        if (this.disabled) {
          this._externalBtn.setAttribute("disabled", "");
        } else {
          this._externalBtn.removeAttribute("disabled");
        }
        break;
    }
  }

  _init() {
    if (!this._isValidLightDom()) {
      return;
    }

    if (!this._externalBtn) {
      return;
    }

    this._externalBtnObserver.disconnect();

    if (this._externalBtn.hasAttribute("disabled")) {
      this.setAttribute("disabled", "");
    } else {
      this.removeAttribute("disabled");
    }

    const clone = this._externalBtn.cloneNode(true);
    blackListedAttributes.forEach(attribute => {
      if (clone.hasAttribute) {
        clone.removeAttribute(attribute);
      }
    });

    this._internalBtnContainer.innerHTML = clone.outerHTML;
    this._externalBtnObserver.observe(
      this._externalBtn,
      externalBtnObserverConfig
    );

    this._externalBtn.addEventListener("click", this._externalBtnClickHandler);
  }

  _isValidLightDom() {
    if (!this.children.length) {
      console.warn(`${PfeButton.tag}: You must have a button in the light DOM`);
      return false;
    }

    if (this.children[0].tagName !== "BUTTON") {
      console.warn(
        `${PfeButton.tag}: The only child in the light DOM must be a button tag`
      );

      return false;
    }

    return true;
  }

  // when the parent changes, make sure the light DOM is valid,
  // set the _externalBtn, and initialize the component
  _parentObserverHandler() {
    if (!this._isValidLightDom()) {
      return;
    }

    this._externalBtn = this.querySelector("button");
    this._init();
  }

  // programmatically clicking the _externalBtn is what makes
  // this web component button work in a form as you'd expect
  _clickHandler() {
    this._externalBtn.click();
  }

  _externalBtnClickHandler() {
    this.emitEvent(PfeButton.events.click);
  }
}

PFElement.create(PfeButton);

export default PfeButton;
//# sourceMappingURL=pfe-button.js.map
