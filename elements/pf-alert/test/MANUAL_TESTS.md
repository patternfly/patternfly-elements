# pf-alert — Manual Tests

This document outlines manual testing procedures for the `pf-alert` component.

## Setup
1. Start the development server:
```bash
npm run start
```
2. Open the demo page in your browser
3. Have a screen reader ready (e.g., NVDA, VoiceOver)

## Visual Tests

### Base Alert
- [ ] Renders with correct default styling
- [ ] Title text is clearly visible
- [ ] Content text is properly formatted
- [ ] Icon matches the alert state
- [ ] Close button (if dismissable) is properly positioned

### States
Test each state and verify proper styling:
- [ ] Default
- [ ] Success (green)
- [ ] Warning (orange/yellow)
- [ ] Danger (red)
- [ ] Info (blue)

### Variants
Test each variant:
- [ ] Inline
- [ ] Toast
- [ ] Default

## Interaction Tests

### Keyboard Navigation
- [ ] Tab key focuses interactive elements in correct order
- [ ] Enter/Space triggers action buttons
- [ ] Escape key dismisses alert (if dismissable)
- [ ] Focus is properly trapped in modal alerts (if applicable)

### Mouse Interaction
- [ ] Click on close button dismisses alert
- [ ] Action buttons respond to clicks
- [ ] Toast alerts can be dismissed via close button

### Screen Reader Tests
Using NVDA or VoiceOver:
- [ ] Alert role is announced
- [ ] Alert state (success/warning/etc) is announced
- [ ] Title and content are read in correct order
- [ ] Interactive elements are properly announced
- [ ] Dismissal is announced

## Functional Tests

### Toast API
- [ ] `PfAlert.toast()` creates visible toast
- [ ] Toast appears in correct position
- [ ] Auto-dismiss works with specified duration
- [ ] Multiple toasts stack correctly

### State Changes
- [ ] Changing state updates styling immediately
- [ ] Changing variant updates layout immediately
- [ ] Adding/removing `dismissable` updates UI
- [ ] Slot content updates reflect immediately

## Accessibility Tests
- [ ] Run aXe or similar tool
- [ ] Verify color contrast meets WCAG standards
- [ ] Verify all interactive elements are keyboard accessible
- [ ] Check aria attributes are present and correct
- [ ] Test with screen reader in different browsers

## Browser Testing
Test in:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Notes
- Document any bugs or inconsistencies found
- Note any browser-specific issues
- Record accessibility concerns