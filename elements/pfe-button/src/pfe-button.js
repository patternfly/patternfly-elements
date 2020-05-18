import PFElement from "../../pfelement/dist/pfelement.js";

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
