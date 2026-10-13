import { LitElement, html, isServer, type PropertyValues, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import '@patternfly/elements/pf-v6-spinner/pf-v6-spinner.js';

import style from './pf-v6-icon.css';

/**
 * Sizes for the icon container and icon.
 * Standalone sizes (`sm` through `3xl`) are fixed lengths.
 * Body and heading sizes track the corresponding text styles.
 */
export type IconSize =
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | 'body-sm'
  | 'body-default'
  | 'body-lg'
  | 'heading-sm'
  | 'heading-md'
  | 'heading-lg'
  | 'heading-xl'
  | 'heading-2xl'
  | 'heading-3xl';

/** Status colors for the icon */
export type IconStatus = 'custom' | 'danger' | 'info' | 'success' | 'warning';

type Renderable = unknown;

export type IconResolverFunction = (set: string, icon: string) =>
  Renderable | Promise<Renderable>;

/**
 * requestIdleCallback when available, requestAnimationFrame when not
 * @param f callback
 */
const ric: typeof globalThis.requestIdleCallback =
     globalThis.requestIdleCallback
  ?? globalThis.requestAnimationFrame
  ?? (async (f: () => void) => Promise.resolve().then(f));

/**
 * Fired when an icon fails to load, for example when an icon module cannot
 * be imported or resolved. Provides the icon and set names in `message`,
 * and the underlying error in `originalError`, so that hosts can present a
 * fallback or log the failure.
 */
export class IconResolveError extends ErrorEvent {
  constructor(
    set: string,
    icon: string,
    /** The original error when importing the icon module */
    public originalError: Error
  ) {
    super('error', { message: `Could not load icon "${icon}" from set "${set}".` });
  }
}

/**
 * An **icon** is a container that allows icons of varying dimensions to
 * replace each other without shifting surrounding content. Icons resolve
 * by name from an icon set (`fas` by default).
 *
 * Icons are decorative by default (ARIA `aria-hidden`): screen readers
 * ignore them. Authors MUST set `accessible-label` for meaningful icons,
 * and SHOULD use a button for interactive iconography.
 *
 * The element is not interactive and cannot receive focus; wrap it in a
 * button or link for interactive iconography.
 *
 * @summary Displays an icon
 *
 * @slot - Fallback content while the icon is unavailable or fails to load.
 *         Screen readers ignore it when the icon is decorative
 * @slot progress - Element shown while `in-progress` is set. Defaults to
 *                  `<pf-v6-spinner>`, which announces "Loading..." to
 *                  screen readers. Slotted elements SHOULD provide their
 *                  own accessible name
 *
 * @fires load - Fired when an icon is loaded and rendered. Does not bubble
 * @fires error - Fired when an icon fails to load. Does not bubble.
 *                `IconResolveError` extends `ErrorEvent`; its `message`
 *                names the icon and set, and its `originalError` property
 *                holds the underlying error
 *
 * @csspart fallback - Container for fallback (i.e. slotted) content
 *
 * @cssprop {<length>} --pf-v6-c-icon--Width - Width of the icon container
 * @cssprop {<length>} --pf-v6-c-icon--Height - Height of the icon container
 * @cssprop {<length>} --pf-v6-c-icon--m-sm--Width - Container width when size is sm
 * @cssprop {<length>} --pf-v6-c-icon--m-sm--Height - Container height when size is sm
 * @cssprop {<length>} --pf-v6-c-icon--m-md--Width - Container width when size is md
 * @cssprop {<length>} --pf-v6-c-icon--m-md--Height - Container height when size is md
 * @cssprop {<length>} --pf-v6-c-icon--m-lg--Width - Container width when size is lg
 * @cssprop {<length>} --pf-v6-c-icon--m-lg--Height - Container height when size is lg
 * @cssprop {<length>} --pf-v6-c-icon--m-xl--Width - Container width when size is xl
 * @cssprop {<length>} --pf-v6-c-icon--m-xl--Height - Container height when size is xl
 * @cssprop {<length>} --pf-v6-c-icon--m-2xl--Width - Container width when size is 2xl
 * @cssprop {<length>} --pf-v6-c-icon--m-2xl--Height - Container height when size is 2xl
 * @cssprop {<length>} --pf-v6-c-icon--m-3xl--Width - Container width when size is 3xl
 * @cssprop {<length>} --pf-v6-c-icon--m-3xl--Height - Container height when size is 3xl
 * @cssprop {<length>} --pf-v6-c-icon--m-body-sm--Width - Container width when size is body-sm
 * @cssprop {<length>} --pf-v6-c-icon--m-body-sm--Height - Container height when size is body-sm
 * @cssprop {<length>} --pf-v6-c-icon--m-body-default--Width - Container width when size is body-default
 * @cssprop {<length>} --pf-v6-c-icon--m-body-default--Height - Container height when size is body-default
 * @cssprop {<length>} --pf-v6-c-icon--m-body-lg--Width - Container width when size is body-lg
 * @cssprop {<length>} --pf-v6-c-icon--m-body-lg--Height - Container height when size is body-lg
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-sm--Width - Container width when size is heading-sm
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-sm--Height - Container height when size is heading-sm
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-md--Width - Container width when size is heading-md
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-md--Height - Container height when size is heading-md
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-lg--Width - Container width when size is heading-lg
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-lg--Height - Container height when size is heading-lg
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-xl--Width - Container width when size is heading-xl
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-xl--Height - Container height when size is heading-xl
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-2xl--Width - Container width when size is heading-2xl
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-2xl--Height - Container height when size is heading-2xl
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-3xl--Width - Container width when size is heading-3xl
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-3xl--Height - Container height when size is heading-3xl
 * @cssprop {<length>} --pf-v6-c-icon__content--FontSize - Font size of the icon
 * @cssprop {<length>} --pf-v6-c-icon--m-sm__content--FontSize - Icon font size when size is sm
 * @cssprop {<length>} --pf-v6-c-icon--m-md__content--FontSize - Icon font size when size is md
 * @cssprop {<length>} --pf-v6-c-icon--m-lg__content--FontSize - Icon font size when size is lg
 * @cssprop {<length>} --pf-v6-c-icon--m-xl__content--FontSize - Icon font size when size is xl
 * @cssprop {<length>} --pf-v6-c-icon--m-2xl__content--FontSize - Icon font size when size is 2xl
 * @cssprop {<length>} --pf-v6-c-icon--m-3xl__content--FontSize - Icon font size when size is 3xl
 * @cssprop {<length>} --pf-v6-c-icon--m-body-sm__content--FontSize - Icon font size when size is body-sm
 * @cssprop {<length>} --pf-v6-c-icon--m-body-default__content--FontSize - Icon font size when size is body-default
 * @cssprop {<length>} --pf-v6-c-icon--m-body-lg__content--FontSize - Icon font size when size is body-lg
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-sm__content--FontSize - Icon font size when size is heading-sm
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-md__content--FontSize - Icon font size when size is heading-md
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-lg__content--FontSize - Icon font size when size is heading-lg
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-xl__content--FontSize - Icon font size when size is heading-xl
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-2xl__content--FontSize - Icon font size when size is heading-2xl
 * @cssprop {<length>} --pf-v6-c-icon--m-heading-3xl__content--FontSize - Icon font size when size is heading-3xl
 * @cssprop {<length>} --pf-v6-c-icon--m-inline--Width - Container width when inline
 * @cssprop {<length>} --pf-v6-c-icon--m-inline--Height - Container height when inline
 * @cssprop {<length>} --pf-v6-c-icon--m-inline__content--FontSize - Icon font size when inline
 * @cssprop {<color>} --pf-v6-c-icon__content--Color - Color of the icon
 * @cssprop {<color>} --pf-v6-c-icon__content--m-danger--Color - Icon color when status is danger
 * @cssprop {<color>} --pf-v6-c-icon__content--m-warning--Color - Icon color when status is warning
 * @cssprop {<color>} --pf-v6-c-icon__content--m-success--Color - Icon color when status is success
 * @cssprop {<color>} --pf-v6-c-icon__content--m-info--Color - Icon color when status is info
 * @cssprop {<color>} --pf-v6-c-icon__content--m-custom--Color - Icon color when status is custom
 * @cssprop {<length>} --pf-v6-c-icon__content--svg--VerticalAlign - Vertical alignment of the icon
 * @cssprop {<number>} --pf-v6-c-icon__content--Opacity - Opacity of the icon content
 * @cssprop {<number>} --pf-v6-c-icon__progress--Opacity - Opacity of the progress indicator
 */
@customElement('pf-v6-icon')
export class PfV6Icon extends LitElement {
  static readonly styles: CSSStyleSheet[] = [style];

  private static io: IntersectionObserver | null = null;

  private static onIntersect: IntersectionObserverCallback = records =>
    records.forEach(({ isIntersecting, target }) => {
      const icon = target as PfV6Icon;
      icon.#intersecting = isIntersecting;
      ric(() => {
        if (icon.#intersecting) {
          icon.#load();
        }
      });
    });

  private static defaultResolve: IconResolverFunction = (set: string, icon: string): Renderable =>
    import(`@patternfly/icons/${set}/${icon}.js`)
        .then(mod => mod.default.cloneNode(true));

  /**
   * Gets a renderable icon. Override this to customize how icons are resolved.
   * @param set - The name of the icon set
   * @param icon - The name of the icon
   * @returns The icon content, a node or anything else which lit-html can render
   * @example resolving an icon node from an icon module
   *          ```js
   *          PfV6Icon.resolve = (set, icon) =>
   *            import(`/assets/icons/${set}/${icon}.js`)
   *              .then(mod => mod.default.cloneNode(true));
   *          ```
   * @example resolving a named export from an icon collection module
   *          ```js
   *          PfV6Icon.resolve = (set, icon) =>
   *            import(`/assets/icons.js`)
   *              .then(module => module[icon]?.cloneNode(true));
   *          ```
   * @example resolving a new node from an svg file
   *          ```js
   *          const iconCacne = new Map();
   *          function getCachedIconOrNewNode(set, icon, svg) {
   *            const key = `${set}_${icon}`;
   *            if (!iconCache.has(key)) {
   *              const template = document.createElement('template');
   *                    template.innerHTML = svg;
   *              iconCache.set(key, template);
   *            }
   *            return iconCache.get(key);
   *          }
   *          PfV6Icon.resolve = (set, icon) =>
   *            fetch(`/assets/icons/${set}/${icon}.svg`)
   *              .then(response => response.text())
   *              .then(svg => getCachedIconOrNewNode(set, icon, svg))
   *              .then(node => node.content.cloneNode(true));
   *          ```
   */
  public static resolve: IconResolverFunction = PfV6Icon.defaultResolve;

  private static resolvers = new Map<string, IconResolverFunction>();

  private static instances = new Set<PfV6Icon>();

  /**
   * Register a new icon set
   * @param setName - The name of the icon set
   * @param resolver - A function that returns the URL of an icon
   * @example returning a URL object
   *          ```js
   *          PfV6Icon.addIconSet('rh', (set, icon) =>
   *            new URL(`./icons/${set}/${icon}.js`, import.meta.url));
   *          ```
   * @example returning a string
   *          ```js
   *          PfV6Icon.addIconSet('rh', (set, icon) =>
   *            `/assets/icons/${set}/${icon}.js`);
   *          ```
   */
  public static addIconSet(setName: string, resolver: IconResolverFunction): void {
    if (typeof setName !== 'string') {
      Logger.warn(`[${this.name}]: the first argument to addIconSet must be a string.`);
    } else if (typeof resolver !== 'function') {
      Logger.warn(`[${this.name}]: the second argument to addIconSet must be a function.`);
    } else {
      this.resolvers.set(setName, resolver);
      for (const instance of this.instances) {
        instance.#load();
      }
    }
  }

  /** Removes all added icon sets and resets resolve function */
  public static reset(): void {
    this.resolvers.clear();
    this.resolve = this.defaultResolve;
  }

  /** Icon set */
  @property() set = 'fas';

  /** Icon name */
  @property({ reflect: true }) icon?: string;

  /** Size of the icon and its container */
  @property({ reflect: true }) size?: IconSize;

  /** Size of the icon, overriding `size` for the icon alone */
  @property({ attribute: 'icon-size', reflect: true }) iconSize?: IconSize;

  /** Status color of the icon */
  @property({ reflect: true }) status?: IconStatus;

  /** Whether the icon is inline, inheriting the surrounding text's size and color */
  @property({ type: Boolean, reflect: true }) inline = false;

  /** Whether the icon is in progress, replacing the icon with a progress indicator */
  @property({ type: Boolean, attribute: 'in-progress', reflect: true }) inProgress = false;

  /** Whether to mirror the icon horizontally in right-to-left languages */
  @property({ type: Boolean, attribute: 'mirror-rtl', reflect: true }) mirrorRtl = false;

  /**
   * Controls how eager the element will be to load the icon data
   * - `eager`: eagerly load the icon, blocking the main thread
   * - `idle`: wait for the browser to attain an idle state before loading
   * - `lazy` (default): wait for the element to enter the viewport before loading
   */
  @property() loading?: 'idle' | 'lazy' | 'eager' = 'lazy';

  /**
   * Accessible name for the icon. When set, the icon is exposed to
   * assistive technology as an image with this name. When unset, the icon
   * is decorative and hidden from the accessibility tree.
   */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Icon content. Any value that lit can render */
  @state() private content?: Renderable;

  #intersecting = false;

  #logger = new Logger(this);

  #internals = InternalsController.of(this);

  override connectedCallback(): void {
    super.connectedCallback();
    PfV6Icon.instances.add(this);
  }

  override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('icon') || changed.has('set')) {
      this.#load();
    }
    if (changed.has('accessibleLabel') || changed.has('inProgress')) {
      // While in progress, the faded icon keeps its `img` semantics hidden
      // from assistive technology, so that the progress indicator's
      // announcement (e.g. "Loading...") is not flattened away by the
      // `img` role, which presents its subtree as a single image.
      const named = !!this.accessibleLabel && !this.inProgress;
      this.#internals.role = named ? 'img' : null;
      this.#internals.ariaLabel = named ? this.accessibleLabel! : null;
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    PfV6Icon.io?.unobserve(this);
    PfV6Icon.instances.delete(this);
  }

  override render(): TemplateResult {
    return html`
      <!-- The icon svg is decorative: when the accessible-label attribute is
           set, the host img role and name carry the semantics; when it is
           not, the icon must be hidden from assistive technology. The
           aria-hidden attribute requires the literal strings "true" or
           "false"; a boolean-attribute binding would set it to "", which is
           an invalid value. -->
      <span id="content" aria-hidden="true">${this.content ?? ''}</span>
      <span id="fallback"
            part="fallback"
            aria-hidden=${this.accessibleLabel ? 'true' : 'false'}
            ?hidden=${!!this.content}><!--
           summary: Slotted content is used as a fallback in case the icon doesn't load
          --><slot></slot>
      </span>
      <span id="progress"
            ?hidden=${!this.inProgress}><!--
           summary: Icon or element shown while in-progress is set
          --><slot name="progress">
        <pf-v6-spinner inline></pf-v6-spinner>
      </slot>
      </span>
    `;
  }

  /**
   * Loads the icon content by resolving the icon name against the icon set,
   * then rendering the result. Called automatically when the `icon`
   * attribute changes.
   */
  protected async load(): Promise<void> {
    if (isServer) {
      return;
    }
    const { set, icon } = this;
    const resolver = PfV6Icon.resolvers.get(set) ?? PfV6Icon.resolve;
    if (set && icon && typeof resolver === 'function') {
      try {
        this.content = await resolver(set, icon);
        await this.updateComplete;
        this.dispatchEvent(new Event('load'));
      } catch (error: unknown) {
        this.#logger.error((error as Error).message);
        this.dispatchEvent(new IconResolveError(set, icon, error as Error));
      }
    }
  }

  #lazyLoad() {
    PfV6Icon.io ??= new IntersectionObserver(PfV6Icon.onIntersect);
    PfV6Icon.io.observe(this);
    if (this.#intersecting) {
      this.load();
    }
  }

  #load() {
    if (isServer) {
      return;
    }
    switch (this.loading?.toLowerCase()) {
      case 'idle': return void ric(() => this.load());
      case 'lazy': return void this.#lazyLoad();
      case 'eager': return void this.load();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-icon': PfV6Icon;
  }
}
