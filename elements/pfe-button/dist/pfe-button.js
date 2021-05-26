import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeButton 1.9.0
 * @license
 * Copyright 2021 Red Hat, Inc.
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
const denylistAttributes = ["style"];

class PfeButton extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.9.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{display:inline-block}:host([hidden]){display:none}:host([variant=primary]) button,button{background-color:#06c;background-color:var(--pfe-button--BackgroundColor,var(--pfe-theme--color--ui-accent,#06c));color:#fff;color:var(--pfe-button--Color,var(--pfe-theme--color--ui-base--text,#fff));font-size:1rem;font-size:var(--pfe-button--FontSize,var(--pf-global--FontSize--md,1rem));font-family:inherit;font-family:var(--pfe-theme--font-family,inherit);padding:calc(1rem / 2) 1rem;padding:var(--pfe-button--Padding,calc(var(--pfe-theme--container-padding,1rem)/ 2) var(--pfe-theme--container-padding,1rem));cursor:pointer;border-radius:3px;border-radius:var(--pfe-button--BorderRadius,var(--pfe-theme--surface--border-radius,3px));border:0;border:var(--pfe-button--Border,0);position:relative;line-height:1.5;line-height:var(--pfe-button--LineHeight,var(--pfe-theme--line-height,1.5))}:host([variant=primary]) button::after,button::after{position:absolute;top:0;left:0;right:0;bottom:0;content:"";border:1px solid transparent;border:var(--pfe-button__after--Border,var(--pfe-theme--ui--border-width,1px) var(--pfe-theme--ui--border-style,solid) var(--pfe-button__after--BorderColor,transparent));border-radius:3px;border-radius:var(--pfe-button--BorderRadius,var(--pfe-theme--surface--border-radius,3px))}:host([variant=primary]) button:focus,:host([variant=primary]) button:hover,button:focus,button:hover{--pfe-button--BackgroundColor:var(--pfe-button--BackgroundColor--hover, var(--pfe-theme--color--ui-accent--hover, #004080));--pfe-button__after--Border:var(--pfe-button__after--Border--hover, var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-button__after--BorderColor--hover, transparent))}:host([variant=danger]) button{background-color:#c9190b;background-color:var(--pfe-button--BackgroundColor,var(--pfe-theme--color--feedback--critical--lighter,#c9190b))}:host([variant=danger]) button:focus,:host([variant=danger]) button:hover{--pfe-button--BackgroundColor:var(--pfe-button--BackgroundColor--hover, var(--pfe-theme--color--feedback--critical, #a30000))}:host([variant=control]) button,:host([variant=secondary]) button,:host([variant=tertiary]) button{background-color:transparent;background-color:var(--pfe-button--BackgroundColor,transparent)}:host([variant=control]) button:focus,:host([variant=control]) button:hover,:host([variant=secondary]) button:focus,:host([variant=secondary]) button:hover,:host([variant=tertiary]) button:focus,:host([variant=tertiary]) button:hover{--pfe-button--BackgroundColor:var(--pfe-button--BackgroundColor--hover, transparent);--pfe-button__after--Border:var(--pfe-button__after--Border--hover, var(--pfe-theme--ui--border-width--md, 2px) var(--pfe-theme--ui--border-style, solid) var(--pfe-button__after--BorderColor, transparent))}:host([variant=secondary]) button{color:#06c;color:var(--pfe-button--Color,var(--pfe-theme--color--ui-accent,#06c))}:host([variant=secondary]) button::after{border-color:#06c;border-color:var(--pfe-button__after--BorderColor,var(--pfe-theme--color--ui-accent,#06c))}:host([variant=tertiary]) button{color:#151515;color:var(--pfe-button--Color,var(--pfe-theme--color--text,#151515))}:host([variant=tertiary]) button::after{border-color:#151515;border-color:var(--pfe-button__after--BorderColor,var(--pfe-theme--color--text,#151515))}:host([variant=control]) button{color:#151515;color:var(--pfe-button--Color,var(--pfe-theme--color--text,#151515));border-radius:0;border-radius:var(--pfe-button--BorderRadius,0)}:host([variant=control]) button:focus,:host([variant=control]) button:hover{--pfe-button__after--BorderColor:var(--pfe-button--BorderColor--hover, var(--pfe-theme--color--ui--border--lightest, #f0f0f0))}:host([variant=control]) button:focus::after,:host([variant=control]) button:hover::after{border-bottom-width:2px;border-bottom-width:var(--pfe-theme--ui--border-width--md,2px);border-bottom-color:#06c;border-bottom-color:var(--pfe-theme--color--ui-accent,#06c)}:host([variant=control]) button::after{border-color:#f0f0f0;border-color:var(--pfe-button__after--BorderColor,var(--pfe-theme--color--ui--border--lightest,#f0f0f0));border-bottom-color:#8a8d90;border-bottom-color:var(--pfe-theme--color--ui--border,#8a8d90)}:host([variant=control][disabled]) button{background-color:#f0f0f0;background-color:var(--pfe-button--BackgroundColor,var(--pfe-theme--color--surface--lighter,#f0f0f0))}:host([disabled]) button{background-color:#d2d2d2;background-color:var(--pfe-button--BackgroundColor,var(--pfe-theme--color--ui-disabled,#d2d2d2));color:#6a6e73;color:var(--pfe-button--Color,var(--pfe-theme--color--ui-disabled--text,#6a6e73));pointer-events:none}:host([disabled]) button::after{border:0;border:var(--pfe-button__after--Border,0)}:host([disabled]) button:focus,:host([disabled]) button:hover{--pfe-button--BackgroundColor:var(--pfe-button--BackgroundColor--hover, var(--pfe-theme--color--ui-disabled, #d2d2d2));--pfe-button__after--Border:var(--pfe-button__after--Border--hover, 0)} /*# sourceMappingURL=pfe-button.min.css.map */</style>
<span id="internalBtn"></span>`;
  }

  // Injected at build-time
  static get slots() {
    return {"default":{"title":"Default slot","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"button"}]}}};
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

  static get events() {
    return {
      click: `${this.tag}:click`
    };
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      variant: {
        title: "Style variant",
        type: String,
        values: ["primary", "secondary", "tertiary", "danger", "control"]
      },
      pfeVariant: {
        type: String,
        values: ["primary", "secondary", "tertiary", "danger", "control"],
        alias: "variant"
      },
      disabled: {
        title: "Disabled",
        type: Boolean,
        prefix: false,
        observer: "_disabledChanged"
      }
    };
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

  get _externalBtn() {
    return this.querySelector("button");
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasLightDOM()) this._init();

    this._observer.observe(this, parentObserverConfig);

    if (this._externalBtn) {
      this._externalBtnObserver.observe(this._externalBtn, externalBtnObserverConfig);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", this._clickHandler);
    this._observer.disconnect();
    this._externalBtnObserver.disconnect();
  }

  _disabledChanged(oldVal, newVal) {
    if (!this._externalBtn) {
      return;
    }

    if (newVal) {
      this._externalBtn.setAttribute("disabled", "");
    } else {
      this._externalBtn.removeAttribute("disabled");
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

    // If the external button has a disabled attribute
    if (this._externalBtn.hasAttribute("disabled")) {
      // Set it on the wrapper too
      this.setAttribute("disabled", "");
    }

    const clone = this._externalBtn.cloneNode(true);
    denylistAttributes.forEach(attribute => {
      if (clone.hasAttribute) {
        clone.removeAttribute(attribute);
      }
    });

    this._internalBtnContainer.innerHTML = clone.outerHTML;
    this._externalBtnObserver.observe(this._externalBtn, externalBtnObserverConfig);

    this._externalBtn.addEventListener("click", this._externalBtnClickHandler);
  }

  _isValidLightDom() {
    if (!this.hasLightDOM()) {
      this.warn(`You must have a button in the light DOM`);
      return false;
    }
    if (this.children[0].tagName !== "BUTTON") {
      this.warn(`The only child in the light DOM must be a button tag`);

      return false;
    }

    return true;
  }

  // when the parent changes, make sure the light DOM is valid,
  // initialize the component
  _parentObserverHandler() {
    if (!this._isValidLightDom()) {
      return;
    }

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
