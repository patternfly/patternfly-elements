import type { ReactiveElement } from 'lit';

import { expect, html, aTimeout, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { sendKeys } from '@web/test-runner-commands';

// Import the element we're testing.
import { PfAccordion, PfAccordionPanel, PfAccordionHeader } from '@patternfly/elements/pf-accordion/pf-accordion.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import '@patternfly/pfe-tools/test/stub-logger.js';
import { allUpdates } from '@patternfly/pfe-tools/test/utils.js';

describe('<pf-accordion>', function() {
  let element: PfAccordion;
  let headers: PfAccordionHeader[];
  let panels: PfAccordionPanel[];
  let header: PfAccordionHeader;
  let panel: PfAccordionPanel;
  let secondHeader: PfAccordionHeader;
  let secondPanel: PfAccordionPanel;

  async function clickFirstHeader() {
    header.click();
    await allUpdates(element);
  }

  async function clickSecondHeader() {
    secondHeader.click();
    await allUpdates(element);
  }

  async function callToggle(index: number) {
    element.toggle(index);
    await allUpdates(element);
  }

  async function callExpand(index: number) {
    element.expand(index);
    await allUpdates(element);
  }

  async function callCollapse(index: number) {
    element.collapse(index);
    await allUpdates(element);
  }

  async function callExpandAll() {
    element.expandAll();
    await allUpdates(element);
  }

  async function callCollapseAll() {
    element.collapseAll();
    await allUpdates(element);
  }

  function press(press: string) {
    return async function() {
      await sendKeys({ press });
      await allUpdates(element);
    };
  }

  it('simply instantiating', async function() {
    element = await createFixture<PfAccordion>(html`<pf-accordion></pf-accordion>`);
    expect(element, 'pf-accordion should be an instance of PfAccordion')
      .to.be.an.instanceof(customElements.get('pf-accordion'))
      .and
      .to.be.an.instanceof(PfAccordion);
  });

  describe('in typical usage', function() {
    beforeEach(async function() {
      element = await createFixture<PfAccordion>(html`
        <pf-accordion>
          <pf-accordion-header id="header1" data-index="0">
            <h3>Consetetur sadipscing elitr?</h3>
          </pf-accordion-header>
          <pf-accordion-panel id="panel1" data-index="0">
            <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
              ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
              rebum.</p>
          </pf-accordion-panel>
          <pf-accordion-header data-index="1">
            <h3>Labore et dolore magna aliquyam erat?</h3>
          </pf-accordion-header>
          <pf-accordion-panel data-index="1">
            <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
              ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
              rebum.</p>
          </pf-accordion-panel>
          <pf-accordion-header data-index="2">
            <h3>Incididunt in Lorem voluptate eiusmod dolor?</h3>
          </pf-accordion-header>
          <pf-accordion-panel data-index="2">
            <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
              ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
              rebum.</p>
          </pf-accordion-panel>
        </pf-accordion>
      `);
      headers = Array.from(element.querySelectorAll('pf-accordion-header'));
      panels = Array.from(element.querySelectorAll('pf-accordion-panel'));
      [header, secondHeader] = headers;
      [panel, secondPanel] = panels;
      await allUpdates(element);
    });

    it('randomly generates ids on children', function() {
      expect(secondHeader.id).to.match(/pf-/);
      expect(secondPanel.id).to.match(/panel-/);
    });

    it('preserves existing IDs', function() {
      expect(element.querySelector('#header1')).to.exist;
      expect(element.querySelector('#panel1')).to.exist;
    });

    describe('clicking the first header', function() {
      beforeEach(clickFirstHeader);

      it('expands first pair', function() {
        expect(header.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded')).to.equal('true');
        expect(header.expanded).to.be.true;
        expect(panel.hasAttribute('expanded')).to.be.true;
        expect(panel.expanded).to.be.true;
      });

      describe('then clicking first header again', function() {
        beforeEach(clickFirstHeader);

        it('collapses first pair', function() {
          expect(header.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded')).to.equal('false');
          expect(header.expanded).to.be.false;
          expect(panel.hasAttribute('expanded')).to.be.false;
          expect(panel.expanded).to.be.false;
        });
      });
    });

    /* API TESTS */
    describe('calling toggle(1)', function(this: Mocha.Suite) {
      beforeEach(callToggle.bind(this, 1));
      it('expands second pair', function() {
        expect(secondHeader.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded')).to.equal('true');
        expect(secondHeader.expanded).to.be.true;
        expect(secondPanel.hasAttribute('expanded')).to.be.true;
        expect(secondPanel.expanded).to.be.true;
      });

      describe('then calling toggle(1)', function(this: Mocha.Suite) {
        beforeEach(callToggle.bind(this, 1));
        it('collapses second pair', function() {
          expect(secondHeader.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded')).to.equal('false');
          expect(secondHeader.expanded).to.be.false;
          expect(secondPanel.hasAttribute('expanded')).to.be.false;
          expect(secondPanel.expanded).to.be.false;
        });
      });
    });

    describe('calling expand(1)', function(this: Mocha.Suite) {
      beforeEach(callExpand.bind(this, 1));
      it('expands second pair', function() {
        expect(secondHeader.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded')).to.equal('true');
        expect(secondHeader.expanded).to.be.true;
        expect(secondPanel.hasAttribute('expanded')).to.be.true;
        expect(secondPanel.expanded).to.be.true;
      });
      describe('then calling collapse(1)', function(this: Mocha.Suite) {
        beforeEach(callCollapse.bind(this, 1));
        it('collapses second pair', function() {
          expect(secondHeader.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded')).to.equal('false');
          expect(secondHeader.expanded).to.be.false;
          expect(secondPanel.hasAttribute('expanded')).to.be.false;
          expect(secondPanel.expanded).to.be.false;
        });
      });
    });

    describe('calling expandAll()', function(this: Mocha.Suite) {
      beforeEach(callExpandAll.bind(this));
      it('expands all pairs', function() {
        for (const header of headers) {
          expect(header.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded')).to.equal('true');
          expect(header.expanded).to.be.true;
        }

        for (const panel of panels) {
          expect(panel.hasAttribute('expanded')).to.be.true;
          expect(panel.expanded).to.be.true;
        }
      });

      describe('then calling collapseAll()', function(this: Mocha.Suite) {
        beforeEach(callCollapseAll.bind(this));
        it('collapses all pairs', function() {
          for (const header of headers) {
            expect(header.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded')).to.equal('false');
            expect(header.expanded).to.be.false;
          }

          for (const panel of panels) {
            expect(panel.hasAttribute('expanded')).to.be.false;
            expect(panel.expanded).to.be.false;
          }
        });
      });
    });

    /* ATTRIBUTE TESTS */
    describe('setting expanded-index attribute', function() {
      const indices = '1,2';
      beforeEach(async function() {
        element.setAttribute('expanded-index', indices);
        await allUpdates(element);
        await nextFrame();
      });

      it('expands the pairs listed in the expanded-index attribute', function() {
        for (const idx of indices.split(',').map(x => parseInt(x))) {
          const header = headers[idx];
          const panel = panels[idx];
          expect(header.expanded, 'header expanded DOM property').to.be.true;
          expect(header.hasAttribute('expanded'), 'header expanded attribute').to.be.true;
          expect(panel.expanded, 'panel expanded DOM property').to.be.true;
          expect(panel.hasAttribute('expanded'), 'panel expanded attribute').to.be.true;
        }
      });
    });

    describe('dynamically adding pairs', function() {
      beforeEach(async function() {
        const newHeader = document.createElement('pf-accordion-header');
        newHeader.id = 'newHeader';
        newHeader.innerHTML = `<h2>New Header</h2>`;

        const newPanel = document.createElement('pf-accordion-panel');
        newPanel.id = 'newPanel';
        newPanel.innerHTML = `New Panel`;

        element.appendChild(newHeader);
        element.appendChild(newPanel);

        await allUpdates(element);
      });

      it('properly initializes new pairs', function() {
        const newHeader = headers.at(-1);
        const newPanel = panels.at(-1);
        expect(newHeader?.hasAttribute('id'), 'header has an id').to.be.true;
        expect(newHeader?.getAttribute('aria-controls'), 'header has aria-controls')
          .to.equal(newPanel?.getAttribute('id'));

        expect(newPanel?.getAttribute('role'), 'panel has role').to.equal('region');
        expect(newPanel?.hasAttribute('id'), 'panel has id').to.be.true;
        expect(newPanel?.getAttribute('aria-labelledby'), 'panel has aria-labelledby')
          .to.equal(newHeader?.getAttribute('id'));
      });
    });

    describe('<pf-accordion-header>', function() {
      it('should upgrade pf-accordion-header', function() {
        expect(header)
          .to.be.an.instanceof(customElements.get('pf-accordion-header'))
          .and
          .to.be.an.instanceOf(PfAccordionHeader);
      });

      it('must have an id', function() {
        expect(header.id).to.be.ok;
      });

      it('should add the aria-controls attribute corresponding to the header ID', function() {
        expect(header.getAttribute('aria-controls')).to.equal(panel.id);
      });
    });

    describe('<pf-accordion-panel>', function() {
      it('should upgrade pf-accordion-panel', function() {
        expect(panel)
          .to.be.an.instanceof(customElements.get('pf-accordion-panel'))
          .and
          .to.be.an.instanceOf(PfAccordionPanel);
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
    /** @see https://www.w3.org/TR/wai-aria-practices/examples/accordion/accordion.html */
    describe('for assistive technology', function() {
      let header1: PfAccordionHeader;
      let header2: PfAccordionHeader;
      let header3: PfAccordionHeader;

      let panel1: PfAccordionPanel;
      let panel2: PfAccordionPanel;
      let panel3: PfAccordionPanel;

      beforeEach(async function() {
        [header1, header2, header3] = element.querySelectorAll('pf-accordion-header');
        [panel1, panel2, panel3] = element.querySelectorAll('pf-accordion-panel');
      });

      afterEach(async function() {
        [header1, header2, header3] = [] as PfAccordionHeader[];
        [panel1, panel2, panel3] = [] as PfAccordionPanel[];
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
          for (const header of element.querySelectorAll('pf-accordion-header')) {
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
          it('removes hidden attribute from the first panel', function() {
            expect(panel1.hidden, 'panel1').to.be.false;
            expect(panel2.hidden, 'panel2').to.be.true;
            expect(panel3.hidden, 'panel3').to.be.true;
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

  describe('with single attribute', function() {
    beforeEach(async function() {
      element = await createFixture<PfAccordion>(html`
        <pf-accordion single>
          <pf-accordion-header id="header1" data-index="0">
            <h3>Consetetur sadipscing elitr?</h3>
          </pf-accordion-header>
          <pf-accordion-panel id="panel1" data-index="0">
            <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
              ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
              rebum.</p>
          </pf-accordion-panel>
          <pf-accordion-header data-index="1">
            <h3>Labore et dolore magna aliquyam erat?</h3>
          </pf-accordion-header>
          <pf-accordion-panel data-index="1">
            <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
              ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
              rebum.</p>
          </pf-accordion-panel>
          <pf-accordion-header data-index="2">
            <h3>Incididunt in Lorem voluptate eiusmod dolor?</h3>
          </pf-accordion-header>
          <pf-accordion-panel data-index="2">
            <p><a href="#">Lorem ipsum dolor sit amet</a>, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
              ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
              rebum.</p>
          </pf-accordion-panel>
        </pf-accordion>
      `);
      headers = Array.from(element.querySelectorAll('pf-accordion-header'));
      panels = Array.from(element.querySelectorAll('pf-accordion-panel'));
      [header, secondHeader] = headers;
      [panel, secondPanel] = panels;
      await allUpdates(element);
    });

    describe('clicking the first header', function() {
      beforeEach(clickFirstHeader);
      describe('then clicking the second header', function() {
        beforeEach(clickSecondHeader);
        it('collapses all pairs except second', function() {
          headers.forEach((header, i) => {
            const ariaExpanded = header.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded');
            if (i === 1) {
              expect(header.expanded, `headers[${i}].expanded`).to.be.true;
              expect(ariaExpanded, `headers[${i}].ariaExpanded`).to.equal('true');
            } else {
              expect(header.expanded, `headers[${i}].expanded`).to.be.false;
              expect(ariaExpanded, `headers[${i}].ariaExpanded`).to.equal('false');
            }
          });
          panels.forEach((panel, i) => {
            if (i === 1) {
              expect(panel.expanded, `panels[${i}].expanded`).to.be.true;
            } else {
              expect(panel.expanded, `panels[${i}].expanded`).to.be.false;
            }
          });
        });
      });
    });
  });

  describe('with expanded attribute on two headers', function() {
    beforeEach(async function() {
      element = await createFixture<PfAccordion>(html`
        <pf-accordion>
          <pf-accordion-header data-index="0" expanded><h2>h</h2></pf-accordion-header>
          <pf-accordion-panel data-index="0"><p>p</p></pf-accordion-panel>
          <pf-accordion-header data-index="1" expanded><h2>h</h2></pf-accordion-header>
          <pf-accordion-panel data-index="1"><p>p</p></pf-accordion-panel>
          <pf-accordion-header data-index="2"><h2>h</h2></pf-accordion-header>
          <pf-accordion-panel data-index="2"><p>p</p></pf-accordion-panel>
        </pf-accordion>
      `);
      headers = Array.from(element.querySelectorAll('pf-accordion-header'));
      panels = Array.from(element.querySelectorAll('pf-accordion-panel'));
      [header, secondHeader] = headers;
      [panel, secondPanel] = panels;
      await allUpdates(element);
    });
    it('expands the first panel', function() {
      expect(panel).to.have.attribute('expanded');
    });
    it('expands the second panel', function() {
      expect(secondPanel).to.have.attribute('expanded');
    });
    it('hides the third panel', function() {
      expect(panels[2]).to.not.have.attribute('expanded');
    });
  });

  describe('with single attribute and expanded attribute on two headers', function() {
    beforeEach(async function() {
      element = await createFixture<PfAccordion>(html`
        <pf-accordion single>
          <pf-accordion-header data-index="0" expanded><h2>h</h2></pf-accordion-header>
          <pf-accordion-panel data-index="0"><p>p</p></pf-accordion-panel>
          <pf-accordion-header data-index="1" expanded><h2>h</h2></pf-accordion-header>
          <pf-accordion-panel data-index="1"><p>p</p></pf-accordion-panel>
          <pf-accordion-header data-index="2"><h2>h</h2></pf-accordion-header>
          <pf-accordion-panel data-index="2"><p>p</p></pf-accordion-panel>
        </pf-accordion>
      `);
      headers = Array.from(element.querySelectorAll('pf-accordion-header'));
      panels = Array.from(element.querySelectorAll('pf-accordion-panel'));
      [header, secondHeader] = headers;
      [panel, secondPanel] = panels;
      await allUpdates(element);
      await aTimeout(100);
    });
    it('hides the first panel', function() {
      expect(panel).to.not.have.attribute('expanded');
    });
    it('expands the second panel', function() {
      expect(secondPanel).to.have.attribute('expanded');
    });
    it('hides the third panel', function() {
      expect(panels[2]).to.not.have.attribute('expanded');
    });
  });

  describe('with no h* tag in heading lightdom', function() {
    beforeEach(async function() {
      element = await createFixture<PfAccordion>(html`
      <pf-accordion id="badHeader">
        <pf-accordion-header id="bad-header-element">
          Bad Header
        </pf-accordion-header>
        <pf-accordion-panel>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </pf-accordion-panel>
      </pf-accordion>`);
      await allUpdates(element);
    });
    /* CONSOLE VALIDATION */
    it('should warning in the console', function() {
      expect(Logger.warn)
        .to.have.been.calledOnceWith(`[pf-accordion-header#bad-header-element]`, 'Header should contain at least 1 heading tag for correct semantics.');
    });
  });

  describe('with nested pf-accordion', function() {
    let topLevelHeaderOne: PfAccordionHeader;
    let topLevelHeaderTwo: PfAccordionHeader;

    let topLevelPanelOne: PfAccordionPanel;
    let topLevelPanelTwo: PfAccordionPanel;

    let nestedHeaderOne: PfAccordionHeader;
    let nestedHeaderTwo: PfAccordionHeader;

    let nestedPanelOne: PfAccordionPanel;
    let nestedPanelTwo: PfAccordionPanel;

    beforeEach(async function() {
      element = await createFixture<PfAccordion>(html`
        <pf-accordion>
          <pf-accordion-header id="header-1" data-index="0"></pf-accordion-header>
          <pf-accordion-panel id="panel-1" data-index="0">
            <pf-accordion>
              <pf-accordion-header id="header-1-1" data-index="0-1"></pf-accordion-header>
              <pf-accordion-panel id="panel-1-1" data-index="0-1"></pf-accordion-panel>
            </pf-accordion>
          </pf-accordion-panel>
          <pf-accordion-header id="header-2" data-index="2"></pf-accordion-header>
          <pf-accordion-panel id="panel-2" data-panel="2">
            <pf-accordion single>
              <pf-accordion-header id="header-2-1" data-index="1-0"></pf-accordion-header>
              <pf-accordion-panel id="panel-2-1" data-index="1-0"></pf-accordion-panel>
              <pf-accordion-header id="header-2-2" data-index="1-1"></pf-accordion-header>
              <pf-accordion-panel id="panel-2-2" data-index="1-1"></pf-accordion-panel>
            </pf-accordion>
          </pf-accordion-panel>

          <pf-accordion-header id="header-3" data-index="2"></pf-accordion-header>
          <pf-accordion-panel id="panel-3" data-index="2"></pf-accordion-panel>
        </pf-accordion>
      `);
      topLevelHeaderOne = document.getElementById('header-1') as PfAccordionHeader;
      topLevelHeaderTwo = document.getElementById('header-2') as PfAccordionHeader;

      topLevelPanelOne = document.getElementById('panel-1') as PfAccordionPanel;
      topLevelPanelTwo = document.getElementById('panel-2') as PfAccordionPanel;

      nestedHeaderOne = document.getElementById('header-2-1') as PfAccordionHeader;
      nestedHeaderTwo = document.getElementById('header-2-2') as PfAccordionHeader;

      nestedPanelOne = document.getElementById('panel-2-1') as PfAccordionPanel;
      nestedPanelTwo = document.getElementById('panel-2-2') as PfAccordionPanel;

      await allUpdates(element);
    });

    describe('clicking the first top-level heading', function() {
      beforeEach(async function() {
        topLevelHeaderOne.click();
        await allUpdates(element);
      });
      describe('then clicking the second top-level heading', function() {
        beforeEach(async function() {
          topLevelHeaderTwo.click();
          await allUpdates(element);
        });
        describe('then clicking the first nested heading', function() {
          beforeEach(async function() {
            nestedHeaderOne.click();
            await allUpdates(element);
          });
          describe('then clicking the second nested heading', function() {
            beforeEach(async function() {
              nestedHeaderTwo.click();
              await allUpdates(element);
            });
            it('expands the first top-level pair', function() {
              expect(topLevelHeaderOne.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded'), 'top level header 1 button aria-expanded attr').to.equal('true');
              expect(topLevelHeaderOne.expanded, 'top level header 1 expanded DOM property').to.be.true;
              expect(topLevelPanelOne.hasAttribute('expanded'), 'top level panel 1 expanded attr').to.be.true;
              expect(topLevelPanelOne.expanded, 'top level panel 1 DOM property').to.be.true;
            });
            it('collapses the second top-level pair', function() {
              expect(topLevelHeaderTwo.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded'), 'top level header 2 button aria-expanded attr').to.equal('true');
              expect(topLevelHeaderTwo.expanded, 'top level header 2 expanded DOM property').to.be.true;
              expect(topLevelPanelTwo.hasAttribute('expanded'), 'top level panel 2 expanded attr').to.be.true;
              expect(topLevelPanelTwo.expanded, 'top level panel 2 expanded DOM property').to.be.true;
            });
            it('collapses the first nested pair', function() {
              expect(nestedHeaderOne.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded'), 'nested header 1 button aria-expanded attr').to.equal('false');
              expect(nestedHeaderOne.expanded, 'nested header 1 expanded DOM property').to.be.false;
              expect(nestedPanelOne.hasAttribute('expanded'), 'nested panel 1 expanded attr').to.be.false;
              expect(nestedPanelOne.expanded, 'nested panel 1 expanded DOM property').to.be.false;
            });
            it('collapses the second nested pair', function() {
              expect(nestedHeaderTwo.shadowRoot!.querySelector('button')?.getAttribute('aria-expanded'), 'nested header 2 button aria-expanded attr').to.equal('true');
              expect(nestedHeaderTwo.expanded, 'nested header 2 expanded DOM property').to.be.true;
              expect(nestedPanelTwo.hasAttribute('expanded'), 'nested panel 2 expanded attr').to.be.true;
              expect(nestedPanelTwo.expanded, 'nested panel 2 expanded DOM property').to.be.true;
            });
          });
        });
      });
    });
  });
});
