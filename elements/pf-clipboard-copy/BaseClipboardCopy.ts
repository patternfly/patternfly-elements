import { LitElement } from 'lit';
import { ComposedEvent } from '@patternfly/pfe-core';
import styles from './BaseClipboardCopy.css';

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

  abstract value: string;

  /**
   * Copy the current value to the clipboard.
   */
  async copy() {
    await navigator.clipboard.writeText(this.value);
    this.dispatchEvent(new ClipboardCopyCopiedEvent(this.value));
  }
}
