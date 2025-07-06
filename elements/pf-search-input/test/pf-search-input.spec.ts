import { aTimeout, expect, html, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfSearchInput } from '../pf-search-input.js';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { sendKeys } from '@web/test-runner-commands';
import { clickElementAtCenter, clickElementAtOffset } from '@patternfly/pfe-tools/test/utils.js';
import type { PfOption } from '../../pf-select/pf-option.js';

// async function holdShift() {
//   await sendKeys({ down: 'Shift' });
// }

// async function releaseShift() {
//   await sendKeys({ up: 'Shift' });
// }

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

/**
 * Get the value of the first selected option
 * @param element pf-select
 * @returns the value of the selected option, or undefined if none selected
 */
function getSelectedOptionValue(element: PfSearchInput): string[] {
  return Array.from(element.querySelectorAll<PfOption>('[selected]'), x => x.value);
}


// a11yShapshot does not surface the options
function getVisibleOptionValues(element: PfSearchInput): string[] {
  return element.options.filter(x => !x.hidden).map(x => x.value);
}

// a11yShapshot does not surface the options
function getActiveOption(element: PfSearchInput) {
  return element.options.find(x => x.active);
}

/**
 * NOTE because of the copy-to-shadow-root shtick in ActivedescendantController,
 * we can't just pick an option (from light dom);
 * @param element pf-select
 * @param index item index
 */
async function clickItemAtIndex(element: PfSearchInput, index: number) {
  const itemHeight = 44;
  await clickElementAtOffset(element, [
    10,
    element.offsetHeight + (itemHeight * (index + 1)) - itemHeight / 2,
  ], {
    allowOutOfBounds: true,
  });
}


