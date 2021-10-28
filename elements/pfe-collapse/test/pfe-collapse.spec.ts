import { expect, aTimeout, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { spy } from 'sinon';

import { PfeCollapse } from '@patternfly/pfe-collapse';

describe('<pfe-collapse>', function() {
  it('should upgrade', async function() {
    const element = await createFixture<PfeCollapse>(html`<pfe-collapse></pfe-collapse>`);
    expect(element, 'the <pfe-collapse> should be an instance of PfeCollapse')
      .to.be.an.instanceof(customElements.get('pfe-collapse'))
      .and
      .to.be.an.instanceof(PfeCollapse);
  });

  it('should initialize with the correct attributes', async function() {
    const element = await createFixture<PfeCollapse>(html`
      <pfe-collapse>
        <pfe-collapse-toggle>Toggle</pfe-collapse-toggle>
        <pfe-collapse-panel>Panel</pfe-collapse-panel>
      </pfe-collapse>
    `);

    const toggle = element.querySelector('pfe-collapse-toggle')!;
    const panel = element.querySelector('pfe-collapse-panel')!;

    expect(toggle.getAttribute('aria-expanded')).to.equal('false');
    expect(toggle.getAttribute('role')).to.equal('button');
    expect(toggle.getAttribute('tabindex')).to.equal('0');
    expect(toggle.getAttribute('aria-controls')).to.equal(panel.id);

    expect(panel.hasAttribute('expanded')).to.be.false;
  });

  it('should toggle a panel inside pfe-collapse on click', async function() {
    const element = await createFixture<PfeCollapse>(html`
      <pfe-collapse>
        <pfe-collapse-toggle>Toggle</pfe-collapse-toggle>
        <pfe-collapse-panel>Panel</pfe-collapse-panel>
      </pfe-collapse>`);
    const toggle = element.querySelector('pfe-collapse-toggle')!;
    const panel = element.querySelector('pfe-collapse-panel')!;

    expect(toggle.getAttribute('aria-expanded')).to.equal('false');
    expect(panel.hasAttribute('expanded')).to.be.false;

    toggle.click();

    await element.updateComplete;

    expect(toggle.getAttribute('aria-expanded')).to.equal('true');
    expect(panel.hasAttribute('expanded')).to.be.true;

    toggle.click();

    await element.updateComplete;

    expect(toggle.getAttribute('aria-expanded')).to.equal('false');
    expect(panel.hasAttribute('expanded')).to.be.false;
  });

  it('should animate on click', async function(this: Mocha.Context) {
    this.timeout(5000);
    const element = await createFixture<PfeCollapse>(html`
      <pfe-collapse>
        <pfe-collapse-toggle>Toggle</pfe-collapse-toggle>
        <pfe-collapse-panel>Panel</pfe-collapse-panel>
      </pfe-collapse>`);
    const toggle = element.querySelector('pfe-collapse-toggle')!;
    const panel = element.querySelector('pfe-collapse-panel')!;

    expect(toggle.getAttribute('aria-expanded')).to.equal('false');
    expect(panel.hasAttribute('expanded')).to.be.false;

    const cycles = 3;
    for (let i = 0; i < cycles; i++) {
      toggle.click();
      await element.updateComplete;
      await panel.updateComplete;
      expect(element.classList.contains('animating')).to.be.true;
      await aTimeout(700);
      expect(element.classList.contains('animating')).to.be.false;
      toggle.click();
      await element.updateComplete;
      await panel.updateComplete;
      expect(element.classList.contains('animating')).to.be.true;
      await aTimeout(700);
      expect(element.classList.contains('animating')).to.be.false;
    }
  });

  it(`should toggle a panel inside pfe-collapse when the toggle method is called on pfe-collapse`, async function() {
    const element = await createFixture<PfeCollapse>(html`
      <pfe-collapse>
        <pfe-collapse-toggle>Toggle</pfe-collapse-toggle>
        <pfe-collapse-panel>Panel</pfe-collapse-panel>
      </pfe-collapse>`);
    const toggle = element.querySelector('pfe-collapse-toggle')!;
    const panel = element.querySelector('pfe-collapse-panel')!;

    element.toggle();

    await element.updateComplete;

    expect(toggle.getAttribute('aria-expanded')).to.equal('true');
    expect(panel.hasAttribute('expanded')).to.be.true;

    element.toggle();

    await element.updateComplete;

    expect(toggle.getAttribute('aria-expanded')).to.equal('false');
    expect(panel.hasAttribute('expanded')).to.be.false;
  });

  it(`a pfe-collapse-toggle should be able to control a pfe-collapse-panel without being wrapped in a pfe-collapse tag`, async function() {
    const element = await createFixture<PfeCollapse>(html`
      <div id="outsidePfeCollapse">
        <pfe-collapse-toggle aria-controls="panel1">Toggle</pfe-collapse-toggle>
        <pfe-collapse-panel id="panel1">Panel</pfe-collapse-panel>
      </div>`);
    const toggle = element.querySelector('pfe-collapse-toggle')!;
    const panel = element.querySelector('pfe-collapse-panel')!;

    toggle.click();

    await toggle.updateComplete;
    await panel.updateComplete;

    expect(toggle.getAttribute('aria-expanded')).to.equal('true');
    expect(panel.hasAttribute('expanded')).to.be.true;
  });

  it(`a pfe-collapse-panel should be able to be controlled without a pfe-collapse-toggle`, async function() {
    const element = await createFixture<PfeCollapse>(html`
      <div id="standalonePanel">
        <pfe-collapse-panel>Panel</pfe-collapse-panel>
      </div>`);
    const panel = element.querySelector('pfe-collapse-panel')!;

    panel.expanded = true;

    await panel.updateComplete;

    expect(panel.hasAttribute('expanded')).to.be.true;

    panel.expanded = false;

    await panel.updateComplete;

    expect(panel.hasAttribute('expanded')).to.be.false;
  });

  it(`should fire a pfe-collapse:change event when the element is expanded or collapsed`, async function() {
    const element = await createFixture<PfeCollapse>(html`
      <pfe-collapse>
        <pfe-collapse-toggle>Toggle</pfe-collapse-toggle>
        <pfe-collapse-panel>Panel</pfe-collapse-panel>
      </pfe-collapse>`);

    const toggle = element.querySelector('pfe-collapse-toggle')!;
    const panel = element.querySelector('pfe-collapse-panel')!;

    const handlerSpy = spy();

    document.addEventListener('pfe-collapse:change', handlerSpy);

    toggle.click();

    expect(handlerSpy)
      .to.have.been.calledOnce
      .and
      .to.have.been.calledWithMatch({
        detail: {
          expanded: true,
          toggle: toggle,
          panel: panel,
        },
      });

    // reset
    document.removeEventListener('pfe-collapse:change', handlerSpy);
  });

  it(`a pfe-collapse-panel should fire a pfe-collapse-panel:animation-start event when the panel is expanded or collapsed`, async function() {
    const element = await createFixture<PfeCollapse>(html`
      <pfe-collapse>
        <pfe-collapse-toggle>Toggle</pfe-collapse-toggle>
        <pfe-collapse-panel>Panel</pfe-collapse-panel>
      </pfe-collapse>`);

    const toggle = element.querySelector('pfe-collapse-toggle')!;
    const panel = element.querySelector('pfe-collapse-panel')!;

    const handlerSpy = spy();

    document.addEventListener('pfe-collapse-panel:animation-start', handlerSpy);

    toggle.click();

    await toggle.updateComplete;
    await panel.updateComplete;
    await element.updateComplete;

    expect(handlerSpy)
      .to.have.been.calledOnce
      .and
      .to.have.been.calledWithMatch({
        detail: {
          state: 'opening',
          panel: panel,
        },
      });

    // reset
    document.removeEventListener('pfe-collapse-panel:animation-start', handlerSpy);
  });

  it(`a pfe-collapse-panel should fire a pfe-collapse-panel:animation-end event when the panel has finished expanding or collapsing`, async function() {
    const element = await createFixture<PfeCollapse>(html`
      <pfe-collapse>
        <pfe-collapse-toggle>Toggle</pfe-collapse-toggle>
        <pfe-collapse-panel>Panel</pfe-collapse-panel>
      </pfe-collapse>`);

    const toggle = element.querySelector('pfe-collapse-toggle')!;
    const panel = element.querySelector('pfe-collapse-panel')!;

    await panel.updateComplete;
    await toggle.updateComplete;

    const handlerSpy = spy();

    document.addEventListener('pfe-collapse-panel:animation-end', handlerSpy);

    toggle.click();

    await aTimeout(500);

    expect(handlerSpy)
      .to.have.been.calledOnce
      .and
      .to.have.been.calledWithMatch({
        detail: {
          expanded: true,
          panel: panel,
        },
      });

    // reset
    document.removeEventListener('pfe-collapse-panel:animation-end', handlerSpy);
  });

  it(`should add animation attribute to a pfe-collapse-panel when the attribute is added to pfe-collapse`, async function() {
    const element = await createFixture<PfeCollapse>(html`
      <pfe-collapse>
        <pfe-collapse-toggle>Toggle</pfe-collapse-toggle>
        <pfe-collapse-panel>Panel</pfe-collapse-panel>
      </pfe-collapse>`);

    const panel = element.querySelector('pfe-collapse-panel')!;

    element.setAttribute('animation', 'false');

    await panel.updateComplete;
    await element.updateComplete;

    expect(panel.getAttribute('animation')).to.equal('false');
  });

  it(`should log a warning if a pfe-collapse-toggle doesn't have an associated pfe-collapse-panel`, async function() {
    const element = await createFixture<PfeCollapse>(html`
      <div id="toggleWithoutAssociatedPanel">
        <pfe-collapse-toggle id="toggle-element">Toggle</pfe-collapse-toggle>
      </div>`);

    const toggle = element.querySelector('pfe-collapse-toggle')!;

    const consoleSpy = spy(console, 'warn');

    toggle.click();

    expect(consoleSpy)
      .to.have.been.calledOnceWith(
        '[pfe-collapse-toggle#toggle-element]',
        'This toggle doesn\'t have a panel associated with it'
      );

    consoleSpy.restore();
  });

  it('should not open the panel if the toggle has been disabled', async function() {
    const element = await createFixture<PfeCollapse>(html`
      <pfe-collapse>
        <pfe-collapse-toggle disabled="disabled">Toggle</pfe-collapse-toggle>
        <pfe-collapse-panel>Panel</pfe-collapse-panel>
      </pfe-collapse>`);

    const toggle = element.querySelector('pfe-collapse-toggle')!;
    const panel = element.querySelector('pfe-collapse-panel')!;

    toggle.click();

    await element.updateComplete;
    await toggle.updateComplete;
    await panel.updateComplete;

    expect(toggle.getAttribute('aria-expanded')).to.equal('false');
    expect(!panel.hasAttribute('expanded')).to.be.true;
  });

  it(`should still be able to open a panel that is added to the DOM after the toggle has been added`, async function() {
    const element = await createFixture<PfeCollapse>(html`
      <div id="latePanel">
        <pfe-collapse-toggle aria-controls="latePanel1">Toggle</pfe-collapse-toggle>
      </div>`);

    const toggle = element.querySelector('pfe-collapse-toggle')!;
    const panel = document.createElement('pfe-collapse-panel');

    panel.id = 'latePanel1';
    panel.innerText = 'Panel';

    element.appendChild(panel);

    toggle.click();

    await toggle.updateComplete;
    await panel.updateComplete;

    expect(toggle.getAttribute('aria-expanded')).to.equal('true');
    expect(panel.hasAttribute('expanded')).to.be.true;
  });
});
