import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfV6Banner } from '@patternfly/elements/pf-v6-banner/pf-v6-banner.js';

describe('<pf-v6-banner>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-banner')).to.be.an.instanceof(PfV6Banner);
  });

  it('should upgrade', async function() {
    const el = await createFixture<PfV6Banner>(html`<pf-v6-banner>Test</pf-v6-banner>`);
    expect(el)
        .to.be.an.instanceOf(customElements.get('pf-v6-banner'))
        .and
        .to.be.an.instanceOf(PfV6Banner);
  });

  describe('default', function() {
    let element: PfV6Banner;

    beforeEach(async function() {
      element = await createFixture<PfV6Banner>(html`
        <pf-v6-banner>Default banner</pf-v6-banner>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });

    it('should display content in the accessibility tree', async function() {
      const snapshot = await a11ySnapshot();
      const node = snapshot.children?.find(
        (child: { name?: string }) => child.name?.includes('Default banner')
      );
      expect(node).to.exist;
    });
  });

  describe('with color="blue"', function() {
    let element: PfV6Banner;

    beforeEach(async function() {
      element = await createFixture<PfV6Banner>(html`
        <pf-v6-banner color="blue">Blue banner</pf-v6-banner>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with status="danger"', function() {
    let element: PfV6Banner;

    beforeEach(async function() {
      element = await createFixture<PfV6Banner>(html`
        <pf-v6-banner status="danger">Danger banner</pf-v6-banner>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with slotted screen reader text', function() {
    let element: PfV6Banner;

    beforeEach(async function() {
      element = await createFixture<PfV6Banner>(html`
        <pf-v6-banner status="danger">
          <span class="pf-v6-screen-reader">Danger alert:</span>
          An error has occurred.
        </pf-v6-banner>
      `);
    });

    it('should include screen reader text in the accessibility tree', async function() {
      const snapshot = await a11ySnapshot();
      const node = snapshot.children?.find(
        (child: { name?: string }) => child.name?.includes('Danger alert:')
      );
      expect(node).to.exist;
    });

    it('should include banner content in the accessibility tree', async function() {
      const snapshot = await a11ySnapshot();
      const node = snapshot.children?.find(
        (child: { name?: string }) => child.name?.includes('An error has occurred.')
      );
      expect(node).to.exist;
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with sticky', function() {
    let element: PfV6Banner;

    beforeEach(async function() {
      element = await createFixture<PfV6Banner>(html`
        <pf-v6-banner sticky>Sticky banner</pf-v6-banner>
      `);
    });

    it('should have sticky positioning', function() {
      expect(getComputedStyle(element).position).to.equal('sticky');
    });
  });

  describe('with slotted link', function() {
    beforeEach(async function() {
      await createFixture<PfV6Banner>(html`
        <pf-v6-banner>
          Banner with <a href="#">a link</a>
        </pf-v6-banner>
      `);
    });

    it('should include the link in the accessibility tree', async function() {
      const snapshot = await a11ySnapshot();
      const link = snapshot.children?.find(
        (child: { role?: string }) => child.role === 'link'
      );
      expect(link).to.exist;
      expect(link).to.have.property('name', 'a link');
    });
  });
});
