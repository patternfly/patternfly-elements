import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { LitElement } from 'lit';

type HREFElement = Element & { href: string };
function hasHrefHash(child: Element): child is HREFElement {
  return 'href' in child && typeof child.href === 'string' && child.href.startsWith('#');
}

export abstract class BaseJumpLinks extends LitElement {
  static scrollableElementAttr: string;

  static linkChildrenTags: string[];

  #logger = new Logger(this);

  #io?: IntersectionObserver;

  #activeItems = new Set<Element>();

  get #cons() {
    return this.constructor as typeof BaseJumpLinks;
  }

  get #ioRootId() {
    return this[this.#cons.scrollableElementAttr as keyof this] as string;
  }

  get #rootNode() {
    const rootNode = this.getRootNode();
    if (rootNode instanceof ShadowRoot || rootNode instanceof Document) {
      return rootNode;
    } else {
      return null;
    }
  }

  get #linkChildren(): HREFElement[] {
    return Array.from(this.querySelectorAll(this.#cons.linkChildrenTags.join(',')))
      .filter(hasHrefHash);
  }

  get #ioTargets(): HTMLElement[] {
    return this.#linkChildren
      .map(x => this.#rootNode?.getElementById(x.href.replace('#', '')))
      .filter((x): x is HTMLElement => !!x);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.#initIo();
  }

  updated(changed: Map<string, unknown>) {
    const { scrollableElementAttr } = this.#cons;
    if (!scrollableElementAttr) {
      this.#logger.warn('must implement scrollableElementAttr');
    } else if (changed.has(scrollableElementAttr)) {
      this.#initIo();
    }
  }

  #updateActive() {
    for (const link of this.#linkChildren) {
      link.removeAttribute('active');
    }
    const links = [...this.#activeItems];
    const last = links.at(-1);
    if (last) {
      last.toggleAttribute('active', true);
    } else {
      this.#linkChildren.at(0)?.toggleAttribute('active', true);
    }
  }

  #initIo() {
    this.#io?.disconnect();
    const { linkChildrenTags, scrollableElementAttr } = this.#cons;
    if (!scrollableElementAttr) {
      return this.#logger.warn('must implement scrollableElementAttr');
    } else if (!linkChildrenTags) {
      return this.#logger.warn('must implement linkChildrenTags');
    } else {
      if (this.#rootNode) {
        const threshold = 0.85;
        const root = this.#rootNode.getElementById(this.#ioRootId);
        this.#io = new IntersectionObserver(r => this.#onIntersection(r), { threshold, root });
        for (const target of this.#ioTargets) {
          this.#io.observe(target);
        }
      }
    }
  }

  #onIntersection(entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
      const selector = `:is(${this.#cons.linkChildrenTags.join(',')})[href="#${entry.target.id}"]`;
      const child = this.querySelector(selector);
      if (child) {
        if (hasScrolledPast(entry)) {
          this.#activeItems.add(child);
        } else {
          this.#activeItems.delete(child);
        }
      }
    }
    this.#updateActive();
  }
}

function hasScrolledPast(entry: IntersectionObserverEntry) {
  return entry.boundingClientRect.top < entry.intersectionRect.top;
}
