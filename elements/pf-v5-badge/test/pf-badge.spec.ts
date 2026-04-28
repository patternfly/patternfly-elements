import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { hexToRgb, getColor } from '@patternfly/pfe-tools/test/hex-to-rgb.js';
import { PfV5Badge } from '@patternfly/elements/pf-v5-badge/pf-v5-badge.js';

// Background colors for the various states
const states = {
  default: '#f0f0f0',
  read: '#f0f0f0',
  unread: '#0066cc',
};

const element = html`<pf-v5-badge number="10">10</pf-v5-badge>`;

describe('<pf-v5-badge>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v5-badge')).to.be.an.instanceof(PfV5Badge);
  });

  it('should upgrade', async function() {
    const el = await createFixture<PfV5Badge>(element);
    expect(el, 'pf-v5-badge should be an instance of PfV5Badge')
        .to.be.an
        .instanceOf(customElements.get('pf-v5-badge'))
        .and
        .to.be.an.instanceof(PfV5Badge);
  });

  it('should display text equivalent to the number attribute', async function() {
    const el = await createFixture<PfV5Badge>(html`<pf-v5-badge number="100">10</pf-v5-badge>`);
    await nextFrame();
    expect(el.shadowRoot!.querySelector('span')!.textContent).to.equal('100');
  });

  it('should add \'+\' sign if the value exceeds the threshold', async function() {
    const el = await createFixture<PfV5Badge>(html`<pf-v5-badge number="900" threshold="100">900</pf-v5-badge>`);
    await nextFrame();
    expect(el.shadowRoot!.querySelector('span')!.textContent).to.equal('100+');
  });

  it('shouldn\'t add a \'+\' sign if the value doesn\'t exceed the threshold', async function() {
    const el = await createFixture<PfV5Badge>(html`<pf-v5-badge number="900" threshold="1000">900</pf-v5-badge>`);
    await el.updateComplete;
    expect(el.textContent).to.equal('900');
    expect(el.shadowRoot!.querySelector('span')!.textContent).to.equal('900');
  });

  // This is the one that created an error:
  Object.entries(states).forEach(([state, color]) => {
    it(`should have a background color of '${color}' when state is ${state}`, async function() {
      const el = await createFixture<PfV5Badge>(element);

      if (state !== 'default') {
        el.setAttribute('state', state);
      }

      const [r, g, b] = getColor(el, 'background-color');
      expect([r, g, b]).to.deep.equal(hexToRgb(color));
    });
  });
});
