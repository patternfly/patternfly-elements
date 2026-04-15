import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot, querySnapshotAll } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfV5LabelGroup } from '../pf-v5-label-group.js';
import { sendKeys } from '@web/test-runner-commands';

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

describe('<pf-v5-label-group>', function() {
  let element: PfV5LabelGroup;

  describe('simply instantiating', function() {
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-v5-label-group')).to.be.an.instanceof(PfV5LabelGroup);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfV5LabelGroup>(html`<pf-v5-label-group></pf-v5-label-group>`);
      const klass = customElements.get('pf-v5-label-group');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV5LabelGroup);
    });
  });

  describe('with 4 labels', function() {
    beforeEach(async function() {
      element = await createFixture<PfV5LabelGroup>(html`
        <pf-v5-label-group>
          <pf-v5-label>Label 1</pf-v5-label>
          <pf-v5-label>Label 2</pf-v5-label>
          <pf-v5-label>Label 3</pf-v5-label>
          <pf-v5-label>Label 4</pf-v5-label>
        </pf-v5-label-group>
      `);
    });

    it('displays 3 labels and an overflow button', async function() {
      const snapshot = await a11ySnapshot();
      expect(querySnapshotAll(snapshot, { name: /^Label/ })).to.have.length(3);
    });

    describe('clicking overflow label', function() {
      beforeEach(async function() {
        const overflow = element.shadowRoot?.querySelector('#overflow') as HTMLElement;
        overflow?.click();
        await element.updateComplete;
      });
      it('should show all labels', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.filter(x => x.name?.startsWith('Label'))?.length).to.equal(4);
      });
      it('should show collapse text', async function() {
        const snapshot = await a11ySnapshot();
        expect(querySnapshotAll(snapshot, { name: 'show less' })).to.have.length(1);
      });
    });
  });

  describe('with 4 labels and `closeable` attribute', function() {
    const updateComplete = () => element.updateComplete;

    beforeEach(async function() {
      element = await createFixture<PfV5LabelGroup>(html`
        <pf-v5-label-group closeable>
          <pf-v5-label>Label 1</pf-v5-label>
          <pf-v5-label>Label 2</pf-v5-label>
          <pf-v5-label>Label 3</pf-v5-label>
          <pf-v5-label>Label 4</pf-v5-label>
        </pf-v5-label-group>
      `);
    });

    beforeEach(updateComplete);

    it('should have a close button', async function() {
      const snapshot = await a11ySnapshot();
      const last = snapshot.children?.at(-1);
      expect(last?.name).to.equal('Close');
      expect(last?.role).to.equal('button');
    });

    describe('clicking close button', function() {
      beforeEach(function() {
        element.focus();
      });
      beforeEach(press('ArrowLeft'));
      beforeEach(press('Enter'));
      beforeEach(updateComplete);
      it('should remove element', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children).to.not.be.ok;
      });
    });
  });

  describe('with 4 labels and custom text attributes', function() {
    beforeEach(async function() {
      element = await createFixture<PfV5LabelGroup>(html`
        <pf-v5-label-group collapsed-text="show $\{remaining} more"
                        expanded-text="show fewer"
                        accessible-label="My Label Group">
          <pf-v5-label>Label 1</pf-v5-label>
          <pf-v5-label>Label 2</pf-v5-label>
          <pf-v5-label>Label 3</pf-v5-label>
          <pf-v5-label>Label 4</pf-v5-label>
        </pf-v5-label-group>
      `);
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with 4 labels and `num-labels="2"` attribute', function() {
    beforeEach(async function() {
      element = await createFixture<PfV5LabelGroup>(html`
        <pf-v5-label-group num-labels="2">
          <pf-v5-label>Label 1</pf-v5-label>
          <pf-v5-label>Label 2</pf-v5-label>
          <pf-v5-label>Label 3</pf-v5-label>
          <pf-v5-label>Label 4</pf-v5-label>
        </pf-v5-label-group>
      `);
    });

    it('only 2 labels should be visible', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.filter(x => x.name?.startsWith('Label'))?.length).to.equal(2);
    });
  });

  describe('with 4 labels and `num-labels="4"` attribute', function() {
    beforeEach(async function() {
      element = await createFixture<PfV5LabelGroup>(html`
        <pf-v5-label-group num-labels="4">
          <pf-v5-label>Label 1</pf-v5-label>
          <pf-v5-label>Label 2</pf-v5-label>
          <pf-v5-label>Label 3</pf-v5-label>
          <pf-v5-label>Label 4</pf-v5-label>
        </pf-v5-label-group>
      `);
    });

    it('all 4 labels should be visible', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.filter(x => x.name?.startsWith('Label'))?.length).to.equal(4);
    });
  });

  describe('with category', function() {
    beforeEach(async function() {
      element = await createFixture<PfV5LabelGroup>(html`
        <pf-v5-label-group>
          <span slot="category">Group</span>
          <pf-v5-label>Label 1</pf-v5-label>
          <pf-v5-label>Label 2</pf-v5-label>
        </pf-v5-label-group>
      `);
    });

    it('should display the category text', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.some(x => x.name === 'Group')).to.be.true;
    });
  });
});
