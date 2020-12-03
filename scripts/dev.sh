#!/bin/bash

CMD="npm-run-all --parallel \"build $@\" && npm-run-all --parallel \"storybook\" \"watch $@\" \"start $@\""

source scripts/hugo-check.sh
if hugoCheck; then
  pushd docs > /dev/null
  hugo server &
  popd > /dev/null
else
  echo "Not running Hugo server (docs site) because Hugo is not installed."
fi

eval $CMD
