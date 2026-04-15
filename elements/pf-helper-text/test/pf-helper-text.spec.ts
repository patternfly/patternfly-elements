import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfHelperText } from '@patternfly/elements/pf-helper-text/pf-helper-text.js';

describe('<pf-helper-text>', function() {
  describe('simply instantiating', function() {
    let element: PfHelperText;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-helper-text')).to.be.an.instanceof(PfHelperText);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfHelperText>(html`<pf-helper-text></pf-helper-text>`);
      const klass = customElements.get('pf-helper-text');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfHelperText);
    });
  });

  describe('variant property', function() {
    it('should default to "default" variant', async function() {
      const element = await createFixture<PfHelperText>(html`<pf-helper-text></pf-helper-text>`);
      expect(element.variant).to.equal('default');
    });

    it('should reflect variant attribute', async function() {
      const element = await createFixture<PfHelperText>(html`<pf-helper-text variant="success"></pf-helper-text>`);
      expect(element.variant).to.equal('success');
      expect(element.getAttribute('variant')).to.equal('success');
    });
  });

  describe('icon display', function() {
    it('should show icon when icon property is set', async function() {
      const element = await createFixture<PfHelperText>(html`<pf-helper-text icon="check-circle">Success</pf-helper-text>`);
      await element.updateComplete;
      const iconContainer = element.shadowRoot?.querySelector('#icon');
      expect(iconContainer?.hasAttribute('hidden')).to.be.false;
    });

    it('should hide icon when no icon or slotted icon is present', async function() {
      const element = await createFixture<PfHelperText>(html`<pf-helper-text variant="default">Text</pf-helper-text>`);
      await element.updateComplete;
      const iconContainer = element.shadowRoot?.querySelector('#icon');
      expect(iconContainer?.hasAttribute('hidden')).to.be.true;
    });
  });

  describe('text content', function() {
    it('should render text content in default slot', async function() {
      const element = await createFixture<PfHelperText>(html`<pf-helper-text>Helper text content</pf-helper-text>`);
      expect(element.textContent?.trim()).to.equal('Helper text content');
    });

    it('should have aria-live on text container', async function() {
      const element = await createFixture<PfHelperText>(html`<pf-helper-text>Text</pf-helper-text>`);
      await element.updateComplete;
      const textContainer = element.shadowRoot?.querySelector('#text');
      expect(textContainer?.getAttribute('aria-live')).to.equal('polite');
    });
  });
});
