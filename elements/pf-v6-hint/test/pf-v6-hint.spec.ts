import { expect, html } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { getColor, hexToRgb } from '@patternfly/pfe-tools/test/hex-to-rgb.js';
import { PfV6Hint } from '@patternfly/elements/pf-v6-hint/pf-v6-hint.js';

describe('<pf-v6-hint>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-hint')).to.be.an.instanceof(PfV6Hint);
  });

  it('should upgrade', async function() {
    const el = await createFixture<PfV6Hint>(html`<pf-v6-hint>Test</pf-v6-hint>`);
    expect(el)
        .to.be.an.instanceOf(customElements.get('pf-v6-hint'))
        .and
        .to.be.an.instanceOf(PfV6Hint);
  });

  describe('with a message', function() {
    let element: PfV6Hint;

    beforeEach(async function() {
      element = await createFixture<PfV6Hint>(html`
        <pf-v6-hint>Welcome to the new documentation experience.</pf-v6-hint>
      `);
      await element.updateComplete;
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });

    it('should show the message', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainName('Welcome to the new documentation experience.');
    });

    it('should not expose an action button', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.not.axContainRole('button');
    });

    it('should use the hint background, text, and border colors', function() {
      expect(getColor(element, 'background-color')).to.deep.equal(hexToRgb('#ffffff'));
      expect(getColor(element, 'color')).to.deep.equal(hexToRgb('#151515'));
      expect(getColor(element, 'border-top-color')).to.deep.equal(hexToRgb('#5e40be'));
    });

    it('should use the hint border width, radius, and padding', function() {
      const style = getComputedStyle(element);
      expect(style.borderTopWidth).to.equal('2px');
      expect(style.borderRadius).to.equal('16px');
      expect(style.paddingTop).to.equal('24px');
      expect(style.paddingInlineStart).to.equal('24px');
    });
  });

  describe('with a title, message, footer, and actions', function() {
    let element: PfV6Hint;

    beforeEach(async function() {
      element = await createFixture<PfV6Hint>(html`
        <pf-v6-hint>
          <button slot="actions" aria-label="Actions">Actions</button>
          <span slot="title">Do more with Find it Fix it capabilities</span>
          Upgrade to Red Hat Smart Management.
          <a slot="footer" href="#">Try it for 90 days</a>
        </pf-v6-hint>
      `);
      await element.updateComplete;
    });

    it('should be accessible', async function() {
      await expect(element).to.be.accessible();
    });

    it('should show the title, message, footer, and action', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainName('Do more with Find it Fix it capabilities');
      expect(snapshot).to.axContainName('Upgrade to Red Hat Smart Management.');
      expect(snapshot).to.axContainName('Try it for 90 days');
      expect(snapshot).to.axContainRole('button');
      expect(snapshot).to.axContainRole('link');
    });

    it('should emphasize the title', function() {
      const title = element.querySelector('[slot="title"]');
      expect(getComputedStyle(title!).fontWeight).to.equal('600');
    });
  });

  describe('with no-actions-offset', function() {
    let offsetTop: number;
    let noOffsetTop: number;

    beforeEach(async function() {
      const root = await createFixture<HTMLDivElement>(html`
        <div>
          <pf-v6-hint id="offset">
            <button slot="actions">Action</button>
            <span slot="title">Do more with Find it Fix it capabilities</span>
            Upgrade to Red Hat Smart Management.
          </pf-v6-hint>
          <pf-v6-hint id="plain" no-actions-offset>
            <button slot="actions">Action</button>
            <span slot="title">Do more with Find it Fix it capabilities</span>
            Upgrade to Red Hat Smart Management.
          </pf-v6-hint>
        </div>
      `);
      const hints = [...root.querySelectorAll('pf-v6-hint')];
      await Promise.all(hints.map(hint => hint.updateComplete));
      offsetTop = actionTop(root.querySelector('#offset'));
      noOffsetTop = actionTop(root.querySelector('#plain'));
    });

    it('should reflect the attribute', function() {
      const plain = document.querySelector('#plain');
      expect(plain).to.have.attribute('no-actions-offset');
      expect((plain as PfV6Hint).noActionsOffset).to.be.true;
    });

    it('should place the action lower than the default offset', function() {
      expect(noOffsetTop - offsetTop).to.be.closeTo(8, 1);
    });
  });

  describe('with a preceding control and an action', function() {
    let action: HTMLButtonElement;

    beforeEach(async function() {
      const root = await createFixture<HTMLDivElement>(html`
        <div>
          <button id="before">Before</button>
          <pf-v6-hint>
            <button id="action" slot="actions">Action</button>
            Hint message
          </pf-v6-hint>
        </div>
      `);
      const hint = root.querySelector('pf-v6-hint')!;
      await hint.updateComplete;
      root.querySelector<HTMLButtonElement>('#before')!.focus();
      await sendKeys({ press: 'Tab' });
      action = root.querySelector<HTMLButtonElement>('#action')!;
    });

    it('should move focus to the action', function() {
      expect(document.activeElement).to.equal(action);
    });
  });

  describe('when color-scheme is dark', function() {
    let element: PfV6Hint;

    beforeEach(async function() {
      element = await createFixture<PfV6Hint>(html`
        <pf-v6-hint>Welcome to the new documentation experience.</pf-v6-hint>
      `);
      element.style.colorScheme = 'dark';
      await element.updateComplete;
    });

    it('should use the dark background, text, and border colors', function() {
      expect(getColor(element, 'background-color')).to.deep.equal(hexToRgb('#292929'));
      expect(getColor(element, 'color')).to.deep.equal(hexToRgb('#ffffff'));
      expect(getColor(element, 'border-top-color')).to.deep.equal(hexToRgb('#b6a6e9'));
    });
  });
});

function actionTop(hint: PfV6Hint | null): number {
  const button = hint?.querySelector('button');
  if (!hint || !button) {
    return 0;
  }
  return button.getBoundingClientRect().top - hint.getBoundingClientRect().top;
}
