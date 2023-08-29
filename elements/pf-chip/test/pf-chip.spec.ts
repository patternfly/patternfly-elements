import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfChip } from '@patternfly/elements/pf-chip/pf-chip.js';
import { sendKeys, sendMouse } from '@web/test-runner-commands';


async function tab() {
  await sendKeys({ press: 'Tab' });
}

async function enter() {
  await sendKeys({ press: 'Enter' });
}

async function click(element: HTMLElement) {
  const { x, y, width, height } = element.getBoundingClientRect();
  const position = [x + width / 2, y + height / 2].map(Math.round) as [number, number];
  await sendMouse({ type: 'click', position });
}

function activeElement(element: HTMLElement) {
  return element.shadowRoot?.activeElement;
}

describe('<pf-chip>', async function() {
  describe('simply instantiating', function() {
    let element: PfChip;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-chip')).to.be.an.instanceof(PfChip);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfChip>(html`<pf-chip></pf-chip>`);
      const klass = customElements.get('pf-chip');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfChip);
    });
  });

  it('should be accessible', async function() {
    const element = await createFixture<PfChip>(html`<pf-chip></pf-chip>`);
    await expect(element).to.be.accessible();
  });

  describe('default behavior', function() {
    let element: PfChip;
    let button: HTMLButtonElement;

    beforeEach(async function() {
      element = await createFixture<PfChip>(html`<pf-chip></pf-chip>`);
      button = await element.shadowRoot?.querySelector('button') as HTMLButtonElement;
    });

    it('should focus programatically', async function() {
      element.focus();
      await expect(activeElement(element)?.getAttribute('aria-label')).to.equal(element.closeLabel);
    });

    it('should close using mouse', async function() {
      await click(button);
      expect(document.querySelector('pf-chip')).to.be.null;
    });

    describe('should work with a keyboard', function() {
      it('focuses using `Tab` key', async function() {
        await tab();
        await expect(activeElement(element)?.getAttribute('aria-label')).to.equal(element.closeLabel);

        describe('should close using `Enter` key', async function() {
          it('closes', async function() {
            await element.focus();
            await enter();
            expect(document.querySelector('pf-chip')).to.be.null;
          });
        });
      });
    });
  });

  describe('overflow-chip', function() {
    let element: PfChip;
    let button: HTMLButtonElement;

    beforeEach(async function() {
      element = await createFixture<PfChip>(html`<pf-chip overflow-chip>Overflow</pf-chip>`);
      button = await element.shadowRoot?.querySelector('button') as HTMLButtonElement;
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });

    it('should not have a close button', async function() {
      await expect(button?.ariaLabel).to.not.equal(element.closeLabel);
    });

    it('should focus programatically', async function() {
      element.focus();
      await expect(activeElement(element)).to.exist;
    });

    it('should focus using tab key', async function() {
      await tab();
      await expect(activeElement(element)).to.exist;
    });

    it('should NOT close using `Enter` key', async function() {
      element.focus();
      await enter();
      expect(document.querySelector('pf-chip')).to.not.be.null;
    });

    it('should NOT close using mouse', async function() {
      await click(element);
      expect(document.querySelector('pf-chip')).to.not.be.null;
    });
  });

  describe('read-only', async function() {
    let element: PfChip;
    let button: HTMLButtonElement;

    beforeEach(async function() {
      element = await createFixture<PfChip>(html`<pf-chip read-only></pf-chip>`);
      button = await element.shadowRoot?.querySelector('button') as HTMLButtonElement;
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
    it('should not have a button', async function() {
      await expect(button).to.be.null;
    });
  });

  describe('overflow-hidden', async function() {
    let element: PfChip;
    let button: HTMLButtonElement;

    beforeEach(async function() {
      element = await createFixture<PfChip>(html`<pf-chip overflow-hidden></pf-chip>`);
      button = await element.shadowRoot?.querySelector('button') as HTMLButtonElement;
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
    it('should not have a button', async function() {
      await expect(button).to.be.null;
    });
  });
});
