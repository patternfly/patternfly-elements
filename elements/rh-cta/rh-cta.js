import RHElement from "../rhelement/rhelement.js";

class RhCta extends RHElement {
  get html() {
    return `
<style>
:host {
  --rhe-local-cta--BorderRadius: var(--rhe-cta--BorderRadius, var(--rhe-theme--BorderRadius, 5em));
  --rhe-local-cta--link-color: var(--rhe-cta--link-color, var(--rhe-theme--link-color, blue));
  --rhe-local-cta--link-color--hover: var(--rhe-cta--link-color--hover, var(--rhe-theme--link-color--hover, darkBlue));
  --rhe-local-cta--link-color--inverted: var(--rhe-cta--link-color--inverted, var(--rhe-theme--link-color--inverted, white));
  --rhe-local-cta--link-color--inverted--hover: var(--rhe-cta--link-color--inverted--hover, var(--rhe-theme--link-color--inverted--hover, lightGray)); }
  :host ::slotted(a) {
    font-family: "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif;
    font-weight: bold;
    color: var(--rhe-local-cta--link-color); }
  :host ::slotted(a:hover),
  :host ::slotted(a:focus) {
    color: var(--rhe-local-cta--link-color--hover); }

:host([inverted]) ::slotted(a) {
  color: var(--rhe-local-cta--link-color--inverted); }

:host([inverted]) ::slotted(a:hover),
:host([inverted]) ::slotted(a:focus) {
  color: var(--rhe-local-cta--link-color--inverted--hover); }

:host(.primary) {
  --rhe-local-cta--primary-BorderRadius: var(--rhe-cta--primary-BorderRadius, var(--rhe-theme--global--border--BorderRadius, 5em));
  --rhe-local-cta--primary-bg-color: var(--rhe-cta--primary-bg-color, var(--rhe-theme--color--primary, red));
  --rhe-local-cta--primary-text-color: var(--rhe-cta--primary-text-color, var(--rhe-theme--color--white, white));
  --rhe-local-cta--primary-bg-color--hover: var(--rhe-cta--primary-bg-color--hover, var(--rhe-theme--color--primary-shade2, darkRed)); }
  :host(.primary) ::slotted(a) {
    display: inline-block;
    text-decoration: none;
    transition: all 250ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    padding: 0.5rem 2rem;
    border: solid transparent 1px;
    border-radius: var(--rhe-local-cta--primary-BorderRadius);
    background: var(--rhe-local-cta--primary-bg-color);
    color: var(--rhe-local-cta--primary-text-color); }
  :host(.primary) ::slotted(a:hover),
  :host(.primary) ::slotted(a:focus) {
    background: var(--rhe-local-cta--primary-bg-color--hover); }

:host(.secondary) {
  --rhe-local-cta--secondary-BorderRadius: var(--rhe-cta--secondary-BorderRadius, var(--rhe-theme--global--border--BorderRadius, 5em));
  --rhe-local-cta--secondary-bg-color: var(--rhe-cta--secondary-bg-color, var(--rhe-theme--color--transparent, transparent));
  --rhe-local-cta--secondary-text-color: var(--rhe-cta--secondary-text-color, var(--rhe-theme--color--black, black));
  --rhe-local-cta--secondary-border-color: var(--rhe-cta--secondary-border-color, var(--rhe-theme--color--black, black));
  --rhe-local-cta--secondary-bg-color--hover: var(--rhe-cta--secondary-bg-color--hover, var(--rhe-theme--color--black, black));
  --rhe-local-cta--secondary-text-color--hover: var(--rhe-cta--secondary-text-color--hover, var(--rhe-theme--color--white, white));
  --rhe-local-cta--secondary-border-color--hover: var(--rhe-cta--secondary-border-color--hover, var(--rhe-theme--color--black, black));
  --rhe-local-cta--secondary-bg-color--inverted: var(--rhe-cta--secondary-bg-color--inverted, var(--rhe-theme--color--transparent, transparent));
  --rhe-local-cta--secondary-text-color--inverted: var(--rhe-cta--secondary-text-color--inverted, var(--rhe-theme--color--white, white));
  --rhe-local-cta--secondary-border-color--inverted: var(--rhe-cta--secondary-border-color--inverted, var(--rhe-theme--color--white, white));
  --rhe-local-cta--secondary-bg-color--inverted--hover: var(--rhe-cta--secondary-bg-color--inverted--hover, var(--rhe-theme--color--white, white));
  --rhe-local-cta--secondary-text-color--inverted--hover: var(--rhe-cta--secondary-text-color--inverted--hover, var(--rhe-theme--color--black, black));
  --rhe-local-cta--secondary-border-color--inverted--hover: var(--rhe-cta--secondary-border-color--inverted--hover, var(--rhe-theme--color--white, white)); }
  :host(.secondary) ::slotted(a) {
    display: inline-block;
    text-decoration: none;
    transition: all 250ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    padding: 0.5rem 2rem;
    border-radius: var(--rhe-local-cta--secondary-BorderRadius);
    border: solid 1px;
    border-color: var(--rhe-local-cta--secondary-border-color);
    background: var(--rhe-local-cta--secondary-bg-color);
    color: var(--rhe-local-cta--secondary-text-color); }
  :host(.secondary) ::slotted(a:hover),
  :host(.secondary) ::slotted(a:focus) {
    border: solid 1px var(--rhe-local-cta--secondary-border-color--hover);
    background: var(--rhe-local-cta--secondary-bg-color--hover);
    color: var(--rhe-local-cta--secondary-text-color--hover); }

:host([inverted].secondary) ::slotted(a) {
  border: solid 1px var(--rhe-local-cta--secondary-border-color--inverted);
  background: var(--rhe-local-cta--secondary-bg-color--inverted);
  color: var(--rhe-local-cta--secondary-text-color--inverted); }

:host([inverted].secondary) ::slotted(a:hover),
:host([inverted].secondary) ::slotted(a:focus) {
  border-color: var(--rhe-local-cta--secondary-border-color--inverted--hover);
  background: var(--rhe-local-cta--secondary-bg-color--inverted--hover);
  color: var(--rhe-local-cta--secondary-text-color--inverted--hover); }

:host(.tertiary) {
  display: inline-block;
  --rhe-local-cta__arrow--spacing: var(--rhe-cta__arrow--spacing, var(--rhe-theme--spacing--xxs, 0.2em));
  --rhe-local-cta--tertiary-text-color: var(--rhe-cta--tertiary-text-color, var(--rhe-theme--link-color, green));
  --rhe-local-cta--tertiary-text-color--hover: var(--rhe-cta--tertiary-text-color--hover, var(--rhe-theme--link-color--hover, navyBlue));
  --rhe-local-cta--tertiary-text-color--inverted: var(--rhe-cta--tertiary-text-color--inverted, var(--rhe-theme--link-color--inverted, white));
  --rhe-local-cta--tertiary-text-color--inverted--hover: var(--rhe-cta--tertiary-text-color--inverted--hover, var(--rhe-theme--link-color--inverted--hover, lightGray)); }
  :host(.tertiary) ::slotted(a) {
    text-decoration: none;
    color: var(--rhe-local-cta--tertiary-text-color); }
    :host(.tertiary) ::slotted(a)::after {
      margin-left: var(--rhe-local-cta__arrow--spacing);
      vertical-align: middle;
      border-style: solid;
      border-width: 8px 5px 0;
      border-color: transparent;
      border-top-color: inherit;
      transform: rotate(-90deg);
      display: inline-block;
      content: ""; }
  :host(.tertiary) ::slotted(a:hover),
  :host(.tertiary) ::slotted(a:focus) {
    color: var(--rhe-local-cta--tertiary-text-color--hover); }

:host([inverted].tertiary) ::slotted(a) {
  color: var(--rhe-local-cta--tertiary-text-color--inverted); }

:host([inverted].tertiary) ::slotted(a:hover),
:host([inverted].tertiary) ::slotted(a:focus) {
  color: var(--rhe-local-cta--tertiary-text-color--inverted--hover); }
</style>

<slot></slot>`;
  }

  static get tag() {
    return "rh-cta";
  }

  get styleUrl() {
    return "rh-cta.scss";
  }

  get templateUrl() {
    return "rh-cta.html";
  }

  constructor() {
    super(RhCta.tag);
  }

  connectedCallback() {
    super.connectedCallback();

    const firstChild = this.children[0];

    if (!firstChild) {
      console.warn(
        "The first child in the light DOM must be an anchor tag (<a>)"
      );
    } else if (firstChild && firstChild.tagName.toLowerCase() !== "a") {
      console.warn(
        "The first child in the light DOM must be an anchor tag (<a>)"
      );
    } else {
      this.link = this.querySelector("a");
    }
  }

  disconnectedCallback() {}
}

RHElement.create(RhCta);
