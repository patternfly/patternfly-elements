import * as MockInteractions from "/components/@polymer/iron-test-helpers/mock-interactions.js";

describe('<pfe-autocomplete>', () => {
  let autocompleteElem,
    input,
    clearButton,
    searchButton,
    droplistElem;

  // function to run before each test within this suite.
  beforeEach(function() {
    autocompleteElem = fixture('autocomplete');
    clearButton = autocompleteElem._clearBtn;
    searchButton = autocompleteElem._searchBtn;
    droplistElem = autocompleteElem._dropdown;
  });

  afterEach(() => {
    autocompleteElem.initValue = "";
    droplistElem.data = [];
    droplistElem.reflow = true;
    droplistElem.open = false;
  });

  it('should hide x button when input box is empty', () => {
    assert.isTrue(clearButton.hidden);
  });

  it('should clear search when user press x button', done => {
    flush(() => {
      const input = autocompleteElem._input;
      input.value = "search-term";
      autocompleteElem._clear();
      assert.isTrue(clearButton.hidden);
      done();
    });
  });

  it('should close the overlay when user press x button', done => {
    flush(() => {
      const input = autocompleteElem._input;
      droplistElem.data = ['option 1', 'option 2'];
      droplistElem.reflow = true;
      droplistElem.open = true;
      let option = droplistElem.shadowRoot.querySelector('li:nth-child(2)');
      MockInteractions.tap(option);
      expect(input.value).to.be.eql('option 2');
      autocompleteElem._clear();
      expect(droplistElem.open).not.to.be.true;
      done();
    });
  });

  it('should fire pfe-autocomplete:search-event after click on search icon', (done) => {
    flush(() => {
      const input = autocompleteElem._input;
      input.value = "test";

      autocompleteElem.addEventListener("pfe-autocomplete:search-event", function(event) {
        assert.equal(event.detail.searchValue, "test");
        done();
      });

      autocompleteElem._search();
    });
  });

  it('should set selected-value attribute after after click on search icon', done => {
    flush(() => {
      const input = autocompleteElem._input;
      input.value = "test";
      autocompleteElem._search();
      expect(autocompleteElem.getAttribute('selected-value')).to.eql('test');
      done();
    });
  });

  it('should fire pfe-autocomplete:search-event after user click on an option', done => {
    flush(() => {
      droplistElem.data = ['option 1', 'option 2'];
      droplistElem.reflow = true;
      droplistElem.open = true;
      let option = droplistElem.shadowRoot.querySelector('li:nth-child(2)');

      autocompleteElem.addEventListener("pfe-autocomplete:search-event", function(event) {
        assert.equal(event.detail.searchValue, "option 2");
        done();
      });

      MockInteractions.tap(option);
    });
  });

  it('should fire a pfe-autocomplete:option-selected event when a user selects an option in the droplist with the enter key', done => {
    flush(() => {
      const input = autocompleteElem._input;
      droplistElem.data = ['option 1', 'option 2'];
      droplistElem.reflow = true;
      droplistElem.open = true;
      input.focus();

      autocompleteElem.addEventListener("pfe-autocomplete:option-selected", function(event) {
        assert.equal(event.detail.optionValue, "option 1");
        done();
      });

      MockInteractions.keyUpOn(input, 40);
      MockInteractions.keyUpOn(input, 13);
    });
  });

  it('should fire a pfe-autocomplete:option-selected event when a user selects an option in the droplist with the mouse', done => {
    flush(() => {
      droplistElem.data = ['option 1', 'option 2'];
      droplistElem.reflow = true;
      droplistElem.open = true;
      let option = droplistElem.shadowRoot.querySelector('li:nth-child(2)');

      autocompleteElem.addEventListener("pfe-autocomplete:option-selected", function(event) {
        assert.equal(event.detail.optionValue, "option 2");
        done();
      });

      MockInteractions.tap(option);
    });
  });

  it('should fire a pfe-autocomplete:options-shown event when the droplist is shown to the user', done => {
    flush(() => {
      const items = ['option 1', 'option 2'];

      autocompleteElem.autocompleteRequest = function(params, callback) {
        const regx = new RegExp("\^" + params.query, "i");
        callback(items.filter(function (item) {
          return regx.test(item);
        }));
      };

      autocompleteElem.addEventListener("pfe-autocomplete:options-shown", function(event) {
        assert.isTrue(droplistElem.hasAttribute("open"));
        done();
      });

      autocompleteElem._sendAutocompleteRequest("o");
    });
  });

  it('should set selected-value attribute after user click on an option', done => {
    flush(() => {
      droplistElem.data = ['option 1', 'option 2'];
      droplistElem.reflow = true;
      droplistElem.open = true;
      let option = droplistElem.shadowRoot.querySelector('li:nth-child(2)');

      MockInteractions.tap(option);
      expect(autocompleteElem.getAttribute('selected-value')).to.eql('option 2');
      done();
    });
  });

  it('should update inputbox value when setting the init-value', done => {
    flush(() => {
      const input = autocompleteElem._input;
      autocompleteElem.initValue = 'foo';
      expect(input.value).to.be.equal('foo');
      done();
    });
  });

  it('should add active class on first element on keydown when dropdown is open', done => {
    flush(() => {
      const input = autocompleteElem._input;
      droplistElem.data = ['option 1', 'option 2'];
      droplistElem.reflow = true;
      droplistElem.open = true;
      input.focus();

      input.addEventListener('keyup', (e) => {
        let option = droplistElem.shadowRoot.querySelector('li:nth-child(1)');

        window.setTimeout(() => {
          expect(option.classList.contains('active')).to.be.eql(true);
          done();
        }, 1000);
      });

      MockInteractions.keyUpOn(input, 40);
    });
  });

  it('should update items list on mutation', () => {
    droplistElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;
    expect(droplistElem.shadowRoot.querySelector('li:nth-child(2)').innerText).to.be.eql('option 2');
  });

  it('hides dropdown content when an option is selected', done => {
    flush(() => {
      droplistElem.data = ['option 1', 'option 2'];
      droplistElem.reflow = true;
      droplistElem.open = true;

      let option = droplistElem.shadowRoot.querySelector('li:nth-child(2)');
      MockInteractions.tap(option);

      setTimeout(function() {
        expect(droplistElem.open).to.be.eql(false);
        done();
      }, 1000);
    });
  });

  it('hides dropdown content when an option is clicked', () => {
    droplistElem.data = ['option 1', 'option 2'];
    droplistElem.reflow = true;
    droplistElem.open = true;
    let option = droplistElem.shadowRoot.querySelector('li:nth-child(2)');
    MockInteractions.tap(autocompleteElem.parentNode);

    setTimeout(function() {
      expect(droplistElem.open).to.be.eql(false);
    }, 1000);
  });

  it("should trigger a console error if there is no light DOM", done => {
    const spy = sinon.spy(console, "error");
    const autocompleteNoLightDOM = fixture('nolightdom');
    autocompleteNoLightDOM.innerHTML = "";

    flush(() => {
      sinon.assert.calledWith(spy,`pfe-autocomplete: There must be a input tag in the light DOM`);
      console.error.restore();
      done();
    });
  });

  it("should trigger a console error if there isn't a input as the first child of the light DOM", done => {
    const spy = sinon.spy(console, "error");
    const autocompleteBadLightDOM = fixture("badlightdom");

    flush(() => {
      sinon.assert.calledWith(spy, `pfe-autocomplete: The only child in the light DOM must be an input tag`);
      console.error.restore();
      done();
    })
  });

  it("should use the provided aria-label instead of the fallback in the component", done => {
    const autocompleteHasAriaLabel = fixture("hasAriaLabel");

    flush(() => {
      const input = autocompleteHasAriaLabel._input;
      expect(input.getAttribute("aria-label")).to.eql("Buscar");
      done();
    });
  });

  it("should allow an alternate aria-announce-template", done => {
    const hasAlternateAriaAnnounceTemplate = fixture("hasAlternateAriaAnnounceTemplate");
    const templateText = hasAlternateAriaAnnounceTemplate.getAttribute("aria-announce-template");

    flush(() => {
      const input = hasAlternateAriaAnnounceTemplate._input;
      const droplistElem = hasAlternateAriaAnnounceTemplate._dropdown;

      droplistElem.data = ['option 1', 'option 2'];
      droplistElem.reflow = true;
      droplistElem.open = true;
      input.focus();

      input.addEventListener('keyup', (e) => {
        window.setTimeout(() => {
          const ariaAnnounceText = droplistElem.shadowRoot.querySelector(".suggestions-aria-help.sr-only").textContent;
          expect(ariaAnnounceText).to.be.eql("Hey! There are 2 options.");
          done();
        }, 0);
      });

      MockInteractions.keyUpOn(input, 40);
    });
  });
});