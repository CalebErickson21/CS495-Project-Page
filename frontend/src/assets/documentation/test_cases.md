# Test Cases for Strata OS

This document defines what to test, why each case matters, and scripts to execute tests consistently.

## 1. Components/Services to Test

| Area | Component/Service | Files | Why It Matters |
|---|---|---|---|
| Authentication | Login/session/logout API | backend/app/main.py, backend/app/auth.py, frontend/src/auth.ts, frontend/src/AppRoutes.tsx | Every protected feature depends on valid session cookies. |
| Dashboard API | Dashboard and refresh endpoints | backend/app/main.py | Main data contract used by frontend visualizations. |
| Google Sheets ingestion | Sheets loading service | backend/app/services/sheets_service.py | Primary data source for production-style workflows. |
| Excel ingestion | Excel loading and consolidation | backend/app/services/excel_service.py | Fallback path and local/offline diagnostics. |
| KPI aggregation | Dashboard payload builder | backend/app/services/dashboard_service.py | Business logic for KPI and chart values. |
| Chat assistant | Chat endpoint and rate limiting | backend/app/main.py, backend/app/services/chat_service.py | User-facing AI workflow and abuse protection. |
| Frontend rendering | Dashboard page and route guards | frontend/src/App.tsx, frontend/src/AppRoutes.tsx | Confirms payload renders correctly and auth redirects work. |
| Reverse proxy | nginx API forwarding | nginx/nginx.dev.conf | Ensures /api requests are routed to backend correctly. |

## 2. Significant Test Case Descriptions

| ID | Test Case | Preconditions | Expected Result |
|---|---|---|---|
| TC-AUTH-01 | Valid login creates session | Backend running, STRATA_USERNAME and STRATA_PASSWORD configured | POST /api/auth/login returns 200 and session cookie is set. |
| TC-AUTH-02 | Invalid login rejected | Backend running | POST /api/auth/login returns 401. |
| TC-AUTH-03 | Protected route blocked without cookie | No auth cookie | GET /api/dashboard returns 401. |
| TC-AUTH-04 | Logout clears session | Logged in | POST /api/auth/logout returns 200, later GET /api/auth/session returns 401. |
| TC-DASH-01 | Dashboard loads from Sheets (default) | CONSOLIDATE_GC_KEY valid, service account has access | GET /api/dashboard returns 200 with kpis and figures. |
| TC-DASH-02 | Dashboard loads from Excel | EXCEL_DASHBOARD_PATH set to valid workbook or default file exists | GET /api/dashboard?source=excel returns 200 with kpis and figures. |
| TC-DASH-03 | Refresh endpoint responds | Logged in | POST /api/dashboard/refresh returns 200 and payload schema is valid. |
| TC-DASH-04 | Sheets misconfiguration fails clearly | Invalid/missing Sheets key | GET /api/dashboard returns failure (current behavior may be 500). |
| TC-EXCEL-01 | Consolidation endpoint works | Valid Excel workbook available | POST /api/excel/consolidate returns records and weekly_summary. |
| TC-CHAT-01 | Chat returns response | ANTHROPIC_API_KEY configured and logged in | POST /api/chat returns 200 with reply text. |
| TC-CHAT-02 | Chat rate limit enforced | Send >5 requests/min for one user | 6th request returns 429 with Retry-After header. |
| TC-FE-01 | Login route guard | Browser starts unauthenticated | /dashboard redirects to /login. |
| TC-FE-02 | Dashboard renders cards/charts | Successful /api/dashboard response | UI shows KPI cards and charts without JS errors. |

## 3. Test Scripts

Run these from the repository root. Use localhost because nginx exposes port 80 in dev compose.

### 3.1 Setup variables

