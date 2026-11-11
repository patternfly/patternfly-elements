import type { A11yTreeSnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { a11ySnapshot, querySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { sendKeys } from '@web/test-runner-commands';

import { PfV6Card } from '@patternfly/elements/pf-v6-card/pf-v6-card.js';

describe('<pf-v6-card>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-v6-card')).to.be.an.instanceof(PfV6Card);
  });

  describe('with header, title, body, and footer content', function() {
    let element: PfV6Card;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6Card>(html`
        <pf-v6-card id="basic-card">
          <h2 slot="title">Title</h2>
          <span slot="subtitle">Subtitle</span>
          <pf-v6-card-body>Body</pf-v6-card-body>
          <span slot="footer">Footer</span>
        </pf-v6-card>
      `);
      await element.updateComplete;
      await nextFrame();
      await element.updateComplete;
      snapshot = await a11ySnapshot({ selector: '#basic-card' });
    });

    it('should upgrade', function() {
      expect(element)
          .to.be.an.instanceOf(customElements.get('pf-v6-card'))
          .and
          .to.be.an.instanceOf(PfV6Card);
    });

    it('renders the title as a heading in the accessibility tree', function() {
      expect(querySnapshot(snapshot, { role: 'heading', name: 'Title' })).to.not.be.null;
    });

    it('renders the body and footer text', function() {
      const body = element.querySelector('pf-v6-card-body')!;
      const footer = element.querySelector('[slot="footer"]')!;
      expect(body.getBoundingClientRect().height).to.be.greaterThan(0);
      expect(footer.getBoundingClientRect().height).to.be.greaterThan(0);
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('with only a body', function() {
    let element: PfV6Card;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6Card>(html`
        <pf-v6-card id="body-only-card">
          <pf-v6-card-body>Body</pf-v6-card-body>
        </pf-v6-card>
      `);
      await element.updateComplete;
      await nextFrame();
      await element.updateComplete;
      snapshot = await a11ySnapshot({ selector: '#body-only-card' });
    });

    it('renders the body text', function() {
      expect(querySnapshot(snapshot, { name: 'Body' })).to.not.be.null;
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });
  });

  describe('selectable', function() {
    let element: PfV6Card;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6Card>(html`
        <pf-v6-card id="selectable-card" selectable accessible-label="First card">
          <h2 slot="header">First card</h2>
          <pf-v6-card-body>Body</pf-v6-card-body>
        </pf-v6-card>
      `);
      await element.updateComplete;
      await nextFrame();
      await element.updateComplete;
      snapshot = await a11ySnapshot();
    });

    it('exposes a checkbox named by accessible-label', function() {
      expect(querySnapshot(snapshot, { role: 'checkbox', name: 'First card' }))
          .to.not.be.null;
    });

    it('is unchecked by default', function() {
      expect(querySnapshot(snapshot, { role: 'checkbox', name: 'First card' })?.checked).to.be.false;
    });

    describe('clicking the body', function() {
      let changed: boolean;

      beforeEach(async function() {
        changed = false;
        element.addEventListener('change', () => changed = true);
        element.querySelector('pf-v6-card-body')!.click();
        await element.updateComplete;
        await nextFrame();
        snapshot = await a11ySnapshot();
      });

      it('selects the card', function() {
        expect(element.selected).to.be.true;
      });

      it('checks the control', function() {
        expect(querySnapshot(snapshot, { role: 'checkbox', name: 'First card' })?.checked).to.be.true;
      });

      it('fires change', function() {
        expect(changed).to.be.true;
      });
    });

    describe('when disabled', function() {
      beforeEach(async function() {
        element.disabled = true;
        await element.updateComplete;
        element.querySelector('pf-v6-card-body')!.click();
        await element.updateComplete;
      });

      it('does not select the card', function() {
        expect(element.selected).to.be.false;
      });

      it('disables its control', async function() {
        const snapshot = await a11ySnapshot();
        expect(querySnapshot(snapshot, { role: 'checkbox', name: 'First card' })?.disabled)
            .to.be.true;
      });
    });
  });

  describe('single selection', function() {
    let element: HTMLElement;

    beforeEach(async function() {
      element = await createFixture(html`
        <div>
          <pf-v6-card selectable selection="single" name="cards" accessible-label="First">
            <pf-v6-card-body>First</pf-v6-card-body>
          </pf-v6-card>
          <pf-v6-card selectable selection="single" name="cards" accessible-label="Second">
            <pf-v6-card-body>Second</pf-v6-card-body>
          </pf-v6-card>
        </div>
      `);
      await Promise.all([...element.querySelectorAll('pf-v6-card')].map(x => x.updateComplete));
    });

    function cards() {
      return [...element.querySelectorAll<PfV6Card>('pf-v6-card')];
    }

    beforeEach(async function() {
      cards()[0].querySelector('pf-v6-card-body')!.click();
      await cards()[0].updateComplete;
      cards()[1].querySelector('pf-v6-card-body')!.click();
      await cards()[1].updateComplete;
    });

    it('deselects the previously selected card', function() {
      expect(cards()[0].selected).to.be.false;
      expect(cards()[1].selected).to.be.true;
    });

    it('exposes radios with names and checked state', async function() {
      const snapshot = await a11ySnapshot();
      expect(querySnapshot(snapshot, { role: 'radio', name: 'First' })?.checked).to.be.false;
      expect(querySnapshot(snapshot, { role: 'radio', name: 'Second' })?.checked).to.be.true;
    });

    it('leaves only the selected radio in the tab order', function() {
      const tabindexes = cards().map(card =>
        card.shadowRoot!.querySelector('input')!.getAttribute('tabindex'));
      expect(tabindexes).to.deep.equal(['-1', '0']);
    });

    describe('pressing an arrow key', function() {
      beforeEach(async function() {
        const input = cards()[1].shadowRoot!.querySelector('input')!;
        input.focus();
        await sendKeys({ press: 'ArrowLeft' });
        await cards()[0].updateComplete;
        await cards()[1].updateComplete;
      });

      it('selects and focuses the previous card', function() {
        expect(cards()[0].selected).to.be.true;
        expect(cards()[1].selected).to.be.false;
        expect(document.activeElement).to.equal(cards()[0]);
      });
    });

    describe('pressing Home', function() {
      beforeEach(async function() {
        const input = cards()[1].shadowRoot!.querySelector('input')!;
        input.focus();
        await sendKeys({ press: 'Home' });
        await cards()[0].updateComplete;
        await cards()[1].updateComplete;
      });

      it('selects the first card in the group', function() {
        expect(cards()[0].selected).to.be.true;
        expect(cards()[1].selected).to.be.false;
      });
    });

    describe('changing a name', function() {
      beforeEach(async function() {
        cards()[0].selected = false;
        cards()[1].selected = false;
        await cards()[0].updateComplete;
        await cards()[1].updateComplete;
        cards()[0].querySelector('pf-v6-card-body')!.click();
        await cards()[0].updateComplete;
        cards()[0].name = 'other';
        await cards()[0].updateComplete;
        cards()[1].querySelector('pf-v6-card-body')!.click();
        await cards()[1].updateComplete;
      });

      it('does not keep the renamed card in the original group', function() {
        expect(cards()[0].selected).to.be.true;
        expect(cards()[1].selected).to.be.true;
      });
    });
  });

  describe('actionable', function() {
    it('renders a link when href is set', async function() {
      const element = await createFixture<PfV6Card>(html`
        <pf-v6-card id="actionable-link-card" clickable href="#" accessible-label="View details">
          <pf-v6-card-body>Body</pf-v6-card-body>
        </pf-v6-card>
      `);
      await element.updateComplete;
      await nextFrame();
      await element.updateComplete;
      const snapshot = await a11ySnapshot({ selector: '#actionable-link-card' });
      expect(querySnapshot(snapshot, { role: 'link', name: 'View details' }))
          .to.not.be.null;
    });

    it('renders a button when href is not set', async function() {
      const element = await createFixture<PfV6Card>(html`
        <pf-v6-card id="actionable-button-card" clickable accessible-label="Do the thing">
          <pf-v6-card-body>Body</pf-v6-card-body>
        </pf-v6-card>
      `);
      await element.updateComplete;
      await nextFrame();
      await element.updateComplete;
      const snapshot = await a11ySnapshot({ selector: '#actionable-button-card' });
      expect(querySnapshot(snapshot, { role: 'button', name: 'Do the thing' }))
          .to.not.be.null;
    });

    it('marks a disabled link disabled and removes it from the tab order', async function() {
      const element = await createFixture<PfV6Card>(html`
        <pf-v6-card clickable disabled href="#" accessible-label="Disabled link">
          <pf-v6-card-body>Body</pf-v6-card-body>
        </pf-v6-card>
      `);
      await element.updateComplete;
      await nextFrame();
      await element.updateComplete;
      const snapshot = await a11ySnapshot();
      const link = querySnapshot(snapshot, { role: 'link', name: 'Disabled link' });
      expect(link?.disabled).to.be.true;
      expect(element.shadowRoot!.querySelector('a')!.getAttribute('tabindex')).to.equal('-1');
    });
  });

  describe('expandable', function() {
    let element: PfV6Card;
    let snapshot: A11yTreeSnapshot;
    let expandedEvent: Event | null;

    beforeEach(async function() {
      element = await createFixture<PfV6Card>(html`
        <pf-v6-card id="expandable-card" expandable accessible-label="Title">
          <h2 slot="header">Title</h2>
          <div slot="expandable-content">
            <pf-v6-card-body>Expandable content</pf-v6-card-body>
          </div>
        </pf-v6-card>
      `);
      await element.updateComplete;
      await nextFrame();
      await element.updateComplete;
      snapshot = await a11ySnapshot({ selector: '#expandable-card' });
    });

    it('is collapsed by default', function() {
      expect(element.expanded).to.be.false;
      expect(querySnapshot(snapshot, { role: 'button', name: 'Title' })?.expanded)
          .to.be.false;
    });

    it('hides expandable content while collapsed', function() {
      expect(querySnapshot(snapshot, { name: 'Expandable content' })).to.be.null;
    });

    describe('clicking the toggle', function() {
      beforeEach(async function() {
        expandedEvent = null;
        element.addEventListener('expand', event => expandedEvent = event);
        element.shadowRoot!.querySelector<HTMLButtonElement>('#toggle')!.click();
        await element.updateComplete;
        await nextFrame();
        snapshot = await a11ySnapshot({ selector: '#expandable-card' });
      });

      it('expands the card', function() {
        expect(element.expanded).to.be.true;
      });

      it('updates aria-expanded', function() {
        expect(querySnapshot(snapshot, { role: 'button', name: 'Title' })?.expanded)
            .to.be.true;
      });

      it('reveals the expandable content', function() {
        const content = element.querySelector('[slot="expandable-content"]')!;
        expect(content.getBoundingClientRect().height).to.be.greaterThan(0);
      });

      it('fires expand', function() {
        expect(expandedEvent).to.be.an.instanceOf(Event);
      });
    });

    describe('when an expand handler prevents default', function() {
      beforeEach(async function() {
        element.addEventListener('expand', event => event.preventDefault());
        element.shadowRoot!.querySelector<HTMLButtonElement>('#toggle')!.click();
        await element.updateComplete;
      });

      it('does not expand the card', function() {
        expect(element.expanded).to.be.false;
      });
    });
  });

  describe('form association', function() {
    let form: HTMLFormElement;

    beforeEach(async function() {
      form = await createFixture<HTMLFormElement>(html`
        <form>
          <pf-v6-card selectable name="card" value="selected-card" accessible-label="Card">
            <pf-v6-card-body>Body</pf-v6-card-body>
          </pf-v6-card>
        </form>
      `);
      const card = form.querySelector<PfV6Card>('pf-v6-card')!;
      card.querySelector('pf-v6-card-body')!.click();
      await card.updateComplete;
    });

    it('submits the selected value', function() {
      expect(new FormData(form).get('card')).to.equal('selected-card');
    });
  });

  describe('card body fill', function() {
    let element: PfV6Card;

    beforeEach(async function() {
      element = await createFixture<PfV6Card>(html`
        <pf-v6-card style="block-size: 20rem">
          <pf-v6-card-body no-fill>Fixed</pf-v6-card-body>
          <pf-v6-card-body>Filling</pf-v6-card-body>
        </pf-v6-card>
      `);
      await element.updateComplete;
      await nextFrame();
    });

    it('lets a body without no-fill grow while no-fill stays fixed', function() {
      const [fixed, filling] =
        [...element.querySelectorAll('pf-v6-card-body')].map(x => x.getBoundingClientRect().height);
      expect(filling).to.be.greaterThan(fixed);
    });
  });

  describe('hidden', function() {
    it('is removed from layout when hidden', async function() {
      const element = await createFixture<PfV6Card>(html`
        <pf-v6-card hidden><pf-v6-card-body>Body</pf-v6-card-body></pf-v6-card>
      `);
      expect(getComputedStyle(element).display).to.equal('none');
    });
  });

  describe('cancelable change', function() {
    let element: PfV6Card;
    let snapshot: A11yTreeSnapshot;

    beforeEach(async function() {
      element = await createFixture<PfV6Card>(html`
        <pf-v6-card id="cancelable-card" selectable accessible-label="Card">
          <pf-v6-card-body>Body</pf-v6-card-body>
        </pf-v6-card>
      `);
      element.addEventListener('change', event => event.preventDefault());
      element.querySelector('pf-v6-card-body')!.click();
      await element.updateComplete;
      await nextFrame();
      await element.updateComplete;
      snapshot = await a11ySnapshot();
    });

    it('does not select the card', function() {
      expect(element.selected).to.be.false;
    });

    it('leaves the control unchecked', function() {
      expect(querySnapshot(snapshot, { role: 'checkbox', name: 'Card' })?.checked).to.be.false;
    });
  });

  describe('collapse', function() {
    let element: PfV6Card;
    let collapseEvent: Event | null;

    beforeEach(async function() {
      element = await createFixture<PfV6Card>(html`
        <pf-v6-card expandable accessible-label="Title">
          <h2 slot="header">Title</h2>
          <div slot="expandable-content">
            <pf-v6-card-body>Content</pf-v6-card-body>
          </div>
        </pf-v6-card>
      `);
      await element.updateComplete;
      element.shadowRoot!.querySelector<HTMLButtonElement>('#toggle')!.click();
      await element.updateComplete;
      collapseEvent = null;
      element.addEventListener('collapse', event => {
        collapseEvent = event;
        event.preventDefault();
      });
      element.shadowRoot!.querySelector<HTMLButtonElement>('#toggle')!.click();
      await element.updateComplete;
    });

    it('fires collapse', function() {
      expect(collapseEvent).to.be.an.instanceOf(Event);
    });

    it('stays expanded when collapse is prevented', function() {
      expect(element.expanded).to.be.true;
    });
  });

  describe('form value', function() {
    let form: HTMLFormElement;
    let card: PfV6Card;

    beforeEach(async function() {
      form = await createFixture<HTMLFormElement>(html`
        <form>
          <pf-v6-card selectable name="card" accessible-label="Card">
            <pf-v6-card-body>Body</pf-v6-card-body>
          </pf-v6-card>
        </form>
      `);
      card = form.querySelector<PfV6Card>('pf-v6-card')!;
    });

    it('defaults to on', async function() {
      card.querySelector('pf-v6-card-body')!.click();
      await card.updateComplete;
      expect(new FormData(form).get('card')).to.equal('on');
    });

    it('is removed when deselected', async function() {
      card.querySelector('pf-v6-card-body')!.click();
      await card.updateComplete;
      card.querySelector('pf-v6-card-body')!.click();
      await card.updateComplete;
      expect(new FormData(form).get('card')).to.be.null;
    });

    it('is updated synchronously inside the change handler', async function() {
      let value: FormDataEntryValue | null = 'unset';
      card.addEventListener('change', () => {
        value = new FormData(form).get('card');
      });
      card.querySelector('pf-v6-card-body')!.click();
      expect(value).to.equal('on');
    });

    it('resets the selection on form reset', async function() {
      card.querySelector('pf-v6-card-body')!.click();
      await card.updateComplete;
      form.reset();
      await card.updateComplete;
      expect(card.selected).to.be.false;
      expect(new FormData(form).get('card')).to.be.null;
    });
  });

  describe('clicking interactive content', function() {
    let element: PfV6Card;

    beforeEach(async function() {
      element = await createFixture<PfV6Card>(html`
        <pf-v6-card selectable clickable accessible-label="Card">
          <pf-v6-card-body>
            <a href="#" id="link">Link</a>
          </pf-v6-card-body>
        </pf-v6-card>
      `);
      const link = element.querySelector('a')!;
      link.addEventListener('click', event => event.preventDefault());
      link.click();
      await element.updateComplete;
    });

    it('does not toggle the selection', function() {
      expect(element.selected).to.be.false;
    });
  });

  describe('derived accessible names', function() {
    it('uses heading text from the header slot', async function() {
      const element = await createFixture<PfV6Card>(html`
        <pf-v6-card id="derived-heading-card" selectable>
          <h2 slot="header">Header title</h2>
          <pf-v6-card-body>Body</pf-v6-card-body>
        </pf-v6-card>
      `);
      await element.updateComplete;
      await nextFrame();
      await element.updateComplete;
      const snapshot = await a11ySnapshot();
      expect(querySnapshot(snapshot, { role: 'checkbox', name: 'Header title' }))
          .to.not.be.null;
    });

    it('uses image alt text from the header slot', async function() {
      const element = await createFixture<PfV6Card>(html`
        <pf-v6-card id="derived-image-card" selectable>
          <img slot="header" alt="Logo" src="/brand/logo/svg/pfe-icon-blue.svg">
          <pf-v6-card-body>Body</pf-v6-card-body>
        </pf-v6-card>
      `);
      await element.updateComplete;
      await nextFrame();
      await element.updateComplete;
      const snapshot = await a11ySnapshot();
      expect(querySnapshot(snapshot, { role: 'checkbox', name: 'Logo' }))
          .to.not.be.null;
    });
  });

  describe('tiles (hide-input)', function() {
    it('keeps the control named', async function() {
      const element = await createFixture<PfV6Card>(html`
        <pf-v6-card selectable hide-input accessible-label="Tile">
          <pf-v6-card-body>Body</pf-v6-card-body>
        </pf-v6-card>
      `);
      await element.updateComplete;
      await nextFrame();
      await element.updateComplete;
      const snapshot = await a11ySnapshot();
      expect(querySnapshot(snapshot, { role: 'checkbox', name: 'Tile' })).to.not.be.null;
    });

    it('shows a focus ring on a selected tile', async function() {
      const element = await createFixture<PfV6Card>(html`
        <pf-v6-card selectable hide-input selected accessible-label="Selected tile">
          <pf-v6-card-body>Body</pf-v6-card-body>
        </pf-v6-card>
      `);
      await element.updateComplete;
      element.shadowRoot!.querySelector('input')!.focus();
      await element.updateComplete;
      await nextFrame();
      expect(getComputedStyle(element).outlineStyle).to.equal('solid');
    });
  });

  describe('header actions', function() {
    it('exposes slotted actions in the accessibility tree', async function() {
      const element = await createFixture<PfV6Card>(html`
        <pf-v6-card>
          <h2 slot="header">Title</h2>
          <button slot="actions" aria-label="Actions">Actions</button>
          <pf-v6-card-body>Body</pf-v6-card-body>
        </pf-v6-card>
      `);
      await element.updateComplete;
      await nextFrame();
      await element.updateComplete;
      const snapshot = await a11ySnapshot();
      expect(querySnapshot(snapshot, { role: 'button', name: 'Actions' })).to.not.be.null;
    });
  });
});
