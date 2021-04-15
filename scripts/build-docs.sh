#!/bin/bash
export FORCE_COLOR=true

QUIET=false

while [[ $# -gt 0 ]]; do
  [[ "$1" == "--quiet" ]] && QUIET=true
  shift
done

echo "Starting to build documentation"

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

function echoEvt {
	[[ "$QUIET" == false ]] && echo -e "${BLUE}$@${END}"
}

# clean and run build
pushd $DIR > /dev/null
pushd ../docs/ > /dev/null

echoEvt "Copy documentation from components"
for f in ../elements/*/docs; do
  COMPONENT="${f/..\/elements\/pfe-}";
  COMPONENT="${COMPONENT/\/docs}"
  DOCS_DIR="components/${COMPONENT}"
  echoEvt "Creating ${DOCS_DIR}"
  cp -rf $f $DOCS_DIR
done

echoEvt "Building 11ty docs."
npm install && npm run build

echoEvt "Copying assets from the elements directory"
mkdir _site/elements;

for f in ../elements/*; do
  ROOT_DIR="_site${f/..}";
  DEMO_DIR="_site${f/..}/demo";
  DIST_DIR="_site${f/..}/dist";

  echoEvt "Creating ${ROOT_DIR}" 
  mkdir -p $ROOT_DIR

  if [ -d "$f/demo" ]; then
    echoEvt "Writing ${DEMO_DIR} from ${f}/demo" 
    cp -r "$f/demo" $DEMO_DIR
  fi

  if [ -d "$f/dist" ]; then
    echoEvt "Writing ${DIST_DIR} from ${f}/dist"
    cp -r "$f/dist" $DIST_DIR
  fi

  for p in $f/*.{png,svg,jpg}; do
    if [ -f $p ]; then
      echoEvt "Copying ${p/..} to ${ROOT_DIR}"
      cp -r $p $ROOT_DIR
    fi
  done
done

echoEvt "Copying brand assets"
cp -r ../brand ./_site/

popd > /dev/null
popd > /dev/null

echo "Documentation site completed!"