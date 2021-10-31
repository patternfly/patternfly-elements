import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

import { PfeHealthIndex } from '@patternfly/pfe-health-index';

import { spy, SinonSpy } from 'sinon';

describe('<pfe-health-index>', function() {
  let consoleSpy: SinonSpy;

  const TEMPLATES = {
    simple: html`<pfe-health-index></pfe-health-index>`,
    original: html`<pfe-health-index id="original" health-index="A">A</pfe-health-index>`,
    lowercase: html`<pfe-health-index id="lowercase" health-index="a">a</pfe-health-index>`,
    badIndex: html`<pfe-health-index id="badIndex">fdsa</pfe-health-index>`,
    changingIndex: html`<pfe-health-index id="changingIndex" health-index="A">A</pfe-health-index>`,
    A: html`<pfe-health-index id="A" health-index="A">A</pfe-health-index>`,
    B: html`<pfe-health-index id="B" health-index="B">B</pfe-health-index>`,
    C: html`<pfe-health-index id="C" health-index="C">C</pfe-health-index>`,
    D: html`<pfe-health-index id="D" health-index="D">D</pfe-health-index>`,
    E: html`<pfe-health-index id="E" health-index="E">E</pfe-health-index>`,
    F: html`<pfe-health-index id="F" health-index="F">F</pfe-health-index>`,
    largeSize: html`<pfe-health-index id="largeSize" health-index="A">A</pfe-health-index>`,
    miniSize: html`<pfe-health-index id="miniSize" health-index="A" size="mini">A</pfe-health-index>`,
  };

  beforeEach(function() {
    consoleSpy = spy(console, 'warn');
  });

  afterEach(function() {
    consoleSpy.restore();
  });

  it('should upgrade', async function() {
    const element = await createFixture<PfeHealthIndex>(TEMPLATES.simple);
    expect(element, 'the <pfe-health-index> should be an instance of PfeHealthIndex')
      .to.be.an.instanceof(customElements.get('pfe-health-index'))
      .and
      .to.be.an.instanceof(PfeHealthIndex);
  });

  it('should show a health index', async function() {
    const healthIndex = await createFixture<PfeHealthIndex>(TEMPLATES.original);
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot!.querySelector('.box.active')!;
    const shadowRootTextContent =
      healthIndex.shadowRoot!.querySelector('#healthIndex')!.textContent;

    expect(healthIndexTextContent).to.equal('A');
    expect(activeBox?.classList.contains('a')).to.be.true;
    expect(shadowRootTextContent).to.equal('A');
  });

  it('should show a health index with uppercase text when given lowercase text', async function() {
    const healthIndex = await createFixture<PfeHealthIndex>(TEMPLATES.lowercase);
    const activeBox = healthIndex.shadowRoot!.querySelector('.box.active')!;
    const shadowRootTextContent =
      healthIndex.shadowRoot!.querySelector('#healthIndex')!.textContent;

    await healthIndex.updateComplete;
    expect(activeBox?.classList.contains('a')).to.be.true;
    expect(shadowRootTextContent).to.equal('A');
  });

  it('should show a console warning if an invalid health index is provided', async function() {
    await createFixture<PfeHealthIndex>(TEMPLATES.badIndex);

    await nextFrame();

    expect(consoleSpy)
      .to.have.been.calledOnceWith(
        '[pfe-health-index#badIndex]',
        'a valid health-index was not provided. Please use A, B, C, D, E, or F'
      );
  });

  it('should change the index if the health-index attribute is updated', async function() {
    const healthIndex = await createFixture<PfeHealthIndex>(TEMPLATES.changingIndex);
    await nextFrame();

    const getTextContent = () => healthIndex.textContent;
    const getActiveBox = () => healthIndex.shadowRoot!.querySelector('.box.active');
    const getShadowRootTextContent = () =>
      healthIndex.shadowRoot!.querySelector('#healthIndex')!.textContent;

    expect(getTextContent(), 'initial').to.equal('A');
    expect(getActiveBox()!.classList.contains('a'), 'initial class').to.be.true;
    expect(getShadowRootTextContent(), 'initial shadow').to.equal('A');

    healthIndex.setAttribute('health-index', 'B');

    await nextFrame();

    expect(healthIndex.textContent).to.equal('B');
    expect(getActiveBox()!.classList.contains('b')).to.be.true;
    expect(getShadowRootTextContent()).to.equal('B');
  });

  it('should show a health index of A', async function() {
    const healthIndex = await createFixture<PfeHealthIndex>(TEMPLATES.A);
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot!.querySelector('.box.active')!;
    const shadowRootTextContent =
      healthIndex.shadowRoot!.querySelector('#healthIndex')!.textContent;

    expect(healthIndexTextContent).to.equal('A');
    expect(activeBox.classList.contains('a')).to.be.true;
    expect(shadowRootTextContent).to.equal('A');
  });

  it('should show a health index of B', async function() {
    const healthIndex = await createFixture<PfeHealthIndex>(TEMPLATES.B);
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot!.querySelector('.box.active')!;
    const shadowRootTextContent =
      healthIndex.shadowRoot!.querySelector('#healthIndex')!.textContent;

    expect(healthIndexTextContent).to.equal('B');
    expect(activeBox.classList.contains('b')).to.be.true;
    expect(shadowRootTextContent).to.equal('B');
  });

  it('should show a health index of C', async function() {
    const healthIndex = await createFixture<PfeHealthIndex>(TEMPLATES.C);
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot!.querySelector('.box.active')!;
    const shadowRootTextContent =
      healthIndex.shadowRoot!.querySelector('#healthIndex')!.textContent;

    expect(healthIndexTextContent).to.equal('C');
    expect(activeBox.classList.contains('c')).to.be.true;
    expect(shadowRootTextContent).to.equal('C');
  });

  it('should show a health index of D', async function() {
    const healthIndex = await createFixture<PfeHealthIndex>(TEMPLATES.D);
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot!.querySelector('.box.active')!;
    const shadowRootTextContent =
      healthIndex.shadowRoot!.querySelector('#healthIndex')!.textContent;

    expect(healthIndexTextContent).to.equal('D');
    expect(activeBox.classList.contains('d')).to.be.true;
    expect(shadowRootTextContent).to.equal('D');
  });

  it('should show a health index of E', async function() {
    const healthIndex = await createFixture<PfeHealthIndex>(TEMPLATES.E);
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot!.querySelector('.box.active')!;
    const shadowRootTextContent =
      healthIndex.shadowRoot!.querySelector('#healthIndex')!.textContent;

    expect(healthIndexTextContent).to.equal('E');
    expect(activeBox.classList.contains('e')).to.be.true;
    expect(shadowRootTextContent).to.equal('E');
  });

  it('should show a health index of F', async function() {
    const healthIndex = await createFixture<PfeHealthIndex>(TEMPLATES.F);
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot!.querySelector('.box.active')!;
    const shadowRootTextContent =
      healthIndex.shadowRoot!.querySelector('#healthIndex')!.textContent;

    expect(healthIndexTextContent).to.equal('F');
    expect(activeBox.classList.contains('f')).to.be.true;
    expect(shadowRootTextContent).to.equal('F');
  });

  it('should increase in size if size attribute is set to lg', async function() {
    const healthIndex = await createFixture<PfeHealthIndex>(TEMPLATES.largeSize);
    const {
      offsetWidth: defaultWidth,
      offsetHeight: defaultHeight,
    } = healthIndex.shadowRoot!.querySelector<HTMLElement>('.box.active')!;

    healthIndex.setAttribute('size', 'lg');

    await healthIndex.updateComplete;

    const {
      offsetWidth,
      offsetHeight,
    } = healthIndex.shadowRoot!.querySelector<HTMLElement>('.box.active')!;

    expect(defaultWidth < offsetWidth).to.be.true;
    expect(defaultHeight < offsetHeight).to.be.true;
  });

  it('should only show a single box if the size attribute is set to mini', async function() {
    const healthIndex = await createFixture<PfeHealthIndex>(TEMPLATES.miniSize);
    const boxes = healthIndex.shadowRoot!.querySelectorAll('.box');
    expect(boxes.length).to.equal(1);
  });
});
