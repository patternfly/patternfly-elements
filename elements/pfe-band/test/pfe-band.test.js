import PfeBand from "../pfe-band.js";

const elementName = "pfe-band";
const className = "PfeBand";

const props = PfeBand.properties;

suite(`<${elementName}>`, () => {
    const bands = [...document.querySelectorAll(elementName)];
    // Get the browser page
    before(() => {
        return browser.url("/test");
    });

    test('it should upgrade', () => {
        return assert.instanceOf(
            bands[0],
            customElements.get(elementName,
            `${elementName} should be an instance of ${className}`)
        );
    });

    test("it should have a background color of gray", () => {
        return browser
            .getCssProperty(bands[0], "background-color")
            .then(bgcolor => expect( bgcolor.hex ).to.equal( "#d2d2d2" ));
    });

    // Loop over all the defined properties
    // Object.entries(props).forEach(attr => {
    //     console.dir(attr);
    //     test(`${attr[0]} is`, () => {
    //         return browser
    //             .getCssProperty(bands[0], "background-color")
    //             .then(bgcolor => expect( bgcolor.hex ).to.equal( "#ffffff" ));
    //     });
    // })

});