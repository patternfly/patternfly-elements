import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCollapsePanel extends PFElement {
  static get tag() {
    return "pfe-collapse-panel";
  }

  /**
   * A local alias to the tag.
   */
  get tag() {
    return this._pfeClass.tag || PfeCollapsePanel.tag;
  }

  static get events() {
    return {
      animationStart: `${this.tag}:animation-start`,
      animationEnd: `${this.tag}:animation-end`,
    };
  }

  get html() {
    return `<slot></slot>`;
  }

  get styleUrl() {
    return "pfe-collapse-panel.scss";
  }

  /**
   * This indicates if the panel supports animating the open/close change
   * @requires {String} this.animation
   */
  get animates() {
    return this.animation === "false" ? false : true;
  }

  static get properties() {
    return {
      _id: {
        type: String,
        default: (el) => `${el.randomId.replace("pfe", el.tag)}`,
      },
      // @TODO Deprecated pfe-id in 1.0
      oldPfeId: {
        type: String,
        alias: "_id",
        attr: "pfe-id",
      },
      role: {
        type: String,
        default: "region",
      },
      expanded: {
        title: "Expanded",
        type: Boolean,
        default: false,
        observer: "_expandHandler",
      },
      // @TODO: Deprecated
      oldExpanded: {
        alias: "expanded",
        attr: "pfe-expanded",
      },
      ariaLabelledby: {
        type: String,
      },
    };
  }

  constructor(pfeClass = PfeCollapsePanel) {
    super(pfeClass);

    // Assign a pointer to the class; this facilitates extending this component
    this._pfeClass = pfeClass;
  }

  connectedCallback() {
    super.connectedCallback();

    this.expanded = false;
    this.setAttribute("tabindex", "-1");
  }

  expand() {
    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
  }

  _expandHandler(oldVal, newVal) {
    if (oldVal === newVal || !this.animates) return;

    const height = this.getBoundingClientRect().height;
    if (newVal) {
      this._fireAnimationEvent("opening");
      this._animate(0, height);
    } else {
      this._fireAnimationEvent("closing");
      this._animate(height, 0);
    }
  }

  _animate(start, end) {
    // Define our starting point
    this.style.height = `${start}px`;
    this.classList.add("animating");

    // During repaint, update the max-height
    requestAnimationFrame(() => {
      this.style.height = `${end}px`;
      this.addEventListener("transitionend", this._transitionEndHandler);
    });
  }

  _transitionEndHandler() {
    this.removeEventListener("transitionend", this._transitionEndHandler);

    console.log("end handler");
    this.style.maxHeight = "";
    this.classList.remove("animating");

    // This event is listened for on the pfe-collapse wrapper
    this.emitEvent(PfeCollapsePanel.events.animationEnd, {
      detail: {
        expanded: this.expanded,
        panel: this,
      },
    });
  }

  _fireAnimationEvent(state) {
    this.emitEvent(PfeCollapsePanel.events.animationStart, {
      detail: {
        state: state,
        panel: this,
      },
    });
  }
}

export default PfeCollapsePanel;
