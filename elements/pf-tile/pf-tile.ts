import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from '@patternfly/pfe-core/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-tile.css';

export type StackedSize = (
  | 'md'
  | 'lg'
);

/**
 * A **tile** component is a form of selection that can be used in place of a
 * radio button and is commonly used in forms. A tile appears visually similar to a
 * [selectable card](../card/). However, tiles are used specifically when the user is selecting
 * a static option, whereas a selectable card triggers an action or opens a quickstart
 * or sidebar to provide additional information.
 * @slot icon           - Icon expects a `<pf-icon>` or `<svg>`
 * @slot title          - the title of the tile should be a heading
 * @slot                - The content should be a paragraph
 * @csspart icon        - container for the icon
 * @csspart title       - container for the title
 * @csspart body        - container for the body content
 * @attr {'boolean'} selected       - selected variant
 * @attr {'md'|'lg'|null} stacked   - stacked variant
 * @cssprop   {<length>} [--pf-c-tile--PaddingTop=1.5rem]
 * @cssprop   {<length>} [--pf-c-tile--PaddingRight=1.5rem]
 * @cssprop   {<length>} [--pf-c-tile--PaddingBottom=1.5rem]
 * @cssprop   {<length>} [--pf-c-tile--PaddingLeft=1.5rem]
 * @cssprop   {<color>} [--pf-c-tile--BackgroundColor=#FFFFFF]
 * @cssprop   [--pf-c-tile--Transition=none]
 * @cssprop   [--pf-c-tile--TranslateY=0]
 * @cssprop   {<length>} [--pf-c-tile--before--BorderWidth=1px]
 * @cssprop   {<color>} [--pf-c-tile--before--BorderColor=#444548]
 * @cssprop   {<length>} [--pf-c-tile--after--Height=3px]
 * @cssprop   {<color>} [--pf-c-tile--after--BackgroundColor=transparent]
 * @cssprop   [--pf-c-tile--after--Transition=none]
 * @cssprop   [--pf-c-tile--after--ScaleY=1]
 * @cssprop   {<color>} [--pf-c-tile__title--Color=#06c]
 * @cssprop   {<color>} [--pf-c-tile__icon--Color=#06c]
 * @cssprop   {<length>} [--pf-c-tile__icon--MarginRight=0]
 * @cssprop   {<length>} [--pf-c-tile__icon--FontSize=1.5rem]
 * @cssprop   {<length>} [--pf-c-tile__header--m-stacked__icon--MarginBottom=0.25rem]
 */
@customElement('pf-tile')
export class PfTile extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @property({ reflect: true, type: Boolean }) selected = false;

  @property({ reflect: true }) stacked?: StackedSize;

  override render(): TemplateResult<1> {
    return html`
      <div part="header">
        <div part="icon">
          <slot id="icon" name="icon"></slot>
        </div>
        <div part="title">
          <slot id="title" name="title"></slot>
        </div>
      </div>
      <div part="body">
        <slot id="body"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tile': PfTile;
  }
}
