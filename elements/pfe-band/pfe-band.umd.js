!function(e,a){"object"==typeof exports&&"undefined"!=typeof module?module.exports=a(require("../pfelement/pfelement.umd")):"function"==typeof define&&define.amd?define(["../pfelement/pfelement.umd"],a):e.PfeBand=a(e.PFElement)}(this,function(a){"use strict";a=a&&a.hasOwnProperty("default")?a.default:a;var n=function(){function t(e,a){for(var n=0;n<a.length;n++){var t=a[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}return function(e,a,n){return a&&t(e.prototype,a),n&&t(e,n),e}}(),o=function e(a,n,t){null===a&&(a=Function.prototype);var r=Object.getOwnPropertyDescriptor(a,n);if(void 0===r){var o=Object.getPrototypeOf(a);return null===o?void 0:e(o,n,t)}if("value"in r)return r.value;var i=r.get;return void 0!==i?i.call(t):void 0},e=function(e){function r(){return function(e,a){if(!(e instanceof a))throw new TypeError("Cannot call a class as a function")}(this,r),function(e,a){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!a||"object"!=typeof a&&"function"!=typeof a?e:a}(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,r,{type:r.PfeType}))}return function(e,a){if("function"!=typeof a&&null!==a)throw new TypeError("Super expression must either be null or a function, not "+typeof a);e.prototype=Object.create(a&&a.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),a&&(Object.setPrototypeOf?Object.setPrototypeOf(e,a):e.__proto__=a)}(r,a),n(r,[{key:"html",get:function(){return'<style>:host {\n  display: block;\n  --pfe-band--padding__vertical:               calc( var(--pfe-theme--container-spacer, 1rem) * 4);\n  --pfe-band--padding__horizontal:             calc( var(--pfe-theme--container-spacer, 1rem) * 1);\n  --pfe-band--padding:                         var(--pfe-band--padding__vertical)  var(--pfe-band--padding__horizontal);\n  --pfe-band--backgroundColor:                 var(--pfe-theme--color--surface--base, #dfdfdf);\n  --pfe-band--backgroundPosition:              center center;\n  --pfe-band--border:                          var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) transparent;\n  --pfe-band--layout:                          1fr;\n  --pfe-band_header--layout:                   1fr;\n  --pfe-band_body--layout:                     1fr;\n  --pfe-band_footer--layout:                   1fr;\n  --pfe-band_aside--layout:                    1fr;\n  --pfe-band--gridTemplateArea_layer1: "header";\n  --pfe-band--gridTemplateArea_layer2: "main" "aside";\n  --pfe-band--gutter:                          calc(var(--pfe-theme--container-spacer, 1rem) * 2);\n  --pfe-broadcasted--color--text:              var(--pfe-theme--color--surface--base--text, #333);\n  --pfe-broadcasted--color--ui-link:           var(--pfe-theme--color--surface--base--link, #00538c);\n  --pfe-broadcasted--color--ui-link--visited:  var(--pfe-theme--color--surface--base--link--visited, #7551a6);\n  --pfe-broadcasted--color--ui-link--hover:    var(--pfe-theme--color--surface--base--link--hover, #00305b);\n  --pfe-broadcasted--color--ui-link--focus:    var(--pfe-theme--color--surface--base--link--focus, #00305b);\n  --pfe-band--width: auto;\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  justify-items: flex-start;\n  padding: calc(var(--pfe-band--padding__vertical) / 2) var(--pfe-band--padding__horizontal);\n  border: var(--pfe-band--border);\n  background-color: var(--pfe-band--backgroundColor);\n  background-position: var(--pfe-band--backgroundPosition);\n  color: var(--pfe-broadcasted--color--text); }\n  @media screen and (min-width: 768px) {\n    :host {\n      --pfe-band--width: calc( 768px - calc(var(--pfe-band--padding__horizontal) * 4) ); } }\n  @media screen and (min-width: 992px) {\n    :host {\n      --pfe-band--width: calc( 992px - calc(var(--pfe-band--padding__horizontal) * 4) ); } }\n  @media screen and (min-width: 1200px) {\n    :host {\n      --pfe-band--width: calc( 1200px - calc(var(--pfe-band--padding__horizontal) * 4) ); } }\n  @media print {\n    :host {\n      --pfe-band--padding: calc(var(--pfe-band--padding__vertical) / 2) var(--pfe-band--padding__horizontal); } }\n  @media (min-width: 576px) {\n    :host {\n      padding: var(--pfe-band--padding); } }\n  @media print {\n    :host {\n      background-color: white !important;\n      background-image: none !important;\n      box-shadow: none !important; } }\n  :host *, :host *::before, :host *::after {\n    box-sizing: border-box; }\n\n:host([pfe-color="darker"]) {\n  --pfe-band--backgroundColor:                  var(--pfe-theme--color--surface--darker, #464646);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darker--text, #fff);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darker--link, #99ccff);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darker--link--visited, #b38cd9);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darker--link--hover, #cce6ff);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darker--link--focus, #cce6ff); }\n\n:host([pfe-color="darkest"]) {\n  --pfe-band--backgroundColor:                  var(--pfe-theme--color--surface--darkest, #131313);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--darkest--text, #fff);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--darkest--link, #99ccff);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--darkest--link--visited, #b38cd9);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--darkest--link--hover, #cce6ff);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--darkest--link--focus, #cce6ff); }\n\n:host([pfe-color="accent"]) {\n  --pfe-band--backgroundColor:                  var(--pfe-theme--color--surface--accent, #fe460d);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--accent--text, #fff);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--accent--link, #99ccff);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--accent--link--visited, #b38cd9);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--accent--link--hover, #cce6ff);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--accent--link--focus, #cce6ff); }\n\n:host([pfe-color="complement"]) {\n  --pfe-band--backgroundColor:                  var(--pfe-theme--color--surface--complement, #0477a4);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--complement--text, #fff);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--complement--link, #99ccff);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--complement--link--visited, #b38cd9);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--complement--link--hover, #cce6ff);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--complement--link--focus, #cce6ff); }\n\n:host([pfe-color="lighter"]) {\n  --pfe-band--backgroundColor:                  var(--pfe-theme--color--surface--lighter, #ececec);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lighter--text, #333);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lighter--link, #06c);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lighter--link--visited, rebeccapurple);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lighter--link--hover, #003366);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lighter--link--focus, #003366); }\n\n:host([pfe-color="lightest"]) {\n  --pfe-band--backgroundColor:                  var(--pfe-theme--color--surface--lightest, #fff);\n  --pfe-broadcasted--color--text:               var(--pfe-theme--color--surface--lightest--text, #333);\n  --pfe-broadcasted--color--ui-link:            var(--pfe-theme--color--surface--lightest--link, #06c);\n  --pfe-broadcasted--color--ui-link--visited:   var(--pfe-theme--color--surface--lightest--link--visited, rebeccapurple);\n  --pfe-broadcasted--color--ui-link--hover:     var(--pfe-theme--color--surface--lightest--link--hover, #003366);\n  --pfe-broadcasted--color--ui-link--focus:     var(--pfe-theme--color--surface--lightest--link--focus, #003366); }\n\n:host([pfe-size="small"]) {\n  --pfe-band--padding:   calc(var(--pfe-band--padding__vertical) / 4)  var(--pfe-band--padding__horizontal); }\n\n.pfe-band__header:not(:last-child) {\n  margin-bottom: var(--pfe-theme--container-spacer, 1rem); }\n\n.pfe-band__container {\n  --pfe-band_region--width: calc(1fr - 240px - calc(var(--pfe-theme--container-spacer, 1rem) * 2));\n  position: relative;\n  margin: 0 auto;\n  max-width: var(--pfe-band--width);\n  display: flex;\n  flex-flow: row wrap;\n  align-items: flex-start;\n  justify-content: space-between; }\n  @supports (display: grid) {\n    .pfe-band__container {\n      display: grid;\n      grid-gap: var(--pfe-theme--container-spacer, 1rem) calc(var(--pfe-theme--container-spacer, 1rem) * 4);\n      grid-template-columns: var(--pfe-band--layout);\n      grid-template-rows: max-content;\n      grid-template-areas: var(--pfe-band--gridTemplateArea_layer1) var(--pfe-band--gridTemplateArea_layer2); }\n      .pfe-band__container[pfe-aside-mobile="top"] {\n        --pfe-band--gridTemplateArea_layer1: "aside" "header";\n        --pfe-band--gridTemplateArea_layer2: "main"; }\n      .pfe-band__container[pfe-aside-height="full"] {\n        --pfe-band--gridTemplateArea_layer2: "main" "aside"; }\n        .pfe-band__container[pfe-aside-height="full"][pfe-aside-mobile="top"] {\n          --pfe-band--gridTemplateArea_layer1: "aside";\n          --pfe-band--gridTemplateArea_layer2: "main"; }\n      @media (min-width: 768px) {\n        .pfe-band__container {\n          --pfe-band--layout: 1fr 240px;\n          --pfe-band--gridTemplateArea_layer1: "header header";\n          --pfe-band--gridTemplateArea_layer2: "main aside"; }\n          .pfe-band__container[pfe-aside-mobile="top"] {\n            --pfe-band--gridTemplateArea_layer1: "header header";\n            --pfe-band--gridTemplateArea_layer2: "main aside"; }\n          .pfe-band__container[pfe-aside-desktop="left"] {\n            --pfe-band--layout: 240px 1fr;\n            --pfe-band--gridTemplateArea_layer2: "aside main"; }\n          .pfe-band__container[pfe-aside-height="full"] {\n            --pfe-band--gridTemplateArea_layer1: "aside";\n            --pfe-band--gridTemplateArea_layer2: "main"; }\n            .pfe-band__container[pfe-aside-height="full"][pfe-aside-mobile="bottom"], .pfe-band__container[pfe-aside-height="full"][pfe-aside-mobile="top"] {\n              --pfe-band--gridTemplateArea_layer1: "main aside";\n              --pfe-band--gridTemplateArea_layer2: "main aside"; }\n            .pfe-band__container[pfe-aside-height="full"][pfe-aside-desktop="left"] {\n              --pfe-band--gridTemplateArea_layer1: "aside main";\n              --pfe-band--gridTemplateArea_layer2: "aside main"; } }\n      @media (min-width: 992px) {\n        .pfe-band__container {\n          --pfe-band--layout: 1fr 300px; }\n          .pfe-band__container[pfe-aside-desktop="left"] {\n            --pfe-band--layout: 300px 1fr; } } }\n\n.pfe-band__header {\n  display: flex;\n  flex-flow: column nowrap; }\n\n.pfe-band__body {\n  display: flex;\n  flex-flow: column nowrap; }\n\n.pfe-band__footer {\n  display: flex;\n  flex-flow: column nowrap; }\n\n.pfe-band__aside {\n  display: flex;\n  flex-flow: column nowrap; }\n\n@media (min-width: 768px) {\n  .pfe-band__container[pfe-aside-desktop="left"], .pfe-band__container[pfe-aside-mobile="top"] {\n    flex-direction: row-reverse; }\n  .pfe-band__main {\n    display: flex;\n    flex-flow: column nowrap;\n    width: var(--pfe-band_region--width); }\n    .pfe-band__main > *:not(:last-child) {\n      margin-bottom: var(--pfe-theme--container-spacer, 1rem); }\n  .pfe-band__header {\n    order: -1; }\n  .pfe-band__body > *::slotted(*:not(:last-child)) {\n    margin-bottom: var(--pfe-theme--container-spacer, 1rem); }\n  .pfe-band__aside {\n    order: 1;\n    width: 240px; }\n    [pfe-aside-desktop="right"] .pfe-band__aside {\n      order: 0; } }\n\n@media (min-width: 992px) {\n  .pfe-band__aside {\n    width: 300px; } }\n\n.pfe-band__header {\n  display: flex;\n  flex-flow: column nowrap; }\n  @supports (display: grid) {\n    .pfe-band__header {\n      display: grid;\n      grid-gap: var(--pfe-theme--container-spacer, 1rem);\n      grid-template-columns: var(--pfe-band_header--layout);\n      grid-template-rows: max-content; } }\n  .pfe-band__header > *::slotted(*) {\n    margin: 0; }\n  .pfe-band__header > *:not(:last-child)::slotted(*) {\n    margin-bottom: var(--pfe-theme--container-spacer, 1rem); }\n\n.pfe-band__body {\n  display: flex;\n  flex-flow: column nowrap; }\n  @supports (display: grid) {\n    .pfe-band__body {\n      display: grid;\n      grid-gap: var(--pfe-theme--container-spacer, 1rem);\n      grid-template-columns: var(--pfe-band_body--layout);\n      grid-template-rows: max-content; } }\n  .pfe-band__body > *::slotted(*) {\n    margin: 0; }\n  .pfe-band__body > *:not(:last-child)::slotted(*) {\n    margin-bottom: var(--pfe-theme--container-spacer, 1rem); }\n\n.pfe-band__footer {\n  display: flex;\n  flex-flow: column nowrap; }\n  @supports (display: grid) {\n    .pfe-band__footer {\n      display: grid;\n      grid-gap: var(--pfe-theme--container-spacer, 1rem);\n      grid-template-columns: var(--pfe-band_footer--layout);\n      grid-template-rows: max-content; } }\n  .pfe-band__footer > *::slotted(*) {\n    margin: 0; }\n  .pfe-band__footer > *:not(:last-child)::slotted(*) {\n    margin-bottom: var(--pfe-theme--container-spacer, 1rem); }\n\n.pfe-band__aside {\n  display: flex;\n  flex-flow: column nowrap; }\n  @supports (display: grid) {\n    .pfe-band__aside {\n      display: grid;\n      grid-gap: var(--pfe-theme--container-spacer, 1rem);\n      grid-template-columns: var(--pfe-band_aside--layout);\n      grid-template-rows: max-content; } }\n  .pfe-band__aside > *::slotted(*) {\n    margin: 0; }\n  .pfe-band__aside > *:not(:last-child)::slotted(*) {\n    margin-bottom: var(--pfe-theme--container-spacer, 1rem); }\n\n@media (min-width: 0) {\n  @supports (display: grid) {\n    .pfe-band__header {\n      grid-area: header;\n      width: auto; }\n    .pfe-band__main {\n      grid-area: main;\n      width: auto; }\n    .pfe-band__aside {\n      grid-area: aside;\n      width: auto; } } }</style>\n<section class="pfe-band__container">\n  '+(this.has_slot("pfe-band-aside")&&"top"===this.asidePosition.mobile?'<div class="pfe-band__aside"><slot name="pfe-band-aside"></slot></div>':"")+"\n  "+(this.has_slot("pfe-band-aside")&&"full"===this.asidePosition.height?'<div class="pfe-band__main">':"")+"\n  "+(this.has_slot("pfe-band-header")?'<slot class="pfe-band__header" name="pfe-band-header"></slot>':"")+"\n  "+(this.has_slot("pfe-band-aside")&&"full"!==this.asidePosition.height?'<div class="pfe-band__main">':"")+'\n    <div class="pfe-band__body"><slot></slot></div>\n    '+(this.has_slot("pfe-band-footer")?'<div class="pfe-band__footer"><slot name="pfe-band-footer"></slot></div>':"")+"\n    "+(this.has_slot("pfe-band-aside")?"</div>":"")+"\n  "+(this.has_slot("pfe-band-aside")&&"top"!==this.asidePosition.mobile?'<div class="pfe-band__aside"><slot name="pfe-band-aside"></slot></div>':"")+"\n</section>"}},{key:"schemaUrl",get:function(){return"pfe-band.json"}},{key:"templateUrl",get:function(){return"pfe-band.html"}},{key:"styleUrl",get:function(){return"pfe-band.scss"}},{key:"asidePosition",get:function(){return{desktop:this.getAttribute("pfe-aside-desktop"),mobile:this.getAttribute("pfe-aside-mobile"),height:this.getAttribute("pfe-aside-height")}}}],[{key:"properties",get:function(){return{"pfe-color":{title:"Background color",type:"string",enum:["lightest","lighter","base","darker","darkest","complement","accent"],default:"base",observer:"_colorChanged"},"pfe-img-src":{title:"Background image",type:"string",default:"",observer:"_imgSrcChanged"},"pfe-aside-desktop":{title:"Aside positioning (desktop)",type:"string",default:"right",enum:["right","left"],observer:"_basicAttributeChanged"},"pfe-aside-mobile":{title:"Aside positioning (mobile)",type:"string",default:"bottom",enum:["top","bottom"],observer:"_basicAttributeChanged"},"pfe-aside-height":{title:"Aside height",type:"string",default:"body",enum:["full","body"],observer:"_basicAttributeChanged"}}}},{key:"slots",get:function(){return{"pfe-band-header":{title:"Header",type:"array",namedSlot:!0,maxItems:3,items:{title:"Body item",oneOf:[{$ref:"raw"}]}},"pfe-band-body":{title:"Body",type:"array",namedSlot:!1,items:{oneOf:[{$ref:"pfe-card"},{$ref:"raw"}]}},"pfe-band-footer":{title:"Footer",type:"array",namedSlot:!0,maxItems:3,items:{oneOf:[{$ref:"pfe-cta"},{$ref:"raw"}]}},"pfe-band-aside":{title:"Aside",type:"array",namedSlot:!0,maxItems:5,items:{oneOf:[{$ref:"pfe-card"},{$ref:"raw"}]}}}}},{key:"tag",get:function(){return"pfe-band"}},{key:"observedAttributes",get:function(){return["pfe-aside-desktop","pfe-aside-mobile","pfe-aside-height","pfe-color","pfe-img-src"]}},{key:"cascadingAttributes",get:function(){return{"pfe-aside-desktop":".pfe-band__container","pfe-aside-mobile":".pfe-band__container","pfe-aside-height":".pfe-band__container"}}},{key:"PfeType",get:function(){return a.PfeTypes.Container}}]),n(r,[{key:"connectedCallback",value:function(){o(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"connectedCallback",this).call(this)}},{key:"attributeChangedCallback",value:function(e,a,n){if(o(r.prototype.__proto__||Object.getPrototypeOf(r.prototype),"attributeChangedCallback",this).call(this,e,a,n),this[e]&&this[e].observer){var t=this[this[e].observer].bind(this);"function"==typeof t&&t(e,a,n)}}},{key:"_basicAttributeChanged",value:function(e,a,n){this[e].value=n}},{key:"_colorChanged",value:function(e,a,n){this[e].value=n,this._updateContext(n)}},{key:"_imgSrcChanged",value:function(e,a,n){this.style.backgroundImage=n?"url('"+n+"')":""}},{key:"_updateContext",value:function(e){var n=this;["darkest","darker","complement","accent"].includes(e)&&["pfe-cta"].forEach(function(e){[].concat(function(e){if(Array.isArray(e)){for(var a=0,n=Array(e.length);a<e.length;a++)n[a]=e[a];return n}return Array.from(e)}(n.querySelectorAll(""+e))).forEach(function(e){var a=e.closest("[pfe-type='container']");a!==n&&null!==a||e.setAttribute("on","dark")})})}}]),r}();return a.create(e),e});
//# sourceMappingURL=pfe-band.umd.js.map
