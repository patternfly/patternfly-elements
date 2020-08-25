import { autoReveal } from "./reveal.js";
import attr2prop from "./attr2prop.js";
import prop2attr from "./prop2attr.js";
import isValidReflection from "./isValidReflection.js";

const prefix = "pfe-";

class PFElement extends HTMLElement {
  static create(pfe) {
    window.customElements.define(pfe.tag, pfe);
  }

  /**
   * This prefix is prepended to the name of any attributes defined on the base
   * class.  In other words, attributes that can be used on any element will be
   * prefixed with this string.
   *
   * @example A "theme" prop, when reflected as an attribute, prefixed with "pfe-g-": <pfe-foo pfe-g-theme="bar">
   */
  static get globalAttrPrefix() {
    return "pfe-g-";
  }

  static get attrPrefix() {
    return "pfe-c-";
  }

  static get properties() {}

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
    const oa = Object.keys(this.properties)
      .filter(
        prop =>
          this.properties[prop].observer ||
          (this.properties[prop].reflect &&
            isValidReflection(this.properties[prop]))
      )
      .map(p => prop2attr(p, this.attrPrefix));
    console.log("observed attributes are", oa);
    return ["pfe-theme", ...oa];
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
    this.schemaProps = pfeClass.schemaProperties;
    this.slots = pfeClass.slots;
    this._queue = [];
    this.template = document.createElement("template");

    this._initializeProperties();

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

    this._initAttrReflection();

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
    console.log(`attributeChangedCallback, ${attr}: ${oldVal} => ${newVal}`);
    const propName = attr2prop(attr);
    const property = this._pfeClass.properties[propName];

    if (!property) {
      console.error(`${propName} doesn't exist on ${this._pfeClass}`);
      return;
    }

    if (oldVal !== newVal) {
      this[propName] = newVal;
    }

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

  _initializeProperties() {
    this._________TOP_SECRET__ = {};

    for (let propName in this._pfeClass.properties) {
      const definition = this._pfeClass.properties[propName];

      // verify that reflected properties conform to primitive data types
      if (!isValidReflection(definition)) {
        console.error(
          `${this.constructor.name}.properties.${propName} definition error: a property with \`reflect: true\` must have type String, Number, or Boolean.`
        );
        continue;
      }

      // verify that default values match the property's data type
      if (
        definition.hasOwnProperty("default") &&
        definition.default.constructor !== definition.type
      ) {
        console.error(
          `${this.constructor.name}.properties.${propName} definition error: the default value's type (${definition.default.constructor.name}) does not match the property's type (${definition.type.name}).`
        );
        continue;
      }

      this._________TOP_SECRET__[propName] = definition.default;
      // set up a getter and setter for each property
      Object.defineProperty(this, propName, {
        get: () => this._________TOP_SECRET__[propName],
        set: rawNewVal => {
          const oldVal = this._________TOP_SECRET__[propName];
          // attempt to cast the new value to the new value's type
          const newVal =
            definition.type === Boolean
              ? { true: true, false: false }[rawNewVal]
              : definition.type(rawNewVal);
          console.log(
            `${this.constructor.name}.properties.${propName} setter was ${oldVal}, received ${rawNewVal}, cast it to ${definition.type.name} which returned ${newVal}`
          );

          // bail early if the value didn't change
          if (oldVal === newVal) {
            console.log(
              `${this.constructor.name}.properties.${propName} assigned a value equal to its old value, skipping rest of the setter`
            );
            return;
          }

          // do a type check before anything else
          if (newVal.constructor !== definition.type) {
            console.error(
              `can't set ${definition.type.name} property ${this.constructor.name}.properties.${propName} to ${newVal}, a ${newVal.constructor.name}`
            );
            return;
          }

          if (definition.validate) {
            if (!definition.validate(newVal, oldVal, this)) {
              console.error(
                `validate function failed for ${this.constructor.name}.properties.${propName}`
              );
              return;
            }
          }

          if (definition.observer && this[definition.observer]) {
            this[definition.observer](oldVal, newVal);
          }

          this._________TOP_SECRET__[propName] = newVal;

          // if reflected, update the attribute as well.
          if (
            definition.reflect &&
            definition.type === Boolean &&
            newVal === false
          ) {
            // for boolean properties, if they're set to false, remove the attribute instead of setting `attrName="false"`
            console.log(
              `Boolean property ${
                this.constructor.name
              }.properties.${propName} set to false; removing attribute ${prop2attr(
                propName,
                this._pfeClass.attrPrefix
              )}`
            );
            this.removeAttribute(prop2attr(propName));
          } else if (definition.reflect) {
            console.log(
              `property ${
                this.constructor.name
              }.properties.${propName} set to ${newVal}; updating attribute ${prop2attr(
                propName,
                this._pfeClass.attrPrefix
              )}`
            );
            this.setAttribute(
              prop2attr(propName, this._pfeClass.attrPrefix),
              newVal
            );
          }
        },
        writeable: true,
        enumerable: true,
        configurable: false
      });
    }
  }

  _initAttrReflection() {
    Object.keys(this._pfeClass.properties)
      .map(prop => ({
        propName: prop,
        attrName: prop2attr(prop, this._pfeClass.attrPrefix),
        definition: this._pfeClass.properties[prop]
      }))
      .filter(
        prop => prop.definition.reflect && isValidReflection(prop.definition)
      )
      .forEach(prop => {
        const isDefaultBooleanFalse =
          prop.definition.type === Boolean && prop.definition.default === false;
        if (!isDefaultBooleanFalse && !this.hasAttribute(prop.attrName)) {
          console.log(`setting default value for ${prop.attrName}`);
          this.setAttribute(prop.attrName, prop.definition.default);
        }
      });
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
