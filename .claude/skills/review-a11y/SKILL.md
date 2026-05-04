---
name: review-a11y
description: >
  Accessibility audit for a PatternFly Element. Verifies computed
  accessibility tree in both Chrome and Firefox across all element states
  and relationships. Use when asked to "review accessibility", "check a11y",
  "audit accessibility", or mentions "WCAG", "screen reader", "keyboard
  navigation", or "ARIA".
tools: Read, Glob, Grep, Bash
---

# Accessibility Review

Review PatternFly Elements for accessibility compliance. Verify the
computed accessibility tree in both Chrome and Firefox across all
element states.

## Prerequisites

- `cem serve` running (`npm run dev`)
- Chrome MCP connected
- Firefox MCP connected

If MCPs are not available on the user's claude code session, instruct the user 
how to install and configure them.

## Workflow

### Phase 1: Gather Context

1. Read the element source: `elements/pf-v6-{name}/pf-v6-{name}.ts`
2. Read the element CSS: `elements/pf-v6-{name}/pf-v6-{name}.css`
3. Read demos: `elements/pf-v6-{name}/demo/`
4. Identify all element states: default, hover, focus, active, disabled,
   expanded, checked, loading, error, etc. (whatever the element supports), including
   the states of sub elements (e.g. aria active descendant for a select)

### Phase 2: Check Internal ARIA

- `InternalsController` used for role, aria-label, aria-checked, etc.?
- No `aria-*` attributes recommended for public API (abstracted behind custom attrs)?
- No contradictory ARIA on same internals (e.g., role="none" + aria-disabled)?

### Phase 3: Check Keyboard

Using Chrome and Firefox MCP to issue real keyboard commands, validate that 

- Interactive elements keyboard-focusable?
- Logical tab order?
- Keyboard shortcuts match native equivalents?
- Focus trapped correctly in modals/dialogs?

### Phase 4: Check Semantics

- Landmark roles only where appropriate (no pollution from repeated instances)?
- Heading hierarchy preserved through slots?
- Form association via FACE + ElementInternals?
- Labels derived from slotted content with attribute escape hatch?

### Phase 5: Check Demos

- All demos demonstrate accessible patterns (no bad advice)?
- No redundant ARIA roles on elements with implicit roles?
- Don't treat div as button, etc

### Phase 6: Verify Accessibility Tree in Both Browsers

**CRITICAL**: Verify the computed accessibility tree in BOTH Chrome AND
Firefox. Browser engines compute the ax tree differently, especially for
shadow DOM and ElementInternals. A component that works in one browser
may be broken in the other.

For each demo, in each state the element supports:

#### Chrome

1. Open demo in Chrome:
   ```
   navigate_page -> http://localhost:8000/elements/{name}/demo/{slug}?rendering=chromeless
   ```
2. `take_snapshot` with `verbose: true` to capture full a11y tree
3. Verify roles, names, states, and values are correct
4. For interactive elements, use `click`, `press_key`, `fill` to
   transition between states, then `take_snapshot` again after each
   state change

#### Firefox

1. Open same demo in Firefox:
   ```
   navigate_page -> http://localhost:8000/elements/{name}/demo/{slug}?rendering=chromeless
   ```
2. `take_snapshot` to capture a11y tree
3. Verify same roles, names, states match Chrome
4. Interact to transition states, snapshot after each

#### States to verify

For each state the element supports, verify the **ax tree** reflects it.
Don't check for specific ARIA attributes in the DOM -- the implementation
may use ElementInternals, native semantics (`<dialog>`, `<details>`),
or ARIA attributes. What matters is the computed ax tree result.

