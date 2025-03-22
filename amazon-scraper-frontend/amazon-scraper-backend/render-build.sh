#!/bin/bash

# Install dependencies
npm install

# Install Chromium manually
sudo apt-get update
sudo apt-get install -y chromium-browser

# Set the executable path for Puppeteer
export PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"

# Verify Chromium installation
ls -l $PUPPETEER_EXECUTABLE_PATH
