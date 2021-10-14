import PFElement from "../../pfelement/dist/pfelement.js";

class PfeClipboard extends PFElement {
  static get tag() {
    return "pfe-clipboard";
  }

  static get meta() {
    return {
      title: "Clipboard",
      description: "Copy current URL to clipboard.",
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
      copied: `${this.tag}:copied`,
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      noIcon: {
        title: "No icon",
        type: Boolean,
        observer: "_noIconChanged",
      },
      copiedDuration: {
        title: "Success message duration (in seconds)",
        type: Number,
        default: 3,
      },
      role: {
        type: String,
        default: "button",
      },
      tabindex: {
        type: Number,
        default: 0,
      },
      target: {
        type: String,
        default: 'url',
      }
    };
  }

  static get slots() {
    return {
      icon: {
        title: "Icon",
        description: "This field can accept an SVG, pfe-icon component, or other format for displaying an icon.",
        slotName: "icon",
        slotClass: "pfe-clipboard__icon",
        slotId: "icon",
      },
      text: {
        title: "Default text",
        slotName: "text",
        slotClass: "pfe-clipboard__text",
        slotId: "text",
      },
      textSuccess: {
        title: "Success message",
        description: "Shown when the URL is successfully copied to the clipboard.",
        slotName: "text--success",
        slotClass: "pfe-clipboard__text--success",
        slotId: "text--success",
      },
    };
  }

  constructor() {
    super(PfeClipboard, { type: PfeClipboard.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();

    // Since this element as the role of button we are going to listen
    // for click and as well as 'enter' and 'space' commands to trigger
    // the copy functionality
    this.addEventListener("click", this._clickHandler.bind(this));
    this.addEventListener("keydown", this._keydownHandler.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler.bind(this));
    this.removeEventListener("keydown", this._keydownHandler.bind(this));
    super.disconnectedCallback();
  }

  _noIconChanged(previousValue) {
    // dirty check to see if we should rerender the template
    if (this._rendered && this.noIcon !== previousValue) {
      this.render();
    }
  }

  /**
   * Event handler for any activation of the copy button
   */
  _clickHandler() {
    let text;
    switch (this.target) {
      // Copy current URL
      case 'url':
        text = window.location.href;
        break;
      // Copy whatever is in this.contentToCopy
      case 'property':
        if (this.contentToCopy) {
          text = this.contentToCopy;
        }
        else {
          this.error('Set to copy property, but this.contentToCopy is not set');
        }
        break;
      // Assume what's in the target property is a selector and copy the text from the element
      default:
        const targetElement = document.querySelector(this.target);
        if (targetElement && targetElement.tagName) {
          // What needs to be copied changes for some types of elements
          switch (targetElement.tagName.toLowerCase()) {
            // Copy the value of form fields
            case 'input':
              text = targetElement.value;
              break;
            // Copy the innerHTML of our element
            default:
              text = targetElement.innerHTML;
              break;
          }
        }
        break;
    }

    if (!text || typeof text === 'string' && !text.length) {
      this.error('Couldn\'t find text to copy.');
      return;
    }

    // Execute the copy to clipboard functionality
    this.copyTextToClipboard(text)
      .then((copiedText) => {
        // Emit event that lets others know the user has "copied"
        // the url. We are also going to include the url that was
        // copied.
        this.emitEvent(PfeClipboard.events.copied, {
          detail: {
            url: copiedText, // @todo deprecate
            copiedText: copiedText,
          },
        });
        // Toggle the copied state. Use the this._formattedCopiedTimeout function
        // to an appropraite setTimout length.
        this.setAttribute("copied", "");
        setTimeout(() => {
          this.removeAttribute("copied");
        }, this._formattedCopiedTimeout());
      })
      .catch((error) => {
        this.warn(error);
      });
  }

  // Formatted copied timeout value. Use the formattedCopiedTimeout function
  // to get a type safe, millisecond value of the timeout duration.
  _formattedCopiedTimeout() {
    const copiedDuration = Number(this.copiedDuration * 1000);
    if (!(copiedDuration > -1)) {
      this.warn(`copied-duration must be a valid number. Defaulting to 3 seconds.`);
      // default to 3 seconds
      return 3000;
    } else {
      return copiedDuration;
    }
  }

  // Listen for keyboard events and map them to their
  // corresponding mouse events.
  _keydownHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Enter" || 13:
        this._clickHandler(event);
        break;
      case " " || 32:
        // Prevent the browser from scolling when the user hits the space key
        event.stopPropagation();
        event.preventDefault();
        this._clickHandler(event);
        break;
    }
  }

  /**
   * Copy arbitrary text to system clipboard
   *
   * If available, it will use the new Navigator API to access the system clipboard
   * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard
   *
   * If unavailable, it will use the legacy execCommand("copy")
   * https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
   * @async
   * @param {string} text Text to be copied
   * @return {Promise<string>} url
   */
  copyTextToClipboard(text) {
    if (!text) this.error('Copy function called, but no text was given to copy.');
    return new Promise((resolve, reject) => {
      // If the Clipboard API is available then use that
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(resolve(text));
      }
      // If execCommand("copy") exists then use that method
      else if (document.queryCommandEnabled("copy")) {
        const dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        resolve(text);
      }
      else {
        reject(new Error("Current browser does not support copying to the clipboard."));
      }
    });
  }
}

PFElement.create(PfeClipboard);

export default PfeClipboard;
