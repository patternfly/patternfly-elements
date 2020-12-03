#!/bin/bash

CMD="npm run lerna -- run build --parallel --no-bail --include-filtered-dependencies --scope \"*/pfe-sass\""

if [[ $# -gt 0 ]]; then
  # If pfe-sass is the only component being watched, skip it since it's already compiled
  if [[ $# -eq 1 && "$@" != "pfe-sass" ]]; then
    for el in "$@"; do
      [[ $el = pfe* ]] && [[ $el != "pfe-sass" ]] && CMD="$CMD --scope \"*/$el\""
    done
  fi
else
  for path in $(ls -d elements/*); do
    el=${path##*/}
    [[ $el = pfe* ]] && [[ $el != "pfe-sass" ]] && CMD="$CMD --scope \"*/${el##*/}\""
  done
fi

eval $CMD

rm -rf examples/node_modules
mkdir examples/node_modules
cp -r node_modules/@webcomponents node_modules/requirejs examples/node_modules/