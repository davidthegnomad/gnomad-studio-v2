#!/bin/bash
cp index.html.source index.html
npm run build
cp -r dist/* .
rm -rf dist
