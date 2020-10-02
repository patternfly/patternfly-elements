#!/bin/bash

CMD="npm run build $@; ./node_modules/.bin/wct --configFile wct.conf.json"

#######################################################
#  If no elements were specified, run all the tests.  #
#######################################################

if [[ $# -eq 0 ]] ; then
    CMD="$CMD \"elements/*/test/\" \"elements/*/test/old-test\""
fi

####################################################################################
#  If one or more elements were requested, run the tests for only those elements.  #
####################################################################################

for el in "$@"; do
  if [[ $el == -* ]]; then
    CMD="$CMD $el"
  else
    CMD="$CMD \"elements/$el/test/\" \"elements/$el/test/old-test\""
  fi
done

eval $CMD
