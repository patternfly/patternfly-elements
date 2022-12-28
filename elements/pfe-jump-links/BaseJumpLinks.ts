import { LitElement } from 'lit';

type HREFElement = Element & { href: string };
function hasHrefHash(child: Element): child is HREFElement {
  return 'href' in child && typeof child.href === 'string' && child.href.startsWith('#');
}

export abstract class BaseJumpLinks extends LitElement {
  protected abstract hrefChildTagNames: string[];

  abstract offset: number;

  #io?: IntersectionObserver;

  #passedLinks = new Set<Element>();

  /** When true, ignore intersections */
  #force = false;

  /** Has the intersection observer found an element */
  #intersected = false;

  get #rootNode() {
    const rootNode = this.getRootNode();
    if (rootNode instanceof ShadowRoot || rootNode instanceof Document) {
      return rootNode;
    } else {
      return null;
    }
  }

  get #linkChildren(): HREFElement[] {
    return Array.from(this.querySelectorAll(this.hrefChildTagNames.join(',')))
      .filter(hasHrefHash);
  }

  get #ioTargets(): HTMLElement[] {
    return this.#linkChildren
      .map(x => this.#rootNode?.getElementById(x.href.replace('#', '')))
      .filter((x): x is HTMLElement => !!x);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('select', this.#onSelect);
    this.#initIo();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('offset')) {
      this.#io?.disconnect();
      this.#initIo();
    }
  }

  #initIo() {
    if (this.#rootNode) {
      this.#io = new IntersectionObserver(r => this.#onIntersection(r), {
        rootMargin: `${this.offset ?? 0}px 0px 0px 0px`,
        threshold: 0.85,
      });
      for (const target of this.#ioTargets) {
        this.#io.observe(target);
      }
    }
  }

  async #nextIntersection() {
    this.#intersected = false;
    // safeguard the loop
    setTimeout(() => this.#intersected = false, 5000);
    while (!this.#intersected) {
      await new Promise(requestAnimationFrame);
    }
  }

  async #onIntersection(entries: IntersectionObserverEntry[]) {
    if (!this.#force) {
      const { hrefChildTagNames } = this;
      for (const { target, boundingClientRect, intersectionRect } of entries) {
        const selector = `:is(${hrefChildTagNames.join(',')})[href="#${target.id}"]`;
        const link = this.querySelector(selector);
        if (link) {
          this.#markPassed(link, boundingClientRect.top < intersectionRect.top);
        }
      }
      const link = [...this.#passedLinks];
      const last = link.at(-1);
      this.#setActive(last ?? this.#linkChildren.at(0));
    }
    this.#intersected = true;
  }

  async #onSelect(event: Event) {
    this.#force = true;
    this.#setActive(event.target);
    let sawActive = false;
    for (const link of this.#linkChildren) {
      this.#markPassed(link, !sawActive);
      if (link === event.target) {
        sawActive = true;
      }
    }
    await this.#nextIntersection();
    this.#force = false;
  }

  #markPassed(link: Element, force: boolean) {
    if (force) {
      this.#passedLinks.add(link);
    } else {
      this.#passedLinks.delete(link);
    }
  }

  #setActive(activeLink?: EventTarget|null) {
    for (const link of this.#linkChildren) {
      link.toggleAttribute('active', link === activeLink);
    }
  }
}
