#!/bin/bash

CMD=""

while test $# -gt 0; do
  case "$1" in
    -w|--watch)
      shift
      CMD="watch"
      break
      ;;
    *)
      break
      ;;
  esac
done

els=" "
for el in "$@"; do
  [[ $el = pfe* ]] && els="$els $el"
done

[[ $CMD != "" ]] && CMD="\"$CMD $els\""

CMD="npm run build${els} && npm-run-all --parallel $CMD start storybook"

echo $CMD
eval $CMD
