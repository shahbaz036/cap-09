#!/bin/bash

# Install dependencies
npm install

# Install Chrome manually
npx puppeteer browsers install chrome

# Export Puppeteer Chrome path
export PUPPETEER_EXECUTABLE_PATH="/opt/render/.cache/puppeteer/chrome/linux-134.0.6998.35/chrome-linux64/chrome"

# Verify Chrome installation
ls -l $PUPPETEER_EXECUTABLE_PATH

console.log("Checking Puppeteer paths...");
console.log("Puppeteer default path:", puppeteer.executablePath());
console.log("PUPPETEER_EXECUTABLE_PATH:", process.env.PUPPETEER_EXECUTABLE_PATH);