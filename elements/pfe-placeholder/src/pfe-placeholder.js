import PFElement from "../../pfelement/dist/pfelement.js";

class PfePlaceholder extends PFElement {
  static get tag() {
    return "pfe-placeholder";
  }

  static get meta() {
    return {
      title: "Placeholder",
      description: "Generate a placeholder for use in coding demos and mock-ups."
    };
  }

  get templateUrl() {
    return "pfe-placeholder.html";
  }

  get styleUrl() {
    return "pfe-placeholder.scss";
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      _width: {
        title: "Width",
        type: String,
        cascade: ["svg", "svg > rect"],
        default: "300"
      },
      _height: {
        title: "Height",
        type: String,
        cascade: ["svg", "svg > rect"],
        default: "150"
      }
    };
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfePlaceholder, { type: PfePlaceholder.PfeType, delayRender: true });

    this.text = "";
  }

  connectedCallback() {
    super.connectedCallback();

    let text = this.textContent.trim();
    this.text = text || `${this._width || 300} x ${this._height || 150}`;

    this.render();

    this.svgText = this.shadowRoot.querySelector("text");

    if (this.svgText) {
      // Set a minimum boundary for text away from sides
      const padding = Math.max(this.offsetWidth * 0.2, 5) * 2;
      const fontSize = Math.floor((this.offsetWidth - padding) / this.text.length);

      if (fontSize) {
        this.svgText.style.fontSize = `${fontSize}px`;

        if (fontSize >= 25 && fontSize < 50) this.setAttribute("lighter", "");
        else if (fontSize >= 50) this.setAttribute("lightest", "");
        else {
          this.removeAttribute("lighter");
          this.removeAttribute("lightest");
        }
      }
    }
  }

  disconnectedCallback() {}

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    switch (attr) {
      case "width":
        if (this.svgText) {
          this.svgText.style.fontSize = `${Number.parseInt(newVal) / this.text.length}px`;
        }
      case "height":
        if (oldVal !== newVal) {
          this.style[attr] = newVal;
        }
        break;
    }
  }
}

PFElement.create(PfePlaceholder);

export default PfePlaceholder;
