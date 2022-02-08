import type { SinonSpy } from 'sinon';

import { expect, oneEvent, html, aTimeout, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { spy } from 'sinon';
import { sendKeys } from '@web/test-runner-commands';

// Import the element we're testing.
import { PfeAccordion } from '@patternfly/pfe-accordion';
import { PfeAccordionPanel } from '@patternfly/pfe-accordion/pfe-accordion-panel.js';
import { PfeAccordionHeader } from '@patternfly/pfe-accordion/pfe-accordion-header.js';

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const testElement = html`
  <pfe-accordion>
    <pfe-accordion-header id="header1" data-header="1">
      <h3>Consetetur sadipscing elitr?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel id="panel1" data-panel="1">
      <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
    </pfe-accordion-panel>

    <pfe-accordion-header data-header="2">
      <h3>Labore et dolore magna aliquyam erat?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel data-panel="2">
      <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
    </pfe-accordion-panel>

    <pfe-accordion-header data-header="3">
      <h3>Incididunt in Lorem voluptate eiusmod dolor?</h3>
    </pfe-accordion-header>
    <pfe-accordion-panel data-panel="3">
      <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
    </pfe-accordion-panel>
  </pfe-accordion>
`;

describe('<pfe-accordion>', function() {
  beforeEach(function() {
    spy(console, 'warn');
  });

  afterEach(function() {
    (console.warn as SinonSpy).restore(); // eslint-disable-line no-console
  });

  it('should upgrade pfe-accordion', async function() {
    const element = await createFixture<PfeAccordion>(html`<pfe-accordion></pfe-accordion>`);
    expect(element, 'pfe-accordion should be an instance of PfeAccordion')
      .to.be.an.instanceof(customElements.get('pfe-accordion'))
      .and
      .to.be.an.instanceof(PfeAccordion);
  });

  it('should expand a panel when a header is selected', async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);
    const header = pfeAccordion.querySelector('pfe-accordion-header')!;
    const panel = pfeAccordion.querySelector('pfe-accordion-panel')!;

    header.click();

    await aTimeout(100);

    expect(header.button?.getAttribute('aria-expanded')).to.equal('true');
    expect(header.expanded).to.be.true;
    expect(panel.hasAttribute('expanded')).to.be.true;
    expect(panel.expanded).to.be.true;
  });

  it('should collapse a panel when an already expanded header is selected', async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);
    const header = pfeAccordion.querySelector('pfe-accordion-header')!;
    const panel = pfeAccordion.querySelector('pfe-accordion-panel')!;

    // expand the first panel
    header.click();

    await header.updateComplete;
    await pfeAccordion.updateComplete;

    // close it
    header.click();

    await header.updateComplete;
    await pfeAccordion.updateComplete;

    expect(header.button?.getAttribute('aria-expanded')).to.equal('false');
    expect(header.expanded).to.be.false;
    expect(panel.hasAttribute('expanded')).to.be.false;
    expect(panel.expanded).to.be.false;
  });

  it('should randomly generate ids for aria use', async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);
    // The first header and panel have existing IDs
    const secondHeader = pfeAccordion.querySelector('pfe-accordion-header:nth-of-type(2)')!;
    const secondPanel = pfeAccordion.querySelector('pfe-accordion-panel:nth-of-type(2)')!;

    await pfeAccordion.updateComplete;

    expect(secondHeader.id).to.match(/pfe-/);
    expect(secondPanel.id).to.match(/pfe-/);
  });

  it('should use the ids that are provided instead of generating new ones', async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);
    const header = pfeAccordion.querySelector('pfe-accordion-header')!;
    const panel = pfeAccordion.querySelector('pfe-accordion-panel')!;

    expect(header.id).to.equal('header1');
    expect(panel.id).to.equal('panel1');
  });

  /* API TESTS */
  it('should toggle a panel when toggle is called', async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);
    const secondHeader =
      pfeAccordion.querySelector<PfeAccordionHeader>('pfe-accordion-header:nth-of-type(2)')!;
    const secondPanel =
      pfeAccordion.querySelector<PfeAccordionPanel>('pfe-accordion-panel:nth-of-type(2)')!;

    pfeAccordion.toggle(1);

    await pfeAccordion.updateComplete;
    await secondHeader.updateComplete;
    await secondPanel.updateComplete;

    expect(secondHeader.button?.getAttribute('aria-expanded')).to.equal('true');
    expect(secondHeader.expanded).to.be.true;
    expect(secondPanel.hasAttribute('expanded')).to.be.true;
    expect(secondPanel.expanded).to.be.true;

    pfeAccordion.toggle(1);

    await pfeAccordion.updateComplete;
    await secondHeader.updateComplete;
    await secondPanel.updateComplete;

    expect(secondHeader.button?.getAttribute('aria-expanded')).to.equal('false');
    expect(secondHeader.expanded).to.be.false;
    expect(secondPanel.hasAttribute('expanded')).to.be.false;
    expect(secondPanel.expanded).to.be.false;
  });

  it('should expand a panel when expand is called', async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);
    const secondHeader =
      pfeAccordion.querySelector<PfeAccordionHeader>('pfe-accordion-header:nth-of-type(2)')!;
    const secondPanel =
      pfeAccordion.querySelector<PfeAccordionPanel>('pfe-accordion-panel:nth-of-type(2)')!;

    pfeAccordion.expand(1);

    await pfeAccordion.updateComplete;
    await secondHeader.updateComplete;
    await secondPanel.updateComplete;

    expect(secondHeader.button?.getAttribute('aria-expanded')).to.equal('true');
    expect(secondHeader.expanded).to.be.true;
    expect(secondPanel.hasAttribute('expanded')).to.be.true;
    expect(secondPanel.expanded).to.be.true;
  });

  it('should collapse a panel when collapse is called', async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);
    const secondHeader =
      pfeAccordion.querySelector<PfeAccordionHeader>('pfe-accordion-header:nth-of-type(2)')!;
    const secondPanel =
      pfeAccordion.querySelector<PfeAccordionPanel>('pfe-accordion-panel:nth-of-type(2)')!;

    pfeAccordion.expand(1);
    pfeAccordion.collapse(1);

    await pfeAccordion.updateComplete;
    await secondHeader.updateComplete;
    await secondPanel.updateComplete;

    expect(secondHeader.button?.getAttribute('aria-expanded')).to.equal('false');
    expect(secondHeader.expanded).to.be.false;
    expect(secondPanel.hasAttribute('expanded')).to.be.false;
    expect(secondPanel.expanded).to.be.false;
  });

  it('should expand all panels when expandAll is called', async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);
    const headers = Array.from(pfeAccordion.querySelectorAll('pfe-accordion-header'));
    const panels = Array.from(pfeAccordion.querySelectorAll('pfe-accordion-panel'));

    pfeAccordion.expandAll();

    await pfeAccordion.updateComplete;
    await Promise.all(headers.map(x => x.updateComplete));
    await Promise.all(panels.map(x => x.updateComplete));

    headers.forEach(header => {
      expect(header.button?.getAttribute('aria-expanded')).to.equal('true');
      expect(header.expanded).to.be.true;
    });

    panels.forEach(panel => {
      expect(panel.hasAttribute('expanded')).to.be.true;
      expect(panel.expanded).to.be.true;
    });
  });

  it('should collapse all panels when collapseAll is called', async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);
    const headers = Array.from(pfeAccordion.querySelectorAll('pfe-accordion-header'));
    const panels = Array.from(pfeAccordion.querySelectorAll('pfe-accordion-panel'));

    pfeAccordion.expandAll();
    await pfeAccordion.updateComplete;
    await Promise.all(headers.map(x => x.updateComplete));
    await Promise.all(panels.map(x => x.updateComplete));

    pfeAccordion.collapseAll();
    await pfeAccordion.updateComplete;
    await Promise.all(headers.map(x => x.updateComplete));
    await Promise.all(panels.map(x => x.updateComplete));

    headers.forEach(header => {
      expect(header.button?.getAttribute('aria-expanded')).to.equal('false');
      expect(header.expanded).to.be.false;
    });

    panels.forEach(panel => {
      expect(panel.hasAttribute('expanded')).to.be.false;
      expect(panel.expanded).to.be.false;
    });
  });

  /* EVENT TESTS */
  it('should fire a pfe-accordion:change event when a header is clicked', async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);
    const header = pfeAccordion.querySelector('pfe-accordion-header')!;
    // const panel = pfeAccordion.querySelector('pfe-accordion-panel');

    setTimeout(() => header.click(), 100);

    const { detail } = await oneEvent(pfeAccordion, 'pfe-accordion:change');

    expect(detail).to.deep.equal({
      expanded: true,
      toggle: header,
    });
  });

  /* ATTRIBUTE TESTS */
  it('should open the items listed in the expanded-index attribute', async function() {
    const element = await createFixture<PfeAccordion>(testElement);
    const headers = Array.from(element.children).filter(PfeAccordion.isHeader);
    element.setAttribute('expanded-index', '2,3');

    // Wait until the animation is complete
    await oneEvent(element, 'transitionend');

    await element.updateComplete;
    await Promise.all(headers.map(x => x.updateComplete));

    [2, 3].forEach(idx => {
      const header = headers[idx - 1];
      expect(header.expanded).to.be.true;
      expect(header.hasAttribute('expanded')).to.be.true;

      const panel = header.nextElementSibling;
      if (!(panel instanceof PfeAccordionPanel)) {
        return expect.fail('panel was not a <pfe-accordion-panel>');
      }
      expect(panel.expanded).to.be.true;
      expect(panel.hasAttribute('expanded')).to.be.true;
    });
  });

  /* CONSOLE VALIDATION */
  it(`should add a warning in the console if a pfe-accordion-header lightdom is not a heading level tag`, async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(`
      <pfe-accordion id="badHeader">
        <pfe-accordion-header id="bad-header-element">
          Bad Header
        </pfe-accordion-header>
        <pfe-accordion-panel>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </pfe-accordion-panel>
      </pfe-accordion>`);

    await pfeAccordion.updateComplete;

    expect(console.warn) // eslint-disable-line no-console
      .to.have.been.calledOnceWith(`[pfe-accordion-header#bad-header-element]`, 'Header should contain at least 1 heading tag for correct semantics.');
  });

  /* DISCLOSURE TESTS */
  it('should render as disclosure if there is only one header in an accordion', async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(html`
      <pfe-accordion>
        <pfe-accordion-header>
          <h2>Header</h2>
        </pfe-accordion-header>
        <pfe-accordion-panel>
          Panel
        </pfe-accordion-panel>
      </pfe-accordion>`);

    const headers = Array.from(pfeAccordion.querySelectorAll('pfe-accordion-header'));
    const panels = Array.from(pfeAccordion.querySelectorAll('pfe-accordion-panel'));

    expect(headers.length).to.equal(1);
    expect(panels.length).to.equal(1);

    const [header] = headers;
    const [panel] = panels;

    await aTimeout(10);

    await pfeAccordion.updateComplete;
    await header.updateComplete;
    await panel.updateComplete;

    expect(header.getAttribute('disclosure'), 'header').to.equal('true');
    expect(panel.getAttribute('disclosure'), 'panel').to.equal('true');
  });

  it(`should not render as a disclosure if the disclosure attribute is set to false and there is only one header`, async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(html`
      <pfe-accordion disclosure="false">
        <pfe-accordion-header>
          <h2>Header</h2>
        </pfe-accordion-header>
        <pfe-accordion-panel>
          Panel
        </pfe-accordion-panel>
      </pfe-accordion>`);

    await pfeAccordion.updateComplete;

    const header = pfeAccordion.querySelector('pfe-accordion-header')!;
    const panel = pfeAccordion.querySelector('pfe-accordion-panel')!;

    await aTimeout(100);

    expect(header.getAttribute('disclosure'), 'header disclosure').to.equal('false');
    expect(panel.getAttribute('disclosure'), 'panel disclosure').to.equal('false');
  });

  it(`should switch from an accordion to a disclosure if the disclosure attribute switches from false to true`, async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);
    const header = pfeAccordion.querySelector('pfe-accordion-header')!;
    const panel = pfeAccordion.querySelector('pfe-accordion-panel')!;

    pfeAccordion.disclosure = 'false';

    await aTimeout(50);

    pfeAccordion.disclosure = 'true';

    await aTimeout(50);

    expect(header.getAttribute('disclosure'), 'header disclosure').to.equal('true');
    expect(panel.getAttribute('disclosure'), 'panel disclosure').to.equal('true');
  });

  it(`should switch to a disclosure if an accordion loses children and only one header is left`, async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);

    const header = pfeAccordion.querySelector('pfe-accordion-header')!;
    const panel = pfeAccordion.querySelector('pfe-accordion-panel')!;

    const elementsToRemove = Array.from(
      pfeAccordion.querySelectorAll(
        ':is(pfe-accordion-header, pfe-accordion-panel):not(:first-of-type)'
      ),
    );

    elementsToRemove.forEach(element => pfeAccordion.removeChild(element));

    await aTimeout(50);

    expect(pfeAccordion.getAttribute('disclosure'), 'accordion disclosure').to.equal('true');
    expect(header.getAttribute('disclosure'), 'header disclosure').to.equal('true');
    expect(panel.getAttribute('disclosure'), 'panel disclosue').to.equal('true');
  });

  it(`should switch to an accordion from a disclosure if the accordion gains more than one header`, async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(html`
      <pfe-accordion>
        <pfe-accordion-header>
          <h2>Header</h2>
        </pfe-accordion-header>
        <pfe-accordion-panel>Panel</pfe-accordion-panel>
      </pfe-accordion>
    `);

    expect(pfeAccordion.getAttribute('disclosure')).to.equal('true');

    const newHeader = document.createElement('pfe-accordion-header');
    newHeader.innerHTML = `<h2>New Header</h2>`;

    const newPanel = document.createElement('pfe-accordion-panel');
    newPanel.innerHTML = `New Panel`;

    pfeAccordion.appendChild(newHeader);
    pfeAccordion.appendChild(newPanel);

    await aTimeout(50);

    expect(pfeAccordion.getAttribute('disclosure')).to.equal('false');
  });

  it('should properly initialize any dynamically added headers and panels', async function() {
    const pfeAccordion = await createFixture<PfeAccordion>(testElement);

    const newHeader = document.createElement('pfe-accordion-header');
    newHeader.id = 'newHeader';
    newHeader.innerHTML = `<h2>New Header</h2>`;

    const newPanel = document.createElement('pfe-accordion-panel');
    newPanel.id = 'newPanel';
    newPanel.innerHTML = `New Panel`;

    pfeAccordion.appendChild(newHeader);
    pfeAccordion.appendChild(newPanel);

    await pfeAccordion.updateComplete;

    await pfeAccordion.updateComplete;
    await newHeader.updateComplete;
    await newPanel.updateComplete;

    expect(newHeader.hasAttribute('id')).to.be.true;
    expect(newHeader.getAttribute('aria-controls'))
      .to.equal(newPanel.getAttribute('id'));

    expect(newPanel.getAttribute('role')).to.equal('region');
    expect(newPanel.hasAttribute('id')).to.be.true;
    expect(newPanel.getAttribute('aria-labelledby'))
      .to.equal(newHeader.getAttribute('id'));
  });

  // @TODO: Write the following tests

  // Validate that the is-navigation attribute triggers spacebar events to open the accordion
  // Validate that the is-navigation attribute turns off the up/down arrow functionality
  // Validate that the is-direct-link attribute on an accordion header acts like a link on click
  // Validate that the is-direct-link attribute throws a warning if it doesn't contain a link
  // -> pfe-accordion-header: This component expects to find a link in the light DOM due to the "is-direct-link" attribute

  /**
   * @see https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html
   */
  describe('for assistive technology', function() {
    let element: PfeAccordion;

    let header1: PfeAccordionHeader;
    let header2: PfeAccordionHeader;
    let header3: PfeAccordionHeader;

    let panel1: PfeAccordionPanel;
    let panel2: PfeAccordionPanel;
    let panel3: PfeAccordionPanel;

    function press(press: string) {
      return async function() {
        await sendKeys({ press });
        await element.updateComplete;
        await nextFrame();
      };
    }

    beforeEach(async function() {
      element = await createFixture<PfeAccordion>(testElement);
      [header1, header2, header3] = element.querySelectorAll('pfe-accordion-header');
      [panel1, panel2, panel3] = element.querySelectorAll('pfe-accordion-panel');
    });

    afterEach(async function() {
      [header1, header2, header3] = [] as PfeAccordionHeader[];
      [panel1, panel2, panel3] = [] as PfeAccordionPanel[];
    });

    describe('with all panels closed', function() {
      it('applies hidden attribute to all panels', function() {
        expect(panel1.hidden, 'panel1').to.be.true;
        expect(panel2.hidden, 'panel2').to.be.true;
        expect(panel3.hidden, 'panel3').to.be.true;
      });
    });

    describe('with all panels open', function() {
      beforeEach(async function() {
        for (const header of element.querySelectorAll('pfe-accordion-header')) {
          header.click();
        }
        await nextFrame();
      });
      it('removes hidden attribute from all panels', function() {
        expect(panel1.hidden, 'panel1').to.be.false;
        expect(panel2.hidden, 'panel2').to.be.false;
        expect(panel3.hidden, 'panel3').to.be.false;
      });
    });

    describe('when focus is on the first header', function() {
      beforeEach(async function() {
        header1.focus();
        await nextFrame();
      });

      describe('Space', function() {
        beforeEach(press(' '));
        it('expands the first panel', function() {
          expect(panel1.expanded).to.be.true;
          expect(panel2.expanded).to.be.false;
          expect(panel3.expanded).to.be.false;
        });
        it('removes hidden attribute from the first panel', function() {
          expect(panel1.hidden, 'panel1').to.be.false;
          expect(panel2.hidden, 'panel2').to.be.true;
          expect(panel3.hidden, 'panel3').to.be.true;
        });
      });

      describe('Enter', function() {
        beforeEach(press('Enter'));
        it('expands the first panel', function() {
          expect(panel1.expanded).to.be.true;
          expect(panel2.expanded).to.be.false;
          expect(panel3.expanded).to.be.false;
        });
      });

      describe('Tab', function() {
        beforeEach(press('Tab'));
        it('moves focus to the second header', function() {
          expect(document.activeElement).to.equal(header2);
        });
      });

      describe('Shift+Tab', function() {
        beforeEach(press('Shift+Tab'));
        it('moves focus to the body', function() {
          expect(document.activeElement).to.equal(document.body);
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        it('moves focus to the second header', function() {
          expect(document.activeElement).to.equal(header2);
        });
        it('does not open panels', function() {
          expect(panel1.expanded).to.be.false;
          expect(panel2.expanded).to.be.false;
          expect(panel3.expanded).to.be.false;
        });
      });

      describe('ArrowUp', function() {
        beforeEach(press('ArrowUp'));
        it('moves focus to the last header', function() {
          expect(document.activeElement).to.equal(header3);
        });
        it('does not open panels', function() {
          expect(panel1.expanded).to.be.false;
          expect(panel2.expanded).to.be.false;
          expect(panel3.expanded).to.be.false;
        });
      });

      describe('Home', function() {
        beforeEach(press('Home'));
        it('moves focus to the first header', function() {
          expect(document.activeElement).to.equal(header1);
        });
        it('does not open panels', function() {
          expect(panel1.expanded).to.be.false;
          expect(panel2.expanded).to.be.false;
          expect(panel3.expanded).to.be.false;
        });
      });

      describe('End', function() {
        beforeEach(press('End'));
        it('moves focus to the last header', function() {
          expect(document.activeElement).to.equal(header3);
        });
        it('does not open panels', function() {
          expect(panel1.expanded).to.be.false;
          expect(panel2.expanded).to.be.false;
          expect(panel3.expanded).to.be.false;
        });
      });
    });

    describe('when focus is on the middle header', function() {
      beforeEach(async function() {
        header2.focus();
        await nextFrame();
      });

      describe('Space', function() {
        beforeEach(press(' '));
        it('expands the middle panel', function() {
          expect(panel1.expanded).to.be.false;
          expect(panel2.expanded).to.be.true;
          expect(panel3.expanded).to.be.false;
        });
      });

      describe('Enter', function() {
        beforeEach(press('Enter'));
        it('expands the middle panel', function() {
          expect(panel1.expanded).to.be.false;
          expect(panel2.expanded).to.be.true;
          expect(panel3.expanded).to.be.false;
        });
      });

      describe('Tab', function() {
        beforeEach(press('Tab'));
        it('moves focus to the last header', function() {
          expect(document.activeElement).to.equal(header3);
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        it('moves focus to the last header', function() {
          expect(document.activeElement).to.equal(header3);
        });
      });

      describe('ArrowUp', function() {
        beforeEach(press('ArrowUp'));
        it('moves focus to the first header', function() {
          expect(document.activeElement).to.equal(header1);
        });
      });

      describe('Home', function() {
        beforeEach(press('Home'));
        it('moves focus to the first header', function() {
          expect(document.activeElement).to.equal(header1);
        });
      });

      describe('End', function() {
        beforeEach(press('End'));
        it('moves focus to the last header', function() {
          expect(document.activeElement).to.equal(header3);
        });
      });
    });

    describe('when focus is on the last header', function() {
      beforeEach(async function() {
        header3.focus();
        await nextFrame();
      });

      describe('Space', function() {
        beforeEach(press(' '));
        it('expands the last panel', function() {
          expect(panel1.expanded).to.be.false;
          expect(panel2.expanded).to.be.false;
          expect(panel3.expanded).to.be.true;
        });
        describe('then Space', function() {
          beforeEach(press(' '));
          it('collapses the last panel', function() {
            expect(panel1.expanded).to.be.false;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });
      });

      describe('Enter', function() {
        beforeEach(press('Enter'));
        it('expands the last panel', function() {
          expect(panel1.expanded).to.be.false;
          expect(panel2.expanded).to.be.false;
          expect(panel3.expanded).to.be.true;
        });
        describe('then Enter', function() {
          beforeEach(press('Enter'));
          it('collapses the last panel', function() {
            expect(panel1.expanded).to.be.false;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });
      });

      describe('Shift+Tab', function() {
        beforeEach(press('Shift+Tab'));
        it('moves focus to the link in middle header', function() {
          expect(document.activeElement).to.equal(header2);
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        it('moves focus to the first header', function() {
          expect(document.activeElement).to.equal(header1);
        });
      });

      describe('ArrowUp', function() {
        beforeEach(press('ArrowUp'));
        it('moves focus to the middle header', function() {
          expect(document.activeElement).to.equal(header2);
        });
      });

      describe('Home', function() {
        beforeEach(press('Home'));
        it('moves focus to the first header', function() {
          expect(document.activeElement).to.equal(header1);
        });
      });

      describe('End', function() {
        beforeEach(press('End'));
        it('moves focus to the last header', function() {
          expect(document.activeElement).to.equal(header3);
        });
      });
    });

    describe('when the first panel is expanded', function() {
      beforeEach(async function() {
        element.expand(0);
        await aTimeout(500);
      });

      describe('and focus is on the first header', function() {
        describe('Space', function() {
          beforeEach(press(' '));
          it('collapses the first panel', function() {
            expect(panel1.expanded).to.be.false;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });

        describe('Enter', function() {
          beforeEach(press('Enter'));
          it('collapses the first panel', function() {
            expect(panel1.expanded).to.be.false;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });

        describe('Tab', function() {
          beforeEach(press('Tab'));
          it('moves focus to the link in the first panel', function() {
            expect(document.activeElement).to.equal(panel1.querySelector('a'));
          });
          describe('Tab', function() {
            beforeEach(press('Tab'));
            it('moves focus to the second header', function() {
              expect(document.activeElement).to.equal(header2);
            });
            describe('Shift+Tab', function() {
              beforeEach(press('Shift+Tab'));
              it('keeps focus on the link in the first panel', function() {
                expect(document.activeElement).to.equal(panel1.querySelector('a'));
              });
            });
          });
          describe('Space', function() {
            beforeEach(press(' '));
            describe('ArrowDown', function() {
              beforeEach(press('ArrowDown'));
              it('keeps focus on the link in the first panel', function() {
                expect(document.activeElement).to.equal(panel1.querySelector('a'));
              });
              it('does not open other panels', function() {
                expect(panel1.expanded).to.be.true;
                expect(panel2.expanded).to.be.false;
                expect(panel3.expanded).to.be.false;
              });
            });

            describe('ArrowUp', function() {
              beforeEach(press('ArrowUp'));
              it('keeps focus on the link in the first panel', function() {
                expect(document.activeElement).to.equal(panel1.querySelector('a'));
              });
              it('does not open other panels', function() {
                expect(panel1.expanded).to.be.true;
                expect(panel2.expanded).to.be.false;
                expect(panel3.expanded).to.be.false;
              });
            });

            describe('Home', function() {
              beforeEach(press('Home'));

              it('keeps focus on the link in the first panel', function() {
                expect(document.activeElement).to.equal(panel1.querySelector('a'));
              });

              it('does not open other panels', function() {
                expect(panel1.expanded).to.be.true;
                expect(panel2.expanded).to.be.false;
                expect(panel3.expanded).to.be.false;
              });
            });

            describe('End', function() {
              beforeEach(press('End'));
              it('keeps focus on the link in the first panel', function() {
                expect(document.activeElement).to.equal(panel1.querySelector('a'));
              });
              it('does not open other panels', function() {
                expect(panel1.expanded).to.be.true;
                expect(panel2.expanded).to.be.false;
                expect(panel3.expanded).to.be.false;
              });
            });
          });
        });

        describe('Shift+Tab', function() {
          beforeEach(press('Shift+Tab'));
          it('moves focus to the body', function() {
            expect(document.activeElement).to.equal(document.body);
          });
        });

        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));

          it('moves focus to the second header', function() {
            expect(document.activeElement).to.equal(header2);
          });

          it('does not open other panels', function() {
            expect(panel1.expanded).to.be.true;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });

        describe('ArrowUp', function() {
          beforeEach(press('ArrowUp'));

          it('moves focus to the last header', function() {
            expect(document.activeElement).to.equal(header3);
          });

          it('does not open other panels', function() {
            expect(panel1.expanded).to.be.true;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });

        describe('Home', function() {
          beforeEach(press('Home'));
          it('moves focus to the first header', function() {
            expect(document.activeElement).to.equal(header1);
          });

          it('does not open other panels', function() {
            expect(panel1.expanded).to.be.true;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });

        describe('End', function() {
          beforeEach(press('End'));
          it('moves focus to the last header', function() {
            expect(document.activeElement).to.equal(header3);
          });
          it('does not open other panels', function() {
            expect(panel1.expanded).to.be.true;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });
      });

      describe('and focus is on the middle header', function() {
        beforeEach(press('Tab'));
        beforeEach(press('Tab'));

        describe('Shift+Tab', function() {
          beforeEach(press('Shift+Tab'));
          it('moves focus to the link in first panel', async function() {
            expect(document.activeElement).to.equal(panel1.querySelector('a'));
          });
        });
      });
    });

    describe('when the middle panel is expanded', function() {
      beforeEach(async function() {
        element.expand(1);
        await nextFrame();
        expect(panel2.expanded).to.be.true;
      });

      it('applies hidden attribute to the middle panel', function() {
        expect(panel1.hidden, 'panel1').to.be.true;
        expect(panel2.hidden, 'panel2').to.be.false;
        expect(panel3.hidden, 'panel3').to.be.true;
      });

      describe('and focus is on the middle header', function() {
        beforeEach(async function() {
          header2.focus();
          await nextFrame();
        });

        describe('Space', function() {
          beforeEach(press(' '));
          it('collapses the second panel', function() {
            expect(panel1.expanded).to.be.false;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });

        describe('Enter', function() {
          beforeEach(press('Enter'));
          it('collapses the second panel', function() {
            expect(panel1.expanded).to.be.false;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });

        describe('Tab', function() {
          beforeEach(press('Tab'));
          it('moves focus to the link in the second panel', function() {
            expect(document.activeElement).to.equal(panel2.querySelector('a'));
          });
        });

        describe('Shift+Tab', function() {
          beforeEach(press('Shift+Tab'));
          it('moves focus to the first header', function() {
            expect(document.activeElement).to.equal(header1);
          });
        });
      });

      describe('and focus is on the last header', function() {
        beforeEach(async function() {
          header3.focus();
          await nextFrame();
        });

        describe('Shift+Tab', function() {
          beforeEach(press('Shift+Tab'));
          it('moves focus to the link in middle panel', function() {
            expect(document.activeElement).to.equal(panel2.querySelector('a'));
          });
        });
      });
    });

    describe('when the last panel is expanded', function() {
      beforeEach(async function() {
        element.expand(2);
        await nextFrame();
        expect(panel3.expanded).to.be.true;
      });

      describe('when focus is on the last header', function() {
        beforeEach(async function() {
          header3.focus();
          await nextFrame();
        });

        describe('Tab', function() {
          beforeEach(press('Tab'));
          it('moves focus to the link in last panel', function() {
            expect(document.activeElement).to.equal(panel3.querySelector('a'));
          });
        });
      });
    });
  });
});

describe('<pfe-accordion-header>', function() {
  let header: PfeAccordionHeader;
  let panel: PfeAccordionPanel;
  beforeEach(async function() {
    const element = await createFixture<PfeAccordion>(testElement);
    panel = element.querySelector('pfe-accordion-panel')!;
    header = element.querySelector('pfe-accordion-header')!;
    await element.updateComplete;
    await panel.updateComplete;
    await header.updateComplete;
  });

  it('should upgrade pfe-accordion-header', function() {
    expect(header)
      .to.be.an.instanceof(customElements.get('pfe-accordion-header'))
      .and
      .to.be.an.instanceOf(PfeAccordionHeader);
  });

  it('must have an id', function() {
    expect(header.id).to.be.ok;
  });

  it('should add the aria-controls attribute corresponding to the header ID', function() {
    expect(header.getAttribute('aria-controls')).to.equal(panel.id);
  });
});

describe('<pfe-accordion-panel>', function() {
  let header: PfeAccordionHeader;
  let panel: PfeAccordionPanel;
  beforeEach(async function() {
    const element = await createFixture<PfeAccordion>(testElement);
    panel = element.querySelector('pfe-accordion-panel')!;
    header = element.querySelector('pfe-accordion-header')!;
    await element.updateComplete;
    await panel.updateComplete;
    await header.updateComplete;
  });

  it('should upgrade pfe-accordion-panel', function() {
    expect(panel)
      .to.be.an.instanceof(customElements.get('pfe-accordion-panel'))
      .and
      .to.be.an.instanceOf(PfeAccordionPanel);
  });

  it('must have an id', function() {
    expect(panel.id).to.be.ok;
  });

  it('should add the aria-labelledby attribute corresponding to the header ID', function() {
    expect(panel.getAttribute('aria-labelledby')).to.equal(header.id);
  });

  it('should set the role attribute to "region"', function() {
    expect(panel.getAttribute('role'), 'role').to.equal('region');
  });
});
