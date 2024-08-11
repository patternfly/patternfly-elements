import { expect, html, aTimeout, nextFrame } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfSelect } from '../pf-select.js';
import { sendKeys } from '@web/test-runner-commands';
import { a11ySnapshot, querySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';
import { clickElementAtCenter } from '@patternfly/pfe-tools/test/utils.js';
import type { PfOption } from '../pf-option.js';

async function holdShift() {
  await sendKeys({ down: 'Shift' });
}

async function releaseShift() {
  await sendKeys({ up: 'Shift' });
}

async function holdCtrl() {
  await sendKeys({ down: 'Control' });
}

async function releaseCtrl() {
  await sendKeys({ up: 'Control' });
}

function press(key: string) {
  return async function() {
    await sendKeys({ press: key });
  };
}

function getValues(element: PfSelect): string[] {
  return element.selected.filter(x => !!x).map(x => x!.value);
}

// a11yShapshot does not surface the options
function getVisibleOptionValues() {
  return Array.from(document.querySelectorAll<PfOption>('pf-option:not([hidden])'), x => x.value);
}

// a11yShapshot does not surface the options
function getActiveOption() {
  return document.querySelector<PfOption>('pf-option[active]');
}

describe('<pf-select>', function() {
  it('imperatively instantiates', function() {
    expect(document.createElement('pf-select')).to.be.an.instanceof(PfSelect);
  });

  it('should upgrade', async function() {
    expect(await createFixture<PfSelect>(html`<pf-select></pf-select>`))
        .to.be.an.instanceOf(customElements.get('pf-select'))
        .and
        .to.be.an.instanceOf(PfSelect);
  });
});

describe('<pf-select> in a deep shadow root', function() {
  let element: PfSelect;
  const focus = () => element.focus();
  const updateComplete = () => element.updateComplete;
  beforeEach(async function() {
    const fixture = await createFixture(html`
      <shadow-root>
        <template shadowrootmode="open">
          <shadow-root>
            <template shadowrootmode="open">
              <pf-select variant="single"
                         accessible-label="Choose a number"
                         placeholder="Choose a number">
                <pf-option value="1">1</pf-option>
                <pf-option value="2">2</pf-option>
                <pf-option value="3">3</pf-option>
                <pf-option value="4">4</pf-option>
                <pf-option value="5">5</pf-option>
                <pf-option value="6">6</pf-option>
                <pf-option value="7">7</pf-option>
                <pf-option value="8">8</pf-option>
              </pf-select>
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

    const select = fixture.shadowRoot?.firstElementChild?.shadowRoot?.querySelector('pf-select');
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
        describe('Space', function() {
          beforeEach(press(' '));
          beforeEach(updateComplete);
          it('closes', function() {
            expect(element.expanded).to.be.false;
          });
          it('sets value', function() {
            expect(element.value).to.equal('2');
          });
        });
      });
    });
  });
});

describe('<pf-select variant="single">', function() {
  let element: PfSelect;
  let items: PfOption[];
  const updateComplete = () => element.updateComplete;
  const focus = () => element.focus();

  beforeEach(async function() {
    element = await createFixture<PfSelect>(html`
      <pf-select variant="single"
                 accessible-label="Choose a number"
                 placeholder="Choose a number">
        <pf-option value="1">1</pf-option>
        <pf-option value="2">2</pf-option>
        <pf-option value="3">3</pf-option>
        <pf-option value="4">4</pf-option>
        <pf-option value="5">5</pf-option>
        <pf-option value="6">6</pf-option>
        <pf-option value="7">7</pf-option>
        <pf-option value="8">8</pf-option>
      </pf-select>`);
    items = Array.from(element.querySelectorAll('pf-option'));
  });

  it('passes aXe audit', async function() {
    await expect(element).to.be.accessible();
  });

  it('does not have redundant role', async function() {
    expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
  });

  it('sets aria-setsize and aria-posinset on items', function() {
    expect(items.at(0)).to.have.attr('aria-setsize', '9');
    expect(items.at(-1)).to.have.attr('aria-setsize', '9');
    expect(items.at(0)).to.have.attr('aria-posinset', '2');
    expect(items.at(-1)).to.have.attr('aria-posinset', '9');
  });

  describe('without accessible label', function() {
    beforeEach(function() {
      element.accessibleLabel = undefined;
    });
    beforeEach(updateComplete);
    it('fails aXe audit', async function() {
      await expect(element).to.not.be.accessible();
    });
  });

  describe('focus()', function() {
    beforeEach(focus);
    beforeEach(updateComplete);

    describe('Enter', function() {
      beforeEach(press('Enter'));
      beforeEach(updateComplete);

      it('expands the listbox', async function() {
        expect(element.expanded).to.be.true;
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });

      it('focuses on the placeholder', async function() {
        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('Choose a number');
      });
    });

    describe('Space', function() {
      let scrollY: number;
      beforeEach(function() {
        document.body.style.height = '8000px';
      });
      afterEach(function() {
        document.body.style.height = 'initial';
      });
      beforeEach(function() {
        ({ scrollY } = window);
      });

      beforeEach(press(' '));
      beforeEach(updateComplete);
      beforeEach(() => aTimeout(300));

      it('expands the listbox', async function() {
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });

      it('focuses on the placeholder', async function() {
        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('Choose a number');
      });

      it('does not scroll the screen', function() {
        expect(scrollY).to.equal(window.scrollY);
      });
    });

    describe('Home', function() {
      beforeEach(press('Home'));
      beforeEach(updateComplete);

      it('expands the listbox', async function() {
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });

      it('focuses on the placeholder', async function() {
        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('Choose a number');
      });
    });

    describe('End', function() {
      beforeEach(press('End'));
      beforeEach(updateComplete);

      it('expands the listbox', async function() {
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });

      it('focuses on the last item', async function() {
        expect(await a11ySnapshot())
            .to.have.axTreeFocusOn(items.at(-1));
      });
    });

    describe('click combobox button', function() {
      beforeEach(() => clickElementAtCenter(element));
      beforeEach(updateComplete);

      it('expands the listbox', async function() {
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });

      it('focuses on the placeholder', async function() {
        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('Choose a number');
      });

      describe('Tab', function() {
        beforeEach(press('Tab'));
        it('should not focus the combobox button', async function() {
          expect(await a11ySnapshot())
              .axTreeFocusedNode
              .to.not.have.axRole('combobox')
              .and
              .to.not.have.axRole('button');
        });
      });
    });

    describe('ArrowDown', function() {
      beforeEach(press('ArrowDown'));
      beforeEach(updateComplete);

      it('expands the listbox', async function() {
        expect(element.expanded).to.be.true;
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });

      it('focuses on the placeholder', async function() {
        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('Choose a number');
      });

      describe('ArrowUp', function() {
        beforeEach(press('ArrowUp'));
        beforeEach(updateComplete);
        it('focuses on the last option', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('8');
        });
        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          it('focuses on the placeholder', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('Choose a number');
          });
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);

        it('focuses on option 1', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
        });

        describe('ArrowUp', function() {
          beforeEach(press('ArrowUp'));
          beforeEach(updateComplete);
          it('focuses on the placeholder', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('Choose a number');
          });
        });

        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          it('focuses on option 2', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('2');
          });

          describe('Enter', function() {
            beforeEach(press('Enter'));
            beforeEach(updateComplete);

            it('selects option 2', function() {
              expect(getValues(element)).to.deep.equal(['2']);
            });

            it('hides the listbox', async function() {
              expect(element.expanded).to.be.false;
              expect(await a11ySnapshot()).to.not.axContainRole('listbox');
            });

            describe('ArrowDown', function() {
              beforeEach(press('ArrowDown'));
              beforeEach(updateComplete);

              it('expands the listbox', async function() {
                expect(element.expanded).to.be.true;
                expect(await a11ySnapshot()).to.axContainRole('listbox');
              });

              describe('Home', function() {
                beforeEach(press('Home'));
                beforeEach(updateComplete);

                it('focuses on option 1', async function() {
                  expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
                });

                describe('Home', function() {
                  beforeEach(press('Home'));
                  beforeEach(updateComplete);

                  it('focuses on option 1', async function() {
                    expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axName('1');
                  });
                });
              });
            });
          });
        });

        describe('Enter', function() {
          beforeEach(press('Enter'));
          beforeEach(updateComplete);

          it('selects option 1', function() {
            expect(getValues(element)).to.deep.equal(['1']);
          });
        });
      });

      describe('Space', function() {
        beforeEach(press(' '));
        beforeEach(updateComplete);

        it('hides the listbox', async function() {
          expect(element.expanded).to.be.false;
          expect(await a11ySnapshot()).to.not.axContainRole('listbox');
        });

        it('focuses the button', async function() {
          expect(await a11ySnapshot())
              .axTreeFocusedNode
              .to.have.axRole('combobox')
              .and.to.have.axName('Choose a number');
        });

        it('does not select anything', async function() {
          // because the placeholder was focused
          expect(getValues(element)).to.deep.equal([]);
        });
      });

      describe('Tab', function() {
        beforeEach(press('Tab'));
        beforeEach(nextFrame);
        beforeEach(updateComplete);
        it('hides the listbox', async function() {
          expect(element.expanded).to.be.false;
          expect(await a11ySnapshot()).to.not.axContainRole('listbox');
        });
        it('focuses the button', async function() {
          expect(await a11ySnapshot())
              .axTreeFocusedNode
              .to.have.axRole('combobox')
              .and.to.have.axName('Choose a number');
        });
      });

      describe('Shift+Tab', function() {
        beforeEach(holdShift);
        beforeEach(press('Tab'));
        beforeEach(releaseShift);
        beforeEach(updateComplete);
        it('hides the listbox', async function() {
          expect(element.expanded).to.be.false;
          expect(await a11ySnapshot()).to.not.axContainRole('listbox');
        });
        it('focuses the button', async function() {
          expect(await a11ySnapshot())
              .axTreeFocusedNode
              .to.have.axRole('combobox')
              .and.to.have.axName('Choose a number');
        });
      });

      describe('Escape', function() {
        beforeEach(press('Escape'));
        beforeEach(nextFrame);
        beforeEach(updateComplete);
        it('hides the listbox', async function() {
          expect(element.expanded).to.be.false;
          expect(await a11ySnapshot()).to.not.axContainRole('listbox');
        });
        it('focuses the button', async function() {
          expect(await a11ySnapshot())
              .axTreeFocusedNode
              .to.have.axRole('combobox')
              .and.to.have.axName('Choose a number');
        });
      });
    });
  });
});

describe('<pf-select variant="checkbox">', function() {
  let element: PfSelect;
  let items: PfOption[];
  const updateComplete = () => element.updateComplete;
  const focus = () => element.focus();
  beforeEach(async function() {
    element = await createFixture<PfSelect>(html`
      <pf-select variant="checkbox"
                 placeholder="placeholder"
                 accessible-label="Check it out">
        <pf-option value="1">1</pf-option>
        <pf-option value="2">2</pf-option>
        <pf-option value="3">3</pf-option>
        <pf-option value="4">4</pf-option>
        <pf-option value="5">5</pf-option>
        <pf-option value="6">6</pf-option>
        <pf-option value="7">7</pf-option>
        <pf-option value="8">8</pf-option>
      </pf-select>`);
    items = Array.from(element.querySelectorAll('pf-option'));
  });

  it('is accessible', async function() {
    await expect(element).to.be.accessible();
  });

  it('does not have redundant role', async function() {
    expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
  });

  describe('focus()', function() {
    beforeEach(focus);

    beforeEach(updateComplete);
    describe('Enter', function() {
      beforeEach(press('Enter'));
      beforeEach(updateComplete);

      it('expands the listbox', async function() {
        expect(element.expanded).to.be.true;
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.at(1)).to.be.ok;
        expect(snapshot.children?.at(1)?.role).to.equal('listbox');
      });

      it('should NOT use checkbox role for options', async function() {
        const snapshot = await a11ySnapshot();
        expect(snapshot.children?.at(1)?.children?.filter(x => x.role === 'checkbox')?.length)
            .to.equal(0);
      });
    });

    describe('Space', function() {
      beforeEach(press(' '));
      beforeEach(updateComplete);
      it('expands the listbox', async function() {
        expect(element.expanded).to.be.true;
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });
    });

    describe('ArrowDown', function() {
      beforeEach(press('ArrowDown'));
      beforeEach(updateComplete);
      it('expands the listbox', async function() {
        expect(element.expanded).to.be.true;
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });

      it('focuses the placeholder', async function() {
        expect(await a11ySnapshot()).to.have.axTreeFocusedNode.to.have.axName('placeholder');
      });

      describe('Shift+Tab', function() {
        beforeEach(holdShift);
        beforeEach(press('Tab'));
        beforeEach(releaseShift);
        beforeEach(updateComplete);

        it('hides the listbox', async function() {
          expect(element.expanded).to.be.false;
          expect(await a11ySnapshot()).to.not.axContainRole('listbox');
        });

        it('focuses the button', async function() {
          expect(await a11ySnapshot())
              .axTreeFocusedNode
              .to.have.axRole('combobox');
        });
      });

      describe('Tab', function() {
        beforeEach(press('Tab'));
        beforeEach(nextFrame);
        beforeEach(updateComplete);
        // a little extra sleep to de-flake this test
        beforeEach(nextFrame);
        beforeEach(updateComplete);
        it('closes', function() {
          expect(element.expanded).to.be.false;
        });
        it('hides the listbox', async function() {
          const snapshot = await a11ySnapshot();
          const listbox = snapshot.children?.find(x => x.role === 'listbox');
          expect(listbox).to.be.undefined;
        });
      });

      describe('Escape', function() {
        beforeEach(press('Escape'));
        beforeEach(updateComplete);
        it('closes', function() {
          expect(element.expanded).to.be.false;
        });
        it('hides the listbox', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.undefined;
        });
        it('focuses the button', async function() {
          const snapshot = await a11ySnapshot();
          const focused = querySnapshot(snapshot, { focused: true });
          expect(focused?.role).to.equal('combobox');
        });
      });

      describe('Ctrl-A', function() {
        beforeEach(holdCtrl);
        beforeEach(press('A'));
        beforeEach(releaseCtrl);
        beforeEach(updateComplete);
        it('selects all', function() {
          expect(element.selected.length).to.equal(items.length);
        });
        it('remains expanded', async function() {
          expect(element.expanded).to.be.true;
          expect(await a11ySnapshot()).to.axContainRole('listbox');
        });

        describe('Ctrl-A', function() {
          beforeEach(holdCtrl);
          beforeEach(press('A'));
          beforeEach(releaseCtrl);
          beforeEach(updateComplete);
          it('deselects all', function() {
            expect(element.selected.length).to.equal(0);
          });
          it('remains expanded', async function() {
            expect(element.expanded).to.be.true;
            expect(await a11ySnapshot()).to.axContainRole('listbox');
          });
        });
      });

      describe('Space', function() {
        it('does not select anything', function() {
          expect(element.selected).to.deep.equal([]);
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);
        describe('Space', function() {
          beforeEach(press(' '));
          beforeEach(updateComplete);

          it('selects option 1', function() {
            // because the placeholder was focused
            expect(getValues(element)).to.deep.equal(['1']);
          });

          it('remains expanded', async function() {
            expect(element.expanded).to.be.true;
            expect(await a11ySnapshot()).to.axContainRole('listbox');
          });

          describe('ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);

            it('focuses option 2', async function() {
              const snapshot = await a11ySnapshot();
              expect(snapshot).to.have.axQuery({
                focused: true,
                name: '2',
              });
            });

            describe('Enter', function() {
              beforeEach(press('Enter'));
              beforeEach(updateComplete);
              it('adds option 2 to selection', function() {
                expect(getValues(element)).to.deep.equal([
                  '1',
                  '2',
                ]);
              });

              it('remains expanded', async function() {
                expect(element.expanded).to.be.true;
                expect(await a11ySnapshot()).to.axContainRole('listbox');
              });
            });
          });

          describe('holding Shift', function() {
            beforeEach(holdShift);
            afterEach(releaseShift);
            describe('ArrowDown', function() {
              beforeEach(press('ArrowDown'));
              beforeEach(nextFrame);
              it('adds option 2 to selection', function() {
                expect(getValues(element)).to.deep.equal([
                  '1',
                  '2',
                ]);
              });
              describe('Enter', function() {
                beforeEach(press('Enter'));
                beforeEach(updateComplete);
                it('makes no change', function() {
                  expect(getValues(element)).to.deep.equal([
                    '1',
                    '2',
                  ]);
                });
                beforeEach(updateComplete);
                describe('ArrowDown', function() {
                  beforeEach(press('ArrowDown'));
                  beforeEach(updateComplete);
                  it('adds option 3 to the selected list', function() {
                    expect(getValues(element)).to.deep.equal([
                      '1',
                      '2',
                      '3',
                    ]);
                  });
                  describe('ArrowUp', function() {
                    beforeEach(press('Enter'));
                    beforeEach(updateComplete);
                    it('makes no change to selection', function() {
                      expect(getValues(element)).to.deep.equal([
                        '1',
                        '2',
                        '3',
                      ]);
                    });
                  });
                });
              });
            });
          });
        });
      });

      describe('clicking the first item', function() {
        beforeEach(() => clickElementAtCenter(items.at(0)!));
        beforeEach(updateComplete);

        it('selects option 1', function() {
          // because the placeholder was focused
          expect(getValues(element)).to.deep.equal(['1']);
        });

        it('remains expanded', async function() {
          expect(element.expanded).to.be.true;
          expect(await a11ySnapshot()).to.axContainRole('listbox');
        });

        describe('holding Shift', function() {
          beforeEach(holdShift);
          afterEach(releaseShift);
          describe('clicking the 7th item', function() {
            beforeEach(() => clickElementAtCenter(items.at(6)!));
            it('remains expanded', async function() {
              expect(element.expanded).to.be.true;
              expect(await a11ySnapshot()).to.axContainRole('listbox');
            });

            it('selects items 1-7', function() {
              expect(getValues(element)).to.deep.equal([
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
              ]);
            });

            describe('releasing Shift', function() {
              beforeEach(releaseShift);
              describe('clicking 6th item', function() {
                beforeEach(() => clickElementAtCenter(items.at(5)!));
                it('deselects item 6', function() {
                  expect(getValues(element)).to.not.contain('6');
                });
                describe('holding Shift', function() {
                  beforeEach(holdShift);
                  describe('clicking 2nd item', function() {
                    beforeEach(() => clickElementAtCenter(items.at(1)!));
                    it('deselects items 2-6', function() {
                      expect(getValues(element)).to.deep.equal(['1', '7']);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

describe('<pf-select variant="typeahead">', function() {
  let element: PfSelect;
  const updateComplete = () => element.updateComplete;
  const focus = () => element.focus();
  beforeEach(async function() {
    element = await createFixture<PfSelect>(html`
      <pf-select variant="typeahead"
                 placeholder="Select a color"
                 accessible-label="Colors">
        <pf-option value="Blue">Blue</pf-option>
        <pf-option value="Green">Green</pf-option>
        <pf-option value="Magenta">Magenta</pf-option>
        <pf-option value="Orange">Orange</pf-option>
        <pf-option value="Purple">Purple</pf-option>
        <pf-option value="Periwinkle">Periwinkle</pf-option>
        <pf-option value="Pink">Pink</pf-option>
        <pf-option value="Red">Red</pf-option>
        <pf-option value="Yellow">Yellow</pf-option>
      </pf-select>`);
  });

  it('does not have redundant role', async function() {
    expect(element.shadowRoot?.firstElementChild).to.not.contain('[role="button"]');
  });

  describe('focus()', function() {
    beforeEach(focus);

    beforeEach(updateComplete);

    it('focuses the combobox input', async function() {
      expect(await a11ySnapshot()).axTreeFocusedNode.to.deep.equal({
        role: 'combobox',
        name: 'Colors',
        focused: true,
        autocomplete: 'both',
        haspopup: 'listbox',
      });
    });

    describe('typing "r"', function() {
      beforeEach(press('r'));
      beforeEach(updateComplete);

      it('only shows options that start with "r" or "R"', async function() {
        expect(getVisibleOptionValues()).to.deep.equal([
          'Red',
        ]);
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

    describe('p', function() {
      beforeEach(press('p'));
      beforeEach(updateComplete);

      it('shows the listbox and maintains focus', async function() {
        expect(await a11ySnapshot())
            .to.axContainRole('listbox')
            .and.axTreeFocusedNode
            .to.have.axRole('combobox')
            .and.to.have.axProperty('value', 'p');
      });

      it('only shows listbox items starting with the letter p', function() {
        expect(getVisibleOptionValues()).to.deep.equal([
          'Purple',
          'Periwinkle',
          'Pink',
        ]);
      });

      describe('Backspace', function() {
        beforeEach(press('Backspace'));
        beforeEach(updateComplete);

        it('shows the listbox and maintains focus', async function() {
          expect(await a11ySnapshot())
              .to.axContainRole('listbox')
              .and.axTreeFocusedNode
              .to.have.axRole('combobox')
              .and.to.not.have.axProperty('value', 'p');
        });

        it('all options are visible', async function() {
          expect(getVisibleOptionValues()).to.deep.equal([
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

      // pending a11y review
      // see https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/#kbd_label_listbox
      // in which home/end do not move listbox at focus
      describe.skip('u', function() {
        beforeEach(press('u'));
        beforeEach(updateComplete);
        it('only shows the option "Purple"', function() {
          expect(getVisibleOptionValues()).to.deep.equal([
            'Purple',
          ]);
        });
        describe('ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          it('focuses the option "Purple"', function() {
            expect(getActiveOption()).to.have.text('Purple');
          });
          describe('Enter', function() {
            beforeEach(press('Enter'));
            beforeEach(updateComplete);
            it('selects the option "Purple"', function() {
              expect(getValues(element)).to.deep.equal([
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
                expect(getVisibleOptionValues()).to.deep.equal([
                  'Purple',
                  'Periwinkle',
                  'Pink',
                ]);
              });
              describe('Home', function() {
                beforeEach(press('Home'));
                it('focuses the option "Purple"', function() {
                  expect(getActiveOption()).to.have.text('Purple');
                });
              });
              describe('End', function() {
                beforeEach(press('End'));
                it('focuses the option "Pink"', function() {
                  expect(getActiveOption()).to.have.text('Pink');
                });
              });
            });
          });
        });
      });
    });

    describe('ArrowDown', function() {
      beforeEach(press('ArrowDown'));
      beforeEach(updateComplete);
      it('shows the listbox', async function() {
        expect(element.expanded).to.be.true;
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });
      it('focuses the first item', async function() {
        expect(await a11ySnapshot()).to.axContainRole('listbox');
        expect(getActiveOption()).to.have.value('Blue');
      });
      it('does not move keyboard focus', async function() {
        expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
      });
      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);
        it('focuses the second option', function() {
          const [, item] = document.querySelectorAll('pf-option');
          expect(getActiveOption()).to.equal(item);
        });
        describe('Enter', function() {
          beforeEach(press('Enter'));
          beforeEach(updateComplete);
          it('selects the second option', function() {
            expect(getValues(element)).to.deep.equal(['Green']);
          });
          it('sets typeahead input to second option value', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axProperty('value', 'Green');
          });
          it('retains focuses on combobox input', async function() {
            expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
          });
          it('hides the listbox', async function() {
            expect(await a11ySnapshot()).to.not.axContainRole('listbox');
          });
        });
      });
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
        expect(getVisibleOptionValues()).to.deep.equal([
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
        expect(getVisibleOptionValues()).to.deep.equal([
          'Red',
        ]);
      });
    });
  });
});

// try again when we implement activedescendant
describe.skip('<pf-select variant="typeaheadmulti">', function() {
  let element: PfSelect;
  const updateComplete = () => element.updateComplete;
  const focus = () => element.focus();
  beforeEach(async function() {
    element = await createFixture<PfSelect>(html`
      <pf-select variant="typeaheadmulti">
        <pf-option value="Amethyst">Amethyst</pf-option>
        <pf-option value="Beryl">Beryl</pf-option>
        <pf-option value="Chalcedony">Chalcedony</pf-option>
        <pf-option value="Diamond">Diamond</pf-option>
        <pf-option value="Emerald">Emerald</pf-option>
        <pf-option value="Fool's Gold">Fool's Gold</pf-option>
        <pf-option value="Garnet">Garnet</pf-option>
        <pf-option value="Halite">Halite</pf-option>
        <pf-option value="Iris">Iris</pf-option>
      </pf-select>`);
  });

  describe('focus()', function() {
    beforeEach(focus);
    beforeEach(updateComplete);

    it('focuses the typeahead input', async function() {
      expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
    });

    describe('ArrowDown', function() {
      beforeEach(press('ArrowDown'));
      beforeEach(updateComplete);

      it('shows the listbox', async function() {
        expect(element.expanded).to.be.true;
        expect(await a11ySnapshot()).to.axContainRole('listbox');
      });

      it('focuses the first option', async function() {
        expect(getActiveOption()).to.have.property('value', 'Amethyst');
      });

      describe('Shift+Tab', function() {
        beforeEach(holdShift);
        beforeEach(press('Tab'));
        beforeEach(releaseShift);
        beforeEach(updateComplete);
        it('closes', function() {
          expect(element.expanded).to.be.false;
        });

        it('hides the listbox', async function() {
          expect(element.expanded).to.be.false;
          expect(await a11ySnapshot()).to.not.axContainRole('listbox');
        });

        it('focuses the toggle button', async function() {
          expect(await a11ySnapshot()).axTreeFocusedNode.to.have.axRole('combobox');
        });

        describe('Shift+Tab', function() {
          beforeEach(holdShift);
          beforeEach(press('Tab'));
          beforeEach(releaseShift);
          beforeEach(updateComplete);
          it('focuses the combobox input', async function() {
            expect(await a11ySnapshot())
                .axTreeFocusedNode
                .to.have.axRole('combobox');
          });
        });
      });

      describe('ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);
        describe('Enter', function() {
          beforeEach(press('Enter'));
          beforeEach(updateComplete);
          it('selects the second option', function() {
            expect(getValues(element)).to.deep.equal(['Beryl']);
          });
          it('focuses on second option', async function() {
            expect(getActiveOption()).to.have.property('value', 'Beryl');
          });
          it('remains expanded', async function() {
            expect(element.expanded).to.be.true;
            expect(await a11ySnapshot()).to.axContainRole('listbox');
          });
          it('shows 1 chip', async function() {
            expect(await a11ySnapshot())
                .to.axContainQuery({
                  role: 'button',
                  name: 'Close',
                  description: 'Beryl',
                });
          });
          describe('ArrowUp', function() {
            beforeEach(press('ArrowUp'));
            beforeEach(updateComplete);
            it('focuses the first option', async function() {
              expect(getActiveOption()).to.equal('Amethyst');
              expect(await a11ySnapshot())
                  .axTreeFocusedNode.to.have.axName('Amethyst');
            });
            describe('Enter', function() {
              beforeEach(press('Enter'));
              beforeEach(updateComplete);
              it('adds second option to selected values', function() {
                expect(getValues(element)).to.deep.equal([
                  'Amethyst',
                  'Beryl',
                ]);
              });
              it('accessible combo button label should be "2 items selected"', async function() {
                expect(await a11ySnapshot())
                    .axTreeFocusedNode
                    .to.have.axRole('combobox')
                    .and
                    .to.have.axName('2 items selected');
              });
              it('shows 2 chips', async function() {
                expect(await a11ySnapshot())
                    .to.axContainQuery({ role: 'button', name: 'Close', description: 'Amethyst' })
                    .and
                    .to.axContainQuery({ role: 'button', name: 'Close', description: 'Beryl' });
              });
              describe('Shift+Tab', function() {
                beforeEach(holdShift);
                beforeEach(press('Tab'));
                beforeEach(releaseShift);
                beforeEach(updateComplete);
                it('focuses the combobox input', async function() {
                  expect(await a11ySnapshot())
                      .axTreeFocusedNode
                      .to.have.axRole('combobox');
                });
                describe('Shift+Tab', function() {
                  beforeEach(holdShift);
                  beforeEach(press('Tab'));
                  beforeEach(releaseShift);
                  beforeEach(updateComplete);
                  it('focuses the combobox input', async function() {
                    expect(await a11ySnapshot())
                        .axTreeFocusedNode
                        .to.have.axRole('combobox');
                  });
                  describe('Shift+Tab', function() {
                    beforeEach(holdShift);
                    beforeEach(press('Tab'));
                    beforeEach(releaseShift);
                    beforeEach(updateComplete);
                    it('focuses the last chip\'s close button', async function() {
                      expect(await a11ySnapshot())
                          .axTreeFocusedNode
                          .to.have.axRole('button')
                          .and
                          .to.have.axName('Close')
                          .and
                          .to.have.axDescription('Beryl');
                    });
                    describe('Space', function() {
                      beforeEach(updateComplete);
                      beforeEach(press(' '));
                      beforeEach(updateComplete);
                      beforeEach(updateComplete);
                      it('removes the second chip', async function() {
                        expect(await a11ySnapshot()).to.not.have.axDescription('Beryl');
                      });
                      it('removes the second option from the selected values', function() {
                        expect(getValues(element)).to.deep.equal([
                          'Amethyst',
                        ]);
                      });
                      it('focuses the combobox', async function() {
                        expect(await a11ySnapshot())
                            .axTreeFocusedNode
                            .to.have.axRole('combobox');
                      });
                      describe('Shift+Tab', function() {
                        beforeEach(holdShift);
                        beforeEach(press('Tab'));
                        beforeEach(releaseShift);
                        beforeEach(updateComplete);
                        it('focuses the first chip', async function() {
                          expect(await a11ySnapshot())
                              .axTreeFocusedNode
                              .to.have.axRole('combobox')
                              .and
                              .to.have.axDescription('Amethyst');
                        });
                        describe('Space', function() {
                          beforeEach(press(' '));
                          beforeEach(updateComplete);
                          it('removes all chips', async function() {
                            expect(await a11ySnapshot()).to.not.axContainRole('button');
                          });
                          it('focuses the combobox', async function() {
                            expect(await a11ySnapshot())
                                .axTreeFocusedNode
                                .to.have.axRole('combobox');
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});

