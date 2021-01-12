const slots = {
    icon: {
        name: "pfe-clipboard--icon",
        class: "pfe-clipboard__icon",
        defaultContent: `<svgxmlns="http://www.w3.org/2000/svg"width="16"height="16"viewBox="0015.27716"><defs></defs><gtransform="translate(-2.077-1.807)"><pathclass="a"d="M15.34,2.879a3.86,3.86,0,0,0-5.339,0L6.347,6.545a3.769,3.769,0,0,0,0,5.339.81.81,0,0,0,1.132,0,.823.823,0,0,0,0-1.145A2.144,2.144,0,0,1,7.5,7.677l3.641-3.654a2.161,2.161,0,1,1,3.049,3.062l-.8.8a.811.811,0,1,0,1.145,1.132l.8-.8a3.769,3.769,0,0,0,0-5.339Z"transform="translate(0.9060)"></path><pathclass="a"d="M10.482,6.822a.823.823,0,0,0,0,1.145,2.161,2.161,0,0,1,0,3.049L7.343,14.155a2.161,2.161,0,0,1-3.062,0,2.187,2.187,0,0,1,0-3.062l.193-.116a.823.823,0,0,0,0-1.145.811.811,0,0,0-1.132,0l-.193.193a3.86,3.86,0,0,0,0,5.339,3.86,3.86,0,0,0,5.339,0l3.126-3.139A3.731,3.731,0,0,0,12.72,9.562a3.769,3.769,0,0,0-1.094-2.74A.823.823,0,0,0,10.482,6.822Z"transform="translate(01.37)"></path></g></svg>`
    },
    text: {
        name: "pfe-clipboard--text",
        class: "pfe-clipboard__text",
        defaultContent: "Copy URL"
    },
    textSuccess: {
        name: "pfe-clipboard--text--success",
        class: "pfe-clipboard__text--success",
        defaultContent: "Copied"
    }
}

suite("<pfe-clipboard>", () => {
    let clipboard;

    suiteSetup(() => {
        clipboard = fixture("pfe-clipboard-fixture");
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
        const defaultSlot = `You can totally click to copy url`;
        const textSuccessSlot = `<span slot="pfe-clipboard--text--success">Making some copies!</span>`;
        const iconSlot = `<pfe-icon slot="pfe-clipboard--icon" icon="web-icon-globe" color="darker"></pfe-icon>`;
        clipboard.innerHTML = `
            ${defaultSlot}
            ${textSuccessSlot}
            ${iconSlot}
        `;
        flush(() => {
            // transposeSlot should have sent it to the text named slot
            assert.equal(clipboard.shadowRoot.querySelector(`#text`).assignedNodes({ flatten: true }).map(i => i.textContent.trim()).join(""), defaultSlot);
            // The text--success and icon slots should be working as expected also
            assert.equal(clipboard.shadowRoot.querySelector(`#text--success`).assignedNodes({ flatten: true }).map(i => i.outerHTML.trim()).join(""), textSuccessSlot);
            assert.equal(clipboard.shadowRoot.querySelector(`#icon`).assignedNodes({ flatten: true }).map(i => i.outerHTML.trim()).join(""), iconSlot);
            done();
        });
    });

    test(`should hide the icon when the no-icon attribute set.`, done => {
        // Activate the no-icon boolean property
        clipboard.setAttribute("no-icon", true);
        flush(() => {
            // The icon slot should not be present in the shadowRoot
            assert.equal(clipboard.shadowRoot.querySelector(`#icon`), null);
            done();
        });
    });

    test(`should hide the icon when the no-icon attribute set.`, done => {
        // Activate the no-icon boolean property
        clipboard.setAttribute("no-icon", true);
        flush(() => {
            // The icon slot should not be present in the shadowRoot
            assert.equal(clipboard.shadowRoot.querySelector(`#icon`), null);
            done();
        });
    });
});
