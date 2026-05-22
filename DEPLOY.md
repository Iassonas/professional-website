# Deploying to Azure App Service

This site runs as a **single Azure App Service** (Linux, Python). The FastAPI
backend serves the API at `/api/*` and the built React bundle at `/`.

## Files involved

| File | Purpose |
| --- | --- |
| `requirements.txt` | Root file Azure's Python builder uses — pulls in `backend/requirements.txt`. |
| `.deployment` | Tells App Service to run `deploy.sh` instead of the default build. |
| `deploy.sh` | Installs Python deps **and** builds the React frontend during deploy. |
| `startup.sh` | The runtime command — `gunicorn` with `uvicorn` workers. |
| `backend/app/main.py` | Mounts `frontend/dist/` at `/` when present. |

## One-time setup (Azure portal or `az` CLI)

### 1. Create the App Service

```powershell
# Variables
$rg       = "rg-iassonas-website"
$plan     = "asp-iassonas-website"
$app      = "iassonas-website"          # must be globally unique
$location = "westeurope"                # keep data in the EU

# Resource group + plan + Linux/Python web app
az group create -n $rg -l $location
az appservice plan create -n $plan -g $rg --is-linux --sku B1
az webapp create -n $app -g $rg -p $plan --runtime "PYTHON:3.12"
```

### 2. Configure the App Service

Set these **Application settings** (Portal → Configuration → Application settings,
or via CLI):

```powershell
az webapp config appsettings set -n $app -g $rg --settings `
  SCM_DO_BUILD_DURING_DEPLOYMENT=true `
  ENABLE_ORYX_BUILD=true `
  NODE_VERSION=20 `
  WEBSITE_RUN_FROM_PACKAGE=0 `
  APP_ENV=production `
  FRONTEND_URL="https://$app.azurewebsites.net" `
  CONTACT_EMAIL="iassonas.georgakopoulos@gmail.com" `
  SMTP_HOST="smtp.gmail.com" `
  SMTP_PORT=587 `
  SMTP_USER="<your-smtp-user>" `
  SMTP_PASSWORD="<your-smtp-password>" `
  OPENAI_API_KEY="<your-openai-key>" `
  OPENAI_MODEL="gpt-5-mini" `
  OPENAI_REASONING_EFFORT="minimal" `
  OPENAI_VERBOSITY="low" `
  OPENAI_MAX_COMPLETION_TOKENS=1200 `
  OPENAI_RETRY_MAX_COMPLETION_TOKENS=2400
```

`SCM_DO_BUILD_DURING_DEPLOYMENT=true` + `NODE_VERSION=20` give the Oryx build
agent both Python and Node, so `deploy.sh` can run `npm ci && npm run build`.

### 3. Set the startup command

```powershell
az webapp config set -n $app -g $rg `
  --startup-file "bash /home/site/wwwroot/startup.sh"
```

## Deploying code

### Option A — `az webapp up` (simplest)

From the project root:

```powershell
az webapp up -n $app -g $rg --runtime "PYTHON:3.12"
```

Re-run that command after each change. It zips the working directory,
uploads it, and Azure runs `deploy.sh` → `startup.sh`.

### Option B — GitHub Actions (CI/CD)

1. In the portal, go to **Deployment Center** → connect a GitHub repo.
2. Azure generates a workflow that calls `az webapp deploy`.
3. Make sure the workflow uploads the **whole repo** (don't filter to a
   single folder) so `deploy.sh`, `requirements.txt`, `backend/`, and
   `frontend/` are all present.

### Option C — VS Code Azure extension

Right-click the App Service in the Azure panel → **Deploy to Web App**.

## After deploying

Visit `https://<app>.azurewebsites.net`:

- `/` → React frontend (served as static files by FastAPI).
- `/api/contact`, `/api/chat` → the FastAPI endpoints.
- Logs: `az webapp log tail -n $app -g $rg`

## Custom domain (e.g. iassonas.com)

```powershell
az webapp config hostname add -n $app -g $rg --hostname iassonas.com
az webapp config ssl create  -n $app -g $rg --hostname iassonas.com
az webapp config ssl bind    -n $app -g $rg --certificate-thumbprint <thumb> --ssl-type SNI
```

Add the `CNAME` / `A` records Azure shows you to your DNS provider, then bind
the App Service managed certificate (free).

## Troubleshooting

- **Build fails on `npm ci`** → ensure `NODE_VERSION=20` and `ENABLE_ORYX_BUILD=true` app settings exist.
- **404 on every page after deploy** → the frontend bundle didn't build. Check `deploy.sh` ran by inspecting `https://<app>.scm.azurewebsites.net/api/deployments/latest/log`.
- **502 on startup** → the startup command points to the wrong path. Confirm `bash /home/site/wwwroot/startup.sh`.
- **`/api/*` returns CORS error** → in production everything is same-origin; if you still see CORS errors, set `FRONTEND_URL` app setting to the App Service URL.
