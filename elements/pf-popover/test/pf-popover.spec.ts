import { expect, html, fixture, fixtureCleanup } from '@open-wc/testing';
import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { sendKeys } from '@web/test-runner-commands';
import { PfPopover } from '@patternfly/elements/pf-popover/pf-popover.js';
import { PfButton } from '@patternfly/elements/pf-button/pf-button.js';

describe('<pf-popover>', function() {
  let element: PfPopover;
  let snapshot: A11yTreeSnapshot;

  beforeEach(async function() {
    element = await fixture<PfPopover>(html`
      <pf-popover heading="Popover heading"
                  body="Popovers are triggered by click rather than hover."
                  footer="Popover footer">
        <pf-button>Toggle popover</pf-button>
      </pf-popover>
    `);
    snapshot = await a11ySnapshot();
  });

  it('should upgrade', async function() {
    const klass = customElements.get('pf-popover');
    expect(element).to.be.an.instanceOf(klass).and.to.be.an.instanceOf(PfPopover);
  });

  it('should be accessible', async function() {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should hide popover content from assistive technology', function() {
    expect(snapshot.children).to.deep.equal([{ name: 'Toggle popover', role: 'button' }]);
  });

  it('should show popover content to assistive technology', async function() {
    await sendKeys({ press: 'Tab' });
    expect(document.activeElement).to.be.an.instanceof(PfButton);
    await sendKeys({ press: 'Enter' });
    snapshot = await a11ySnapshot();
    expect(snapshot.children).to.deep.equal([
      {
        name: 'Toggle popover',
        role: 'button',
      },
      {
        focused: true,
        name: 'Close popover',
        role: 'button',
      },
      {
        level: 6,
        name: 'Popover heading',
        role: 'heading',
      },
      {
        name: 'Popovers are triggered by click rather than hover.',
        role: 'text',
      },
      {
        name: 'Popover footer',
        role: 'text',
      },
    ]);
  });

  it('should be closeable on close button select', async function() {
    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: 'Enter' });
    await sendKeys({ press: 'Enter' });
    snapshot = await a11ySnapshot();
    expect(snapshot.children).to.deep.equal([{ focused: true, name: 'Toggle popover', role: 'button' }]);
  });

  it('should be closeable on escape', async function() {
    await sendKeys({ press: 'Tab' });
    await sendKeys({ press: 'Enter' });
    await sendKeys({ press: 'Escape' });
    snapshot = await a11ySnapshot();
    expect(snapshot.children).to.deep.equal([{ focused: true, name: 'Toggle popover', role: 'button' }]);
  });

  it('should properly clean up event handlers', async () => {
    const expectClose = () =>
      expect(snapshot.children).to.deep.equal([
        {
          name: 'Toggle popover 1',
          role: 'button',
        },
        {
          name: 'Toggle popover 2',
          role: 'button',
        },
      ]);

    const expectOpen = () =>
      expect(snapshot.children).to.deep.equal([
        {
          focused: true,
          name: 'Close popover',
          role: 'button',
        },
        {
          level: 6,
          name: 'Popover heading',
          role: 'heading',
        },
        {
          name: 'Popovers are triggered by click rather than hover.',
          role: 'text',
        },
        {
          name: 'Popover footer',
          role: 'text',
        },
        {
          name: 'Toggle popover 1',
          role: 'button',
        },
        {
          name: 'Toggle popover 2',
          role: 'button',
        },
      ]);
    fixtureCleanup();
    const container = await fixture(html`
      <div>
        <pf-popover
          id="popover"
          trigger="btn-1"
          heading="Popover heading"
          body="Popovers are triggered by click rather than hover."
          footer="Popover footer"
        >
        </pf-popover>
        <button id="btn-1">Toggle popover 1</button>
        <button id="btn-2">Toggle popover 2</button>
      </div>
    `);
    snapshot = await a11ySnapshot();
    const popover: PfPopover | null = container.querySelector('pf-popover');
    const btn1: HTMLButtonElement | null = container.querySelector('#btn-1');
    const btn2: HTMLButtonElement | null = container.querySelector('#btn-2');
    expectClose();
    btn1?.click();
    snapshot = await a11ySnapshot();
    expectOpen();
    // Close the popover
    await sendKeys({ press: 'Enter' });
    // Update trigger element
    popover?.setAttribute('trigger', 'btn-2');
    btn1?.click();
    snapshot = await a11ySnapshot();
    expectClose();
    btn2?.click();
    snapshot = await a11ySnapshot();
    expectOpen();
  });
});
