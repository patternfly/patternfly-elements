# PatternFly Elements v6

Web components for PatternFly design system.

Porting existing pf-v5 elements to pf-v6 designs, and PF v6 React
components to LitElement custom elements.

Prefer Opus 4.6 with 1 Million tokens context for these jobs

## Context

- React components: `../patternfly-react/packages/react-core/src/components/`
- SCSS sources: `../patternfly/src/patternfly/components/`
- Existing v5 elements: `elements/pf-v5-*/`
- v6 elements: `elements/pf-v6-*/`
- Migration plan: `V6-MIGRATION-PLAN.md`

Ensure the user has cloned `patternfly-react` and `patternfly` repos in sibling directories.
Treat the `patternfly` and `patternfly-react` repos as read-only source material.

```
patternfly/
patternfly-elements/
patternfly-react/
```

## Skills

Use these skills for the corresponding tasks:

- `/update-element` - port existing pf-v5 element to pf-v6
- `/create-element` - build new pf-v6 element based on the SCSS and React source 
  (for when no v5 exists)
- `/review-a11y` - accessibility audit (Chrome + Firefox ax trees)
- `/review-api` - review element API (HTML, CSS, JS) quality before PR
- `/review-demos` - review element demos and docs quality before PR
- API design rules: `.claude/ADVICE.md` (referenced by both element skills)

Run /review-a11y, /review-api, and /review-demos on each set of changes, and before opening any PR

## Element Conventions

### Naming & Structure
- Tag: `pf-v6-{name}` (e.g., `pf-v6-button`)
- Sub-elements: `pf-v6-{parent}-{child}` only when a11y/composition requires
- Directory: `elements/pf-v6-{name}/`
- Source files:
  - `elements/pf-v6-{name}/pf-v6-{name}.ts`
  - `elements/pf-v6-{name}/pf-v6-{name}.css`
- Test file: `test/pf-v6-{name}.spec.ts`

### Class Member Ordering
1. Static fields (`formAssociated`, `styles`)
2. `@property` declarations
3. `#privateFields`
4. Constructor
5. Lifecycle (`connectedCallback`, `willUpdate`, `updated`, `render`)
6. Public methods
7. Private methods

### TypeScript
- ECMAScript private fields (`#field`) not `private`
- `override` on lifecycle methods
- Export type unions for enumerated attribute values

### SSR
- `isServer` guards on browser-only APIs
- DOM logic in `updated`, after `hasUpdate`, not `connectedCallback` or 
  `firstUpdated`, which both run on the server.

### Lit
- Reactive state, not imperative DOM
- Pure render; side effects in `willUpdate`
- `static styles = [styles]` array form
- Controllers over inheritance
- See `.claude/ADVICE.md` "Lit-Specific Conventions" for full guidance

## Dev Server

`cem serve` (from `@pwrs/cem`), not web-dev-server.
Config: `.config/cem.yaml`. see https://bennypowers.dev/cem/docs/reference/configuration/
CSS files served as JS modules.
Demo URLs: `http://localhost:8000/elements/{name}/demo/{slug}`

**CRITICAL**: `?rendering=chromeless` on all demo URLs.
cem serve UI uses its own PF elements with identical `pf-v6-` tagnames; chromeless avoids tagname collisions.

```bash
npm start  # cem serve on port 8000
```

## Testing

- Public API, not shadow DOM internals
- a11ySnapshot for a11y assertions
- Setup in beforeEach, assertions in it
- No arrow functions in Mocha
- Test computed sizes (offsetWidth), not internal CSS values
- Test form submission for FACE elements

## Git

- Conventional commits. Scope = unprefixed element name: `fix(button)`
- `Assisted-By` for AI agents, never `Co-Authored-By`
- Wrap `@slot`, `@summary` etc. in backticks in commit messages, to avoid 
  pinging unrelated users on GitHub

## Commands

```bash
npm run dev      # cem serve
npm run build    # full build
npm run test     # unit tests
npm run e2e      # e2e tests
npm run lint     # eslint
cem generate     # regenerate manifest
cem health       # doc quality check
```
