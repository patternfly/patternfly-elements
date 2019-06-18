import { autoReveal } from "./reveal.js";
const prefix = "pfe-";

class PFElement extends HTMLElement {
  static create(pfe) {
    window.customElements.define(pfe.tag, pfe);
  }

  static debugLog(preference = null) {
    if (preference !== null) {
      PFElement._debugLog = !!preference;
    }
    return PFElement._debugLog;
  }

  static log(...msgs) {
    if (PFElement.debugLog()) {
      console.log(...msgs);
    }
  }

  static get PfeTypes() {
    return {
      Container: "container",
      Content: "content",
      Combo: "combo"
    };
  }

  get pfeType() {
    return this.getAttribute(`${prefix}type`);
  }

  set pfeType(value) {
    this.setAttribute(`${prefix}type`, value);
  }

  // Returns a single element assigned to that slot; if multiple, it returns the first
  has_slot(name) {
    return this.querySelector(`[slot='${name}']`);
  }

  // Returns an array with all elements assigned to that slot
  has_slots(name) {
    return [...this.querySelectorAll(`[slot='${name}']`)];
  }

  constructor(pfeClass, { type = null, delayRender = false } = {}) {
    super();

    this.connected = false;
    this._pfeClass = pfeClass;
    this.tag = pfeClass.tag;
    this.props = pfeClass.properties;
    this.slots = pfeClass.slots;
    this._queue = [];
    this.template = document.createElement("template");

    this.attachShadow({ mode: "open" });

    if (type) {
      this._queueAction({
        type: "setProperty",
        data: {
          name: "pfeType",
          value: type
        }
      });
    }

    if (!delayRender) {
      this.render();
    }
  }

  connectedCallback() {
    this.connected = true;

    if (window.ShadyCSS) {
      window.ShadyCSS.styleElement(this);
    }

    // maybe we should use just the attribute instead of the class?
    // https://github.com/angular/angular/issues/15399#issuecomment-318785677
    this.classList.add("PFElement");
    this.setAttribute("pfelement", "");

    if (typeof this.props === "object") {
      this._mapSchemaToProperties(this.tag, this.props);
    }

    if (typeof this.slots === "object") {
      this._mapSchemaToSlots(this.tag, this.slots);
    }

    if (this._queue.length) {
      this._processQueue();
    }
  }

  disconnectedCallback() {
    this.connected = false;
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (!this._pfeClass.cascadingAttributes) {
      return;
    }

    const cascadeTo = this._pfeClass.cascadingAttributes[attr];
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

  // Map the imported properties json to real props on the element
  // @notice static getter of properties is built via tooling
  // to edit modify src/element.json
  _mapSchemaToProperties(tag, properties) {
    // Loop over the properties provided by the schema
    Object.keys(properties).forEach(attr => {
      let data = properties[attr];
      // Prefix default is true
      let hasPrefix = true;
      let attrName = attr;
      // Set the attribute's property equal to the schema input
      this[attr] = data;
      // Initialize the value to null
      this[attr].value = null;

      if (typeof this[attr].prefixed !== "undefined") {
        hasPrefix = this[attr].prefixed;
      }

      if (hasPrefix) {
        attrName = `${prefix}${attr}`;
      }

      // If the attribute exists on the host
      if (this.hasAttribute(attrName)) {
        // Set property value based on the existing attribute
        this[attr].value = this.getAttribute(attrName);
      }
      // Otherwise, look for a default and use that instead
      else if (data.default) {
        const dependency_exists = this._hasDependency(tag, data.options);
        const no_dependencies =
          !data.options || (data.options && !data.options.dependencies.length);
        // If the dependency exists or there are no dependencies, set the default
        if (dependency_exists || no_dependencies) {
          this.setAttribute(attrName, data.default);
          this[attr].value = data.default;
        }
      }
    });
  }

  // Test whether expected dependencies exist
  _hasDependency(tag, opts) {
    // Get any possible dependencies for this attribute to exist
    let dependencies = opts ? opts.dependencies : [];
    // Initialize the dependency return value
    let hasDependency = false;
    // Check that dependent item exists
    // Loop through the dependencies defined
    for (let i = 0; i < dependencies.length; i += 1) {
      const slot_exists =
        dependencies[i].type === "slot" &&
        this.has_slots(`${tag}--${dependencies[i].id}`).length > 0;
      const attribute_exists =
        dependencies[i].type === "attribute" &&
        this.getAttribute(`${prefix}${dependencies[i].id}`);
      // If the type is slot, check that it exists OR
      // if the type is an attribute, check if the attribute is defined
      if (slot_exists || attribute_exists) {
        // If the slot does exist, add the attribute with the default value
        hasDependency = true;
        // Exit the loop
        break;
      }
    }
    // Return a boolean if the dependency exists
    return hasDependency;
  }

  // Map the imported slots json
  // @notice static getter of properties is built via tooling
  // to edit modify src/element.json
  _mapSchemaToSlots(tag, slots) {
    // Loop over the properties provided by the schema
    Object.keys(slots).forEach(slot => {
      let slotObj = slots[slot];
      let slotExists = false;
      // If it's a named slot, look for that slot definition
      if (slotObj.namedSlot) {
        if (this.has_slots(`${tag}--${slot}`).length > 0) {
          slotExists = true;
        }
        // If it's the default slot, look for elements not assigned to a slot
      } else {
        if ([...this.querySelectorAll(":not([slot])")].length > 0) {
          slotExists = true;
        }
      }

      // If the slot exists, attach an attribute to the parent to indicate that
      if (slotExists) {
        this.setAttribute(`has_${slot}`, "");
      } else {
        this.removeAttribute(`has_${slot}`);
      }
    });
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

  static var(name, element = document.body) {
    return window
      .getComputedStyle(element)
      .getPropertyValue(name)
      .trim();
  }

  var(name) {
    return PFElement.var(name, this);
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
    PFElement.log(`[${this.tag}]`, ...msgs);
  }
}

autoReveal(PFElement.log);

export default PFElement;
//# sourceMappingURL=PFElement.js.map
