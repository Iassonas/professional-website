# Deploying to Azure App Service

This site runs as a **single Azure App Service** (Linux, Python). The FastAPI
backend serves the API at `/api/*` and the built React bundle at `/`.

Build is handled by **Oryx**, Azure's built-in builder, using a `POST_BUILD_COMMAND`
app setting that builds the React frontend after the Python deps are installed.

## Files involved

| File | Purpose |
| --- | --- |
| `requirements.txt` | Root file Oryx detects to install Python deps (pulls in `backend/requirements.txt`). |
| `startup.sh` | The runtime command, runs `gunicorn` with `uvicorn` workers. |
| `backend/app/main.py` | Mounts `frontend/dist/` at `/` when present. |
| `.gitattributes` | Forces LF line endings on `*.sh` so Linux can run them. |

## One-time setup (Azure portal or `az` CLI)

### 1. Create the App Service

```powershell
$rg       = "rg-iassonas-website"
$plan     = "asp-iassonas-website"
$app      = "iassonas-website"          # must be globally unique
$location = "westeurope"                # keep data in the EU

az group create -n $rg -l $location
az appservice plan create -n $plan -g $rg --is-linux --sku B1
az webapp create -n $app -g $rg -p $plan --runtime "PYTHON:3.12"
```

### 2. Configure the App Service

```powershell
az webapp config appsettings set -n $app -g $rg --settings `
  SCM_DO_BUILD_DURING_DEPLOYMENT=true `
  ENABLE_ORYX_BUILD=true `
  NODE_VERSION=20 `
  POST_BUILD_COMMAND="cd frontend && npm install --no-audit --no-fund && npm run build" `
  APP_ENV=production `
  FRONTEND_URL="https://$app.azurewebsites.net" `
  CONTACT_EMAIL="iasso1998@hotmail.fr" `
  SMTP_HOST="smtp.gmail.com" `
  SMTP_PORT=587 `
  SMTP_USER="<your-smtp-user>" `
  SMTP_PASSWORD="<your-smtp-password>" `
  OPENAI_API_KEY="<your-openai-key>"
```

`SCM_DO_BUILD_DURING_DEPLOYMENT=true` + `NODE_VERSION=20` make Oryx install
both Python 3.12 and Node 20 on the build agent. `POST_BUILD_COMMAND` runs
after the Python install and builds the React bundle into `frontend/dist/`.

### 3. Set the startup command

```powershell
az webapp config set -n $app -g $rg `
  --startup-file "bash /home/site/wwwroot/startup.sh"
```

## Deploying code

### Zip deploy (works on any machine)

From the project root:

```powershell
git archive HEAD --format=zip --output deploy.zip
az webapp deploy --resource-group $rg --name $app --src-path deploy.zip --type zip
```

`git archive` zips exactly what's tracked in git (no `.env`, no `venv/`, no
`node_modules/`). Oryx then installs Python deps, runs the post-build command,
and `startup.sh` boots `gunicorn`.

### GitHub Actions (CI/CD)

In the Azure portal, open **Deployment Center** and connect the GitHub repo.
Azure generates a workflow that pushes on every commit to `master`.

## After deploying

Visit `https://<app>.azurewebsites.net`:

- `/` is the React frontend (served as static files by FastAPI).
- `/api/contact`, `/api/chat` are the FastAPI endpoints.
- `/api/docs` is the interactive OpenAPI UI.

Tail logs:

```powershell
az webapp log tail -n $app -g $rg
```

## Custom domain (e.g. iassonas.eu)

```powershell
# Get the verification ID and IP
$verifyId = az webapp show -n $app -g $rg --query customDomainVerificationId -o tsv
$appIp    = az webapp show -n $app -g $rg --query inboundIpAddress -o tsv
```

Add these DNS records at your registrar:

| Type | Name | Value |
| --- | --- | --- |
| A | @ | `$appIp` |
| TXT | asuid | `$verifyId` |
| CNAME | www | `$app.azurewebsites.net` |

Wait until DNS propagates, then bind and add the free managed SSL cert:

```powershell
az webapp config hostname add -n $app -g $rg --hostname iassonas.eu
az webapp config ssl create   -n $app -g $rg --hostname iassonas.eu
$thumb = az webapp config ssl list -g $rg --query "[?subjectName=='iassonas.eu'].thumbprint | [0]" -o tsv
az webapp config ssl bind     -n $app -g $rg --certificate-thumbprint $thumb --ssl-type SNI

# Also set the canonical FRONTEND_URL once HTTPS works
az webapp config appsettings set -n $app -g $rg --settings FRONTEND_URL="https://iassonas.eu"
```

## Troubleshooting

- **Build fails on `npm ci`** → ensure `NODE_VERSION=20` and `ENABLE_ORYX_BUILD=true` app settings exist.
- **404 on every page after deploy** → the frontend bundle didn't build. Inspect `https://<app>.scm.azurewebsites.net/api/deployments/latest/log`.
- **502 on startup** → the startup command points to the wrong path. Confirm `bash /home/site/wwwroot/startup.sh` in Configuration → General settings.
- **Shell script errors like `set: pipefail: invalid option name`** → the script has CRLF line endings. The repo's `.gitattributes` already forces LF on `*.sh`; make sure you re-archive after committing it.
