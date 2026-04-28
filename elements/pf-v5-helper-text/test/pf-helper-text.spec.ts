import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfV5HelperText } from '@patternfly/elements/pf-v5-helper-text/pf-v5-helper-text.js';

describe('<pf-v5-helper-text>', function() {
  describe('simply instantiating', function() {
    let element: PfV5HelperText;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-v5-helper-text')).to.be.an.instanceof(PfV5HelperText);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfV5HelperText>(html`<pf-v5-helper-text></pf-v5-helper-text>`);
      const klass = customElements.get('pf-v5-helper-text');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV5HelperText);
    });
  });

  describe('variant property', function() {
    it('should default to "default" variant', async function() {
      const element = await createFixture<PfV5HelperText>(html`<pf-v5-helper-text></pf-v5-helper-text>`);
      expect(element.variant).to.equal('default');
    });

    it('should reflect variant attribute', async function() {
      const element = await createFixture<PfV5HelperText>(html`<pf-v5-helper-text variant="success"></pf-v5-helper-text>`);
      expect(element.variant).to.equal('success');
      expect(element.getAttribute('variant')).to.equal('success');
    });
  });

  describe('icon display', function() {
    it('should show icon when icon property is set', async function() {
      const element = await createFixture<PfV5HelperText>(html`<pf-v5-helper-text icon="check-circle">Success</pf-v5-helper-text>`);
      await element.updateComplete;
      const iconContainer = element.shadowRoot?.querySelector('#icon');
      expect(iconContainer?.hasAttribute('hidden')).to.be.false;
    });

    it('should hide icon when no icon or slotted icon is present', async function() {
      const element = await createFixture<PfV5HelperText>(html`<pf-v5-helper-text variant="default">Text</pf-v5-helper-text>`);
      await element.updateComplete;
      const iconContainer = element.shadowRoot?.querySelector('#icon');
      expect(iconContainer?.hasAttribute('hidden')).to.be.true;
    });
  });

  describe('text content', function() {
    it('should render text content in default slot', async function() {
      const element = await createFixture<PfV5HelperText>(html`<pf-v5-helper-text>Helper text content</pf-v5-helper-text>`);
      expect(element.textContent?.trim()).to.equal('Helper text content');
    });

    it('should have aria-live on text container', async function() {
      const element = await createFixture<PfV5HelperText>(html`<pf-v5-helper-text>Text</pf-v5-helper-text>`);
      await element.updateComplete;
      const textContainer = element.shadowRoot?.querySelector('#text');
      expect(textContainer?.getAttribute('aria-live')).to.equal('polite');
    });
  });
});
