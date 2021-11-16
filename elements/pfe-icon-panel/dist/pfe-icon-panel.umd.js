(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd'), require('../../pfe-icon/dist/pfe-icon.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd', '../../pfe-icon/dist/pfe-icon.umd'], factory) :
  (global = global || self, global.PfeIconPanel = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;

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

  /*!
   * PatternFly Elements: PfeIconPanel 1.12.1
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

  var PfeIconPanel = function (_PFElement) {
    inherits(PfeIconPanel, _PFElement);
    createClass(PfeIconPanel, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-align-content:flex-start;-ms-flex-line-pack:start;align-content:flex-start;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;margin-top:calc(-1 * 1rem);margin-top:calc(-1 * var(--pfe-theme--container-spacer,1rem));margin-right:calc(-1 * 1rem);margin-right:calc(-1 * var(--pfe-theme--container-spacer,1rem))}@media (min-width:576px){:host{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){::slotted(*){max-width:100%}}:host([stacked]),:host([stacked]:not([stacked=false])){-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.pfe-icon-panel__content{margin-top:1rem;margin-top:var(--pfe-theme--container-spacer,1rem);margin-left:0}@media (min-width:576px){.pfe-icon-panel__content{margin-top:0;margin-left:1rem;margin-left:var(--pfe-theme--container-spacer,1rem)}}.pfe-icon-panel__footer{margin-top:1.5rem;margin-top:var(--pfe-theme--content-spacer,1.5rem)} /*# sourceMappingURL=pfe-icon-panel.min.css.map */</style>\n<pfe-icon size=\"" + (this.getAttribute("pfe-circled") === "true" ? "lg" : "xl") + "\"></pfe-icon>\n<div class=\"pfe-icon-panel__content\">\n  <slot class=\"pfe-icon-panel__header\" name=\"pfe-icon-panel--header\"></slot>\n  <slot class=\"pfe-icon-panel__body\"></slot>\n  <slot class=\"pfe-icon-panel__footer\" name=\"pfe-icon-panel--footer\"></slot>\n</div>";
      }

      // @TODO: Deprecating in 1.0 release
      // Injected at build-time

    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-icon-panel.scss";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-icon-panel.html";
      }
    }, {
      key: "schemaUrl",
      get: function get() {
        return "pfe-icon-panel.json";
      }
    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.12.1";
      }
    }, {
      key: "schemaProperties",
      get: function get() {
        return { "icon": { "title": "Icon", "type": "string", "prefixed": false }, "color": { "title": "Color", "type": "string", "enum": ["complement", "accent", "lightest", "base", "darker", "darkest", "critical", "important", "moderate", "success", "info"], "default": "darker", "prefixed": true }, "centered": { "title": "Centered", "type": "boolean", "prefixed": true, "default": false }, "stacked": { "title": "Stacked", "type": "boolean", "prefixed": true, "default": false }, "circled": { "title": "Circled", "type": "boolean", "default": true, "prefixed": true } };
      }

      // Injected at build-time

    }, {
      key: "slots",
      get: function get() {
        return { "header": { "title": "Header", "type": "array", "namedSlot": true, "items": { "title": "Header item", "oneOf": [{ "$ref": "raw" }] } }, "body": { "title": "Body", "type": "array", "namedSlot": false, "items": { "title": "Body item", "oneOf": [{ "$ref": "raw" }] } }, "footer": { "title": "Footer", "type": "array", "namedSlot": true, "maxItems": 3, "items": { "title": "Footer item", "oneOf": [{ "$ref": "raw" }] } } };
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-icon-panel";
      }
    }, {
      key: "properties",
      get: function get() {
        return {
          icon: {
            title: "Icon",
            type: String,
            attr: "icon",
            cascade: ["pfe-icon"]
          },
          circled: {
            title: "Circled",
            type: Boolean,
            cascade: ["pfe-icon"]
          },
          oldCircled: {
            alias: "circled",
            attr: "pfe-circled"
          },
          color: {
            title: "Color",
            type: String,
            values: ["complement", "accent", "lightest", "base", "darker", "darkest", "critical", "important", "moderate", "success", "info"],
            default: "darker",
            cascade: ["pfe-icon"]
          },
          oldColor: {
            alias: "color",
            attr: "pfe-color"
          },
          stacked: {
            title: "Stacked",
            type: Boolean
          },
          oldStacked: {
            alias: "stacked",
            attr: "pfe-stacked"
          },
          centered: {
            title: "Centered",
            type: Boolean
          },
          oldCentered: {
            alias: "centered",
            attr: "pfe-centered"
          }
        };
      }
    }]);

    function PfeIconPanel() {
      classCallCheck(this, PfeIconPanel);
      return possibleConstructorReturn(this, (PfeIconPanel.__proto__ || Object.getPrototypeOf(PfeIconPanel)).call(this, PfeIconPanel));
    }

    return PfeIconPanel;
  }(PFElement);

  PFElement.create(PfeIconPanel);

  return PfeIconPanel;

})));
//# sourceMappingURL=pfe-icon-panel.umd.js.map