| State             | Ax tree expectation                                               |
| ----------------- | ----------------------------------------------------------------- |
| Default           | Correct role, accessible name, description                        |
| Disabled          | Node shows disabled state, not focusable                          |
| Focused           | Focus indicator visible, node shows focused                       |
| Expanded          | Node shows expanded state, controlled content visible in tree     |
| Collapsed         | Node shows collapsed state, controlled content hidden from tree   |
| Checked/unchecked | Node reflects checked/unchecked state                             |
| Selected          | Node reflects selected state                                      |
| Loading           | Live region announces, or node shows busy state                   |
| Error/invalid     | Node shows invalid state, error description associated            |
| Read-only         | Node reflects read-only state                                     |

Skip states that don't apply to the element.

#### Element relationships to verify

Composite widgets have internal relationships between child nodes.
Verify these in the **ax tree** for BOTH browsers, in BOTH expanded
and collapsed states. Focus on tree structure and relationships, not
DOM attributes -- native elements and ElementInternals may produce the
correct tree without explicit ARIA attributes.

| Pattern         | Expected ax tree roles    | Expected relationships                                                                              |
| --------------- | ------------------------- | --------------------------------------------------------------------------------------------------- |
| Combobox/Select | combobox, listbox, option | Combobox owns/controls listbox; focused option tracked; expanded state toggles                       |
| Menu/Dropdown   | button, menu, menuitem    | Trigger controls menu; menu appears/disappears from tree on toggle                                  |
| Tabs            | tablist, tab, tabpanel    | Tab controls panel; active tab shows selected; inactive panels hidden from tree                     |
| Accordion       | heading, button, region   | Button controls region; expanded state toggles; region hidden when collapsed                        |
| Tree            | tree, treeitem, group     | Parent items show expanded state; items have level, set size, position in set                       |
| Dialog/Modal    | dialog                    | Modal state conveyed (may come from native `<dialog>`); focus contained; name from heading          |
| Form controls   | depends on type           | Description associated with helper/error text; label associated                                     |

For each composite element:
1. Snapshot collapsed/closed state -- verify child roles present but
   hidden content absent from tree
2. Expand/open via interaction
3. Snapshot expanded/open state -- verify child roles visible, ownership
   and control relationships resolved in tree
4. Interact with children (select option, activate menuitem, switch tab), and validate resulting states
5. Snapshot post-interaction -- verify state updates propagated
   (selected option, active tab, etc.)
6. Close/collapse, snapshot again -- verify clean return to closed state

**Cross-root relationships**: `aria-controls`, `aria-describedby`,
`aria-labelledby` cannot reference IDs across shadow boundaries
declaratively, they must (as of Spring 2026) use ARIA IDL attrs like
`element.ariaDescribedByElements`. Verify these relationships work via
ElementInternals ARIA IDL properties or other workarounds.
Flag any broken cross-root references.

#### Cross-browser differences to flag

- Role computed differently between Chrome and Firefox
- Name computation differs (common with shadow DOM slotted content)
- State not reflected in one browser's ax tree
- Focus behavior differs
- ElementInternals not reflected in one browser's ax tree
- Ownership/control relationships not resolved in one browser
- Expanded/collapsed state not reflected in one browser's ax tree
- Native element semantics (`<dialog>`, `<details>`) computed differently

### Phase 7: Report

```markdown
## Accessibility Review: pf-v6-{name}

### Accessibility Tree Verification
| State | Chrome | Firefox | Match? |
|-------|--------|---------|--------|
| Default | role=button, name="Save" | role=button, name="Save" | yes |
| Disabled | aria-disabled=true | aria-disabled=true | yes |

### Critical Issues
[Failures that break accessibility]

### Cross-Browser Differences
[Ax tree differences between Chrome and Firefox]

### Warnings
[Issues that may cause problems for some users]

### Recommendations
[Specific fixes with corrected code]
```

## Principles

- Verify the element's internal ARIA management
- Cross-root ARIA: document limitations, use IDL properties whenever necessary
- Leave "why comments" on non-obvious ARIA decisions
- Both browsers must produce functionally equivalent ax trees
- Test every state, not just default
