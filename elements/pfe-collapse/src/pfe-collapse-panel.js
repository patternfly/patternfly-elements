import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCollapsePanel extends PFElement {
  static get tag() {
    if (this._pfeClass && this._pfeClass.tag) return this._pfeClass.tag;
    else return "pfe-collapse-panel";
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

  get expanded() {
    return this.hasAttribute("expanded") || this.hasAttribute("pfe-expanded"); // @TODO: Deprecated
  }

  set expanded(val) {
    const value = Boolean(val);

    if (value) {
      this.setAttribute("pfe-expanded", ""); // @TODO: Deprecated
      this.setAttribute("expanded", "");

      if (this.animates) {
        const height = this.getBoundingClientRect().height;
        this._fireAnimationEvent("opening");
        this._animate(0, height);
      }
    } else {
      if (this.hasAttribute("expanded") || this.hasAttribute("pfe-expanded")) {
        // @TODO: Deprecated
        const height = this.getBoundingClientRect().height;
        this.removeAttribute("expanded");
        this.removeAttribute("pfe-expanded"); // @TODO: Deprecated

        if (this.animates) {
          this._fireAnimationEvent("closing");
          this._animate(height, 0);
        }
      }
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
        default: false
      },
      ariaLabelledby: {
        type: String
      }
    };
  }

  constructor(pfeClass) {
    super(pfeClass || PfeCollapsePanel);

    this._pfeClass = pfeClass;
  }

  connectedCallback() {
    super.connectedCallback();

    this.expanded = false;
    this.setAttribute("tabindex", "-1");

    this.id = this.id || `${PfeCollapsePanel.tag}-${generateId()}`;
  }

  _animate(start, end) {
    this.classList.add("animating");
    this.style.height = `${start}px`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.style.height = `${end}px`;
        this.classList.add("animating");
        this.addEventListener("transitionend", this._transitionEndHandler);
      });
    });
  }

  _transitionEndHandler(event) {
    event.target.style.height = "";
    event.target.classList.remove("animating");
    event.target.removeEventListener("transitionend", this._transitionEndHandler);

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
