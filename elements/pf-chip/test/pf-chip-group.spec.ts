import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot, type A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { PfChipGroup } from '../pf-chip-group.js';
import { PfChip } from '../pf-chip.js';
import { sendKeys, sendMouse } from '@web/test-runner-commands';

async function tab(element: PfChipGroup) {
  await sendKeys({ press: 'Tab' });
  await element.updateComplete;
}

async function arrowRight(element: PfChipGroup) {
  await sendKeys({ down: 'ArrowRight' });
  await element.updateComplete;
}

async function click(element: HTMLElement) {
  const { x, y, width, height } = element.getBoundingClientRect();
  const position = [x + width / 2, y + height / 2].map(Math.round) as [number, number];
  await sendMouse({ type: 'click', position });
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

  describe('checking accessibilty', async function() {
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

    describe('pressing `Tab`', function() {
      beforeEach(async function() {
        await tab(element);
      });
      it('should focus', function() {
        expect(document.activeElement).to.equal(chip1);
      });
    });

    describe('pressing `ArrowRight`', function() {
      beforeEach(async function() {
        chip1.focus();
        await chip1.updateComplete;
        await arrowRight(element);
      });
      it('should move to chip2', function() {
        expect(document.activeElement).to.equal(chip2);
      });
    });

    it('has accessible label', function() {
      const [offscreen] = snapshot.children;
      expect(offscreen?.name).to.equal(label);
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
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
      overflow = await element?.shadowRoot?.querySelector('pf-chip[overflow-chip]') as PfChip;
      snapshot = await a11ySnapshot();
    });

    it('only 3 chips should be visible', function() {
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
      it('should have overflow chip', function() {
        expect(overflow).to.exist;
      });

      it('should have chip expanded-text', function() {
        expect(overflow?.textContent?.trim()).to.be.equal(collapsed);
      });

      describe('clicking overflow chip', function() {
        beforeEach(async function() {
          await click(overflow);
          snapshot = await a11ySnapshot();
        });
        it('should show all chips', function() {
          expect(snapshot.children).to.deep.equal( [
            { role: 'text', name: 'My Chip Group' },
            { role: 'text', name: 'Chip 1' },
            {
              role: 'button',
              name: 'Close',
              description: 'Chip 1',
              focused: true
            },
            { role: 'text', name: 'Chip 2' },
            { role: 'button', name: 'Close', description: 'Chip 2' },
            { role: 'text', name: 'Chip 3' },
            { role: 'button', name: 'Close', description: 'Chip 3' },
            { role: 'text', name: 'Chip 4' },
            { role: 'button', name: 'Close', description: 'Chip 4' },
            { role: 'button', name: 'show fewer' }
          ]);
        });
      });

      describe('opening element programatically', function() {
        beforeEach(async function() {
          element.open = true;
          await element.updateComplete;
        });
        it('should have chip expanded-text', function() {
          expect(overflow?.textContent?.trim()).to.be.equal(expanded);
        });
      });
    });

    describe('closing behavior', function() {
      it('should have no close button by default', function() {
        close = element.shadowRoot?.querySelector(`[aria-label="${element.accessibleCloseLabel}"]`) as HTMLButtonElement;
        expect(close).to.not.exist;
      });

      describe('setting closeable to `true`', function() {
        beforeEach(async function() {
          element.closeable = true;
          await element.updateComplete;
          close = element.shadowRoot?.querySelector(`[aria-label="${element.accessibleCloseLabel}"]`) as HTMLButtonElement;
        });
        it('should have close button', function() {
          expect(close).to.exist;
        });

        describe('clicking close button', function() {
          beforeEach(async function() {
            await click(close as HTMLElement);
          });
          it('should remove element', async function() {
            expect(document.querySelector('pf-chip-group')).to.be.null;
          });
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
  });
});
