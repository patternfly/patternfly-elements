#!/bin/bash
export FORCE_COLOR=true

CMD="npm run lerna -- run build --parallel --no-bail --include-dependencies"

for el in "$@"; do
  CMD="$CMD --scope \"*/$el\""
done

# If all components are being built (thus $* is empty), ignore pfe-sass (it gets built by components as a dependency)
# Only add the storybook build when every component is being built
if [[ -z "$*" ]]; then
  CMD="$CMD --ignore \"*/pfe-sass\" && npm run build-storybook";
fi

eval $CMD
