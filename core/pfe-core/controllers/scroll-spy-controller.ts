import { isServer, type ReactiveController, type ReactiveControllerHost } from 'lit';

export interface ScrollSpyControllerOptions extends IntersectionObserverInit {
  /**
   * Tag names of legal link children.
   * Legal children must have an `href` property/attribute pair, like `<a>`.
   */
  tagNames: string[];

  /**
   * Attribute to set on the active link element.
   * @default 'active'
   */
  activeAttribute?: string;

  /**
   * The root node to query content for
   * @default the host's root node
   */
  rootNode?: Node;

  /**
   * function to call on link children to get their URL hash (i.e. id to scroll to)
   * @default el => el.getAttribute('href');
   */
  getHash?: (el: Element) => string | null;

  /**
   * Optional callback for when an intersection occurs
   */
  onIntersection?(): void;
}

export class ScrollSpyController implements ReactiveController {
  static #instances = new Set<ScrollSpyController>;

  static {
    if (isServer) {
      addEventListener('scroll', () => {
        if (Math.round(window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
          this.#instances.forEach(ssc => {
            ssc.#setActive(ssc.#linkChildren.at(-1));
          });
        }
      }, { passive: true });
      addEventListener('hashchange', () => {
        this.#instances.forEach(ssc => {
          ssc.#activateHash();
        });
      });
    }
  }

  #tagNames: string[];

  #activeAttribute: string;

  #io?: IntersectionObserver;

  /** Which link's targets have already scrolled past? */
  #passedLinks = new Set<Element>();

  /** Ignore intersections? */
  #force = false;

  /** Has the intersection observer found an element? */
  #intersected = false;

  #root: ScrollSpyControllerOptions['root'];

  #rootMargin?: string;

  #threshold: number | number[];

  #intersectingTargets = new Set<Element>();

  #linkTargetMap = new Map<Element, Element | null>();

  #getRootNode: () => Node;

  #getHash: (el: Element) => string | null;

  #onIntersection?: () => void;

  get #linkChildren(): Element[] {
    if (isServer) {
      return [];
    } else {
      return Array.from(this.host.querySelectorAll(this.#tagNames.join(',')))
          .filter(this.#getHash);
    }
  }

  get root(): Element | Document | null | undefined {
    return this.#root;
  }

  set root(v) {
    this.#root = v;
    this.#io?.disconnect();
    this.#initIo();
  }

  get rootMargin(): string | undefined {
    return this.#rootMargin;
  }

  set rootMargin(v) {
    this.#rootMargin = v;
    this.#io?.disconnect();
    this.#initIo();
  }

  get threshold(): number | number[] {
    return this.#threshold;
  }

  set threshold(v) {
    this.#threshold = v;
    this.#io?.disconnect();
    this.#initIo();
  }

  constructor(
    private host: ReactiveControllerHost & HTMLElement,
    options: ScrollSpyControllerOptions,
  ) {
    host.addController(this);
    this.#tagNames = options.tagNames;
    this.#root = options.root;
    this.#rootMargin = options.rootMargin;
    this.#activeAttribute = options.activeAttribute ?? 'active';
    this.#threshold = options.threshold ?? 0.85;
    this.#getRootNode = () => options.rootNode ?? host.getRootNode();
    this.#getHash = options?.getHash ?? ((el: Element) => el.getAttribute('href'));
    this.#onIntersection = options?.onIntersection;
  }

  hostConnected(): void {
    ScrollSpyController.#instances.add(this);
    this.#initIo();
  }

  hostDisconnected(): void {
    ScrollSpyController.#instances.delete(this);
    this.#io?.disconnect();
  }

  #initializing = true;

  async #initIo() {
    const rootNode = this.#getRootNode();
    if (rootNode instanceof Document || rootNode instanceof ShadowRoot) {
      const { rootMargin, threshold, root } = this;
      this.#io = new IntersectionObserver(r => this.#onIo(r), { root, rootMargin, threshold });
      for (const link of this.#linkChildren) {
        const id = this.#getHash(link)?.replace('#', '');
        if (id) {
          const target = document.getElementById(id);
          if (target) {
            this.#io?.observe(target);
            this.#linkTargetMap.set(link, target);
          }
        }
      }
    }
  }

  #markPassed(link: Element, force: boolean) {
    if (force) {
      this.#passedLinks.add(link);
    } else {
      this.#passedLinks.delete(link);
    }
  }

  #setActive(link?: EventTarget | null) {
    for (const child of this.#linkChildren) {
      child.toggleAttribute(this.#activeAttribute, child === link);
    }
  }

  async #activateHash() {
    const links = this.#linkChildren;
    const { hash } = location;
    if (!hash) {
      this.setActive(links.at(0) ?? null);
    } else {
      await this.#nextIntersection();
      this.setActive(links.find(x => this.#getHash(x) === hash) ?? null);
    }
  }

  async #nextIntersection() {
    this.#intersected = false;
    // safeguard the loop
    setTimeout(() => this.#intersected = false, 3000);
    while (!this.#intersected) {
      await new Promise(requestAnimationFrame);
    }
  }

  async #onIo(entries: IntersectionObserverEntry[]) {
    if (!this.#force) {
      for (const { target, boundingClientRect, intersectionRect } of entries) {
        const selector = `:is(${this.#tagNames.join(',')})[href="#${target.id}"]`;
        const link = this.host.querySelector(selector);
        if (link) {
          this.#markPassed(link, boundingClientRect.top < intersectionRect.top);
        }
      }
      const link = [...this.#passedLinks];
      const last = link.at(-1);
      this.#setActive(last ?? this.#linkChildren.at(0));
    }
    this.#intersected = true;
    this.#intersectingTargets.clear();
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.#intersectingTargets.add(entry.target);
      }
    }
    if (this.#initializing) {
      const ints = entries?.filter(x => x.isIntersecting) ?? [];
      if (this.#intersectingTargets.size > 0) {
        const [{ target = null } = {}] = ints;
        const { id } = target ?? {};
        if (id) {
          const link = this.#linkChildren.find(link => this.#getHash(link) === `#${id}`);
          if (link) {
            this.#setActive(link);
          }
        }
      }
      this.#initializing = false;
    }
    this.#onIntersection?.();
  }

  /**
   * Explicitly set the active item
   * @param link usually an `<a>`
   */
  public async setActive(link: EventTarget | null): Promise<void> {
    this.#force = true;
    this.#setActive(link);
    let sawActive = false;
    for (const child of this.#linkChildren) {
      this.#markPassed(child, !sawActive);
      if (child === link) {
        sawActive = true;
      }
    }
    await this.#nextIntersection();
    this.#force = false;
  }
}
