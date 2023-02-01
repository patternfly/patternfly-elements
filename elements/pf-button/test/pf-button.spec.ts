import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';

import { PfButton } from '@patternfly/elements/pf-button/pf-button.js';

import '@patternfly/pfe-tools/test/stub-logger.js';

describe('<pf-button>', function() {
  it('should upgrade', async function() {
    const el = await createFixture(html`<pf-button>Button</pf-button>`);
    expect(el, 'pf-button should be an instance of PfButton')
      .to.be.an.instanceOf(customElements.get('pf-button'))
      .and
      .to.be.an.instanceOf(PfButton);
  });
  describe('in a fieldset', function() {
    let element: PfButton;
    let fieldset: HTMLFieldSetElement;
    let form: HTMLFormElement;

    beforeEach(async function() {
      form = await createFixture(html`
        <form>
          <input id="pre">
          <fieldset>
            <pf-button>OK</pf-button>
          </fieldset>
          <input id="post">
        </form>
      `);
      fieldset = form.querySelector('fieldset')!;
      element = form.querySelector('pf-button')!;
      form.querySelector('input')?.focus();
      await element.updateComplete;
    });

    describe('tabbing through', function() {
      beforeEach(async function() {
        await sendKeys({ press: 'Tab' });
      });
      it('does focus the button', function() {
        expect(document.activeElement)
          .to
          .be.an.instanceof(PfButton);
      });
    });

    describe('disabling the fieldset', function() {
      beforeEach(async function() {
        fieldset.disabled = true;
        await element.updateComplete;
      });
      it('disables the button', function() {
        expect(element.matches(':disabled'), 'matches :disabled').to.be.true;
      });
      describe('tabbing through', function() {
        beforeEach(async function() {
          await sendKeys({ press: 'Tab' });
        });
        it('does not focus the button', function() {
          expect(document.activeElement)
            .to
            .not
            .be.an.instanceof(PfButton);
        });
      });
      // this was a regression spotted by @brianferry
      describe('then disabling the button', function() {
        beforeEach(async function() {
          element.disabled = true;
          await element.updateComplete;
        });
        describe('then enabling the button', function() {
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
                  .be.an.instanceof(PfButton);
              });
            });
          });
        });
      });
    });
  });
});
