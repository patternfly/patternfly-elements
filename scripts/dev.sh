#!/bin/bash

CMD="npm run lerna -- run dev --parallel --no-bail --include-filtered-dependencies"

for el in "$@"; do
  CMD="$CMD --scope \"@rhelements/$el\""
done

eval $CMD
