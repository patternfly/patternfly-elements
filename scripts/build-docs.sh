#!/bin/bash
export FORCE_COLOR=true

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

# clean and run build

pushd $DIR > /dev/null
pushd ../docs/ > /dev/null

echo "Cleaning public/ dir."
rm -rf _site

echo "Building 11ty docs."
npm run build

echo "Copying elements directory"
mkdir _site/elements;

# for f in ../elements/*/docs; do
#   DOCS_DIR="_site${f/..}";
#   echo "Creating ${DOCS_DIR}" 
#   mkdir -p $DOCS_DIR
# done

for f in ../elements/*/demo; do
  DEMO_DIR="_site${f/..}";
  echo "Creating ${DEMO_DIR}" 
  mkdir -p $DEMO_DIR
done

for f in ../elements/*/demo/*; do
  DEMO_FROM="$f"
  DEMO_TO="./_site${f/..}"
  echo "Writing ${DEMO_TO} from ${DEMO_FROM}"
  cp -r $DEMO_FROM $DEMO_TO
done

for f in ../elements/*/dist; do
  DIST_DIR="_site${f/..}"
  echo "Creating ${DIST_DIR}"
  mkdir -p $DIST_DIR
done

for f in ../elements/*/dist/*; do
  DIST_FROM="$f"
  DIST_TO="./_site${f/..}"
  echo "Writing ${DIST_TO} from ${DIST_FROM}"
  cp -r $DIST_FROM $DIST_TO
done

echo "Copying examples directory"
cp -r ../examples ./_site/

echo "Building storybook."
cd ../
npm run build-storybook
mkdir docs/_site/storybook
cp -r ./.storybook_out/* ./docs/_site/storybook

popd > /dev/null
popd > /dev/null
