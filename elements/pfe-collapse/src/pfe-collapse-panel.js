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
    return `
  <div id="container" class="pf-c-accordion__expanded-content">
    <slot></slot>
  </div>`;
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

  get panelHeight() {
    this._container = this.shadowRoot.querySelector("#container");
    if (this._container) return this._container.getBoundingClientRect().height;
    else return this.getBoundingClientRect().height;
  }

  connectedCallback() {
    super.connectedCallback();

    this.expanded = false;

    this.setAttribute("tabindex", "-1");
    this.setAttribute("hidden", "");
  }

  expand() {
    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
  }

  _expandHandler(oldVal, newVal) {
    if (oldVal === newVal || !this.animates) return;
    if (newVal) {
      this._fireAnimationEvent("opening");
      this._animate(0, this.panelHeight);
    } else {
      this._fireAnimationEvent("closing");
      this._animate(this.panelHeight, 0);
    }
  }

  _animate(start, end) {
    // Define our starting point
    this.style.height = `${start}px`;
    this.classList.add("animating");
    if (this.expanded) this.removeAttribute("hidden");

    // During repaint, update the max-height
    requestAnimationFrame(() => {
      this.addEventListener("transitionend", this._transitionEndHandler);
      this.style.height = `${end}px`;
    });
  }

  _transitionEndHandler() {
    this.removeEventListener("transitionend", this._transitionEndHandler);

    this.style.height = "";
    this.classList.remove("animating");
    if (!this.expanded) this.setAttribute("hidden", "");

    // This event is listened for on the pfe-collapse wrapper
    this.emitEvent(this._pfeClass.events.animationEnd, {
      detail: {
        expanded: this.expanded,
        panel: this,
      },
    });
  }

  _fireAnimationEvent(state) {
    this.emitEvent(this._pfeClass.events.animationStart, {
      detail: {
        state: state,
        panel: this,
      },
    });
  }
}

export default PfeCollapsePanel;
