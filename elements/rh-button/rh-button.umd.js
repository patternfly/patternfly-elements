(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("RhButton", ["exports", "../rhelement/rhelement.umd.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../rhelement/rhelement.umd.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.RHElement);
    global.RHElement = global.RHElement || {};
    global.RHElement.RhButton = mod.exports;
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

  var RhButton = function (_RHElement) {
    _inherits(RhButton, _RHElement);

    _createClass(RhButton, [{
      key: "html",
      get: function get() {
        return "\n<style>\n:host {\n  display: inline-block; }\n\n:host button {\n  padding: 0 var(--rhe-theme--spacer, 1rem);\n  font-size: var(--rhe-theme--FontSize, 16px);\n  line-height: var(--rhe-theme--spacer--lg, 2rem);\n  border: 1px solid transparent;\n  cursor: pointer;\n  border-radius: var(--rhe-theme--button-border--BorderRadius, 2px);\n  background: var(--rh-button--theme--default-color--Background, #e7e7e7);\n  color: var(--rh-button--theme--default-color--Color, #333); }\n\n:host button:hover {\n  background: var(--rh-button--theme--default-color--hover--Background, #bebebe);\n  color: var(--rh-button--theme--default-color--hover--Color, #333); }\n\n:host(.primary) button {\n  background: var(--rh-button--theme--primary-color--Background, #0076e0);\n  color: var(--rh-button--theme--primary-color--Color, #fff); }\n\n:host(.primary) button:hover {\n  background: var(--rh-button--theme--primary-color--hover--Background, #004080);\n  color: var(--rh-button--theme--primary-color--hover--Color, #fff); }\n</style>\n<button><slot></slot></button>";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "rh-button.scss";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "rh-button.html";
      }
    }], [{
      key: "tag",
      get: function get() {
        return "rh-button";
      }
    }]);

    function RhButton() {
      _classCallCheck(this, RhButton);

      var _this = _possibleConstructorReturn(this, (RhButton.__proto__ || Object.getPrototypeOf(RhButton)).call(this, RhButton.tag));

      console.log("creating rh-button");
      return _this;
    }

    return RhButton;
  }(_rhelementUmd2.default);

  _rhelementUmd2.default.create(RhButton);

  exports.default = RhButton;
});