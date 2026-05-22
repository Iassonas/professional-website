#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────
# Azure App Service startup command.
# Configure in the Azure portal: Configuration → General settings
#   Startup Command:  bash /home/site/wwwroot/startup.sh
# Or rely on App Service auto-detection when this file exists at root.
# ──────────────────────────────────────────────────────────────
set -e

cd /home/site/wwwroot/backend

# Use gunicorn with uvicorn workers for production.
# ${PORT} is injected by App Service (defaults to 8000 if unset locally).
exec gunicorn \
  --workers 2 \
  --worker-class uvicorn.workers.UvicornWorker \
  --bind=0.0.0.0:${PORT:-8000} \
  --timeout 120 \
  --access-logfile - \
  --error-logfile - \
  app.main:app
