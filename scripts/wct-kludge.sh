#!/bin/bash

if [[ $* == *--verbose* ]]; then
  VERBOSE="true"
else
  VERBOSE="false"
fi

# from http://stackoverflow.com/a/18443300/215148
pyrealpath() {
    cd "$(dirname "$1")"
    python -c "import sys;import os;print(os.path.realpath('$1'))"
}

unlink_all() {
  $VERBOSE && echo "Unlinking all symlinks inside $KLUDGE_DIR"
  pushd "$KLUDGE_DIR" > /dev/null
  for f in *; do
    if [[ -L "$f" ]]; then
      $VERBOSE && echo "  * unlinking $f"
      unlink $f
    fi
  done
  $VERBOSE && echo "Done removing symlinks."
  popd > /dev/null
}

link_all() {
  $VERBOSE && echo "Symlinking elements/ and node_modules/* into $KLUDGE_DIR"
  pushd "$KLUDGE_DIR" > /dev/null
  for nm in $NODE_MODULES_DIR/*; do
    $VERBOSE && echo "  * linking $(basename "$nm")"
    ln -s "$nm" "$KLUDGE_DIR/$(basename "$nm")"
  done
  if [[ -L "elements" ]]; then
    $VERBOSE && echo "linking all "
    echo "WARNING: there is a package in node_modules named 'elements', which due to a naming conflict cannot be used as a runtime dependency by any RHElement.  If it is not used as a runtime dependency, there should be no issue.  Proceeding."
    unlink elements
  fi
  $VERBOSE && echo "Done creating symlinks."
  ln -s "$REPO_DIR/elements"
  popd > /dev/null
}

SCRIPTS_DIR="$(pyrealpath "$(dirname "$0")")"
REPO_DIR="$(dirname "$SCRIPTS_DIR")"
KLUDGE_DIR="$REPO_DIR/test/.wct-kludge"
NODE_MODULES_DIR="$REPO_DIR/node_modules"

$VERBOSE && echo "Kludging things up to 3rd party deps work in Web Component Tester.  Running with the following parameters:"
$VERBOSE && echo
$VERBOSE && echo "scripts dir      : $SCRIPTS_DIR"
$VERBOSE && echo "repo dir         : $REPO_DIR"
$VERBOSE && echo "kludge dir       : $KLUDGE_DIR"
$VERBOSE && echo "node_modules dir : $NODE_MODULES_DIR"
$VERBOSE && echo

# non-verbose message
$VERBOSE || echo "Symlinking node_modules/* and elements/ for WCT."

if [[ ! -d "$NODE_MODULES_DIR" ]]; then
  echo "$NODE_MODULES_DIR does not exist, aborting WCT kludge"
  exit 0
fi


if [[ ! -d "$KLUDGE_DIR" ]]; then
  echo "$KLUDGE_DIR does not exist, creating it"
  mkdir $KLUDGE_DIR
fi

unlink_all
link_all

echo "Done."

# run this on postinstall and postuninstall
