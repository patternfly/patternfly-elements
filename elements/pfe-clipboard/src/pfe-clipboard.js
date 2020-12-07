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

    // Add accessibility attributes to treat this element as a button
    this.setAttribute("role", "button");
    this.setAttribute("tabindex", "0");

    // @todo: find out why this isn't working
    // this.addEventListener(PfeClipboard.events.click, this._clickHandler);
    this.addEventListener("click", this._clickHandler);
  }

  disconnectedCallback() {
    this.removeEventListener(PfeClipboard.events.click, this._clickHandler);
  }

  // @todo: Should we emit the url on copy?
  _clickHandler(event) {
    // Execute the copy to clipboard functionality
    this.copyURLToClipboard();
    // Emit event that lets others know the user has "clicked"
    // the button
    this.emitEvent(PfeClipboard.events.click, {
      detail: {}
    });
  }

  // @todo: Should we return the url as a promise?
  // Copy url to the user's system clipboard clipboard
  copyURLToClipboard() {
    const url = window.location.href;
    // If the Clipboard API is available then use that
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    // If execCommand("copy") exists then use that method
    else if (document.queryCommandEnabled("copy")) {
      const dummy = document.createElement("input");
      document.body.appendChild(dummy);
      dummy.value = url;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    } else {
      console.error("Your browser does not support copying to the clipboard.");
    }
  }
}

PFElement.create(PfeClipboard);

export default PfeClipboard;
