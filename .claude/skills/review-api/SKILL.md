---
name: review-api
description: >
  Review a PatternFly Element's API (HTML, CSS, JS) quality. Checks
  attributes, properties, events, slots, CSS parts, custom properties,
  code patterns, Lit conventions, and test coverage. Use when asked to
  "review api", "review code", "check element quality", "audit api",
  or before opening a PR.
tools: Read, Glob, Grep, Bash
---

# API Review

Review a PatternFly Element's HTML, CSS, and JS API quality against
ADVICE.md rules and project conventions.

## Workflow

### Phase 1: Read Element

Read:
- `elements/pf-v6-{name}/pf-v6-{name}.ts` (main source)
- `elements/pf-v6-{name}/pf-v6-{name}.css` (styles)
- `elements/pf-v6-{name}/test/` (all tests)

Read `.claude/ADVICE.md` for reference rules.

### Phase 2: API Surface

#### Attributes & Properties
- [ ] Enum-style `variant` instead of multiple booleans?
- [ ] No `is-` prefix on boolean attributes?
- [ ] No reflected booleans defaulting to `true`?
- [ ] No reflected booleans as `"true"|"false"` strings?
- [ ] No reflected array/object properties?
- [ ] No `aria-*` exposed as public API?
- [ ] `accessible-label` attribute where aria-label indicated?
- [ ] Multi-word attributes dash-case with camelCase fields?
- [ ] All attributes have sensible defaults?
- [ ] No native HTML attributes redeclared?
- [ ] Attribute/slot pairs where content could be plain or rich?
- [ ] No internal state exposed as public attributes?
- [ ] No light DOM classes required?

#### Slots
- [ ] Default slot for primary content?
- [ ] Semantic names, not positional?
- [ ] No placeholder "lorem ipsum" content?
- [ ] Default content provided where sensible?
- [ ] Prescriptive descriptions in JSDoc?
- [ ] Empty slot containers hidden (with SSR awareness via SlotController)?
- [ ] WARNING: `:empty` doesn't work on slots, `:has-slotted` not widely available

#### Events
- [ ] Event subclasses, not `CustomEvent` with detail?
- [ ] Destructive/state-changing events cancelable?
- [ ] Native event names when wrapping native elements?

#### CSS Custom Properties
- [ ] **Match patternfly-react** (`--pf-v6-c-{component}--*`)?
- [ ] `--_` prefix for private custom properties?
- [ ] Public properties as fallback defaults at use site, not on `:host`?
- [ ] No custom properties duplicating native CSS?
- [ ] Any DOM-structure-coupled tokens flagged?

#### CSS Parts
- [ ] Named after internal elements?
- [ ] Only exposed with clear use cases?

#### General
- [ ] Minimal API surface (easy to add, hard to remove)?
- [ ] No sub-elements unless a11y/composition requires?
- [ ] ECMAScript private fields (`#field`)?
- [ ] `override` on lifecycle methods?
- [ ] Member ordering follows convention?

### Phase 3: Code Patterns

#### CSS
- [ ] Native nesting?
- [ ] `light-dark()` for color tokens?
- [ ] Logical properties (no `left`/`top`/`right`/`bottom`)?
- [ ] Baseline 2024 or earlier?
- [ ] No BEM classes? ID selectors for unique shadow elements?
- [ ] box-sizing reset?
- [ ] Token-derived fallback values (not guessed)?
- [ ] `pointer-events: none` on disabled host?
- [ ] `aspect-ratio` instead of width+height where applicable?
- [ ] GPU-friendly animations?
- [ ] Individual transform properties (`rotate`, `translate`, `scale`)?
- [ ] Shadow DOM animation names unprefixed?
- [ ] `:host` attribute selectors not nested with `&`?
- [ ] No `:host:has()` or `:host(:has())`?
- [ ] No `:host-context`?

#### Templates
- [ ] No BEM in shadow DOM?
- [ ] Minimal wrapper elements?
- [ ] `<slot>` used directly where possible?
- [ ] Vertical attribute formatting when >2?
- [ ] False case first in ternaries?

#### Lit Patterns
- [ ] No imperative DOM updates?
- [ ] Side effects in `willUpdate`, not `render`?
- [ ] `static styles = [styles]` array form?
- [ ] Controllers for cross-cutting concerns?
- [ ] `isServer` guards on browser-only APIs?

#### Lint
```bash
npx eslint elements/pf-v6-{name}/**/*.ts
npx stylelint elements/pf-v6-{name}/**/*.css
```

### Phase 4: Test Review

- [ ] Tests exist?
- [ ] Test public API, not shadow DOM internals?
- [ ] a11ySnapshot assertions present?
- [ ] Keyboard navigation tested?
- [ ] Form submission tested (if FACE)?
- [ ] Setup in beforeEach, assertions in it?
- [ ] No arrow functions in test blocks?
- [ ] Behavioral expectations from React tests covered?

### Phase 5: JSDoc

- [ ] `@summary` present on element class?
- [ ] All public properties/methods have `/** */` JSDoc (not `//` comments)?
- [ ] `@cssprop` with CSS data types: `@cssprop {color} --pf-v6-c-button--Color`?
- [ ] `@csspart` for all exposed parts?
- [ ] `@slot` for all slots (prescriptive descriptions)?
- [ ] `@fires` for all dispatched events?
- [ ] No unnecessary `@default` tags (analyzer picks up initializers)?

Prefer HTML comments in template for part and slot, CSS comments for cssprop, over JSDoc

#### Run `cem health`
```bash
cem health --component pf-v6-{name} --format json
```
Flag any category below 80%.

### Phase 6: Report

```markdown
## API Review: pf-v6-{name}

### Summary
- API: X issues (Y critical)
- Code: X pattern violations
- Tests: X gaps
- Docs: cem health score X%

### Critical Issues
[Must fix before PR]

### Warnings
[Should fix]

### Suggestions
[Nice to have]

### Intentional Divergences
[Where we chose different API/behavior than React, and why]
```

## Principles

- Review against ADVICE.md rules, not taste
- API surface violations are critical (hard to fix post-release)
- Clear departures from the React API are not necessarily a problem, but must be 
  surfaced to the user for human review.
