#!/bin/bash
export FORCE_COLOR=true

CMD="npm run build $@ && npm-run-all --parallel \"watch $@\" \"start $@\""

source scripts/hugo-check.sh
if hugoCheck; then
  pushd docs > /dev/null
  hugo server &
  popd > /dev/null
else
  echo "Not running Hugo server (docs site) because Hugo is not installed."
fi

eval $CMD
