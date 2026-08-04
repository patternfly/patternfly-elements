import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { sendKeys } from '@web/test-runner-commands';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';

import { PfV6Button } from '@patternfly/elements/pf-v6-button/pf-v6-button.js';

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

describe('<pf-v6-button>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-button')).to.be.an.instanceof(PfV6Button);
  });

  it('should upgrade', async function() {
    const el = await createFixture(html`<pf-v6-button>Button</pf-v6-button>`);
    expect(el, 'pf-v6-button should be an instance of PfV6Button')
        .to.be.an.instanceof(customElements.get('pf-v6-button'))
        .and
        .to.be.an.instanceof(PfV6Button);
  });

  describe('simply instantiating', function() {
    let element: PfV6Button;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button>Save</pf-v6-button>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
    });

    it('has button role', function() {
      expect(snapshot.role).to.equal('button');
    });

    it('exposes its label', function() {
      expect(snapshot.name).to.equal('Save');
    });

    it('defaults to the primary variant', function() {
      expect(element.variant).to.equal('primary');
    });
  });

  describe('with accessible-label', function() {
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      await createFixture<PfV6Button>(html`
        <pf-v6-button variant="plain" accessible-label="Close"></pf-v6-button>
      `);
      snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
    });

    it('uses accessible-label as the accessible name', function() {
      expect(snapshot.name).to.equal('Close');
    });
  });

  describe('disabled', function() {
    let element: PfV6Button;
    let clicks: number;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      clicks = 0;
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button disabled>Disabled</pf-v6-button>
      `);
      element.addEventListener('click', function() {
        clicks += 1;
      });
      snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
    });

    it('matches :disabled', function() {
      expect(element.matches(':disabled')).to.be.true;
    });

    it('reflects disabled in the accessibility tree', function() {
      expect(snapshot.disabled).to.be.true;
    });

    it('does not fire click handlers when activated', async function() {
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(clicks).to.equal(0);
    });
  });

  describe('disabled-focusable', function() {
    let element: PfV6Button;
    let clicks: number;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      clicks = 0;
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button disabled-focusable>Disabled focusable</pf-v6-button>
      `);
      element.addEventListener('click', function() {
        clicks += 1;
      });
      snapshot = await a11ySnapshot({ selector: 'pf-v6-button' });
    });

    it('remains in the accessibility tree as a button', function() {
      expect(snapshot.role).to.equal('button');
    });

    it('does not fire click handlers when activated', async function() {
      element.focus();
      await sendKeys({ press: 'Enter' });
      expect(clicks).to.equal(0);
    });
  });

  describe('variants', function() {
    for (const variant of [
      'primary',
      'secondary',
      'tertiary',
      'danger',
      'warning',
      'link',
      'plain',
      'control',
      'stateful',
    ] as const) {
      it(`accepts the ${variant} variant`, async function() {
        const element = await createFixture<PfV6Button>(html`
          <pf-v6-button variant="${variant}" accessible-label="${variant}"></pf-v6-button>
        `);
        expect(element.variant).to.equal(variant);
      });
    }
  });

  describe('loading', function() {
    let element: PfV6Button;

    beforeEach(async function() {
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button loading loading-label="Saving">Loading</pf-v6-button>
      `);
    });

    it('reflects the loading attribute', function() {
      expect(element.hasAttribute('loading')).to.be.true;
    });

    it('exposes loading-label', function() {
      expect(element.loadingLabel).to.equal('Saving');
    });
  });

  describe('link with href', function() {
    let element: PfV6Button;

    beforeEach(async function() {
      element = await createFixture<PfV6Button>(html`
        <pf-v6-button variant="link" href="#destination">Docs</pf-v6-button>
      `);
    });

    it('exposes href for link buttons', function() {
      expect(element.href).to.equal('#destination');
      expect(element.variant).to.equal('link');
    });
  });

  describe('form association', function() {
    let form: HTMLFormElement;
    let element: PfV6Button;
    let submitData: FormData | null;

    beforeEach(async function() {
      submitData = null;
      form = await createFixture(html`
        <form>
          <pf-v6-button type="submit" name="save" value="yes">Save</pf-v6-button>
        </form>
      `);
      element = form.querySelector('pf-v6-button')!;
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitData = new FormData(form);
      });
      await element.updateComplete;
    });

    it('submits name and value', async function() {
      await clickElementAtCenter(element);
      expect(submitData).to.be.ok;
      expect(submitData!.get('save')).to.equal('yes');
    });
  });

  describe('in a fieldset', function() {
    let element: PfV6Button;
    let fieldset: HTMLFieldSetElement;
    let form: HTMLFormElement;
    let submitEvent: SubmitEvent;

    beforeEach(async function() {
      form = await createFixture(html`
        <form>
          <input id="pre">
          <fieldset>
            <pf-v6-button>OK</pf-v6-button>
          </fieldset>
          <input id="post">
        </form>
      `);
      fieldset = form.querySelector('fieldset')!;
      element = form.querySelector('pf-v6-button')!;
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
      beforeEach(async function() {
        await clickElementAtCenter(element);
      });
      it('submits the form', function() {
        expect(submitEvent).to.be.ok;
      });
    });

    describe('tabbing through', function() {
      beforeEach(press('Tab'));
      it('does focus the button', function() {
        expect(document.activeElement).to.be.an.instanceof(PfV6Button);
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
          expect(document.activeElement).to.not.be.an.instanceof(PfV6Button);
        });
      });
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
                expect(document.activeElement).to.be.an.instanceof(PfV6Button);
              });
            });
          });
        });
      });
    });
  });
});
