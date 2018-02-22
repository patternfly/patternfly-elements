#!/bin/bash

IN_FILE=$1
OUT_FILE=$2

# change "../../foo" to "../../node_modules/foo" to correct paths for runtime
# use (paths work as written at build-time when installed into a node_modules
# directory)

cat $IN_FILE | sed -E 's/import (\S+) from "\.\.\/\.\.\/([^\.])/import \1 from "..\/..\/node_modules\/\2/' > $OUT_FILE
