import type { ReactiveController, ReactiveControllerHost } from 'lit';

interface FACE extends HTMLElement {
  formDisabledCallback?(disabled: boolean): void | Promise<void>;
  formResetCallback?(): void | Promise<void>;
  formStateRestoreCallback?(state: string, mode: string): void | Promise<void>;
}

const READONLY_KEYS_LIST = [
  'form',
  'labels',
  'shadowRoot',
  'states',
  'validationMessage',
  'validity',
  'willValidate',
] as const;
const READONLY_KEYS = new Set(READONLY_KEYS_LIST);
const METHODS_LIST = [
  'checkValidity',
  'reportValidity',
  'setFormValue',
  'setValidity',
] as const;
const METHODS_KEYS = new Set(METHODS_LIST);

type ReadonlyInternalsProp = (typeof READONLY_KEYS_LIST)[number];

function isReadonlyInternalsProp(key: string): key is ReadonlyInternalsProp {
  return READONLY_KEYS.has(key as ReadonlyInternalsProp);
}

function isARIAMixinProp(key: string): key is keyof ARIAMixin {
  return key === 'role' || key.startsWith('aria');
}

function isInternalsMethod(key: string): key is keyof ElementInternals {
  return METHODS_KEYS.has(key as unknown as (typeof METHODS_LIST)[number]);
}

function getLabelText(label: HTMLElement) {
  if (label.hidden) {
    return '';
  } else {
    const ariaLabel = label.getAttribute?.('aria-label');
    return ariaLabel ?? label.textContent;
  }
}

export class InternalsController implements ReactiveController, ARIAMixin {
  static protos = new WeakMap();

  declare readonly form: ElementInternals['form'];
  declare readonly labels: ElementInternals['labels'];
  declare readonly shadowRoot: ElementInternals['shadowRoot'];
  // https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/states
  declare readonly states: unknown;
  declare readonly validity: ElementInternals['validity'];
  declare readonly willValidate: ElementInternals['willValidate'];

  declare role: ARIAMixin['role'];
  declare ariaAtomic: ARIAMixin['ariaAtomic'];
  declare ariaAutoComplete: ARIAMixin['ariaAutoComplete'];
  declare ariaBusy: ARIAMixin['ariaBusy'];
  declare ariaChecked: ARIAMixin['ariaChecked'];
  declare ariaColCount: ARIAMixin['ariaColCount'];
  declare ariaColIndex: ARIAMixin['ariaColIndex'];
  declare ariaColIndexText: string | null;
  declare ariaColSpan: ARIAMixin['ariaColSpan'];
  declare ariaCurrent: ARIAMixin['ariaCurrent'];
  declare ariaDisabled: ARIAMixin['ariaDisabled'];
  declare ariaExpanded: ARIAMixin['ariaExpanded'];
  declare ariaHasPopup: ARIAMixin['ariaHasPopup'];
  declare ariaHidden: ARIAMixin['ariaHidden'];
  declare ariaInvalid: ARIAMixin['ariaInvalid'];
  declare ariaKeyShortcuts: ARIAMixin['ariaKeyShortcuts'];
  declare ariaLabel: ARIAMixin['ariaLabel'];
  declare ariaLevel: ARIAMixin['ariaLevel'];
  declare ariaLive: ARIAMixin['ariaLive'];
  declare ariaModal: ARIAMixin['ariaModal'];
  declare ariaMultiLine: ARIAMixin['ariaMultiLine'];
  declare ariaMultiSelectable: ARIAMixin['ariaMultiSelectable'];
  declare ariaOrientation: ARIAMixin['ariaOrientation'];
  declare ariaPlaceholder: ARIAMixin['ariaPlaceholder'];
  declare ariaPosInSet: ARIAMixin['ariaPosInSet'];
  declare ariaPressed: ARIAMixin['ariaPressed'];
  declare ariaReadOnly: ARIAMixin['ariaReadOnly'];
  declare ariaRequired: ARIAMixin['ariaRequired'];
  declare ariaRoleDescription: ARIAMixin['ariaRoleDescription'];
  declare ariaRowCount: ARIAMixin['ariaRowCount'];
  declare ariaRowIndex: ARIAMixin['ariaRowIndex'];
  declare ariaRowIndexText: string | null;
  declare ariaRowSpan: ARIAMixin['ariaRowSpan'];
  declare ariaSelected: ARIAMixin['ariaSelected'];
  declare ariaSetSize: ARIAMixin['ariaSetSize'];
  declare ariaSort: ARIAMixin['ariaSort'];
  declare ariaValueMax: ARIAMixin['ariaValueMax'];
  declare ariaValueMin: ARIAMixin['ariaValueMin'];
  declare ariaValueNow: ARIAMixin['ariaValueNow'];
  declare ariaValueText: ARIAMixin['ariaValueText'];

