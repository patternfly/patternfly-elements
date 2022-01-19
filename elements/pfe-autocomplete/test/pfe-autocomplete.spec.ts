import { expect, oneEvent, nextFrame, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';
import * as sinon from 'sinon';

// Import the element we're testing.
import { PfeAutocomplete } from '@patternfly/pfe-autocomplete';
import type {
  AutocompleteShowEvent,
  AutocompleteClearEvent,
  AutocompleteSearchEvent,
  AutocompleteSelectEvent } from '@patternfly/pfe-autocomplete';
import { PfeSearchDroplist } from '@patternfly/pfe-autocomplete/pfe-search-droplist.js';

const TEMPLATES = {
  autocomplete: html`
    <pfe-autocomplete>
      <input placeholder="Enter Your Search Term" />
    </pfe-autocomplete>`,

  nolightdom: html`
    <!-- programmatically removing input to trigger slotchange event -->
    <pfe-autocomplete>
      <input />
    </pfe-autocomplete>`,

  badlightdom: html`
    <pfe-autocomplete>
      <div></div>
    </pfe-autocomplete>`,

  hasAriaLabel: html`
    <pfe-autocomplete>
      <input placeholder="Enter your search term" aria-label="Buscar" />
    </pfe-autocomplete>`,

  hasAlternateAriaAnnounceTemplate: html`
    <pfe-autocomplete aria-announce-template="Hey! There are \${numOptions} options.">
      <input placeholder="Enter your search term" />
    </pfe-autocomplete>`,

  textualButton: html`
    <pfe-autocomplete button-text="Click me!">
      <input placeholder="Enter your search term" />
    </pfe-autocomplete>`,
};

describe('<pfe-autocomplete>', function() {
  let autocompleteElem: PfeAutocomplete;
  let input: HTMLInputElement;
  let clearButton: HTMLButtonElement;
  let searchButton: HTMLButtonElement;
  let loadingIndicator: HTMLSpanElement;
  let droplistElem: PfeSearchDroplist;

  // function to run before each test within this suite.
  beforeEach(async function() {
    autocompleteElem = await createFixture<PfeAutocomplete>(TEMPLATES.autocomplete);
    clearButton = autocompleteElem.shadowRoot!.querySelector('.clear-search')!;
    searchButton = autocompleteElem.shadowRoot!.querySelector('.search-button')!;
    droplistElem = autocompleteElem.shadowRoot!.getElementById('dropdown') as PfeSearchDroplist;
    loadingIndicator = autocompleteElem.shadowRoot!.querySelector('.loading')!;
    input = autocompleteElem.querySelector('input')!;
  });

  it('should upgrade pfe-autocomplete', async function() {
    expect(await createFixture(TEMPLATES.autocomplete))
      .to.be.an.instanceOf(customElements.get('pfe-autocomplete'))
      .and
      .to.be.an.instanceOf(PfeAutocomplete);
  });

  it('should hide x button when input box is empty', async function() {
    expect(clearButton.hidden).to.be.true;
  });

  it('should clear search when user press x button', async function() {
    input.value = 'search-term';
    autocompleteElem.clear();
    expect(clearButton.hidden).to.be.true;
  });

  // it('should close the overlay when user press x button', async function() { });

  it('should close the overlay when user selects an option', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;

    await droplistElem.updateComplete;
    await autocompleteElem.updateComplete;

    const option = droplistElem.shadowRoot?.querySelector<HTMLLIElement>('li:nth-child(2)');
    option?.click();

    await droplistElem.updateComplete;
    await autocompleteElem.updateComplete;
    await nextFrame();

    expect(input.value).to.equal('option 2');

    await autocompleteElem.clear();

    await droplistElem.updateComplete;
    await autocompleteElem.updateComplete;

    expect(droplistElem.open).to.be.false;
  });

  describe('should fire search event', function() {
    describe('should fire search event after click on search icon', function() {
      beforeEach(async function() {
        input.value = 'test';
        autocompleteElem.requestUpdate();
        await droplistElem.updateComplete;
        await autocompleteElem.updateComplete;
        setTimeout(() => searchButton.click());
      });

      it('should fire search event', async function () {
        const event = await oneEvent(autocompleteElem, 'search') as unknown as AutocompleteSearchEvent;
        expect(event.value).to.equal('test');
      });

      /** @deprecated */
      it('should fire pfe-autocomplete:search-event event', async function () {
        const eventDep = await oneEvent(autocompleteElem, 'pfe-autocomplete:search-event');
        expect(eventDep.detail.searchValue).to.equal('test');
      });
    });

    describe('should fire search event after click on search button', async function() {
      let textualButton: PfeAutocomplete;
      beforeEach(async function() {
        textualButton = await createFixture(TEMPLATES.textualButton);
        const input = textualButton.querySelector('input')!;
        input.value = 'test';
        await textualButton.updateComplete;
        setTimeout(() =>
          textualButton.shadowRoot?.querySelector<HTMLElement>('.search-button--textual')!.click());
      });

      it('should fire search event', async function() {
        const event = await oneEvent(textualButton, 'search') as unknown as AutocompleteSearchEvent;
        expect(event.value).to.equal('test');
      });

      /** @deprecated */
      it('should fire pfe-autocomplete:search-event', async function() {
        const event = await oneEvent(textualButton, 'pfe-autocomplete:search-event');
        expect(event.detail.searchValue).to.equal('test');
      });
    });
  });

  it('should set selected-value attribute after after click on search icon', async function() {
    input.value = 'test';
    autocompleteElem.requestUpdate();
    await autocompleteElem.updateComplete;
    searchButton.click();
    await autocompleteElem.updateComplete;
    await nextFrame();
    expect(autocompleteElem.getAttribute('selected-value')).to.eql('test');
  });

  it('should set selected-value attribute after after click on search button', async function() {
    const textualButton = await createFixture<PfeAutocomplete>(TEMPLATES.textualButton);

    const input = textualButton.querySelector('input')!;
    input.value = 'test';
    await textualButton.updateComplete;
    textualButton.search();
    await textualButton.updateComplete;
    await nextFrame();
    expect(textualButton.getAttribute('selected-value')).to.eql('test');
  });

  describe('should fire search after user click on an option', async function() {
    beforeEach(async function() {
      autocompleteElem.data = ['option 1', 'option 2'];
      droplistElem.reflow = true;
      droplistElem.open = true;
      await droplistElem.updateComplete;
    });
    it('should fire search after user click on an option', async function() {
      const option = droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)')!;
      setTimeout(()=> option.click());
      const event = await oneEvent(autocompleteElem, 'search') as unknown as AutocompleteSearchEvent;
      expect(event.value).to.equal('option 2');
    });
    /** @deprecated */
    it('should fire pfe-autocomplete:search-event after user click on an option', async function() {
      const option = droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)')!;
      setTimeout(()=> option.click());
      const eventDep = await oneEvent(autocompleteElem, 'pfe-autocomplete:search-event');
      expect(eventDep.detail.searchValue).to.equal('option 2');
    });
  })

  describe('should fire a select event', function() {
    beforeEach(async function () {
      autocompleteElem.data = ['option 1', 'option 2'];
      droplistElem.reflow = true;
      droplistElem.open = true;
      await nextFrame();
    });

    it(`should fire when a user selects an option in the droplist with the enter key`, async function() {
      input.focus();
      await sendKeys({ up: 'ArrowDown' });
      await nextFrame();
      setTimeout(() => sendKeys({ up: 'Enter' }));
      const event = await oneEvent(autocompleteElem, 'select') as unknown as AutocompleteSelectEvent;
      expect(event.value).to.equal('option 1');
    });

    it(`should fire a pfe-autocomplete:option-selected event when a user selects an option in the droplist with the mouse`, async function() {
      const option = droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)')!;
      setTimeout(() => option.click());
      const event = await oneEvent(autocompleteElem, 'pfe-autocomplete:option-selected');
      expect(event.detail.optionValue).to.equal('option 2');
    });
  })


  describe(`should fire a pfe-autocomplete:options-shown event when the droplist is shown to the user`, async function() {
    beforeEach(function() {
      const items = ['option 1', 'option 2'];
      autocompleteElem.autocompleteRequest = function(_, callback) {
        callback(items);
      };
      input.focus();
      setTimeout(() => sendKeys({ type: 'op' }));
    });

    it(`should fire a shown event`, async function() {
      await oneEvent(autocompleteElem, 'show') as unknown as AutocompleteShowEvent;
      expect(droplistElem.hasAttribute('open')).to.be.true;
    });

    /** @deprecated */
    it(`should fire a pfe-autocomplete:options-shown event`, async function() {
      await oneEvent(autocompleteElem, 'pfe-autocomplete:options-shown');
      expect(droplistElem.hasAttribute('open')).to.be.true;
    });
  });

  describe(`should fire a clear event when the input is cleared`, async function() {
    beforeEach(async function() {
      const items = ['option 1', 'option 2'];
      autocompleteElem.autocompleteRequest = function(params, callback) {
        const regx = new RegExp(`^${params.query}`, 'i');
        callback(items.filter(function(item) {
          return regx.test(item);
        }));
      };
      input.focus();
      await sendKeys({ type: 'op' });
      await nextFrame();
      setTimeout(() => clearButton.click());
    });

    it(`should fire a clear event`, async function() {
      await oneEvent(autocompleteElem, 'pfe-autocomplete:option-cleared') as unknown as AutocompleteClearEvent;
    });

    /** @deprecated */
    it(`should fire a pfe-autocomplete:option-cleared event`, async function() {
      await oneEvent(autocompleteElem, 'pfe-autocomplete:option-cleared');
    });
  });

  it('should set selected-value attribute after user click on an option', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;
    await nextFrame();
    const option = droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)')!;

    option.click();
    await nextFrame();
    expect(autocompleteElem.getAttribute('selected-value')).to.eql('option 2');
  });

  it('should update inputbox value when setting the init-value', async function() {
    autocompleteElem.initValue = 'foo';
    await nextFrame();
    expect(input.value).to.be.equal('foo');
  });

  it('should add active class on first element on keydown when dropdown is open', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;

    await autocompleteElem.updateComplete;
    await droplistElem.updateComplete;
    await nextFrame();

    input.focus();
    await sendKeys({ up: 'ArrowDown' });

    await autocompleteElem.updateComplete;
    await droplistElem.updateComplete;
    await nextFrame();

    const option = droplistElem.shadowRoot!.querySelector('li:nth-child(1)')!;

    expect(option.classList.contains('active')).to.be.true;
  });

  it(`should add aria-selected true on first element on keydown when dropdown is open`, async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;

    await nextFrame();
    input.focus();
    await sendKeys({ up: 'ArrowDown' });
    await nextFrame();

    const option = droplistElem.shadowRoot!.querySelector('li:nth-child(1)')!;
    expect(option.hasAttribute('aria-selected')).to.be.true;
  });

  it('should set aria-expanded to true when dropdown is open', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;

    await nextFrame();
    input.focus();
    await sendKeys({ up: 'ArrowDown' });
    await nextFrame();

    expect(input.hasAttribute('aria-expanded')).to.be.eql(true);
  });

  it('should update items list on mutation', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;
    await nextFrame();
    expect(droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)')!.innerText)
      .to.equal('option 2');
  });

  it('hides dropdown content when an option is selected', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;

    await nextFrame();

    const option = droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)');
    option!.click();

    await nextFrame();
    expect(droplistElem.open).to.be.false;
  });

  it('hides dropdown content when an option is clicked', async function() {
    autocompleteElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;
    await nextFrame();
    const option = droplistElem.shadowRoot!.querySelector<HTMLElement>('li:nth-child(2)');
    option!.click();

    await nextFrame();
    expect(droplistElem.open).to.be.false;
  });

  it('should trigger a console error if there is no light DOM', async function() {
    const spy = sinon.spy(console, 'error');
    const autocompleteNoLightDOM = await createFixture<PfeAutocomplete>(TEMPLATES.nolightdom);
    autocompleteNoLightDOM.innerHTML = '';

    await nextFrame();

    expect(spy).to.have.been.calledWith(`pfe-autocomplete: There must be a input tag in the light DOM`);
    spy.restore();
  });

  it(`should trigger a console error if there isn't a input as the first child of the light DOM`, async function() {
    const spy = sinon.spy(console, 'error');
    const autocompleteBadLightDOM = await createFixture<PfeAutocomplete>(TEMPLATES.badlightdom);
    expect(autocompleteBadLightDOM).shadowDom.to.not.be.empty;

    expect(spy).to.have.been.calledWith(`pfe-autocomplete: The only child in the light DOM must be an input tag`);
    spy.restore();
  });

  it(`should use the provided aria-label instead of the fallback in the component`, async function() {
    await nextFrame();
    const autocompleteHasAriaLabel = await createFixture<PfeAutocomplete>(TEMPLATES.hasAriaLabel);

    const input = autocompleteHasAriaLabel.querySelector('input');
    expect(input!.getAttribute('aria-label')).to.equal('Buscar');
  });

  it('should allow an alternate aria-announce-template', async function() {
    const element =
      await createFixture<PfeAutocomplete>(TEMPLATES.hasAlternateAriaAnnounceTemplate);

    await element.updateComplete;
    const droplistElem: PfeSearchDroplist = element.shadowRoot!.querySelector('#dropdown')!;

    element.data = ['option 1', 'option 2'];
    droplistElem.open = true;

    await element.updateComplete;
    await droplistElem.updateComplete;
    await nextFrame();

    const { textContent } =
      droplistElem.shadowRoot!.querySelector('.suggestions-aria-help.sr-only')!;
    expect(textContent).to.be.eql('Hey! There are 2 options.');
  });

  it('should use the provided button text', async function() {
    const textualButton = await createFixture<PfeAutocomplete>(TEMPLATES.textualButton);

    const text =
      textualButton.shadowRoot!.querySelector('.search-button--textual')!.textContent!.trim();
    expect(text).to.eql('Click me!');
  });

  it('should use the fallback button text when an empty string provided', async function() {
    const textualButton = await createFixture<PfeAutocomplete>(TEMPLATES.textualButton);

    textualButton.setAttribute('button-text', '');
    await textualButton.updateComplete;
    await nextFrame();
    const text =
      textualButton.shadowRoot!.querySelector('.search-button--textual')!.textContent!.trim();

    expect(text).to.eql('Search');
  });

  describe('loading indicator', function() {
    it('should display the loading indicator when open is true', async function() {
      await sendKeys({ press: 'Tab' });
      await sendKeys({ type: 'web components' });
      autocompleteElem.loading = true;
      await autocompleteElem.updateComplete;
      expect(loadingIndicator.hasAttribute('hidden')).to.be.false;
    });

    it('should not display the loading indicator if the user has not typed in the input', async function() {
      await sendKeys({ press: 'Tab' });
      autocompleteElem.loading = true;
      await autocompleteElem.updateComplete;
      expect(loadingIndicator.hasAttribute('hidden')).to.be.true;
    });
  })

  it('should call autocompleteRequest when the user types in the input', async function() {
    const mockResults = ['web', 'components', 'web components', 'web development'];
    autocompleteElem.autocompleteRequest = function(params, callback) {
      autocompleteElem.loading = true;
      setTimeout(() => {
        callback(mockResults);
        autocompleteElem.loading = false;
      }, 300);
    };
    await sendKeys({ press: 'Tab' });
    await sendKeys({ type: 'web components' });
    // This is needed to account for the debounce delay in executing
    // the autocompleteRequest callback.
    await new Promise(resolve => setTimeout(resolve, 500));
    // Expect that the loading indicator is present and dropdown
    // list has not yet been opened
    expect(autocompleteElem.loading).to.be.true;
    expect(droplistElem.open).to.be.false;

    // Now wait for the mockResults callback to execute
    await new Promise(resolve => setTimeout(resolve, 100));
    // Expect that the loading indicator is gone and dropdown
    // list has been opened and populated with the correct data.
    expect(autocompleteElem.loading).to.be.false;
    expect(droplistElem.open).to.be.true;
    // compare that the array values are equal.
    expect(droplistElem.data.join('')).to.equal(mockResults.join(''));
  });
});
