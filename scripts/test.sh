#!/bin/bash

CMD="npm run build $@; ./node_modules/.bin/wct --configFile wct.conf.json"

for el in "$@"; do
  if [[ "$el" == "-p" ]]; then
    CMD="$CMD -p"
  else
    CMD="$CMD \"elements/$el/test/\""
  fi
done

eval $CMD
