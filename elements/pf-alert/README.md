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