  declare checkValidity: (...args: Parameters<ElementInternals['checkValidity']>) => boolean;
  declare reportValidity: (...args: Parameters<ElementInternals['reportValidity']>) => boolean;
  declare setFormValue: (...args: Parameters<ElementInternals['setFormValue']>) => void;
  declare setValidity: (...args: Parameters<ElementInternals['setValidity']>) => void;

  hostConnected?(): void

  #internals: ElementInternals;

  #formDisabled = false;

  static {

  }

  /** True when the control is disabled via it's containing fieldset element */
  get formDisabled() {
    return this.host.matches(':disabled') || this.#formDisabled;
  }

  /** A best-attempt based on observed behaviour in FireFox 115 on fedora 38 */
  get computedLabelText() {
    return this.#internals.ariaLabel ||
      Array.from(this.#internals.labels as NodeListOf<HTMLElement>)
        .reduce((acc, label) =>
          `${acc}${getLabelText(label)}`, '');
  }

  constructor(
    public host: ReactiveControllerHost & FACE,
    private options?: Partial<ARIAMixin>
  ) {
    this.#internals = host.attachInternals();
    this.#polyfillDisabledPseudo();
    this.#defineInternalsProps();
  }

  /**
   * We need to polyfill :disabled
   * see https://github.com/calebdwilliams/element-internals-polyfill/issues/88
   */
  #polyfillDisabledPseudo() {
    const orig = this.host.formDisabledCallback;
    this.host.formDisabledCallback = disabled => {
      this.#formDisabled = disabled;
      orig?.call(this.host, disabled);
    };
  }

  /** Reflect the internals object's aria prototype */
  #defineInternalsProps() {
    // TODO: can we define these statically on the prototype instead?
    for (const key in this.#internals) {
      if (isARIAMixinProp(key)) {
        this.#defineARIAMixinProp(key);
      } else if (isReadonlyInternalsProp(key)) {
        this.#defineReadonlyProp(key);
      } else if (isInternalsMethod(key)) {
        this.#defineMethod(key);
      }
    }

    // for (const [key, val] of Object.entries(this.options ?? {})) {
    //   if (isARIAMixinProp(key)) {
    //     this[key] = val;
    //   }
    // }
  }

  #defineARIAMixinProp(key: keyof ARIAMixin) {
    Object.defineProperty(this, key, {
      get: () => this.#internals[key],
      set: value => {
        this.#internals[key] = value;
        this.host.requestUpdate();
      }
    });
    if (this.options && key in this.options) {
      this[key as unknown as 'role'] = this.options?.[key] as string;
    }
  }

  #defineReadonlyProp(key: ReadonlyInternalsProp) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: false,
      get: () => this.#internals[key as Exclude<ReadonlyInternalsProp, 'states'>],
    });
  }

  #defineMethod(key: keyof ElementInternals) {
    Object.defineProperty(this, key, {
      enumerable: true,
      configurable: false,
      writable: false,
      value: (...args: unknown[]) => {
        const val = this.#internals[key as 'setValidity'](...args as []);
        this.host.requestUpdate();
        return val;
      }
    });
  }

  submit() {
    this.#internals.form?.requestSubmit();
  }

  reset() {
    this.#internals.form?.reset();
  }
}
