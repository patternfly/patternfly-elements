import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-button.html and css from
 * rh-button.scss
 */
const template = document.createElement("template");
template.innerHTML = `
<style>:host {
  display: inline-block; }

:host button {
  padding: 0 var(--rhe-theme--spacer, 1rem);
  font-size: var(--rhe-theme--FontSize, 16px);
  line-height: var(--rhe-theme--spacer--lg, 2rem);
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: var(--rhe-theme--button-border--BorderRadius, 2px);
  background: var(--rh-button--theme--default-color--Background, #e7e7e7);
  color: var(--rh-button--theme--default-color--Color, #333); }

:host button:hover {
  background: var(--rh-button--theme--default-color--hover--Background, #bebebe);
  color: var(--rh-button--theme--default-color--hover--Color, #333); }

:host(.primary) button {
  background: var(--rh-button--theme--primary-color--Background, #0076e0);
  color: var(--rh-button--theme--primary-color--Color, #fff); }

:host(.primary) button:hover {
  background: var(--rh-button--theme--primary-color--hover--Background, #004080);
  color: var(--rh-button--theme--primary-color--hover--Color, #fff); }</style>
<button><slot></slot></button>
`;
/* end DO NOT EDIT */

class RhButton extends Rhelement {
  constructor() {
    super("rh-button", template);
  }
}

window.customElements.define("rh-button", RhButton);
