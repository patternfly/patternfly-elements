import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCard extends PFElement {
  static get tag() {
    return "pfe-card";
  }

  static get meta() {
    return {
      title: "Card",
      description:
        "This element creates a header, body, and footer region in which to place content or other components.",
    };
  }

  get templateUrl() {
    return "pfe-card.html";
  }

  get styleUrl() {
    return "pfe-card.scss";
  }

  // @TODO: How do we handle attributes for slotted content?
  static get properties() {
    return {
      color: {
        title: "Background color",
        type: String,
        values: ["lightest", "base", "darker", "darkest", "complement", "accent", "transparent"],
        default: "base",
        observer: "_colorChanged",
      },
      // @TODO: Deprecate property in 1.0
      oldColor: {
        type: String,
        alias: "color",
        attr: "pfe-color",
      },
      imgSrc: {
        title: "Background image",
        type: String,
        observer: "_imageSrcChanged",
      },
      // @TODO: Deprecate property in 1.0
      pfeImgSrc: {
        type: String,
        alias: "imgSrc",
      },
      size: {
        title: "Padding size",
        type: String,
        values: ["small", "none"],
      },
      // @TODO: Deprecate property in 1.0
      pfeSize: {
        type: String,
        alias: "size",
      },
      border: {
        title: "Border",
        type: Boolean,
      },
      // @TODO: Deprecate property in 1.0
      oldBorder: {
        alias: "border",
        attr: "pfe-border",
      },
    };
  }

  static get slots() {
    return {
      header: {
        title: "Header",
        type: "array",
        namedSlot: true,
        maxItems: 3,
        items: {
          $ref: "raw",
        },
      },
      body: {
        title: "Body",
        type: "array",
        namedSlot: false,
        items: {
          $ref: "raw",
        },
      },
      footer: {
        title: "Footer",
        type: "array",
        namedSlot: true,
        maxItems: 3,
        items: {
          oneOf: [
            {
              $ref: "pfe-cta",
            },
            {
              $ref: "raw",
            },
          ],
        },
      },
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeCard, { type: PfeCard.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();

    // Tag the last slotted item in each region for styling
    const header = this.shadowRoot.querySelector("slot[name$='header']"),
          body = this.shadowRoot.querySelector("slot:not([name])"),
          footer = this.shadowRoot.querySelector("slot[name$='footer']");

    [header, body, footer].forEach((region) => {
      if (region) {
        const slotted = [...region.assignedNodes()]
          .filter(item => item.nodeName !== "#text");

        if (slotted.length > 0) {
          const item = slotted[slotted.length - 1];
          if (item) item.setAttribute("last", "");
        }
      }
    });
  }

  // If the color changes, update the context
  _colorChanged() {
    // Update the context
    this.resetContext();
  }

  // Update the background image
  _imageSrcChanged(oldValue, newValue) {
    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }
}

PFElement.create(PfeCard);

export { PfeCard as default };
