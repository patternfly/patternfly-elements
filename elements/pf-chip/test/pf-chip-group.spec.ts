import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot, type A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfChipGroup } from '../pf-chip-group.js';
import { PfChip } from '../pf-chip.js';
import { sendKeys, sendMouse } from '@web/test-runner-commands';

async function press(element: PfChipGroup, key = 'Tab') {
  await sendKeys({ press: key });
  await element.updateComplete;
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

  describe('with `collapsed-text`, `expanded-text`, and `label` attributes', async function() {
    const collapsedExp = 'show ${remaining} more';
    const expanded = 'show fewer';
    const label = 'My Chip Group';
    let chip1: PfChip;
    let chip2: PfChip;
    let element: PfChipGroup;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`
        <pf-chip-group collapsed-text="${collapsedExp}" expanded-text="${expanded}" label="${label}">
          <pf-chip id="chip1">Chip 1</pf-chip>
          <pf-chip id="chip2">Chip 2</pf-chip>
          <pf-chip id="chip3">Chip 3</pf-chip>
          <pf-chip id="chip4">Chip 4</pf-chip>
        </pf-chip-group>
      `);
      await element.updateComplete;
      chip1 = await document.getElementById('chip1') as PfChip;
      chip2 = await document.getElementById('chip2') as PfChip;
      snapshot = await a11ySnapshot();
    });

    it('has accessible label', function() {
      const [offscreen] = snapshot.children;
      expect(offscreen?.name).to.equal(label);
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });

    describe('pressing `Tab`', function() {
      beforeEach(async function() {
        await press(element, 'Tab');
      });
      it('should focus', function() {
        expect(document.activeElement).to.equal(chip1);
      });
    });

    describe('pressing `ArrowRight`', function() {
      beforeEach(async function() {
        chip1.focus();
        await chip1.updateComplete;
        await press(element, 'ArrowRight');
      });
      it('should move to chip2', function() {
        expect(document.activeElement).to.equal(chip2);
      });
    });
  });

  describe('with 3 chips (default)', function() {
    const collapsedExp = 'show ${remaining} more';
    const collapsed = collapsedExp.replace('${remaining}', '1');
    const expanded = 'show fewer';
    const label = 'My Chip Group';
    let element: PfChipGroup;
    let overflow: PfChip;
    let close: HTMLButtonElement;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`
        <pf-chip-group collapsed-text="${collapsedExp}" expanded-text="${expanded}" label="${label}">
          <pf-chip id="chip1">Chip 1</pf-chip>
          <pf-chip id="chip2">Chip 2</pf-chip>
          <pf-chip id="chip3">Chip 3</pf-chip>
          <pf-chip id="chip4">Chip 4</pf-chip>
        </pf-chip-group>
      `);
      await element.updateComplete;
      snapshot = await a11ySnapshot();
    });

    it('only 3 chips and an overflow should be visible', function() {
      expect(snapshot.children).to.deep.equal([
        { role: 'text', name: 'My Chip Group' },
        { role: 'text', name: 'Chip 1' },
        { role: 'button', name: 'Close', description: 'Chip 1' },
        { role: 'text', name: 'Chip 2' },
        { role: 'button', name: 'Close', description: 'Chip 2' },
        { role: 'text', name: 'Chip 3' },
        { role: 'button', name: 'Close', description: 'Chip 3' },
        { role: 'button', name: 'show 1 more' }
      ]);
    });

    describe('overflow behavior', function() {
      describe('clicking overflow chip', function() {
        beforeEach(async function() {
          element.focus();
          await press(element, 'ArrowLeft');
          await press(element, 'Enter');
          snapshot = await a11ySnapshot();
        });
        it('should show all chips', function() {
          expect(snapshot.children).to.deep.equal( [
            { role: 'text', name: 'My Chip Group' },
            { role: 'text', name: 'Chip 1' },
            {
              role: 'button',
              name: 'Close',
              description: 'Chip 1'
            },
            { role: 'text', name: 'Chip 2' },
            { role: 'button', name: 'Close', description: 'Chip 2' },
            { role: 'text', name: 'Chip 3' },
            { role: 'button', name: 'Close', description: 'Chip 3' },
            { role: 'text', name: 'Chip 4' },
            { role: 'button', name: 'Close', description: 'Chip 4' },
            { role: 'button', name: 'show fewer', focused: true }
          ]);
        });
      });
    });

    describe('with `closeable` attribute', function() {
      beforeEach(async function() {
        element.closeable = true;
        await element.updateComplete;
        snapshot = await a11ySnapshot();
      });
      it('should have close button', function() {
        const button = snapshot.children[snapshot.children.length - 1];
        expect(button).to.deep.equal({ role: 'button', name: 'Close', description: 'My Chip Group' });
      });

      describe('clicking close button', function() {
        beforeEach(async function() {
          element.focus();
          await press(element, 'ArrowLeft');
          await press(element, 'Enter');
          snapshot = await a11ySnapshot();
        });
        it('should remove element', async function() {
          expect(snapshot.children).to.be.undefined;
        });
      });
    });
  });
  describe('setting `num-chips` to 2', function() {
    let element: PfChipGroup;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`
        <pf-chip-group num-chips="2">
          <pf-chip id="chip1">Chip 1</pf-chip>
          <pf-chip id="chip2">Chip 2</pf-chip>
          <pf-chip id="chip3">Chip 3</pf-chip>
          <pf-chip id="chip4">Chip 4</pf-chip>
        </pf-chip-group>
      `);
      await element.updateComplete;
      snapshot = await a11ySnapshot();
    });
    it('only 2 chips should be visible', function() {
      expect(snapshot.children).to.deep.equal([
        { role: 'text', name: 'Chip 1' },
        { role: 'button', name: 'Close', description: 'Chip 1' },
        { role: 'text', name: 'Chip 2' },
        { role: 'button', name: 'Close', description: 'Chip 2' },
        { role: 'button', name: '2 more' }
      ]);
    });
  });

  describe('setting `num-chips` to 4', function() {
    let element: PfChipGroup;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`
        <pf-chip-group num-chips="4">
          <pf-chip id="chip1">Chip 1</pf-chip>
          <pf-chip id="chip2">Chip 2</pf-chip>
          <pf-chip id="chip3">Chip 3</pf-chip>
          <pf-chip id="chip4">Chip 4</pf-chip>
        </pf-chip-group>
      `);
      await element.updateComplete;
      snapshot = await a11ySnapshot();
    });

    it('all 4 chips should be visible', function() {
      expect(snapshot.children).to.deep.equal([
        { role: 'text', name: 'Chip 1' },
        { role: 'button', name: 'Close', description: 'Chip 1' },
        { role: 'text', name: 'Chip 2' },
        { role: 'button', name: 'Close', description: 'Chip 2' },
        { role: 'text', name: 'Chip 3' },
        { role: 'button', name: 'Close', description: 'Chip 3' },
        { role: 'text', name: 'Chip 4' },
        { role: 'button', name: 'Close', description: 'Chip 4' }
      ]);
    });

    describe('setting focus on third chip and removing it', function() {
      beforeEach(async function() {
        element.focus();
        await press(element, 'ArrowRight');
        await press(element, 'ArrowRight');
        await press(element, 'Enter');
        snapshot = await a11ySnapshot();
      });

      it('should remove element and set focus on second chip', async function() {
        expect(snapshot.children).to.deep.equal([
          { role: 'text', name: 'Chip 1' },
          { role: 'button', name: 'Close', description: 'Chip 1' },
          { role: 'text', name: 'Chip 2' },
          { role: 'button', name: 'Close', description: 'Chip 2', focused: true },
          { role: 'text', name: 'Chip 4' },
          { role: 'button', name: 'Close', description: 'Chip 4' }
        ]);
      });
    });
  });
});
