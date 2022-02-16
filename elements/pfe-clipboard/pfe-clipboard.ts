import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { pfelement, bound, observed } from '@patternfly/pfe-core/decorators.js';
import { deprecatedCustomEvent } from '@patternfly/pfe-core/functions/deprecatedCustomEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pfe-clipboard.scss';

export class CopiedEvent extends ComposedEvent {
  constructor(
    /** The copied string */
    public copiedText: string,
  ) {
    super('copied');
  }
}

/**
 * A button to copy the text to the system clipboard.
 *
 * By default it will copy the current URL, but it can also copy the text of an element,
 * or arbitrary content set as a property on the component.
 *
 * @summary A button to copy the text to the system clipboard.
 *
 * @fires {CustomEvent<{ component: PfeClipboard }>} pfe-clipboard:connected
 *        Let's you know when the component has run connectedCallback,
 *        useful for knowing when you can set the `contentToCopy` property
 *        and know that it will work. {@deprecated use `await element.updateComplete`}
 * @fires {CopiedEvent} copied
 *        fired when the user clicks the element and copies the text.
 *        Read the copied text from the `event.copiedText` property.
 * @fires {CustomEvent<{ component: PfeClipboard }>} pfe-clipboard:copied
 *        Fires when the current url is successfully copied the user's system clipboard.
 *
 *        ```js
 *        detail: {
 *          url: string
 *        }
 *        ```
 *        {@deprecated use `copied`}
 *
 * @slot label - Optionally override the button's label.
 * @slot text - Optionally override the button's label {@deprecated use `label`}.
 * @slot icon
 *       Optionally override the default link svg icon. You can inline svg `<svg slot="icon"></svg>` or use pfe-icon.
 *       For example:
 *       ```html
 *       <pfe-icon slot="icon" icon="web-icon-globe"></pfe-icon>
 *       ```
 * @slot success - Optionally override the text of the success state which defaults to `Copied`.
 * @slot text--success - {@deprecated use `success`}
 *
 * @cssprop --pfe-clipboard--Color {@default `var(--pfe-broadcasted--link, #06c)`}
 * @cssprop --pfe-clipboard--Color--focus {@default `var(--pfe-broadcasted--link--focus, #004080)`}
 * @cssprop --pfe-clipboard--Color--hover {@default `var(--pfe-broadcasted--link--hover, #004080)`}
 * @cssprop --pfe-clipboard--FontWeight {@default `var(--pfe-theme--font-weight--light, 300)`}
 * @cssprop --pfe-clipboard--FontSize {@default `1rem`}
 * @cssprop --pfe-clipboard--Padding {@default `6px 16px`}
 * @cssprop --pfe-clipboard--icon--Width {@default `16px`} `icon` region
 * @cssprop --pfe-clipboard--icon--Height {@default `auto`} `icon` region
 * @cssprop --pfe-clipboard--icon--margin {@default `0 0.4825rem 0 0`} `icon` region
 * @cssprop --pfe-clipboard--icon--Color {@default `var(--pfe-theme--color--text--muted, #6a6e73)`} `icon` region
 * @cssprop --pfe-clipboard--icon--Color--hover {@default `var(--pfe-theme--color--ui-base--hover, #151515)`} `icon` region
 * @cssprop --pfe-clipboard--icon--Color--dark {@default `var(--pfe-theme--color--text--muted--on-dark, #d2d2d2)`} `icon` region
 * @cssprop --pfe-clipboard--icon--Color--dark--hover {@default `var(--pfe-theme--color--text--on-dark, #fff)`} `icon` region
 * @cssprop --pfe-clipboard--icon--Color--saturated {@default `var(--pfe-theme--color--text--muted--on-saturated, #d2d2d2)`} `icon` region
 * @cssprop --pfe-clipboard--icon--Color--saturated--hover {@default `var(--pfe-theme--color--text--on-saturated, #fff)`} `icon` region
 */
