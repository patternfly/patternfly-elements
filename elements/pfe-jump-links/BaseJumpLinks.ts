import { LitElement } from 'lit';

export abstract class BaseJumpLinks extends LitElement {
  #io = new IntersectionObserver(r => this.#onIntersection(r));

  override connectedCallback() {
    super.connectedCallback();
    this.#io.observe(this);
  }

  #onIntersection(entries: IntersectionObserverEntry[]) {
    for (const entry of entries) {
      // eslint-disable-next-line no-console
      // console.log(entry);
    }
  }
}
