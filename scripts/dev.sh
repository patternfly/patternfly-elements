#!/bin/bash

CMD="npm run lerna -- run dev --parallel --no-bail --include-filtered-dependencies"

for el in "$@"; do
  CMD="$CMD --scope \"*/$el\""
done

source scripts/hugo-check.sh
if hugoCheck; then
  pushd docs > /dev/null
  hugo server &
  popd > /dev/null
else
  echo "Not running Hugo server (docs site) because hugo is not installed."
fi

eval $CMD
