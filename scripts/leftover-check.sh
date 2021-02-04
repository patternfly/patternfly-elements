#!/bin/bash
export FORCE_COLOR=true

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

# for each element, check for a node_modules dir without a corresponding
# package.json.  That indicates the element does not exist in this branch.
for e in elements/*; do
  if [[ -d $e/node_modules && !( -f $e/package.json ) ]]; then
    if [[ "$LEFTOVERS" == 0 ]]; then
      echo -e "INFO: the following \"leftover\" elements were found:\n"
    fi
    LEFTOVERS=$((LEFTOVERS+1))
    echo "$e"
  fi
done

if [[ $LEFTOVERS > 0 ]]; then
  echo -e "\nA \"leftover\" element arises when you create an element on a branch, then leave that branch, yet the element's directory still exists.  This is caused by the element's (untracked) node_modules directory preventing git from fully cleaning up after the branch change.  The leftover elements can be safely deleted.  However, if you do return to work on the leftover element you will need to \`npm install\` again."
fi

exit 0 # always exist 0 to prevent npm from printing a giant error blurb that takes attention away from these warnings
