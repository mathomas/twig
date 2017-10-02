#!/usr/bin/env bash

set -e -u -x

ls -la
mv dependency-cache/node_modules twig
cd twig && npm rebuild node-sass --force && npm run build:prod && cd ..
