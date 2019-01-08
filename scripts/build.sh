#!/bin/bash

CMD="npm run lerna -- run build --parallel --no-bail --include-filtered-dependencies"

for el in "$@"; do
  CMD="$CMD --scope \"*/$el\""
done

eval $CMD
