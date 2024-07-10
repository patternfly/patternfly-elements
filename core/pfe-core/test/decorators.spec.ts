import { LitElement, html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { observes } from '../decorators/observes.js';

@customElement('x-observes-host')
class XObservesHost extends LitElement {
  @property({ type: Number }) count = 0;

  old?: number;
  current?: number;

  @observes('count') numberChanged(old: number, current: number) {
    this.old = old;
    this.current = current;
  }
}

describe('@observes', function() {
  let element: XObservesHost;
  beforeEach(async function() {
    element = await fixture(html`<x-observes-host></x-observes-host>`);
  });
  it('initializes with old and new values', function() {
    expect(element.old).to.equal(undefined);
    expect(element.current).to.equal(0);
  });
  describe('setting the observed prop', function() {
    beforeEach(function() {
      element.count++;
    });
    it('updates old and new values', function() {
      expect(element.old).to.equal(0);
      expect(element.current).to.equal(1);
    });
  });
});
