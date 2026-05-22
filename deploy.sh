#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────
# Custom deployment script for Azure App Service (Linux, Python).
# Runs during deploy: installs Python deps, builds the React
# frontend, leaves a static bundle that backend/app/main.py serves.
# ──────────────────────────────────────────────────────────────
set -euo pipefail

echo "──────────────────────────────────────────────"
echo "Iassonas / professional-website — Azure deploy"
echo "──────────────────────────────────────────────"

# 1) Python dependencies
echo "→ Installing Python dependencies..."
python -m pip install --upgrade pip
pip install -r requirements.txt

# 2) Frontend build
echo "→ Building React frontend..."
if ! command -v npm >/dev/null 2>&1; then
  echo "✗ npm not found on the build agent. On Azure App Service Linux Python,"
  echo "  set the App Setting NODE_VERSION (e.g. 20) and ENABLE_ORYX_BUILD=true"
  echo "  OR build the frontend locally before deploying."
  exit 1
fi

pushd frontend >/dev/null
npm ci --no-audit --no-fund
npm run build
popd >/dev/null

echo "✓ Frontend bundle ready at frontend/dist"
echo "✓ Deploy script complete"
