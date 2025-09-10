
import { expect, html, oneEvent, fixture } from '@open-wc/testing';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';
import { PfAlert } from '../pf-alert.js';
// import { tokens } from '@patternfly/elements/pf-tokens'; // טוקנים של PF
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';

describe('<pf-alert>', function() {
  let element: PfAlert;
  let dismissableElement: PfAlert;

  beforeEach(async function() {
    element = await fixture<PfAlert>(html`
      <pf-alert state="default">
       <h3 slot="header">Default</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend elit sed est
          egestas, a sollicitudin mauris tincidunt.</p>
        <button slot="actions" data-action="dismiss">Dismiss</button>
        <button slot="actions" data-action="confirm">Confirm</button>
      </pf-alert>
    `);
    dismissableElement = await fixture<PfAlert>(html`
      <pf-alert dismissable>
        <h3 slot="header">Default dismissable</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eleifend elit sed est
          egestas, a sollicitudin mauris tincidunt.</p>
        <button slot="actions" data-action="dismiss">Dismiss</button>
        <button slot="actions" data-action="confirm">Confirm</button>
      </pf-alert>
    `);
  });

  it('should upgrade', async function() {
    const klass = customElements.get('pf-alert');
    expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfAlert);
  });

  describe('dismissable <pf-alert>', async () => {
    let elementCloseButton: HTMLButtonElement | undefined | null;

    beforeEach(async function() {
      elementCloseButton = dismissableElement.shadowRoot?.querySelector('#close-button');
    });

    it('should only show the close button if the dismissable attribute is present', () => {
      expect(element.shadowRoot?.querySelector('#close-button')).to.be.null;
      expect(elementCloseButton).not.to.be.undefined;
    });

    it('should send a close event on dismissable close button click', async () => {
      const elementCloseButton = dismissableElement.shadowRoot!.querySelector('#close-button')!;
      if (!elementCloseButton) {
        throw new Error('no close button');
      }
      await clickElementAtCenter(elementCloseButton);
      expect(dismissableElement.isConnected).to.be.false;
    });

    it('should be able to prevent default on the close event', async () => {
      elementCloseButton = dismissableElement.shadowRoot?.querySelector('#close-button');

      dismissableElement?.addEventListener('close', event => {
        event.preventDefault();
      });
      setTimeout(function() {
        elementCloseButton?.click();
      });
      await oneEvent(dismissableElement, 'close');
      dismissableElement.requestUpdate();

      await dismissableElement.updateComplete;
      expect(dismissableElement.isConnected).to.be.true;
    });
  });

  const tokens = new Map<string, string>([
  ['color-info-on-light', '#06c'],
  ['color-success-on-light', '#3e8635'],
  ['color-warning-on-light', '#f0ab00'],
  ['color-danger-on-light', '#c9190b'],
  // הוסיפי כאן לפי הצורך
]);
  for (const [state, bgtoken] of Object.entries({
    neutral: '--pf-global--color--background-light-100',
    info: '--pf-global--color--info-100',
    success: '--pf-global--color--success-100',
    caution: '--pf-global--color--caution-100',
    warning: '--pf-global--color--warning-100',
    danger: '--pf-global--color--danger-100',
  })) {
    const expected = tokens.get(`${bgtoken}-on-light`) as unknown as string;
    describe(`state="${state}"`, function() {
      let element: PfAlert;
      beforeEach(async function() {
        element = await createFixture(html`<pf-alert state="${state}">Content</pf-alert>`);
      });
      it('uses the correct background color', function() {
        const actual = getComputedStyle(element.shadowRoot!.getElementById('container')!).backgroundColor;
        expect(actual).to.be.colored(expected);
      });
    });
    describe(`state="${state.toUpperCase()}" case insensitive`, function() {
      let element: PfAlert;
      beforeEach(async function() {
        element = await createFixture(html`<pf-alert state="${state.toUpperCase()}">Content</pf-alert>`);
      });
      it('uses the correct background color', function() {
        const actual = getComputedStyle(element.shadowRoot!.getElementById('container')!).backgroundColor;
        expect(actual).to.be.colored(expected);
      });
    });
  }
});
