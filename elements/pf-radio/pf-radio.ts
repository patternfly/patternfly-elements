import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';
import { state } from 'lit/decorators/state.js';

import styles from './pf-radio.css';

export class PfRadioChangeEvent extends Event {
  constructor(public event: Event, public value: string) {
    super('change', { bubbles: true });
  }
}

/**
 * Radio
 * @slot - Place element content here
 */
@customElement('pf-radio')
export class PfRadio extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static formAssociated = true;

  static shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true }) name = '';

  @property({ reflect: true }) label?: string;

  @property({ reflect: true }) value = '';

  @state() private focusable = false;

  /** Radio groups: instances.get(groupName).forEach(pfRadio => { ... }) */
  private static instances = new Map<string, Set<PfRadio>>();

  private static selected = new Map<string, PfRadio>;

  static {
    globalThis.addEventListener('keydown', e => {
      switch (e.key) {
        case 'Tab':
          this.instances.forEach((radioSet, groupName) => {
            const selected = this.selected.get(groupName);
            [...radioSet].forEach((radio, i, radios) => {
              // the radio group has a selected element
              // it should be the only focusable member of the group
              if (selected) {
                radio.focusable = radio === selected;
              // when Shift-tabbing into a group, only the last member should be selected
              } else if (e.shiftKey) {
                radio.focusable = radio === radios.at(-1);
              // otherwise, the first member must be focusable
              } else {
                radio.focusable = i === 0;
              }
            });
          });
          break;
      }
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.#onKeydown);
  }

  @observes('checked')
  protected checkedChanged(): void {
    if (this.checked) {
      PfRadio.selected.set(this.name, this);
    }
  }

  @observes('name')
  protected nameChanged(oldName: string): void {
    // reset the map of groupname to selected radio button
    if (PfRadio.selected.get(oldName) === this) {
      PfRadio.selected.delete(oldName);
      PfRadio.selected.set(this.name, this);
    }
    if (typeof oldName === 'string') {
      PfRadio.instances.get(oldName)?.delete(this);
    }
    if (!PfRadio.instances.has(this.name)) {
      PfRadio.instances.set(this.name, new Set());
    }
    PfRadio.instances.get(this.name)?.add(this);
  }

  disconnectedCallback(): void {
    PfRadio.instances.get(this.name)?.delete(this);
    super.disconnectedCallback();
  }

  #onRadioButtonClick(event: Event) {
    if (!this.checked) {
      const root: Node = this.getRootNode();
      let radioGroup: NodeListOf<PfRadio>;
      if (root instanceof Document || root instanceof ShadowRoot) {
        radioGroup = root.querySelectorAll('pf-radio');
        radioGroup.forEach((radio: PfRadio) => {
          const element: HTMLElement = radio as HTMLElement;
          // avoid removeAttribute: set checked property instead
          // even better: listen for `change` on the shadow input,
          // and recalculate state from there.
          element?.removeAttribute('checked');
        });
        this.checked = true;
        this.dispatchEvent(new PfRadioChangeEvent(event, this.value));
      }
    }
  }

  // Function to handle keyboard navigation
  #onKeydown = (event: KeyboardEvent) => {
    const arrowKeys: string[] = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
    if (arrowKeys.includes(event.key)) {
      const root: Node = this.getRootNode();
      if (root instanceof Document || root instanceof ShadowRoot) {
        const radioGroup: NodeListOf<PfRadio> = root.querySelectorAll('pf-radio');
        radioGroup.forEach((radio: PfRadio, index: number) => {
          this.checked = false;

          if (radio === event.target) {
            const isArrowDownOrRight: boolean = ['ArrowDown', 'ArrowRight'].includes(event.key);
            const isArrowUpOrLeft: boolean = ['ArrowUp', 'ArrowLeft'].includes(event.key);
            const direction: 1 | 0 | -1 = isArrowDownOrRight ? 1 : isArrowUpOrLeft ? -1 : 0;
            if (direction === 0) {
              return;
            }
            const nextIndex: number = (index + direction + radioGroup.length) % radioGroup.length;
            radioGroup[nextIndex].focus();
            radioGroup[nextIndex].checked = true;
            // TODO: move this to an @observes
            // consider the api of this event.
            // do we add the group to it? do we fire from every element on every change?
            this.dispatchEvent(new PfRadioChangeEvent(event, radioGroup[nextIndex].value));
          }
        });
      }
    }
  };

  render(): TemplateResult<1> {
    return html`
      <input
        id="radio"
        type="radio"
        @click=${this.#onRadioButtonClick}
        .name=${this.name}
        value=${this.value}
        tabindex=${this.focusable ? 0 : -1}
        .checked=${this.checked}
      >
      <label for="radio">${this.label}</label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-radio': PfRadio;
  }
}
