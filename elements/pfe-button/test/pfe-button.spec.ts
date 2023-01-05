import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfeButton } from '@patternfly/pfe-button';
import { sendKeys } from '@web/test-runner-commands';

import '@patternfly/pfe-tools/test/stub-logger.js';

describe('<pfe-button>', function() {
  it('should upgrade', async function() {
    const el = await createFixture(html`<pfe-button>Button</pfe-button>`);
    expect(el, 'pfe-button should be an instance of PfeButton')
      .to.be.an.instanceOf(customElements.get('pfe-button'))
      .and
      .to.be.an.instanceOf(PfeButton);
  });
  describe('in a fieldset', function() {
    let element: PfeButton;
    let fieldset: HTMLFieldSetElement;
    let form: HTMLFormElement;

    beforeEach(async function() {
      form = await createFixture(html`
        <form>
          <input id="pre">
          <fieldset>
            <pfe-button>OK</pfe-button>
          </fieldset>
          <input id="post">
        </form>
      `);
      fieldset = form.querySelector('fieldset')!;
      element = form.querySelector('pfe-button')!;
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
          .be.an.instanceof(PfeButton);
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
            .be.an.instanceof(PfeButton);
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
                  .be.an.instanceof(PfeButton);
              });
            });
          });
        });
      });
    });
  });
});
