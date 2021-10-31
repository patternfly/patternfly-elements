import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeNumber } from '@patternfly/pfe-number';

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const TEMPLATES = {
  ordinal: html`<pfe-number type="ordinal" number="1">1</pfe-number>`,
  bytes: html`<pfe-number type="bytes" number="2017">2017</pfe-number>`,
  abbrev: html`<pfe-number type="abbrev" number="12345">12345</pfe-number>`,
  percent: html`<pfe-number type="percent" number="0.5678">0.5678</pfe-number>`,
  e: html`<pfe-number type="e" number="2000000">2000000</pfe-number>`,
  withDec: html`<pfe-number type="thousands" number="1234.123">1234.123</pfe-number>`,
  withoutDec: html`<pfe-number type="thousands" number="1234">1234</pfe-number>`,
  change: html`<pfe-number number="10">10</pfe-number>`,
  invalid: html`<pfe-number type="ordinal" number="fdjhsa">fdjhsa</pfe-number>`,
};

describe('<pfe-number>', function() {
  it('should upgrade', async function() {
    const el = await createFixture<PfeNumber>(html`<pfe-number></pfe-number>`);
    expect(el, 'pfe-number should be an instance of PfeNumber')
      .to.be.an.instanceOf(customElements.get('pfe-number'))
      .and
      .to.be.an.instanceOf(PfeNumber);
  });

  describe('attributes', async function() {
    it('should show an ordinal number', async function() {
      const element = await createFixture<PfeNumber>(TEMPLATES.ordinal);
      const content = element.shadowRoot!.querySelector('span')!.textContent;

      expect(content).to.equal('1st');
    });

    it('should show bytes', async function() {
      const element = await createFixture<PfeNumber>(TEMPLATES.bytes);
      const content = element.shadowRoot!.querySelector('span')!.textContent;

      expect(content).to.equal('1.97 KiB');
    });

    it('should show a percentage', async function() {
      const element = await createFixture<PfeNumber>(TEMPLATES.percent);
      const content = element.shadowRoot!.querySelector('span')!.textContent;

      expect(content).to.equal('57%');
    });

    it('should show an exponential number', async function() {
      const element = await createFixture<PfeNumber>(TEMPLATES.e);
      const content = element.shadowRoot!.querySelector('span')!.textContent;

      expect(content).to.equal('2.000e+6');
    });

    it('should show a thousands number with a decimal', async function() {
      const element = await createFixture<PfeNumber>(TEMPLATES.withDec);
      const content = element.shadowRoot!.querySelector('span')!.textContent;

      expect(content).to.equal('1 234.12');
    });

    it('should show a thousands number without a decimal', async function() {
      const element = await createFixture<PfeNumber>(TEMPLATES.withoutDec);
      const content = element.shadowRoot!.querySelector('span')!.textContent;

      expect(content).to.equal('1 234');
    });

    it('should react to the number changing', async function() {
      const element = await createFixture<PfeNumber>(TEMPLATES.change);
      const before = element.shadowRoot!.querySelector('span')!.textContent;

      element.setAttribute('number', '20');
      await element.updateComplete;
      const after = element.shadowRoot!.querySelector('span')!.textContent;

      expect(after).to.equal('20').and.to.not.equal(before);
    });

    it('should show nothing if the number is not valid', async function() {
      const element = await createFixture<PfeNumber>(TEMPLATES.invalid);
      const content = element.shadowRoot!.querySelector('span')!.textContent;
      expect(content).to.equal('');
    });
  });
});
