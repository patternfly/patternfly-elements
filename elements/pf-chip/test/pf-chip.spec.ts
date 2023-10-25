import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfChip } from '../pf-chip.js';
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

    describe('focusing programatically', function() {
      let active: string | null | undefined;
      beforeEach(async function() {
        element.focus();
        active = await activeElement(element)?.getAttribute('aria-label');
      });
      it('should focus', function() {
        expect(active).to.equal(element.accessibleCloseLabel);
      });
    });

    describe('clicking close button', function() {
      beforeEach(async function() {
        await click(button);
      });
      it('should close', function() {
        expect(document.querySelector('pf-chip')).to.be.null;
      });
    });

    describe('pressing `Tab` key', function() {
      let active: string | null | undefined;
      beforeEach(async function() {
        await tab();
        active = await activeElement(element)?.getAttribute('aria-label');
      });
      it('should focus', function() {
        expect(active).to.equal(element.accessibleCloseLabel);

        describe('pressing `Enter` key', async function() {
          beforeEach(async function() {
            await element.focus();
            await enter();
          });
          it('should close', function() {
            expect(document.querySelector('pf-chip')).to.be.null;
          });
        });
      });
    });
  });

  describe('with `overflow-chip` attribute', function() {
    let element: PfChip;
    let button: HTMLButtonElement;

    beforeEach(async function() {
      element = await createFixture<PfChip>(html`<pf-chip overflow-chip>Overflow</pf-chip>`);
      button = await element.shadowRoot?.querySelector('button') as HTMLButtonElement;
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });

    it('should not have a close button', function() {
      expect(button?.ariaLabel).to.not.equal(element.accessibleCloseLabel);
    });

    describe('focusing programatically', function() {
      beforeEach(async function() {
        element.focus();
      });
      it('should focus', function() {
        expect(activeElement(element)).to.exist;
      });
    });

    describe('pressing `Tab` key', function() {
      beforeEach(async function() {
        await tab();
      });
      it('should focus', function() {
        expect(activeElement(element)).to.exist;
      });
    });

    describe('pressing `Enter` key', function() {
      beforeEach(async function() {
        element.focus();
        await enter();
      });
      it('should NOT close', function() {
        expect(document.querySelector('pf-chip')).to.not.be.null;
      });
    });

    describe('clicking element', function() {
      beforeEach(async function() {
        await click(element);
      });
      it('should NOT close', function() {
        expect(document.querySelector('pf-chip')).to.not.be.null;
      });
    });
  });

  describe('with `read-only` attribute', async function() {
    let element: PfChip;
    let button: HTMLButtonElement;

    beforeEach(async function() {
      element = await createFixture<PfChip>(html`<pf-chip readonly></pf-chip>`);
      button = await element.shadowRoot?.querySelector('button') as HTMLButtonElement;
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });
    it('should not have a button', function() {
      expect(button).to.be.null;
    });
  });
});
