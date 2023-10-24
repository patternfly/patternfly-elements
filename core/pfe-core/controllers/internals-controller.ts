import type { ReactiveController, ReactiveControllerHost } from 'lit';

function isARIAMixinProp(key: string): key is keyof ARIAMixin {
  return key === 'role' || key.startsWith('aria');
}

export class InternalsController implements ReactiveController, ARIAMixin {
  declare role: ARIAMixin['role'];
  declare ariaAtomic: ARIAMixin['ariaAtomic'];
  declare ariaAutoComplete: ARIAMixin['ariaAutoComplete'];
  declare ariaActivedescendant: string | null;
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

  #internals: ElementInternals;

  #formDisabled = false;

  /** True when the control is disabled via it's containing fieldset element */
  get formDisabled() {
    return this.host.matches(':disabled') || this.#formDisabled;
  }

  static protos = new WeakMap();

  get labels() {
    return this.#internals.labels;
  }

  get validity() {
    return this.#internals.validity;
  }

  private static hosts = new WeakMap<ReactiveControllerHost, InternalsController>();

  constructor(
    public host: ReactiveControllerHost & HTMLElement,
    options?: Partial<ARIAMixin>
  ) {
    this.#internals = host.attachInternals();
    const instance = InternalsController.hosts.get(host);
    if (instance) {
      return instance;
    }
    InternalsController.hosts.set(host, this);
    // We need to polyfill :disabled
    // see https://github.com/calebdwilliams/element-internals-polyfill/issues/88
    const orig = (host as HTMLElement & { formDisabledCallback?(disabled: boolean): void }).formDisabledCallback;
    (host as HTMLElement & { formDisabledCallback?(disabled: boolean): void }).formDisabledCallback = disabled => {
      this.#formDisabled = disabled;
      orig?.call(host, disabled);
    };
    // proxy the internals object's aria prototype
    for (const key of Object.keys(Object.getPrototypeOf(this.#internals))) {
      if (isARIAMixinProp(key)) {
        Object.defineProperty(this, key, {
          get() {
            return this.#internals[key];
          },
          set(value) {
            this.#internals[key] = value;
            this.host.requestUpdate();
          }
        });
      }
    }

    for (const [key, val] of Object.entries(options ?? {})) {
      if (isARIAMixinProp(key)) {
        this[key] = val;
      }
    }
  }

  hostConnected?(): void

  setFormValue(...args: Parameters<ElementInternals['setFormValue']>) {
    return this.#internals.setFormValue(...args);
  }

  setValidity(...args: Parameters<ElementInternals['setValidity']>) {
    return this.#internals.setValidity(...args);
  }

  checkValidity(...args: Parameters<ElementInternals['checkValidity']>) {
    return this.#internals.checkValidity(...args);
  }

  reportValidity(...args: Parameters<ElementInternals['reportValidity']>) {
    return this.#internals.reportValidity(...args);
  }

  submit() {
    this.#internals.form?.requestSubmit();
  }

  reset() {
    this.#internals.form?.reset();
  }
}
