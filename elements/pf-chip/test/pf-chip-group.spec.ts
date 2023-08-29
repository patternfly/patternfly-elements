import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfChipGroup } from '../pf-chip-group.js';
import { PfChip } from '../pf-chip.js';
import { sendKeys, sendMouse } from '@web/test-runner-commands';

let element: PfChipGroup;
let chip1: PfChip;
let chip2: PfChip;
let chip3: PfChip;
let chip4: PfChip;
let overflow: PfChip;
let close: HTMLButtonElement;
const chipHTML = html`
  <pf-chip id="chip1">Chip 1</pf-chip>
  <pf-chip id="chip2">Chip 2</pf-chip>
  <pf-chip id="chip3">Chip 3</pf-chip>
  <pf-chip id="chip4">Chip 4</pf-chip>`;

async function tab() {
  await sendKeys({ press: 'Tab' });
  await element.updateComplete;
}

async function arrowRight() {
  await sendKeys({ down: 'ArrowRight' });
  await element.updateComplete;
}

async function click(element: HTMLElement) {
  const { x, y, width, height } = element.getBoundingClientRect();
  const position = [x + width / 2, y + height / 2].map(Math.round) as [number, number];
  await sendMouse({ type: 'click', position });
}

function isVisible(chip: PfChip) {
  const comp = window.getComputedStyle(chip);
  const display = comp.getPropertyValue('display');
  return display !== 'none';
}

describe('<pf-chip-group>', async function() {
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

  describe('with 3 chips (default)', function() {
    const collapsedExp = 'show ${remaining} more';
    const collapsed = collapsedExp.replace('${remaining}', '1');
    const expanded = 'show fewer';
    const label = 'My Chip Group';

    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`
        <pf-chip-group collapsed-text="${collapsedExp}" expanded-text="${expanded}" label="${label}">
          ${chipHTML}
        </pf-chip-group>
      `);
      await element.updateComplete;
      chip1 = await document.getElementById('chip1') as PfChip;
      chip2 = await document.getElementById('chip2') as PfChip;
      chip3 = await document.getElementById('chip3') as PfChip;
      chip4 = await document.getElementById('chip4') as PfChip;
      overflow = await element?.shadowRoot?.querySelector('pf-chip[overflow-chip]') as PfChip;
    });

    it('chip 1 is visible', function() {
      expect(isVisible(chip1)).to.be.true;
    });
    it('chip 2 is visible', function() {
      expect(isVisible(chip2)).to.be.true;
    });
    it('chip 3 is visible', function() {
      expect(isVisible(chip3)).to.be.true;
    });
    it('chip 4 is not visible', function() {
      expect(isVisible(chip4)).to.be.false;
    });

    describe('should be accessible', function() {
      describe('should work with keyboard', function() {
        it('should focus when `Tab` is pressed', async function() {
          await tab();
          expect(document.activeElement).to.equal(chip1);
        });
        it('should move to chip2 when `ArrowRight` is pressed', async function() {
          chip1.focus();
          await chip1.updateComplete;
          await arrowRight();
          expect(document.activeElement).to.equal(chip2);
        });
      });
      it('has accesssible label', function() {
        const offscreen = element.shadowRoot?.querySelector('slot .offscreen')?.textContent?.trim();
        expect(offscreen).to.equal(label);
      });
      it('is accessible', async function() {
        await expect(element).to.be.accessible();
      });
    });

    describe('should have functional overflow chip', function() {
      it('has overflow chip', function() {
        expect(overflow).to.exist;
      });

      it('chip expanded-text is set', function() {
        expect(overflow?.textContent?.trim()).to.be.equal(collapsed);
      });

      it('shows all chips', async function() {
        await click(overflow);
        expect(isVisible(chip4)).to.be.true;
      });

      it('chip expanded-text is set', async function() {
        element.open = true;
        await element.updateComplete;
        expect(overflow?.textContent?.trim()).to.be.equal(expanded);
      });
    });

    describe('closing function', function() {
      it('has no close button by default', function() {
        close = element.shadowRoot?.querySelector(`[aria-label="${element.closeLabel}"]`) as HTMLButtonElement;
        expect(close).to.not.exist;
      });
      it('has close button when `closeable`', async function() {
        element.closeable = true;
        await element.updateComplete;
        close = element.shadowRoot?.querySelector(`[aria-label="${element.closeLabel}"]`) as HTMLButtonElement;
        expect(close).to.exist;
      });
      it('close button removes element', async function() {
        element.closeable = true;
        await element.updateComplete;
        close = element.shadowRoot?.querySelector(`[aria-label="${element.closeLabel}"]`) as HTMLButtonElement;
        await click(close as HTMLElement);
        expect(document.querySelector('pf-chip-group')).to.be.null;
      });
    });
  });

  describe('setting `num-chips` to 2', function() {
    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`<pf-chip-group num-chips="2">${chipHTML}</pf-chip-group>`);
      await element.updateComplete;
      chip1 = await document.getElementById('chip1') as PfChip;
      chip2 = await document.getElementById('chip2') as PfChip;
      chip3 = await document.getElementById('chip3') as PfChip;
      chip4 = await document.getElementById('chip4') as PfChip;
    });
    it('chip 1 is visible', function() {
      expect(isVisible(chip1)).to.be.true;
    });
    it('chip 2 is visible', function() {
      expect(isVisible(chip2)).to.be.true;
    });
    it('chip 3 is not visible', function() {
      expect(isVisible(chip3)).to.be.false;
    });
    it('chip 4 is not visible', function() {
      expect(isVisible(chip4)).to.be.false;
    });
  });

  describe('setting `num-chips` to 4', function() {
    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`<pf-chip-group num-chips="4">${chipHTML}</pf-chip-group>`);
      await element.updateComplete;
      chip1 = await document.getElementById('chip1') as PfChip;
      chip2 = await document.getElementById('chip2') as PfChip;
      chip3 = await document.getElementById('chip3') as PfChip;
      chip4 = await document.getElementById('chip4') as PfChip;
    });
    it('chip 1 is visible', function() {
      expect(isVisible(chip1)).to.be.true;
    });
    it('chip 2 is visible', function() {
      expect(isVisible(chip2)).to.be.true;
    });
    it('chip 3 is visible', function() {
      expect(isVisible(chip3)).to.be.true;
    });
    it('chip 4 is visible', function() {
      expect(isVisible(chip4)).to.be.true;
    });
  });
});
