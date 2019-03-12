#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

source hugo-check.sh

hugoNoisyCheck || exit 1

# clean and run build

pushd $DIR > /dev/null
pushd ../docs/ > /dev/null

echo "Cleaning public/ dir."
rm -rf public

echo "Building hugo docs."
hugo

echo "Building storybook."
npm run build-storybook
mkdir public/demo
cp -r ../.storybook_out/* public/demo

echo "Pushing to github pages."
npx ghp public --force

popd > /dev/null
popd > /dev/null
