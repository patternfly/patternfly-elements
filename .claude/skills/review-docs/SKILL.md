---
name: review-docs
description: >
  Review a PatternFly Element's inline documentation quality against
  cem conventions. Checks CSS custom property comments, slot and part
  HTML comments, JSDoc tags, and cem health. Use when asked to
  "review docs", "check documentation", "audit docs", or
  "check doc comments".
tools: Read, Glob, Grep, Bash
---

# Documentation Review

Review a PatternFly Element's inline documentation against project
conventions and cem analyzer requirements. Documentation feeds the
custom elements manifest which powers LSP autocomplete, MCP-based
AI assistance, and dev server knobs.

Reference: https://bennypowers.dev/cem/docs/usage/documenting-components/

## Conventions

These conventions follow the cem documentation guide. The goal is
co-location: document each API surface next to the code it describes.

### Slots and Parts — HTML Comments in Template

Prefer inline HTML comments over JSDoc `@slot` and `@csspart` tags.
HTML comments stay co-located with the markup they describe. The cem
analyzer extracts slot and part info from template comments — JSDoc
`@slot` and `@csspart` tags are redundant and SHOULD be removed.

Three comment formats are supported, in order of complexity:

**Plain comment** (description only):

```html
<!-- Button label content. SHOULD contain text. -->
<slot></slot>

<!-- The native button element -->
<button part="button">
```

**Single-key YAML** (summary label for tooling previews):

```html
<!-- summary: Button label content -->
<slot></slot>
```

**Multi-key YAML** (summary + description + deprecated):

```html
<!--
  summary: The main slot for content
  description: |
    This slot displays user-provided content.
    Supports multiline **markdown**.
  deprecated: true
-->
<slot></slot>
```

When an element has both `slot` and `part` attributes, use nested
keys:

```html
<!-- slot: The info slot
     part:
       summary: Short label
       description: Longer description of the part -->
<slot name="info" part="info-part"></slot>
```

The default slot does not require a comment but benefits from one
when the expected content is non-obvious.

### CSS Custom Properties — Comments in CSS Source

Prefer documenting CSS custom properties in CSS sources rather than
with JSDoc `@cssprop` tags on the class. CSS comments keep
documentation co-located with the property definitions.

Use `/** */` comments in the CSS file. Position matters when both
LHS (private `--_` property) and RHS (`var()` call) contain custom
properties:

```css
/** Comment for the private property --c */
--c:
  /** Comment for the public override --d */
  var(--d);
```

When a `var()` is the direct value of a CSS property:

```css
/** Gap between toggle and label */
column-gap: var(--pf-v6-c-switch--ColumnGap, 0.5rem);
```

For the common private-to-public pattern used in this project:

```css
--_bg:
  /** Default label background color */
  var(--pf-v6-c-label--BackgroundColor,
    var(--pf-t--global--color--nonstatus--gray--default,
      light-dark(...)));
```

CSS comments also support `@summary`, `@deprecated`, and `@syntax`
tags for richer metadata:

```css
/**
 * A property defined on the host
 * @summary The host's custom property
 * @deprecated Use the `color` property instead
 */
--host-property: red;
```

Every public `--pf-v6-c-{name}--*` custom property SHOULD have an
inline CSS comment at its first use site. Color modifier overrides
(e.g. `--m-blue--BackgroundColor`) are self-documenting by naming
and do not need per-line comments — but the base tokens and key
modifier sections (outline, compact, disabled, overflow) do.

### Events — `@fires` JSDoc (Preferred)

`@fires` remains the preferred documentation method for events.
Keep on a single line:

```ts
* @fires {LabelCloseEvent} close - Fired when the close button is activated
```

### Attributes — `@attr` JSDoc or Property JSDoc

Attributes are typically documented via their corresponding
`@property` decorator JSDoc. Use `@attr` only when an attribute
exists without a corresponding property.

### Class-Level JSDoc

Every element class MUST have:

