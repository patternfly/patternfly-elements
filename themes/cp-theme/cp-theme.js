import "./scoping-shim.min.js";
import "./apply-shim.min.js";
import "./custom-style-interface.min.js";

(function() {
  const templateId = "cp-theme";

  if (document.getElementById(templateId)) {
    return;
  }

  const cpthemeTemplate = document.createElement("div");

  cpthemeTemplate.setAttribute("style", "display: none;");
  cpthemeTemplate.setAttribute("id", templateId);
  cpthemeTemplate.innerHTML = `<style id="${templateId}-style">:root {
  --rh-theme--color--text: #6e6e6e;
  --rh-theme--color--text--on-dark: #fff;
  --rh-theme--color--text--on-saturated: #fff;
  --rh-theme--color--heading: #252527;
  --rh-theme--color--heading--on-dark: #fff;
  --rh-theme--color--heading--on-saturated: #fff;
  --rh-theme--color--ui-link: #06c;
  --rh-theme--color--ui-link--visited: #7551a6;
  --rh-theme--color--ui-link--hover: #004080;
  --rh-theme--color--ui-link--focus: #004080;
  --rh-theme--color--ui-link--on-dark: #73bcf7;
  --rh-theme--color--ui-link--on-dark--visited: #967abd;
  --rh-theme--color--ui-link--on-dark--hover: #2b9af3;
  --rh-theme--color--ui-link--on-dark--focus: #2b9af3;
  --rh-theme--color--ui-link--on-saturated: #73bcf7;
  --rh-theme--color--ui-link--on-saturated--visited: #967abd;
  --rh-theme--color--ui-link--on-saturated--hover: #2b9af3;
  --rh-theme--color--ui-link--on-saturated--focus: #2b9af3;
  --rh-theme--color--ui-base: #0076e0;
  --rh-theme--color--ui-base--hover: #004080;
  --rh-theme--color--ui-base--text: #fff;
  --rh-theme--color--ui-base--text--hover: #fff;
  --rh-theme--color--ui-complement: #464646;
  --rh-theme--color--ui-complement--hover: #1e1e1e;
  --rh-theme--color--ui-complement--text: #fff;
  --rh-theme--color--ui-complement--text--hover: #fff;
  --rh-theme--color--ui-accent: #c00;
  --rh-theme--color--ui-accent--hover: #820000;
  --rh-theme--color--ui-accent--text: #fff;
  --rh-theme--color--ui-accent--text--hover: #fff;
  --rh-theme--color--ui-disabled: #d2d2d2;
  --rh-theme--color--ui-disabled--hover: #d2d2d2;
  --rh-theme--color--ui-disabled--text: #aaa;
  --rh-theme--color--ui-disabled--text--hover: #aaa;
  --rh-theme--color--surface--lightest: #fff;
  --rh-theme--color--surface--lightest--text: #6e6e6e;
  --rh-theme--color--surface--lightest--link: #06c;
  --rh-theme--color--surface--lightest--link--visited: #7551a6;
  --rh-theme--color--surface--lightest--link--hover: #004080;
  --rh-theme--color--surface--lightest--link--focus: #004080;
  --rh-theme--color--surface--lighter: #f0f0f0;
  --rh-theme--color--surface--lighter--text: #6e6e6e;
  --rh-theme--color--surface--lighter--link: #06c;
  --rh-theme--color--surface--lighter--link--visited: #7551a6;
  --rh-theme--color--surface--lighter--link--hover: #004080;
  --rh-theme--color--surface--lighter--link--focus: #004080;
  --rh-theme--color--surface--base: #d2d2d2;
  --rh-theme--color--surface--base--text: #6e6e6e;
  --rh-theme--color--surface--base--link: #06c;
  --rh-theme--color--surface--base--link--visited: #7551a6;
  --rh-theme--color--surface--base--link--hover: #004080;
  --rh-theme--color--surface--base--link--focus: #004080;
  --rh-theme--color--surface--darker: #464646;
  --rh-theme--color--surface--darker--text: #fff;
  --rh-theme--color--surface--darker--link: #73bcf7;
  --rh-theme--color--surface--darker--link--visited: #967abd;
  --rh-theme--color--surface--darker--link--hover: #2b9af3;
  --rh-theme--color--surface--darker--link--focus: #2b9af3;
  --rh-theme--color--surface--darkest: #1e1e1e;
  --rh-theme--color--surface--darkest--text: #fff;
  --rh-theme--color--surface--darkest--link: #73bcf7;
  --rh-theme--color--surface--darkest--link--visited: #967abd;
  --rh-theme--color--surface--darkest--link--hover: #2b9af3;
  --rh-theme--color--surface--darkest--link--focus: #2b9af3;
  --rh-theme--color--surface--complement: #264a60;
  --rh-theme--color--surface--complement--text: #fff;
  --rh-theme--color--surface--complement--link: #fff;
  --rh-theme--color--surface--complement--link--visited: #fff;
  --rh-theme--color--surface--complement--link--hover: #e6e6e6;
  --rh-theme--color--surface--complement--link--focus: #e6e6e6;
  --rh-theme--color--surface--accent: #c00;
  --rh-theme--color--surface--accent--text: #fff;
  --rh-theme--color--surface--accent--link: #fff;
  --rh-theme--color--surface--accent--link--visited: #fff;
  --rh-theme--color--surface--accent--link--hover: #e6e6e6;
  --rh-theme--color--surface--accent--link--focus: #e6e6e6;
  --rh-theme--color--surface--border: #ccc;
  --rh-theme--color--surface--border--lightest: #e7e7e7;
  --rh-theme--color--surface--border--darkest: #6e6e6e;
  --rh-theme--color--feedback--critical: #f44336;
  --rh-theme--color--feedback--critical--lightest: #ffebee;
  --rh-theme--color--feedback--critical--darkest: #b71c1c;
  --rh-theme--color--feedback--important: #ff5722;
  --rh-theme--color--feedback--important--lightest: #fbe9e7;
  --rh-theme--color--feedback--important--darkest: #bf360c;
  --rh-theme--color--feedback--moderate: #ff8f00;
  --rh-theme--color--feedback--moderate--lightest: #fff8e1;
  --rh-theme--color--feedback--moderate--darkest: #bd5200;
  --rh-theme--color--feedback--success: #2e7d32;
  --rh-theme--color--feedback--success--lightest: #e8f5e9;
  --rh-theme--color--feedback--success--darkest: #1b5e20;
  --rh-theme--color--feedback--info: #0277bd;
  --rh-theme--color--feedback--info--lightest: #e1f5fe;
  --rh-theme--color--feedback--info--darkest: #01579b;
  --rh-theme--color--feedback--default: #606060;
  --rh-theme--color--feedback--default--lightest: #dfdfdf;
  --rh-theme--color--feedback--default--darkest: #464646;
  --rh-theme--container-spacer: 1rem;
  --rh-theme--container-padding: 1rem;
  --rh-theme--content-spacer: 1rem;
  --rh-theme--font-size: 16px;
  --rh-theme--line-height: 1.5;
  --rh-theme--font-family: "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif;
  --rh-theme--font-family--heading: "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif;
  --rh-theme--font-family--code: "Overpass Mono", Consolas, Monaco,  Andale Mono , monospace;
  --rh-theme--font-size--heading--alpha: 2rem;
  --rh-theme--font-size--heading--beta: 1.75rem;
  --rh-theme--font-size--heading--gamma: 1.5rem;
  --rh-theme--font-size--heading--delta: 1.25rem;
  --rh-theme--font-size--heading--epsilon: 1.125rem;
  --rh-theme--font-size--heading--zeta: 1rem;
  --rh-theme--link--text-decoration: underline;
  --rh-theme--link--text-decoration--hover: underline;
  --rh-theme--surface--border-width: 1px;
  --rh-theme--surface--border-style: solid;
  --rh-theme--surface--border-radius: 0;
  --rh-theme--ui--border-width: 1px;
  --rh-theme--ui--border-style: solid;
  --rh-theme--ui--border-radius: 2px;
  --rh-theme--box-shadow--sm: 0  0.0625rem  0.125rem 0 rgba(#1e1e1e, .2);
  --rh-theme--box-shadow--md: 0  0.125rem  0.0625rem 0.0625rem rgba(#1e1e1e, .12), 0  0.25rem  0.6875rem 0.375rem rgba(#1e1e1e, .05);
  --rh-theme--box-shadow--lg: 0  0.1875rem  0.4375rem 0.1875rem rgba(#1e1e1e, .13), 0  0.6875rem  1.5rem 1rem rgba(#1e1e1e, .12);
  --rh-theme--box-shadow--inset: inset 0 0 0.625rem 0 rgba(#1e1e1e, .25);
  --rh-theme--animation-timing: cubic-bezier(0.465, 0.183, 0.153, 0.946); }

*, *::before, *::after {
  box-sizing: border-box; }

body {
  font-family: var(--rh-theme--font-family);
  font-size: var(--rh-theme--font-size);
  line-height: var(--rh-theme--line-height); }

a {
  color: var(--rh-broadcasted--color--ui-link, #06c); }

a:visited {
  color: var(--rh-broadcasted--color--ui-link--visited, var(--rh-broadcasted--color--ui-link, #7551a6)); }

a:hover {
  color: var(--rh-broadcasted--color--ui-link--hover, var(--rh-broadcasted--color--ui-link, #004080)); }

a:focus {
  color: var(--rh-broadcasted--color--ui-link--focus, var(--rh-broadcasted--color--ui-link, #004080)); }

p {
  margin: 1em 0; }</style>`;

  document.head.appendChild(cpthemeTemplate);

  if (window.ShadyCSS) {
    window.ShadyCSS.CustomStyleInterface.addCustomStyle(
      document.querySelector(`#${templateId}-style`)
    );
  }
})();
//# sourceMappingURL=cp-theme.js.map
