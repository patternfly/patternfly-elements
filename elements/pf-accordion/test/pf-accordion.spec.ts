import { expect, fixture, html, aTimeout, nextFrame } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';

import { allUpdates, clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';
import { a11ySnapshot, querySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

// Import the element we're testing.
import { PfAccordion, PfAccordionPanel, PfAccordionHeader } from '@patternfly/elements/pf-accordion/pf-accordion.js';
import { PfSwitch } from '@patternfly/elements/pf-switch/pf-switch.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import '@patternfly/pfe-tools/test/stub-logger.js';

describe('<pf-accordion>', function() {
  let element: PfAccordion;
  let headers: PfAccordionHeader[];
  let panels: PfAccordionPanel[];
  let header: PfAccordionHeader;
  let panel: PfAccordionPanel;
  let secondHeader: PfAccordionHeader;
  let secondPanel: PfAccordionPanel;

  async function clickFirstHeader() {
    await clickElementAtCenter(header);
    await allUpdates(element);
  }

  async function clickSecondHeader() {
    await clickElementAtCenter(secondHeader);
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

  async function getFocusedSnapshot() {
    return querySnapshot(await a11ySnapshot(), { focused: true });
  }

  it('imperatively instantiates', function() {
    expect(document.createElement('pf-accordion')).to.be.an.instanceof(PfAccordion);
    expect(document.createElement('pf-accordion-header')).to.be.an.instanceof(PfAccordionHeader);
    expect(document.createElement('pf-accordion-panel')).to.be.an.instanceof(PfAccordionPanel);
  });

  it('simply instantiating', async function() {
    element = await fixture<PfAccordion>(html`<pf-accordion></pf-accordion>`);
    expect(element, 'pf-accordion should be an instance of PfAccordion')
        .to.be.an.instanceof(customElements.get('pf-accordion'))
        .and
        .to.be.an.instanceof(PfAccordion);
  });

  describe('in typical usage', function() {
    beforeEach(async function() {
      element = await fixture<PfAccordion>(html`
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

      it('expands first pair', async function() {
        const snapshot = await a11ySnapshot();
        const expanded = querySnapshot(snapshot, { expanded: true });
        const focused = querySnapshot(snapshot, { focused: true });
        expect(expanded?.name).to.equal(header.textContent?.trim());
        expect(header.expanded).to.be.true;
        expect(panel.hasAttribute('expanded')).to.be.true;
        expect(panel.expanded).to.be.true;
        expect(expanded).to.equal(focused);
      });

      describe('then clicking first header again', function() {
        beforeEach(clickFirstHeader);

        it('collapses first pair', async function() {
          const snapshot = await a11ySnapshot();
          const expanded = snapshot?.children?.find(x => x.expanded);
          expect(expanded).to.not.be.ok;
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
        await fixture('');
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
            await clickElementAtCenter(header);
          }
        });
        beforeEach(nextFrame);
        it('removes hidden attribute from all panels', function() {
          expect(panel1.hidden, 'panel1').to.be.false;
          expect(panel2.hidden, 'panel2').to.be.false;
          expect(panel3.hidden, 'panel3').to.be.false;
        });
      });

      describe('when focus is on the first header', function() {
        beforeEach(function() {
          header1.focus();
        });

        beforeEach(nextFrame);

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
          it('blurs out of the accordion', async function() {
            expect(await getFocusedSnapshot()).to.not.be.ok;
          });
        });

        describe('Shift+Tab', function() {
          beforeEach(press('Shift+Tab'));
          it('blurs out of the accordion', async function() {
            expect(await getFocusedSnapshot()).to.not.be.ok;
          });
        });

        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          it('moves focus to the second header', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  header2.textContent?.trim());
          });
          it('does not open panels', function() {
            expect(panel1.expanded).to.be.false;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });

        describe('ArrowUp', function() {
          beforeEach(press('ArrowUp'));
          it('moves focus to the last header', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  header3.textContent?.trim());
          });
          it('does not open panels', function() {
            expect(panel1.expanded).to.be.false;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });

        describe('Home', function() {
          beforeEach(press('Home'));
          it('moves focus to the first header', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  header1.textContent?.trim());
          });
          it('does not open panels', function() {
            expect(panel1.expanded).to.be.false;
            expect(panel2.expanded).to.be.false;
            expect(panel3.expanded).to.be.false;
          });
        });

        describe('End', function() {
          beforeEach(press('End'));
          it('moves focus to the last header', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  header3.textContent?.trim());
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
        });

        beforeEach(nextFrame);

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
          it('moves focus to the body', async function() {
            expect(await getFocusedSnapshot())
                .to.not.be.ok;
          });
        });


        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          it('moves focus to the last header', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  header3.textContent?.trim());
          });
        });

        describe('ArrowUp', function() {
          beforeEach(press('ArrowUp'));
          it('moves focus to the first header', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  header1.textContent?.trim());
          });
        });

        describe('Home', function() {
          beforeEach(press('Home'));
          it('moves focus to the first header', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  header1.textContent?.trim());
          });
        });

        describe('End', function() {
          beforeEach(press('End'));
          it('moves focus to the last header', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  header3.textContent?.trim());
          });
        });
      });

      describe('when focus is on the last header', function() {
        beforeEach(async function() {
          header3.focus();
        });

        beforeEach(nextFrame);

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
          it('moves focus to the body', async function() {
            expect(await getFocusedSnapshot())
                .to.not.be.ok;
          });
        });


        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          it('moves focus to the first header', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  header1.textContent?.trim());
          });
        });

        describe('ArrowUp', function() {
          beforeEach(press('ArrowUp'));
          it('moves focus to the middle header', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  header2.textContent?.trim());
          });
        });

        describe('Home', function() {
          beforeEach(press('Home'));
          it('moves focus to the first header', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  header1.textContent?.trim());
          });
        });

        describe('End', function() {
          beforeEach(press('End'));
          it('moves focus to the last header', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  header3.textContent?.trim());
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
            it('moves focus to the link in the first panel', async function() {
              expect(await getFocusedSnapshot())
                  .to.have.property('name',
                                    panel1.querySelector('a')?.textContent?.trim());
            });
            describe('Tab', function() {
              beforeEach(press('Tab'));
              it('moves focus to the body', async function() {
                expect(await getFocusedSnapshot())
                    .to.not.be.ok;
              });
              describe('Shift+Tab', function() {
                beforeEach(press('Shift+Tab'));
                it('keeps focus on the link in the first panel', async function() {
                  expect(await getFocusedSnapshot())
                      .to.have.property('name',
                                        panel1.querySelector('a')?.textContent?.trim());
                });
              });
            });
            describe('Space', function() {
              beforeEach(press(' '));
              describe('ArrowDown', function() {
                beforeEach(press('ArrowDown'));
                it('keeps focus on the link in the first panel', async function() {
                  expect(await getFocusedSnapshot())
                      .to.have.property('name',
                                        panel1.querySelector('a')?.textContent?.trim());
                });
                it('does not open other panels', function() {
                  expect(panel1.expanded).to.be.true;
                  expect(panel2.expanded).to.be.false;
                  expect(panel3.expanded).to.be.false;
                });
              });

              describe('ArrowUp', function() {
                beforeEach(press('ArrowUp'));
                it('keeps focus on the link in the first panel', async function() {
                  expect(await getFocusedSnapshot())
                      .to.have.property('name',
                                        panel1.querySelector('a')?.textContent?.trim());
                });
                it('does not open other panels', function() {
                  expect(panel1.expanded).to.be.true;
                  expect(panel2.expanded).to.be.false;
                  expect(panel3.expanded).to.be.false;
                });
              });

              describe('Home', function() {
                beforeEach(press('Home'));

                it('keeps focus on the link in the first panel', async function() {
                  expect(await getFocusedSnapshot())
                      .to.have.property('name',
                                        panel1.querySelector('a')?.textContent?.trim());
                });

                it('does not open other panels', function() {
                  expect(panel1.expanded).to.be.true;
                  expect(panel2.expanded).to.be.false;
                  expect(panel3.expanded).to.be.false;
                });
              });

              describe('End', function() {
                beforeEach(press('End'));
                it('keeps focus on the link in the first panel', async function() {
                  expect(await getFocusedSnapshot())
                      .to.have.property('name',
                                        panel1.querySelector('a')?.textContent?.trim());
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
            it('moves focus to the body', async function() {
              const snapshot = await a11ySnapshot();
              expect(querySnapshot(snapshot, { focused: true })).to.not.be.ok;
            });
          });

          describe('ArrowDown', function() {
            beforeEach(press('ArrowDown'));

            it('moves focus to the second header', async function() {
              expect(await getFocusedSnapshot())
                  .to.not.be.ok;
            });

            it('does not open other panels', function() {
              expect(panel1.expanded).to.be.true;
              expect(panel2.expanded).to.be.false;
              expect(panel3.expanded).to.be.false;
            });
          });

          describe('ArrowUp', function() {
            beforeEach(press('ArrowUp'));

            it('moves focus to the last header', async function() {
              expect(await getFocusedSnapshot())
                  .to.have.property('name',
                                    header3?.textContent?.trim());
            });

            it('does not open other panels', function() {
              expect(panel1.expanded).to.be.true;
              expect(panel2.expanded).to.be.false;
              expect(panel3.expanded).to.be.false;
            });
          });

          describe('Home', function() {
            beforeEach(press('Home'));
            it('moves focus to the first header', async function() {
              expect(await getFocusedSnapshot())
                  .to.have.property('name',
                                    header1?.textContent?.trim());
            });

            it('does not open other panels', function() {
              expect(panel1.expanded).to.be.true;
              expect(panel2.expanded).to.be.false;
              expect(panel3.expanded).to.be.false;
            });
          });

          describe('End', function() {
            beforeEach(press('End'));
            it('moves focus to the last header', async function() {
              expect(await getFocusedSnapshot())
                  .to.have.property('name',
                                    header3?.textContent?.trim());
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
              expect(await getFocusedSnapshot())
                  .to.have.property('name',
                                    panel1.querySelector('a')?.textContent?.trim());
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
            it('moves focus to the link in the second panel', async function() {
              expect(await getFocusedSnapshot())
                  .to.have.property('name',
                                    panel2.querySelector('a')?.textContent?.trim());
            });
          });

          describe('Shift+Tab', function() {
            beforeEach(press('Shift+Tab'));
            it('moves focus to the body', async function() {
              expect(await getFocusedSnapshot())
                  .to.not.be.ok;
            });
          });

          describe('ArrowUp', function() {
            beforeEach(press('ArrowUp'));
            it('moves focus to the first header', async function() {
              expect(await getFocusedSnapshot())
                  .to.have.property('name',
                                    header1?.textContent?.trim());
            });
          });

          describe('ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            it('moves focus to the last header', async function() {
              expect(await getFocusedSnapshot())
                  .to.have.property('name',
                                    header3?.textContent?.trim());
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
            it('moves focus to the link in middle panel', async function() {
              expect(await getFocusedSnapshot())
                  .to.have.property('name',
                                    panel2.querySelector('a')?.textContent?.trim());
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
            it('moves focus to the link in last panel', async function() {
              expect(await getFocusedSnapshot())
                  .to.have.property('name',
                                    panel3.querySelector('a')?.textContent?.trim());
            });
          });
        });
      });
    });
  });

  describe('with single attribute', function() {
    beforeEach(async function() {
      element = await fixture<PfAccordion>(html`
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
      element = await fixture<PfAccordion>(html`
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
      element = await fixture<PfAccordion>(html`
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
      element = await fixture<PfAccordion>(html`
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

    let nestedHeader1: PfAccordionHeader;
    let nestedHeader2: PfAccordionHeader;
    let nestedHeader3: PfAccordionHeader;

    let nestedPanelOne: PfAccordionPanel;
    let nestedPanelTwo: PfAccordionPanel;
    let nestedPanelThree: PfAccordionPanel;

    beforeEach(async function() {
      element = await fixture<PfAccordion>(html`
        <pf-accordion>
          <pf-accordion-header id="header-1" data-index="0">
            top-header-1
          </pf-accordion-header>
          <pf-accordion-panel id="panel-1" data-index="0">
            top-panel-1
            <pf-accordion>
              <pf-accordion-header id="header-1-1" data-index="0-1">
                nest-1-header-1
              </pf-accordion-header>
              <pf-accordion-panel id="panel-1-1" data-index="0-1">
                nest-1-panel-1
              </pf-accordion-panel>
            </pf-accordion>
          </pf-accordion-panel>
          <pf-accordion-header id="header-2" data-index="2">
            top-header-2
          </pf-accordion-header>
          <pf-accordion-panel id="panel-2" data-panel="2">
            top-panel-2
            <pf-accordion single>
              <pf-accordion-header id="header-2-1" data-index="1-0">
                nest-2-header-1
              </pf-accordion-header>
              <pf-accordion-panel id="panel-2-1" data-index="1-0">
                nest-2-header-1
              </pf-accordion-panel>
              <pf-accordion-header id="header-2-2" data-index="1-1">
                nest-2-header-2
              </pf-accordion-header>
              <pf-accordion-panel id="panel-2-2" data-index="1-1">
                nest-2-panel-2
              </pf-accordion-panel>
              <pf-accordion-header id="header-2-3" data-index="1-2">
                nest-2-header-3
              </pf-accordion-header>
              <pf-accordion-panel id="panel-2-3" data-index="1-2">
                nest-2-panel-3
              </pf-accordion-panel>
            </pf-accordion>
          </pf-accordion-panel>
          <pf-accordion-header id="header-3" data-index="2">
            top-header-3
          </pf-accordion-header>
          <pf-accordion-panel id="panel-3" data-index="2">
            top-panel-3
          </pf-accordion-panel>
        </pf-accordion>
      `);
      topLevelHeaderOne = document.getElementById('header-1') as PfAccordionHeader;
      topLevelHeaderTwo = document.getElementById('header-2') as PfAccordionHeader;

      topLevelPanelOne = document.getElementById('panel-1') as PfAccordionPanel;
      topLevelPanelTwo = document.getElementById('panel-2') as PfAccordionPanel;

      nestedHeader1 = document.getElementById('header-2-1') as PfAccordionHeader;
      nestedHeader2 = document.getElementById('header-2-2') as PfAccordionHeader;
      nestedHeader3 = document.getElementById('header-2-3') as PfAccordionHeader;

      nestedPanelOne = document.getElementById('panel-2-1') as PfAccordionPanel;
      nestedPanelTwo = document.getElementById('panel-2-2') as PfAccordionPanel;
      nestedPanelThree = document.getElementById('panel-2-3') as PfAccordionPanel;

      await allUpdates(element);
    });

    describe('clicking the first top-level heading', function() {
      beforeEach(async function() {
        await clickElementAtCenter(topLevelHeaderOne);
        await allUpdates(element);
      });
      describe('then clicking the second top-level heading', function() {
        beforeEach(async function() {
          await clickElementAtCenter(topLevelHeaderTwo);
          await allUpdates(element);
        });
        describe('then clicking the first nested heading', function() {
          beforeEach(async function() {
            await clickElementAtCenter(nestedHeader1);
            await allUpdates(element);
          });
          describe('then clicking the second nested heading', function() {
            beforeEach(async function() {
              await clickElementAtCenter(nestedHeader2);
              await allUpdates(element);
            });
            it('expands the first top-level pair', async function() {
              const snapshot = await a11ySnapshot();
              const expanded = snapshot?.children?.find(x => x.expanded);
              expect(expanded?.name).to.equal(topLevelHeaderOne.textContent?.trim());
              expect(topLevelHeaderOne.expanded).to.be.true;
              expect(topLevelPanelOne.hasAttribute('expanded')).to.be.true;
              expect(topLevelPanelOne.expanded).to.be.true;
            });
            it('collapses the second top-level pair', async function() {
              const snapshot = await a11ySnapshot();
              const header2 = querySnapshot(snapshot, { name: 'top-header-2' });
              expect(header2).to.have.property('expanded', true);
            });
            it('collapses the first nested pair', async function() {
              const snapshot = await a11ySnapshot();
              expect(querySnapshot(snapshot, { name: 'nest-1-header-1' })).to.not.have.property('expanded');
            });
            it('collapses the second nested pair', async function() {
              const snapshot = await a11ySnapshot();
              expect(querySnapshot(snapshot, { name: 'nest-2-header-1' })).to.not.have.property('expanded');
            });
          });
        });
      });
    });

    describe('for assistive technology', function() {
      describe('with all panels closed', function() {
        it('applies hidden attribute to all panels', function() {
          expect(topLevelPanelOne.hidden, 'panel-1').to.be.true;
          expect(topLevelPanelTwo.hidden, 'panel-2').to.be.true;
          expect(nestedPanelOne.hidden, 'panel-1-1').to.be.true;
          expect(nestedPanelTwo.hidden, 'panel-2-2').to.be.true;
          expect(nestedPanelThree.hidden, 'panel-2-3').to.be.true;
        });
      });

      describe('with all panels open', function() {
        beforeEach(async function() {
          await Promise.all(Array.from(
            document.querySelectorAll('pf-accordion'),
            accordion => accordion.expandAll(),
          ));
          await nextFrame();
        });
        it('removes hidden attribute from all panels', function() {
          expect(topLevelPanelOne.hidden, 'panel-1').to.be.false;
          expect(topLevelPanelTwo.hidden, 'panel-2').to.be.false;
          expect(nestedPanelOne.hidden, 'panel-1-1').to.be.false;
          expect(nestedPanelTwo.hidden, 'panel-2-2').to.be.false;
          expect(nestedPanelThree.hidden, 'panel-2-3').to.be.false;
        });
      });

      describe('when focus is on the first header of the parent accordion', function() {
        beforeEach(async function() {
          topLevelHeaderOne.focus();
          await nextFrame();
        });

        describe('Space', function() {
          beforeEach(press(' '));
          it('expands the first panel', function() {
            expect(topLevelPanelOne.expanded).to.be.true;
            expect(topLevelPanelTwo.expanded).to.be.false;
            expect(nestedPanelOne.expanded).to.be.false;
            expect(nestedPanelTwo.expanded).to.be.false;
          });
          it('removes hidden attribute from the first panel', function() {
            expect(topLevelPanelOne.hidden, 'panel-1').to.be.false;
            expect(topLevelPanelTwo.hidden, 'panel-2').to.be.true;
            expect(nestedPanelOne.hidden, 'panel-1-1').to.be.true;
            expect(nestedPanelTwo.hidden, 'panel-2-2').to.be.true;
          });
        });

        describe('Tab', function() {
          beforeEach(press('Tab'));
          it('moves focus to the body', async function() {
            expect(await getFocusedSnapshot())
                .to.not.be.ok;
          });
        });
      });

      describe('when focus is on the last header of the parent accordion', function() {
        beforeEach(async function() {
          topLevelHeaderTwo.focus();
          await nextFrame();
        });

        describe('Space', function() {
          beforeEach(press(' '));
          it('expands the first panel', function() {
            expect(topLevelPanelOne.expanded).to.be.false;
            expect(topLevelPanelTwo.expanded).to.be.true;
            expect(nestedPanelOne.expanded).to.be.false;
            expect(nestedPanelTwo.expanded).to.be.false;
          });
          it('removes hidden attribute from the first panel', function() {
            expect(topLevelPanelOne.hidden, 'panel-2').to.be.true;
            expect(topLevelPanelTwo.hidden, 'panel-1').to.be.false;
            expect(nestedPanelOne.hidden, 'panel-1-1').to.be.true;
            expect(nestedPanelTwo.hidden, 'panel-2-2').to.be.true;
          });
        });

        describe('Navigating from parent to child accordion', function() {
          describe('Opening the panel containing the nested accordion and pressing TAB', function() {
            beforeEach(press('Space'));
            beforeEach(press('Tab'));
            it('moves focus to the nested accordion header', async function() {
              expect(await getFocusedSnapshot())
                  .to.have.property('name',
                                    nestedHeader1?.textContent?.trim());
            });

            describe('ArrowUp', function() {
              beforeEach(press('ArrowUp'));
              it('moves focus to the last nested header', async function() {
                expect(await getFocusedSnapshot())
                    .to.have.property('name',
                                      nestedHeader3?.textContent?.trim());
              });
            });

            describe('ArrowLeft', function() {
              beforeEach(press('ArrowLeft'));
              it('moves focus to the last header', async function() {
                expect(await getFocusedSnapshot())
                    .to.have.property('name',
                                      nestedHeader3?.textContent?.trim());
              });
            });

            describe('ArrowDown', function() {
              beforeEach(press('ArrowDown'));
              it('moves focus to the second header', async function() {
                expect(await getFocusedSnapshot())
                    .to.have.property('name',
                                      nestedHeader2?.textContent?.trim());
              });
            });

            describe('ArrowRight', function() {
              beforeEach(press('ArrowRight'));
              it('moves focus to the second header', async function() {
                expect(await getFocusedSnapshot())
                    .to.have.property('name',
                                      nestedHeader2?.textContent?.trim());
              });
            });

            describe('Tab', function() {
              beforeEach(press('Tab'));
              it('should move focus back to the body', async function() {
                expect(await getFocusedSnapshot())
                    .to.not.be.ok;
              });
            });
          });
        });
      });
    });
  });

  describe('with multiple pf-accordion', function() {
    let multipleAccordionElements: HTMLElement;

    let accordionOneHeaderOne: PfAccordionHeader;
    let accordionOnePanelOne: PfAccordionPanel;

    let accordionTwoHeaderOne: PfAccordionHeader;
    let accordionTwoPanelOne: PfAccordionPanel;

    beforeEach(async function() {
      multipleAccordionElements = await fixture<HTMLElement>(html`
      <div>
        <pf-accordion>
          <pf-accordion-header id="header-1-1" data-index="0"></pf-accordion-header>
          <pf-accordion-panel id="panel-1-1" data-index="0"></pf-accordion-panel>
        </pf-accordion>
        <pf-accordion>
          <pf-accordion-header id="header-2-1" data-index="0"></pf-accordion-header>
          <pf-accordion-panel id="panel-2-1" data-index="0"></pf-accordion-panel>
        </pf-accordion>
      </div>
      `);
      accordionOneHeaderOne = document.getElementById('header-1-1') as PfAccordionHeader;

      accordionOnePanelOne = document.getElementById('panel-1-1') as PfAccordionPanel;

      accordionTwoHeaderOne = document.getElementById('header-2-1') as PfAccordionHeader;

      accordionTwoPanelOne = document.getElementById('panel-2-1') as PfAccordionPanel;
    });

    describe('for assistive technology', function() {
      describe('with all panels closed', function() {
        it('applies hidden attribute to all panels', function() {
          expect(accordionOnePanelOne.hidden, 'panel-1-1').to.be.true;
          expect(accordionTwoPanelOne.hidden, 'panel-2-1').to.be.true;
        });
      });

      describe('with all panels open', function() {
        beforeEach(async function() {
          for (const header of multipleAccordionElements.querySelectorAll('pf-accordion-header')) {
            await clickElementAtCenter(header);
          }
          await nextFrame();
        });
        it('removes hidden attribute from all panels', function() {
          expect(accordionOnePanelOne.hidden, 'panel-1-1').to.be.false;
          expect(accordionTwoPanelOne.hidden, 'panel-2-1').to.be.false;
        });
      });

      describe('when focus is on the first header of the first accordion', function() {
        beforeEach(async function() {
          accordionOneHeaderOne.focus();
          await nextFrame();
        });

        describe('Space', function() {
          beforeEach(press(' '));
          it('expands the first panel', function() {
            expect(accordionOnePanelOne.expanded).to.be.true;
            expect(accordionTwoPanelOne.expanded).to.be.false;
          });
          it('removes hidden attribute from the first panel', function() {
            expect(accordionOnePanelOne.hidden, 'panel-1-1').to.be.false;
            expect(accordionTwoPanelOne.hidden, 'panel-1-1').to.be.true;
          });
        });

        describe('Tab', function() {
          beforeEach(press('Tab'));
          it('moves focus to the second accordion', async function() {
            expect(await getFocusedSnapshot())
                .to.have.property('name',
                                  accordionTwoHeaderOne?.textContent?.trim());
          });
          describe('Shift+Tab', function() {
            beforeEach(press('Shift+Tab'));
            it('moves focus back to the first accordion', async function() {
              expect(await getFocusedSnapshot())
                  .to.have.property('name',
                                    accordionOneHeaderOne?.textContent?.trim());
            });
          });
        });
      });
    });
  });

  describe('with a single expanded header and panel containing a checkbox and a switch', function() {
    let element: PfAccordion;
    let panels: NodeListOf<PfAccordionPanel>;
    let checkbox: HTMLInputElement;
    let pfswitch: PfSwitch;
    let accordionPanelOne: PfAccordionPanel;

    beforeEach(async function() {
      element = await fixture<PfAccordion>(html`
          <pf-accordion>
            <pf-accordion-header expanded id="header-1-1" data-index="0"></pf-accordion-header>
            <pf-accordion-panel id="panel-1-1" data-index="0">
              <pf-switch></pf-switch>
              <input type="checkbox">
            </pf-accordion-panel>
          </pf-accordion>
        `);
      panels = document.querySelectorAll('pf-accordion-panel');
      checkbox = element.querySelector('input')!;
      pfswitch = element.querySelector('pf-switch')!;
      expect(checkbox).to.be.ok;
      expect(pfswitch).to.be.ok;
      [accordionPanelOne] = panels;
    });

    describe('clicking the checkbox', function() {
      beforeEach(async function() {
        await clickElementAtCenter(checkbox);
        await element.updateComplete;
      });
      it('does not collapse the panel', function() {
        expect(accordionPanelOne.expanded).to.be.true;
      });
    });

    describe('clicking the switch', function() {
      beforeEach(async function() {
        const { checked } = pfswitch;
        await clickElementAtCenter(pfswitch);
        await element.updateComplete;
        await pfswitch.updateComplete;
        expect(pfswitch.checked).to.not.equal(checked);
      });
      it('does not collapse the panel', function() {
        expect(accordionPanelOne.expanded).to.be.true;
      });
    });
  });
});
