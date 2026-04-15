# pf-alert

The `pf-alert` web component displays PatternFly-styled alerts. It can be used inline in pages or as a toast notification (if a static helper is provided separately). Alerts support several visual **variants** (for example: `info`, `success`, `warning`, `danger`), an optional title slot, body content, and an **action links** slot for interactive controls. Alerts can also be **closable** and **expandable**.

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
<pf-alert variant="success">
    <span slot="title">Operation Success</span>
    
    The operation completed successfully.
</pf-alert>

<pf-alert variant="info" onClose>
    <span slot="title">System Update</span>
    
    A new system update is available.
    
    <div slot="actionLinks">
        <pf-button plain>Update Now</pf-button>
        <pf-button plain>Later</pf-button>
    </div>
</pf-alert>
```


