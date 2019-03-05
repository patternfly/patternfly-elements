#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
HUGO_BIN=${HUGO_BIN:="hugo"}

# check for hugo

if ! [ -x "$(command -v $HUGO_BIN)" ]; then
  echo "Error: could not find Hugo (looked for '$HUGO_BIN')" >&2
  echo
  echo "If Hugo is installed but the command is not named 'hugo', set HUGO_BIN to the correct command name:" >&2
  echo
  echo "  export HUGO_BIN=\"my-hugo\"" >&2
  echo
  echo "If Hugo is not installed, see https://gohugo.io/getting-started/quick-start/" >&2
  exit 1
fi

# clean and run build

pushd $DIR > /dev/null
pushd ../docs/ > /dev/null

echo "Building hugo docs."
hugo

echo "Building storybook."
mkdir public/demo
npm run build-storybook
cp -r ../.storybook_out/* public/demo

echo "Pushing to github pages."
npx ghp public --force

popd > /dev/null
popd > /dev/null
