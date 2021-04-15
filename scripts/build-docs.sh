#!/bin/bash
export FORCE_COLOR=true

echo "Copy documentation from components"
for f in ../elements/*/docs; do
  COMPONENT="${f/..\/elements\/pfe-}";
  COMPONENT="${COMPONENT/\/docs}"
  DOCS_DIR="components/${COMPONENT}"
  echo "Creating ${DOCS_DIR}"
  cp -rf $f $DOCS_DIR
done

echo "Building 11ty docs."
npm run build:docs