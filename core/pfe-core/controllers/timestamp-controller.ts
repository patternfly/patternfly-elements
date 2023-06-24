import type { ReactiveController, ReactiveElement } from 'lit';

export class TimestampController implements ReactiveController {
  constructor(host: ReactiveElement) {
    host.addController(this);
  }
}
