import PFElement from "../../pfelement/dist/pfelement.js";

const parentObserverConfig = {
  childList: true
};

const externalBtnObserverConfig = {
  characterData: true,
  attributes: true,
  subtree: true,
  childList: true
};

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
    if (!this._externalBtn) {
      return;
    }

    if (this.children[0].tagName !== "BUTTON") {
      console.warn(
        `${PfeButton.tag}: The only child in the light DOM must be a button tag`
      );
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
  }

  _parentObserverHandler(mutationList) {
    if (!this.children.length) {
      console.warn(`${PfeButton.tag}: You must have a button in the light DOM`);
      return;
    }

    if (this.children[0].tagName !== "BUTTON") {
      console.warn(
        `${PfeButton.tag}: The only child in the light DOM must be a button tag`
      );

      return;
    }

    this._externalBtn = this.querySelector("button");
    this._init();
  }

  _clickHandler() {
    this._externalBtn.click();
    this.emitEvent(PfeButton.events.click);
  }
}

PFElement.create(PfeButton);

export default PfeButton;
