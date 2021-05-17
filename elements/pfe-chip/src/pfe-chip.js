import PFElement from "../../pfelement/dist/pfelement.js";
import PfeBadge from "../../pfe-badge/dist/pfe-badge.js";
import PfeIcon from "../../pfe-icon/dist/pfe-icon.js";

class PfeChip extends PFElement {
  static get tag() {
    return "pfe-chip";
  }

  static get meta() {
    return {
      title: "Chip",
      description:
        "A chip is used to display items that have been filtered or selected from a larger group. They comprise of a text element and a button component that is used to remove the chip from selection. When the text overflows it is truncated using ellipses."
    };
  }

  get templateUrl() {
    return "pfe-chip.html";
  }

  get styleUrl() {
    return "pfe-chip.scss";
  }

  get showCloseButton() {
    return !this.readOnly && !this.overflow;
  }

  hide() {
    this.setAttribute("hidden", "");
  }

  show() {
    this.removeAttribute("hidden");
  }

  delete() {
    this.parentNode.removeChild(this);
  }

  static get events() {
    return {
      close: `${this.tag}:close`,
      load: `${this.tag}:load`
    };
  }

  static get properties() {
    return {
      readOnly: {
        title: "Read only",
        type: Boolean,
        default: false
      },
      overflow: {
        title: "Overflow",
        type: Number
      },
      badge: {
        title: "Badge",
        type: Number
      }
    };
  }

  static get slots() {
    return {
      default: {
        title: "Default slot",
        type: "array",
        namedSlot: false,
        items: {
          oneOf: [
            {
              $ref: "raw"
            }
          ]
        }
      },
      badge: {
        title: "Badge",
        type: "array",
        namedSlot: true,
        items: {
          title: "Badge item",
          oneOf: [
            {
              $ref: "raw"
            }
          ]
        }
      }
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeChip, { type: PfeChip.PfeType });

    this._text = this.shadowRoot.querySelector(`.${this.tag}__text`);
    this._badge = this.shadowRoot.querySelector(`pfe-badge`);
    this._close = this.shadowRoot.querySelector(`.${this.tag}__close`);
    this._add = this.shadowRoot.querySelector(`.${this.tag}__button`);

    this._init = this._init.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._keyupHandler = this._keyupHandler.bind(this);
    this._badgeObserver = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    this.badge = this.querySelector(`[slot="badge"]`);

    // Add a slotchange listener to the lightDOM trigger
    if (this.badge) {
      this._badgeObserver.observe(this.badge, {
        characterData: true,
        attributes: true,
        subtree: true,
        childList: true
      });
      // this.badge.addEventListener("slotchange", this._init);
    }

    // @TODO load icon using pfe-icon instead of hardcoding SVG
    Promise.all([
      customElements.whenDefined(PfeIcon.tag)
    ]).then(() => {
      // Set up font-awesome icon set
      if(!PfeIcon._iconSets["fas"]) {
        PfeIcon.addIconSet(
          "fas",
          "//unpkg.com/@fortawesome/fontawesome-free@5/svgs/solid",
          (iconName, setName, path) => {
            const name = iconName.replace("fas-", "");
            return `${path}/${name}.svg`;
          }
        );
      }
    });

    this._init();
  }

  _init() {
    // Capture the text content and move it to the Shadow DOM
    if (this.firstChild && this.firstChild.textContent.trim()) {
      this._text.textContent = this.firstChild.textContent.trim();
    } else if (this.firstElementChild && this.firstElementChild.textContent.trim()) {
      this._text.textContent = this.firstElementChild.textContent.trim();
    }

    // If the badge element exists, check that it's value is numeric
    let badgeContent = "";
    if (this.badge) badgeContent = this.badge.textContent;

    if (badgeContent) {
      if (isNaN(badgeContent)) {
        console.warn(`${this.tag}: The badge content must be numeric.`);
      } else {
        this._badge.setAttribute("number", this.badge.textContent);
      }
    }

    // If this is not a read-only chip, attach event listeners
    if (this._close) {
      this._close.addEventListener("click", this._clickHandler);
      this._close.addEventListener("keyup", this._keyupHandler);
    }

    // If this is not a read-only chip, attach event listeners
    if (this._add) {
      this._add.addEventListener("click", this._clickHandler);
      this._add.addEventListener("keyup", this._keyupHandler);
    }
  }

  disconnectedCallback() {
    if (this.badge) {
      this.badge.removeEventListener("slotchange", this._init);
    }

    if (this._close) {
      this._close.removeEventListener("click", this._clickHandler);
      this._close.removeEventListener("keyup", this._keyupHandler);
    }

    if (this._add) {
      this._add.removeEventListener("click", this._clickHandler);
      this._add.removeEventListener("keyup", this._keyupHandler);
    }
  }

  _clickHandler(event) {
    if (!this.overflow) {
      this.emitEvent(PfeChip.events.close);
    } else {
      this.emitEvent(PfeChip.events.load);
    }
  }

  _keyupHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Enter":
      case 13:
        if (!this.overflow) {
          this.emitEvent(PfeChip.events.close);
        } else {
          this.emitEvent(PfeChip.events.load);
        }
    }
  }
}

PFElement.create(PfeChip);

export default PfeChip;
