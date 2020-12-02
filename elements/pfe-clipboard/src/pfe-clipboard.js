import PFElement from "../../pfelement/dist/pfelement.js";

class PfeClipboard extends PFElement {
  static get tag() {
    return "pfe-clipboard";
  }

  static get meta() {
    return {
      title: "Clipboard",
      description: "Copy current URL to clipboard."
    };
  }

  get templateUrl() {
    return "pfe-clipboard.html";
  }

  get styleUrl() {
    return "pfe-clipboard.scss";
  }

  static get events() {
    return {
      click: `${this.tag}:click`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {};
  }

  static get slots() {
    return {
      icon: {
        title: "Icon",
        slotName: "pfe-clipboard--icon",
        slotClass: "pfe-clipboard__icon",
        slotId: "icon"
      },
      text: {
        title: "Text",
        slotName: "pfe-clipboard--text",
        slotClass: "pfe-clipboard__text",
        slotId: "text"
      }
    };
  }

  constructor() {
    super(PfeClipboard, { type: PfeClipboard.PfeType });

    this._icon = this.shadowRoot.querySelector(`#icon`);
    this._text = this.shadowRoot.querySelector(`#text`);
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this.icon = this.querySelector(`[slot="${this.tag}--icon"]`);
    this.text = this.querySelector(`[slot="${this.tag}--text"]`);

    // Add a slotchange listener to the lightDOM trigger
    // this.icon.addEventListener("slotchange", this._init);

    this.addEventListener(PfeClipboard.events.click, this._clickHandler);
  }

  disconnectedCallback() {
    this.removeEventListener(PfeClipboard.events.click, this._clickHandler);
  }

  _clickHandler(event) {
    this.emitEvent(PfeClipboard.events.click, {
      detail: {}
    });
  }
}

PFElement.create(PfeClipboard);

export default PfeClipboard;
