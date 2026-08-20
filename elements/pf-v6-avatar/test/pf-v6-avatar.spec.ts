import { html, expect, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfV6Avatar } from '@patternfly/elements/pf-v6-avatar/pf-v6-avatar.js';

describe('<pf-v6-avatar>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-avatar')).to.be.an.instanceof(PfV6Avatar);
  });

  it('should upgrade', async function() {
    const el = await createFixture(html`<pf-v6-avatar></pf-v6-avatar>`);
    expect(el, 'pf-v6-avatar should be an instance of PfV6Avatar')
        .to.be.an.instanceOf(customElements.get('pf-v6-avatar'))
        .and
        .to.be.an.instanceOf(PfV6Avatar);
  });

  describe('without src attr', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar></pf-v6-avatar>`);
      await nextFrame();
    });

    it('displays a placeholder', function() {
      const { offsetWidth } = element;
      expect(offsetWidth).to.be.greaterThan(0);
    });

    it('has the default size', function() {
      expect(element.offsetWidth).to.equal(36);
      expect(element.offsetHeight).to.equal(36);
    });

    it('hides the placeholder from the accessibility tree', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot?.children?.find(
        (child: { role: string }) => child.role === 'img'
      )).to.not.be.ok;
    });
  });

  describe('with alt attr', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`
        <pf-v6-avatar alt="User avatar"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="></pf-v6-avatar>
      `);
      await element.updateComplete;
      await nextFrame();
    });

    it('passes alt text to the image', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot?.children?.find(
        (child: { name: string }) => child.name === 'User avatar'
      )).to.be.ok;
    });
  });

  describe('with size="md"', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar size="md"></pf-v6-avatar>`);
      await nextFrame();
    });

    it('renders at the medium size', function() {
      expect(element.offsetWidth).to.equal(36);
      expect(element.offsetHeight).to.equal(36);
    });
  });

  describe('with size="sm"', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar size="sm"></pf-v6-avatar>`);
      await nextFrame();
    });

    it('renders at the small size', function() {
      expect(element.offsetWidth).to.equal(24);
      expect(element.offsetHeight).to.equal(24);
    });
  });

  describe('with size="lg"', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar size="lg"></pf-v6-avatar>`);
      await nextFrame();
    });

    it('renders at the large size', function() {
      expect(element.offsetWidth).to.equal(72);
      expect(element.offsetHeight).to.equal(72);
    });
  });

  describe('with size="xl"', function() {
    let element: PfV6Avatar;
    beforeEach(async function() {
      element = await createFixture(html`<pf-v6-avatar size="xl"></pf-v6-avatar>`);
      await nextFrame();
    });

    it('renders at the extra large size', function() {
      expect(element.offsetWidth).to.equal(128);
      expect(element.offsetHeight).to.equal(128);
    });
  });
});
