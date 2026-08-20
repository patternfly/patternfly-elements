import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { getColor, hexToRgb } from '@patternfly/pfe-tools/test/hex-to-rgb.js';
import { PfV6Badge } from '@patternfly/elements/pf-v6-badge/pf-v6-badge.js';

describe('<pf-v6-badge>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-badge')).to.be.an.instanceof(PfV6Badge);
  });

  it('should upgrade', async function() {
    const el = await createFixture<PfV6Badge>(html`<pf-v6-badge>10</pf-v6-badge>`);
    expect(el)
        .to.be.an.instanceOf(customElements.get('pf-v6-badge'))
        .and
        .to.be.an.instanceOf(PfV6Badge);
  });

  describe('without state attribute', function() {
    let element: PfV6Badge;

    beforeEach(async function() {
      element = await createFixture<PfV6Badge>(html`
        <pf-v6-badge>10</pf-v6-badge>
      `);
      await element.updateComplete;
    });

    it('should display default background color', function() {
      const [r, g, b] = getColor(element, 'background-color');
      expect([r, g, b]).to.deep.equal(hexToRgb('#f0f0f0'));
    });
  });

  describe('with state="read"', function() {
    let element: PfV6Badge;

    beforeEach(async function() {
      element = await createFixture<PfV6Badge>(html`
        <pf-v6-badge state="read">10</pf-v6-badge>
      `);
      await element.updateComplete;
    });

    it('should display read background color', function() {
      const [r, g, b] = getColor(element, 'background-color');
      expect([r, g, b]).to.deep.equal(hexToRgb('#f0f0f0'));
    });
  });

  describe('with state="unread"', function() {
    let element: PfV6Badge;

    beforeEach(async function() {
      element = await createFixture<PfV6Badge>(html`
        <pf-v6-badge state="unread">10</pf-v6-badge>
      `);
      await element.updateComplete;
    });

    it('should display unread background color', function() {
      const [r, g, b] = getColor(element, 'background-color');
      expect([r, g, b]).to.deep.equal(hexToRgb('#0066cc'));
    });

    it('should display unread text color', function() {
      const [r, g, b] = getColor(element, 'color');
      expect([r, g, b]).to.deep.equal(hexToRgb('#ffffff'));
    });
  });

  describe('with disabled attribute', function() {
    let element: PfV6Badge;

    beforeEach(async function() {
      element = await createFixture<PfV6Badge>(html`
        <pf-v6-badge state="read" disabled>10</pf-v6-badge>
      `);
      await element.updateComplete;
    });

    it('should display disabled background color', function() {
      const [r, g, b] = getColor(element, 'background-color');
      expect([r, g, b]).to.deep.equal(hexToRgb('#d2d2d2'));
    });

    it('should have pointer-events: none', function() {
      const styles = getComputedStyle(element);
      expect(styles.pointerEvents).to.equal('none');
    });
  });

  describe('accessibility', function() {
    it('should be accessible', async function() {
      const element = await createFixture<PfV6Badge>(html`
        <pf-v6-badge state="read">10</pf-v6-badge>
      `);
      await expect(element).to.be.accessible();
    });

    it('should contain text in the accessibility tree', async function() {
      await createFixture<PfV6Badge>(html`
        <pf-v6-badge state="read">10</pf-v6-badge>
      `);
      const snapshot = await a11ySnapshot();
      const badgeNode = snapshot.children?.find(
        (child: { name?: string }) => child.name?.includes('10')
      );
      expect(badgeNode).to.exist;
    });
  });

  describe('slot content', function() {
    let element: PfV6Badge;

    beforeEach(async function() {
      element = await createFixture<PfV6Badge>(html`
        <pf-v6-badge state="read">Custom Text</pf-v6-badge>
      `);
      await element.updateComplete;
    });

    it('should display slotted text content', function() {
      expect(element.textContent?.trim()).to.equal('Custom Text');
    });
  });
});
