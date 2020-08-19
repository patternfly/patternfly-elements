import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeCollapse 1.0.0-prerelease.55
 * @license
 * Copyright 2020 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

class PfeCollapseToggle extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>:host{display:block;cursor:default}
/*# sourceMappingURL=pfe-collapse-toggle.min.css.map */
</style><slot></slot>`;
  }

  static get properties() {
    return {};
  }

  static get slots() {
    return {"default":{"title":"Default","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"pfe-collapsibe-toggle"},{"$ref":"pfe-collapse-panel"}]}}};
  }
  static get tag() {
    return "pfe-collapse-toggle";
  }

  get templateUrl() {
    return "pfe-collapse-toggle.html";
  }

  get styleUrl() {
    return "pfe-collapse-toggle.scss";
  }

  get pfeId() {
    return this.getAttribute("pfe-id");
  }

  set pfeId(id) {
    if (!id) {
      return;
    }

    this.setAttribute("pfe-id", id);
  }

  get expanded() {
    return this.getAttribute("aria-expanded") === "true";
  }

  set expanded(val) {
    const value = Boolean(val);
    this.setAttribute("aria-expanded", value);
  }

  static get observedAttributes() {
    return ["aria-controls"];
  }

  constructor(pfeClass, { setTabIndex = true, addKeydownHandler = true } = {}) {
    super(pfeClass || PfeCollapseToggle);

    this.controlledPanel = false;
    this._setTabIndex = setTabIndex;
    this._addKeydownHandler = addKeydownHandler;

    this.addEventListener("click", this._clickHandler);

    if (addKeydownHandler) {
      this.addEventListener("keydown", this._keydownHandler);
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.expanded = false;

    // if (this.id && this.id !== "") {
    if (this.id) {
      this.pfeId = this.id;
    }

    const generatedId = `${PfeCollapseToggle.tag}-${generateId()}`;

    if (!this.id) {
      this.id = generatedId;
    }

    if (!this.pfeId) {
      this.pfeId = generatedId;
    }

    this.setAttribute("role", "button");

    if (this._setTabIndex) {
      this.setAttribute("tabindex", 0);
    }

    if (!this.controlledPanel) {
      this._connectPanel(this.getAttribute("aria-controls"));
    }
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler);

    if (this._addKeydownHandler) {
      this.removeEventListener("keydown", this._keydownHandler);
    }
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    if (!newVal) {
      return;
    }

    this._connectPanel(newVal);
  }

  toggle() {
    if (this.hasAttribute("disabled")) {
      return;
    }

    this.expanded = !this.expanded;

    // one last try to hook up a panel
    if (!this.controlledPanel) {
      this._connectPanel(this.getAttribute("aria-controls"));
    }

    if (this.controlledPanel) {
      this.controlledPanel.expanded = this.expanded;

      this.emitEvent(PfeCollapse.events.change, {
        detail: {
          expanded: this.expanded,
          toggle: this,
          panel: this.controlledPanel
        }
      });
    } else {
      console.warn(
        `${this.tag}: This toggle doesn't have a panel associated with it`
      );
    }
  }

  _clickHandler() {
    this.toggle();
  }

  _keydownHandler(event) {
    const key = event.key;

    switch (key) {
      case " ":
      case "Spacebar":
      case "Enter":
        this.toggle();
        break;
    }
  }

  _connectPanel(id) {
    // this can be an issue if the pfe-collapse is located within
    // a shadow root
    if (this.getRootNode) {
      this.controlledPanel = this.getRootNode().querySelector(`#${id}`);
    } else {
      this.controlledPanel = document.querySelector(`#${id}`);
    }
  }
}