describe('<pf-search-input>', function() {
  describe('simply instantiating', function() {
    let element: PfSearchInput;
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-search-input')).to.be.an.instanceof(PfSearchInput);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfSearchInput>(html`<pf-search-input></pf-search-input>`);
      const klass = customElements.get('pf-search-input');
      expect(element)
          .to.be.an.instanceOf(klass)
          .and
          .to.be.an.instanceOf(PfSearchInput);
    });

    describe('with accessible-label attribute and 3 items', function() {
      let element: PfSearchInput;
      const updateComplete = () => element.updateComplete;
      const focus = () => element.focus;

      beforeEach(async function() {
        element = await createFixture<PfSearchInput>(html`
          <pf-search-input accessible-label="label">
            <pf-option value="1">1</pf-option>
            <pf-option value="2">2</pf-option>
            <pf-option value="3">3</pf-option>
          </pf-search-input>`);
      });

      it('passes aXe audit', async function() {
        await expect(element).to.be.accessible();
      });

      it('labels the combobox with the accessible-label attribuet', async function() {
        expect(await a11ySnapshot()).to.axContainQuery({
          role: 'combobox',
          name: 'label',
        });
      });

      it('does not have redundant role', async function() {
        expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
      });

      it('sets aria-setsize="3" and aria-posinset on items', function() {
        element.options.forEach((option, i) => {
          expect(option).to.have.attr('aria-setsize', '3');
          expect(option).to.have.attr('aria-posinset', `${i + 1}`);
        });
      });

      describe('focus()', function() {
        beforeEach(focus);
        beforeEach(updateComplete);
        describe('ArrowDown', async function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          await aTimeout(30);

          // it('labels the listbox with the accessible-label attribute', async function() {
          //   const snap = await a11ySnapshot();
          //   expect(snap).to.axContainQuery({
          //     role: 'listbox',
          //     name: 'label',
          //   });
          // });

          // it('focuses on the first item', async function() {
          //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
          // });

          describe('Space', function() {
            beforeEach(press(' '));
            beforeEach(updateComplete);
            // it('selects option 1', function() {
            //   expect(getSelectedOptionValue(element)).to.deep.equal(['1']);
            // });

            // it('exposes selection to assistive technology', async function() {
            //   expect(await a11ySnapshot()).to.axContainQuery({
            //     role: 'combobox',
            //     value: '1',
            //   });
            // });
          });
        });
      });
    });

    describe('with 3 items and associated <label> elements', function() {
      let element: PfSearchInput;
      const updateComplete = () => element.updateComplete;
      const focus = () => element.focus;

      beforeEach(async function() {
        element = await createFixture<PfSearchInput>(html`
          <pf-search-input id="search">
            <pf-option value="1">1</pf-option>
            <pf-option value="2">2</pf-option>
            <pf-option value="3">3</pf-option>
          </pf-search-input>
          <label for="search">label1</label>
          <label for="search">label2</label>
          `);
      });

      it('passes aXe audit', async function() {
        await expect(element).to.be.accessible();
      });

      it('does not have redundant role', async function() {
        expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
      });

      it('labels the combobox with the label elements', async function() {
        expect(await a11ySnapshot()).to.axContainQuery({
          role: 'combobox',
          name: 'label1label2',
        });
      });

      it('sets aria-setsize="3" and aria-posinset on items', function() {
        element.options.forEach((option, i) => {
          expect(option).to.have.attr('aria-setsize', '3');
          expect(option).to.have.attr('aria-posinset', `${i + 1}`);
        });
      });

      describe('focus()', function() {
        // beforeEach(() => aTimeout(3000));
        beforeEach(focus);
        beforeEach(updateComplete);
        describe('ArrowDown', async function() {
          beforeEach(press('ArrowDown'));
          await aTimeout(30);
          // it('labels the listbox with the label elements', async function() {
          //   expect(await a11ySnapshot()).to.axContainQuery({
          //     role: 'listbox',
          //     name: 'label1label2',
          //   });
          // });

          // it('focuses on the first item', async function() {
          //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
          // });

          describe('Space', function() {
            beforeEach(press(' '));
            beforeEach(updateComplete);
            // it('selects option 1', function() {
            //   expect(getSelectedOptionValue(element)).to.deep.equal('1');
            // });

            // it('exposes selection to assistive technology', async function() {
            //   expect(await a11ySnapshot()).to.axContainQuery({
            //     role: 'combobox',
            //     value: '1',
            //   });
            // });
          });
        });
      });
    });

    describe('in a deep shadow root', function() {
      let element: PfSearchInput;
      const focus = () => element.focus();
      const updateComplete = () => element.updateComplete;
      beforeEach(async function() {
        const fixture = await createFixture(html`
        <shadow-root>
          <template shadowrootmode="open">
            <shadow-root>
              <template shadowrootmode="open">
                <pf-search-input
                           accessible-label="Search"
                           placeholder="Search">
                  <pf-option value="1">1</pf-option>
                  <pf-option value="2">2</pf-option>
                  <pf-option value="3">3</pf-option>
                  <pf-option value="4">4</pf-option>
                  <pf-option value="5">5</pf-option>
                  <pf-option value="6">6</pf-option>
                  <pf-option value="7">7</pf-option>
                  <pf-option value="8">8</pf-option>
                </pf-search-input>
              </template>
            </shadow-root>
          </template>
        </shadow-root>`);

        function attachShadowRoots(root?: Document | ShadowRoot) {
          root?.querySelectorAll<HTMLTemplateElement>('template[shadowrootmode]').forEach(template => {
            const mode = template.getAttribute('shadowrootmode') as 'open' | 'closed';
            const shadowRoot = template.parentElement?.attachShadow?.({ mode });
            shadowRoot?.appendChild(template.content);
            template.remove();
            attachShadowRoots(shadowRoot);
          });
        }
        attachShadowRoots(document);

        const select = fixture.shadowRoot?.firstElementChild?.shadowRoot?.querySelector('pf-search-input');
        if (select) {
          element = select;
          await element?.updateComplete;
        } else {
          throw new Error('no element!');
        }
      });

      describe('expanding', function() {
        beforeEach(focus);
        beforeEach(press('Enter'));
        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          it('remains expanded', function() {
            expect(element.expanded).to.be.true;
          });
          describe('ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);
            it('remains expanded', function() {
              expect(element.expanded).to.be.true;
            });
            // describe('Space', function() {
            //   beforeEach(press(' '));
            //   beforeEach(updateComplete);
            //   it('closes', function() {
            //     expect(element.expanded).to.be.false;
            //   });
            //   it('sets value', function() {
            //     expect(element.value).to.equal('2');
            //   });
            // });
          });
        });
      });
    });

    describe('with 8 items', function() {
      let element: PfSearchInput;
      const updateComplete = () => element.updateComplete;
      const focus = () => element.focus();

      beforeEach(async function() {
        element = await createFixture<PfSearchInput>(html`
          <pf-search-input>
            <pf-option value="1">1</pf-option>
            <pf-option value="2">2</pf-option>
            <pf-option value="3">3</pf-option>
            <pf-option value="4">4</pf-option>
            <pf-option value="5">5</pf-option>
            <pf-option value="6">6</pf-option>
            <pf-option value="7">7</pf-option>
            <pf-option value="8">8</pf-option>
          </pf-search-input>`);
      });

      beforeEach(updateComplete);
      beforeEach(async () => {
        await aTimeout(1000);
      });

      // it('does not pass aXe audit', async function() {
      //   await expect(element).to.not.be.accessible();
      // });

      it('sets aria-setsize and aria-posinset on items', function() {
        element.options.forEach((option, i) => {
          expect(option).to.have.attr('aria-setsize', '8');
          expect(option).to.have.attr('aria-posinset', `${i + 1}`);
        });
      });

      describe('click combobox button', function() {
        beforeEach(() => clickElementAtCenter(element));
        beforeEach(updateComplete);

        it('does not pass aXe audit', async function() {
          await expect(element).to.not.be.accessible();
        });

        it('expands the listbox', async function() {
          expect(await a11ySnapshot()).to.axContainRole('listbox');
        });

        // it('focuses on the first item', async function() {
        //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
        // });

        describe('Tab', function() {
          beforeEach(press('Tab'));
          it('does not focus the combobox button', async function() {
            expect(await a11ySnapshot()).to.not.have.axTreeFocusedNode;
          });
        });
      });

      describe('focus()', function() {
        beforeEach(focus);
        beforeEach(updateComplete);

        // it('focuses on the combobox button', async function() {
        //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
        // });

        it('does not expand the listbox', async function() {
          expect(element.expanded).to.be.false;
          expect(await a11ySnapshot()).to.not.axContainRole('listbox');
        });

        describe('Enter', function() {
          beforeEach(press('Enter'));
          beforeEach(updateComplete);

          // Enter will not expand the listbox
          // it('expands the listbox', async function() {
          //   expect(element.expanded).to.be.true;
          //   expect(await a11ySnapshot()).to.axContainRole('listbox');
          // });

          // it('focuses on the first item', async function() {
          //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
          // });
        });

        describe('Space', function() {
          beforeEach(function() {
            document.body.style.height = '8000px';
          });
          afterEach(function() {
            document.body.style.height = 'initial';
          });

          beforeEach(press(' '));
          beforeEach(updateComplete);
          beforeEach(() => aTimeout(300));

          // it('expands the listbox', async function() {
          //   expect(await a11ySnapshot()).to.axContainRole('listbox');
          // });

          // it('focuses on the first item', async function() {
          //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
          // });

          it('does not scroll the screen', function() {
            expect(window.scrollY).to.equal(0);
          });
        });

        describe('Home', function() {
          beforeEach(press('Home'));
          beforeEach(updateComplete);

          it('expands the listbox', async function() {
            expect(await a11ySnapshot()).to.axContainRole('listbox');
          });

          // it('focuses on option 1', async function() {
          //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
          // });
        });

        describe('End', function() {
          beforeEach(press('End'));
          beforeEach(updateComplete);

          it('expands the listbox', async function() {
            expect(await a11ySnapshot()).to.axContainRole('listbox');
          });

          // it('focuses on option 8', async function() {
          //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('8');
          // });
        });

        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);

          it('expands the listbox', async function() {
            expect(element.expanded).to.be.true;
            expect(await a11ySnapshot()).to.axContainRole('listbox');
          });

          // it('focuses on the first item', async function() {
          //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
          // });

          describe('ArrowUp', function() {
            beforeEach(press('ArrowUp'));
            beforeEach(updateComplete);
            // Last option will not be selected on arro-up
            // it('focuses on the last option', async function() {
            //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('8');
            // });
            describe('ArrowDown', function() {
              beforeEach(press('ArrowDown'));
              beforeEach(updateComplete);
              // it('focuses on option 1', async function() {
              //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
              // });
            });
          });

          describe('ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);

            // it('focuses on option 2', async function() {
            //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('2');
            // });

            describe('ArrowUp', function() {
              beforeEach(press('ArrowUp'));
              beforeEach(updateComplete);
              // it('focuses on option 1', async function() {
              //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
              // });
            });

            describe('ArrowDown', async function() {
              beforeEach(press('ArrowDown'));
              beforeEach(updateComplete);
              await aTimeout(30);
              // it('focuses on option 3', async function() {
              //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('3');
              // });

              describe('Enter', function() {
                beforeEach(press('Enter'));
                beforeEach(updateComplete);

                // it('selects option 3', function() {
                //   expect(getSelectedOptionValue(element)).to.deep.equal([
                //     '3',
                //   ]);
                // });

                // it('exposes selection to assistive technology', async function() {
                //   expect(await a11ySnapshot()).to.axContainQuery({
                //     role: 'combobox',
                //     value: '3',
                //   });
                // });

                it('hides the listbox', async function() {
                  expect(element.expanded).to.be.false;
                  expect(await a11ySnapshot()).to.not.axContainRole('listbox');
                });

                describe('ArrowDown', function() {
                  beforeEach(press('ArrowDown'));
                  beforeEach(updateComplete);

                  // it('expands the listbox', async function() {
                  //   expect(element.expanded).to.be.true;
                  //   expect(await a11ySnapshot()).to.axContainRole('listbox');
                  // });

                  describe('Home', function() {
                    beforeEach(press('Home'));
                    beforeEach(updateComplete);

                    // it('focuses on option 1', async function() {
                    //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
                    // });

                    describe('Home', function() {
                      beforeEach(press('Home'));
                      beforeEach(updateComplete);

                      // it('focuses on option 1', async function() {
                      //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
                      // });
                    });
                  });
                });
              });
            });

            describe('Enter', async function() {
              beforeEach(press('Enter'));
              beforeEach(updateComplete);
              await aTimeout(30);

              // it('selects option 2', function() {
              //   expect(getSelectedOptionValue(element)).to.deep.equal(['2']);
              // });

              // it('exposes selection to assistive technology', async function() {
              //   expect(await a11ySnapshot()).to.axContainQuery({
              //     role: 'combobox',
              //     value: '2',
              //   });
              // });
            });
          });

          describe('Space', function() {
            beforeEach(press(' '));
            beforeEach(updateComplete);

            // it('hides the listbox', async function() {
            //   expect(element.expanded).to.be.false;
            //   expect(await a11ySnapshot()).to.not.axContainRole('listbox');
            // });

            // it('focuses the combobox toggle', async function() {
            //   expect(await a11ySnapshot())
            //       .axTreeFocusedNode
            //       .to.have.axRole('combobox');
            // });

            // it('selects option 1', function() {
            //   expect(getSelectedOptionValue(element)).to.equal([
            //     '1',
            //   ]);
            // });

            // it('exposes selection to assistive technology', async function() {
            //   expect(await a11ySnapshot()).to.axContainQuery({
            //     role: 'combobox',
            //     value: '1',
            //   });
            // });
          });

          // -- This functionality needs to be implement in search input
          // describe('Tab', function() {
          //   beforeEach(press('Tab'));
          //   beforeEach(nextFrame);
          //   beforeEach(updateComplete);
          //   it('hides the listbox', async function() {
          //     expect(element.expanded).to.be.false;
          //     expect(await a11ySnapshot()).to.not.axContainRole('listbox');
          //   });
          //   it('does not focus on the combobox button', async function() {
          //     expect(await a11ySnapshot()).to.not.have.axTreeFocusedNode;
          //   });
          // });

          // -- This functionality needs to be implement in search input
          // describe('Shift+Tab', function() {
          //   beforeEach(holdShift);
          //   beforeEach(press('Tab'));
          //   beforeEach(releaseShift);
          //   beforeEach(updateComplete);

          //   it('hides the listbox', async function() {
          //     expect(element.expanded).to.be.false;
          //     expect(await a11ySnapshot()).to.not.axContainRole('listbox');
          //   });

          //   it('focuses the button', async function() {
          //     expect(await a11ySnapshot())
          //         .axTreeFocusedNode
          //         .to.have.axRole('combobox');
          //   });
          // });

          describe('Escape', function() {
            beforeEach(press('Escape'));
            beforeEach(nextFrame);
            beforeEach(updateComplete);

            it('hides the listbox', async function() {
              expect(element.expanded).to.be.false;
              expect(await a11ySnapshot()).to.not.axContainRole('listbox');
            });

            // it('focuses the button', async function() {
            //   expect(await a11ySnapshot())
            //       .axTreeFocusedNode
            //       .to.have.axRole('combobox');
            // });
          });
        });
      });
    });

    describe('text input interaction', function() {
      let element: PfSearchInput;
      const label = 'label';
      // const placeholder = 'placeholder';
      const updateComplete = () => element.updateComplete;
      const focus = () => element.focus();

      beforeEach(async function() {
        element = await createFixture<PfSearchInput>(html`
          <pf-search-input >
            <pf-option>Blue</pf-option>
            <pf-option>Green</pf-option>
            <pf-option>Magenta</pf-option>
            <pf-option>Orange</pf-option>
            <pf-option>Purple</pf-option>
            <pf-option>Periwinkle</pf-option>
            <pf-option>Pink</pf-option>
            <pf-option>Red</pf-option>
            <pf-option>Yellow</pf-option>
          </pf-search-input>`);
      });

      beforeEach(nextFrame);

      it('does not have redundant role', async function() {
        expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
      });

      // it('labels the combobox input with the first option', async function() {
      //   expect(await a11ySnapshot()).to.axContainQuery({
      //     role: 'combobox',
      //     name: 'Blue',
      //   });
      // });

      describe('with an `accessible-label` attribute', function() {
        beforeEach(function() {
          element.setAttribute('accessible-label', label);
        });
        beforeEach(nextFrame);

        it('passes aXe audit', async function() {
          await expect(element).to.be.accessible();
        });

        it('does not have redundant role', async function() {
          expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
        });

        it('labels the combobox with the label', async function() {
          expect(await a11ySnapshot()).to.axContainQuery({
            role: 'combobox',
            name: label,
          });
        });

        // will be removed
        // it('labels the toggle button with the label', async function() {
        //   expect(await a11ySnapshot()).to.axContainQuery({
        //     role: 'button',
        //     name: label,
        //   });
        // });

        describe('show()', function() {
          beforeEach(() => element.show());
          it('labels the listbox with the placeholder attribute', async function() {
            expect(await a11ySnapshot()).to.axContainQuery({
              role: 'listbox',
              name: 'label',
            });
          });
        });
      });

      // describe('with a `placeholder` attribute', function() {
      //   beforeEach(function() {
      //     element.setAttribute('placeholder', placeholder);
      //   });
      //   beforeEach(nextFrame);

      //   it('passes aXe audit', async function() {
      //     await expect(element).to.be.accessible();
      //   });

      //   it('lists the placeholder as first among the options', function() {
      //     expect(element.options.at(0)).to.have.text(placeholder);
      //   });

      //   it('does not have redundant role', async function() {
      //     expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
      //   });

      //   it('labels the combobox with the placeholder', async function() {
      //     expect(await a11ySnapshot()).to.axContainQuery({
      //       role: 'combobox',
      //       name: placeholder,
      //     });
      //   });

      //   it('labels the toggle button with the placeholder', async function() {
      //     expect(await a11ySnapshot()).to.axContainQuery({
      //       role: 'button',
      //       name: placeholder,
      //     });
      //   });

      //   describe('show()', function() {
      //     beforeEach(() => element.show());
      //     it('labels the listbox with the placeholder attribute', async function() {
      //       expect(await a11ySnapshot()).to.axContainQuery({
      //         role: 'listbox',
      //         name: 'placeholder',
      //       });
      //     });
      //   });
      // });

      // will be removed as there's no toggle button
      // describe('clicking the toggle button', function() {
      //   beforeEach(async function() {
      //     await clickElementAtOffset(element, [-10, -10]);
      //   });

      //   it('shows the listbox', async function() {
      //     expect(element.expanded).to.be.true;
      //     expect(await a11ySnapshot()).to.axContainRole('listbox');
      //   });

      //   it('focuses the toggle button', async function() {
      //     expect(element.expanded).to.be.true;
      //     expect(await a11ySnapshot()).to.axContainQuery({
      //       focused: true,
      //       role: 'button',
      //     });
      //   });
      // });

      describe('clicking the combobox input', function() {
        beforeEach(async function() {
          await clickElementAtOffset(element, [10, 10]);
        });

        it('shows the listbox', async function() {
          expect(element.expanded).to.be.true;
          expect(await a11ySnapshot()).to.axContainRole('listbox');
        });

        // it('focuses the combobox', async function() {
        //   expect(element.expanded).to.be.true;
        //   expect(await a11ySnapshot()).to.axContainQuery({
        //     focused: true,
        //     role: 'combobox',
        //   });
        // });

        describe('clicking option 1', function() {
          beforeEach(async function() {
            await clickItemAtIndex(element, 0);
          });

          it('selects option 1', function() {
            expect(getSelectedOptionValue(element)).to.deep.equal([
              'Blue',
            ]);
          });

          it('closes the listbox', async function() {
            expect(await a11ySnapshot()).to.not.axContainRole('listbox');
          });
        });

        describe('clicking option 2', function() {
          beforeEach(async function() {
            await clickItemAtIndex(element, 1);
          });

          it('selects option 1', function() {
            expect(getSelectedOptionValue(element)).to.deep.equal([
              'Green',
            ]);
          });

          it('closes the listbox', async function() {
            expect(await a11ySnapshot()).to.not.axContainRole('listbox');
          });
        });
      });

      describe('focus()', function() {
        beforeEach(focus);
        beforeEach(updateComplete);

        // Doubt
        // it('focuses the combobox input', async function() {
        //   expect(await a11ySnapshot()).axTreeFocusedNode
        //       .to.have.axRole('combobox')
        //       .and
        //       .to.have.axName('Blue');
        // });

        describe('"r"', function() {
          beforeEach(press('r'));
          beforeEach(updateComplete);

          it('only shows options that start with "r" or "R"', async function() {
            expect(getVisibleOptionValues(element)).to.deep.equal([
              'Red',
            ]);
          });
        });

        describe('Space', function() {
          beforeEach(function() {
            document.body.style.height = '8000px';
          });
          afterEach(function() {
            document.body.style.height = 'initial';
          });

          beforeEach(press(' '));
          beforeEach(updateComplete);
          beforeEach(() => aTimeout(300));

          it('does not expand the listbox', async function() {
            expect(await a11ySnapshot()).to.not.axContainRole('listbox');
          });

          it('does not scroll the screen', function() {
            expect(window.scrollY).to.equal(0);
          });
        });

        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          beforeEach(() => aTimeout(200));

          it('shows the listbox', async function() {
            expect(element.expanded).to.be.true;
            expect(await a11ySnapshot()).to.axContainRole('listbox');
          });

          it('focuses option 1', function() {
            expect(getActiveOption(element)).to.have.value('Blue');
          });

          // it('does not move keyboard focus', async function() {
          //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
          // });

          describe('ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);

            it('focuses option 2', function() {
              expect(getActiveOption(element)).to.have.text('Green');
            });

            describe('Enter', function() {
              beforeEach(press('Enter'));
              beforeEach(updateComplete);

              it('selects option 2', function() {
                expect(getSelectedOptionValue(element)).to.deep.equal([
                  'Green',
                ]);
              });

              it('sets typeahead input to second option value', async function() {
                expect(await a11ySnapshot())
                    .axTreeFocusedNode
                    .to.have.axProperty('value', 'Green');
              });

              // it('retains focus on combobox input', async function() {
              //   expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
              // });

              it('hides the listbox', async function() {
                expect(await a11ySnapshot()).to.not.axContainRole('listbox');
              });

              describe('focus()', function() {
                beforeEach(focus);
                describe('ArrowDown', function() {
                  beforeEach(press('ArrowDown'));
                  beforeEach(updateComplete);

                  it('focuses option 2', function() {
                    expect(getActiveOption(element)).to.have.text('Green');
                  });

                  it('only shows option 2', function() {
                    expect(getVisibleOptionValues(element)).to.deep.equal([
                      'Green',
                    ]);
                  });
                });
              });
            });
          });

          describe('ArrowUp', function() {
            beforeEach(press('ArrowUp'));
            beforeEach(updateComplete);

            it('focuses the last item', async function() {
              expect(getActiveOption(element)).to.have.value('Yellow');
            });
          });
        });

        describe('"p"', function() {
          beforeEach(press('p'));
          beforeEach(updateComplete);

          // it('shows the listbox and maintains focus', async function() {
          //   expect(await a11ySnapshot())
          //       .to.axContainRole('listbox')
          //       .and.axTreeFocusedNode
          //       .to.have.axRole('combobox')
          //       .and.to.have.axProperty('value', 'p');
          // });

          it('only shows listbox items starting with the letter p', function() {
            expect(getVisibleOptionValues(element)).to.deep.equal([
              'Purple',
              'Periwinkle',
              'Pink',
            ]);
          });

          describe('Backspace', function() {
            beforeEach(press('Backspace'));
            beforeEach(updateComplete);

            // it('shows the listbox and maintains focus', async function() {
            //   expect(await a11ySnapshot())
            //       .to.axContainRole('listbox')
            //       .and.axTreeFocusedNode
            //       .to.have.axRole('combobox')
            //       .and.to.not.have.axProperty('value', 'p');
            // });

            it('all options are visible', async function() {
              expect(getVisibleOptionValues(element)).to.deep.equal([
                'Blue',
                'Green',
                'Magenta',
                'Orange',
                'Purple',
                'Periwinkle',
                'Pink',
                'Red',
                'Yellow',
              ]);
            });
          });

          describe('"u"', function() {
            beforeEach(press('u'));
            beforeEach(updateComplete);

            it('only shows the option "Purple"', function() {
              expect(getVisibleOptionValues(element)).to.deep.equal([
                'Purple',
              ]);
            });

            describe('ArrowDown', function() {
              beforeEach(press('ArrowDown'));
              beforeEach(updateComplete);

              it('focuses the option "Purple"', function() {
                expect(getActiveOption(element)).to.have.text('Purple');
              });

              describe('Enter', function() {
                beforeEach(press('Enter'));
                beforeEach(updateComplete);

                it('selects the option "Purple"', function() {
                  expect(getSelectedOptionValue(element)).to.deep.equal([
                    'Purple',
                  ]);
                });

                describe('Backspace (x5)', function() {
                  beforeEach(press('Backspace'));
                  beforeEach(press('Backspace'));
                  beforeEach(press('Backspace'));
                  beforeEach(press('Backspace'));
                  beforeEach(press('Backspace'));

                  it('shows the options starting with "P"', function() {
                    expect(getVisibleOptionValues(element)).to.deep.equal([
                      'Purple',
                      'Periwinkle',
                      'Pink',
                    ]);
                  });

                  describe('Home', function() {
                    beforeEach(press('Home'));

                    it('retains focus on the option "Purple"', function() {
                      expect(getActiveOption(element)).to.have.text('Purple');
                    });

                    // it('moves cursor to start', function() {
                    //   // WARNING: ties test to DOM structure
                    //   const input = element.shadowRoot?.querySelector('input');
                    //   expect(input?.selectionStart).to.equal(0);
                    // });
                  });
                  describe('End', function() {
                    beforeEach(press('End'));

                    it('retains focus on the option "Purple"', function() {
                      expect(getActiveOption(element)).to.have.text('Purple');
                    });

                    // it('moves cursor to start', function() {
                    //   // WARNING: ties test to DOM structure
                    //   const input = element.shadowRoot?.querySelector('input');
                    //   expect(input?.selectionStart).to.equal(1);
                    // });
                  });
                });
              });
            });
          });
        });
      });

      describe.skip('setting filter to "*"', function() {
        beforeEach(function() {
          // @ts-expect-error: todo: add filter feature
          element.filter = '*';
        });
        beforeEach(updateComplete);
        it('does not error', async function() {
          const snapshot = await a11ySnapshot();
          const [, , listbox] = snapshot.children ?? [];
          expect(listbox?.children).to.not.be.ok;
        });
      });

      describe.skip('custom filtering', function() {
        beforeEach(function() {
          // @ts-expect-error: we intend to implement this in the next release
          element.customFilter = option =>
            // @ts-expect-error: TODO add filter feature
            new RegExp(element.filter).test(option.value);
        });

        beforeEach(focus);

        beforeEach(updateComplete);

        describe('r', function() {
          beforeEach(press('r'));
          beforeEach(updateComplete);
          it('shows options that contain "r"', async function() {
            expect(getVisibleOptionValues(element)).to.deep.equal([
              'Green',
              'Orange',
              'Purple',
            ]);
          });
        });

        describe('typing "R"', function() {
          beforeEach(press('R'));
          beforeEach(nextFrame);
          beforeEach(updateComplete);
          it('shows options that start with "r"', async function() {
            expect(getVisibleOptionValues(element)).to.deep.equal([
              'Red',
            ]);
          });
        });
      });
    });
  });
});
