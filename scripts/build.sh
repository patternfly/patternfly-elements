#!/bin/bash

CMD="npm-run-all --parallel \"build-storybook\" \"lerna -- run build --parallel --no-bail --include-filtered-dependencies"

SET=()
if [[ $# -gt 0 ]]; then
  SET=$@
else
  for path in $(ls -d elements/*); do
    el=${path##*/}
    SET+=(${path##*/})
  done
fi

for el in "${SET[@]}"; do
  [[ $el = pfe* ]] && CMD="$CMD --scope */$el"
done

CMD="$CMD\""

eval $CMD

rm -rf examples/node_modules
mkdir examples/node_modules
cp -r node_modules/@webcomponents node_modules/requirejs examples/node_modules/