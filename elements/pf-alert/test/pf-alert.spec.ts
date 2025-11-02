import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfAlert, AlertCloseEvent } from '@patternfly/elements/pf-alert/pf-alert.js';
import { oneEvent } from '@open-wc/testing';

describe('<pf-alert>', function() {
  describe('simply instantiating', function() {
    let element: PfAlert;
    
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-alert')).to.be.an.instanceof(PfAlert);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfAlert>(html`<pf-alert></pf-alert>`);
      const klass = customElements.get('pf-alert');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfAlert);
    });
  });

  describe('attributes and properties', function() {
    it('reflects state attribute', async function() {
      const el = await createFixture<PfAlert>(html`<pf-alert state="success"></pf-alert>`);
      expect(el.getAttribute('state')).to.equal('success');
      expect(el.state).to.equal('success');
    });

    it('reflects variant attribute', async function() {
      const el = await createFixture<PfAlert>(html`<pf-alert variant="inline"></pf-alert>`);
      expect(el.getAttribute('variant')).to.equal('inline');
      expect(el.variant).to.equal('inline');
    });
  });

  describe('slots and rendering', function() {
    it('renders header slot content', async function() {
      const el = await createFixture<PfAlert>(html`
        <pf-alert>
          <h3 slot="header">Alert Title</h3>
          <p>Alert content</p>
        </pf-alert>
      `);
      const header = el.querySelector('[slot="header"]');
      expect(header).to.exist;
      expect(header?.textContent?.trim()).to.equal('Alert Title');
    });

    it('renders action buttons with correct attributes', async function() {
      const el = await createFixture<PfAlert>(html`
        <pf-alert>
          <div slot="actions">
            <pf-button>Action</pf-button>
          </div>
        </pf-alert>
      `);
      const actionButton = el.querySelector('[slot="actions"] pf-button');
      expect(actionButton).to.exist;
    });
  });

  describe('events and interactions', function() {
    it('emits close event when close button clicked', async function() {
      const el = await createFixture<PfAlert>(html`<pf-alert dismissable></pf-alert>`);
      const closeButton = el.shadowRoot?.querySelector('#close-button');
      setTimeout(() => closeButton?.dispatchEvent(new MouseEvent('click')));
      const event = await oneEvent(el, 'close') as AlertCloseEvent;
      expect(event.action).to.equal('dismiss');
    });
  });

  describe('toast functionality', function() {
    it('creates toast alerts via static method', async function() {
      const toastPromise = PfAlert.toast({ 
        heading: 'Test Toast',
        message: 'Toast message',
        state: 'info'
      });
      
      expect(toastPromise).to.be.instanceof(Promise);
      await toastPromise;
      
      const toast = document.querySelector('pf-alert[variant="toast"]');
      expect(toast).to.exist;
      expect(toast?.getAttribute('role')).to.equal('status');
      expect(toast?.getAttribute('state')).to.equal('info');
    });
  });
});
