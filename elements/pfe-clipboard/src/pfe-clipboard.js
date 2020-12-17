import PFElement from "../../pfelement/dist/pfelement.js";
import "../../pfe-toast/dist/pfe-toast.js";

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
      copied: `${this.tag}:copied`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      iconHidden: {
        title: "Icon Hidden",
        type: Boolean,
        attr: "icon-hidden"
      },
      notifications: {
        title: "Notifications",
        type: Boolean,
        attr: "notifications"
      }
    };
  }

  static get slots() {
    return {
      icon: {
        title: "Icon",
        slotName: "pfe-clipboard--icon",
        slotClass: "pfe-clipboard__icon",
        slotId: "icon"
      },
      default: {
        title: "Text",
        slotName: "pfe-clipboard--text",
        slotClass: "pfe-clipboard__text",
        slotId: "text"
      },
      notificationText: {
        title: "Notification Text",
        slotName: "pfe-clipboard--notification-text",
        slotClass: "pfe-clipboard__notification-text",
        slotId: "notification-text"
      }
    };
  }

  constructor() {
    super(PfeClipboard, { type: PfeClipboard.PfeType });

    this._icon = this.shadowRoot.querySelector(`#icon`);
    this._text = this.shadowRoot.querySelector(`#text`);
    this._text = this.shadowRoot.querySelector(`#notification-text`);
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this.icon = this.querySelector(`[slot="${this.tag}--icon"]`);
    this.text = this.querySelector(`[slot="${this.tag}--text"]`);
    this.text = this.querySelector(`[slot="${this.tag}--notification-text"]`);

    // Add a slotchange listener to the lightDOM trigger
    // this.icon.addEventListener("slotchange", this._init);

    // Add accessibility attributes to treat this element as a button
    this._containerElement = this.shadowRoot.querySelector(".pfe-clipboard__container");
    this._containerElement.setAttribute("role", "button");
    this._containerElement.setAttribute("tabindex", "0");

    this._containerElement.addEventListener("click", this._clickHandler.bind(this));
    this._containerElement.addEventListener("keydown", this._keydownHandler.bind(this));
  }

  disconnectedCallback() {
    this._containerElement.removeEventListener("click", this._clickHandler.bind(this));
    this._containerElement.removeEventListener("keydown", this._keydownHandler.bind(this));
  }

  _clickHandler(event) {
    // Execute the copy to clipboard functionality
    this.copyURLToClipboard()
      .then(url => {
        // If the users have opted in to notifications
        if (this.notifications) {
          this._toggleToastNotification();
        }
        // Emit event that lets others know the user has "copied"
        // the button
        this.emitEvent(PfeClipboard.events.copied, {
          detail: {
            url
          }
        });
      })
      .catch(error => {
        this.warn(error);
      });
  }

  // Listen for keyboard events and map them to their
  // corresponding mouse events.
  _keydownHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Enter":
        this._clickHandler(event);
        break;
      case 13:
        this._clickHandler(event);
        break;
    }
  }

  /**
   * Copy url to the user's system clipboard clipboard
   * https://caniuse.com/mdn-api_navigator_clipboard
   * @async
   * @return {Promise<string>} url
   */
  copyURLToClipboard() {
    return new Promise((resolve, reject) => {
      const url = window.location.href;
      // If the Clipboard API is available then use that
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(resolve(url));
      }
      // If execCommand("copy") exists then use that method
      else if (document.queryCommandEnabled("copy")) {
        const dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = url;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        resolve(url);
      } else {
        reject(new Error("Your browser does not support copying to the clipboard."));
      }
    });
  }

  /**
   * This appends a notification to the shadowdom and toggle it
   * This technique uses a combo of templates and slots for implimentation flexibility
   * See https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots
   */
  _toggleToastNotification() {
    // Get the correct template
    const template = this._getTemplate("#notification--template");
    // Create a fragment from that template
    const fragment = template.content.cloneNode(true);
    // Hold on the the reference to pfe-toast
    const pfeToast = fragment.querySelector(`pfe-toast`);
    // Append the fragment to the body
    this.shadowRoot.appendChild(fragment);
    // If there was a pfeToast then toggle it
    if (pfeToast) {
      pfeToast.toggle();
    }
  }

  /**
   * This looks in the shadowdom and lightdom to see if it should return the
   * user supplied template or the default template located in the shadowdom
   * @todo Move _getTemplate to PFElement
   */
  _getTemplate(selector) {
    // first find out if their is a user specified template
    const userTemplate = this.querySelector(selector);
    if (userTemplate) {
      return userTemplate;
    } else {
      return this.shadowRoot.querySelector(selector);
    }
  }
}

PFElement.create(PfeClipboard);

export default PfeClipboard;