class PfeCollapsePanel extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>:host{display:none;overflow:hidden;will-change:height}:host([pfe-expanded]){display:block;position:relative}:host(.animating){display:block;-webkit-transition:height .3s ease-in-out;transition:height .3s ease-in-out}
/*# sourceMappingURL=pfe-collapse-panel.min.css.map */
</style><slot></slot>`;
  }

  static get properties() {
    return {};
  }

  static get slots() {
    return {"default":{"title":"Default","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"pfe-collapsibe-toggle"},{"$ref":"pfe-collapse-panel"}]}}};
  }
  static get tag() {
    return "pfe-collapse-panel";
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

  get pfeId() {
    return this.getAttribute("pfe-id");
  }

  set pfeId(id) {
    if (!id) {
      return;
    }

    this.setAttribute("pfe-id", id);
  }

  get animates() {
    return this.getAttribute("pfe-animation") === "false" ? false : true;
  }

  get expanded() {
    return this.hasAttribute("pfe-expanded");
  }

  set expanded(val) {
    const value = Boolean(val);

    if (value) {
      this.setAttribute("pfe-expanded", "");

      if (this.animates) {
        const height = this.getBoundingClientRect().height;
        this._fireAnimationEvent("opening");
        this._animate(0, height);
      }
    } else {
      if (this.hasAttribute("pfe-expanded")) {
        const height = this.getBoundingClientRect().height;
        this.removeAttribute("pfe-expanded");

        if (this.animates) {
          this._fireAnimationEvent("closing");
          this._animate(height, 0);
        }
      }
    }
  }

  constructor(pfeClass) {
    super(pfeClass || PfeCollapsePanel);
  }

  connectedCallback() {
    super.connectedCallback();

    this.expanded = false;

    // if (this.id && this.id !== "") {
    if (this.id) {
      this.pfeId = this.id;
    }

    const generatedId = `${PfeCollapsePanel.tag}-${generateId()}`;

    if (!this.id) {
      this.id = generatedId;
    }

    if (!this.pfeId) {
      this.pfeId = generatedId;
    }
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
    event.target.removeEventListener(
      "transitionend",
      this._transitionEndHandler
    );

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

class PfeCollapse extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>:host{display:block}:host([hidden]){display:none}:host(.animating),:host([expanded]){display:block}
/*# sourceMappingURL=pfe-collapse.min.css.map */
</style><slot></slot>`;
  }

  static get properties() {
    return {};
  }

  static get slots() {
    return {"default":{"title":"Default","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"pfe-collapsibe-toggle"},{"$ref":"pfe-collapse-panel"}]}}};
  }
  static get tag() {
    return "pfe-collapse";
  }

  get templateUrl() {
    return "pfe-collapse.html";
  }

  get styleUrl() {
    return "pfe-collapse.scss";
  }

  get schemaUrl() {
    return "pfe-collapse.json";
  }

  get animates() {
    return this.getAttribute("pfe-animation") === "false" ? false : true;
  }

  static get observedAttributes() {
    return ["pfe-animation"];
  }

  static get events() {
    return {
      change: `${this.tag}:change`
    };
  }

  constructor(pfeClass) {
    super(pfeClass || PfeCollapse);

    this._toggle = null;
    this._panel = null;
    this._linkControls = this._linkControls.bind(this);
    this._changeHandler = this._changeHandler.bind(this);
    this._observer = new MutationObserver(this._linkControls);

    this.addEventListener(PfeCollapse.events.change, this._changeHandler);
    this.addEventListener(
      PfeCollapse.events.animationStart,
      this._animationStartHandler
    );
    this.addEventListener(
      PfeCollapse.events.animationEnd,
      this._animationEndHandler
    );
  }

  connectedCallback() {
    super.connectedCallback();

    Promise.all([
      customElements.whenDefined(PfeCollapsePanel.tag),
      customElements.whenDefined(PfeCollapseToggle.tag)
    ]).then(() => {
      if (this.children.length) {
        this._linkControls();
      }

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    this.removeEventListener(PfeCollapse.events.change, this._changeHandler);
    this.removeEventListener(
      PfeCollapse.events.animationStart,
      this._animationStartHandler
    );
    this.removeEventListener(
      PfeCollapse.events.animationEnd,
      this._animationEndHandler
    );
    this._observer.disconnect();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    if (!newVal) {
      return;
    }

    if (newVal !== "false" && newVal !== "true") {
      return;
    }

    if (this._panel) {
      this._panel.setAttribute("pfe-animation", newVal);
    }
  }

  toggle() {
    this._toggle.toggle();
  }

  _linkControls() {
    this._toggle = this.querySelector(PfeCollapseToggle.tag);
    this._panel = this.querySelector(PfeCollapsePanel.tag);

    this._toggle.setAttribute("aria-controls", this._panel.pfeId);
  }

  _animationStartHandler() {
    this.classList.add("animating");
  }

  _animationEndHandler() {
    this.classList.remove("animating");
  }

  _changeHandler(event) {}
}

PFElement.create(PfeCollapse);
PFElement.create(PfeCollapseToggle);
PFElement.create(PfeCollapsePanel);

export { PfeCollapse, PfeCollapseToggle, PfeCollapsePanel };
//# sourceMappingURL=pfe-collapse.js.map
