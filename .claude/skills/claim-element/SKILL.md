---
name: claim-element
description: >
  Claim a v6 element to work on. Checks issue assignees, phase ordering,
  and dependency readiness before handing off to /update-element or
  /create-element. Use when asked to "claim", "pick", "start", or
  "what should I work on next".
tools: Read, Bash
---

# Claim Element

Coordinate multi-user v6 migration work. Check what's available, enforce
phase ordering, and hand off to the right skill.

## Data Source

Read `.claude/V6-MIGRATION-PLAN.md` for the canonical element list,
tier assignments, phase ordering, and dependency graph. Do not
hard-code element lists -- always parse from the plan file.

Parse the plan to extract:
- Phase 1 (UPDATE) elements: Tiers 1, 2, 3
- Phase 2 (CREATE) elements: Tiers 4, 5, 6, 7
- Dependencies for each element (from the "Depends on" / "Notes" columns)

## Workflow

### Step 1: Determine Current User

Run `gh api user --jq .login` to get the current GitHub username.

### Step 2: Read Migration Plan

Read `.claude/V6-MIGRATION-PLAN.md` and parse the tier tables to build
the element list with plan numbers, dependencies, and phase assignments.

### Step 3: Gather GitHub State

Run these queries:

1. **Open element issues with assignees:**
   ```
   gh issue list --repo patternfly/patternfly-elements \
     --search "pf-v6 in:title" --state open --limit 100 \
     --json number,title,assignees
   ```

2. **Closed element issues** (already done):
   ```
   gh issue list --repo patternfly/patternfly-elements \
     --search "pf-v6 in:title" --state closed --limit 100 \
     --json number,title
   ```

3. **Existing v6 element directories on staging/pfv6:**
   ```
   git ls-tree --name-only staging/pfv6 elements/ | grep pf-v6
   ```

4. **Open PRs targeting staging/pfv6:**
   ```
   gh pr list --repo patternfly/patternfly-elements \
     --base staging/pfv6 --state open \
     --json number,title,headRefName,author
   ```

### Step 4: Match Issues to Plan

Match GitHub issues to plan elements by element name. Issues use the
pattern `[feat]: Update <pf-v6-{name}>` or `[feat]: Create <pf-v6-{name}>`.
Flag any plan elements that have no matching issue.

### Step 5: Determine Phase Readiness

**Phase completion rules:**

- **Phase 1 (Tiers 1-3, UPDATE elements):** All UPDATE issues must be
  closed AND their `pf-v6-*` directories must exist on `staging/pfv6`
  before Phase 2 work can begin.
- **Phase 2 (Tiers 4-7, CREATE elements):** All CREATE issues in a
  given tier must be closed before the next tier can begin. Tier 4
  before Tier 5, Tier 5 before Tier 6, Tier 6 before Tier 7.

Count open vs closed issues per tier. Report completion status.

### Step 6: Present Available Elements

If the user specified an element name, skip to Step 7.

Otherwise, show the user what's available in the current phase:

```
## Available Elements (Phase N, Tier M)

| # | Element | Issue | Assignee | Status |
|---|---------|-------|----------|--------|
| 1 | spinner | #3037 | -- | available |
| 2 | badge   | #2982 | @user1 | claimed |
```

Elements with assignees are marked "claimed". Elements without
assignees are "available".

Recommend the next element by migration plan order (lowest tier number
first, then lowest plan number within the tier).

### Step 7: Validate Selection

When the user picks an element (or specified one up front), run
these checks in order:

#### Check 1: Issue exists

Find the matching GitHub issue. If no issue exists, warn the user
and ask if they want to create one.

#### Check 2: Already assigned

If the issue has an assignee:
```
WARNING: #{number} is assigned to @{assignee}. They may already be
working on this element.

Pick a different element, or override to continue anyway?
```

Use AskUserQuestion to let the user override or pick another.

#### Check 3: Phase ordering

If the element belongs to a later phase/tier than what's currently
ready:
```
WARNING: {element} is in Phase {N} (Tier {M}), but the previous
tier is not complete yet. {X} of {Y} elements still open.

Pick an element from the current tier, or override?
```

Use AskUserQuestion. If the user overrides, proceed to Check 4.

#### Check 4: Dependency check (for overrides and Phase 2+)

Look up the element's dependencies from the migration plan.
Verify each dependency exists as a directory on `staging/pfv6`:
```
git ls-tree --name-only staging/pfv6 elements/ | grep pf-v6-{dep}
```

If any dependency is missing:
```
BLOCKED: {element} depends on {missing-deps}, which are not yet on
staging/pfv6. These must be merged first.

Pick a different element?
```

This check cannot be overridden -- missing dependencies are a hard
block.

### Step 8: Claim

If all checks pass (or overrides accepted):

1. Assign the issue to the current user:
   ```
   gh issue edit {number} --repo patternfly/patternfly-elements \
     --add-assignee @me
   ```

2. Report to the user:
   ```
   Claimed #{number}: {element}
   Assigned to @{username}

   Ready to start? This element uses /update-element or /create-element.
   ```

3. Tell the user which skill to invoke:
   - UPDATE issues -> `/update-element`
   - CREATE issues -> `/create-element`

Do NOT automatically invoke the skill. Let the user trigger it.
