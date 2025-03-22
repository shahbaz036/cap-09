#!/bin/bash

# Install dependencies
npm install

# Install Chrome manually
npx puppeteer browsers install chrome

# Export Puppeteer Chrome path
export PUPPETEER_EXECUTABLE_PATH="/opt/render/.cache/puppeteer/chrome/linux-134.0.6998.35/chrome-linux64/chrome"

# Verify Chrome installation
ls -l $PUPPETEER_EXECUTABLE_PATH
