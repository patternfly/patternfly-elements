let logger = () => null;

/**
 * Reveal web components when loading is complete by removing the unresolved attribute
 * from the body tag; log the event.
 * @throws debugging log indicating the reveal event
 */
function reveal() {
  logger(`[reveal] elements ready, revealing the body`);
  window.document.body.removeAttribute("unresolved");
}

/**
 * Auto-reveal functionality prevents a flash of unstyled content before components
 * have finished loading.
 * @param {function} logFunction
 * @see https://github.com/github/webcomponentsjs#webcomponents-loaderjs
 */
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

/**
 * Reveal web components when loading is complete and log event.
 * @throws debugging log indicating the web components are ready
 */
function handleWebComponentsReady() {
  logger("[reveal] web components ready");
  reveal();
}

/**
 * Verify that a property definition's `type` field contains one of the allowed
 * types.  If the definition type resolves to falsy, assumes String type.
 * @param {constructor} definition
 * @default String
 * @return {Boolean} True if the definition type is one of String, Number, or Boolean
 */
function isAllowedType(definition) {
  return [String, Number, Boolean].includes(definition.type || String);
}

/**
 * Verify that a property definition's `default` value is of the correct type.
 *
 * A `default` value is valid if it's of the same type as the `type`
 * definition.  Or, if there is no `type` definition, then it must be a String
 * (the default value for `type`).
 * @param {type} definition
 * @return {Boolean} True if the default value matches the type of the definition object.
 */
function isValidDefaultType(definition) {
  return definition.hasOwnProperty("default") && definition.default.constructor === definition.type;
}

