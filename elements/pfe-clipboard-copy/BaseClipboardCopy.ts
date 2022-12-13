import { LitElement, html } from 'lit';
import type { TemplateResult, PropertyValueMap } from 'lit';
import { property, state } from 'lit/decorators.js';
import { ComposedEvent } from '@patternfly/pfe-core';
import styles from './BaseClipboardCopy.scss';

export class ClipboardCopyCopiedEvent extends ComposedEvent {
  constructor(
    public text: string
  ) {
    super('copy');
  }
}

/**
 * Clipboard Copy
 * @slot - Place element content here
 */
export abstract class BaseClipboardCopy extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [styles];

  @property({ type: String }) value = '';

  /**
   * Copy the current value to the clipboard.
   */
  protected _copyToClipboard(): void {
    navigator.clipboard.writeText(this.value);
    this.dispatchEvent(new ClipboardCopyCopiedEvent(this.value));
  }

  /**
   * Update the value property when it changes in the input.
   */
  protected _valueChangeHandler(e: Event): void {
    const { value } = e.target as HTMLInputElement || HTMLTextAreaElement;
    this.value = value;
  }

  protected firstUpdated(): void {
    this._onSlotChange();
  }

  /**
   * Slotchange callback.
   */
  protected _onSlotChange(): void {
    // Collect all text node from either the slot[name=value] or the default slot content.
    const children = [...this.childNodes].filter(i => (['value', '', null, false].includes(i?.getAttribute?.('slot') ?? false)));
    if (children.length > 0) {
      this.value = children.map(child => {
        // Get the textContent of each child
        let _text = child?.textContent;
        // Romove unecessary whitespace.
        // @todo This needs more comprehensive formatting to properly convert markup to text.
        _text = _text?.replace(/^[\s\\]*/gm, '') as string | null;
        return _text;
      }).join('');
    }
  }
}
