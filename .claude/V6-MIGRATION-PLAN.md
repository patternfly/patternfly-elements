# PatternFly Elements v6 Migration Plan

Ordered PR plan for issue #3110. UPDATE PRs first (rename existing v5 elements
to v6 and port APIs), then CREATE PRs (new elements not in v5).

**CRITICAL**: All PRs MUST target `staging/pfv6` branch, NOT `main`

## Phase 0: Infrastructure (do first)

These PRs unblock everything else.

### PR 0.1: Remove/replace dev server with `cem serve`
- [Issue #3110](https://github.com/patternfly/patternfly-elements/issues/3110) calls out hardcoded tag names in dev server
- `cem serve` handles import maps, CSS transforms, chromeless testing
- Remove `tools/pfe-tools/dev-server/` and wire up `cem serve`
- Update `npm run dev` / `npm start` scripts

### PR 0.2: Rename tooling and config for v6 prefix
- Update `eslint.config.js` ignore globs (icon demo path) to include pf-v6 as 
  well as pf-v5 paths
- Update `commitlint.config.js` to handle `pf-` prefix (no `v5`)
- Audit `elements/package.json` exports for orphaned entries
- Update `tsconfig` paths if needed
- Update `web-test-runner.config.js` and `playwright.config.ts` globs

Keep v5 prefix until all elements are updated.

### PR 0.3: Update docs scaffolding
- Update `docs/_snippets/` for v6 element names
- Update `docs/framework-integration/` examples
- Update `docs/components/` templates

---

## Phase 1: UPDATE PRs (rename v5 -> v6, port to v6 API)

Existing v5 elements renamed to `pf-v6-{name}` and updated to v6 PatternFly
design tokens, CSS, and React API parity. Order by dependency graph:
leaf components first, then composites.

### Tier 1: Zero-dependency leaf elements

These elements don't depend on other PF elements. Port first.

| #    | Element                  | v5 name                  | Notes                                      |
| ---- | ------------------------ | ------------------------ | ------------------------------------------ |
| 1.1  | `pf-v6-spinner`          | `pf-v5-spinner`          | Pure CSS animation, simplest possible port |
| 1.2  | `pf-v6-badge`            | `pf-v5-badge`            | Simple text + count                        |
| 1.3  | `pf-v6-avatar`           | `pf-v5-avatar`           | Image with fallback                        |
| 1.4  | `pf-v6-banner`           | `pf-v5-banner`           | Simple status bar                          |
| 1.5  | `pf-v6-icon`             | `pf-v5-icon`             | Icon loading, used by many others          |
| 1.6  | `pf-v6-tooltip`          | `pf-v5-tooltip`          | Floating UI, no PF deps                    |
| 1.7  | `pf-v6-progress`         | `pf-v5-progress`         | Progress bar, ARIA managed internally      |
| 1.8  | `pf-v6-switch`           | `pf-v5-switch`           | FACE element, toggle                       |
| 1.9  | `pf-v6-text-input`       | `pf-v5-text-input`       | FACE element                               |
| 1.10 | `pf-v6-text-area`        | `pf-v5-text-area`        | FACE element                               |
| 1.11 | `pf-v6-timestamp`        | `pf-v5-timestamp`        | Date formatting                            |
| 1.12 | `pf-v6-back-to-top`      | `pf-v5-back-to-top`      | Scroll button                              |
| 1.13 | `pf-v6-background-image` | `pf-v5-background-image` | Background container                       |
| 1.14 | `pf-v6-helper-text`      | `pf-v5-helper-text`      | Form helper text                           |

### Tier 2: Single-dependency elements

Depend on one or more Tier 1 elements.

| #   | Element                  | v5 name                  | Depends on      |
| --- | ------------------------ | ------------------------ | --------------- |
| 2.1 | `pf-v6-button`           | `pf-v5-button`           | icon, spinner   |
| 2.2 | `pf-v6-label`            | `pf-v5-label`            | icon, button    |
| 2.3 | `pf-v6-chip`             | `pf-v5-chip`             | icon, button    |
| 2.4 | `pf-v6-hint`             | `pf-v5-hint`             | (light deps)    |
| 2.5 | `pf-v6-panel`            | `pf-v5-panel`            | (light deps)    |
| 2.6 | `pf-v6-code-block`       | `pf-v5-code-block`       | button (copy)   |
| 2.7 | `pf-v6-clipboard-copy`   | `pf-v5-clipboard-copy`   | button, tooltip |
| 2.8 | `pf-v6-progress-stepper` | `pf-v5-progress-stepper` | icon            |
| 2.9 | `pf-v6-tile`             | `pf-v5-tile`             | icon            |

### Tier 3: Composite elements

Depend on multiple Tier 1-2 elements.

| #    | Element              | v5 name              | Depends on                 |
| ---- | -------------------- | -------------------- | -------------------------- |
| 3.1  | `pf-v6-alert`        | `pf-v5-alert`        | icon, button               |
| 3.2  | `pf-v6-card`         | `pf-v5-card`         | (slots-heavy)              |
| 3.3  | `pf-v6-accordion`    | `pf-v5-accordion`    | expandable pattern         |
| 3.4  | `pf-v6-tabs`         | `pf-v5-tabs`         | RTI controller             |
| 3.5  | `pf-v6-label-group`  | `pf-v5-label-group`  | label, chip                |
| 3.6  | `pf-v6-popover`      | `pf-v5-popover`      | floating UI, button        |
| 3.7  | `pf-v6-modal`        | `pf-v5-modal`        | native dialog, button      |
| 3.8  | `pf-v6-table`        | `pf-v5-table`        | complex, many sub-elements |
| 3.9  | `pf-v6-jump-links`   | `pf-v5-jump-links`   | navigation pattern         |
| 3.10 | `pf-v6-search-input` | `pf-v5-search-input` | text-input, button         |
| 3.11 | `pf-v6-dropdown`     | `pf-v5-dropdown`     | floating UI, menu pattern  |
| 3.12 | `pf-v6-select`       | `pf-v5-select`       | floating UI, FACE, menu    |

---

## Phase 2: CREATE PRs (new elements not in v5)

Components that exist in React v6 but have no v5 web component equivalent.
Order by dependency and complexity.

### Tier 4: Simple new elements

| #    | Element                 | React source  | Notes                             |
| ---- | ----------------------- | ------------- | --------------------------------- |
| 4.1  | `pf-v6-divider`         | Divider       | `<hr>` with variants, very simple |
| 4.2  | `pf-v6-skeleton`        | Skeleton      | Loading placeholder, CSS-only     |
| 4.3  | `pf-v6-truncate`        | Truncate      | Text truncation with tooltip      |
| 4.4  | `pf-v6-content`         | Content       | Typography wrapper                |
| 4.5  | `pf-v6-title`           | Title         | Heading with size variants        |
| 4.6  | `pf-v6-radio`           | Radio         | FACE element                      |
| 4.7  | `pf-v6-checkbox`        | Checkbox      | FACE element                      |
| 4.8  | `pf-v6-skip-to-content` | SkipToContent | A11y skip link                    |
| 4.9  | `pf-v6-brand`           | Brand         | Logo/brand image                  |
| 4.10 | `pf-v6-backdrop`        | Backdrop      | Modal overlay                     |

### Tier 5: Medium complexity new elements

| #    | Element                    | React source      | Notes                           |
| ---- | -------------------------- | ----------------- | ------------------------------- |
| 5.1  | `pf-v6-expandable-section` | ExpandableSection | `<details>` based               |
| 5.2  | `pf-v6-description-list`   | DescriptionList   | `<dl>` semantic                 |
| 5.3  | `pf-v6-breadcrumb`         | Breadcrumb        | Navigation with `<nav>`         |
| 5.4  | `pf-v6-list`               | List              | Ordered/unordered with variants |
| 5.5  | `pf-v6-notification-badge` | NotificationBadge | Badge with icon                 |
| 5.6  | `pf-v6-number-input`       | NumberInput       | FACE, stepper                   |
| 5.7  | `pf-v6-form-select`        | FormSelect        | Native `<select>` wrapper, FACE |
| 5.8  | `pf-v6-slider`             | Slider            | Range input, FACE               |
| 5.9  | `pf-v6-simple-list`        | SimpleList        | Selection list                  |
| 5.10 | `pf-v6-action-list`        | ActionList        | Button group layout             |
| 5.11 | `pf-v6-input-group`        | InputGroup        | Form input composition          |
| 5.12 | `pf-v6-toggle-group`       | ToggleGroup       | Segmented control               |
| 5.13 | `pf-v6-empty-state`        | EmptyState        | Empty content placeholder       |
| 5.14 | `pf-v6-hero`               | Hero              | Hero banner section             |

### Tier 6: Complex new elements

| #    | Element                     | React source       | Notes                                   |
| ---- | --------------------------- | ------------------ | --------------------------------------- |
| 6.1  | `pf-v6-menu`                | Menu               | Complex, foundation for dropdown/select |
| 6.2  | `pf-v6-menu-toggle`         | MenuToggle         | Toggle for menu/dropdown                |
| 6.3  | `pf-v6-nav`                 | Nav                | Navigation sidebar                      |
| 6.4  | `pf-v6-pagination`          | Pagination         | Page navigation controls                |
| 6.5  | `pf-v6-toolbar`             | Toolbar            | Action bar with groups                  |
| 6.6  | `pf-v6-drawer`              | Drawer             | Sliding panel                           |
| 6.7  | `pf-v6-sidebar`             | Sidebar            | Layout sidebar                          |
| 6.8  | `pf-v6-notification-drawer` | NotificationDrawer | Notifications panel                     |
| 6.9  | `pf-v6-overflow-menu`       | OverflowMenu       | Responsive menu overflow                |
| 6.10 | `pf-v6-data-list`           | DataList           | Flexible data display                   |
| 6.11 | `pf-v6-masthead`            | Masthead           | App header bar                          |
| 6.12 | `pf-v6-page`                | Page               | App page layout                         |
| 6.13 | `pf-v6-form`                | Form               | Form layout and validation              |
| 6.14 | `pf-v6-text-input-group`    | TextInputGroup     | Composite input                         |
| 6.15 | `pf-v6-dual-list-selector`  | DualListSelector   | Two-list transfer                       |

### Tier 7: High-complexity

| #   | Element                      | React source       | Notes                    |
| --- | ---------------------------- | ------------------ | ------------------------ |
| 7.1 | `pf-v6-calendar-month`       | CalendarMonth      | Date picker calendar     |
| 7.2 | `pf-v6-date-picker`          | DatePicker         | Full date picker         |
| 7.3 | `pf-v6-time-picker`          | TimePicker         | Time selection           |
| 7.4 | `pf-v6-file-upload`          | FileUpload         | File upload with preview |
| 7.5 | `pf-v6-multiple-file-upload` | MultipleFileUpload | Multi-file upload        |
| 7.6 | `pf-v6-wizard`               | Wizard             | Multi-step flow          |
| 7.7 | `pf-v6-tree-view`            | TreeView           | Hierarchical tree        |
| 7.8 | `pf-v6-login-page`           | LoginPage          | Full login pattern       |
| 7.9 | `pf-v6-about-modal`          | AboutModal         | Branded about dialog     |

---

## Layout Components (NOT converted to custom elements)

These use PatternFly CSS layout classes directly. Document usage, don't wrap.

- Bullseye, Flex, Gallery, Grid, Level, Split, Stack, List, Simple List, Divider

---

## Per-PR Checklist

Use `/update-element` for Phase 1 PRs, `/create-element` for Phase 2 PRs.

For each PR:

1. [ ] API designed per `.claude/ADVICE.md` rules
2. [ ] CSS custom properties match computed CSS and Stylesheets of react demos on patternfly.org via chrome MCP
3. [ ] Element source with `@summary`, JSDoc
4. [ ] CSS with tokens, logical properties, nesting
5. [ ] Demos matching patternfly.org (name parity)
6. [ ] Tests (public API, a11ySnapshot, form submission if FACE)
7. [ ] `/review-api` audit
8. [ ] `/review-demos` audit
9. [ ] `/review-a11y` audit
9. [ ] Lint passes (eslint, stylelint)
10. [ ] Visual parity verified via Chrome MCP
