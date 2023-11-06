import type { ReactiveController, ReactiveControllerHost } from 'lit';

function isARIAMixinProp(key: string): key is keyof ARIAMixin {
  return key === 'role' || key.startsWith('aria');
}

export class InternalsController implements ReactiveController, ARIAMixin {
  private static hosts = new WeakMap<ReactiveControllerHost, InternalsController>();

  @aria role: string | null = null;
  @aria ariaActivedescendant: string | null = null;
  @aria ariaAtomic: string | null = null;
  @aria ariaAutoComplete: string | null = null;
  @aria ariaBusy: string | null = null;
  @aria ariaChecked: string | null = null;
  @aria ariaColCount: string | null = null;
  @aria ariaColIndex: string | null = null;
  @aria ariaColIndexText: string | null = null;
  @aria ariaColSpan: string | null = null;
  @aria ariaCurrent: string | null = null;
  @aria ariaDisabled: string | null = null;
  @aria ariaExpanded: string | null = null;
  @aria ariaHasPopup: string | null = null;
  @aria ariaHidden: string | null = null;
  @aria ariaInvalid: string | null = null;
  @aria ariaKeyShortcuts: string | null = null;
  @aria ariaLabel: string | null = null;
  @aria ariaLevel: string | null = null;
  @aria ariaLive: string | null = null;
  @aria ariaModal: string | null = null;
  @aria ariaMultiLine: string | null = null;
  @aria ariaMultiSelectable: string | null = null;
  @aria ariaOrientation: string | null = null;
  @aria ariaPlaceholder: string | null = null;
  @aria ariaPosInSet: string | null = null;
  @aria ariaPressed: string | null = null;
  @aria ariaReadOnly: string | null = null;
  @aria ariaRequired: string | null = null;
  @aria ariaRoleDescription: string | null = null;
  @aria ariaRowCount: string | null = null;
  @aria ariaRowIndex: string | null = null;
  @aria ariaRowIndexText: string | null = null;
  @aria ariaRowSpan: string | null = null;
  @aria ariaSelected: string | null = null;
  @aria ariaSetSize: string | null = null;
  @aria ariaSort: string | null = null;
  @aria ariaValueMax: string | null = null;
  @aria ariaValueMin: string | null = null;
  @aria ariaValueNow: string | null = null;
  @aria ariaValueText: string | null = null;

  private internals!: ElementInternals;

  private _formDisabled = false;

  /** True when the control is disabled via it's containing fieldset element */
  get formDisabled() {
    return this.host.matches(':disabled') || this._formDisabled;
  }

  get labels() {
    return this.internals.labels;
  }

  get validity() {
    return this.internals.validity;
  }

  constructor(
    public host: ReactiveControllerHost & HTMLElement,
    options?: Partial<ARIAMixin>
  ) {
    const instance = InternalsController.hosts.get(host);
    if (instance) {
      return instance;
    }
    this.internals ??= host.attachInternals();
    InternalsController.hosts.set(host, this);
    // START polyfill-disabled
    // We need to polyfill :disabled
    // see https://github.com/calebdwilliams/element-internals-polyfill/issues/88
    const orig = (host as HTMLElement & { formDisabledCallback?(disabled: boolean): void }).formDisabledCallback;
    (host as HTMLElement & { formDisabledCallback?(disabled: boolean): void }).formDisabledCallback = disabled => {
      this._formDisabled = disabled;
      orig?.call(host, disabled);
    };
    // END polyfill-disabled
    this.initializeAriaOptions(options);
  }

  private initializeAriaOptions(options?: Partial<ARIAMixin>) {
    for (const [key, val] of Object.entries(options ?? {})) {
      if (isARIAMixinProp(key)) {
        this[key] = val;
      }
    }
  }

  hostConnected?(): void

  setFormValue(...args: Parameters<ElementInternals['setFormValue']>) {
    return this.internals.setFormValue(...args);
  }

  setValidity(...args: Parameters<ElementInternals['setValidity']>) {
    return this.internals.setValidity(...args);
  }

  checkValidity(...args: Parameters<ElementInternals['checkValidity']>) {
    return this.internals.checkValidity(...args);
  }

  reportValidity(...args: Parameters<ElementInternals['reportValidity']>) {
    return this.internals.reportValidity(...args);
  }

  submit() {
    this.internals.form?.requestSubmit();
  }

  reset() {
    this.internals.form?.reset();
  }
}

/** reactively forward the internals object's aria mixin prototype */
function aria(
  target: InternalsController,
  key: keyof InternalsController,
) {
  if (!isARIAMixinProp(key)) {
    throw new Error('@aria can only be called on ARIAMixin properties');
  }
  Object.defineProperty(target, key, {
    enumerable: true,
    configurable: false,
    get() {
      return this.internals[key];
    },
    set(value) {
      this.internals ??= this.host.attachInternals();
      this.internals[key] = value;
      this.host.requestUpdate();
    }
  });
}
