# pf-alert — Manual Tests

This document outlines manual testing procedures for the `pf-alert` component, based on its functionality, attributes, and slots.

## Setup
1. Start the development server (if applicable):
```bash
npm run start
```
2. Open the demo page where the pf-alert component is displayed in your browser.
3. Have a screen reader ready (e.g., NVDA, VoiceOver) for accessibility tests.

## Visual Tests

### Base Alert Structure
- [ ] Renders with correct default styling
- [ ] Alert renders with the default Neutral variant and the Bell icon (default fallback).
- [ ] Title content (slotted) is clearly visible in the #title-area.
- [ ] Description content (default slot) is visible in the #description area.
- [ ] The pf-icon element is present in the #icon-container.

### Variants and Icon Mapping
Test the component with various variant attributes and verify the appearance and correct icon display (as defined in variantToIcon):
- [ ] variant="info" (Blue, info-circle icon).
- [ ] variant="success" (Green, check-circle icon).
- [ ] variant="warning" (Yellow/Orange, exclamation-triangle icon).
- [ ] variant="danger" (Red, exclamation-circle icon).
- [ ] variant="neutral" (Gray, bell icon).
- [ ] variant="custom" (Uses default styling, no icon unless specified).

### Custom Overrides
- [ ] Set variant="danger" and specify icon="star". The alert should be red but display the star icon (custom icon overrides variant default).

## Interaction & Functional Tests

### Closable Alert (onClose and #close-button)
- [ ] Render the alert with onClose. Verify the close button is visible (not hidden).
- [ ] Click the close button. Verify the alert component is removed from the DOM.
- [ ] Focus the close button via keyboard (Tab) and press Enter or Space. Verify the alert component is removed from the DOM.

### Timed Dismissal (timeout)
- [ ] Render the alert with timeout="1000" (1 second). Wait 1.5 seconds.
    [ ] Verify the alert component is removed from the DOM.

    [ ] Verify that the custom event pf-alert:timeout was dispatched before removal.

- [ ] Render the alert with onClose and timeout="5000". Click the close button immediately.
    [ ] Verify the alert is removed immediately, and the timeout function is canceled (it does not attempt to remove itself again after 5 seconds).


### Expandable Alert (isExpandable and #toggle-button)
- [ ] Render the alert with slot name="isExpandable" (collapsed state).
    [ ] Verify the toggle button is visible.
    [ ] Verify the expandable content slot is hidden (#expandable-description has ?hidden).
    [ ] Verify the toggle icon is angle-right.
- [ ] Click the toggle button.
    [ ] Verify the expandable content slot is now visible.
    [ ] Verify the toggle icon changes to angle-down.
- [ ] Click the toggle button again.
    [ ] Verify the expandable content slot is hidden again.
    [ ] Verify the toggle icon changes back to angle-right.

## Accessibility Tests

### ARIA Roles and Attributes
- [ ] Inspect the main internal #container element. Verify it has the attribute role="alert".
- [ ] Inspect the toggle button (#toggle-button) in the collapsed state.
    [ ] Verify aria-expanded="false".
    [ ] Verify aria-label="Expand Alert".
- [ ] Inspect the toggle button in the expanded state.
    [ ] Verify aria-expanded="true".
    [ ] Verify aria-label="Collapse Alert".


### Keyboard Navigation
- [ ] Without isExpandable: Tabbing should move through action links (if present) and the close button in sequence.
- [ ] With isExpandable: Tabbing should move to the toggle button, then action links (if present), and then the close button in sequence.

### General
- [ ] Verify the component's root element correctly reflects the ouia-id attribute when set (e.g., <pf-alert ouia-id="test-1">).