@customElement('pfe-clipboard') @pfelement()
export class PfeClipboard extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /**
   * Optional boolean attribute that, when present, removes the icon from the template.
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-icon' }) noIcon = false;

  /**
   * Specify the amount of time in seconds the copy success text should be visible.
   */
  @property({ type: Number, reflect: true, attribute: 'copied-duration' }) copiedDuration = 4;

  /**
   * Defaults to `url`, decides what should be copied. Possible values are:
   *
   * - `url` Will copy the current page's URL.
   * - `property` Will copy the text from `contentToCopy` method of the component.
   * - A DOMString (e.g. `#copyTarget` or `.code-sample pre`) will query for the given
   *   selector within the element's root (e.g. document or a shadow root) and take the
   *   found element's `innerText` on most elements or `value` on form fields as the text to be copied.
   */
  @observed('_checkForCopyTarget')
  @property({ type: String, reflect: true, attribute: 'copy-from' })
    copyFrom: string|'url'|'property' = 'url';

  /**
   * A setter to set the content you would like to copy.
   * Only works if copy-from attribute is set to property.
   * Recommend using `connected` event to know when the component's setter is ready.
   */
  @observed
  @property({ attribute: false })
    contentToCopy: string|null = null;

  @state() private labelDefault = 'Copy';

  private logger = new Logger(this);

  private slots = new SlotController(this, {
    slots: ['icon', 'label', 'success'],
    deprecations: {
      'label': 'text',
      'success': 'text--success',
    }
  });

  connectedCallback() {
    super.connectedCallback();
    // TODO: remove this code, a real button has been added within pfe-clipboard. this is much more robust than role button and tabindex 0
    // this.setAttribute('role', 'button');
    // this.setAttribute('tabindex', '0');

    // Since this element as the role of button we are going to listen
    // for click and as well as 'enter' and 'space' commands to trigger
    // the copy functionality
    this.addEventListener('click', this._clickHandler.bind(this));
    this.addEventListener('keydown', this._keydownHandler.bind(this));

    // Make sure the thing we might copy exists
    this._checkForCopyTarget();

    this.dispatchEvent(deprecatedCustomEvent('pfe-clipboard:connected', { component: this }));

    // This prevents a regression, default text used to be "Copy URL".
    // Now that component can copy _anything_ that's not ideal default text
    if (this.copyFrom === 'url' && !this.slots.hasSlotted('text')) {
      this.labelDefault = 'Copy URL';
    }
  }

  render() {
    // TODO: Remove deprecated `text--success` slot and associated logic in 3.0
    const useNewSuccessSlot = this.slots.hasSlotted('success') || !this.slots.hasSlotted('text--success');
    // TODO: Remove deprecated `text` slot and associated logic in 3.0
    const useNewLabelSlot = this.slots.hasSlotted('label') || !this.slots.hasSlotted('text');
    return html`
      <button class="pfe-clipboard__button">
          <!-- icon slot -->
          ${this.noIcon ? '' : html`
          <div class="pfe-clipboard__icon" aria-hidden="true">
            <slot name="icon" id="icon">
              <svg id="icon--url" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 15.277 16">
                <g transform="translate(-2.077 -1.807)">
                  <path class="a" d="M15.34,2.879a3.86,3.86,0,0,0-5.339,0L6.347,6.545a3.769,3.769,0,0,0,0,5.339.81.81,0,0,0,1.132,0,.823.823,0,0,0,0-1.145A2.144,2.144,0,0,1,7.5,7.677l3.641-3.654a2.161,2.161,0,1,1,3.049,3.062l-.8.8a.811.811,0,1,0,1.145,1.132l.8-.8a3.769,3.769,0,0,0,0-5.339Z" transform="translate(0.906 0)"/>
                  <path class="a" d="M10.482,6.822a.823.823,0,0,0,0,1.145,2.161,2.161,0,0,1,0,3.049L7.343,14.155a2.161,2.161,0,0,1-3.062,0,2.187,2.187,0,0,1,0-3.062l.193-.116a.823.823,0,0,0,0-1.145.811.811,0,0,0-1.132,0l-.193.193a3.86,3.86,0,0,0,0,5.339,3.86,3.86,0,0,0,5.339,0l3.126-3.139A3.731,3.731,0,0,0,12.72,9.562a3.769,3.769,0,0,0-1.094-2.74A.823.823,0,0,0,10.482,6.822Z" transform="translate(0 1.37)"/>
                </g>
              </svg>
              <svg id="icon--copy" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32">
                <g></g>
                <path d="M30.286 6.857q0.714 0 1.214 0.5t0.5 1.214v21.714q0 0.714-0.5 1.214t-1.214 0.5h-17.143q-0.714 0-1.214-0.5t-0.5-1.214v-5.143h-9.714q-0.714 0-1.214-0.5t-0.5-1.214v-12q0-0.714 0.357-1.571t0.857-1.357l7.286-7.286q0.5-0.5 1.357-0.857t1.571-0.357h7.429q0.714 0 1.214 0.5t0.5 1.214v5.857q1.214-0.714 2.286-0.714h7.429zM20.571 10.661l-5.339 5.339h5.339v-5.339zM9.143 3.804l-5.339 5.339h5.339v-5.339zM12.643 15.357l5.643-5.643v-7.429h-6.857v7.429q0 0.714-0.5 1.214t-1.214 0.5h-7.429v11.429h9.143v-4.571q0-0.714 0.357-1.571t0.857-1.357zM29.714 29.714v-20.571h-6.857v7.429q0 0.714-0.5 1.214t-1.214 0.5h-7.429v11.429h16z"/>
              </svg>
            </slot>
          </div>
      `}
      <div class="pfe-clipboard__text">
        ${useNewLabelSlot ? html`
        <slot name="label" id="label">${this.labelDefault}</slot>
        ` : html`
        <slot name="text" id="text">${this.labelDefault}</slot>
        `}
      </div>
      <div class="pfe-clipboard__text--success" role="alert" aria-live="polite">
        ${useNewSuccessSlot ? html`
        <slot name="success" id="success">Copied</slot>
        ` : html`
        <slot name="text--success" id="text--success">Copied</slot>
        `}
      </div>
      </button>
      <div class="pfe-clipboard__text-alert sr-only" role="alert" tabindex="0" aria-live="polite" hidden>
        ${useNewSuccessSlot ? html`
        <slot name="success" id="success-alert">Copied.</slot>
        ` : html`
        <slot name="text--success" id="text-alert--success">Copied.</slot>
        `}
      </div>
    `;
  }

  /**
   * Checks to make sure the thing we may copy exists
   */
  @bound private _checkForCopyTarget() {
    // const button = this.shadowRoot?.querySelector('button');
    // const clipBoardText = this.shadowRoot?.querySelector('.pfe-clipboard__text');
    const textSuccess = this.shadowRoot?.querySelector('.pfe-clipboard__text--success');
    const textAlert = this.shadowRoot?.querySelector('.pfe-clipboard__text-alert');

    if (this.copyFrom === 'property') {
      if (!this.contentToCopy) {
        // button?.setAttribute('aria-busy', 'true');
        this.setAttribute('disabled', '');
      } else if (this.hasAttribute('disabled')) {
        // clipBoardText?.removeAttribute("hidden");
        this.removeAttribute('disabled');
      }
    } else if (this.copyFrom.length) {
      // clipBoardText?.removeAttribute("hidden");
    //  textSuccess?.removeAttribute("hidden");
    //  textAlert?.removeAttribute("hidden");
      // If target is set to anything else, we're not doing checks for it
      this.removeAttribute('disabled');
    }
  }

  /**
   * Event handler for any activation of the copy button
   */
  @bound private async _clickHandler() {
    // const button = this.shadowRoot?.querySelector('button');
    let text;

    switch (this.copyFrom) {
      // Copy current URL
      case 'url':
        text = window.location.href;
        break;
      // Copy whatever is in this.contentToCopy
      case 'property':
        if (this.contentToCopy) {
          text = this.contentToCopy;
        } else {
          // button?.setAttribute('aria-busy', 'true');
          this.setAttribute('disabled', '');
          this.logger.error('Set to copy property, but this.contentToCopy is not set');
          return;
        }
        break;
      // Assume what's in the target property is a selector and copy the text from the element
      default: {
        const targetElement =
          (this.getRootNode() as Document|ShadowRoot).querySelector<HTMLElement>(this.copyFrom);
        if (targetElement?.tagName) {
          // What needs to be copied changes for some types of elements
          switch (targetElement.tagName.toLowerCase()) {
            // Copy the value of form fields
            case 'input':
              text = (targetElement as HTMLInputElement).value;
              break;
            // Copy the text of our element
            default:
              text = targetElement.innerText;
              break;
          }
        }
        break;
      }
    }

    if (!text || (typeof text === 'string' && !text.length)) {
    //  button?.setAttribute('aria-busy', 'true');
      this.logger.error('Couldn\'t find text to copy.');
      this.setAttribute('disabled', '');
      return;
    }

    // Execute the copy to clipboard functionality
    try {
      const copiedText = await this.copyTextToClipboard(text);
      // Emit event that lets others know the user has "copied"
      // the url. We are also going to include the url that was
      // copied.
      this.dispatchEvent(new CopiedEvent(copiedText));
      this.dispatchEvent(deprecatedCustomEvent('pfe-clipboard:copied', {
        url: copiedText, // @todo deprecate
        copiedText,
      }));
      // Toggle the copied state. Use the this._formattedCopiedTimeout function
      // to set an appropriate setTimout length.
      this.setAttribute('copied', '');
      // button?.setAttribute('aria-busy', 'false');
      setTimeout(() => {
        this.removeAttribute('copied');
        // button?.setAttribute('aria-busy', 'true');
      }, this._formattedCopiedTimeout());
    } catch (error) {
      this.logger.warn(error as string);
      this._checkForCopyTarget();
    }
  }

  protected _contentToCopyChanged() {
    if (this.contentToCopy) {
      this.removeAttribute('disabled');
    }
  }

  /**
   * Formatted copied timeout value. Use the formattedCopiedTimeout function
   * to get a type safe, millisecond value of the timeout duration.
   */
  private _formattedCopiedTimeout() {
    const copiedDuration = Number(this.copiedDuration * 1000);
    if ((copiedDuration < -1)) {
      this.logger.warn(`copied-duration must be a valid number. Defaulting to 4 seconds.`);
      // default to 4 seconds
      // accessibility note: ensure that the user has enough time to read and also hear the text changes, for longer amounts of text increase the duration time to at least 6 seconds
      return 4000;
    } else if ((copiedDuration < 4000)) {
      this.logger.warn(`copied-duration must be 4 seconds or more. Defaulting to 4 seconds.`);
      return 4000;
    } else {
      return copiedDuration;
    }
  }

  /**
   * Listen for keyboard events and map them to their
   * corresponding mouse events.
   */
  @bound private _keydownHandler(event: KeyboardEvent) {
    const { key } = event;
    switch (key) {
      case 'Enter':
        this._clickHandler();
        break;
      case ' ':
        // Prevent the browser from scolling when the user hits the space key
        event.stopPropagation();
        event.preventDefault();
        this._clickHandler();
        break;
    }
  }

  /**
   * Copy arbitrary text to system clipboard
   *
   * If available, it will use the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/clipboard)
   * to access the system clipboard
   *
   * If Clipboard is unavailable, it will use the legacy [`execCommand`](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)
   *
   * ```js
   * document.querySelector("pfe-clipboard").copyTextToClipboard(text)
   *   .then(res => console.log(`Successfully copied: ${res}`))
   *   .catch(error => console.error(error));
   * ```
   *
   */
  async copyTextToClipboard(text: string): Promise<string> {
    if (!text) {
      this.logger.error('Copy function called, but no text was given to copy.');
    }
    if (navigator.clipboard) {
      // If the Clipboard API is available then use that
      await navigator.clipboard.writeText(text);
      return text;
    } else if (document.queryCommandEnabled('copy')) {
      // If execCommand("copy") exists then use that method
      const dummy = document.createElement('input');
      document.body.appendChild(dummy);
      dummy.value = text;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      return text;
    } else {
      throw new Error('Current browser does not support copying to the clipboard.');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-clipboard': PfeClipboard;
  }
}
