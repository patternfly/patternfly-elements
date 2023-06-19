import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { hexToRgb, getColor } from '@patternfly/pfe-tools/test/hex-to-rgb.js';
import { PfBadge } from '@patternfly/elements/pf-badge/pf-badge.js';

// Background colors for the various states
const states = {
  default: '#f0f0f0',
  read: '#f0f0f0',
  unread: '#0066cc',
};

const element = html`<pf-badge number="10">10</pf-badge>`;

describe('<pf-badge>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-badge')).to.be.an.instanceof(PfBadge);
  });

  it('should upgrade', async function() {
    const el = await createFixture<PfBadge>(element);
    expect(el, 'pf-badge should be an instance of PfBadge')
      .to.be.an
      .instanceOf(customElements.get('pf-badge'))
      .and
      .to.be.an.instanceof(PfBadge);
  });

  it('should display text equivalent to the number attribute', async function() {
    const el = await createFixture<PfBadge>(html`<pf-badge number="100">10</pf-badge>`);
    await nextFrame();
    expect(el.shadowRoot!.querySelector('span')!.textContent).to.equal('100');
  });

  it('should add \'+\' sign if the value exceeds the threshold', async function() {
    const el = await createFixture<PfBadge>(html`<pf-badge number="900" threshold="100">900</pf-badge>`);
    await nextFrame();
    expect(el.shadowRoot!.querySelector('span')!.textContent).to.equal('100+');
  });

  it('shouldn\'t add a \'+\' sign if the value doesn\'t exceed the threshold', async function() {
    const el = await createFixture<PfBadge>(html`<pf-badge number="900" threshold="1000">900</pf-badge>`);
    await el.updateComplete;
    expect(el.textContent).to.equal('900');
    expect(el.shadowRoot!.querySelector('span')!.textContent).to.equal('900');
  });

  // This is the one that created an error:
  Object.entries(states).forEach(([state, color]) => {
    it(`should have a background color of '${color}' when state is ${state}`, async function() {
      const el = await createFixture<PfBadge>(element);

      if (state !== 'default') {
        el.setAttribute('state', state);
      }

      const [r, g, b] = getColor(el, 'background-color');
      expect([r, g, b]).to.deep.equal(hexToRgb(color));
    });
  });
});
