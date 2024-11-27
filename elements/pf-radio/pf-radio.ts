import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import styles from './pf-radio.css';
import { property } from 'lit/decorators/property.js';

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

  @property({
    type: Boolean,
    attribute: 'checked',
    converter: {
      fromAttribute: value => value === 'true',
    },
    reflect: true,
  })
  checked = false;

  @property({
    type: Boolean,
    attribute: 'disabled',
    converter: {
      fromAttribute: value => value === 'true',
    },
    reflect: true,
  })
  disabled = false;

  @property({ attribute: 'name', reflect: true }) name = '';
  @property({ attribute: 'label', reflect: true }) label?: string;
  @property({ attribute: 'value', reflect: true }) value = '';
  @property({ attribute: 'id', reflect: true }) id = '';
  @property({ attribute: 'tabindex', reflect: true }) tabIndex = -1;

  constructor() {
    super();
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('keydown', this.#onKeydown);
    document.addEventListener('keydown', this.#onKeyPress);
  }

  #onRadioButtonClick() {
    if (!this.checked) {
      const root: Node = this.getRootNode();
      let radioGroup: NodeListOf<PfRadio>;
      if (root instanceof Document || root instanceof ShadowRoot) {
        radioGroup = root.querySelectorAll('pf-radio');
        radioGroup.forEach((radio: PfRadio) => {
          const element: HTMLElement = radio as HTMLElement;
          element?.removeAttribute('checked');
          element.tabIndex = -1;
        });
        this.checked = true;
        this.tabIndex = 0;
      }
    }
  }

  // Function to handle tab key navigation
  #onKeyPress = (event: KeyboardEvent) => {
    const root: Node = this.getRootNode();
    if (root instanceof Document || root instanceof ShadowRoot) {
      const radioGroup: NodeListOf<PfRadio> = root.querySelectorAll('pf-radio');
      const isRadioChecked: boolean = Array.from(radioGroup).some(
        (radio: PfRadio) => radio.checked
      );
      if (event.key === 'Tab') {
        radioGroup.forEach((radio: PfRadio) => {
          radio.tabIndex = radio.checked ? 0 : -1;
        });
        if (!isRadioChecked) {
          radioGroup.forEach((radio: PfRadio, index: number) => {
            radio.tabIndex = -1;
            if (event.shiftKey) {
              if (index === radioGroup.length - 1) {
                radio.tabIndex = 0;
              }
            } else if (index === 0) {
              radio.tabIndex = 0;
            }
          });
        }
      }
    }
  };

  // Function to handle keyboard navigation
  #onKeydown = (event: KeyboardEvent) => {
    const arrowKeys: string[] = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'];
    if (arrowKeys.includes(event.key)) {
      const root: Node = this.getRootNode();
      if (root instanceof Document || root instanceof ShadowRoot) {
        const radioGroup: NodeListOf<PfRadio> = root.querySelectorAll('pf-radio');
        radioGroup.forEach((radio: PfRadio, index: number) => {
          this.checked = false;
          this.tabIndex = 0;

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
          }
        });
      }
    }
  };

  render(): TemplateResult<1> {
    return html`
      <input
        @click=${this.#onRadioButtonClick}
        id=${this.id}
        .name=${this.name}
        type='radio'
        tabindex=${this.tabIndex}
        .checked=${this.checked}
      />
      <label for=${this.id}>${this.label}</label>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-radio': PfRadio;
  }
}
