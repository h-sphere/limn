#!/bin/bash
rm -fr dist/
pnpm run docs:build
pnpm run limn-explorer-build

mkdir dist
cp -rf docs/.vitepress/dist/* dist/

mkdir dist/explorer
cp -fr packages/limn-explorer/dist/* dist/explorer/
