import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './pf-v6-hint.css';

/**
 * A hint provides a reminder or call to action when a message should
 * stay on the page. Authors SHOULD put the message in the default slot.
 * The hint is not a landmark and does not take keyboard focus; Tab moves
 * through slotted links and buttons. It has no ARIA role, so a screen
 * reader announces the title and message. Authors SHOULD AVOID the global
 * title attribute, which opens the browser tooltip.
 *
 * @summary Shares a reminder, explanation, or call to action
 *
 * @slot - Inline text or an inline link. Screen readers announce this message.
 * @slot title - Inline title text, such as a span or heading. Screen readers announce this text.
 * @slot actions - Button or menu toggle text and icons. Screen readers announce each control's accessible name, and the controls stay in the tab order.
 * @slot footer - Link button text. Screen readers announce each link, and the links stay in the tab order.
 *
 * @alias Hint
 *
 * @cssprop {<length>} --pf-v6-c-hint--GridRowGap - Space between hint rows. Defaults to the design system `--pf-t--global--spacer--sm`.
 * @cssprop {<length>} --pf-v6-c-hint--PaddingBlockStart - Padding at the block start. Defaults to the design system `--pf-t--global--spacer--lg`.
 * @cssprop {<length>} --pf-v6-c-hint--PaddingBlockEnd - Padding at the block end. Defaults to the design system `--pf-t--global--spacer--lg`.
 * @cssprop {<length>} --pf-v6-c-hint--PaddingInlineStart - Padding at the inline start. Defaults to the design system `--pf-t--global--spacer--lg`.
 * @cssprop {<length>} --pf-v6-c-hint--PaddingInlineEnd - Padding at the inline end. Defaults to the design system `--pf-t--global--spacer--lg`.
 * @cssprop {<color>} --pf-v6-c-hint--BackgroundColor - Hint background color. Defaults to the design system `--pf-t--global--background--color--primary--default`.
 * @cssprop {<color>} --pf-v6-c-hint--BorderColor - Hint border color. Defaults to the design system `--pf-t--global--border--color--status--info--default`.
 * @cssprop {<length>} --pf-v6-c-hint--BorderWidth - Hint border width. Defaults to the design system `--pf-t--global--border--width--box--status--default`.
 * @cssprop {<length>} --pf-v6-c-hint--BorderRadius - Hint corner radius. Defaults to the design system `--pf-t--global--border--radius--medium`.
 * @cssprop {<color>} --pf-v6-c-hint--Color - Hint text color. Defaults to the design system `--pf-t--global--text--color--regular`.
 * @cssprop {<number>} --pf-v6-c-hint__title--FontWeight - Title font weight. Defaults to the design system `--pf-t--global--font--weight--body--bold`.
 * @cssprop {<length>} --pf-v6-c-hint__body--FontSize - Message font size. Defaults to the design system `--pf-t--global--font--size--body--default`.
 * @cssprop {<length>} --pf-v6-c-hint__footer--MarginBlockStart - Space before the footer. Defaults to the design system `--pf-t--global--spacer--sm`.
 * @cssprop {<length>} --pf-v6-c-hint__footer--child--MarginInlineEnd - Space between footer items. Defaults to the design system `--pf-t--global--spacer--md`.
 * @cssprop {<length>} --pf-v6-c-hint__actions--MarginInlineStart - Space before the actions. Defaults to the design system `--pf-t--global--spacer--2xl`.
 * @cssprop {<length>} --pf-v6-c-hint__actions--c-menu-toggle--MarginBlockStart - Block-start offset for plain actions. Defaults to the negative of the design system `--pf-t--global--spacer--sm` token.
 * @cssprop {<length>} --pf-v6-c-hint__actions--c-menu-toggle--MarginBlockEnd - Block-end offset for plain actions. Defaults to the negative of the design system `--pf-t--global--spacer--sm` token.
 */
@customElement('pf-v6-hint')
export class PfV6Hint extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  /**
   * Removes the offset that pulls plain actions up to align with the title.
   * Set this when the action is larger than a plain menu toggle, such as a
   * primary button, or when the title is taller than one line.
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-actions-offset' })
  noActionsOffset = false;

  #slots = new SlotController(this, 'actions', 'title', 'footer');

  override render(): TemplateResult {
    const actionsHidden = this.#slots.isEmpty('actions');
    const titleHidden = this.#slots.isEmpty('title');
    const footerHidden = this.#slots.isEmpty('footer');

    return html`
      <div id="actions" ?hidden="${actionsHidden}">
        <!-- summary: Actions, such as a plain menu toggle or a button
             description: |
               Button or menu toggle text and icons. Screen readers announce each control's accessible name, and the controls stay in the tab order.
        -->
        <slot name="actions"></slot>
      </div>
      <div id="title" ?hidden="${titleHidden}">
        <!-- summary: Title text
             description: |
               Inline title text, such as a span or heading. Screen readers announce this text.
        -->
        <slot name="title"></slot>
      </div>
      <div id="body">
        <!-- summary: Hint message
             description: |
               Inline text or an inline link. Screen readers announce this message.
        -->
        <slot></slot>
      </div>
      <div id="footer" ?hidden="${footerHidden}">
        <!-- summary: Footer actions, such as a link button
             description: |
               Link button text. Screen readers announce each link, and the links stay in the tab order.
        -->
        <slot name="footer"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-hint': PfV6Hint;
  }
}
