let logger = () => null;

function reveal() {
  logger(`[reveal] elements ready, revealing the body`);
  window.document.body.removeAttribute("unresolved");
}

function autoReveal(logFunction) {
  logger = logFunction;
  // If Web Components are already ready, run the handler right away.  If they
  // are not yet ready, wait.
  //
  // see https://github.com/github/webcomponentsjs#webcomponents-loaderjs for
  // info about web component readiness events
  const polyfillPresent = window.WebComponents;
  const polyfillReady = polyfillPresent && window.WebComponents.ready;

  if (!polyfillPresent || polyfillReady) {
    handleWebComponentsReady();
  } else {
    window.addEventListener("WebComponentsReady", handleWebComponentsReady);
  }
}

function handleWebComponentsReady() {
  logger("[reveal] web components ready");
  reveal();
}

/*!
 * PatternFly Elements: PFElement 1.0.0-prerelease.55
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

  static get version() {
    return "{{version}}";
  }

  static get observedAttributes() {
    return ["pfe-theme"];
  }

  get randomId() {
    return (
      "pfe-" +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  get version() {
    return this._pfeClass.version;
  }

  get pfeType() {
    return this.getAttribute(`${prefix}type`);
  }

  set pfeType(value) {
    this.setAttribute(`${prefix}type`, value);
  }

  cssVariable(name, value, element = this) {
    name = name.substr(0, 2) !== "--" ? "--" + name : name;
    if (value) {
      element.style.setProperty(name, value);
    }
    return window
      .getComputedStyle(element)
      .getPropertyValue(name)
      .trim();
  }

  // Returns a single element assigned to that slot; if multiple, it returns the first
  has_slot(name) {
    return this.querySelector(`[slot='${name}']`);
  }

  // Returns an array with all elements assigned to that slot
  has_slots(name) {
    return [...this.querySelectorAll(`[slot='${name}']`)];
  }

  // Update the theme context for self and children
  context_update() {
    // TODO: update this to use :defined?
    const children = this.querySelectorAll("[pfelement]");
    let theme = this.cssVariable("theme");

    // Manually adding `pfe-theme` overrides the css variable
    if (this.hasAttribute("pfe-theme")) {
      theme = this.getAttribute("pfe-theme");
      // Update the css variable to match the data attribute
      this.cssVariable("theme", theme);
    }

    // Update theme for self
    this.context_set(theme);

    // For each nested, already upgraded component
    // set the context based on the child's value of --theme
    // Note: this prevents contexts from parents overriding
    // the child's context should it exist
    [...children].map(child => {
      if (child.connected) {
        child.context_set(theme);
      }
    });
  }

  // Get the theme variable if it exists, set it as an attribute
  context_set(fallback) {
    let theme = this.cssVariable("theme");
    if (!theme) {
      theme = this.getAttribute("pfe-theme");
    }
    if (!theme && fallback) {
      theme = fallback;
    }
    if (theme && this.hasAttribute("pfelement")) {
      this.setAttribute("on", theme);
    }
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

    this.log(`Constructing...`);

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
      this.log(`Render...`);
      this.render();
      this.log(`Rendered.`);
    }

    this.log(`Constructed.`);
  }

  connectedCallback() {
    this.connected = true;
    this.log(`Connecting...`);

    if (window.ShadyCSS) {
      this.log(`Styling...`);
      window.ShadyCSS.styleElement(this);
      this.log(`Styled.`);
    }

    // Throw a warning if the on attribute was manually added before upgrade
    if (!this.hasAttribute("pfelement") && this.hasAttribute("on")) {
      console.warn(
        `${this.tag}${
          this.id ? `[#${this.id}]` : ``
        }: The "on" attribute is protected and should not be manually added to a component. The base class will manage this value for you on upgrade.`
      );
    }

    // @TODO maybe we should use just the attribute instead of the class?
    // https://github.com/angular/angular/issues/15399#issuecomment-318785677
    this.classList.add("PFElement");
    this.setAttribute("pfelement", "");

    if (typeof this.props === "object") {
      this._mapSchemaToProperties(this.tag, this.props);
      this.log(`Properties attached.`);
    }

    if (typeof this.slots === "object") {
      this._mapSchemaToSlots(this.tag, this.slots);
      this.log(`Slots attached.`);
    }

    if (this._queue.length) {
      this._processQueue();
    }

    // Initialize the on attribute if a theme variable is set
    // do not update the on attribute if a user has manually added it
    // then trigger an update in nested components
    this.context_update();

    this.log(`Connected.`);
  }

  disconnectedCallback() {
    this.log(`Disconnecting...`);

    this.connected = false;

    this.log(`Disconnected.`);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (!this._pfeClass.cascadingAttributes) {
      return;
    }

    const cascadeTo = this._pfeClass.cascadingAttributes[attr];
    if (cascadeTo) {
      this._copyAttribute(attr, cascadeTo);
    }

    if (attr === "pfe-theme") {
      this.context_update();
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
    this.log("Mapping properties...");
    // Loop over the properties provided by the schema
    Object.keys(properties).forEach(attr => {
      let data = properties[attr];

      // Only attach the information if the data provided is a schema object
      if (typeof data === "object") {
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
            !data.options ||
            (data.options && !data.options.dependencies.length);
          // If the dependency exists or there are no dependencies, set the default
          if (dependency_exists || no_dependencies) {
            this.setAttribute(attrName, data.default);
            this[attr].value = data.default;
          }
        }
      }
    });

    this.log("Properties mapped.");
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
    this.log("Validate slots...");
    // Loop over the properties provided by the schema
    Object.keys(slots).forEach(slot => {
      let slotObj = slots[slot];

      // Only attach the information if the data provided is a schema object
      if (typeof slotObj === "object") {
        let slotExists = false;
        let result = [];
        // If it's a named slot, look for that slot definition
        if (slotObj.namedSlot) {
          // Check prefixed slots
          result = this.has_slots(`${tag}--${slot}`);
          if (result.length > 0) {
            slotObj.nodes = result;
            slotExists = true;
          }

          // Check for unprefixed slots
          result = this.has_slots(`${slot}`);
          if (result.length > 0) {
            slotObj.nodes = result;
            slotExists = true;
          }
          // If it's the default slot, look for direct children not assigned to a slot
        } else {
          result = [...this.children].filter(
            child => !child.hasAttribute("slot")
          );

          if (result.length > 0) {
            slotObj.nodes = result;
            slotExists = true;
          }
        }

        // If the slot exists, attach an attribute to the parent to indicate that
        if (slotExists) {
          this.setAttribute(`has_${slot}`, "");
        } else {
          this.removeAttribute(`has_${slot}`);
        }
      }
    });
    this.log("Slots validated.");
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

  // @TODO This is a duplicate function to cssVariable above, combine them
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

  emitEvent(
    name,
    { bubbles = true, cancelable = false, composed = false, detail = {} } = {}
  ) {
    this.log(`Custom event: ${name}`);
    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles,
        cancelable,
        composed,
        detail
      })
    );
  }
}

autoReveal(PFElement.log);

export default PFElement;
//# sourceMappingURL=pfelement.js.map
