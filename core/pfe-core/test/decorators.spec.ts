import { LitElement, html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { observes } from '../decorators/observes.js';
import { observed } from '../decorators/observed.js';
import { listen } from '../decorators/listen.js';

import { spy } from 'sinon';

@customElement('x-observes-host')
class XObservesHost extends LitElement {
  @property({ type: Number }) count = 0;
  old?: number;
  current?: number;
  @observes('count')
  numberChanged(old: number, current: number) {
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
    expect(element.old, 'old').to.equal(undefined);
    expect(element.current, 'current').to.equal(0);
  });
  describe('setting the observed prop', function() {
    beforeEach(function() {
      element.count = 1;
    });
    beforeEach(() => element.updateComplete);
    it('updates old and new values', function() {
      expect(element.old, 'old').to.equal(0);
      expect(element.current, 'current').to.equal(1);
    });
  });
});

@customElement('x-observed-bare-host')
class XObservedBareHost extends LitElement {
  @observed
  @property({ type: Number }) count = 0;

  old?: number;
  current?: number;
  _countChanged(old: number, current: number) {
    this.old = old;
    this.current = current;
  }
}

describe('@observed', function() {
  let element: XObservedBareHost;
  beforeEach(async function() {
    element = await fixture(html`<x-observed-bare-host></x-observed-bare-host>`);
  });
  it('initializes with old and new values', function() {
    expect(element.old, 'old').to.equal(undefined);
    expect(element.current, 'current').to.equal(0);
  });
  describe('setting the observed prop', function() {
    beforeEach(function() {
      element.count = 1;
    });
    beforeEach(() => element.updateComplete);
    it('updates old and new values', function() {
      expect(element.old, 'old').to.equal(0);
      expect(element.current, 'current').to.equal(1);
    });
  });
});

@customElement('x-observed-configured-host')
class XObservedConfiguredHost extends LitElement {
  @observed('_myCallback')
  @property({ type: Number }) count = 0;

  old?: number;
  current?: number;
  _myCallback(old: number, current: number) {
    this.old = old;
    this.current = current;
  }
}

describe('@observed(\'_myCallback\')', function() {
  let element: XObservedConfiguredHost;
  beforeEach(async function() {
    element = await fixture(html`<x-observed-configured-host></x-observed-configured-host>`);
  });
  it('initializes with old and new values', function() {
    expect(element.old, 'old').to.equal(undefined);
    expect(element.current, 'current').to.equal(0);
  });
  describe('setting the observed prop', function() {
    beforeEach(function() {
      element.count = 1;
    });
    beforeEach(() => element.updateComplete);
    it('updates old and new values', function() {
      expect(element.old, 'old').to.equal(0);
      expect(element.current, 'current').to.equal(1);
    });
  });
});

describe('@observed(() => {...})', function() {
  let element: XObservedFunctionHost;
  const dump = spy();

  @customElement('x-observed-function-host')
  class XObservedFunctionHost extends LitElement {
    @observed(dump)
    @property({ type: Number }) count = 0;
  }

  beforeEach(async function() {
    element = await fixture(html`<x-observed-function-host></x-observed-function-host>`);
  });

  it('initializes with old and new values', function() {
    expect(dump).to.have.been.calledWith(undefined, 0);
  });
  describe('setting the observed prop', function() {
    beforeEach(function() {
      element.count = 1;
    });
    beforeEach(() => element.updateComplete);
    it('updates old and new values', function() {
      expect(dump).to.have.been.calledWith(0, 1);
    });
  });
});

@customElement('x-listen-host')
class XListenHost extends LitElement {
  public events: string[] = [];
  @listen('click')
  @listen('change', { once: true })
  handler(event: Event) {
    this.events.push(event.type);
  }
}

describe('@listen', function() {
  let element: XListenHost;
  beforeEach(async function() {
    element = await fixture(document.createElement('x-listen-host'));
  });
  it('listens for a given event on the host', function() {
    element.dispatchEvent(new Event('change'));
    expect(element.events).to.deep.equal(['change']);
  });
  it('composes to listen for a multiple events on the host', function() {
    element.dispatchEvent(new Event('change'));
    element.dispatchEvent(new Event('click'));
    element.dispatchEvent(new Event('change'));
    element.dispatchEvent(new Event('click'));
    expect(element.events).to.deep.equal([
      'change',
      'click',
      'click',
    ]);
  });
});


