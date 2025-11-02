# pf-alert

The `pf-alert` web component displays PatternFly-styled alerts. It can be used inline in pages or as a toast notification. Alerts support several visual states (for example: `info`, `success`, `warning`, `danger`), an optional header slot, body content, and an `actions` slot for interactive controls.

## Installation

Import the element in your page or application as an ES module:

```html
<script type="module">
	import '@patternfly/elements/pf-alert/pf-alert.js';
</script>
```

## Basic usage

Inline alert example:

```html
<pf-alert state="success">
	<h3 slot="header">Success</h3>
	The operation completed successfully.
	<div slot="actions">
		<pf-button variant="link">Details</pf-button>
	</div>
</pf-alert>
```

Toast usage (static helper):

```html
<script type="module">
	import '@patternfly/elements/pf-alert/pf-alert.js';

	// Show a simple toast notification
	PfAlert.toast({ message: 'Saved', heading: 'Success', state: 'success' });
</script>
```

## API

### Attributes / Properties
- `state` (string) — Visual state of the alert. Common values: `neutral`, `info`, `success`, `warning`, `danger`, `custom`, `cogear`. Default: `neutral`.
- `variant` (string) — Visual variant: `inline`, `toast`, or `alternate`.
- `dismissable` (boolean) — When true, a close control is shown and the alert will emit a close event when dismissed.

> See `elements/pf-alert/pf-alert.ts` for exact property types, defaults, and any additional options.

### Slots
- `header` — Slot for the heading (typically an `<h3>`).
- default (unnamed) — Main body/content of the alert.
- `actions` — Buttons or links for user actions (e.g. `<pf-button slot="actions">`).

### Events
- `close` (AlertCloseEvent) — Fired when the alert is closed (either via UI or programmatically). The event contains the action (e.g. `'close'`, `'dismiss'`, or `'confirm'`). Check the component source for exact payload.

### Methods
- `static toast(options)` — Static helper to show a toast notification. Options typically include `message`, `heading`, `state`, `persistent`, and `actions`.

## Styling

The component exposes CSS parts and custom properties for styling. Typical part(s): `::part(container)` for the main container. See the component stylesheet (`pf-alert.css`) for a list of CSS custom properties (colors, spacing, durations) you can override.

## Accessibility

- Toasts use `role="status"` and `aria-live="polite"` to announce messages to assistive technologies. Inline alerts should be used in-context with appropriate semantic markup.

## Notes & tips

- Use the `actions` slot to add interactive elements and listen for their events on the page.
- For persistent toasts set the `persistent` option when calling `PfAlert.toast(...)`.
- If you need the exact event names/shape or CSS variables, I can extract and add them from the component source.

---
If you want, I can also:
- Add a short section listing every CSS custom property the component exposes.
- Add a copyable example showing how to listen for the alert `close` event.
- Add a brief section demonstrating integration in React or Angular.