```bash
export BASE_URL="http://localhost"
export COOKIE_JAR="/tmp/strata_cookies.txt"

# Option A: load credentials from backend/.env (strips surrounding quotes)
USER_RAW="$(sed -n 's/^STRATA_USERNAME=//p' backend/.env | head -n1)"
PASS_RAW="$(sed -n 's/^STRATA_PASSWORD=//p' backend/.env | head -n1)"
export USERNAME="${USER_RAW%\"}"
export USERNAME="${USERNAME#\"}"
export PASSWORD="${PASS_RAW%\"}"
export PASSWORD="${PASSWORD#\"}"

# Option B: set credentials manually
# export USERNAME="<your-username>"
# export PASSWORD="<your-password>"

rm -f "$COOKIE_JAR"
```

### 3.2 Health check

```bash
curl -i "$BASE_URL/api/health"
```

### 3.3 Login success (TC-AUTH-01)

```bash
cat > /tmp/strata_login_payload.json <<EOF
{"username":"$USERNAME","password":"$PASSWORD"}
EOF

curl -i -c "$COOKIE_JAR" \
  -H "Content-Type: application/json" \
  --data-binary @/tmp/strata_login_payload.json \
  "$BASE_URL/api/auth/login"
```

### 3.4 Login failure (TC-AUTH-02)

```bash
curl -i \
  -H "Content-Type: application/json" \
  -d '{"username":"wrong","password":"wrong"}' \
  "$BASE_URL/api/auth/login"
```

### 3.5 Session check (logged in) (TC-AUTH-01)

```bash
curl -i -b "$COOKIE_JAR" "$BASE_URL/api/auth/session"
```

### 3.6 Protected route without cookie (TC-AUTH-03)

```bash
curl -i "$BASE_URL/api/dashboard"
```

### 3.7 Dashboard from Sheets (TC-DASH-01)

```bash
curl -i -b "$COOKIE_JAR" "$BASE_URL/api/dashboard"
```

### 3.8 Dashboard from Excel (TC-DASH-02)

```bash
curl -i -b "$COOKIE_JAR" "$BASE_URL/api/dashboard?source=excel"
```

### 3.9 Refresh endpoint (TC-DASH-03)

```bash
curl -i -X POST -b "$COOKIE_JAR" "$BASE_URL/api/dashboard/refresh"
```

### 3.10 Excel consolidate endpoint (TC-EXCEL-01)

```bash
curl -i -X POST -b "$COOKIE_JAR" "$BASE_URL/api/excel/consolidate"
```

### 3.11 Chat response (TC-CHAT-01)

```bash
curl -i -X POST -b "$COOKIE_JAR" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Summarize current portfolio risk"}]}' \
  "$BASE_URL/api/chat"
```

### 3.12 Chat rate-limit test (TC-CHAT-02)

```bash
for i in {1..6}; do
  echo "Request $i"
  curl -s -o /dev/null -w "status=%{http_code}\n" \
    -X POST -b "$COOKIE_JAR" \
    -H "Content-Type: application/json" \
    -d '{"messages":[{"role":"user","content":"Ping"}]}' \
    "$BASE_URL/api/chat"
done
```

### 3.13 Logout and verify session cleared (TC-AUTH-04)

```bash
curl -i -X POST -b "$COOKIE_JAR" -c "$COOKIE_JAR" "$BASE_URL/api/auth/logout"
curl -i -b "$COOKIE_JAR" "$BASE_URL/api/auth/session"
```

## 4. Notes for Test Execution

- Use docker-compose.dev.yml for local test runs.
- If curl returns exit code 3, the URL was malformed (most often BASE_URL was not set in the current shell).
- For Sheets-based tests, confirm CONSOLIDATE_GC_KEY points to a Google Sheet and that service account access is granted.
- For Excel-based tests, confirm EXCEL_DASHBOARD_PATH or the default workbook location exists and is readable.
- Current behavior for some backend source failures may return 500 until explicit error mapping is implemented.
- curl is appropriate for API smoke and regression checks; complement it with frontend E2E and backend unit tests for full coverage.
