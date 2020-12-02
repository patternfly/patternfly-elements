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
const denylistAttributes = ["style"];

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
