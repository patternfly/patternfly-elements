#!/bin/bash

CMD="npm run lerna -- run build --parallel --no-bail --include-filtered-dependencies"

for el in "$@"; do
  CMD="$CMD --scope \"*/$el\""
done

eval $CMD

rm -rf examples/node_modules
mkdir examples/node_modules
cp -r node_modules/@webcomponents node_modules/requirejs examples/node_modules/