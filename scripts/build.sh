#!/bin/bash

CMD="npm run lerna -- run build --parallel --no-bail --include-dependencies"

for el in "$@"; do
  [[ "$el" != "pfe-sass" ]] && CMD="$CMD --scope \"*/$el\""
done

# If pfe-sass was the only provided input, compile it
[[ "$@" == "pfe-sass" ]] && CMD="$CMD --scope \"*/$el\""

CMD="$CMD && npm run build-storybook"

# eval $CMD
echo $CMD

rm -rf examples/node_modules
mkdir examples/node_modules
cp -r node_modules/@webcomponents node_modules/requirejs examples/node_modules/