import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';

import { PfV5TextArea } from '@patternfly/elements/pf-v5-text-area/pf-v5-text-area.js';

describe('<pf-v5-text-area>', function() {
  describe('simply instantiating', function() {
    let element: PfV5TextArea;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-v5-text-area')).to.be.an.instanceof(PfV5TextArea);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfV5TextArea>(html`<pf-v5-text-area></pf-v5-text-area>`);
      const klass = customElements.get('pf-v5-text-area');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV5TextArea);
    });
  });

  describe('in a fieldset', function() {
    let element: PfV5TextArea;
    let fieldset: HTMLFieldSetElement;
    let form: HTMLFormElement;

    beforeEach(async function() {
      form = await createFixture(html`
        <form>
          <input id="pre">
          <fieldset>
            <pf-v5-text-area></pf-v5-text-area>
          </fieldset>
          <input id="post">
        </form>
      `);
      fieldset = form.querySelector('fieldset')!;
      element = form.querySelector('pf-v5-text-area')!;
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
              .be.an.instanceof(PfV5TextArea);
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
                    .be.an.instanceof(PfV5TextArea);
              });
            });
          });
        });
      });
    });
  });
});
