#!/bin/bash

CMD="npm run build $@ && npm run watch $@"

source scripts/hugo-check.sh
if hugoCheck; then
  pushd docs > /dev/null
  hugo server &
  popd > /dev/null
else
  echo "Not running Hugo server (docs site) because Hugo is not installed."
fi

eval $CMD
