#!/usr/bin/env bash
set -euo pipefail
# SEE https://github.com/changesets/changesets/issues/1139
npx changeset version
npm install --package-lock-only
