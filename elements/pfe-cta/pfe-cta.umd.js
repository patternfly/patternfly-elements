(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../pfelement/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../pfelement/pfelement.umd'], factory) :
  (global.PfeCta = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && PFElement.hasOwnProperty('default') ? PFElement['default'] : PFElement;

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  /*
   * Copyright 2019 Red Hat, Inc.
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

  var PfeCta = function (_PFElement) {
    inherits(PfeCta, _PFElement);
    createClass(PfeCta, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host {\n  --pfe-cta--main:                     var(--pfe-theme--color--ui-link, #06c);\n  --pfe-cta--main--hover:              var(--pfe-theme--color--ui-link--hover, #003366);\n  --pfe-cta--main--focus:              var(--pfe-theme--color--ui-link--focus, #003366);\n  --pfe-cta--main--visited:            var(--pfe-theme--color--ui-link--visited, rebeccapurple);\n  --pfe-cta--aux:                      transparent;\n  --pfe-cta--aux--hover:               transparent;\n  display: inline-block;\n  font-weight: bold; }\n  :host ::slotted(a) {\n    line-height: inherit;\n    color: var(--pfe-cta--main) !important;\n    transition: all var(--pfe-theme--animation-timing, cubic-bezier(0.465, 0.183, 0.153, 0.946)); }\n    :host ::slotted(a)::after {\n      display: block;\n      margin-left: calc(var(--pfe-theme--content-spacer, 1rem) * 0.25);\n      vertical-align: middle;\n      border-style: var(--pfe-theme--surface--border-style, solid);\n      border-width: 0.313em 0.313em 0;\n      border-color: transparent;\n      border-top-color: var(--pfe-cta--main);\n      transform: rotate(-90deg);\n      display: inline-block;\n      content: \"\"; }\n  :host ::slotted(a:hover) {\n    color: var(--pfe-cta--main--hover) !important; }\n    :host ::slotted(a:hover)::after {\n      border-top-color: var(--pfe-cta--main--hover); }\n  :host ::slotted(a:focus) {\n    color: var(--pfe-cta--main--focus) !important; }\n    :host ::slotted(a:focus)::after {\n      border-top-color: var(--pfe-cta--main--focus); }\n\n:host([priority=\"primary\"]) {\n  --pfe-cta--main:          var(--pfe-theme--color--ui-accent, #fe460d);\n  --pfe-cta--main--hover:   var(--pfe-theme--color--ui-accent--hover, #a42701);\n  --pfe-cta--aux:           var(--pfe-theme--color--ui-accent--text, #fff);\n  --pfe-cta--aux--hover:    var(--pfe-theme--color--ui-accent--text--hover, #fff); }\n  :host([priority=\"primary\"]) ::slotted(a) {\n    display: inline-block;\n    padding: calc(var(--pfe-theme--container-padding, 1rem) * 0.5) calc(var(--pfe-theme--container-padding, 1rem) * 2);\n    border-radius: calc(var(--pfe-theme--ui--border-radius, 2px) * 20);\n    border: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) transparent;\n    text-decoration: none;\n    line-height: 1.2;\n    border-color: var(--pfe-cta--main) !important;\n    background: var(--pfe-cta--main) !important;\n    color: var(--pfe-cta--aux) !important; }\n    :host([priority=\"primary\"]) ::slotted(a)::after {\n      display: none; }\n  :host([priority=\"primary\"]) ::slotted(a:hover),\n  :host([priority=\"primary\"]) ::slotted(a:focus) {\n    border-color: var(--pfe-cta--main--hover) !important;\n    background: var(--pfe-cta--main--hover) !important;\n    color: var(--pfe-cta--aux--hover) !important; }\n\n:host([priority=\"secondary\"]) {\n  --pfe-cta--main:          var(--pfe-theme--color--ui-base, #0477a4);\n  --pfe-cta--main--hover:   var(--pfe-theme--color--ui-base--hover, #022f40);\n  --pfe-cta--aux:           var(--pfe-theme--color--ui-base--text, #fff);\n  --pfe-cta--aux--hover:    var(--pfe-theme--color--ui-base--text--hover, #fff); }\n  :host([priority=\"secondary\"]) ::slotted(a) {\n    display: inline-block;\n    padding: calc(var(--pfe-theme--container-padding, 1rem) * 0.5) calc(var(--pfe-theme--container-padding, 1rem) * 2);\n    border-radius: calc(var(--pfe-theme--ui--border-radius, 2px) * 20);\n    border: var(--pfe-theme--ui--border-width, 1px) var(--pfe-theme--ui--border-style, solid) var(--pfe-cta--main);\n    text-decoration: none;\n    line-height: 1.2;\n    border-color: var(--pfe-cta--main) !important;\n    background: var(--pfe-cta--aux) !important;\n    color: var(--pfe-cta--main) !important; }\n    :host([priority=\"secondary\"]) ::slotted(a)::after {\n      display: none; }\n  :host([priority=\"secondary\"]) ::slotted(a:hover),\n  :host([priority=\"secondary\"]) ::slotted(a:focus) {\n    border-color: var(--pfe-cta--main--hover) !important;\n    background: var(--pfe-cta--main--hover) !important;\n    color: var(--pfe-cta--aux--hover) !important; }\n\n:host([on=\"dark\"]) {\n  --pfe-cta--main:        var(--pfe-theme--color--text--on-dark, #fff);\n  --pfe-cta--main--hover: var(--pfe-theme--color--ui-link--on-dark--hover, #cce6ff);\n  --pfe-cta--aux:         transparent;\n  --pfe-cta--aux--hover:  transparent; }\n\n:host([on=\"dark\"][priority=\"primary\"]) {\n  --pfe-cta--main:        var(--pfe-theme--color--ui-accent--text, #fff);\n  --pfe-cta--main--hover: var(--pfe-theme--color--ui-accent--text--hover, #fff);\n  --pfe-cta--aux:         var(--pfe-theme--color--ui-accent, #fe460d);\n  --pfe-cta--aux--hover:  var(--pfe-theme--color--ui-accent--hover, #a42701); }\n\n:host([on=\"dark\"][priority=\"secondary\"]) {\n  --pfe-cta--main:        var(--pfe-theme--color--ui-base--text, #fff);\n  --pfe-cta--main--hover: var(--pfe-theme--color--ui-base--text--hover, #fff);\n  --pfe-cta--aux:         transparent;\n  --pfe-cta--aux--hover:  var(--pfe-theme--color--ui-base--hover, #022f40); }\n\n:host([color=\"base\"]) {\n  --pfe-cta--main:        var(--pfe-theme--color--ui-base, #0477a4) !important;\n  --pfe-cta--main--hover: var(--pfe-theme--color--ui-base--hover, #022f40) !important;\n  --pfe-cta--aux:         var(--pfe-theme--color--ui-base--text, #fff) !important;\n  --pfe-cta--aux--hover:  var(--pfe-theme--color--ui-base--text--hover, #fff) !important; }\n\n:host([color=\"complement\"]) {\n  --pfe-cta--main:        var(--pfe-theme--color--ui-complement, #464646) !important;\n  --pfe-cta--main--hover: var(--pfe-theme--color--ui-complement--hover, #131313) !important;\n  --pfe-cta--aux:         var(--pfe-theme--color--ui-complement--text, #fff) !important;\n  --pfe-cta--aux--hover:  var(--pfe-theme--color--ui-complement--text--hover, #fff) !important; }\n\n:host([color=\"accent\"]) {\n  --pfe-cta--main:        var(--pfe-theme--color--ui-accent, #fe460d) !important;\n  --pfe-cta--main--hover: var(--pfe-theme--color--ui-accent--hover, #a42701) !important;\n  --pfe-cta--aux:         var(--pfe-theme--color--ui-accent--text, #fff) !important;\n  --pfe-cta--aux--hover:  var(--pfe-theme--color--ui-accent--text--hover, #fff) !important; }</style>\n<slot></slot>";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-cta.scss";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-cta.html";
      }
    }], [{
      key: "tag",
      get: function get$$1() {
        return "pfe-cta";
      }
    }]);

    function PfeCta() {
      classCallCheck(this, PfeCta);
      return possibleConstructorReturn(this, (PfeCta.__proto__ || Object.getPrototypeOf(PfeCta)).call(this, PfeCta));
    }

    createClass(PfeCta, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeCta.prototype.__proto__ || Object.getPrototypeOf(PfeCta.prototype), "connectedCallback", this).call(this);

        var firstChild = this.children[0];

        if (!firstChild) {
          console.warn("The first child in the light DOM must be an anchor tag (<a>)");
        } else if (firstChild && firstChild.tagName.toLowerCase() !== "a") {
          console.warn("The first child in the light DOM must be an anchor tag (<a>)");
        } else {
          this.link = this.querySelector("a");
        }
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {}
    }]);
    return PfeCta;
  }(PFElement);

  PFElement.create(PfeCta);

  return PfeCta;

})));
//# sourceMappingURL=pfe-cta.umd.js.map
