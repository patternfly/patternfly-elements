import type { ReactiveElement, ReactiveController } from 'lit';

export class CssVariableController implements ReactiveController {
  style: CSSStyleDeclaration;

  constructor(public host: ReactiveElement) {
    this.style = window.getComputedStyle(host);
  }

  private parseProperty(name: string) {
    return name.substr(0, 2) !== '--' ? `--${name}` : name;
  }

  getVariable(name: string) {
    return this.style.getPropertyValue(this.parseProperty(name)).trim() || null;
  }

  hostConnected?(): void;
}
