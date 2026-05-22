#!/usr/bin/env bash
# Runs after Oryx's main Python build.
# Builds the React frontend so backend/app/main.py can serve frontend/dist/.
set -e

echo "==> post_build.sh: building React frontend"
cd "$DEPLOYMENT_SOURCE/frontend" || cd "$(dirname "$0")/frontend"
echo "==> in $(pwd)"

echo "==> npm install"
npm install --no-audit --no-fund --prefer-offline

echo "==> npm run build"
npm run build

echo "==> built files:"
ls -la dist/ | head -20

echo "==> post_build.sh: done"
