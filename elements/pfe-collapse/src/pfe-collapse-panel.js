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
      animationEnd: `${this.tag}:animation-end`
    };
  }

  get templateUrl() {
    return "pfe-collapse-panel.html";
  }

  get styleUrl() {
    return "pfe-collapse-panel.scss";
  }

  get animates() {
    return this.animation === "false" ? false : true;
  }

  _expandHandler(oldVal, newVal) {
    if (oldVal === newVal || !this.animates) return;

    const toExpand = Boolean(newVal);
    const wasExpanded = Boolean(oldVal);

    const height = this.getBoundingClientRect().height;
    if (toExpand) {
      this._fireAnimationEvent("opening");
      this._animate(0, height);
    } else if (wasExpanded && !toExpand) {
      this._fireAnimationEvent("closing");
      this._animate(height, 0);
    }
  }

  static get properties() {
    return {
      animation: {
        title: "Animation",
        type: String,
        values: ["false"]
      },
      // @TODO: Deprecated
      oldAnimation: {
        alias: "animation",
        attr: "pfe-animation"
      },
      role: {
        type: String,
        default: "region"
      },
      expanded: {
        title: "Expanded",
        type: Boolean,
        default: false,
        observer: "_expandHandler"
      },
      // @TODO: Deprecated
      oldExpanded: {
        alias: "expanded",
        attr: "pfe-expanded"
      },
      ariaLabelledby: {
        type: String
      }
    };
  }

  constructor(pfeClass = PfeCollapsePanel) {
    super(pfeClass);

    this._pfeClass = pfeClass;
  }

  connectedCallback() {
    super.connectedCallback();

    this.expanded = false;
    this.setAttribute("tabindex", "-1");

    this.id = this.id || `${this.tag}-${generateId()}`;
  }

  _animate(start, end) {
    this.classList.add("animating");
    this.style.height = `${start}px`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.style.height = `${end}px`;
        this.addEventListener("transitionend", this._transitionEndHandler);
      });
    });
  }

  _transitionEndHandler() {
    this.style.height = "";
    this.classList.remove("animating");
    this.removeEventListener("transitionend", this._transitionEndHandler);

    this.emitEvent(PfeCollapsePanel.events.animationEnd, {
      detail: {
        expanded: this.expanded,
        panel: this
      }
    });
  }

  _fireAnimationEvent(state) {
    this.emitEvent(PfeCollapsePanel.events.animationStart, {
      detail: {
        state: state,
        panel: this
      }
    });
  }
}

export default PfeCollapsePanel;
