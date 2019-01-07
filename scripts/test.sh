#!/bin/bash

CMD="npm run build $@; ./node_modules/.bin/wct --configFile wct.conf.json"

for el in "$@"; do
  if [[ $el == -* ]]; then
    CMD="$CMD $el"
  else
    CMD="$CMD \"elements/$el/test/\""
  fi
done

eval $CMD
