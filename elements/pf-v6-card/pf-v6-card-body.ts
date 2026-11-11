import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import style from './pf-v6-card-body.css';

/**
 * A **card body** provides the main content area for a `pf-v6-card`. Use it
 * when a card has more than one body section; each section provides its own
 * spacing and fill behavior. A card body SHOULD contain the card's primary
 * content. It fills the available height of its card by default; set `no-fill`
 * to prevent a section from growing.
 *
 * @summary Provides a body section for a card
 *
 * @slot - Block elements containing the section content. Screen reader users navigate headings, links, and controls inside as usual; AVOID nested interactive content when the parent card is selectable-only or actionable-only.
 *
 * @cssprop {<length>} --pf-v6-c-card--child--PaddingBlockEnd - Block-end padding; defaults to `--pf-t--global--spacer--lg`
 * @cssprop {<length>} --pf-v6-c-card--child--PaddingInlineEnd - Inline-end padding; defaults to `--pf-t--global--spacer--lg`
 * @cssprop {<length>} --pf-v6-c-card--child--PaddingInlineStart - Inline-start padding; defaults to `--pf-t--global--spacer--lg`
 * @cssprop {<length>} --pf-v6-c-card--first-child--PaddingBlockStart - Block-start padding when first in the card; defaults to `--pf-t--global--spacer--lg`
 * @cssprop {<length>} --pf-v6-c-card__body--FontSize - Body font size; defaults to `--pf-t--global--font--size--body--default`
 * @cssprop {<color>} --pf-v6-c-card__body--Color - Body text color; defaults to `--pf-t--global--text--color--regular`
 */
@customElement('pf-v6-card-body')
export class PfV6CardBody extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  /**
   * Prevents the body section from filling the available height of the card.
   */
  @property({ reflect: true, type: Boolean, attribute: 'no-fill' }) noFill = false;

  override render(): TemplateResult<1> {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-card-body': PfV6CardBody;
  }
}
