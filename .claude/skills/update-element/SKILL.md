---
name: update-element
description: >
  Update an existing pf-v5 element to pf-v6. Use when asked to "update",
  "rename", "upgrade", or "port" an element that already exists as pf-v5-*.
  Covers renaming, v6 token migration, API redesign, demos, visual
  comparison, tests, and accessibility.
tools: Read, Glob, Grep, Bash
---

# Update v5 Element to v6

Rename and update an existing `pf-v5-{name}` element to `pf-v6-{name}`,
migrating to v6 design tokens, visual style, and CSS.
Aim for end-user experience parity with the corresponding v6 react component
while preserving or improving the existing web component API.

Breaking changes to web component APIs are permitted, but require justification

## Prerequisites

- `cem serve` running (`npm run dev`)
- Chrome MCP connected
- React source in `../patternfly-react/packages/react-core/src/components/`
- SCSS source in `../patternfly/src/patternfly/components/` (for reference)

## Workflow

### Phase 1: Analyze Existing Element and React Source

1. Read the existing v5 element:
   ```
   elements/pf-v5-{name}/
   ```
   Note: current API surface (attributes, properties, events, slots, CSS
   parts, CSS custom properties), test coverage, demo set, and docs.

2. Read the React v6 component:
   ```
   ../patternfly-react/packages/react-core/src/components/{Name}/
   ```
   See also the corresponding docs page e.g.
   https://patternfly.org/components/accordion/

   See demos in 
   ```
   ../patternfly-react/packages/react-core/src/demos/
   ```

3. Read the stylesheet for that element via the Chrome MCP, pointed at the element page
   ```
   https://patternfly.org/components/{Name}/
   ```

4. Read the React test files for behavioral expectations:
   ```
   ../patternfly-react/packages/react-core/src/components/{Name}/__tests__/
   ```

5. Diff the v5 element API against React v6 API. Identify:
   - New props/features in v6 React not in our v5 element
   - Props removed in v6 React that our v5 element still has
   - Token name changes between PF v5 and v6
   - Structural changes in the SCSS or JSX (new modifiers, removed variants)

### Phase 2: Rename Files and References

1. Copy `elements/pf-v5-{name}/` to `elements/pf-v6-{name}/`
2. Rename all files: `pf-v5-{name}.*` -> `pf-v6-{name}.*`
3. Update all internal references:
   - `@customElement('pf-v5-{name}')` -> `@customElement('pf-v6-{name}')`
   - Import paths
   - CSS file names
   - Test file names and element references
   - Demo element tags
4. Update `elements/package.json` exports
5. Update any cross-element imports in v6 elements that reference this element

### Phase 3: Enumerate Demos

Fetch the patternfly.org component page to identify all demos:
```
https://www.patternfly.org/components/{name}
```

Each demo has a full-screen URL:
```
https://www.patternfly.org/components/{name}/react/{demo-slug}/
```

Identify which demo source file corresponds to each docs site demo

Map React demos to our demo files. Rename existing demos to match
patternfly.org slugs. Add missing demos. Keep existing WC-specific
demos under our own names.

Collect description text from patternfly.org for YAML frontmatter.

### Phase 4: Redesign API for v6

Read `.claude/ADVICE.md` first -- distilled rules from
4800+ PR reviews. This is the canonical reference for all API decisions.

Key considerations for UPDATE vs new:
- **Preserve good v5 API decisions** -- don't redesign what already works
- **Fix known v5 API mistakes** -- this is the chance to break compat
- **Adopt v6 React features** that make sense as web component APIs
- **Drop v6 React features** that don't translate (see translation rules)

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

### Phase 5: Update Demos

Update existing demos and add new ones from Phase 3:
- Update element tags from `pf-v5-{name}` to `pf-v6-{name}`
- Update demo content to reflect v6 API changes
- Add YAML frontmatter with name and description
- Add missing patternfly.org parity demos
- Keep WC-specific demos, update as needed

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

### Phase 7: Update Tests

Update existing tests -- don't rewrite from scratch:
- Update element tag references from v5 to v6
- Add tests for new v6 features
- Remove tests for dropped v5 features
- Add behavioral expectations from React tests (Phase 1 step 4) which are not 
  already covered
- Ensure a11ySnapshot assertions, keyboard nav tests
- Add form submission tests if FACE

See `.claude/skills/review-api/SKILL.md` Phase 4 for full test checklist.

### Phase 8: Audit

Prompt the user to activate /review-api, /review-demos, and /review-a11y

Fix all critical and warning findings before PR

## Quality Bar

Place the web component next to React: visually and functionally
indistinguishable to end users. API should feel native to web developers.
Accessibility may and should exceed React's -- that's a feature, not a bug.
