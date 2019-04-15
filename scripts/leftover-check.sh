#!/bin/bash

DIRS=""
DIRS_COUNT=""
LEFTOVERS=0

for e in elements/*; do
  DIRS=$(find $e/* -maxdepth 0 -type d -print)
  DIRS_COUNT=$(echo $DIRS | wc -w)

  if [[ $DIRS_COUNT == 1 ]] && echo $DIRS | grep "node_modules$" >/dev/null; then
    LEFTOVERS=$((LEFTOVERS+1))
    echo "WARNING: Found leftover element: $e"
  fi
done

if [[ $LEFTOVERS > 0 ]]; then
  echo -e "\n$([ $LEFTOVERS == 1 ] && echo "This element" || echo "These elements") were likely created on another branch, but do not exist in your current branch.  Git did not delete $([ $LEFTOVERS == 1 ] && echo "it" || echo "them") when you switched branches because they contain a \`node_modules\` directory which is not tracked by git.  They can be safely deleted if they are causing you any issues."
fi

exit 0 # always exist 0 to prevent npm from printing a giant error blurb that takes attention away from these warnings
