#!/bin/bash

CMD="npm run build $@ && npm-run-all --parallel \"watch $@\" \"start $@\""

eval $CMD
