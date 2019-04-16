#!/bin/bash

DIRS=""
DIRS_COUNT=""
LEFTOVERS=0

package_json_exists() {
  find $1 -maxdepth 1 -name "package.json" -type f -print > /dev/null
  return $?
}

node_modules_exists() {
  find $1 -maxdepth 1 -name "node_modules" -type d -print > /dev/null
  return $?
}

for e in elements/*; do
  DIRS=$(find $e/* -maxdepth 0 -type d -print)

  echo
  echo $e
  echo package.json exists
  package_json_exists $e
  echo $?
  echo node_modules exists
  node_modules_exists $e
  echo $?

  if !( package_json_exists $e ) && node_modules_exists $e; then
    LEFTOVERS=$((LEFTOVERS+1))
    echo "WARNING: Found leftover element: $e"
  fi
done

if [[ $LEFTOVERS > 0 ]]; then
  echo -e "\n$([ $LEFTOVERS == 1 ] && echo "This element" || echo "These elements") were likely created on another branch, but do not exist in your current branch.  Git did not delete $([ $LEFTOVERS == 1 ] && echo "it" || echo "them") when you switched branches because they contain a \`node_modules\` directory which is not tracked by git.  They can be safely deleted if they are causing you any issues."
fi

exit 0 # always exist 0 to prevent npm from printing a giant error blurb that takes attention away from these warnings
