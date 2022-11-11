import { customElement } from 'lit/decorators.js';
import { BaseCodeBlock } from './BaseCodeBlock.js';
import styles from './pfe-code-block.scss';

/**
 * @slot code
 *       The slot to put the code in
 * @slot expandable-code
 *       The slot to put the code in that should be revealed when the "Show more" button is
 *       clicked to expand the code-block
 * @slot actions
 *       Contains the actions for the code-block. For example, copy to clipboard.
 * @attr {boolean} expanded {@default `false`}
 *       Indicates if the code-block has been expanded
 * @cssprop {<color>} --pf-c-code-block--BackgroundColor {@default `#f0f0f0`}
 * @cssprop {<length>} --pf-c-code-block__header--BorderBottomWidth {@default `1px`}
 * @cssprop {<color>} --pf-c-code-block__header--BorderBottomColor {@default `#d2d2d2`}
 * @cssprop {<length>} --pf-c-code-block__content--PaddingTop {@default `1rem`}
 * @cssprop {<length>} --pf-c-code-block__content--PaddingRight {@default `1rem`}
 * @cssprop {<length>} --pf-c-code-block__content--PaddingBottom {@default `1rem`}
 * @cssprop {<length>} --pf-c-code-block__content--PaddingLeft {@default `1rem`}
 * @cssprop {<length>} --pf-c-code-block__pre--FontSize {@default `0.875rem`}
 * @cssprop {<string>} --pf-c-code-block__pre--FontFamily {@default `"Liberation Mono", consolas, "SFMono-Regular", menlo, monaco, "Courier New", monospace`}
 */

@customElement('pfe-code-block')
export class PfeCodeBlock extends BaseCodeBlock {
  static readonly version = '{{version}}';
  static readonly styles = [...BaseCodeBlock.styles, styles];
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-code-block': PfeCodeBlock;
  }
}
