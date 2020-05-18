#!/bin/bash

CMD="npm run lerna -- run watch --parallel --no-bail --include-filtered-dependencies"

for el in "$@"; do
  CMD="$CMD --scope \"*/$el\""
done

eval $CMD
