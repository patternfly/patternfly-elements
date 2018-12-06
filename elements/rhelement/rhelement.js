import { autoReveal } from "./reveal.js";

class RHElement extends HTMLElement {
  static create(rhe) {
    window.customElements.define(rhe.tag, rhe);
  }

  static debugLog(preference = null) {
    if (preference !== null) {
      RHElement._debugLog = !!preference;
    }
    return RHElement._debugLog;
  }

  static log(...msgs) {
    if (RHElement.debugLog()) {
      console.log(...msgs);
    }
  }

  static get RhTypes() {
    return {
      Container: "container",
      Content: "content",
      Pattern: "pattern"
    };
  }

  get rhType() {
    return this.getAttribute("rh-type");
  }

  set rhType(value) {
    this.setAttribute("rh-type", value);
  }

  constructor(rhClass, { type = null, delayRender = false } = {}) {
    super();

    this._rhClass = rhClass;
    this.tag = rhClass.tag;
    this._queue = [];
    this.template = document.createElement("template");

    this.attachShadow({ mode: "open" });

    if (type) {
      this._queueAction({
        type: "setProperty",
        data: {
          name: "rhType",
          value: type
        }
      });
    }

    if (!delayRender) {
      this.render();
    }
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      window.ShadyCSS.styleElement(this);
    }

    this.classList.add("rhelement");

    if (this._queue.length) {
      this._processQueue();
    }
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (!this._rhClass.cascadingAttributes) {
      return;
    }

    const cascadeTo = this._rhClass.cascadingAttributes[attr];
    if (cascadeTo) {
      this._copyAttribute(attr, cascadeTo);
    }
  }

  _copyAttribute(name, to) {
    const recipients = [
      ...this.querySelectorAll(to),
      ...this.shadowRoot.querySelectorAll(to)
    ];
    const value = this.getAttribute(name);
    const fname = value == null ? "removeAttribute" : "setAttribute";
    for (const node of recipients) {
      node[fname](name, value);
    }
  }

  _queueAction(action) {
    this._queue.push(action);
  }

  _processQueue() {
    this._queue.forEach(action => {
      this[`_${action.type}`](action.data);
    });

    this._queue = [];
  }

  _setProperty({ name, value }) {
    this[name] = value;
  }

  render() {
    this.shadowRoot.innerHTML = "";
    this.template.innerHTML = this.html;

    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(this.template, this.tag);
    }

    this.shadowRoot.appendChild(this.template.content.cloneNode(true));
  }

  log(...msgs) {
    RHElement.log(`[${this.tag}]`, ...msgs);
  }
}

autoReveal(RHElement.log);

export default RHElement;
//# sourceMappingURL=rhelement.js.map
