import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfHint } from '@patternfly/elements/pf-hint/pf-hint.js';

describe('<pf-hint>', function() {
  describe('simply instantiating', function() {
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-hint')).to.be.an.instanceof(PfHint);
    });

    it('should upgrade', async function() {
      const el = await createFixture<PfHint>(html`
        <pf-hint>Basic hint</pf-hint>
      `);
      const klass = customElements.get('pf-hint');
      expect(el)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfHint);
    });
  });

  describe('basic hint', function() {
    let element: PfHint;
    beforeEach(async function() {
      element = await createFixture<PfHint>(html`
        <pf-hint>Welcome to the new documentation experience.</pf-hint>
      `);
      await element.updateComplete;
    });

    it('should render body content', function() {
      const body = element.shadowRoot!.querySelector('#body');
      expect(body).to.exist;
    });

    it('should not render title when not provided', function() {
      const title = element.shadowRoot!.querySelector('#title');
      expect(title).to.not.exist;
    });

    it('should not render footer when not provided', function() {
      const footer = element.shadowRoot!.querySelector('#footer');
      expect(footer).to.not.exist;
    });

    it('should not render actions when not provided', function() {
      const actions = element.shadowRoot!.querySelector('#actions');
      expect(actions).to.not.exist;
    });
  });

  describe('hint with title', function() {
    let element: PfHint;
    beforeEach(async function() {
      element = await createFixture<PfHint>(html`
        <pf-hint>
          <span slot="title">Do more with Find it Fix it capabilities</span>
          Upgrade to Red Hat Smart Management.
        </pf-hint>
      `);
      await element.updateComplete;
    });

    it('should render title', function() {
      const title = element.shadowRoot!.querySelector('#title');
      expect(title).to.exist;
    });

    it('should render body content', function() {
      const body = element.shadowRoot!.querySelector('#body');
      expect(body).to.exist;
    });
  });

  describe('hint with footer', function() {
    let element: PfHint;
    beforeEach(async function() {
      element = await createFixture<PfHint>(html`
        <pf-hint>
          <span slot="title">Do more with Find it Fix it capabilities</span>
          Upgrade to Red Hat Smart Management.
          <a slot="footer" href="#">Try it for 90 days</a>
        </pf-hint>
      `);
      await element.updateComplete;
    });

    it('should render footer', function() {
      const footer = element.shadowRoot!.querySelector('#footer');
      expect(footer).to.exist;
    });
  });

  describe('hint with actions', function() {
    let element: PfHint;
    beforeEach(async function() {
      element = await createFixture<PfHint>(html`
        <pf-hint>
          <button slot="actions" aria-label="Actions">⋮</button>
          <span slot="title">Do more with Find it Fix it capabilities</span>
          Upgrade to Red Hat Smart Management.
        </pf-hint>
      `);
      await element.updateComplete;
    });

    it('should render actions', function() {
      const actions = element.shadowRoot!.querySelector('#actions');
      expect(actions).to.exist;
    });

    it('should add has-actions class to container', function() {
      const container = element.shadowRoot!.querySelector('#container');
      expect(container?.classList.contains('has-actions')).to.be.true;
    });
  });
});
