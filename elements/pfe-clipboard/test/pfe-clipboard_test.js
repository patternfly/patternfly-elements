// Converts a hex value to RGBA
const hexToRgb = hex => {
    const [, r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/.exec(hex);
      return [
          parseInt(r, 16),
          parseInt(g, 16),
          parseInt(b, 16)
        ];
  };

const slots = {
    icon: {
        name: "icon",
        class: "pfe-clipboard__icon",
        defaultContent: `<svgxmlns="http://www.w3.org/2000/svg"width="16"height="16"viewBox="0015.27716"><gtransform="translate(-2.077-1.807)"><pathclass="a"d="M15.34,2.879a3.86,3.86,0,0,0-5.339,0L6.347,6.545a3.769,3.769,0,0,0,0,5.339.81.81,0,0,0,1.132,0,.823.823,0,0,0,0-1.145A2.144,2.144,0,0,1,7.5,7.677l3.641-3.654a2.161,2.161,0,1,1,3.049,3.062l-.8.8a.811.811,0,1,0,1.145,1.132l.8-.8a3.769,3.769,0,0,0,0-5.339Z"transform="translate(0.9060)"></path><pathclass="a"d="M10.482,6.822a.823.823,0,0,0,0,1.145,2.161,2.161,0,0,1,0,3.049L7.343,14.155a2.161,2.161,0,0,1-3.062,0,2.187,2.187,0,0,1,0-3.062l.193-.116a.823.823,0,0,0,0-1.145.811.811,0,0,0-1.132,0l-.193.193a3.86,3.86,0,0,0,0,5.339,3.86,3.86,0,0,0,5.339,0l3.126-3.139A3.731,3.731,0,0,0,12.72,9.562a3.769,3.769,0,0,0-1.094-2.74A.823.823,0,0,0,10.482,6.822Z"transform="translate(01.37)"></path></g></svg>`
    },
    text: {
        name: "text",
        class: "pfe-clipboard__text",
        defaultContent: "Copy URL"
    },
    textSuccess: {
        name: "text--success",
        class: "pfe-clipboard__text--success",
        defaultContent: "Copied"
    }
}

suite("<pfe-clipboard>", () => {
    let clipboard;
    let clipboardEventTest;
    let clipboardStylesTest;
    let clipboardTransposeTest;
    let clipboardA11yTest;
    let clipboardCopiedDurationTest;

    suiteSetup(() => {
        clipboard = document.querySelector("#default");
        clipboardEventTest = document.querySelector("#event-test");
        clipboardStylesTest = document.querySelector("#styles-test");
        clipboardTransposeTest = document.querySelector("#transpose-test");
        clipboardA11yTest = document.querySelector("#a11y-test");
        clipboardCopiedDurationTest = document.querySelector("#copied-duration-test");
    });

    test('it should upgrade', () => {
        assert.instanceOf(clipboard, customElements.get("pfe-clipboard", 'pfe-clipboard should be an instance of PfeClipboard'));
    });

    test("it should render the default slot content.", done => {
        assert.equal(clipboard.shadowRoot.querySelector(`#text`).textContent, slots.text.defaultContent);
        assert.equal(clipboard.shadowRoot.querySelector(`#text--success`).textContent, slots.textSuccess.defaultContent);
        assert.equal(clipboard.shadowRoot.querySelector(`#icon`).innerHTML.replace(/\s/g, ""), slots.icon.defaultContent);
        done();
    });

    test("it should render slot overrides", done => {
        // The default slot override will be handled by transposeSlot
        const defaultSlot = `<span slot="text">You can totally click to copy url</span>`;
        const textSuccessSlot = `<span slot="text--success">Making some copies!</span>`;
        const iconSlot = `<pfe-icon slot="icon" icon="web-icon-globe" color="darker"></pfe-icon>`;
        clipboard.innerHTML = `
            ${defaultSlot}
            ${textSuccessSlot}
            ${iconSlot}
        `;
        flush(() => {
            // transposeSlot should have sent it to the text named slot
            assert.equal(clipboard.shadowRoot.querySelector(`#text`).assignedNodes({ flatten: true }).map(i => i.outerHTML.trim()).join(""), defaultSlot);
            // The text--success and icon slots should be working as expected also
            assert.equal(clipboard.shadowRoot.querySelector(`#text--success`).assignedNodes({ flatten: true }).map(i => i.outerHTML.trim()).join(""), textSuccessSlot);
            assert.equal(clipboard.shadowRoot.querySelector(`#icon`).assignedNodes({ flatten: true }).map(i => i.outerHTML.trim()).join(""), iconSlot);
            done();
        });
    });

    test(`it should hide the icon when the no-icon attribute set.`, done => {
        // Activate the no-icon boolean property
        clipboard.setAttribute("no-icon", true);
        flush(() => {
            // The icon slot should not be present in the shadowRoot
            assert.equal(clipboard.shadowRoot.querySelector(`#icon`), null);
            done();
        });
    });

    test(`it should have the correct text color settings for both copied and non-copied states`, done => {
        // Default text should be set the link variable
        assert.equal(getComputedStyle(clipboardStylesTest.shadowRoot.querySelector(`.pfe-clipboard__text`), null)["color"], `rgb(${hexToRgb("#0066cc").join(', ')})`);
        // Default text should be set the feedback--success variable
        assert.equal(getComputedStyle(clipboardStylesTest.shadowRoot.querySelector(`.pfe-clipboard__text--success`), null)["color"], `rgb(${hexToRgb("#3e8635").join(', ')})`);
        done();
    });

    test('it should fire a pfe-clipboard:copied event when clicked', done => {
        const handlerSpy = sinon.spy();
        // Give the current iframe focus
        window.focus();
        // Add global event listener for the copy event
        document.querySelector("body").addEventListener('pfe-clipboard:copied', handlerSpy);
        // Simulate click
        clipboardEventTest.click();
        flush(() => {
            // Get the event from the event listener callback
            const [event] = handlerSpy.getCall(0).args;
            // Make sure it was called only once
            sinon.assert.calledOnce(handlerSpy);
            // Assert that the event contains the url
            assert(event.detail.url);
            // reset
            document.querySelector("body").removeEventListener('pfe-clipboard:copied', handlerSpy);
            done();
        });
    });

    test(`it should have the correct accessibility attributes`, () => {
        // Add global event listener for the copy event
        assert.equal(clipboardA11yTest.getAttribute("role"), "button");
        assert.equal(clipboardA11yTest.getAttribute("tabindex"), 0);
    });

    test(`it should display the text--success state for 3 seconds`, done => {
        clipboardStylesTest.click();
        flush(() => {
            // There should be a copied attribute on the host
            assert.equal(clipboardStylesTest.hasAttribute("copied"), true);
            // The text should be hidden
            assert.equal(getComputedStyle(clipboardStylesTest.shadowRoot.querySelector(`.pfe-clipboard__text`), null)["display"], "none");
            // The text--success should be visible
            assert.equal(getComputedStyle(clipboardStylesTest.shadowRoot.querySelector(`.pfe-clipboard__text--success`), null)["display"], "block");

            // after 3 seconds it should return to normal
            setTimeout(() => {
                // There should be a copied attribute on the host
                assert.equal(clipboardStylesTest.hasAttribute("copied"), false);
                // The text should be hidden
                assert.equal(getComputedStyle(clipboardStylesTest.shadowRoot.querySelector(`.pfe-clipboard__text`), null)["display"], "block");
                // The text--success should be visible
                assert.equal(getComputedStyle(clipboardStylesTest.shadowRoot.querySelector(`.pfe-clipboard__text--success`), null)["display"], "none");
                done();
            }, 3001);
        })
    });

    test(`it should have a customizable copied state duration.`, done => {
        // Set the copied state duration to 1 second
        clipboardCopiedDurationTest.click();
        // Check to see if the success text
        setTimeout(() => {
            assert.equal(getComputedStyle(clipboardCopiedDurationTest.shadowRoot.querySelector(`.pfe-clipboard__text--success`), null)["display"], "block");
        }, 0);
        setTimeout(() => {
            assert.equal(getComputedStyle(clipboardCopiedDurationTest.shadowRoot.querySelector(`.pfe-clipboard__text--success`), null)["display"], "none");
            done();
        }, 2000);
    });
});
