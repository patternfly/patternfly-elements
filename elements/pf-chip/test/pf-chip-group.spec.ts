import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfChipGroup } from '@patternfly/elements/pf-chip/pf-chip-group.js';
import { sendKeys, sendMouse } from '@web/test-runner-commands';


async function tab() {
  await sendKeys({ press: 'Tab' });
}

async function arrowRight() {
  await sendKeys({ down: 'ArrowRight' });
}

async function enter() {
  await sendKeys({ press: 'Enter' });
}

async function click(element: HTMLElement) {
  const { x, y, width, height } = element.getBoundingClientRect();
  const position = [x + width / 2, y + height / 2].map(Math.round) as [number, number];
  await sendMouse({ type: 'click', position });
}

function isVisible(chip: HTMLElement) {
  const comp = window.getComputedStyle(chip);
  const display = comp.getPropertyValue('display');
  return display !== 'none';
}

describe('<pf-chip-group>', async function() {
  let element: PfChipGroup;
  let chip1: HTMLElement;
  let chip2: HTMLElement;
  let chip3: HTMLElement;
  let chip4: HTMLElement;
  let overflow: HTMLElement;
  const chipHTML = html`
    <pf-chip id="chip1">Chip 1</pf-chip>
    <pf-chip id="chip2">Chip 2</pf-chip>
    <pf-chip id="chip3">Chip 3</pf-chip>
    <pf-chip id="chip4">Chip 4</pf-chip>`;

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
    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`<pf-chip-group>${chipHTML}</pf-chip-group>`);
      chip1 = await document.getElementById('chip1') as HTMLElement;
      chip2 = await document.getElementById('chip2') as HTMLElement;
      chip3 = await document.getElementById('chip3') as HTMLElement;
      chip4 = await document.getElementById('chip4') as HTMLElement;
      overflow = await element?.shadowRoot?.querySelector('pf-chip[overflow-chip]') as HTMLElement;
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
        it('should focus when tab is pressed', async function() {
          await tab();
          await element.updateComplete;
        });
      });
      it('is accessible', async function() {
        await expect(element).to.be.accessible();
      });
    });

    describe('should have functional overflow chip', function() {
      it('has overflow chip', function() {
        expect(overflow).to.exist;
      });

      it('shows all chips', async function() {
        await click(overflow);
        expect(isVisible(chip4)).to.be.true;
      });
    });
  });

  describe('setting `num-chips` to 2', function() {
    beforeEach(async function() {
      element = await createFixture<PfChipGroup>(html`<pf-chip-group num-chips="2">${chipHTML}</pf-chip-group>`);
      chip1 = await document.getElementById('chip1') as HTMLElement;
      chip2 = await document.getElementById('chip2') as HTMLElement;
      chip3 = await document.getElementById('chip3') as HTMLElement;
      chip4 = await document.getElementById('chip4') as HTMLElement;
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
      chip1 = await document.getElementById('chip1') as HTMLElement;
      chip2 = await document.getElementById('chip2') as HTMLElement;
      chip3 = await document.getElementById('chip3') as HTMLElement;
      chip4 = await document.getElementById('chip4') as HTMLElement;
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
