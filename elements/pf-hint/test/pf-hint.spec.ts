import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfHint } from '@patternfly/elements/pf-hint/pf-hint.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

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
    });

    it('should render body content, and not title footer, or actions', async function() {
      const snap = await a11ySnapshot();
      expect(snap.children?.length).to.equal(1);
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

    it('should render title and body content', async function() {
      const snap = await a11ySnapshot();
      expect(snap.children?.length).to.equal(2);
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

    it('should render title, body, and actions', async function() {
      const { children: [actions, title, body, ...rest] = [] } = await a11ySnapshot();
      expect(actions.role).to.equal('button');
      expect(title.role).to.equal('text');
      expect(body.role).to.equal('text');
      expect(rest.length).to.equal(0);
    });
  });
});
