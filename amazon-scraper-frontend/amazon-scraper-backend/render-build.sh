#!/bin/bash
npm install
npx puppeteer browsers install chrome

# Check if Chrome is installed
echo "Checking if Chromium is installed..."
ls -l /opt/render/.cache/puppeteer/chrome
