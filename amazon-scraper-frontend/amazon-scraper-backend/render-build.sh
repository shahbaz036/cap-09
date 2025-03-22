#!/bin/bash
npm install
npx puppeteer browsers install chrome

# Check if Chrome is installed
echo "Checking Puppeteer installation..."
npx puppeteer browsers list
ls -l /opt/render/.cache/puppeteer/chrome/
ls -l /opt/render/.cache/puppeteer/chrome/linux-134.0.6998.35/chrome-linux64/
