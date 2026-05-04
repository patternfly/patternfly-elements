---
name: review-demos
description: >
  Review element demos and docs for parity with patternfly.org, quality,
  and visual correctness. Use when asked to "review demos", "check demos",
  "audit demos", "review docs", or "check demo parity".
tools: Read, Glob, Grep, Bash
---

# Demo & Docs Review

Review a PatternFly Element's demos for parity with patternfly.org,
file quality, and visual correctness via Chrome MCP comparison.

## Prerequisites

- `cem serve` running (`npm run dev`)
- Chrome MCP connected

## Workflow

### Phase 1: Identify Demos

Read all demo files:
```
elements/pf-v6-{name}/demo/
```

### Phase 2: Parity Check

1. Fetch patternfly.org demo listing:
   ```
   https://www.patternfly.org/components/{name}
   ```

2. Identify which React demo source files correspond to each docs site demo:
   ```
   ../patternfly-react/packages/react-core/src/components/{Name}/examples/
   ../patternfly-react/packages/react-core/src/demos/
   ```

3. For each React demo listed, verify a matching demo file exists here:
   ```
   elements/pf-v6-{name}/demo/{demo-slug}.html
   ```

4. Report:
   - Missing demos (exist on patternfly.org but not in our repo)
   - Extra demos (ours only -- fine if they cover WC-specific features)
   - Name mismatches (same content, different name -- rename to match)

### Phase 3: Demo Quality

For each demo file:
- [ ] YAML frontmatter with name and description?
- [ ] Description matches patternfly.org text where applicable?
- [ ] HTML partial (no `<!DOCTYPE>`, `<html>`, `<head>`)?
- [ ] Inline `<script type="module">` import?
- [ ] No unnecessary wrapper divs/spans or other DOM?
- [ ] `index.html` = simplest possible usage?
- [ ] Self-contained (no external JS files)?
- [ ] Demonstrates one variant/feature per demo?

When these principals conflict with upstream react demos, it's not necessarily a problem,
but should be noted to the user in the final report.

### Phase 4: Visual Comparison (Chrome MCP)

**CRITICAL**: `?rendering=chromeless` on ALL cem serve URLs.

Demo URL uses unprefixed name (`pf-v6-card` => `card`).

For each parity demo:

1. Open our demo:
   ```
   navigate_page -> http://localhost:8000/elements/{name}/demo/{slug}?rendering=chromeless
   ```
2. Open React reference:
   ```
   new_page -> https://www.patternfly.org/components/{name}/react/{slug}/
   ```
3. `take_screenshot` both, compare visuals:
   - Layout and spacing match?
   - Colors and typography match?
   - Border/shadow/radius match?
   - Dark mode match? (use `emulate` to toggle color scheme)
   - NB: react demos may not yet support native color-scheme, so you may need to 
     toggle scheme with a button on the react page, or add a body class
4. `take_snapshot` both, compare a11y trees
5. Exhaustively check all element states (expanded, active descendant, etc.)
6. Report differences with severity (bug vs intentional divergence)

### Phase 5: Documentation

- [ ] `elements/package.json` exports correct for this element?
- [ ] `elements/{name}/docs` reflects the contents on the react site, but with 
  web components sensibility.

#### Run `cem health`
```bash
cem health --component pf-v6-{name} --format json
```
Flag any category below 80%. Check for orphaned package.json exports.

### Phase 6: Report

```markdown
## Demo & Docs Review: pf-v6-{name}

### Demo Parity
| patternfly.org Demo | Our Demo | Status |
|---------------------|----------|--------|
| Variant examples | variant-examples.html | match / mismatch / missing |

### Visual Differences
[Screenshots or descriptions of visual mismatches]

### Demo Quality Issues
[Frontmatter, formatting, structure issues]

### Docs Issues
[cem health score, missing JSDoc, orphaned exports]

### Suggestions
[Nice to have improvements]
```

## Principles

- Demo parity gaps are high priority (blocks docs migration)
- Visual differences are bugs unless intentional and documented
- Every patternfly.org demo must have a matching patternfly elements demo
- WC-specific demos supplement, never replace, parity demos
