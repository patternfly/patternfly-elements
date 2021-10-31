import type { ReactiveController, ReactiveElement } from 'lit';

import { getRandomId } from '../functions/random.js';

export class PerfController implements ReactiveController {
  markCount = 0;
  markId: string;

  constructor(host: ReactiveElement) {
    host.addController(this);

    if (!host.id)
      this.markId = getRandomId(host.localName);
    else if (host.id.startsWith('pfe-') && !host.id.startsWith(host.localName))
      this.markId = host.id.replace('pfe', host.localName);
    else
      this.markId = `${host.localName}-${host.id}`;

    performance.mark(`${this.markId}-defined`);
  }

  hostUpdate() {
    // Set up the mark ID based on existing ID on component if it exists
    if (this.markCount < 1) {
      this.markCount = this.markCount + 1;

      // Navigation start, i.e., the browser first sees that the user has navigated to the page
      performance.measure(`${this.markId}-from-navigation-to-first-render`, undefined, `${this.markId}-rendered`);

      // Render is run before connection unless delayRender is used
      performance.measure(
        `${this.markId}-from-defined-to-first-render`,
        `${this.markId}-defined`,
        `${this.markId}-rendered`
      );
    }
  }
}
