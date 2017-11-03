#!/bin/bash
export $( cat .env-production|xargs)
export NODE_ENV=production

./node_modules/.bin/webpack \
  --colors \
  --verbose \
  --devtool eval \
  --progress \
  --display-chunks \
  --optimize-occurence-order \
  --bail
