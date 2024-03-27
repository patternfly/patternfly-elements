import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';

import { PfTextArea } from '@patternfly/elements/pf-text-area/pf-text-area.js';

describe('<pf-text-area>', function() {
  describe('simply instantiating', function() {
    let element: PfTextArea;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-text-area')).to.be.an.instanceof(PfTextArea);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfTextArea>(html`<pf-text-area></pf-text-area>`);
      const klass = customElements.get('pf-text-area');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfTextArea);
    });
  });

  describe('in a fieldset', function() {
    let element: PfTextArea;
    let fieldset: HTMLFieldSetElement;
    let form: HTMLFormElement;

    beforeEach(async function() {
      form = await createFixture(html`
        <form>
          <input id="pre">
          <fieldset>
            <pf-text-area></pf-text-area>
          </fieldset>
          <input id="post">
        </form>
      `);
      fieldset = form.querySelector('fieldset')!;
      element = form.querySelector('pf-text-area')!;
      form.querySelector('input')?.focus();
      await element.updateComplete;
    });

    describe('disabling the fieldset', function() {
      beforeEach(async function() {
        fieldset.disabled = true;
        await element.updateComplete;
      });

      it('disables the text area', function() {
        expect(element.matches(':disabled'), 'matches :disabled').to.be.true;
      });

      describe('tabbing through', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'Tab' });
        });
        it('does not focus the text-area', function() {
          expect(document.activeElement)
            .to
            .not
            .be.an.instanceof(PfTextArea);
        });
      });

      describe('then disabling the text-area', function() {
        beforeEach(async function() {
          element.disabled = true;
          await element.updateComplete;
        });
        describe('then enabling the tex-area', function() {
          beforeEach(async function() {
            element.disabled = false;
            await element.updateComplete;
          });
          describe('then enabling the fieldset', function() {
            beforeEach(async function() {
              fieldset.disabled = false;
              await element.updateComplete;
            });
            describe('tabbing through', function() {
              beforeEach(async function() {
                await sendKeys({ press: 'Tab' });
              });
              it('does focus the button', function() {
                expect(document.activeElement)
                  .to
                  .be.an.instanceof(PfTextArea);
              });
            });
          });
        });
      });
    });
  });
});
