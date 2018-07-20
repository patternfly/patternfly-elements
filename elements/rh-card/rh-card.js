import Rhelement from "../rhelement/rhelement.js";

class RhCard extends Rhelement {
  get html() {
    return `
<style>
:host {
  display: block;
  padding: var(--rhe-theme--spacer, 1rem);
  border: var(--rhe-theme--border--BorderWidth, 1px) var(--rhe-theme--border--BorderStyle, solid) transparent; }

:host([theme="dark"]) {
  background: var(--rhe-theme--bg-color--shade7, #252527);
  color: var(--rhe-theme--text-color--shade7, #fff); }

:host([theme="light"]) {
  background: var(--rhe-theme--bg-color--shade2, #e7e7e7);
  color: var(--rhe-theme--text-color--shade2, #333); }

:host .rh-card__header::slotted(h1:first-child),
:host .rh-card__header::slotted(h2:first-child),
:host .rh-card__header::slotted(h3:first-child),
:host .rh-card__header::slotted(h4:first-child),
:host .rh-card__header::slotted(h5:first-child),
:host .rh-card__header::slotted(h6:first-child) {
  margin-top: 0 !important; }
</style>

<slot class="rh-card__header" name="header"></slot>
<slot class="rh-card__body"></slot>
<slot class="rh-card__footer" name="footer"></slot>`;
  }

  static get tag() {
    return "rh-card";
  }

  get styleUrl() {
    return "rh-card.scss";
  }

  get templateUrl() {
    return "rh-card.html";
  }

  constructor() {
    super(RhCard.tag);
  }
}

Rhelement.create(RhCard);
