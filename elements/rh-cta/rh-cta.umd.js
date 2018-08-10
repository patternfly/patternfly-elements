(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../rhelement/rhelement.umd.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../rhelement/rhelement.umd.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.RHElement);
    global.RHElement = global.RHElement || {};
    global.RHElement.RhCta = mod.exports;
  }
})(this, function (exports, _rhelementUmd) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _rhelementUmd2 = _interopRequireDefault(_rhelementUmd);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _get = function get(object, property, receiver) {
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

  var _createClass = function () {
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

  function _inherits(subClass, superClass) {
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
  }

  var RhCta = function (_RHElement) {
    _inherits(RhCta, _RHElement);

    _createClass(RhCta, [{
      key: "html",
      get: function get() {
        return "\n<style>\n:host {\n  display: inline-block; }\n  :host ::slotted(a) {\n    padding: 0;\n    border: 0;\n    background: none;\n    color: var(--rhe-theme--link-color, #06c);\n    text-decoration: underline; }\n    :host ::slotted(a)::after {\n      margin-left: var(--rhe-theme--spacer--xs, 0.25rem);\n      vertical-align: middle;\n      border-style: solid;\n      border-width: 0.313em 0.313em 0;\n      border-color: transparent;\n      border-top-color: var(--rhe-theme--link-color, #06c);\n      transform: rotate(-90deg);\n      display: inline-block;\n      content: \"\";\n      position: relative;\n      display: inline-block; }\n  :host ::slotted(a:visited) {\n    padding: 0;\n    border: 0;\n    background: none;\n    color: var(--rhe-theme--link-color--visited, #7551a6);\n    text-decoration: underline; }\n    :host ::slotted(a:visited)::after {\n      margin-left: var(--rhe-theme--spacer--xs, 0.25rem);\n      vertical-align: middle;\n      border-style: solid;\n      border-width: 0.313em 0.313em 0;\n      border-color: transparent;\n      border-top-color: var(--rhe-theme--link-color--visited, #7551a6);\n      transform: rotate(-90deg);\n      display: inline-block;\n      content: \"\";\n      position: relative;\n      display: inline-block; }\n  :host ::slotted(a:hover) {\n    padding: 0;\n    border: 0;\n    background: none;\n    color: var(--rhe-theme--link-color--hover, #004080);\n    text-decoration: underline; }\n    :host ::slotted(a:hover)::after {\n      margin-left: var(--rhe-theme--spacer--xs, 0.25rem);\n      vertical-align: middle;\n      border-style: solid;\n      border-width: 0.313em 0.313em 0;\n      border-color: transparent;\n      border-top-color: var(--rhe-theme--link-color--hover, #004080);\n      transform: rotate(-90deg);\n      display: inline-block;\n      content: \"\";\n      position: relative;\n      display: inline-block; }\n  :host ::slotted(a:focus) {\n    padding: 0;\n    border: 0;\n    background: none;\n    color: var(--rhe-theme--link-color--focus, #004080);\n    text-decoration: underline; }\n    :host ::slotted(a:focus)::after {\n      margin-left: var(--rhe-theme--spacer--xs, 0.25rem);\n      vertical-align: middle;\n      border-style: solid;\n      border-width: 0.313em 0.313em 0;\n      border-color: transparent;\n      border-top-color: var(--rhe-theme--link-color--focus, #004080);\n      transform: rotate(-90deg);\n      display: inline-block;\n      content: \"\";\n      position: relative;\n      display: inline-block; }\n  :host(.white) ::slotted(a) {\n    padding: 0;\n    border: 0;\n    background: none;\n    color: var(--rhe-theme--link-color--desaturated--inverted, #fff);\n    text-decoration: underline; }\n    :host(.white) ::slotted(a)::after {\n      margin-left: var(--rhe-theme--spacer--xs, 0.25rem);\n      vertical-align: middle;\n      border-style: solid;\n      border-width: 0.313em 0.313em 0;\n      border-color: transparent;\n      border-top-color: var(--rhe-theme--link-color--desaturated--inverted, #fff);\n      transform: rotate(-90deg);\n      display: inline-block;\n      content: \"\";\n      position: relative;\n      display: inline-block; }\n  :host(.black) ::slotted(a) {\n    padding: 0;\n    border: 0;\n    background: none;\n    color: var(--rhe-theme--link-color--desaturated, #1a1a1a);\n    text-decoration: underline; }\n    :host(.black) ::slotted(a)::after {\n      margin-left: var(--rhe-theme--spacer--xs, 0.25rem);\n      vertical-align: middle;\n      border-style: solid;\n      border-width: 0.313em 0.313em 0;\n      border-color: transparent;\n      border-top-color: var(--rhe-theme--link-color--desaturated, #1a1a1a);\n      transform: rotate(-90deg);\n      display: inline-block;\n      content: \"\";\n      position: relative;\n      display: inline-block; }\n\n:host([class*=\"--solid\"]) ::slotted(a),\n:host([class*=\"--outlined\"]) ::slotted(a),\n:host([class*=\"--ghost\"]) ::slotted(a) {\n  padding: var(--rhe-theme--spacer--sm, 0.5rem) var(--rhe-theme--spacer--md, 1.5rem);\n  text-decoration: none;\n  text-transform: uppercase;\n  font-weight: var(--rhe-theme--FontWeight--semi-bold, 600);\n  font-size: 0.875em; }\n  :host([class*=\"--solid\"]) ::slotted(a)::after,\n  :host([class*=\"--outlined\"]) ::slotted(a)::after,\n  :host([class*=\"--ghost\"]) ::slotted(a)::after {\n    content: none;\n    display: none; }\n\n:host([class*=\"--solid\"]) ::slotted(a) {\n  background: var(--rhe-theme--bg-color--shade3, #d2d2d2);\n  color: var(--rhe-theme--text-color--shade3, #1a1a1a);\n  border: 1px solid transparent; }\n\n:host([class*=\"--solid\"]) ::slotted(a:visited) {\n  background: var(--rhe-theme--bg-color--shade3, #d2d2d2);\n  color: var(--rhe-theme--text-color--shade3, #1a1a1a);\n  border-color: transparent; }\n\n:host([class*=\"--solid\"]) ::slotted(a:hover) {\n  background: var(--rhe-theme--bg-color--shade3, #d2d2d2);\n  color: var(--rhe-theme--text-color--shade3, #1a1a1a);\n  border-color: transparent; }\n\n:host([class*=\"--solid\"]) ::slotted(a:focus) {\n  background: var(--rhe-theme--bg-color--shade3, #d2d2d2);\n  color: var(--rhe-theme--text-color--shade3, #1a1a1a);\n  border-color: transparent; }\n\n:host([class*=\"--outlined\"]) ::slotted(a) {\n  background: transparent !important;\n  color: var(--rhe-theme--text-color--shade3, #1a1a1a);\n  border: 1px solid var(--rhe-theme--border--BorderColor, #ccc); }\n\n:host([class*=\"--outlined\"]) ::slotted(a:visited) {\n  background: transparent !important;\n  color: var(--rhe-theme--text-color--shade3, #1a1a1a);\n  border-color: var(--rhe-theme--border--BorderColor, #ccc); }\n\n:host([class*=\"--outlined\"]) ::slotted(a:hover) {\n  background: transparent !important;\n  color: var(--rhe-theme--text-color--shade3, #1a1a1a);\n  border-color: var(--rhe-theme--border--BorderColor, #ccc); }\n\n:host([class*=\"--outlined\"]) ::slotted(a:focus) {\n  background: transparent !important;\n  color: var(--rhe-theme--text-color--shade3, #1a1a1a);\n  border-color: var(--rhe-theme--border--BorderColor, #ccc); }\n\n:host([class*=\"--ghost\"]) ::slotted(a) {\n  background: transparent;\n  color: var(--rhe-theme--link-color, #06c);\n  border: 1px solid transparent; }\n\n:host([class*=\"--ghost\"]) ::slotted(a:visited) {\n  background: transparent;\n  color: var(--rhe-theme--link-color--visited, #7551a6);\n  border-color: transparent; }\n\n:host([class*=\"--ghost\"]) ::slotted(a:hover) {\n  background: var(--rhe-theme--bg-color--shade2, #e7e7e7);\n  color: var(--rhe-theme--link-color--hover, #004080);\n  border-color: transparent; }\n\n:host([class*=\"--ghost\"]) ::slotted(a:focus) {\n  background: var(--rhe-theme--bg-color--shade2, #e7e7e7);\n  color: var(--rhe-theme--link-color--focus, #004080);\n  border-color: transparent; }\n</style>\n<slot></slot>";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "rh-cta.scss";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "rh-cta.html";
      }
    }], [{
      key: "tag",
      get: function get() {
        return "rh-cta";
      }
    }]);

    function RhCta() {
      _classCallCheck(this, RhCta);

      return _possibleConstructorReturn(this, (RhCta.__proto__ || Object.getPrototypeOf(RhCta)).call(this, RhCta.tag));
    }

    _createClass(RhCta, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        _get(RhCta.prototype.__proto__ || Object.getPrototypeOf(RhCta.prototype), "connectedCallback", this).call(this);

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

    return RhCta;
  }(_rhelementUmd2.default);

  _rhelementUmd2.default.create(RhCta);

  exports.default = RhCta;
});