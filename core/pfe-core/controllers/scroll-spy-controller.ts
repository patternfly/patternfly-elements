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
    if (!isServer) {
      addEventListener('scroll', () => {
        this.#instances.forEach(ssc => {
          ssc.#reconcile();
        });
      }, { passive: true });
      addEventListener('scrollend', () => {
        this.#instances.forEach(ssc => {
          ssc.#reconcile();
        });
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

  #intersectionEntries = new Set<IntersectionObserverEntry>();

  #linkTargetMap = new Map<Element, Element | null>();
  #targetLinkMap = new Map<Element, Element | null>();

  #getRootNode: () => Node | null;

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
    this.#getRootNode = () => options.rootNode ?? host.getRootNode?.() ?? null;
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

  #reconcile() {
    const { scrollY, innerHeight } = window;
    let link: Element | null | undefined = null;
    if (scrollY === 0) {
      link = this.#linkChildren.at(0);
    } else if (Math.round(innerHeight + scrollY) >= document.body.scrollHeight) {
      link = this.#linkChildren.at(-1);
    } else {
      const [entry] = [...this.#intersectionEntries].sort((a, b) => {
        return b.boundingClientRect.y - a.boundingClientRect.y;
      });
      link = this.#targetLinkMap.get(entry?.target);
    }
    if (link) {
      this.#setActive(link);
    }
  }

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
            this.#targetLinkMap.set(target, link);
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
    }
    this.#intersected = true;
    this.#intersectionEntries.clear();
    for (const entry of entries) {
      if (entry.isIntersecting) {
        this.#intersectionEntries.add(entry);
      }
    }
    if (this.#initializing) {
      this.#initializing = false;
    }
    this.#onIntersection?.();
    this.#reconcile();
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
