# Deployment & Infrastructure Guide

> For internal teams deploying this application in a new environment.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Required Software](#2-required-software)
3. [Deploying in a New Environment](#3-deploying-in-a-new-environment)
4. [Secrets & Configuration](#4-secrets--configuration)
5. [External Services & Resources](#5-external-services--resources)
6. [Authentication](#6-authentication)
7. [Quick Reference: Common Commands](#7-quick-reference-common-commands)

---

## 1. Overview

This guide documents everything needed to deploy this application from scratch in a new environment. It covers required software, secrets management, infrastructure setup, and every external service the application depends on.

---

## 2. Required Software

The **only tool you need installed** on your local machine or server host is **Docker**. Everything else — the Python backend, Node.js frontend, and nginx reverse proxy — runs inside Docker containers built from the repo's Dockerfiles.

> ✅ You do **NOT** need: Python, pip, Node.js, npm, Miniconda, or a local venv.

> ✅ You **DO** need: Docker (with Compose plugin) installed on the host machine.

| Requirement | Detail |
|---|---|
| **Docker Engine** | Version 24+ with Compose V2 (`docker compose`, not `docker-compose`) |
| **Install** | https://docs.docker.com/get-docker/ |

---

## 3. Deploying in a New Environment

### 3.1 Local / Development

Use this path to run the stack locally for development and testing. Traffic is served over HTTP on port 80 — **do not expose this to the public internet.**

1. Clone the repository to your machine by using the command
```sh
git clone https://github.com/doncha-poj/Strata-OS.git
```
2. Obtain credentials from an existing project member (see [Section 4 — Secrets](#4-secrets--configuration)).
3. Copy `.env.example` → `.env` in the repo root and fill in values from that template (see [Section 4.1](#41-root-env-file)).
4. Copy `backend/.env.example` → `backend/.env` and fill in every value (see [Section 4.2](#42-backend-env-file)).
5. Place `service_account.json` in the repo root directory.
6. From the repo root, run:

```sh
docker compose -f docker-compose.dev.yml up --build # Optional -d flag to run containers in background
```

7. The app is now accessible at `http://localhost`.

**To get a fully clean rebuild** (drops volumes, removes cached layers):

```sh
# Make sure you are in the root directory before running
docker compose -f docker-compose.dev.yml down -v && docker compose -f docker-compose.dev.yml up --build
```

---

### 3.2 Production (HTTPS)

Production is served exclusively over HTTPS (port 443). TLS terminates at the nginx container. The backend and frontend containers communicate with nginx over plain HTTP inside the Docker network — this is normal and not reachable from the internet.

The current production site is **[https://strata-capital-os.com](https://strata-capital-os.com)** (e.g. login at [https://strata-capital-os.com/login](https://strata-capital-os.com/login)). Use the hostname `strata-capital-os.com` for TLS certificates, DNS, `LETSENCRYPT_DOMAIN`, and `CORS_ALLOW_ORIGINS` (origin URL only — no path). When deploying to a different domain, substitute your own hostname everywhere below.

#### 3.2.1 Infrastructure requirements

| Component | Detail |
|---|---|
| **VM** | Google Cloud e2-medium (2 vCPU, 4 GB RAM, Debian). SSH access restricted to approved IPs via GCP firewall rules. |
| **Firewall** | Inbound: HTTPS (443) from all; SSH (22) from approved IPs only. Port 80 not publicly exposed. |
| **DNS** | Domain and A record managed via GCP Cloud DNS. Production hostname **strata-capital-os.com**; A record points to the VM's public IPv4 *(34.28.76.191)*. |
| **TLS** | Let's Encrypt certificate obtained via Certbot (standalone mode). Cert files live on the host at `/etc/letsencrypt/live/<domain>/`. |

#### 3.2.2 First-time production deployment

1. Ensure the A record in GCP Cloud DNS points to the VM's public IP and has propagated.
2. SSH into the VM. Install Certbot on the host (not inside Docker).
3. Stop anything using port 80, then obtain a TLS certificate:

```sh
sudo certbot certonly --standalone -d strata-capital-os.com
```

4. Copy `.env.example` → `.env` in the repo root and set `LETSENCRYPT_DOMAIN=strata-capital-os.com` (required so Compose can mount the correct Let’s Encrypt certificate paths for nginx).
5. Copy `backend/.env.example` → `backend/.env` and fill in all keys. For production HTTPS, ensure at least:
   - `CORS_ALLOW_ORIGINS=https://strata-capital-os.com`
   - `JWT_COOKIE_SECURE=true`
6. Start the production stack:

```sh
docker compose -f docker-compose.prod.yml up -d --build
```

#### 3.2.3 TLS certificate renewal

Let's Encrypt certificates expire every ~90 days. To renew:

```sh
sudo certbot renew
docker exec strata_nginx nginx -s reload
```

The repo includes `scripts/renew-tls.sh` which automates this sequence. With DNS-01 challenge (using GCP Cloud DNS API), port 80 is not required during renewal.

---

## 4. Secrets & Configuration

> ⚠️ **None of the files listed below are committed to the repository.** Contact an existing project member to obtain values before deploying.

### 4.1 Root .env file

Copy `.env.example` to `.env` in the **repository root**. Docker Compose reads this file for variable substitution on the host (for example, `${LETSENCRYPT_DOMAIN}` in [docker-compose.prod.yml](../docker-compose.prod.yml) so nginx can mount the correct Let’s Encrypt certificate paths). **`LETSENCRYPT_DOMAIN`** must match the domain on the certificate in production.

This file is **not** passed into the backend container as `env_file`. Application secrets such as JWT settings, CORS, and API keys belong in **`backend/.env`** ([Section 4.2](#42-backend-env-file)).

### 4.2 Backend .env file

Copy `backend/.env.example` to **`backend/.env`**. Docker Compose loads this file into the backend service via `env_file`. Populate every key in the template:

- **Single-account login** — `STRATA_USERNAME`, `STRATA_PASSWORD` (no user database).
- **JWT signing and cookies** — `JWT_SECRET`, `JWT_COOKIE_NAME`, `JWT_IDLE_TIMEOUT_MINUTES`, `JWT_MAX_SESSION_HOURS`, `JWT_COOKIE_SECURE`, `JWT_COOKIE_SAMESITE`, `JWT_COOKIE_PATH`. In production over HTTPS, set `JWT_COOKIE_SECURE=true`.
- **Browser origin** — `CORS_ALLOW_ORIGINS` (comma-separated if needed). Local dev: `http://localhost` (and `http://127.0.0.1` if required). Production for this project: `https://strata-capital-os.com` (scheme + host only; not a path such as `/login`). For another deployment, use that environment’s public `https://` origin.
- **Google Sheets** — `GC_KEY`, `CONSOLIDATE_GC_KEY` (spreadsheet IDs used by the backend).

The Claude integration also requires **`ANTHROPIC_API_KEY`** at runtime; add it to `backend/.env` when you configure the Anthropic API ([Section 5.2](#52-setting-up-a-new-anthropic-api-key)).

### 4.3 service_account.json

A Google Cloud service account key file placed in the repo root. This grants the backend access to Google Cloud Storage buckets and Google Sheets in both the project's own GCP environment and the client's GCP environment. **Do not commit this file.**

The service account must be granted appropriate IAM roles in both GCP projects (see [Section 5.3](#53-setting-up-google-cloud-access)).

---

## 5. External Services & Resources

### 5.1 Service summary

| Service | Purpose | Pricing |
|---|---|---|
| **Anthropic API** | Powers all Claude LLM features (summarisation, analysis, generation). | Pay-as-you-go. Billed per token. No free tier for API usage. See [anthropic.com/pricing](https://anthropic.com/pricing). |
| **Google Cloud VM (GCE)** | Hosts the Docker stack. Spec: e2-medium, 2 vCPU, 4 GB RAM, Debian. | Paid. ~$26–$33/month (varies by region). Persistent disk and egress charges also apply. |
| **GCP Cloud DNS** | Manages the domain DNS zone and A record. | Paid. ~$0.20/month per zone + $0.40/million queries. Negligible at low traffic. |
| **Google Cloud Storage (our project)** | Stores pre-processed data spreadsheets and application assets. | Paid. Standard Storage ~$0.020/GB/month. Egress and operation charges apply. |
| **GCS / Google Sheets (client project)** | Reads live data from the client's GCP environment. | Billed to the client's GCP project. The service account must be granted read IAM roles in the client's project by the client. |
| **Let's Encrypt (Certbot)** | Issues and renews the TLS certificate for HTTPS. | **Free.** Certificates valid for 90 days, must be renewed. No account or payment required. |

### 5.2 Setting up a new Anthropic API key

1. Create an account at [console.anthropic.com](https://console.anthropic.com).
2. Navigate to **API Keys** and generate a new key.
3. Add a payment method — usage is billed monthly.
4. Paste the key into `backend/.env` as `ANTHROPIC_API_KEY`.

### 5.3 Setting up Google Cloud access

1. In your GCP project, create a service account (**IAM & Admin → Service Accounts**).
2. Grant it the **Storage Object Viewer** role (and **Storage Object Creator** if writes are needed).
3. For Google Sheets access, share the relevant Sheets with the service account email via the Sheets UI.
4. For client GCP resources, coordinate with the client to grant the service account email appropriate read roles in their GCP project.
5. Download a JSON key for the service account and place it at the repo root as `service_account.json`.

---

## 6. Authentication

This application uses **single-account authentication** — there is no user database. Credentials and JWT-related settings are configured through environment variables in **`backend/.env`** (see [Section 4.2](#42-backend-env-file)). JWT tokens are issued on login and stored as secure cookies in production.

- No database setup is required.
- To change credentials, update the relevant keys in `backend/.env` and restart the stack.
- `JWT_COOKIE_SECURE` must be `true` in production (HTTPS only).

---

## 7. Quick Reference: Common Commands

| Action | Command |
|---|---|
| Start dev stack | `docker compose -f docker-compose.dev.yml up --build` |
| Stop dev stack | `docker compose -f docker-compose.dev.yml down` |
| Clean rebuild (dev) | `docker compose -f docker-compose.dev.yml down -v && docker compose -f docker-compose.dev.yml up --build` |
| Start production | `docker compose -f docker-compose.prod.yml up -d --build` |
| Stop all containers | `docker stop $(docker ps -q)` |
| Reload nginx (prod) | `docker exec strata_nginx nginx -s reload` |
| Renew TLS cert | `sudo certbot renew` then reload nginx |

---

> 📩 **To obtain values for the repo root `.env`, `backend/.env`, `service_account.json`, or other production credentials, contact an existing project member before beginning deployment.**