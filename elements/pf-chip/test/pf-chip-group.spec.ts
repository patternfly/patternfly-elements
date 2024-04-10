import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot, type A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfChipGroup } from '../pf-chip-group.js';
import { PfChip } from '../pf-chip.js';
import { sendKeys } from '@web/test-runner-commands';

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

describe('<pf-chip-group>', async function() {
  let element: PfChipGroup;

  describe('simply instantiating', function() {
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-chip-group')).to.be.an.instanceof(PfChipGroup);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfChipGroup>(html`<pf-chip-group></pf-chip-group>`);
      const klass = customElements.get('pf-chip-group');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfChipGroup);
    });
  });

  describe('with 3 chips', function() {
    let element: PfChipGroup;
    const updateComplete = () => element.updateComplete;

    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`
        <pf-chip-group>
          <pf-chip>Chip 1</pf-chip>
          <pf-chip>Chip 2</pf-chip>
          <pf-chip>Chip 3</pf-chip>
          <pf-chip>Chip 4</pf-chip>
        </pf-chip-group>
      `);
    });

    it('only 3 chips and an overflow should be visible', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.filter(x => x.name.startsWith('Chip'))?.length).to.equal(3);
      expect(snapshot.children?.filter(x => x.role === 'button')?.length).to.equal(4);
    });

    describe('clicking overflow chip', function() {
      beforeEach(() => element.focus());
      beforeEach(press('ArrowLeft'));
      beforeEach(press('Enter'));
      beforeEach(updateComplete);
      it('should show all chips', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.filter(x => x.name.startsWith('Chip'))?.length).to.equal(4);
      });
      it('should show collapse button', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.filter(x => x.role === 'button')?.length).to.equal(5);
      });
      it('should focus collapse button', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.find(x => x.focused)?.name).to.equal('show less');
      });
    });
  });

  describe('with 4 chips and `closeable` attribute', function() {
    let element: PfChipGroup;
    const updateComplete = () => element.updateComplete;
    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`
        <pf-chip-group closeable>
          <pf-chip>Chip 1</pf-chip>
          <pf-chip>Chip 2</pf-chip>
          <pf-chip>Chip 3</pf-chip>
          <pf-chip>Chip 4</pf-chip>
        </pf-chip-group>
      `);
    });

    beforeEach(updateComplete);
    it('should have close button', async function() {
      const snapshot = await a11ySnapshot();
      const last = snapshot.children?.at(-1);
      expect(last?.name).to.equal('Close');
      expect(last?.role).to.equal('button');
      expect(last?.description).to.not.be.ok;
    });

    describe('clicking close button', function() {
      beforeEach(() => element.focus());
      beforeEach(press('ArrowLeft'));
      beforeEach(press('Enter'));
      beforeEach(updateComplete);
      it('should remove element', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children).to.be.undefined;
      });
    });
  });

  describe('with 4 chips and `collapsed-text`, `expanded-text`, and `label` attributes', async function() {
    let chip1: PfChip;
    let chip2: PfChip;
    let element: PfChipGroup;
    let snapshot: A11yTreeSnapshot;
    const updateComplete = () => element.updateComplete;

    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`
        <pf-chip-group collapsed-text="show $\{remaining} more"
                       expanded-text="show fewer"
                       accessible-label="My Chip Group">
          <pf-chip>Chip 1</pf-chip>
          <pf-chip>Chip 2</pf-chip>
          <pf-chip>Chip 3</pf-chip>
          <pf-chip>Chip 4</pf-chip>
        </pf-chip-group>
      `);
      [chip1, chip2] = document.querySelectorAll('pf-chip');
      snapshot = await a11ySnapshot();
    });

    it('has accessible label', function() {
      const [offscreen] = snapshot.children!;
      expect(offscreen?.name).to.equal('My Chip Group');
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });

    describe('pressing `Tab`', function() {
      beforeEach(press('Tab'));
      beforeEach(updateComplete);
      it('should focus', function() {
        expect(document.activeElement).to.equal(chip1);
      });
    });

    describe('pressing `ArrowRight`', function() {
      beforeEach(() => chip1.focus());
      beforeEach(press('ArrowRight'));
      beforeEach(updateComplete);
      it('should move to chip2', function() {
        expect(document.activeElement).to.equal(chip2);
      });
    });
  });

  describe('with 4 chips and `num-chips="2"` attribute', function() {
    beforeEach(async function() {
      await createFixture<PfChipGroup>(html`
        <pf-chip-group num-chips="2">
          <pf-chip>Chip 1</pf-chip>
          <pf-chip>Chip 2</pf-chip>
          <pf-chip>Chip 3</pf-chip>
          <pf-chip>Chip 4</pf-chip>
        </pf-chip-group>
      `);
    });
    it('only 2 chips should be visible', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.filter(x => x.name.startsWith('Chip'))?.length).to.equal(2);
    });
  });

  describe('with 4 chips and `num-chips="4"` attribute', function() {
    let element: PfChipGroup;
    const updateComplete = () => element.updateComplete;

    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`
        <pf-chip-group num-chips="4">
          <pf-chip>Chip 1</pf-chip>
          <pf-chip>Chip 2</pf-chip>
          <pf-chip>Chip 3</pf-chip>
          <pf-chip>Chip 4</pf-chip>
        </pf-chip-group>
      `);
    });

    it('all 4 chips should be visible', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.filter(x => x.name.startsWith('Chip'))?.length).to.equal(4);
    });

    describe('keyboard navigating with arrow keys to third chip and pressing enter', function() {
      beforeEach(press('Tab'));
      beforeEach(press('ArrowRight'));
      beforeEach(press('ArrowRight'));
      beforeEach(press('Enter'));
      beforeEach(updateComplete);

      it('should remove third chip', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.find(x => x.name === 'Chip 3')).to.not.be.ok;
      });

      it('should focus on close button', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.find(x => x.focused)?.name).to.equal('Close');
      });
    });
  });
});
