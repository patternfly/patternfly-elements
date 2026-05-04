---
name: create-element
description: >
  Create a new pf-v6 element from a PatternFly React component that has
  no existing v5 web component. Use when asked to "create", "build",
  "implement", or "add" a new element from scratch.
tools: Read, Glob, Grep, Bash
---

# Create New v6 Element

Build a new `pf-v6-{name}` element from the PatternFly React v6 source.
No existing v5 element to start from -- everything written fresh.
Aim for end-user experience parity with the corresponding v6 react component.

## Prerequisites

- `cem serve` running (`npm run dev`)
- Chrome MCP connected
- React source in `../patternfly-react/packages/react-core/src/components/`
- SCSS source in `../patternfly/src/patternfly/components/` (for reference)

## Workflow

### Phase 1: Analyze React Source

1. Read the React component:
   ```
   ../patternfly-react/packages/react-core/src/components/{Name}/
   ```
   See also the corresponding docs page e.g.
   https://patternfly.org/components/accordion/

   See demos in
   ```
   ../patternfly-react/packages/react-core/src/demos/
   ```

2. Read the stylesheet for that element via the Chrome MCP, pointed at the element page
   ```
   https://patternfly.org/components/{Name}/
   ```

3. Read the React test files for behavioral expectations:
   ```
   ../patternfly-react/packages/react-core/src/components/{Name}/__tests__/
   ```

4. Identify:
   - Props that map to attributes vs properties vs slots vs CSS
   - Events (callbacks) that map to DOM events
   - Internal state management
   - Form association needs
   - Sub-components needed
   - Dependencies on other PF elements (must already exist as pf-v6-*)

### Phase 2: Enumerate Demos

Fetch the patternfly.org component page to identify all demos:
```
https://www.patternfly.org/components/{name}
```

Each demo has a full-screen URL:
```
https://www.patternfly.org/components/{name}/react/{demo-slug}/
```

Identify which demo source file corresponds to each docs site demo

Map React demos to our demo files:
```
React demo name         -> Our demo file
"Variant examples"      -> demo/variant-examples.html
"Disabled buttons"      -> demo/disabled-buttons.html
```

Additional demos for WC-specific APIs (slots, CSS parts, FACE) use our
own names alongside.

Collect description text from patternfly.org for YAML frontmatter.

### Phase 3: Design Web-Native API

Read `.claude/ADVICE.md` first -- distilled rules from
4800+ PR reviews. This is the canonical reference for all API decisions.

Full freedom on API design -- no legacy to preserve. Design the best
web component API for this element's purpose.

#### React-to-WC Translation Rules
- React `children` -> default slot
- React render props -> named slots
- React `className` -> not needed (shadow DOM)
- React `onChange` callback -> `change` event (Event subclass)
- React `isExpanded` prop -> `expanded` boolean attribute
- React `variant="primary"` -> `variant="primary"` (often 1:1)
- React component composition -> slot composition - be careful of SSR DOM
  access
- React context -> CSS custom properties, or `@lit/context` if JS is required
- React `useEffect` -> `willUpdate`/`updated` lifecycle
- React hooks -> Lit reactive controllers

#### Prefer Native Web Platform
- FACE instead of wrapping native inputs where feasible
- `InternalsController` for all ElementInternals (ARIA, form association).
  Never use raw `attachInternals()` -- always go through InternalsController
- When aria-label is indicated (e.g. icon-button), provide an `accessible-label`
  attribute
- Slots for composition, not render-prop equivalents
- Native `<dialog>` instead of JS-managed modals
- Container queries instead of responsive/breakpoint attributes
- `<details>` for expandable content (free a11y)

#### API Design Rules (apply to each surface)

IMPORTANT: in all cases where a react api does not cleanly map to a web component
API, surface that to the user.

**Key principle:** easy to add, hard to remove. Ship less when in doubt.

##### Templates
- Prefer ID selectors in shadow DOM,
- Avoid BEM, avoid using .pf-* classes internally in shadow root
- Minimize wrappers; prefer `<slot>` directly
- Vertical attribute formatting when >2 attrs
- False case first in ternaries when used in templates
- `slotchange` bubbles; listen on shadow root

##### Attributes & Properties:
- Do not require light DOM classes. Use attributes instead
- Enum-style `variant` over multiple booleans (exclusive, not stackable)
- Boolean attributes: present = true, absent = false. No `is-` prefix.
- Don't reflect booleans to `"true"|"false"` strings
- Don't default reflected boolean attributes to true, it will be impossible to unset in
  HTML
- Avoid array/object properties, exceptions for convenience APIs like
  `pfselect.items = []`
- Don't reflect array or object properties
- Multi-word attributes: dash-case with camelCase class fields
- Don't expose `aria-*` as public API; abstract behind custom attributes
- Attribute/slot pairs for content that could be plain or rich
  e.g.
  ```html
  <pf-v6-foo description="plaintext"></pf-v6-foo>
  <pf-v6-foo><span slot="description"><em>Rich</em> text</pf-v6-foo>
  ```
- All attributes must have sensible defaults

