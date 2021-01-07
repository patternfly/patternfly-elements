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

/**
 * Get the contents of an active slot
 * @param {ASSIGNED_NODE_CONTENTS_TYPE} type 
 * @type {("text"|"outerHTML")} 
 */
const getAssignedNodeContents = (target, type = "text") => {
    if (typeof target.assignedNodes !== "undefined") {
        return target.assignedNodes().map(i => {
            if (type === "text") {
                return i.textContent.trim();
            }
            else if (type === "outHTML") {
                return i.outerHTML;
            }
            else {
                throw new Error(`getAssignedNodeContents type is not recognized.`);
            }
        }).join("");
    }
    else {
        return false;
    }
}

suite("<pfe-clipboard>", () => {
    let clipboard;

    suiteSetup(() => {
        clipboard = [...document.querySelectorAll("pfe-clipboard")];
    });

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-clipboard"),
            customElements.get("pfe-clipboard"),
            "pfe-clipboard should be an instance of pfeClipboard"
        );
    });

    test("it should render the default slot content.", done => {
        const clipboard = document.querySelector("#default");
        assert.equal(clipboard.shadowRoot.querySelector(`#text`).textContent, slots.text.defaultContent);
        assert.equal(clipboard.shadowRoot.querySelector(`#text--success`).textContent, slots.textSuccess.defaultContent);
        assert.equal(clipboard.shadowRoot.querySelector(`#icon`).innerHTML.replace(/\s/g, ""), slots.icon.defaultContent);
        done();
    });

    test("it should render slot overrides", done => {
        flush(() => {
            const clipboardCustomText = document.querySelector("#custom-text");
            const textSlot = clipboardCustomText.shadowRoot.querySelector(`#text`);
            const textSuccessSlot = clipboardCustomText.shadowRoot.querySelector(`#text--success`);
            const iconSlot = clipboardCustomText.shadowRoot.querySelector(`#icon`);
      
            assert.equal(textSlot.assignedNodes().map(i => i.textContent.trim()).join(""), "You can totally click to copy url");
            assert.equal(textSuccessSlot.assignedNodes().map(i => i.outerHTML.trim()).join(""), `<span slot="pfe-clipboard--text--success">Making some copies!</span>`);
            assert.equal(iconSlot.assignedNodes().map(i => i.outerHTML.trim()).join(""), `<span slot="pfe-clipboard--icon">⬇️</span>`);
            done();
        });
    });

    test("it should render slot overrides", done => {
        flush(() => {
            const clipboardCustomText = document.querySelector("#custom-text");
            const textSlot = clipboardCustomText.shadowRoot.querySelector(`#text`);
            const textSuccessSlot = clipboardCustomText.shadowRoot.querySelector(`#text--success`);
            const iconSlot = clipboardCustomText.shadowRoot.querySelector(`#icon`);
      
            assert.equal(textSlot.assignedNodes().map(i => i.textContent.trim()).join(""), "You can totally click to copy url");
            assert.equal(textSuccessSlot.assignedNodes().map(i => i.outerHTML.trim()).join(""), `<span slot="pfe-clipboard--text--success">Making some copies!</span>`);
            assert.equal(iconSlot.assignedNodes().map(i => i.outerHTML.trim()).join(""), `<span slot="pfe-clipboard--icon">⬇️</span>`);
            done();
        });
    });

    test(`should hide the icon when the no-icon attribute set.`, done => {
        flush(() => {
            const clipboard = document.querySelector("#default");
            assert.equal([...clipboard.shadowRoot.querySelectorAll(`.pfe-clipboard__icon`)].length, 1);

            const hiddenIcon = document.querySelector("#no-icon");
            assert.equal([...hiddenIcon.shadowRoot.querySelectorAll(`.pfe-clipboard__icon`)].length, 0);
            done();
        });
    });
});