// @POLYFILL  Array.includes
/** @see https://tc39.github.io/ecma262/#sec-array.prototype.includes */
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, "includes", {
    value: function(valueToFind, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      // 1. Let O be ? ToObject(this value).
      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === "number" && typeof y === "number" && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(valueToFind, elementK) is true, return true.
        if (sameValueZero(o[k], valueToFind)) {
          return true;
        }
        // c. Increase k by 1.
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

// @POLYFILL Object.entries
/** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries */
if (!Object.entries) {
  Object.entries = function(obj) {
    var ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}

// @POLYFILL String.startsWith
/** @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith#polyfill */
if (!String.prototype.startsWith) {
  Object.defineProperty(String.prototype, "startsWith", {
    value: function(search, rawPos) {
      var pos = rawPos > 0 ? rawPos | 0 : 0;
      return this.substring(pos, pos + search.length) === search;
    }
  });
}

/*!
 * PatternFly Elements: PFElement 1.7.0
 * @license
 * Copyright 2021 Red Hat, Inc.
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

// /**
//  * Global prefix used for all components in the project.
//  * @constant {String}
//  * */
const prefix = "pfe";

/**
 * @class PFElement
 * @extends HTMLElement
 * @version 1.7.0
 * @classdesc Serves as the baseline for all PatternFly Element components.
 */
class PFElement extends HTMLElement {
  /**
   * A boolean value that indicates if the logging should be printed to the console; used for debugging.
   * For use in a JS file or script tag; can also be added in the constructor of a component during development.
   * @example PFElement._debugLog = true;
   * @tags debug
   */
  static debugLog(preference = null) {
    if (preference !== null) {
      PFElement._debugLog = !!preference;
    }
    return PFElement._debugLog;
  }

  /**
   * A boolean value that indicates if the performance should be tracked.
   * For use in a JS file or script tag; can also be added in the constructor of a component during development.
   * @example PFElement._trackPerformance = true;
   */
  static trackPerformance(preference = null) {
    if (preference !== null) {
      PFElement._trackPerformance = !!preference;
    }
    return PFElement._trackPerformance;
  }

  /**
   * A logging wrapper which checks the debugLog boolean and prints to the console if true.
   *
   * @example PFElement.log("Hello");
   */
  static log(...msgs) {
    if (PFElement.debugLog()) {
      console.log(...msgs);
    }
  }

  /**
   * Local logging that outputs the tag name as a prefix automatically
   *
   * @example this.log("Hello");
   */
  log(...msgs) {
    PFElement.log(`[${this.tag}${this.id ? `#${this.id}` : ""}]`, ...msgs);
  }

  /**
   * A console warning wrapper which formats your output with useful debugging information.
   *
   * @example PFElement.warn("Hello");
   */
  static warn(...msgs) {
    console.warn(...msgs);
  }

  /**
   * Local warning wrapper that outputs the tag name as a prefix automatically.
   * For use inside a component's function.
   * @example this.warn("Hello");
   */
  warn(...msgs) {
    PFElement.warn(`[${this.tag}${this.id ? `#${this.id}` : ``}]`, ...msgs);
  }

  /**
   * A console error wrapper which formats your output with useful debugging information.
   * For use inside a component's function.
   * @example PFElement.error("Hello");
   */
  static error(...msgs) {
    throw new Error([...msgs].join(" "));
  }

  /**
   * Local error wrapper that outputs the tag name as a prefix automatically.
   * For use inside a component's function.
   * @example this.error("Hello");
   */
  error(...msgs) {
    PFElement.error(`[${this.tag}${this.id ? `#${this.id}` : ``}]`, ...msgs);
  }

  /**
   * A global definition of component types (a general way of defining the purpose of a
   * component and how it is put together).
   */
  static get PfeTypes() {
    return {
      Container: "container",
      Content: "content",
      Combo: "combo"
    };
  }

  /**
   * The current version of a component; set by the compiler using the package.json data.
   */
  static get version() {
    return "1.7.0";
  }

  /**
   * A local alias to the static version.
   * For use in the console to validate version being loaded.
   * @example PfeAccordion.version
   */
  get version() {
    return this._pfeClass.version;
  }

  /**
   * Global property definitions: properties managed by the base class that apply to all components.
   */
  static get properties() {
    return {
      pfelement: {
        title: "Upgraded flag",
        type: Boolean,
        default: true,
        observer: "_upgradeObserver"
      },
      on: {
        title: "Context",
        description: "Describes the visual context (backgrounds).",
        type: String,
        values: ["light", "dark", "saturated"],
        default: el => el.contextVariable,
        observer: "_onObserver"
      },
      context: {
        title: "Context hook",
        description: "Lets you override the system-set context.",
        type: String,
        values: ["light", "dark", "saturated"],
        observer: "_contextObserver"
      },
      // @TODO: Deprecated with 1.0
      oldTheme: {
        type: String,
        values: ["light", "dark", "saturated"],
        alias: "context",
        attr: "pfe-theme"
      },
      _style: {
        title: "Custom styles",
        type: String,
        attr: "style",
        observer: "_inlineStyleObserver"
      },
      type: {
        title: "Component type",
        type: String,
        values: ["container", "content", "combo"]
      }
    };
  }

  static get observedAttributes() {
    const properties = this.allProperties;
    if (properties) {
      const oa = Object.keys(properties)
        .filter(prop => properties[prop].observer || properties[prop].cascade || properties[prop].alias)
        .map(p => this._convertPropNameToAttrName(p));
      return [...oa];
    }
  }

  /**
   * A quick way to fetch a random ID value.
   * _Note:_ All values are prefixes with `pfe` automatically to ensure an ID-safe value is returned.
   *
   * @example this.id = this.randomID;
   */
  get randomId() {
    return (
      `${prefix}-` +
      Math.random()
        .toString(36)
        .substr(2, 9)
    );
  }

  /**
   * Set the --context variable with the provided value in this component.
   */
  set contextVariable(value) {
    this.cssVariable("context", value);
  }

  /**
   * Get the current value of the --context variable in this component.
   * @return {string} [dark|light|saturated]
   */
  get contextVariable() {
    /* @DEPRECATED --theme in 1.0, to be removed in 2.0 */
    return this.cssVariable("context") || this.cssVariable("theme");
  }

  /**
   * Returns a boolean statement of whether or not this component contains any light DOM.
   * @returns {boolean}
   * @example if(this.hasLightDOM()) this._init();
   */
  hasLightDOM() {
    return this.children.length || this.textContent.trim().length;
  }

  /**
   * Returns a boolean statement of whether or not that slot exists in the light DOM.
   *
   * @example this.hasSlot("header");
   */
  hasSlot(name) {
    if (!name) {
      this.warn(`Please provide at least one slot name for which to search.`);
      return;
    }

    switch (typeof name) {
      case "string":
        return (
          [...this.children].filter(child => child.hasAttribute("slot") && child.getAttribute("slot") === name).length >
          0
        );
      case "array":
        return name.reduce(
          n =>
            [...this.children].filter(child => child.hasAttribute("slot") && child.getAttribute("slot") === n).length >
            0
        );
      default:
        this.warn(
          `Did not recognize the type of the name provided to hasSlot; this funciton can accept a string or an array.`
        );
        return;
    }
  }

  /**
   * Given a slot name, returns elements assigned to the slot as an arry.
   * If no value is provided (i.e., `this.getSlot()`), it returns all children not assigned to a slot (without a slot attribute).
   *
   * @example: `this.getSlot("header")`
   */
  getSlot(name = "unassigned") {
    if (name !== "unassigned") {
      return [...this.children].filter(child => child.hasAttribute("slot") && child.getAttribute("slot") === name);
    } else {
      return [...this.children].filter(child => !child.hasAttribute("slot"));
    }
  }

  cssVariable(name, value, element = this) {
    name = name.substr(0, 2) !== "--" ? "--" + name : name;
    if (value) {
      element.style.setProperty(name, value);
      return value;
    }
    return (
      window
        .getComputedStyle(element)
        .getPropertyValue(name)
        .trim() || null
    );
  }

  /**
   * This alerts nested components to a change in the context
   */
  contextUpdate() {
    // Loop over light DOM elements, find direct descendants that are components
    const lightEls = [...this.querySelectorAll("*")]
      .filter(item => item.tagName.toLowerCase().slice(0, 4) === `${prefix}-`)
      // Closest will return itself or it's ancestor matching that selector
      .filter(item => {
        // If there is no parent element, return null
        if (!item.parentElement) return;
        // Otherwise, find the closest component that's this one
        else return item.parentElement.closest(`[${this._pfeClass._getCache("prop2attr").pfelement}]`) === this;
      });

    // Loop over shadow elements, find direct descendants that are components
    let shadowEls = [...this.shadowRoot.querySelectorAll("*")]
      .filter(item => item.tagName.toLowerCase().slice(0, 4) === `${prefix}-`)
      // Closest will return itself or it's ancestor matching that selector
      .filter(item => {
        // If there is a parent element and we can find another web component in the ancestor tree
        if (item.parentElement && item.parentElement.closest(`[${this._pfeClass._getCache("prop2attr").pfelement}]`)) {
          return item.parentElement.closest(`[${this._pfeClass._getCache("prop2attr").pfelement}]`) === this;
        }
        // Otherwise, check if the host matches this context
        if (item.getRootNode().host === this) return true;

        // If neither state is true, return false
        return false;
      });

    const nestedEls = lightEls.concat(shadowEls);

    // If nested elements don't exist, return without processing
    if (nestedEls.length === 0) return;

    // Loop over the nested elements and reset their context
    nestedEls.map(child => {
      this.log(`Update context of ${child.tagName.toLowerCase()}`);
      Promise.all([customElements.whenDefined(child.tagName.toLowerCase())]).then(() => {
        // Ask the component to recheck it's context in case it changed
        child.resetContext(this.on);
      });
    });
  }

  resetContext(fallback) {
    if (this.isIE11) return;

    // Priority order for context values to be pulled from:
    //--> 1. context (OLD: pfe-theme)
    //--> 2. --context (OLD: --theme)
    let value = this.context || this.contextVariable || fallback;

    // Validate that the current context (this.on) and the new context (value) are the same OR
    // no context is set and there isn't a new context being set
    if (this.on === value || (!this.on && !value)) return;

    this.log(`Resetting context from ${this.on} to ${value || "null"}`);
    this.on = value;
  }

  constructor(pfeClass, { type = null, delayRender = false } = {}) {
    super();

    this._pfeClass = pfeClass;
    this.tag = pfeClass.tag;
    this._parseObserver = this._parseObserver.bind(this);
    this.isIE11 = /MSIE|Trident|Edge\//.test(window.navigator.userAgent);

    // Set up the mark ID based on existing ID on component if it exists
    if (!this.id) {
      this._markId = this.randomId.replace("pfe", this.tag);
    } else if (this.id.startsWith("pfe-") && !this.id.startsWith(this.tag)) {
      this._markId = this.id.replace("pfe", this.tag);
    } else {
      this._markId = `${this.tag}-${this.id}`;
    }

    this._markCount = 0;

    // TODO: Deprecated for 1.0 release
    this.schemaProps = pfeClass.schemaProperties;

    // TODO: Migrate this out of schema for 1.0
    this.slots = pfeClass.slots;

    this.template = document.createElement("template");

    // Set the default value to the passed in type
    if (type && this._pfeClass.allProperties.type) this._pfeClass.allProperties.type.default = type;

    // Initalize the properties and attributes from the property getter
    this._initializeProperties();

    this.attachShadow({ mode: "open" });

    // Tracks if the component has been initially rendered. Useful if for debouncing
    // template updates.
    this._rendered = false;

    if (!delayRender) this.render();
  }

  /**
   * Standard connected callback; fires when the component is added to the DOM.
   */
  connectedCallback() {
    this._initializeAttributeDefaults();

    if (window.ShadyCSS) window.ShadyCSS.styleElement(this);

    // If the slot definition exists, set up an observer
    if (typeof this.slots === "object") {
      this._slotsObserver = new MutationObserver(() => this._initializeSlots(this.tag, this.slots));
      this._initializeSlots(this.tag, this.slots);
    }
  }

  /**
   * Standard disconnected callback; fires when a componet is removed from the DOM.
   * Add your removeEventListeners here.
   */
  disconnectedCallback() {
    if (this._cascadeObserver) this._cascadeObserver.disconnect();
    if (this._slotsObserver) this._slotsObserver.disconnect();
  }

  /**
   * Attribute changed callback fires when attributes are updated.
   * This combines the global and the component-specific logic.
   */
  attributeChangedCallback(attr, oldVal, newVal) {
    if (!this._pfeClass.allProperties) return;

    let propName = this._pfeClass._attr2prop(attr);

    const propDef = this._pfeClass.allProperties[propName];

    // If the attribute that changed derives from a property definition
    if (propDef) {
      // If the property/attribute pair has an alias, copy the new value to the alias target
      if (propDef.alias) {
        const aliasedPropDef = this._pfeClass.allProperties[propDef.alias];
        const aliasedAttr = this._pfeClass._prop2attr(propDef.alias);
        const aliasedAttrVal = this.getAttribute(aliasedAttr);
        if (aliasedAttrVal !== newVal) {
          this[propDef.alias] = this._castPropertyValue(aliasedPropDef, newVal);
        }
      }

      // If the property/attribute pair has an observer, fire it
      // Observers receive the oldValue and the newValue from the attribute changed callback
      if (propDef.observer) {
        this[propDef.observer](this._castPropertyValue(propDef, oldVal), this._castPropertyValue(propDef, newVal));
      }

      // If the property/attribute pair has a cascade target, copy the attribute to the matching elements
      // Note: this handles the cascading of new/updated attributes
      if (propDef.cascade) {
        this._copyAttribute(attr, this._pfeClass._convertSelectorsToArray(propDef.cascade));
      }
    }
  }

  /**
   * Standard render function.
   */
  render() {
    this.shadowRoot.innerHTML = "";
    this.template.innerHTML = this.html;

    if (window.ShadyCSS) {
      window.ShadyCSS.prepareTemplate(this.template, this.tag);
    }

    this.shadowRoot.appendChild(this.template.content.cloneNode(true));

    this.log(`render`);

    // Cascade properties to the rendered template
    this.cascadeProperties();

    // Update the display context
    this.contextUpdate();

    if (PFElement.trackPerformance()) {
      try {
        performance.mark(`${this._markId}-rendered`);

        if (this._markCount < 1) {
          this._markCount = this._markCount + 1;

          // Navigation start, i.e., the browser first sees that the user has navigated to the page
          performance.measure(`${this._markId}-from-navigation-to-first-render`, undefined, `${this._markId}-rendered`);

          // Render is run before connection unless delayRender is used
          performance.measure(
            `${this._markId}-from-defined-to-first-render`,
            `${this._markId}-defined`,
            `${this._markId}-rendered`
          );
        }
      } catch (err) {
        this.log(`Performance marks are not supported by this browser.`);
      }
    }

    // If the slot definition exists, set up an observer
    if (typeof this.slots === "object" && this._slotsObserver) {
      this._slotsObserver.observe(this, { childList: true });
    }

    // If an observer was defined, set it to begin observing here
    if (this._cascadeObserver) {
      this._cascadeObserver.observe(this, {
        attributes: true,
        childList: true,
        subtree: true
      });
    }

    this._rendered = true;
  }

  /**
   * A wrapper around an event dispatch to standardize formatting.
   */
  emitEvent(name, { bubbles = true, cancelable = false, composed = true, detail = {} } = {}) {
    if (detail) this.log(`Custom event: ${name}`, detail);
    else this.log(`Custom event: ${name}`);

    this.dispatchEvent(
      new CustomEvent(name, {
        bubbles,
        cancelable,
        composed,
        detail
      })
    );
  }

  /**
   * Handles the cascading of properties to nested components when new elements are added
   * Attribute updates/additions are handled by the attribute callback
   */
  cascadeProperties(nodeList) {
    const cascade = this._pfeClass._getCache("cascadingProperties");

    if (cascade) {
      if (this._cascadeObserver) this._cascadeObserver.disconnect();

      let selectors = Object.keys(cascade);
      // Find out if anything in the nodeList matches any of the observed selectors for cacading properties
      if (nodeList) {
        selectors = [];
        [...nodeList].forEach(nodeItem => {
          Object.keys(cascade).map(selector => {
            // if this node has a match function (i.e., it's an HTMLElement, not
            // a text node), see if it matches the selector, otherwise drop it (like it's hot).
            if (nodeItem.matches && nodeItem.matches(selector)) {
              selectors.push(selector);
            }
          });
        });
      }

      // If a match was found, cascade each attribute to the element
      if (selectors) {
        const components = selectors
          .filter(item => item.slice(0, prefix.length + 1) === `${prefix}-`)
          .map(name => customElements.whenDefined(name));

        if (components)
          Promise.all(components).then(() => {
            this._copyAttributes(selectors, cascade);
          });
        else this._copyAttributes(selectors, cascade);
      }

      // @TODO This is here for IE11 processing; can move this after deprecation
      if (this._rendered && this._cascadeObserver)
        this._cascadeObserver.observe(this, {
          attributes: true,
          childList: true,
          subtree: true
        });
    }
  }

  /* --- Observers for global properties --- */

  /**
   * This responds to changes in the pfelement attribute; indicates if the component upgraded
   * @TODO maybe we should use just the attribute instead of the class?
   * https://github.com/angular/angular/issues/15399#issuecomment-318785677
   */
  _upgradeObserver() {
    this.classList.add("PFElement");
  }

  /**
   * This responds to changes in the context attribute; manual override tool
   */
  _contextObserver(oldValue, newValue) {
    if (newValue && ((oldValue && oldValue !== newValue) || !oldValue)) {
      this.log(`Running the context observer`);
      this.on = newValue;
      this.cssVariable("context", newValue);
    }
  }

  /**
   * This responds to changes in the context; source of truth for components
   */
  _onObserver(oldValue, newValue) {
    if ((oldValue && oldValue !== newValue) || (newValue && !oldValue)) {
      this.log(`Context update`);
      // Fire an event for child components
      this.contextUpdate();
    }
  }

  /**
   * This responds to inline style changes and greps for context or theme updates.
   * @TODO: --theme will be deprecated in 2.0
   */
  _inlineStyleObserver(oldValue, newValue) {
    if (oldValue === newValue) return;
    // If there are no inline styles, a context might have been deleted, so call resetContext
    if (!newValue) this.resetContext();
    else {
      this.log(`Style observer activated on ${this.tag}`, `${newValue || "null"}`);
      // Grep for context/theme
      const regex = /--[\w|-]*(?:context|theme):\s*(?:\"*(light|dark|saturated)\"*)/gi;
      let match = regex.exec(newValue);

      // If no match is returned, exit the observer
      if (!match) return;

      const newContext = match[1];
      // If the new context value differs from the on value, update
      if (newContext !== this.on && !this.context) this.on = newContext;
    }
  }

  /**
   * This is connected with a mutation observer that watches for updates to the light DOM
   * and pushes down the cascading values
   */
  _parseObserver(mutationsList) {
    // Iterate over the mutation list, look for cascade updates
    for (let mutation of mutationsList) {
      // If a new node is added, attempt to cascade attributes to it
      if (mutation.type === "childList" && mutation.addedNodes.length) {
        this.cascadeProperties(mutation.addedNodes);
      }
    }
  }
  /* --- End observers --- */

  /**
   * Validate that the property meets the requirements for type and naming.
   */
  static _validateProperties() {
    for (let propName in this.allProperties) {
      const propDef = this.allProperties[propName];

      // Verify that properties conform to the allowed data types
      if (!isAllowedType(propDef)) {
        this.error(`Property "${propName}" on ${this.name} must have type String, Number, or Boolean.`);
      }

      // Verify the property name conforms to our naming rules
      if (!/^[a-z_]/.test(propName)) {
        this.error(
          `Property ${this.name}.${propName} defined, but prop names must begin with a lower-case letter or an underscore`
        );
      }

      const isFunction = typeof propDef.default === "function";

      // If the default value is not the same type as defined by the property
      // and it's not a function (we can't validate the output of the function
      // on the class level), throw a warning
      if (propDef.default && !isValidDefaultType(propDef) && !isFunction)
        this.error(
          `[${this.name}] The default value \`${propDef.default}\` does not match the assigned type ${propDef.type.name} for the \'${propName}\' property`
        );
    }
  }

  /**
   * Convert provided property value to the correct type as defined in the properties method.
   */
  _castPropertyValue(propDef, attrValue) {
    switch (propDef.type) {
      case Number:
        // map various attribute string values to their respective
        // desired property values
        return {
          [attrValue]: Number(attrValue),
          null: null,
          NaN: NaN,
          undefined: undefined
        }[attrValue];

      case Boolean:
        return attrValue !== null;

      case String:
        return {
          [attrValue]: attrValue,
          undefined: undefined
        }[attrValue];

      default:
        return attrValue;
    }
  }

  /**
   * Map provided value to the attribute name on the component.
   */
  _assignValueToAttribute(obj, attr, value) {
    // If the default is false and the property is boolean, we don't need to do anything
    const isBooleanFalse = obj.type === Boolean && !value;
    const isNull = value === null;
    const isUndefined = typeof value === "undefined";

    // If the attribute is not defined, set the default value
    if (isBooleanFalse || isNull || isUndefined) {
      this.removeAttribute(attr);
    } else {
      // Boolean values get an empty string: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes
      if (obj.type === Boolean && typeof value === "boolean") {
        this.setAttribute(attr, "");
      } else {
        // Validate against the provided values
        if (obj.values) {
          this._validateAttributeValue(obj, attr, value);
        }

        // Still accept the value provided even if it's not valid
        this.setAttribute(attr, value);
      }
    }
  }

  /**
   * Maps the defined slots into an object that is easier to query
   */
  _initializeSlots(tag, slots) {
    this.log("Validate slots...");

    if (this._slotsObserver) this._slotsObserver.disconnect();

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
          result = this.getSlot(`${tag}--${slot}`);
          if (result.length > 0) {
            slotObj.nodes = result;
            slotExists = true;
          }

          // Check for unprefixed slots
          result = this.getSlot(`${slot}`);
          if (result.length > 0) {
            slotObj.nodes = result;
            slotExists = true;
          }
          // If it's the default slot, look for direct children not assigned to a slot
        } else {
          result = [...this.children].filter(child => !child.hasAttribute("slot"));

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

    if (this._slotsObserver) this._slotsObserver.observe(this, { childList: true });
  }

  /**
   * Sets up the property definitions based on the properties method.
   */
  _initializeProperties() {
    const properties = this._pfeClass.allProperties;
    let hasCascade = false;

    if (Object.keys(properties).length > 0) this.log(`Initialize properties`);

    for (let propName in properties) {
      const propDef = properties[propName];

      // Check if the property exists, throw a warning if it does.
      // HTMLElements have a LOT of properties; it wouldn't be hard
      // to overwrite one accidentally.
      if (typeof this[propName] !== "undefined") {
        this.log(
          `Property "${propName}" on ${this.constructor.name} cannot be defined because the property name is reserved`
        );
      } else {
        const attrName = this._pfeClass._prop2attr(propName);
        if (propDef.cascade) hasCascade = true;

        Object.defineProperty(this, propName, {
          get: () => {
            const attrValue = this.getAttribute(attrName);

            return this._castPropertyValue(propDef, attrValue);
          },
          set: rawNewVal => {
            // Assign the value to the attribute
            this._assignValueToAttribute(propDef, attrName, rawNewVal);

            return rawNewVal;
          },
          writeable: true,
          enumerable: true,
          configurable: false
        });
      }
    }

    // If any of the properties has cascade, attach a new mutation observer to the component
    if (hasCascade) {
      this._cascadeObserver = new MutationObserver(this._parseObserver);
    }
  }

  /**
   * Intialize the default value for an attribute.
   */
  _initializeAttributeDefaults() {
    const properties = this._pfeClass.allProperties;

    for (let propName in properties) {
      const propDef = properties[propName];

      const attrName = this._pfeClass._prop2attr(propName);

      if (propDef.hasOwnProperty("default")) {
        let value = propDef.default;

        // Check if default is a function
        if (typeof propDef.default === "function") {
          value = propDef.default(this);
        }

        // If the attribute has not already been set, assign the default value
        if (!this.hasAttribute(attrName)) {
          // Assign the value to the attribute
          this._assignValueToAttribute(propDef, attrName, value);
        }
      }
    }
  }

  /**
   * Validate the value against provided values.
   */
  // @TODO add support for a validation function
  _validateAttributeValue(propDef, attr, value) {
    if (
      Array.isArray(propDef.values) &&
      propDef.values.length > 0 &&
      !propDef.values.includes(value) // ||
      // (typeof propDef.values === "string" && propDef.values !== value) ||
      // (typeof propDef.values === "function" && !propDef.values(value))
    ) {
      this.warn(
        `${value} is not a valid value for ${attr}. Please provide one of the following values: ${propDef.values.join(
          ", "
        )}`
      );
    }

    return value;
  }

  /**
   * Look up an attribute name linked to a given property name.
   */
  static _prop2attr(propName) {
    return this._getCache("prop2attr")[propName];
  }

  /**
   * Look up an property name linked to a given attribute name.
   */
  static _attr2prop(attrName) {
    return this._getCache("attr2prop")[attrName];
  }

  /**
   * Convert a property name to an attribute name.
   */
  static _convertPropNameToAttrName(propName) {
    const propDef = this.allProperties[propName];

    if (propDef.attr) {
      return propDef.attr;
    }

    return propName
      .replace(/^_/, "")
      .replace(/^[A-Z]/, l => l.toLowerCase())
      .replace(/[A-Z]/g, l => `-${l.toLowerCase()}`);
  }

  /**
   * Convert an attribute name to a property name.
   */
  static _convertAttrNameToPropName(attrName) {
    for (let prop in this.allProperties) {
      if (this.allProperties[prop].attr === attrName) {
        return prop;
      }
    }

    // Convert the property name to kebab case
    const propName = attrName.replace(/-([A-Za-z])/g, l => l[1].toUpperCase());
    return propName;
  }

  _copyAttributes(selectors, set) {
    selectors.forEach(selector => {
      set[selector].forEach(attr => {
        this._copyAttribute(attr, selector);
      });
    });
  }

  _copyAttribute(name, to) {
    const recipients = [...this.querySelectorAll(to), ...this.shadowRoot.querySelectorAll(to)];
    const value = this.getAttribute(name);
    const fname = value == null ? "removeAttribute" : "setAttribute";
    for (const node of recipients) {
      node[fname](name, value);
    }
  }

  static _convertSelectorsToArray(selectors) {
    if (selectors) {
      if (typeof selectors === "string") return selectors.split(",");
      else if (typeof selectors === "object") return selectors;
      else {
        this.warn(`selectors should be provided as a string, array, or object; received: ${typeof selectors}.`);
      }
    }

    return;
  }

  static _parsePropertiesForCascade(mergedProperties) {
    let cascadingProperties = {};
    // Parse the properties to pull out attributes that cascade
    for (const [propName, config] of Object.entries(mergedProperties)) {
      let cascadeTo = this._convertSelectorsToArray(config.cascade);

      // Iterate over each node in the cascade list for this property
      if (cascadeTo)
        cascadeTo.map(nodeItem => {
          let attr = this._prop2attr(propName);
          // Create an object with the node as the key and an array of attributes
          // that are to be cascaded down to it
          if (!cascadingProperties[nodeItem]) cascadingProperties[nodeItem] = [attr];
          else cascadingProperties[nodeItem].push(attr);
        });
    }

    return cascadingProperties;
  }

  /**
   * Caching the attributes and properties data for efficiency
   */
  static create(pfe) {
    pfe._createCache();
    pfe._populateCache(pfe);
    pfe._validateProperties();
    window.customElements.define(pfe.tag, pfe);

    if (PFElement.trackPerformance()) {
      try {
        performance.mark(`${this._markId}-defined`);
      } catch (err) {
        this.log(`Performance marks are not supported by this browser.`);
      }
    }
  }

  static _createCache() {
    this._cache = {
      properties: {},
      globalProperties: {},
      componentProperties: {},
      cascadingProperties: {},
      attr2prop: {},
      prop2attr: {}
    };
  }

  /**
   * Cache an object in a given cache namespace.  This overwrites anything
   * already in that namespace.
   */
  static _setCache(namespace, object) {
    this._cache[namespace] = object;
  }

  /**
   * Get a cached object by namespace, or get all cached objects.
   */
  static _getCache(namespace) {
    return namespace ? this._cache[namespace] : this._cache;
  }

  /**
   * Populate initial values for properties cache.
   */
  static _populateCache(pfe) {
    // @TODO add a warning when a component property conflicts with a global property.
    const mergedProperties = { ...pfe.properties, ...PFElement.properties };

    pfe._setCache("componentProperties", pfe.properties);
    pfe._setCache("globalProperties", PFElement.properties);
    pfe._setCache("properties", mergedProperties);

    // create mapping objects to go from prop name to attrname and back
    const prop2attr = {};
    const attr2prop = {};
    for (let propName in mergedProperties) {
      const attrName = this._convertPropNameToAttrName(propName);
      prop2attr[propName] = attrName;
      attr2prop[attrName] = propName;
    }
    pfe._setCache("attr2prop", attr2prop);
    pfe._setCache("prop2attr", prop2attr);

    const cascadingProperties = this._parsePropertiesForCascade(mergedProperties);
    if (Object.keys(cascadingProperties)) pfe._setCache("cascadingProperties", cascadingProperties);
  }

  /**
   * allProperties returns an object containing PFElement's global properties
   * and the descendents' (such as PfeCard, etc) component properties.  The two
   * objects are merged together and in the case of a property name conflict,
   * PFElement's properties override the component's properties.
   */
  static get allProperties() {
    return this._getCache("properties");
  }

  /**
   * cascadingProperties returns an object containing PFElement's global properties
   * and the descendents' (such as PfeCard, etc) component properties.  The two
   * objects are merged together and in the case of a property name conflict,
   * PFElement's properties override the component's properties.
   */
  static get cascadingProperties() {
    return this._getCache("cascadingProperties");
  }
}

autoReveal(PFElement.log);

export default PFElement;
//# sourceMappingURL=pfelement.js.map
