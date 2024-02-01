import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfChip } from '../pf-chip.js';
import { sendKeys } from '@web/test-runner-commands';

import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';


async function tab() {
  await sendKeys({ press: 'Tab' });
}

async function enter() {
  await sendKeys({ press: 'Enter' });
}

function activeElement(element: HTMLElement) {
  return element.shadowRoot?.activeElement;
}

describe('<pf-chip>', async function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-chip')).to.be.an.instanceof(PfChip);
  });

  it('should upgrade', async function() {
    const klass = customElements.get('pf-chip');
    expect(await createFixture<PfChip>(html`<pf-chip></pf-chip>`))
      .to.be.an.instanceOf(klass)
      .and
      .to.be.an.instanceOf(PfChip);
  });

  describe('simply instantiating', function() {
    let element: PfChip;

    beforeEach(async function() {
      element = await createFixture<PfChip>(html`
        <pf-chip></pf-chip>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });

    describe('calling focus() on the element', function() {
      beforeEach(() => element.focus());
      it('should focus', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.at(0)?.name).to.equal(element.accessibleCloseLabel);
        expect(snapshot.children?.at(0)?.focused).to.be.true;
      });
    });

    describe('pressing Tab', function() {
      beforeEach(tab);
      it('should focus', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.at(0)?.name).to.equal(element.accessibleCloseLabel);
        expect(snapshot.children?.at(0)?.focused).to.be.true;
      });

      describe('pressing Enter', async function() {
        beforeEach(() => element.focus());
        beforeEach(enter);
        it('should close', function() {
          expect(document.querySelector('pf-chip')).to.be.null;
        });
      });
    });
  });

  describe('with `overflow-chip` attribute', function() {
    let element: PfChip;

    beforeEach(async function() {
      element = await createFixture<PfChip>(html`
        <pf-chip overflow-chip>Overflow</pf-chip>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });

    it('should not have a close button', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children?.find(x => x.name === 'Close')).to.not.be.ok;
    });

    describe('calling focus', function() {
      beforeEach(() => element.focus());
      it('should focus', function() {
        expect(activeElement(element)).to.exist;
      });
    });

    describe('pressing Tab', function() {
      beforeEach(tab);
      it('should focus', function() {
        expect(activeElement(element)).to.exist;
      });
    });

    describe('pressing Enter', function() {
      beforeEach(() => element.focus());
      beforeEach(enter);
      it('should NOT close', function() {
        expect(document.querySelector('pf-chip')).to.not.be.null;
      });
    });

    describe('clicking element', function() {
      beforeEach(() => clickElementAtCenter(element));
      it('should NOT close', function() {
        expect(document.querySelector('pf-chip')).to.not.be.null;
      });
    });
  });

  describe('readonly', async function() {
    let element: PfChip;

    beforeEach(async function() {
      element = await createFixture<PfChip>(html`
        <pf-chip readonly></pf-chip>
      `);
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });

    it('should not have a button', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot.children).to.be.undefined;
    });
  });
});
