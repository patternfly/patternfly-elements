
import { customElement } from 'lit/decorators.js';
import { property } from 'lit/decorators.js';

import { BaseTile } from './BaseTile.js';

import styles from './pfe-tile.scss';

/**
 * Tile
 * @slot - Place element content here
 */
@customElement('pfe-tile')
export class PfeTile extends BaseTile {
  static readonly version = '{{version}}';

  static readonly styles = [styles];

  @property({ reflect: true, type: Boolean }) selected = false;

  @property({ reflect: true, type: Boolean }) stacked = false;

  @property({ reflect: true, type: Boolean }) large = false;
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-tile': PfeTile;
}
}
