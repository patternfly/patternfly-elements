import { expect, html } from '@open-wc/testing';
import { createFixture } from '@patternfly/pfe-tools/test/create-fixture.js';
import { PfSelect } from '../pf-select.js';
import { sendKeys } from '@web/test-runner-commands';
import { a11ySnapshot } from '@patternfly/pfe-tools/test/a11y-snapshot.js';

async function shiftHold() {
  await sendKeys({ down: 'Shift' });
}

async function shiftRelease() {
  await sendKeys({ up: 'Shift' });
}

async function ctrlA() {
  await sendKeys({ down: 'Control' });
  await sendKeys({ down: 'a' });
  await sendKeys({ up: 'a' });
  await sendKeys({ up: 'Control' });
}

function press(key = 'Tab') {
  return async function() {
    await sendKeys({ press: key });
  };
}

function getValues(element: PfSelect) {
  return [element.selected].flat().filter(x => !!x).map(x => x!.value);
}

describe('<pf-select>', function() {
  let element: PfSelect;

  const updateComplete = () => element.updateComplete;

  describe('simply instantiating', function() {
    it('imperatively instantiates', function() {
      expect(document.createElement('pf-select')).to.be.an.instanceof(PfSelect);
    });

    it('should upgrade', async function() {
      element = await createFixture<PfSelect>(html`<pf-select></pf-select>`);
      const klass = customElements.get('pf-select');
      expect(element)
        .to.be.an.instanceOf(klass)
        .and
        .to.be.an.instanceOf(PfSelect);
    });
  });

  describe('variant="single"', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select variant="single">
          <pf-option value="1">1</pf-option>
          <pf-option value="2">2</pf-option>
          <pf-option value="3">3</pf-option>
          <pf-option value="4">4</pf-option>
          <pf-option value="5">5</pf-option>
          <pf-option value="6">6</pf-option>
          <pf-option value="7">7</pf-option>
          <pf-option value="8">8</pf-option>
        </pf-select>`);
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });

    describe('calling focus())', function() {
      beforeEach(function() {
        element.focus();
      });

      beforeEach(updateComplete);

      describe('pressing Enter', function() {
        beforeEach(press('Enter'));
        beforeEach(updateComplete);

        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.ok;
          expect(snapshot.children?.at(1)?.role).to.equal('listbox');
        });

        it('focuses on option 1', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)?.children?.find(x => x.focused)?.name)
            .to.equal('1');
        });
      });

      describe('pressing Space', function() {
        beforeEach(press(' '));
        beforeEach(updateComplete);

        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.ok;
          expect(snapshot.children?.at(1)?.role).to.equal('listbox');
        });

        it('focuses on option 1', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)?.children?.at(0)?.focused).to.be.true;
        });
      });

      describe('pressing ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);

        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.ok;
          expect(snapshot.children?.at(1)?.role).to.equal('listbox');
        });

        it('focuses on option 1', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)?.children?.find(x => x.focused)?.name)
            .to.equal('1');
        });

        describe('then pressing ArrowUp', function() {
          beforeEach(press('ArrowUp'));
          beforeEach(updateComplete);
          it('focuses on the last option', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(1)?.children?.find(x => x.focused)?.name)
              .to.equal('8');
          });
          describe('then pressing ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);
            it('focuses on option 1', async function() {
              const snapshot = await a11ySnapshot();
              expect(snapshot.children?.at(1)?.children?.find(x => x.focused)?.name)
                .to.equal('1');
            });
          });
        });

        describe('then pressing ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);

          it('focuses on option 2', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(1)?.children?.find(x => x.focused)?.name)
              .to.equal('2');
          });

          describe('then pressing ArrowUp', function() {
            beforeEach(press('ArrowUp'));
            beforeEach(updateComplete);
            it('focuses on option 1', async function() {
              const snapshot = await a11ySnapshot();
              expect(snapshot.children?.at(1)?.children?.find(x => x.focused)?.name)
                .to.equal('1');
            });
          });

          describe('then pressing Enter', function() {
            beforeEach(press('Enter'));
            beforeEach(updateComplete);

            it('selects option 2', function() {
              expect(getValues(element)).to.deep.equal(['2']);
            });
          });
        });

        describe('then pressing Space', function() {
          beforeEach(press(' '));
          beforeEach(updateComplete);

          it('closes', async function() {
            expect(element.expanded).to.be.false;
          });

          it('hides the listbox', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(1)).to.be.undefined;
          });

          it('focuses the button', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(0)?.role).to.equal('button');
            expect(snapshot.children?.at(0)?.focused).to.be.true;
          });

          it('selects option 1', async function() {
            expect(getValues(element)).to.deep.equal(['1']);
          });
        });

        describe('then pressing Shift+Tab', function() {
          beforeEach(shiftHold);
          beforeEach(press('Tab'));
          beforeEach(shiftRelease);
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
            expect(snapshot.children?.at(0)?.role).to.equal('button');
            expect(snapshot.children?.at(0)?.focused).to.be.true;
          });
        });
      });
    });
  });

  describe('variant="checkbox"', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select variant="checkbox">
          <pf-option value="1">1</pf-option>
          <pf-option value="2">2</pf-option>
          <pf-option value="3">3</pf-option>
          <pf-option value="4">4</pf-option>
          <pf-option value="5">5</pf-option>
          <pf-option value="6">6</pf-option>
          <pf-option value="7">7</pf-option>
          <pf-option value="8">8</pf-option>
        </pf-select>`);
    });

    it('should have accessible button label "Options 2"', async function() {
      const snapshot = await a11ySnapshot();
      const button = snapshot.children?.find(x => x.role === 'button');
      expect(button?.name).to.equal('Options 2');
    });

    it('is accessible', async function() {
      await expect(element).to.be.accessible();
    });

    describe('calling focus())', function() {
      beforeEach(function() {
        element.focus();
      });

      beforeEach(updateComplete);
      describe('pressing Enter', function() {
        beforeEach(press('Enter'));
        beforeEach(updateComplete);

        it('expands', async function() {
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

      describe('pressing Space', function() {
        beforeEach(press(' '));
        beforeEach(updateComplete);
        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.ok;
          expect(snapshot.children?.at(1)?.role).to.equal('listbox');
        });
      });

      describe('pressing ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);
        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.ok;
          expect(snapshot.children?.at(1)?.role).to.equal('listbox');
        });
        describe('then pressing Shift+Tab', function() {
          beforeEach(shiftHold);
          beforeEach(press('Tab'));
          beforeEach(shiftRelease);
          beforeEach(updateComplete);

          it('closes', async function() {
            expect(element.expanded).to.be.false;
          });

          it('hides the listbox', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(1)).to.be.undefined;
          });

          it('focuses the button', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(0)?.role).to.equal('button');
            expect(snapshot.children?.at(0)?.focused).to.be.true;
          });
        });

        describe('then pressing Space', function() {
          beforeEach(press(' '));
          beforeEach(updateComplete);

          it('selects option 1', function() {
            expect(getValues(element)).to.deep.equal(['1']);
          });

          it('remains expanded', async function() {
            expect(element.expanded).to.be.true;
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(1)?.role).to.equal('listbox');
          });

          describe('then pressing ArrowDown', function() {
            beforeEach(press('ArrowDown'));
            beforeEach(updateComplete);
            it('focuses option 2', async function() {
              const snapshot = await a11ySnapshot();
              expect(snapshot.children?.at(1)?.children?.find(x => x.focused)?.name)
                .to.equal('2');
            });
            describe('then pressing Enter', function() {
              beforeEach(press('Enter'));
              beforeEach(updateComplete);
              it('adds option 2 to selection', function() {
                expect(getValues(element)).to.deep.equal(['1', '2']);
              });
              it('remains expanded', async function() {
                expect(element.expanded).to.be.true;
                const snapshot = await a11ySnapshot();
                expect(snapshot.children?.at(1)?.role).to.equal('listbox');
              });

              describe.skip('badge', function() {
                // TODO(bennypowers): it's not clear to me how to assert on the state of the badge from the ax tree
                it('shows a badge with the number 2', async function() {
                  // const snapshot = await a11ySnapshot();
                });

                describe('adding `hide-badge` attribute', function() {
                  beforeEach(function() {
                    element.toggleAttribute('hide-badge', true);
                  });
                  beforeEach(updateComplete);
                  it('shows a badge with the number 2', async function() {
                    // const snapshot = await a11ySnapshot();
                  });
                });
              });

              describe('then holding Shift and pressing down arrow / enter twice in a row', function() {
                beforeEach(shiftHold);
                beforeEach(press('ArrowDown'));
                beforeEach(press('Enter'));
                beforeEach(press('ArrowDown'));
                beforeEach(press('Enter'));
                beforeEach(shiftRelease);
                beforeEach(updateComplete);

                it('adds options 3 and 4 to the selected list', function() {
                  expect(getValues(element)).to.deep.equal(['1', '2', '3', '4']);
                });

                describe('then pressing ArrowUp and Enter', function() {
                  beforeEach(press('ArrowUp'));
                  beforeEach(press('Enter'));
                  beforeEach(updateComplete);

                  it('deselects option 3', function() {
                    expect(getValues(element)).to.deep.equal(['1', '2', '4']);
                  });

                  describe('then holding down Shift and pressing arrow up / enter twice in a row', function() {
                    beforeEach(press('ArrowUp'));
                    beforeEach(press('Enter'));
                    beforeEach(updateComplete);
                    beforeEach(press('ArrowUp'));
                    beforeEach(press('Enter'));
                    beforeEach(updateComplete);
                    beforeEach(shiftRelease);
                    beforeEach(updateComplete);

                    it('deselects options 1 and 2', function() {
                      expect(getValues(element)).to.deep.equal(['4']);
                    });

                    describe('then pressing Ctrl+A', function() {
                      beforeEach(ctrlA);
                      beforeEach(updateComplete);

                      it('selects all options', function() {
                        expect(getValues(element)).to.deep.equal(['1', '2', '3', '4', '5', '6', '7', '8']);
                      });

                      describe('then pressing Ctrl+A again', function() {
                        beforeEach(ctrlA);
                        beforeEach(updateComplete);
                        it('deselects all options', function() {
                          expect(getValues(element)).to.deep.equal([]);
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

  describe('variant="typeahead"', function() {
    beforeEach(async function() {
      element = await createFixture<PfSelect>(html`
        <pf-select variant="typeahead">
          <pf-option value="Blue">Blue</pf-option>
          <pf-option value="Green">Green</pf-option>
          <pf-option value="Magenta">Magenta</pf-option>
          <pf-option value="Orange">Orange</pf-option>
          <pf-option value="Purple">Purple</pf-option>
          <pf-option value="Pink">Pink</pf-option>
          <pf-option value="Red">Red</pf-option>
          <pf-option value="Yellow">Yellow</pf-option>
        </pf-select>`);
    });

    describe('calling focus()', function() {
      beforeEach(function() {
        element.focus();
      });
      beforeEach(updateComplete);

      it('has a text input for typeahead', async function() {
        const snapshot = await a11ySnapshot();
        const [typeahead] = snapshot.children ?? [];
        expect(typeahead).to.deep.equal({
          role: 'combobox',
          name: 'Options',
          focused: true,
          autocomplete: 'both',
          haspopup: 'listbox'
        });
      });

      describe('setting filter to "r"', function() {
        beforeEach(function() {
          element.caseSensitive = false;
          element.filter = 'r';
        });
        beforeEach(updateComplete);

        it('shows options that start with "r" or "R"', async function() {
          const snapshot = await a11ySnapshot();
          const [listbox] = snapshot.children ?? [];
          expect(listbox?.children?.every(x => x.name.toLowerCase().startsWith('r'))).to.be.true;
        });

        describe('match anywhere', function() {
          beforeEach(function() {
            element.matchAnywhere = true;
          });
          beforeEach(updateComplete);
          it('shows options with "r" anywhere in them', async function() {
            const snapshot = await a11ySnapshot();
            const [listbox] = snapshot.children ?? [];
            expect(listbox.children?.map(({ name, role }) => ({ name, role }))).to.deep.equal([
              { role: 'option', name: 'Green' },
              { role: 'option', name: 'Orange' },
              { role: 'option', name: 'Purple' },
              { role: 'option', name: 'Red' }
            ]);
          });
        });

        describe('case sensitive', function() {
          beforeEach(function() {
            element.caseSensitive = true;
          });
          beforeEach(updateComplete);
          it('shows options that start with "r" or shows full list if none', async function() {
            const snapshot = await a11ySnapshot();
            const [listbox] = snapshot.children ?? [];
            expect(listbox?.children?.map(({ role, name }) => ({ role, name }))).to.deep.equal([
              { role: 'option', name: 'Blue' },
              { role: 'option', name: 'Green' },
              { role: 'option', name: 'Magenta' },
              { role: 'option', name: 'Orange' },
              { role: 'option', name: 'Purple' },
              { role: 'option', name: 'Pink' },
              { role: 'option', name: 'Red' },
              { role: 'option', name: 'Yellow' }
            ]);
          });
        });
      });

      describe('setting filter to "*"', function() {
        beforeEach(function() {
          element.filter = '*';
        });
        beforeEach(updateComplete);
        it('shows all options', async function() {
          const snapshot = await a11ySnapshot();
          const [listbox] = snapshot.children ?? [];
          expect(listbox?.children?.map(({ role, name }) => ({ role, name }))).to.deep.equal([
            { role: 'option', name: 'Blue' },
            { role: 'option', name: 'Green' },
            { role: 'option', name: 'Magenta' },
            { role: 'option', name: 'Orange' },
            { role: 'option', name: 'Purple' },
            { role: 'option', name: 'Pink' },
            { role: 'option', name: 'Red' },
            { role: 'option', name: 'Yellow' }
          ]);
        });
      });

      describe('changing input value to "p"', function() {
        beforeEach(press('p'));
        beforeEach(updateComplete);

        it('show listbox items starting with "p"', async function() {
          const snapshot = await a11ySnapshot();
          const [,, listbox] = snapshot.children ?? [];
          expect(listbox.children?.map(({ name, role }) => ({ name, role }))).to.deep.equal([
            { role: 'option', name: 'Purple' },
            { role: 'option', name: 'Pink' }
          ]);
        });

        describe('pressing Backspace so input value is ""', function() {
          beforeEach(press('Backspace'));
          beforeEach(updateComplete);

          it('all options are visible', async function() {
            const snapshot = await a11ySnapshot();
            const [,, listbox] = snapshot.children ?? [];
            expect(listbox.children?.map(({ name, role }) => ({ name, role }))).to.deep.equal([
              { role: 'option', name: 'Blue' },
              { role: 'option', name: 'Green' },
              { role: 'option', name: 'Magenta' },
              { role: 'option', name: 'Orange' },
              { role: 'option', name: 'Purple' },
              { role: 'option', name: 'Pink' },
              { role: 'option', name: 'Red' },
              { role: 'option', name: 'Yellow' }
            ]);
          });
        });
      });

      describe('pressing ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);
        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.ok;
          expect(snapshot.children?.at(1)?.role).to.equal('listbox');
        });
        it('focuses the first option', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)?.children?.at(0)?.focused).to.be.true;
        });
        describe('then pressing ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          describe('then pressing Enter', function() {
            beforeEach(press('Enter'));
            beforeEach(updateComplete);
            it('selects the second option', function() {
              expect(getValues(element)).to.deep.equal(['Green']);
            });
            it('sets typeahead input to second option value', async function() {
              const snapshot = await a11ySnapshot();
              expect(snapshot.children?.at(0)?.valuetext).to.equal('Green');
            });
            it('focuses on typeahead input', async function() {
              const snapshot = await a11ySnapshot();
              expect(snapshot.children?.at(0)?.focused).to.be.true;
            });
            it('closes', async function() {
              expect(element.expanded).to.be.false;
              const snapshot = await a11ySnapshot();
              expect(snapshot.children?.at(1)).to.be.undefined;
            });
          });
        });
      });
    });
  });

  describe('variant="typeaheadmulti"', function() {
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

    describe('calling focus()', function() {
      beforeEach(function() {
        element.focus();
      });
      beforeEach(updateComplete);
      it('focuses the typeahead input', async function() {
        const snapshot = await a11ySnapshot();
        const [input] = snapshot.children ?? [];
        expect(input.focused).to.be.true;
        expect(input.role).to.equal('combobox');
      });

      describe('pressing ArrowDown', function() {
        beforeEach(press('ArrowDown'));
        beforeEach(updateComplete);

        it('expands', async function() {
          expect(element.expanded).to.be.true;
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)).to.be.ok;
          expect(snapshot.children?.at(1)?.role).to.equal('listbox');
        });

        it('focuses the first option', async function() {
          const snapshot = await a11ySnapshot();
          expect(snapshot.children?.at(1)?.children?.at(0)?.focused).to.be.true;
        });

        describe('then pressing Shift+Tab', function() {
          beforeEach(shiftHold);
          beforeEach(press('Tab'));
          beforeEach(shiftRelease);
          beforeEach(updateComplete);
          it('closes', async function() {
            expect(element.expanded).to.be.false;
          });

          it('hides the listbox', async function() {
            const snapshot = await a11ySnapshot();
            expect(snapshot.children?.at(1)).to.be.undefined;
          });

          it('focuses the typeahead input', async function() {
            const snapshot = await a11ySnapshot();
            const [input] = snapshot.children ?? [];
            expect(input.focused).to.be.true;
            expect(input.role).to.equal('combobox');
          });
        });

        describe('then pressing ArrowDown', function() {
          beforeEach(press('ArrowDown'));
          beforeEach(updateComplete);
          describe('then pressing Enter', function() {
            beforeEach(press('Enter'));
            beforeEach(updateComplete);
            it('selects the second option', function() {
              expect(getValues(element)).to.deep.equal(['Beryl']);
            });
            it('sets typeahead input to second option value', async function() {
              const snapshot = await a11ySnapshot();
              expect(snapshot.children?.at(0)?.valuetext).to.equal('Beryl');
            });
            it('focuses on second option', async function() {
              const snapshot = await a11ySnapshot();
              const [, listbox] = snapshot.children ?? [];
              expect(listbox.children?.at(1)?.focused).to.be.true;
            });
            it('remains expanded', async function() {
              expect(element.expanded).to.be.false;
              const snapshot = await a11ySnapshot();
              expect(snapshot.children?.at(1)?.role).to.equal('listbox');
            });
            it('shows 1 chip', async function() {
              const snapshot = await a11ySnapshot();
              const [, chip1close] = snapshot.children ?? [];
              expect(chip1close?.role).to.equal('button');
              expect(chip1close?.name).to.equal('Close');
              expect(chip1close?.description).to.equal('Beryl');
            });
            describe('then pressing ArrowUp', function() {
              beforeEach(press('ArrowUp'));
              beforeEach(updateComplete);
              it('focuses the first option', async function() {
                const snapshot = await a11ySnapshot();
                const [, listbox] = snapshot.children ?? [];
                expect(listbox.children?.at(0)?.focused).to.be.true;
              });
              describe('then pressing Enter', function() {
                beforeEach(press('Enter'));
                beforeEach(updateComplete);
                it('adds second option to selected values', function() {
                  expect(getValues(element)).to.deep.equal(['Amethyst', 'Beryl']);
                });
                it('accessible combo button label should be "2 items selected"', async function() {
                  const snapshot = await a11ySnapshot();
                  const button = snapshot.children?.find(x => x.role === 'combobox');
                  expect(button?.name).to.equal('2 items selected');
                });
                it('shows 2 chips', async function() {
                  const snapshot = await a11ySnapshot();
                  const [, chip1close, , chip2close] = snapshot.children ?? [];
                  expect(chip1close?.role).to.equal('button');
                  expect(chip1close?.name).to.equal('Close');
                  expect(chip1close?.description).to.equal('Amethyst');
                  expect(chip2close?.role).to.equal('button');
                  expect(chip2close?.name).to.equal('Close');
                  expect(chip2close?.description).to.equal('Beryl');
                });
                describe('then pressing ...', function() {
                  it('focuses the first chip\'s close button', async function() {
                    const snapshot = await a11ySnapshot();
                    const [, chip1close] = snapshot.children ?? [];
                    expect(chip1close?.role).to.equal('button');
                    expect(chip1close?.name).to.equal('Close');
                    expect(chip1close?.description).to.equal('Amethyst');
                    expect(chip1close?.focused).to.be.true;
                  });
                  describe('then pressing Space', function() {
                    beforeEach(press(' '));
                    beforeEach(updateComplete);
                    it('removes the first chip', async function() {
                      const snapshot = await a11ySnapshot();
                      const [, chip1close, ...rest] = snapshot.children ?? [];
                      expect(chip1close?.role).to.equal('button');
                      expect(chip1close?.name).to.equal('Close');
                      expect(chip1close?.description).to.equal('Beryl');
                      expect(rest.filter(x => 'description' in x)?.length).to.equal(0);
                    });
                    it('focuses the remaining chip\'s close button', async function() {
                      const snapshot = await a11ySnapshot();
                      const [, chip1close] = snapshot.children ?? [];
                      expect(chip1close?.focused).to.be.true;
                    });
                    it('removes the first option from the selected values', function() {
                      expect(getValues(element)).to.deep.equal(['Beryl']);
                    });
                    describe('then pressing Enter', function() {
                      beforeEach(press('Enter'));
                      beforeEach(updateComplete);
                      it('removes all chips', async function() {
                        const snapshot = await a11ySnapshot();
                        expect(snapshot.children?.find(x => x.role === 'button' && x.name === 'Close'))
                          .to.be.undefined;
                      });
                      it('focuses the typeahead input', async function() {
                        const snapshot = await a11ySnapshot();
                        const [input] = snapshot.children ?? [];
                        expect(input?.focused).to.be.true;
                        expect(input?.role).to.equal('combobox');
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
