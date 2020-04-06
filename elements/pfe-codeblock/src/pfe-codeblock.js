import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCodeblock extends PFElement {
  static get tag() {
    return "pfe-codeblock";
  }

  get schemaUrl() {
    return "pfe-codeblock.json";
  }

  get templateUrl() {
    return "pfe-codeblock.html";
  }

  get styleUrl() {
    return "pfe-codeblock.scss";
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      click: `${this.tag}:click`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeCodeblock, { type: PfeCodeblock.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this.addEventListener(PfeCodeblock.events.change, this._changeHandler);
    this.addEventListener(PfeCodeblock.events.click, this._clickHandler);
  }

  disconnectedCallback() {
    this.removeEventListener(PfeCodeblock.events.change, this._changeHandler);
    this.removeEventListener(PfeCodeblock.events.click, this._clickHandler);
  }

  _changeHandler(event) {
    this.emitEvent(PfeCodeblock.events.change, {
      detail: {}
    });
  }
  _clickHandler(event) {
    this.emitEvent(PfeCodeblock.events.click, {
      detail: {}
    });
  }
}

PFElement.create(PfeCodeblock);

export default PfeCodeblock;
