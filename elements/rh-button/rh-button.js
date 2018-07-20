import Rhelement from "../rhelement/rhelement.js";

class RhButton extends Rhelement {
  get html() {
    return `
<style>
:host {
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
  color: var(--rh-button--theme--primary-color--hover--Color, #fff); }
</style>

<button><slot></slot></button>`;
  }

  static get tag() {
    return "rh-button";
  }

  get styleUrl() {
    return "rh-button.scss";
  }

  get templateUrl() {
    return "rh-button.html";
  }

  constructor() {
    super(RhButton.tag);
  }
}

Rhelement.create(RhButton);
