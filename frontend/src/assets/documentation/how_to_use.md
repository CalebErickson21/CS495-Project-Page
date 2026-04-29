# How to Use Each Completed Feature

---

## 1. Authentication System

### Feature
User login and session management.

### How to Use
- Navigate to the login page
- Enter the configured username and password
- Upon successful login, the dashboard loads automatically

### Result
- A session cookie is created and stored in the browser
- All protected API routes (e.g., `/api/dashboard`) become accessible

### System Link
- Frontend → sends credentials
- Backend (`/api/auth/login`) → validates using environment variables
- Session persists via cookies

---

## 2. Dashboard Data Loading

### Feature
Dynamic loading of dashboard data from backend services.

### How to Use
- After login, the dashboard automatically fetches data
- Click **Refresh** to manually reload data

### Result
- Data is retrieved from `/api/dashboard`
- UI updates all charts and KPIs

### System Link
- Frontend → `fetchDashboard()`
- Backend → `build_dashboard_payload()`
- Data source → Google Sheets or Excel

---

## 3. Overview Tab (Executive Scoreboard)

### Feature
High-level operational summary of all projects.

### How to Use
- Click the **Overview** tab (default view)
- Review KPI cards and project progress chart

### Result
- Displays:
  - Cash vs target
  - Projects off-track
  - Operational health
- Project progress visualization across:
  - Deadlines
  - Financing
  - Phases

### System Link
- Uses `figures.project_progress` from backend
- Derived from consolidated project dataset

---

## 4. Lag Measures Tab

### Feature
Tracks historical performance outcomes.

### How to Use
- Navigate to **Lag Measures** tab

### Result
- Displays:
  - Cash floor performance
  - Revenue forecast (150-day)
  - Portfolio profit estimates
- Charts update based on backend data

### System Link
- Uses:
  - `cash_floor`
  - `revenue_forecast`
  - `portfolio_profit`
- Built from financial and project completion data

---

## 5. Lead Measures Tab

### Feature
Tracks predictive performance indicators.

### How to Use
- Navigate to **Lead Measures** tab

### Result
- Displays:
  - Deal scores
  - Capital draw velocity
  - Production delays

### System Link
- Uses:
  - `deal_scores`
  - `draw_velocity`
  - `production_velocity`
- Helps predict future operational outcomes

---

## 6. Sticky Cash Bar

### Feature
Persistent financial indicator across all tabs.

### How to Use
- Always visible at the top of the screen

### Result
- Displays:
  - Current cash balance
  - Difference from $100K target
  - Status color:
    - Green (safe)
    - Yellow (warning)
    - Red (critical)

### System Link
- Uses `kpis.lag.cash_balance`
- Updates whenever dashboard data refreshes

---

## 7. Ask AI (LLM Assistant)

### Feature
Built-in AI chat for asking questions about the live dashboard data.

### How to Use
- Click **Ask AI** in the top-right of the dashboard
- Type a question such as:
  - "What's my current cash position?"
  - "Which projects are most profitable?"
  - "Any deals below the 80-point hard deck?"
  - "How much revenue is confirmed in the next 150 days?"
- Press **Send** or hit **Enter**

### Result
- Opens a side chat panel inside the dashboard
- Returns a plain-language answer based on the current portfolio data
- Uses the same dashboard metrics shown in:
  - Overview
  - Lag Measures
  - Lead Measures

### System Link
- Frontend -> `Ask AI` button opens the chat panel in `frontend/src/App.tsx`
- Frontend -> sends message history to `POST /api/chat`
- Backend -> validates the logged-in user and applies a rate limit of 5 requests per minute
- Backend -> rebuilds the current dashboard payload and passes it into `chat_service.py`
- LLM layer -> sends grounded dashboard data to Claude using the `ANTHROPIC_API_KEY`

### Requirements
- User must be logged in
- Backend server must be running
- `ANTHROPIC_API_KEY` must be configured in `backend/.env`

---

## 8. External Resources Integration

### Google Sheets
- Primary data source for dashboard metrics
- Backend uses API to fetch worksheet data

### Excel (Fallback)
- Local file-based data source
- Used when configured instead of Sheets

### How They Are Used
- Data is loaded via backend services:
  - `sheets_service.py`
  - `excel_service.py`
- Processed into a unified format
- Returned to frontend as `DashboardPayload`

---

## 9. Feature Relationships (System Flow)

1. User logs in → session created  
2. Frontend requests dashboard data  
3. Backend aggregates data from:
   - Google Sheets
   - Excel (optional)
4. Backend builds structured payload  
5. Frontend renders:
   - Overview (summary)
   - Lag (historical)
   - Lead (predictive)

---

## Notes

- All features depend on successful backend data retrieval
- If data does not appear:
  - Ensure backend server is running
  - Verify Google Sheets configuration
