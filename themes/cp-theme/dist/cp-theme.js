import "../dependencies/scoping-shim.min.js";
import "../dependencies/apply-shim.min.js";
import "../dependencies/custom-style-interface.min.js";

(function() {
  const templateId = "cp-theme";

  if (document.getElementById(templateId)) {
    return;
  }

  const cpthemeTemplate = document.createElement("div");

  cpthemeTemplate.setAttribute("style", "display: none;");
  cpthemeTemplate.setAttribute("id", templateId);
  cpthemeTemplate.innerHTML = `<style id="${templateId}-style">:root {
  --pfe-theme--color--text: #333;
  --pfe-theme--color--text--on-dark: #fff;
  --pfe-theme--color--text--on-saturated: #fff;
  --pfe-theme--color--ui-link: #06c;
  --pfe-theme--color--ui-link--visited: #7551a6;
  --pfe-theme--color--ui-link--hover: #004080;
  --pfe-theme--color--ui-link--focus: #004080;
  --pfe-theme--color--ui-link--on-dark: #73bcf7;
  --pfe-theme--color--ui-link--on-dark--visited: #967abd;
  --pfe-theme--color--ui-link--on-dark--hover: #2b9af3;
  --pfe-theme--color--ui-link--on-dark--focus: #2b9af3;
  --pfe-theme--color--ui-link--on-saturated: #73bcf7;
  --pfe-theme--color--ui-link--on-saturated--visited: #967abd;
  --pfe-theme--color--ui-link--on-saturated--hover: #2b9af3;
  --pfe-theme--color--ui-link--on-saturated--focus: #2b9af3;
  --pfe-theme--color--ui-base: #0076e0;
  --pfe-theme--color--ui-base--hover: #004080;
  --pfe-theme--color--ui-base--text: #fff;
  --pfe-theme--color--ui-base--text--hover: #fff;
  --pfe-theme--color--ui-complement: #464646;
  --pfe-theme--color--ui-complement--hover: #1e1e1e;
  --pfe-theme--color--ui-complement--text: #fff;
  --pfe-theme--color--ui-complement--text--hover: #fff;
  --pfe-theme--color--ui-accent: #c00;
  --pfe-theme--color--ui-accent--hover: #820000;
  --pfe-theme--color--ui-accent--text: #fff;
  --pfe-theme--color--ui-accent--text--hover: #fff;
  --pfe-theme--color--ui-disabled: #d2d2d2;
  --pfe-theme--color--ui-disabled--hover: #d2d2d2;
  --pfe-theme--color--ui-disabled--text: #aaa;
  --pfe-theme--color--ui-disabled--text--hover: #aaa;
  --pfe-theme--color--surface--lightest: #fff;
  --pfe-theme--color--surface--lightest--text: #333;
  --pfe-theme--color--surface--lightest--link: #06c;
  --pfe-theme--color--surface--lightest--link--visited: #7551a6;
  --pfe-theme--color--surface--lightest--link--hover: #004080;
  --pfe-theme--color--surface--lightest--link--focus: #004080;
  --pfe-theme--color--surface--lighter: #f0f0f0;
  --pfe-theme--color--surface--lighter--text: #333;
  --pfe-theme--color--surface--lighter--link: #06c;
  --pfe-theme--color--surface--lighter--link--visited: #7551a6;
  --pfe-theme--color--surface--lighter--link--hover: #004080;
  --pfe-theme--color--surface--lighter--link--focus: #004080;
  --pfe-theme--color--surface--base: #d2d2d2;
  --pfe-theme--color--surface--base--text: #333;
  --pfe-theme--color--surface--base--link: #06c;
  --pfe-theme--color--surface--base--link--visited: #7551a6;
  --pfe-theme--color--surface--base--link--hover: #004080;
  --pfe-theme--color--surface--base--link--focus: #004080;
  --pfe-theme--color--surface--darker: #464646;
  --pfe-theme--color--surface--darker--text: #fff;
  --pfe-theme--color--surface--darker--link: #73bcf7;
  --pfe-theme--color--surface--darker--link--visited: #967abd;
  --pfe-theme--color--surface--darker--link--hover: #2b9af3;
  --pfe-theme--color--surface--darker--link--focus: #2b9af3;
  --pfe-theme--color--surface--darkest: #1e1e1e;
  --pfe-theme--color--surface--darkest--text: #fff;
  --pfe-theme--color--surface--darkest--link: #73bcf7;
  --pfe-theme--color--surface--darkest--link--visited: #967abd;
  --pfe-theme--color--surface--darkest--link--hover: #2b9af3;
  --pfe-theme--color--surface--darkest--link--focus: #2b9af3;
  --pfe-theme--color--surface--complement: #264a60;
  --pfe-theme--color--surface--complement--text: #fff;
  --pfe-theme--color--surface--complement--link: #fff;
  --pfe-theme--color--surface--complement--link--visited: #fff;
  --pfe-theme--color--surface--complement--link--hover: #e6e6e6;
  --pfe-theme--color--surface--complement--link--focus: #e6e6e6;
  --pfe-theme--color--surface--accent: #c00;
  --pfe-theme--color--surface--accent--text: #fff;
  --pfe-theme--color--surface--accent--link: #fff;
  --pfe-theme--color--surface--accent--link--visited: #fff;
  --pfe-theme--color--surface--accent--link--hover: #e6e6e6;
  --pfe-theme--color--surface--accent--link--focus: #e6e6e6;
  --pfe-theme--color--surface--border: #ccc;
  --pfe-theme--color--surface--border--lightest: #e7e7e7;
  --pfe-theme--color--surface--border--darkest: #333;
  --pfe-theme--color--feedback--critical: #f44336;
  --pfe-theme--color--feedback--critical--lightest: #ffebee;
  --pfe-theme--color--feedback--critical--darkest: #b71c1c;
  --pfe-theme--color--feedback--important: #ff5722;
  --pfe-theme--color--feedback--important--lightest: #fbe9e7;
  --pfe-theme--color--feedback--important--darkest: #bf360c;
  --pfe-theme--color--feedback--moderate: #ff8f00;
  --pfe-theme--color--feedback--moderate--lightest: #fff8e1;
  --pfe-theme--color--feedback--moderate--darkest: #bd5200;
  --pfe-theme--color--feedback--success: #2e7d32;
  --pfe-theme--color--feedback--success--lightest: #e8f5e9;
  --pfe-theme--color--feedback--success--darkest: #1b5e20;
  --pfe-theme--color--feedback--info: #0277bd;
  --pfe-theme--color--feedback--info--lightest: #e1f5fe;
  --pfe-theme--color--feedback--info--darkest: #01579b;
  --pfe-theme--color--feedback--default: #606060;
  --pfe-theme--color--feedback--default--lightest: #dfdfdf;
  --pfe-theme--color--feedback--default--darkest: #464646;
  --pfe-theme--container-spacer: 1rem;
  --pfe-theme--container-padding: 1rem;
  --pfe-theme--content-spacer: 1rem;
  --pfe-theme--font-size: 16px;
  --pfe-theme--line-height: 1.5;
  --pfe-theme--font-family: "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif;
  --pfe-theme--font-family--heading: "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif;
  --pfe-theme--font-family--code: "Overpass Mono", Consolas, Monaco,  Andale Mono , monospace;
  --pfe-theme--font-size--heading--alpha: 2rem;
  --pfe-theme--font-size--heading--beta: 1.75rem;
  --pfe-theme--font-size--heading--gamma: 1.5rem;
  --pfe-theme--font-size--heading--delta: 1.25rem;
  --pfe-theme--font-size--heading--epsilon: 1.125rem;
  --pfe-theme--font-size--heading--zeta: 1rem;
  --pfe-theme--link--text-decoration: underline;
  --pfe-theme--link--text-decoration--hover: underline;
  --pfe-theme--surface--border-width: 1px;
  --pfe-theme--surface--border-style: solid;
  --pfe-theme--surface--border-radius: 0;
  --pfe-theme--ui--border-width: 1px;
  --pfe-theme--ui--border-style: solid;
  --pfe-theme--ui--border-radius: 2px;
  --pfe-theme--box-shadow--sm: 0  0.0625rem  0.125rem 0 rgba(#1e1e1e, .2);
  --pfe-theme--box-shadow--md: 0  0.125rem  0.0625rem 0.0625rem rgba(#1e1e1e, .12), 0  0.25rem  0.6875rem 0.375rem rgba(#1e1e1e, .05);
  --pfe-theme--box-shadow--lg: 0  0.1875rem  0.4375rem 0.1875rem rgba(#1e1e1e, .13), 0  0.6875rem  1.5rem 1rem rgba(#1e1e1e, .12);
  --pfe-theme--box-shadow--inset: inset 0 0 0.625rem 0 rgba(#1e1e1e, .25);
  --pfe-theme--animation-timing: cubic-bezier(0.465, 0.183, 0.153, 0.946); }

*, *::before, *::after {
  box-sizing: border-box; }

body {
  font-family: var(--pfe-theme--font-family);
  font-size: var(--pfe-theme--font-size);
  line-height: var(--pfe-theme--line-height); }

a {
  color: var(--pfe-broadcasted--color--ui-link, #06c); }

a:visited {
  color: var(--pfe-broadcasted--color--ui-link--visited, var(--pfe-broadcasted--color--ui-link, #7551a6)); }

a:hover {
  color: var(--pfe-broadcasted--color--ui-link--hover, var(--pfe-broadcasted--color--ui-link, #004080)); }

a:focus {
  color: var(--pfe-broadcasted--color--ui-link--focus, var(--pfe-broadcasted--color--ui-link, #004080)); }

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
