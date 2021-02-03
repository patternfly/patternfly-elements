#!/bin/bash

CMD="npm run lerna -- run build --parallel --no-bail --include-dependencies"

[[ -n "$*" ]] &&  CMD="$CMD --scope \"*/pfe-sass\""

for el in "$@"; do
  [[ "$el" != "pfe-sass" ]] && CMD="$CMD --scope \"*/$el\""
done

# Only build storybook when every component is being built
[[ -z "$*" ]] && CMD="$CMD && npm run build-storybook"

eval $CMD

rm -rf examples/node_modules
mkdir examples/node_modules
cp -r node_modules/@webcomponents node_modules/requirejs examples/node_modules/