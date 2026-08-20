import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfV6HelperText } from '@patternfly/elements/pf-v6-helper-text/pf-v6-helper-text.js';

describe('<pf-v6-helper-text>', function() {
  describe('simply instantiating', function() {
    let element: PfV6HelperText;

    beforeEach(async function() {
      element = await createFixture<PfV6HelperText>(
        html`<pf-v6-helper-text></pf-v6-helper-text>`
      );
    });

    it('imperatively instantiates', function() {
      expect(document.createElement('pf-v6-helper-text'))
          .to.be.an.instanceof(PfV6HelperText);
    });

    it('should upgrade', function() {
      const klass = customElements.get('pf-v6-helper-text');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV6HelperText);
    });
  });

  describe('variant property', function() {
    let element: PfV6HelperText;

    beforeEach(async function() {
      element = await createFixture<PfV6HelperText>(
        html`<pf-v6-helper-text></pf-v6-helper-text>`
      );
    });

    it('should default to "default" variant', function() {
      expect(element.variant).to.equal('default');
    });

    it('should reflect variant attribute', function() {
      expect(element.getAttribute('variant')).to.equal('default');
    });
  });

  describe('with variant="success"', function() {
    let element: PfV6HelperText;

    beforeEach(async function() {
      element = await createFixture<PfV6HelperText>(
        html`<pf-v6-helper-text variant="success">Good job</pf-v6-helper-text>`
      );
    });

    it('should reflect variant attribute', function() {
      expect(element.variant).to.equal('success');
      expect(element.getAttribute('variant')).to.equal('success');
    });
  });

  describe('default variant icon', function() {
    describe('when variant is default', function() {
      let element: PfV6HelperText;

      beforeEach(async function() {
        element = await createFixture<PfV6HelperText>(
          html`<pf-v6-helper-text>Text</pf-v6-helper-text>`
        );
      });

      it('should not display an icon', function() {
        const icon = element.shadowRoot!.querySelector('[part="icon"]') as HTMLElement;
        expect(icon.offsetWidth).to.equal(0);
      });
    });

    describe('when variant is non-default', function() {
      let element: PfV6HelperText;

      beforeEach(async function() {
        element = await createFixture<PfV6HelperText>(
          html`<pf-v6-helper-text variant="success">Text</pf-v6-helper-text>`
        );
        await element.updateComplete;
      });

      it('should display the icon automatically', function() {
        const icon = element.shadowRoot!.querySelector('[part="icon"]') as HTMLElement;
        expect(icon.offsetWidth).to.be.greaterThan(0);
      });
    });
  });

  describe('custom icon slot', function() {
    let element: PfV6HelperText;

    beforeEach(async function() {
      element = await createFixture<PfV6HelperText>(html`
        <pf-v6-helper-text>
          <svg slot="icon" aria-hidden="true"><circle cx="6" cy="6" r="6"/></svg>
          Custom icon text
        </pf-v6-helper-text>
      `);
    });

    it('should display the icon area when icon slot is filled', function() {
      const icon = element.shadowRoot!.querySelector('[part="icon"]') as HTMLElement;
      expect(icon.offsetWidth).to.be.greaterThan(0);
    });
  });

  describe('accessible-label', function() {
    describe('with non-default variant', function() {
      let element: PfV6HelperText;

      beforeEach(async function() {
        element = await createFixture<PfV6HelperText>(
          html`<pf-v6-helper-text variant="error">Error text</pf-v6-helper-text>`
        );
      });

      it('should include variant status text in text part', function() {
        const textPart = element.shadowRoot!.querySelector('[part="text"]');
        expect(textPart!.textContent).to.include('error status');
      });
    });

    describe('with default variant', function() {
      let element: PfV6HelperText;

      beforeEach(async function() {
        element = await createFixture<PfV6HelperText>(
          html`<pf-v6-helper-text>Default text</pf-v6-helper-text>`
        );
      });

      it('should not include status text', function() {
        const textPart = element.shadowRoot!.querySelector('[part="text"]');
        expect(textPart!.textContent).to.not.include('status');
      });
    });

    describe('with custom accessible-label', function() {
      let element: PfV6HelperText;

      beforeEach(async function() {
        element = await createFixture<PfV6HelperText>(
          html`<pf-v6-helper-text variant="error" accessible-label="danger">Error</pf-v6-helper-text>`
        );
      });

      it('should use custom text instead of default', function() {
        const textPart = element.shadowRoot!.querySelector('[part="text"]');
        expect(textPart!.textContent).to.include('danger');
        expect(textPart!.textContent).to.not.include('error status');
      });
    });

    describe('with accessible-label set to empty string', function() {
      let element: PfV6HelperText;

      beforeEach(async function() {
        element = await createFixture<PfV6HelperText>(
          html`<pf-v6-helper-text variant="error" accessible-label="">Error</pf-v6-helper-text>`
        );
      });

      it('should suppress screen reader announcement', function() {
        const textPart = element.shadowRoot!.querySelector('[part="text"]');
        expect(textPart!.textContent).to.not.include('status');
        expect(textPart!.textContent).to.not.include('danger');
      });
    });
  });

  describe('dynamic attribute', function() {
    let element: PfV6HelperText;

    beforeEach(async function() {
      element = await createFixture<PfV6HelperText>(
        html`<pf-v6-helper-text variant="success" dynamic>Dynamic text</pf-v6-helper-text>`
      );
    });

    it('should reflect dynamic attribute', function() {
      expect(element.dynamic).to.be.true;
      expect(element.hasAttribute('dynamic')).to.be.true;
    });
  });

  describe('accessibility', function() {
    it('should expose text content in accessibility tree', async function() {
      await createFixture(html`
        <pf-v6-helper-text variant="error">Password is too short</pf-v6-helper-text>
      `);
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.some(
        (child: { name?: string }) => child.name?.includes('Password is too short')
      )).to.be.true;
    });

    it('should not expose icon in accessibility tree', async function() {
      await createFixture(html`
        <pf-v6-helper-text variant="success">Success text</pf-v6-helper-text>
      `);
      const snapshot = await a11ySnapshot();
      const hasImgRole = snapshot.children?.some(
        (child: { role?: string }) => child.role === 'img' || child.role === 'image'
      );
      expect(hasImgRole).to.not.be.true;
    });
  });
});
