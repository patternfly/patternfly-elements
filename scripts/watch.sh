#!/bin/bash
export FORCE_COLOR=true

CMD="npm run lerna -- run watch --parallel --no-bail --include-dependencies"

for el in "$@"; do
  CMD="$CMD --scope \"*/$el\""
done

eval $CMD
