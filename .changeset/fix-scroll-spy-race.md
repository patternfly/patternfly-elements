---
"@patternfly/pfe-core": patch
---
`ScrollSpyController`: fix race conditions on rapid and smooth scroll navigation

- Fix rapid clicks leaving stale force-release listeners that caused the active
  state to fall "one click behind"
- Release force on `scrollend` instead of first IntersectionObserver callback,
  preventing intermediate sections from stealing active state during smooth scroll
- Sort passed links by DOM order instead of Set insertion order, fixing incorrect
  active state with non-contiguous content sections