##### Slots:
- Default slot for primary content
- Semantic names, not positional "header", not "top"
- Don't provide placeholder "lorem ipsum" content; but do provide default content when
  sensible
- Prescriptive descriptions in docs ("Label text" not "The label slot") - see https://bennypowers.dev/cem/docs/usage/effective-mcp-descriptions/
- Hide empty slot containers, but be wary of SSR problems, use SlotController's
  ssr-hint-* attributes
- WARNING: `:empty` does not work on slots, `:has-slotted` is not yet widely available

##### Events:
- Event subclasses, not `CustomEvent` with detail
- Cancelable for destructive/state-changing actions, or when users may wish to prevent default.
- Match native event names when wrapping native elements

##### Element CSS
- Use Native nesting
- Use `light-dark()`
- Use logical properties instead of directionally
- You may and should use any CSS features which are Baseline 2024 or earlier,
  but no later
- Don't nest `:host([attr])` with `&`, this doesn't work.
- Don't use :host:has() or :host(:has()) - these are not quite ready
  cross-browser
- never use :host-context, it does not exist
- `pointer-events: none` on disabled hosts

##### CSS Custom Properties:
- Use `--_` prefix for private custom properties, for example, when a css custom
  property is defined purely to make the css file nicer, or for state management,
  but is not intended for public use.
- Avoid setting public css properties on the :host selector, rather, reference
  them as fallback defaults at use sites
- Don't duplicate native CSS capabilities
- Fallback defaults at use site, not on `:host`
- **MUST match patternfly-react** (`--pf-v6-c-{component}--*`)
  Only exception: shadow DOM structure vastly different from React's flat DOM.

  If you find a case where a given CSS custom property in the React source is tightly
  coupled to a given DOM structure, in a way which inhibits our ability to freely
  factor the best web component, raise that to the user.

##### CSS Parts:
- Name after internal element. Only expose with clear use cases.
- Question aggressively -- hard to remove.

### Phase 4: Implement

1. Create element directory: `elements/pf-v6-{name}/`
2. Write main element class:
   - `@customElement('pf-v6-{name}')` decorator
   - `static readonly styles` array
   - Reactive properties with `@property`
   - InternalsController for ARIA and form association (never raw attachInternals)
   - FACE patterns if form-associated
   - Template in `render()` method

3. Write CSS:
   - Translate SCSS to native CSS (nesting, light-dark(), logical properties)
   - Shadow DOM scoping (IDs not BEM)
   - Token-derived fallback values from PF token source
   - box-sizing reset
   - **MUST match patternfly-react CSS custom properties** (see CLAUDE.md)

4. Create sub-elements if needed (only for a11y/composition reasons)
5. Update `elements/package.json` exports

### Phase 5: Create Demos

Create HTML partial demos in `demo/`. Demos are partials (no `<!DOCTYPE>`,
`<html>`, `<head>`). `cem serve` wraps them.

For each demo from Phase 2:
1. Create `demo/{demo-slug}.html` matching patternfly.org name
2. Add YAML frontmatter:
   ```html
   ---
   name: Variant examples
   description: Button variant examples showing primary, secondary, and link styles.
   ---
   ```
3. Inline `<script type="module">` with element import
4. No wrapper divs; minimal markup

`index.html` = simplest possible usage.

Additional WC-specific demos:
- `demo/slots.html` - slot composition patterns
- `demo/form-associated.html` - FACE form integration (if applicable)
- `demo/css-custom-properties.html` - theming overrides

### Phase 6: Visual Comparison with Chrome MCP

**CRITICAL**: `?rendering=chromeless` on ALL cem serve URLs.

For each demo, compare against patternfly.org:

1. Open our demo:
   ```
   navigate_page -> http://localhost:8000/elements/{name}/demo/{demo-slug}?rendering=chromeless
   ```
2. Open React reference:
   ```
   new_page -> https://www.patternfly.org/components/{name}/react/{demo-slug}/
   ```
3. `take_snapshot` + `take_screenshot` both tabs
4. Compare visuals (layout, colors, typography, borders, dark mode)
5. Compare structure (interactive elements, ARIA, keyboard nav, focus)
6. Iterate: fix differences, retake, repeat until visual parity
7. Interactive test: `click`, `press_key`, `fill`, check console errors
8. Exhaustively check all element states e.g. expanded select, active descendant, etc

### Phase 7: Write Tests

Write all tests from scratch:
- Unit tests validating public API (attributes, properties, events)
- a11ySnapshot assertions for accessibility tree
- Keyboard navigation tests
- Form submission tests (if FACE)
- Setup in beforeEach, assertions in it blocks
- No arrow functions in Mocha tests
- Test observable behavior (offsetWidth, computed styles), not shadow DOM
- Cover behavioral expectations from React tests (Phase 1 step 3)
  which are not already covered

See `.claude/skills/review-api/SKILL.md` Phase 4 for full test checklist.

### Phase 8: Audit

Prompt the user to activate /review-api, /review-demos, and /review-a11y

Fix all critical and warning findings before PR

## Quality Bar

Place the web component next to React: visually and functionally
indistinguishable to end users. API should feel native to web developers.
Accessibility may and should exceed React's -- that's a feature, not a bug.