- A description paragraph (first text in the JSDoc)
- A `@summary` tag (short one-liner for manifest)

```ts
/**
 * A label is a compact element for categorization, status, or metadata.
 *
 * @summary Compact tag for categorization, status, or metadata display.
 *
 * @fires {LabelCloseEvent} close - Fired when close button is activated
 */
```

### Property JSDoc

Every `@property` MUST have a `/** */` JSDoc comment describing
its purpose:

```ts
/** Renders the label at a smaller, compact size. */
@property({ type: Boolean, reflect: true }) compact = false;
```

Do not add `@default` tags — the cem analyzer picks up initializers
automatically.

### Effective AI Descriptions

Per https://bennypowers.dev/cem/docs/usage/effective-mcp-descriptions/:

- Describe purpose and context, not just what it is
- Use RFC 2119 keywords (MUST, SHOULD, AVOID) for validation rules
- Keep descriptions under 400 characters (2000 char hard limit)
- Include usage guidelines, relationships, and constraints
- Combine type annotations with guideline-rich descriptions

## Workflow

### Phase 1: Read Element

Read:
- `elements/pf-v6-{name}/pf-v6-{name}.ts`
- `elements/pf-v6-{name}/pf-v6-{name}.css`

### Phase 2: Check CSS Inline Comments

For each `--pf-v6-c-{name}--*` custom property referenced in the
CSS file:

- [ ] Has a `/** description */` comment at its first use site?
- [ ] Comment is co-located (between private prop name and `var()`)?
- [ ] Description is concise and describes what the property controls?

Flag public properties that lack inline CSS comments.

### Phase 3: Check Slot and Part Documentation

For each `<slot>` and `part="..."` element in the render template:

- [ ] Has an HTML comment immediately before it?
- [ ] Comment uses plain, single-key YAML, or multi-key YAML format?
- [ ] No `@slot` JSDoc tags on the element class? (remove if found)
- [ ] No `@csspart` JSDoc tags on the element class? (remove if found)

### Phase 4: Check Event Documentation

For each `dispatchEvent()` call:

- [ ] `@fires` JSDoc tag exists on the element class?
- [ ] Description is single-line with ` - ` separator?
- [ ] Event class is referenced (e.g. `{LabelCloseEvent}`)?

### Phase 5: Check Property JSDoc

For each `@property` decorator:

- [ ] Has `/** */` JSDoc comment?
- [ ] Description is concise and accurate?
- [ ] No `@default` tags (analyzer picks up initializers)?

### Phase 6: Check Class-Level JSDoc

- [ ] Description paragraph present (first text)?
- [ ] `@summary` tag present?
- [ ] No `@slot` tags? (slots documented via HTML comments only)
- [ ] No `@csspart` tags? (parts documented via HTML comments only)
- [ ] `@fires` tags present for all events?
- [ ] Descriptions use RFC 2119 keywords where applicable?

### Phase 7: Run cem health

```bash
cem health --component pf-v6-{name} --format json
```

Flag any category below 80%.

### Phase 8: Report

```markdown
## Documentation Review: pf-v6-{name}

### Summary
- CSS inline comments: X/Y properties documented
- Slots: X/Y documented with HTML comments
- Events: X/Y documented with `@fires`
- Properties: X/Y have JSDoc
- cem health: X%

### Missing CSS Comments
[List of public properties without inline comments]

### Missing Slot/Part Comments
[List of slots/parts without HTML comments]

### Stale JSDoc Tags
[`@slot` or `@csspart` tags that should be removed]

### Format Issues
[Other documentation problems]

### Suggestions
[Nice to have]
```

## Principles

- Co-location: document each API surface next to the code it describes
- Inline CSS comments are the primary documentation for custom properties
- HTML template comments are the sole documentation for slots and parts
- Do NOT use `@slot` or `@csspart` JSDoc tags — remove them if found
- `@fires` and `@attr` JSDoc remain the preferred method for events and attributes
- Documentation feeds LSP, MCP, and dev server — quality directly affects DX
