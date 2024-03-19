import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';

import { PfButton } from '@patternfly/elements/pf-button/pf-button.js';

import '@patternfly/pfe-tools/test/stub-logger.js';

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

describe('<pf-button>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-button')).to.be.an.instanceof(PfButton);
  });

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
    let submitEvent: SubmitEvent;

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
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitEvent = event;
      });
      await element.updateComplete;
    });

    afterEach(function() {
      // @ts-expect-error: resetting fixture
      submitEvent = undefined;
    });

    describe('clicking the button', function() {
      beforeEach(() => clickElementAtCenter(element));
      it('submits the form', function() {
        expect(submitEvent).to.be.ok;
      });
    });

    describe('tabbing through', function() {
      beforeEach(press('Tab'));
      it('does focus the button', function() {
        expect(document.activeElement)
          .to
          .be.an.instanceof(PfButton);
      });

      describe('pressing Space', function() {
        beforeEach(press(' '));
        it('submits the form', function() {
          expect(submitEvent).to.be.ok;
        });
      });

      describe('pressing Enter', function() {
        beforeEach(press('Enter'));
        it('submits the form', function() {
          expect(submitEvent).to.be.ok;
        });
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
        beforeEach(press('Tab'));
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
              beforeEach(press('Tab'));
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
