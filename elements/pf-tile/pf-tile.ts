
import { customElement } from 'lit/decorators.js';
import { property } from 'lit/decorators.js';

import { BaseTile } from './BaseTile.js';

import styles from './pf-tile.css';

export type StackedSize = (
  | 'md'
  | 'lg'
)

/**
 * Tile
 *
 * @slot icon           - Icon expects a `<pf-icon>` or `<svg>`
 * @slot title          - the title of the tile should be a heading
 * @slot                - The content should be a paragraph
 *
 * @csspart icon        - container for the icon
 * @csspart title       - container for the title
 * @csspart body        - container for the body content
 *
 * @attr {'boolean'} selected       - selected variant
 * @attr {'md'|'lg'|null} stacked   - stacked variant
 *
 * @cssprop   {<length>} --pf-c-tile--PaddingTop      {@default `1.5rem`}
 * @cssprop   {<length>} --pf-c-tile--PaddingRight    {@default `1.5rem`}
 * @cssprop   {<length>} --pf-c-tile--PaddingBottom   {@default `1.5rem`}
 * @cssprop   {<length>} --pf-c-tile--PaddingLeft     {@default `1.5rem`}
 *
 * @cssprop   {<color>} --pf-c-tile--BackgroundColor  {@default `#FFFFFF`}
 *
 * @cssprop   --pf-c-tile--Transition {@default `none`}
 * @cssprop   --pf-c-tile--TranslateY {@default `0`}
 *
 * @cssprop   {<length>} --pf-c-tile--before--BorderWidth {@default `1px`}
 * @cssprop   {<color>} --pf-c-tile--before--BorderColor  {@default `#444548`}
 *
 * @cssprop   {<length>} --pf-c-tile--after--Height {@default `3px`}
 * @cssprop   {<color>} --pf-c-tile--after--BackgroundColor {@default `transparent`}
 *
 * @cssprop   --pf-c-tile--after--Transition {@default `none`}
 * @cssprop   --pf-c-tile--after--ScaleY {@default `1`}
 *
 * @cssprop   {<color>} --pf-c-tile__title--Color {@default `#06c`}
 * @cssprop   {<color>} --pf-c-tile__icon--Color {@default `#06c`}
 *
 * @cssprop   {<length>} --pf-c-tile__icon--MarginRight {@default `0`}
 * @cssprop   {<length>} --pf-c-tile__icon--FontSize {@default `1.5rem`}
 *
 * @cssprop   {<lenght>} --pf-c-tile__header--m-stacked__icon--MarginBottom {@default `0.25rem`}
 */
@customElement('pf-tile')
export class PfTile extends BaseTile {
  static readonly styles = [styles];

  @property({ reflect: true, type: Boolean }) selected = false;

  @property({ reflect: true }) stacked?: StackedSize;
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tile': PfTile;
}
}
