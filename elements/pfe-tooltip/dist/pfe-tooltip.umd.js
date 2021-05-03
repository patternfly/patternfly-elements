(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd'), require('../../pfe-absolute-position/dist/pfe-absolute-position.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd', '../../pfe-absolute-position/dist/pfe-absolute-position.umd'], factory) :
  (global = global || self, global.PfeTooltip = factory(global.PFElement, global.PfeAbsolutePosition));
}(this, (function (PFElement, PfeAbsolutePosition) { 'use strict';

  PFElement = PFElement && Object.prototype.hasOwnProperty.call(PFElement, 'default') ? PFElement['default'] : PFElement;
  PfeAbsolutePosition = PfeAbsolutePosition && Object.prototype.hasOwnProperty.call(PfeAbsolutePosition, 'default') ? PfeAbsolutePosition['default'] : PfeAbsolutePosition;

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

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

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

  /*!
   * PatternFly Elements: PfeTooltip 1.6.0
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

  function generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  var PfeTooltip = function (_PfeAbsolutePosition) {
    inherits(PfeTooltip, _PfeAbsolutePosition);
    createClass(PfeTooltip, [{
      key: "html",


      // Injected at build-time
      get: function get() {
        return "\n<style>:host{display:block;position:absolute;z-index:99999}:host([hidden]){display:none}@-webkit-keyframes keyFrameScaleUp{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes keyFrameScaleUp{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes keyFrameScaleDown{0%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(0);transform:scale(0)}}@keyframes keyFrameScaleDown{0%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(0);transform:scale(0)}}@-webkit-keyframes keyFrameFadeInOpacity{0%{opacity:0}100%{opacity:1;opacity:var(--simple-tooltip-opacity,1)}}@keyframes keyFrameFadeInOpacity{0%{opacity:0}100%{opacity:1;opacity:var(--simple-tooltip-opacity,1)}}@-webkit-keyframes keyFrameFadeOutOpacity{0%{opacity:1;opacity:var(--simple-tooltip-opacity,1)}100%{opacity:0}}@keyframes keyFrameFadeOutOpacity{0%{opacity:1;opacity:var(--simple-tooltip-opacity,1)}100%{opacity:0}}@-webkit-keyframes keyFrameSlideDownIn{0%{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0}10%{opacity:.2}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1)}}@keyframes keyFrameSlideDownIn{0%{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0}10%{opacity:.2}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1)}}@-webkit-keyframes keyFrameSlideDownOut{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1)}10%{opacity:.2}100%{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0}}@keyframes keyFrameSlideDownOut{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1)}10%{opacity:.2}100%{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0}}.fade-in-animation{opacity:0;-webkit-animation-delay:0s;animation-delay:0s;-webkit-animation-delay:var(--simple-tooltip-delay-in,0ms);animation-delay:var(--simple-tooltip-delay-in,0ms);-webkit-animation-name:keyFrameFadeInOpacity;animation-name:keyFrameFadeInOpacity;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-duration:.1s;animation-duration:.1s;-webkit-animation-duration:var(--simple-tooltip-duration-in,100ms);animation-duration:var(--simple-tooltip-duration-in,100ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.fade-out-animation{opacity:1;opacity:var(--simple-tooltip-opacity,1);-webkit-animation-delay:0s;animation-delay:0s;-webkit-animation-delay:var(--simple-tooltip-delay-out,0ms);animation-delay:var(--simple-tooltip-delay-out,0ms);-webkit-animation-name:keyFrameFadeOutOpacity;animation-name:keyFrameFadeOutOpacity;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-duration:.1s;animation-duration:.1s;-webkit-animation-duration:var(--simple-tooltip-duration-out,100ms);animation-duration:var(--simple-tooltip-duration-out,100ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.scale-up-animation{-webkit-transform:scale(0);transform:scale(0);opacity:1;opacity:var(--simple-tooltip-opacity,1);-webkit-animation-delay:.5s;animation-delay:.5s;-webkit-animation-delay:var(--simple-tooltip-delay-in,500ms);animation-delay:var(--simple-tooltip-delay-in,500ms);-webkit-animation-name:keyFrameScaleUp;animation-name:keyFrameScaleUp;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:var(--simple-tooltip-duration-in,500ms);animation-duration:var(--simple-tooltip-duration-in,500ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.scale-down-animation{-webkit-transform:scale(1);transform:scale(1);opacity:1;opacity:var(--simple-tooltip-opacity,1);-webkit-animation-delay:.5s;animation-delay:.5s;-webkit-animation-delay:var(--simple-tooltip-delay-out,500ms);animation-delay:var(--simple-tooltip-delay-out,500ms);-webkit-animation-name:keyFrameScaleDown;animation-name:keyFrameScaleDown;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:var(--simple-tooltip-duration-out,500ms);animation-duration:var(--simple-tooltip-duration-out,500ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.slide-down-animation{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0;-webkit-animation-delay:.5s;animation-delay:.5s;-webkit-animation-delay:var(--simple-tooltip-delay-out,500ms);animation-delay:var(--simple-tooltip-delay-out,500ms);-webkit-animation-name:keyFrameSlideDownIn;animation-name:keyFrameSlideDownIn;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1);-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:var(--simple-tooltip-duration-out,500ms);animation-duration:var(--simple-tooltip-duration-out,500ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.slide-down-animation-out{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1);-webkit-animation-delay:.5s;animation-delay:.5s;-webkit-animation-delay:var(--simple-tooltip-delay-out,500ms);animation-delay:var(--simple-tooltip-delay-out,500ms);-webkit-animation-name:keyFrameSlideDownOut;animation-name:keyFrameSlideDownOut;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:cubic-bezier(.4,0,1,1);animation-timing-function:cubic-bezier(.4,0,1,1);-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:var(--simple-tooltip-duration-out,500ms);animation-duration:var(--simple-tooltip-duration-out,500ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.cancel-animation{-webkit-animation-delay:-30s!important;animation-delay:-30s!important}.hidden{display:none!important}.pf-c-tooltip{position:relative;position:var(--pfe-tooltip--Position,relative);max-width:300px;max-width:var(--pfe-tooltip--MaxWidth,300px);-webkit-box-shadow:rgba(3,3,3,.12) 0 4px 8px 0,rgba(3,3,3,.06) 0 0 4px;box-shadow:rgba(3,3,3,.12) 0 4px 8px 0,rgba(3,3,3,.06) 0 0 4px;-webkit-box-shadow:var(--pfe-tooltip--BoxShadow,rgba(3,3,3,.12) 0 4px 8px 0,rgba(3,3,3,.06) 0 0 4px);box-shadow:var(--pfe-tooltip--BoxShadow,rgba(3,3,3,.12) 0 4px 8px 0,rgba(3,3,3,.06) 0 0 4px)}.pf-c-tooltip.pf-m-top{-webkit-transform:translateY(calc(-1 * (8px + 9px)));transform:translateY(calc(-1 * (8px + 9px)));-webkit-transform:var(--pfe-tooltip__offset-top--Transform,translateY(calc(-1 * (8px + 9px))));transform:var(--pfe-tooltip__offset-top--Transform,translateY(calc(-1 * (8px + 9px))))}.pf-c-tooltip.pf-m-top .pf-c-tooltip__arrow{bottom:0;bottom:var(--pfe-tooltip__arrow--top--Bottom,0);left:50%;left:var(--pfe-tooltip__arrow--top--Left,50%);-webkit-transform:translate(-50%,50%) rotate(45deg);transform:translate(-50%,50%) rotate(45deg);-webkit-transform:var(--pfe-tooltip__arrow--top--Transform,translate(-50%,50%) rotate(45deg));transform:var(--pfe-tooltip__arrow--top--Transform,translate(-50%,50%) rotate(45deg))}.pf-c-tooltip.pf-m-bottom{-webkit-transform:translateY(calc(1 * (8px + 9px)));transform:translateY(calc(1 * (8px + 9px)));-webkit-transform:var(--pfe-tooltip__offset-bottom--Transform,translateY(calc(1 * (8px + 9px))));transform:var(--pfe-tooltip__offset-bottom--Transform,translateY(calc(1 * (8px + 9px))))}.pf-c-tooltip.pf-m-bottom .pf-c-tooltip__arrow{left:50%;left:var(--pfe-tooltip__arrow--bottom--Left,50%);bottom:var(--pfe-tooltip__arrow--bottom--Bottom);-webkit-transform:translate(-50%,-50%) rotate(45deg);transform:translate(-50%,-50%) rotate(45deg);-webkit-transform:var(--pfe-tooltip__arrow--bottom--Transform,translate(-50%,-50%) rotate(45deg));transform:var(--pfe-tooltip__arrow--bottom--Transform,translate(-50%,-50%) rotate(45deg))}.pf-c-tooltip.pf-m-left{-webkit-transform:translateX(calc(-1 * (8px + 9px)));transform:translateX(calc(-1 * (8px + 9px)));-webkit-transform:var(--pfe-tooltip__offset-left--Transform,translateX(calc(-1 * (8px + 9px))));transform:var(--pfe-tooltip__offset-left--Transform,translateX(calc(-1 * (8px + 9px))))}.pf-c-tooltip.pf-m-left .pf-c-tooltip__arrow{top:50%;top:var(--pfe-tooltip__arrow--left--Top,50%);right:0;right:var(--pfe-tooltip__arrow--left--Right,0);-webkit-transform:translate(50%,-50%) rotate(45deg);transform:translate(50%,-50%) rotate(45deg);-webkit-transform:var(--pfe-tooltip__arrow--left--Transform,translate(50%,-50%) rotate(45deg));transform:var(--pfe-tooltip__arrow--left--Transform,translate(50%,-50%) rotate(45deg))}.pf-c-tooltip.pf-m-right{-webkit-transform:translateX(calc(1 * (8px + 9px)));transform:translateX(calc(1 * (8px + 9px)));-webkit-transform:var(--pfe-tooltip__offset-right--Transform,translateX(calc(1 * (8px + 9px))));transform:var(--pfe-tooltip__offset-right--Transform,translateX(calc(1 * (8px + 9px))))}.pf-c-tooltip.pf-m-right .pf-c-tooltip__arrow{left:0;left:var(--pfe-tooltip__arrow--right--Left,0);top:50%;top:var(--pfe-tooltip__arrow--right--Top,50%);-webkit-transform:translate(-50%,-50%) rotate(45deg);transform:translate(-50%,-50%) rotate(45deg);-webkit-transform:var(--pfe-tooltip__arrow--right--Transform,translate(-50%,-50%) rotate(45deg));transform:var(--pfe-tooltip__arrow--right--Transform,translate(-50%,-50%) rotate(45deg))}.pf-c-tooltip__content{position:relative;position:var(--pfe-tooltip__content--Position,relative);padding-top:16px;padding-top:var(--pfe-tooltip__content--PaddingTop,16px);padding-bottom:16px;padding-bottom:var(--pfe-tooltip__content--PaddingBottom,16px);padding-left:16px;padding-left:var(--pfe-tooltip__content--PaddingLeft,16px);padding-right:16px;padding-right:var(--pfe-tooltip__content--PaddingRight,16px);font-size:14px;font-size:var(--pfe-tooltip__content--FontSize,14px);color:#fff;color:var(--pfe-tooltip--Color,#fff);background-color:#151515;background-color:var(--pfe-tooltip--BackgroundColor,#151515);text-align:center;text-align:var(--pfe-tooltip__content--TextAlign,center);word-break:break-word;word-break:var(--pfe-tooltip__content--WordBreak,break-word);border-radius:0;border-radius:var(--pfe-tooltip__content--BorderRadius,0)}.pf-c-tooltip__content.pf-m-text-align-left{text-align:left;text-align:var(--pfe-tooltip__content--left--TextAlign,left)}.pf-c-tooltip__arrow{position:absolute;position:var(--pfe-tooltip__arrow--Postion,absolute);width:15px;width:var(--pfe-tooltip__arrow--Width,15px);height:15px;height:var(--pfe-tooltip__arrow--Height,15px);pointer-events:var(--pfe-tooltip--PointerEvents);background-color:#151515;background-color:var(--pfe-tooltip--BackgroundColor,#151515)}:host([theme=dark]){--pfe-tooltip--Color:#151515;--pfe-tooltip--BackgroundColor:#fff;--pfe-tooltip--BoxShadow:var(--pfe-tooltip--BoxShadow--dark, none)} /*# sourceMappingURL=pfe-tooltip.min.css.map */</style>\n<div id=\"tooltip\" class=\"pf-c-tooltip pf-m-" + this.position + " hidden\">\n    <div class=\"pf-c-tooltip__arrow\"></div>\n    <div class=\"pf-c-tooltip__content\" id=\"tooltip-top-content\">\n        <slot></slot>\n    </div>\n</div>";
      }
    }, {
      key: "templateUrl",
      get: function get() {
        return "pfe-tooltip.html";
      }
    }, {
      key: "styleUrl",
      get: function get() {
        return "pfe-tooltip.scss";
      }

      // Declare the type of this component

    }], [{
      key: "version",


      // Injected at build-time
      get: function get() {
        return "1.6.0";
      }
    }, {
      key: "tag",
      get: function get() {
        return "pfe-tooltip";
      }
    }, {
      key: "meta",
      get: function get() {
        return {
          title: "Tooltip",
          description: "A tooltip is in-app messaging used to identify elements on a page with short, clarifying text."
        };
      }
    }, {
      key: "PfeType",
      get: function get() {
        return PFElement.PfeTypes.Content;
      }
    }, {
      key: "properties",
      get: function get$1() {
        return _extends({}, get(PfeTooltip.__proto__ || Object.getPrototypeOf(PfeTooltip), "properties", this), {
          theme: { type: String, default: "light" },
          /**
           * Define the aria-label for the target element.
           */
          label: { type: String }
        });
      }
    }]);

    function PfeTooltip() {
      classCallCheck(this, PfeTooltip);

      var _this = possibleConstructorReturn(this, (PfeTooltip.__proto__ || Object.getPrototypeOf(PfeTooltip)).call(this, PfeTooltip, { type: PfeTooltip.PfeType }));

      _this.auto = true;
      _this.id = _this.id || PfeTooltip.tag + "-" + generateId();
      _this.label = "More information";
      return _this;
    }

    // When the target is found we are going to make sure it has the correct a11y settings


    createClass(PfeTooltip, [{
      key: "targetUpdated",
      value: function targetUpdated(target) {
        get(PfeTooltip.prototype.__proto__ || Object.getPrototypeOf(PfeTooltip.prototype), "targetUpdated", this).call(this, target);
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "0");
        // We need to set aria-label in addition to aria-describedby
        if (!target.hasAttribute("aria-label")) target.setAttribute("aria-label", this.label);
        target.setAttribute("aria-describedby", this.id);
      }
    }]);
    return PfeTooltip;
  }(PfeAbsolutePosition);

  PFElement.create(PfeTooltip);

  return PfeTooltip;

})));
//# sourceMappingURL=pfe-tooltip.umd.js.map
