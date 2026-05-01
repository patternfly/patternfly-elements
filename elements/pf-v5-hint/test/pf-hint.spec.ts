import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfV5Hint } from '@patternfly/elements/pf-v5-hint/pf-v5-hint.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

describe('<pf-v5-hint>', function() {
  describe('simply instantiating', function() {
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-v5-hint')).to.be.an.instanceof(PfV5Hint);
    });

    it('should upgrade', async function() {
      const el = await createFixture<PfV5Hint>(html`
        <pf-v5-hint>Basic hint</pf-v5-hint>
      `);
      const klass = customElements.get('pf-v5-hint');
      expect(el)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfV5Hint);
    });
  });

  describe('basic hint', function() {
    beforeEach(async function() {
      await createFixture<PfV5Hint>(html`
        <pf-v5-hint>Welcome to the new documentation experience.</pf-v5-hint>
      `);
    });

    it('should render body content, and not title footer, or actions', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainName('Welcome to the new documentation experience.');
      expect(snapshot).to.not.axContainRole('button');
    });
  });

  describe('hint with title', function() {
    let element: PfV5Hint;
    beforeEach(async function() {
      element = await createFixture<PfV5Hint>(html`
        <pf-v5-hint>
          <span slot="title">Do more with Find it Fix it capabilities</span>
          Upgrade to Red Hat Smart Management.
        </pf-v5-hint>
      `);
      await element.updateComplete;
    });

    it('should render title and body content', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainName('Do more with Find it Fix it capabilities');
      expect(snapshot).to.axContainName('Upgrade to Red Hat Smart Management.');
    });
  });

  describe('hint with footer', function() {
    let element: PfV5Hint;
    beforeEach(async function() {
      element = await createFixture<PfV5Hint>(html`
        <pf-v5-hint>
          <span slot="title">Do more with Find it Fix it capabilities</span>
          Upgrade to Red Hat Smart Management.
          <a slot="footer" href="#">Try it for 90 days</a>
        </pf-v5-hint>
      `);
      await element.updateComplete;
    });

    it('should render footer', function() {
      const footer = element.shadowRoot!.querySelector('#footer');
      expect(footer).to.exist;
    });
  });

  describe('hint with actions', function() {
    let element: PfV5Hint;
    beforeEach(async function() {
      element = await createFixture<PfV5Hint>(html`
        <pf-v5-hint>
          <button slot="actions" aria-label="Actions">⋮</button>
          <span slot="title">Do more with Find it Fix it capabilities</span>
          Upgrade to Red Hat Smart Management.
        </pf-v5-hint>
      `);
      await element.updateComplete;
    });

    it('should render title, body, and actions', async function() {
      const snapshot = await a11ySnapshot();
      expect(snapshot).to.axContainQuery({ role: 'button' });
      expect(snapshot).to.axContainName('Do more with Find it Fix it capabilities');
      expect(snapshot).to.axContainName('Upgrade to Red Hat Smart Management.');
    });
  });
});
