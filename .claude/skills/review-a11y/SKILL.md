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
5. Identify relevant [ARIA APG Patterns](https://w3.org/WAI/ARIA/apg/patterns/) for the element

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
- Check for WCAG color contrast violations.

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

**Cross-root ARIA relationships**: See the reference section below for
the full technical landscape. Key points for reviewers:

- `aria-controls`, `aria-describedby`, `aria-labelledby` **cannot**
  reference IDs across shadow boundaries declaratively.
- ARIA IDL properties (`ariaDescribedByElements`, etc.) are the
  intended replacement but have cross-root limitations. See
  "Cross-Root ARIA Element Reflection" below for which directions
  work and which silently fail.
- Verify relationships in the **ax tree**, not by inspecting DOM
  attributes. A relationship that appears set in JS may produce
  nothing in the computed tree.
- Flag any broken cross-root references and document workarounds
  (live-region announcer, `aria-label` on trigger, Reference Target
  when it ships).
- Ensure all ax tree states in demos are covered by a11ySnapshot
  tests in the element's test files.

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

In "Critical Issues", all items should be linked to its WCAG success criterion.......

## Principles

- Verify the element's internal ARIA management
- Cross-root ARIA: document limitations, use IDL properties whenever necessary
- Leave "why comments" on non-obvious ARIA decisions
- Both browsers must produce functionally equivalent ax trees
- Test every state, not just default

## Cross-Root ARIA Element Reflection

Reference material for reviewing cross-shadow-boundary ARIA
relationships. Last updated June 2026.

### The Problem

Declarative ARIA ID references (`aria-describedby="some-id"`) only
resolve within a single DOM tree. Shadow DOM boundaries prevent
cross-root ID resolution. This affects any element where a trigger in
light DOM needs an ARIA relationship to content in shadow DOM (or
vice versa).

### ARIA IDL Element Reflection

The ARIA IDL properties (`ariaDescribedByElements`,
`ariaLabelledByElements`, `ariaControlsElements`, etc.) accept Element
references instead of ID strings, bypassing the ID-resolution problem.
However, cross-root references are validated by a **shadow-including
ancestors** algorithm that restricts which directions work.

#### Which directions work

| Direction | Example | Status |
|---|---|---|
| Same tree | Light DOM element → light DOM element | Works |
| Shadow-to-light (child→parent) | Shadow DOM element → light DOM ancestor | Works |
| Light-to-own-shadow (parent→child) | Light DOM trigger → shadow DOM content in same host | Permitted by spec algorithm, but **not WPT-tested** and **unreliable in practice** |
| Sibling shadow roots | Element in shadow root A → element in shadow root B | Does NOT work |
| Arbitrary cross-root | Unrelated shadow boundaries | Does NOT work |

The parent-to-child case (light DOM trigger referencing its host's
shadow DOM content) is technically valid per the shadow-including
ancestors rule, but:

- WPT tests at `custom-elements/element-internals-aria-element-reflection.html`
  only cover same-tree and negative (invalid cross-tree) cases
- WICG/webcomponents#974 explored this direction with no clear resolution
- No browser has confirmed reliable support
- Treat as **progressive enhancement**: set the IDL property, but don't
  rely on it for accessible content delivery

#### What to do instead

When a cross-root ARIA relationship silently fails, use one of these
workarounds depending on the element's semantics:

| Relationship | Workaround |
|---|---|
| `describedby` (supplementary text) | Static `role="status"` live-region announcer in light DOM (see ADVICE.md "Use a static live-region announcer") |
| `labelledby` (accessible name) | Set `aria-label` directly on the trigger element |
| `controls` (widget relationship) | Verify the ax tree reflects the relationship via native semantics (`<details>`, `<dialog>`) or ElementInternals; if not, document the gap |
| `none` (opt-out) | Provide a `silent` or similar boolean attribute to suppress ARIA behavior |

### Reference Target Proposal

The **Reference Target** proposal (WICG/webcomponents#1086) is the
long-term solution for cross-root ARIA. It enables external elements to
reference a shadow host by ID, with the shadow root designating which
internal element receives the reference via `shadowRootReferenceTarget`.

#### Status (June 2026)

| Browser | Status |
|---|---|
| Chrome | Canary behind `--enable-experimental-web-platform-features` flag. Intent to Experiment filed. Not in stable. |
| Firefox | Positive standards position. Igalia prototyping (NLNet funded). Bug 1981341. Not shipping. |
| Safari/WebKit | Igalia prototype exists. No official standards position signal. |
| Spec | WHATWG HTML #10707, Stage 3 ("Committed"). Pull requests DOM #1353, HTML #10995 in progress. Not yet merged into HTML Living Standard. |
| Interop 2026 | Submitted as focus area proposal (web-platform-tests/interop#1011). |

#### What Reference Target solves

- **Outside → host → internal target** references (e.g., a label
  element outside a shadow root referencing an input inside it via
  the host)
- Recursive resolution through nested shadow roots

#### What Reference Target does NOT solve

- Arbitrary sibling-to-sibling cross-root references
- Direct parent-to-specific-child references bypassing the host
- Attribute forwarding from host to internal elements
- The tooltip case where the *trigger* is in light DOM and the
  *content* is in the host's own shadow DOM (this is the reverse
  direction)

### Reviewing elements with cross-root ARIA

When auditing an element with cross-root ARIA relationships:

1. **Identify all ARIA relationships** the element establishes
   (describedby, labelledby, controls, owns, etc.)
2. **Map each relationship's direction**: which element sets the
   property, which element is referenced, and which shadow roots are
   involved
3. **Check the ax tree in both browsers** to see if the relationship
   actually resolves (don't trust DOM inspection)
4. **Verify the fallback mechanism** works:
   - If using an announcer, verify `role="status"` element exists,
     content is announced on show, cleared on hide
   - If using `aria-label`, verify the label text matches the
     tooltip/popover content
5. **Check for `silent` or equivalent opt-out** for cases where the
   element's ARIA behavior conflicts with author-provided accessibility
6. **Verify progressive enhancement code** is present:
   - IDL property assignment (`ariaDescribedByElements = [el]`) should
     be kept even though it silently fails today
   - Comment explaining the cross-root limitation and linking to
     relevant spec issues
7. **Document the gap** in the review report under "Cross-Browser
   Differences" or "Warnings"

### Spec and issue references

- WICG/aom#192 -- cross-root element reflection scope
- whatwg/html#5401 -- element reflection and shadow roots
- whatwg/html#10707 -- Reference Target spec integration (Stage 3)
- WICG/webcomponents#1086 -- Reference Target tracking issue
- WICG/webcomponents#974 -- ElementInternals pointing into own shadow
- WPT `custom-elements/element-internals-aria-element-reflection.html`
