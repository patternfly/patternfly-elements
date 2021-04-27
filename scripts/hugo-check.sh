#!/bin/bash
export FORCE_COLOR=true

HUGO_BIN=${HUGO_BIN:="hugo"}

hugoCheck() {
  command -v $HUGO_BIN
  return $?
}

hugoNoisyCheck() {
  hugoCheck && return 0

  echo "Error: could not find Hugo (looked for '$HUGO_BIN')" >&2
  echo
  echo "If Hugo is installed but the command is not named 'hugo', set HUGO_BIN to the correct command name:" >&2
  echo
  echo "  export HUGO_BIN=\"my-hugo\"" >&2
  echo
  echo "If Hugo is not installed, see https://gohugo.io/getting-started/quick-start/" >&2
  return 1
}
