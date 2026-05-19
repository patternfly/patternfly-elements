import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

import { PfV6Progress } from '../pf-v6-progress.js';

describe('<pf-v6-progress>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-progress')).to.be.an.instanceof(PfV6Progress);
  });

  describe('simply instantiating', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`<pf-v6-progress></pf-v6-progress>`);
    });

    it('should upgrade', function() {
      const klass = customElements.get('pf-v6-progress');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV6Progress);
    });
  });

  describe('with default values', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress value="33" description="Title"></pf-v6-progress>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });

    it('should have value of 33', function() {
      expect(element.value).to.equal(33);
    });

    it('should have description of "Title"', function() {
      expect(element.description).to.equal('Title');
    });

    it('should have progressbar role in ax tree', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainRole('progressbar');
    });

    it('should have aria-valuenow of 33 in ax tree', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainQuery({ role: 'progressbar', value: 33 });
    });

    it('should have accessible name from description in ax tree', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainQuery({ role: 'progressbar', name: 'Title' });
    });
  });

  describe('with value and max', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress value="25" max="50" description="Title"></pf-v6-progress>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with min and max', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress value="75" min="50" max="100" description="Title"></pf-v6-progress>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with value-text', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress value="2" max="5" value-text="2 of 5 units" description="Title"></pf-v6-progress>
      `);
    });

    it('should have valueText property', function() {
      expect(element.valueText).to.equal('2 of 5 units');
    });

    it('should have aria-valuetext in ax tree', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainQuery({ role: 'progressbar', valuetext: '2 of 5 units' });
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with size="sm"', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress size="sm" value="33" description="Title"></pf-v6-progress>
      `);
    });

    it('should reflect size attribute', function() {
      expect(element.getAttribute('size')).to.equal('sm');
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with size="lg"', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress size="lg" value="33" description="Title"></pf-v6-progress>
      `);
    });

    it('should reflect size attribute', function() {
      expect(element.getAttribute('size')).to.equal('lg');
    });
  });

  describe('with measure-location="outside"', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress measure-location="outside" value="33" description="Title"></pf-v6-progress>
      `);
    });

    it('should reflect attribute', function() {
      expect(element.getAttribute('measure-location')).to.equal('outside');
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with measure-location="inside"', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress measure-location="inside" size="lg" value="33" description="Title"></pf-v6-progress>
      `);
    });

    it('should reflect attribute', function() {
      expect(element.getAttribute('measure-location')).to.equal('inside');
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with measure-location="none"', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress measure-location="none" value="33" description="Title"></pf-v6-progress>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('without description (singleline)', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress value="33"></pf-v6-progress>
      `);
    });

    it('should have fallback accessible name when no description', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainQuery({ role: 'progressbar', name: 'Progress status' });
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with variant="success"', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress variant="success" value="100" description="Title"></pf-v6-progress>
      `);
    });

    it('should reflect variant attribute', function() {
      expect(element.getAttribute('variant')).to.equal('success');
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with variant="warning"', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress variant="warning" value="100" description="Title"></pf-v6-progress>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with variant="danger"', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress variant="danger" value="33" description="Title"></pf-v6-progress>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with truncated', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress truncated
                        description="A very long description"
                        value="33"></pf-v6-progress>
      `);
    });

    it('should reflect attribute', function() {
      expect(element.truncated).to.be.true;
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with helper-text slot', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress value="33" description="Title">
          <span slot="helper-text">Helper text content</span>
        </pf-v6-progress>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('edge cases', function() {
    describe('value below min', function() {
      let element: PfV6Progress;

      beforeEach(async function() {
        element = await createFixture<PfV6Progress>(html`
          <pf-v6-progress value="-10" description="Title"></pf-v6-progress>
        `);
      });

      it('should be accessible', async function() {
        await expect(element).to.be.accessible();
      });
    });

    describe('value above max', function() {
      let element: PfV6Progress;

      beforeEach(async function() {
        element = await createFixture<PfV6Progress>(html`
          <pf-v6-progress value="200" description="Title"></pf-v6-progress>
        `);
      });

      it('should be accessible', async function() {
        await expect(element).to.be.accessible();
      });
    });
  });

  describe('updating value dynamically', function() {
    let element: PfV6Progress;

    beforeEach(async function() {
      element = await createFixture<PfV6Progress>(html`
        <pf-v6-progress value="33" description="Title"></pf-v6-progress>
      `);
      element.value = 75;
      await element.updateComplete;
    });

    it('should update progressbar value in ax tree', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainQuery({ role: 'progressbar', value: 75 });
    });
  });
});
