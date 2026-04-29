import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfV5Chip } from '../pf-v5-chip.js';
import { sendKeys } from '@web/test-runner-commands';

import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';


function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

function activeElement(element: HTMLElement) {
  return element.shadowRoot?.activeElement;
}

describe('<pf-v5-chip>', async function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v5-chip')).to.be.an.instanceof(PfV5Chip);
  });

  it('should upgrade', async function() {
    const klass = customElements.get('pf-v5-chip');
    expect(await createFixture<PfV5Chip>(html`<pf-v5-chip></pf-v5-chip>`))
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfV5Chip);
  });

  describe('simply instantiating', function() {
    let element: PfV5Chip;

    beforeEach(async function() {
      element = await createFixture<PfV5Chip>(html`
        <pf-v5-chip></pf-v5-chip>
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
      beforeEach(press('Tab'));
      it('should focus', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.at(0)?.name).to.equal(element.accessibleCloseLabel);
        expect(snapshot.children?.at(0)?.focused).to.be.true;
      });

      describe('pressing Enter', async function() {
        beforeEach(() => element.focus());
        beforeEach(press('Enter'));
        it('should close', function() {
          expect(document.querySelector('pf-v5-chip')).to.be.null;
        });
      });
    });
  });

  describe('with `overflow-chip` attribute', function() {
    let element: PfV5Chip;

    beforeEach(async function() {
      element = await createFixture<PfV5Chip>(html`
        <pf-v5-chip overflow-chip>Overflow</pf-v5-chip>
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
      beforeEach(press('Tab'));
      it('should focus', function() {
        expect(activeElement(element)).to.exist;
      });
    });

    describe('pressing Enter', function() {
      beforeEach(() => element.focus());
      beforeEach(press('Enter'));
      it('should NOT close', function() {
        expect(document.querySelector('pf-v5-chip')).to.not.be.null;
      });
    });

    describe('clicking element', function() {
      beforeEach(() => clickElementAtCenter(element));
      it('should NOT close', function() {
        expect(document.querySelector('pf-v5-chip')).to.not.be.null;
      });
    });
  });

  describe('readonly', async function() {
    let element: PfV5Chip;

    beforeEach(async function() {
      element = await createFixture<PfV5Chip>(html`
        <pf-v5-chip readonly></pf-v5-chip>
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
