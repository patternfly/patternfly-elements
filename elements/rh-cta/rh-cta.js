import RHElement from "../rhelement/rhelement.js";

class RhCta extends RHElement {
  get html() {
    return `
<style>
:host {
  display: inline-block;
  --rh-local-cta__arrow--spacing: var(--rh-cta__arrow--spacing, var(--rh-theme--spacing--xxs, 0.25rem));
  --rh-local-cta--link-color: var(--rh-cta--link-color, var(--rh-theme--link-color, #06c));
  --rh-local-cta--link-color--visited: var(--rh-cta--link-color--visited, var(--rh-theme--link-color--visited, #7551a6));
  --rh-local-cta--link-color--hover: var(--rh-cta--link-color--hover, var(--rh-theme--link-color--hover, #004080));
  --rh-local-cta--link-color--focus: var(--rh-cta--link-color--focus, var(--rh-theme--link-color--focus, #004080)); }
  :host ::slotted(a) {
    color: var(--rh-local-cta--link-color); }
    :host ::slotted(a)::after {
      margin-left: var(--rh-local-cta__arrow--spacing);
      vertical-align: middle;
      border-style: solid;
      border-width: 0.313em 0.313em 0;
      border-color: transparent;
      border-top-color: var(--rh-local-cta--link-color);
      transform: rotate(-90deg);
      display: inline-block;
      content: ""; }
  :host ::slotted(a:visited) {
    color: var(--rh-local-cta--link-color--visited); }
    :host ::slotted(a:visited)::after {
      border-top-color: var(--rh-local-cta--link-color--visited); }
  :host ::slotted(a:hover) {
    color: var(--rh-local-cta--link-color--hover); }
    :host ::slotted(a:hover)::after {
      border-top-color: var(--rh-local-cta--link-color--hover); }
  :host ::slotted(a:focus) {
    color: var(--rh-local-cta--link-color--focus); }
    :host ::slotted(a:focus)::after {
      border-top-color: var(--rh-local-cta--link-color--focus); }

:host([inverted]) {
  --rh-local-cta--link-color--inverted: var(--rh-cta--link-color--inverted, var(--rh-theme--link-color--inverted, #73bcf7));
  --rh-local-cta--link-color--inverted--visited: var(--rh-cta--link-color--inverted--visited, var(--rh-theme--link-color--inverted--visited, #967abd));
  --rh-local-cta--link-color--inverted--hover: var(--rh-cta--link-color--inverted--hover, var(--rh-theme--link-color--inverted--hover, #2b9af3));
  --rh-local-cta--link-color--inverted--focus: var(--rh-cta--link-color--inverted--focus, var(--rh-theme--link-color--inverted--focus, #2b9af3)); }
  :host([inverted]) ::slotted(a) {
    color: var(--rh-local-cta--link-color--inverted); }
    :host([inverted]) ::slotted(a)::after {
      border-style: solid;
      border-width: 0.313em 0.313em 0;
      border-color: transparent;
      border-top-color: var(--rh-local-cta--link-color--inverted);
      transform: rotate(-90deg);
      display: inline-block;
      content: ""; }
  :host([inverted]) ::slotted(a:visited) {
    color: var(--rh-local-cta--link-color--inverted--visited); }
    :host([inverted]) ::slotted(a:visited)::after {
      border-top-color: var(--rh-local-cta--link-color--inverted--visited); }
  :host([inverted]) ::slotted(a:hover) {
    color: var(--rh-local-cta--link-color--inverted--hover); }
    :host([inverted]) ::slotted(a:hover)::after {
      border-top-color: var(--rh-local-cta--link-color--inverted--hover); }
  :host([inverted]) ::slotted(a:focus) {
    color: var(--rh-local-cta--link-color--inverted--focus); }
    :host([inverted]) ::slotted(a:focus)::after {
      border-top-color: var(--rh-local-cta--link-color--inverted--focus); }

:host(.primary) {
  --rh-local-cta--primary-link-color--: var(--rh-cta--primary-link-color--, var(--rh-theme----primary-link-color--, #06c));
  --rh-local-cta--primary-link-color----visited: var(--rh-cta--primary-link-color----visited, var(--rh-theme----primary-link-color----visited, #7551a6));
  --rh-local-cta--primary-link-color----hover: var(--rh-cta--primary-link-color----hover, var(--rh-theme----primary-link-color----hover, #004080));
  --rh-local-cta--primary-link-color----focus: var(--rh-cta--primary-link-color----focus, var(--rh-theme----primary-link-color----focus, #004080)); }
  :host(.primary) ::slotted(a) {
    color: var(--rh-local-cta--primary-link-color--); }
    :host(.primary) ::slotted(a)::after {
      border-top-color: var(--rh-local-cta--primary-link-color--); }
  :host(.primary) ::slotted(a:visited) {
    color: var(--rh-local-cta--primary-link-color----visited); }
    :host(.primary) ::slotted(a:visited)::after {
      border-top-color: var(--rh-local-cta--primary-link-color----visited); }
  :host(.primary) ::slotted(a:hover) {
    color: var(--rh-local-cta--primary-link-color----hover); }
    :host(.primary) ::slotted(a:hover)::after {
      border-top-color: var(--rh-local-cta--primary-link-color----hover); }
  :host(.primary) ::slotted(a:focus) {
    color: var(--rh-local-cta--primary-link-color----focus); }
    :host(.primary) ::slotted(a:focus)::after {
      border-top-color: var(--rh-local-cta--primary-link-color----focus); }

:host(.secondary) {
  --rh-local-cta--secondary-link-color--: var(--rh-cta--secondary-link-color--, var(--rh-theme----secondary-link-color--, #464646));
  --rh-local-cta--secondary-link-color----visited: var(--rh-cta--secondary-link-color----visited, var(--rh-theme----secondary-link-color----visited, #7551a6));
  --rh-local-cta--secondary-link-color----hover: var(--rh-cta--secondary-link-color----hover, var(--rh-theme----secondary-link-color----hover, #2d2d2d));
  --rh-local-cta--secondary-link-color----focus: var(--rh-cta--secondary-link-color----focus, var(--rh-theme----secondary-link-color----focus, #2d2d2d)); }
  :host(.secondary) ::slotted(a) {
    color: var(--rh-local-cta--secondary-link-color--); }
    :host(.secondary) ::slotted(a)::after {
      border-top-color: var(--rh-local-cta--secondary-link-color--); }
  :host(.secondary) ::slotted(a:visited) {
    color: var(--rh-local-cta--secondary-link-color----visited); }
    :host(.secondary) ::slotted(a:visited)::after {
      border-top-color: var(--rh-local-cta--secondary-link-color----visited); }
  :host(.secondary) ::slotted(a:hover) {
    color: var(--rh-local-cta--secondary-link-color----hover); }
    :host(.secondary) ::slotted(a:hover)::after {
      border-top-color: var(--rh-local-cta--secondary-link-color----hover); }
  :host(.secondary) ::slotted(a:focus) {
    color: var(--rh-local-cta--secondary-link-color----focus); }
    :host(.secondary) ::slotted(a:focus)::after {
      border-top-color: var(--rh-local-cta--secondary-link-color----focus); }

:host(.accent) {
  --rh-local-cta--accent-link-color--: var(--rh-cta--accent-link-color--, var(--rh-theme----accent-link-color--, #c00));
  --rh-local-cta--accent-link-color----visited: var(--rh-cta--accent-link-color----visited, var(--rh-theme----accent-link-color----visited, #7551a6));
  --rh-local-cta--accent-link-color----hover: var(--rh-cta--accent-link-color----hover, var(--rh-theme----accent-link-color----hover, #990000));
  --rh-local-cta--accent-link-color----focus: var(--rh-cta--accent-link-color----focus, var(--rh-theme----accent-link-color----focus, #990000)); }
  :host(.accent) ::slotted(a) {
    color: var(--rh-local-cta--accent-link-color--); }
    :host(.accent) ::slotted(a)::after {
      border-top-color: var(--rh-local-cta--accent-link-color--); }
  :host(.accent) ::slotted(a:visited) {
    color: var(--rh-local-cta--accent-link-color----visited); }
    :host(.accent) ::slotted(a:visited)::after {
      border-top-color: var(--rh-local-cta--accent-link-color----visited); }
  :host(.accent) ::slotted(a:hover) {
    color: var(--rh-local-cta--accent-link-color----hover); }
    :host(.accent) ::slotted(a:hover)::after {
      border-top-color: var(--rh-local-cta--accent-link-color----hover); }
  :host(.accent) ::slotted(a:focus) {
    color: var(--rh-local-cta--accent-link-color----focus); }
    :host(.accent) ::slotted(a:focus)::after {
      border-top-color: var(--rh-local-cta--accent-link-color----focus); }

:host([inverted]) {
  --rh-local-cta---link-color--inverted: var(--rh-cta---link-color--inverted, var(--rh-theme-----link-color--inverted, #73bcf7));
  --rh-local-cta---link-color--inverted--visited: var(--rh-cta---link-color--inverted--visited, var(--rh-theme-----link-color--inverted--visited, #967abd));
  --rh-local-cta---link-color--inverted--hover: var(--rh-cta---link-color--inverted--hover, var(--rh-theme-----link-color--inverted--hover, #2b9af3));
  --rh-local-cta---link-color--inverted--focus: var(--rh-cta---link-color--inverted--focus, var(--rh-theme-----link-color--inverted--focus, #2b9af3)); }
  :host([inverted]) ::slotted(a) {
    color: var(--rh-local-cta---link-color--inverted); }
    :host([inverted]) ::slotted(a)::after {
      border-top-color: var(--rh-local-cta---link-color--inverted); }
  :host([inverted]) ::slotted(a:visited) {
    color: var(--rh-local-cta---link-color--inverted--visited); }
    :host([inverted]) ::slotted(a:visited)::after {
      border-top-color: var(--rh-local-cta---link-color--inverted--visited); }
  :host([inverted]) ::slotted(a:hover) {
    color: var(--rh-local-cta---link-color--inverted--hover); }
    :host([inverted]) ::slotted(a:hover)::after {
      border-top-color: var(--rh-local-cta---link-color--inverted--hover); }
  :host([inverted]) ::slotted(a:focus) {
    color: var(--rh-local-cta---link-color--inverted--focus); }
    :host([inverted]) ::slotted(a:focus)::after {
      border-top-color: var(--rh-local-cta---link-color--inverted--focus); }

:host([inverted].primary) {
  --rh-local-cta--primary-link-color--inverted: var(--rh-cta--primary-link-color--inverted, var(--rh-theme----primary-link-color--inverted, #73bcf7));
  --rh-local-cta--primary-link-color--inverted--visited: var(--rh-cta--primary-link-color--inverted--visited, var(--rh-theme----primary-link-color--inverted--visited, #967abd));
  --rh-local-cta--primary-link-color--inverted--hover: var(--rh-cta--primary-link-color--inverted--hover, var(--rh-theme----primary-link-color--inverted--hover, #2b9af3));
  --rh-local-cta--primary-link-color--inverted--focus: var(--rh-cta--primary-link-color--inverted--focus, var(--rh-theme----primary-link-color--inverted--focus, #2b9af3)); }
  :host([inverted].primary) ::slotted(a) {
    color: var(--rh-local-cta--primary-link-color--inverted); }
    :host([inverted].primary) ::slotted(a)::after {
      border-top-color: var(--rh-local-cta--primary-link-color--inverted); }
  :host([inverted].primary) ::slotted(a:visited) {
    color: var(--rh-local-cta--primary-link-color--inverted--visited); }
    :host([inverted].primary) ::slotted(a:visited)::after {
      border-top-color: var(--rh-local-cta--primary-link-color--inverted--visited); }
  :host([inverted].primary) ::slotted(a:hover) {
    color: var(--rh-local-cta--primary-link-color--inverted--hover); }
    :host([inverted].primary) ::slotted(a:hover)::after {
      border-top-color: var(--rh-local-cta--primary-link-color--inverted--hover); }
  :host([inverted].primary) ::slotted(a:focus) {
    color: var(--rh-local-cta--primary-link-color--inverted--focus); }
    :host([inverted].primary) ::slotted(a:focus)::after {
      border-top-color: var(--rh-local-cta--primary-link-color--inverted--focus); }

:host([inverted].secondary) {
  --rh-local-cta--secondary-link-color--inverted: var(--rh-cta--secondary-link-color--inverted, var(--rh-theme----secondary-link-color--inverted, #fff));
  --rh-local-cta--secondary-link-color--inverted--visited: var(--rh-cta--secondary-link-color--inverted--visited, var(--rh-theme----secondary-link-color--inverted--visited, #967abd));
  --rh-local-cta--secondary-link-color--inverted--hover: var(--rh-cta--secondary-link-color--inverted--hover, var(--rh-theme----secondary-link-color--inverted--hover, #e6e6e6));
  --rh-local-cta--secondary-link-color--inverted--focus: var(--rh-cta--secondary-link-color--inverted--focus, var(--rh-theme----secondary-link-color--inverted--focus, #e6e6e6)); }
  :host([inverted].secondary) ::slotted(a) {
    color: var(--rh-local-cta--secondary-link-color--inverted); }
    :host([inverted].secondary) ::slotted(a)::after {
      border-top-color: var(--rh-local-cta--secondary-link-color--inverted); }
  :host([inverted].secondary) ::slotted(a:visited) {
    color: var(--rh-local-cta--secondary-link-color--inverted--visited); }
    :host([inverted].secondary) ::slotted(a:visited)::after {
      border-top-color: var(--rh-local-cta--secondary-link-color--inverted--visited); }
  :host([inverted].secondary) ::slotted(a:hover) {
    color: var(--rh-local-cta--secondary-link-color--inverted--hover); }
    :host([inverted].secondary) ::slotted(a:hover)::after {
      border-top-color: var(--rh-local-cta--secondary-link-color--inverted--hover); }
  :host([inverted].secondary) ::slotted(a:focus) {
    color: var(--rh-local-cta--secondary-link-color--inverted--focus); }
    :host([inverted].secondary) ::slotted(a:focus)::after {
      border-top-color: var(--rh-local-cta--secondary-link-color--inverted--focus); }

:host([inverted].accent) {
  --rh-local-cta--accent-link-color--inverted: var(--rh-cta--accent-link-color--inverted, var(--rh-theme----accent-link-color--inverted, red));
  --rh-local-cta--accent-link-color--inverted--visited: var(--rh-cta--accent-link-color--inverted--visited, var(--rh-theme----accent-link-color--inverted--visited, #967abd));
  --rh-local-cta--accent-link-color--inverted--hover: var(--rh-cta--accent-link-color--inverted--hover, var(--rh-theme----accent-link-color--inverted--hover, #ff3333));
  --rh-local-cta--accent-link-color--inverted--focus: var(--rh-cta--accent-link-color--inverted--focus, var(--rh-theme----accent-link-color--inverted--focus, #ff3333)); }
  :host([inverted].accent) ::slotted(a) {
    color: var(--rh-local-cta--accent-link-color--inverted); }
    :host([inverted].accent) ::slotted(a)::after {
      border-top-color: var(--rh-local-cta--accent-link-color--inverted); }
  :host([inverted].accent) ::slotted(a:visited) {
    color: var(--rh-local-cta--accent-link-color--inverted--visited); }
    :host([inverted].accent) ::slotted(a:visited)::after {
      border-top-color: var(--rh-local-cta--accent-link-color--inverted--visited); }
  :host([inverted].accent) ::slotted(a:hover) {
    color: var(--rh-local-cta--accent-link-color--inverted--hover); }
    :host([inverted].accent) ::slotted(a:hover)::after {
      border-top-color: var(--rh-local-cta--accent-link-color--inverted--hover); }
  :host([inverted].accent) ::slotted(a:focus) {
    color: var(--rh-local-cta--accent-link-color--inverted--focus); }
    :host([inverted].accent) ::slotted(a:focus)::after {
      border-top-color: var(--rh-local-cta--accent-link-color--inverted--focus); }

:host([solid]) {
  --rh-local-cta--solid--padding-y: var(--rh-cta--solid--padding-y, var(--rh-theme--spacing--xs, 0.5rem));
  --rh-local-cta--solid--padding-x: var(--rh-cta--solid--padding-x, var(--rh-theme--spacing--lg, 2rem));
  --rh-local-cta--solid--BorderRadius: var(--rh-cta--solid--BorderRadius, var(--rh-theme--cta--BorderRadius, 5em));
  --rh-local-cta--solid--BorderWidth: var(--rh-cta--solid--BorderWidth, var(--rh-theme--cta--BorderWidth, 1px));
  --rh-local-cta--default-color--solid: var(--rh-cta--default-color--solid, var(--rh-theme--default-color, #6e6e6e));
  --rh-local-cta--default-text-color--solid: var(--rh-cta--default-text-color--solid, var(--rh-theme--default-text-color, #fff));
  --rh-local-cta--default-color--solid--hover: var(--rh-cta--default-color--solid--hover, var(--rh-theme--default-color--hover, #555555));
  --rh-local-cta--default-text-color--solid--hover: var(--rh-cta--default-text-color--solid--hover, var(--rh-theme--default-text-color--hover, #fff)); }
  :host([solid]) ::slotted(a) {
    display: inline-block;
    padding: var(--rh-local-cta--solid--padding-y) var(--rh-local-cta--solid--padding-x);
    text-decoration: none;
    border: var(--rh-local-cta--solid--BorderWidth) solid transparent;
    border-radius: var(--rh-local-cta--solid--BorderRadius);
    transition: all 250ms cubic-bezier(0.465, 0.183, 0.153, 0.946);
    background: var(--rh-local-cta--default-color--solid);
    color: var(--rh-local-cta--default-text-color--solid); }
    :host([solid]) ::slotted(a)::after {
      display: none; }
  :host([solid]) ::slotted(a:hover),
  :host([solid]) ::slotted(a:focus) {
    background: var(--rh-local-cta--default-color--solid--hover) !important;
    color: var(--rh-local-cta--default-text-color--solid--hover) !important; }

:host([solid].primary) {
  --rh-local-cta--primary-color----solid: var(--rh-cta--primary-color----solid, var(--rh-theme----primary-color, #0076e0));
  --rh-local-cta--primary-text-color----solid: var(--rh-cta--primary-text-color----solid, var(--rh-theme----primary-text-color, #fff));
  --rh-local-cta--primary-color----solid--hover: var(--rh-cta--primary-color----solid--hover, var(--rh-theme----primary-color--hover, #005bad));
  --rh-local-cta--primary-text-color----solid--hover: var(--rh-cta--primary-text-color----solid--hover, var(--rh-theme----primary-text-color--hover, #fff)); }
  :host([solid].primary) ::slotted(a) {
    background: var(--rh-local-cta--primary-color----solid);
    color: var(--rh-local-cta--primary-text-color----solid); }
  :host([solid].primary) ::slotted(a:hover),
  :host([solid].primary) ::slotted(a:focus) {
    background: var(--rh-local-cta--primary-color----solid--hover) !important;
    color: var(--rh-local-cta--primary-text-color----solid--hover) !important; }

:host([solid].secondary) {
  --rh-local-cta--secondary-color----solid: var(--rh-cta--secondary-color----solid, var(--rh-theme----secondary-color, #464646));
  --rh-local-cta--secondary-text-color----solid: var(--rh-cta--secondary-text-color----solid, var(--rh-theme----secondary-text-color, #fff));
  --rh-local-cta--secondary-color----solid--hover: var(--rh-cta--secondary-color----solid--hover, var(--rh-theme----secondary-color--hover, #2d2d2d));
  --rh-local-cta--secondary-text-color----solid--hover: var(--rh-cta--secondary-text-color----solid--hover, var(--rh-theme----secondary-text-color--hover, #fff)); }
  :host([solid].secondary) ::slotted(a) {
    background: var(--rh-local-cta--secondary-color----solid);
    color: var(--rh-local-cta--secondary-text-color----solid); }
  :host([solid].secondary) ::slotted(a:hover),
  :host([solid].secondary) ::slotted(a:focus) {
    background: var(--rh-local-cta--secondary-color----solid--hover) !important;
    color: var(--rh-local-cta--secondary-text-color----solid--hover) !important; }

:host([solid].accent) {
  --rh-local-cta--accent-color----solid: var(--rh-cta--accent-color----solid, var(--rh-theme----accent-color, #c00));
  --rh-local-cta--accent-text-color----solid: var(--rh-cta--accent-text-color----solid, var(--rh-theme----accent-text-color, #fff));
  --rh-local-cta--accent-color----solid--hover: var(--rh-cta--accent-color----solid--hover, var(--rh-theme----accent-color--hover, #990000));
  --rh-local-cta--accent-text-color----solid--hover: var(--rh-cta--accent-text-color----solid--hover, var(--rh-theme----accent-text-color--hover, #fff)); }
  :host([solid].accent) ::slotted(a) {
    background: var(--rh-local-cta--accent-color----solid);
    color: var(--rh-local-cta--accent-text-color----solid); }
  :host([solid].accent) ::slotted(a:hover),
  :host([solid].accent) ::slotted(a:focus) {
    background: var(--rh-local-cta--accent-color----solid--hover) !important;
    color: var(--rh-local-cta--accent-text-color----solid--hover) !important; }

:host([solid][inverted]) {
  --rh-local-cta---color--inverted--solid: var(--rh-cta---text-color--inverted--solid, var(--rh-theme---text-color, #fff));
  --rh-local-cta---text-color--inverted--solid: var(--rh-cta---color--inverted--solid, var(--rh-theme---color, #6e6e6e));
  --rh-local-cta---color--inverted--solid--hover: var(--rh-cta---text-color--inverted--solid--hover, var(--rh-theme---text-color--hover, #f2f2f2));
  --rh-local-cta---text-color--inverted--solid--hover: var(--rh-cta---color--inverted--solid--hover, var(--rh-theme---color--hover, #555555)); }
  :host([solid][inverted]) ::slotted(a) {
    background: var(--rh-local-cta---color--inverted--solid);
    color: var(--rh-local-cta---text-color--inverted--solid); }
  :host([solid][inverted]) ::slotted(a:hover),
  :host([solid][inverted]) ::slotted(a:focus) {
    background: var(--rh-local-cta---color--inverted--solid--hover) !important;
    color: var(--rh-local-cta---text-color--inverted--solid--hover) !important; }

:host([solid][inverted].primary) {
  --rh-local-cta--primary-color--inverted--solid: var(--rh-cta--primary-text-color--inverted--solid, var(--rh-theme--primary-text-color, #fff));
  --rh-local-cta--primary-text-color--inverted--solid: var(--rh-cta--primary-color--inverted--solid, var(--rh-theme--primary-color, #0076e0));
  --rh-local-cta--primary-color--inverted--solid--hover: var(--rh-cta--primary-text-color--inverted--solid--hover, var(--rh-theme--primary-text-color--hover, #f2f2f2));
  --rh-local-cta--primary-text-color--inverted--solid--hover: var(--rh-cta--primary-color--inverted--solid--hover, var(--rh-theme--primary-color--hover, #005bad)); }
  :host([solid][inverted].primary) ::slotted(a) {
    background: var(--rh-local-cta--primary-color--inverted--solid);
    color: var(--rh-local-cta--primary-text-color--inverted--solid); }
  :host([solid][inverted].primary) ::slotted(a:hover),
  :host([solid][inverted].primary) ::slotted(a:focus) {
    background: var(--rh-local-cta--primary-color--inverted--solid--hover) !important;
    color: var(--rh-local-cta--primary-text-color--inverted--solid--hover) !important; }

:host([solid][inverted].secondary) {
  --rh-local-cta--secondary-color--inverted--solid: var(--rh-cta--secondary-text-color--inverted--solid, var(--rh-theme--secondary-text-color, #fff));
  --rh-local-cta--secondary-text-color--inverted--solid: var(--rh-cta--secondary-color--inverted--solid, var(--rh-theme--secondary-color, #464646));
  --rh-local-cta--secondary-color--inverted--solid--hover: var(--rh-cta--secondary-text-color--inverted--solid--hover, var(--rh-theme--secondary-text-color--hover, #f2f2f2));
  --rh-local-cta--secondary-text-color--inverted--solid--hover: var(--rh-cta--secondary-color--inverted--solid--hover, var(--rh-theme--secondary-color--hover, #2d2d2d)); }
  :host([solid][inverted].secondary) ::slotted(a) {
    background: var(--rh-local-cta--secondary-color--inverted--solid);
    color: var(--rh-local-cta--secondary-text-color--inverted--solid); }
  :host([solid][inverted].secondary) ::slotted(a:hover),
  :host([solid][inverted].secondary) ::slotted(a:focus) {
    background: var(--rh-local-cta--secondary-color--inverted--solid--hover) !important;
    color: var(--rh-local-cta--secondary-text-color--inverted--solid--hover) !important; }

:host([solid][inverted].accent) {
  --rh-local-cta--accent-color--inverted--solid: var(--rh-cta--accent-text-color--inverted--solid, var(--rh-theme--accent-text-color, #fff));
  --rh-local-cta--accent-text-color--inverted--solid: var(--rh-cta--accent-color--inverted--solid, var(--rh-theme--accent-color, #c00));
  --rh-local-cta--accent-color--inverted--solid--hover: var(--rh-cta--accent-text-color--inverted--solid--hover, var(--rh-theme--accent-text-color--hover, #f2f2f2));
  --rh-local-cta--accent-text-color--inverted--solid--hover: var(--rh-cta--accent-color--inverted--solid--hover, var(--rh-theme--accent-color--hover, #990000)); }
  :host([solid][inverted].accent) ::slotted(a) {
    background: var(--rh-local-cta--accent-color--inverted--solid);
    color: var(--rh-local-cta--accent-text-color--inverted--solid); }
  :host([solid][inverted].accent) ::slotted(a:hover),
  :host([solid][inverted].accent) ::slotted(a:focus) {
    background: var(--rh-local-cta--accent-color--inverted--solid--hover) !important;
    color: var(--rh-local-cta--accent-text-color--inverted--solid--hover) !important; }

:host([bordered][solid]) {
  --rh-local-cta-border-color: var(--rh-cta-border-color, var(--rh-theme---color, #6e6e6e));
  --rh-local-cta-border-color--hover: var(--rh-cta-border-color--hover, var(--rh-theme---color--hover, #555555)); }
  :host([bordered][solid]) ::slotted(a) {
    border-color: var(--rh-local-cta--border-color); }
  :host([bordered][solid]) ::slotted(a:hover),
  :host([bordered][solid]) ::slotted(a:focus) {
    border-color: var(--rh-local-cta--border-color--hover); }

:host([bordered][solid].primary) {
  --rh-local-cta--primaryborder-color: var(--rh-cta--primaryborder-color, var(--rh-theme----primarycolor, #0076e0));
  --rh-local-cta--primaryborder-color--hover: var(--rh-cta--primaryborder-color--hover, var(--rh-theme----primarycolor--hover, #005bad)); }
  :host([bordered][solid].primary) ::slotted(a) {
    border-color: var(--rh-local-cta--primary-border-color); }
  :host([bordered][solid].primary) ::slotted(a:hover),
  :host([bordered][solid].primary) ::slotted(a:focus) {
    border-color: var(--rh-local-cta--primary-border-color--hover); }

:host([bordered][solid].secondary) {
  --rh-local-cta--secondaryborder-color: var(--rh-cta--secondaryborder-color, var(--rh-theme----secondarycolor, #464646));
  --rh-local-cta--secondaryborder-color--hover: var(--rh-cta--secondaryborder-color--hover, var(--rh-theme----secondarycolor--hover, #2d2d2d)); }
  :host([bordered][solid].secondary) ::slotted(a) {
    border-color: var(--rh-local-cta--secondary-border-color); }
  :host([bordered][solid].secondary) ::slotted(a:hover),
  :host([bordered][solid].secondary) ::slotted(a:focus) {
    border-color: var(--rh-local-cta--secondary-border-color--hover); }

:host([bordered][solid].accent) {
  --rh-local-cta--accentborder-color: var(--rh-cta--accentborder-color, var(--rh-theme----accentcolor, #c00));
  --rh-local-cta--accentborder-color--hover: var(--rh-cta--accentborder-color--hover, var(--rh-theme----accentcolor--hover, #990000)); }
  :host([bordered][solid].accent) ::slotted(a) {
    border-color: var(--rh-local-cta--accent-border-color); }
  :host([bordered][solid].accent) ::slotted(a:hover),
  :host([bordered][solid].accent) ::slotted(a:focus) {
    border-color: var(--rh-local-cta--accent-border-color--hover); }

:host([unfilled]) ::slotted(a) {
  background: transparent !important; }
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
