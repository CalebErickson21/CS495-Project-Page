## Back End
### Company Data & Data Retrieval
- All company data is still stored in Google Sheets, as requested by sponsor. All records managed by the program will be stored in a sheet titled "Consolidated Dashboard".
	- Currently, record entries must be added to the Sheet itself; an interface for record entry to ensure consistent formatting still needs to be developed.
	- To add new record fields, they must be added to the Consolidated Dashboard sheet, as well as `core_columns` and `column_order` in the `consolidate_dashboard()` function of [excel_service.py](backend/app/services/excel_service.py)
	
- Data retrieval from the Consolidated Dashboard is handled using [gspread](https://docs.gspread.org/en/latest/) in tandem with [pandas](https://pandas.pydata.org/docs/), and the methods used can be found in [sheets_service.py](backend/app/services/sheets_service.py) as an example.
	- [excel_service.py](backend/app/services/excel_service.py) contains the methods used to generate the consolidated dashboard from the original given Sheets; it uses the [Excel integration](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.ExcelFile.html#pandas.ExcelFile) built into *pandas* instead of *gspread* because the team received copies of the Sheets in Excel format.
	- Key performance indicators (KPIs) and Lead/Lag measures are computed in [dashboard_service.py](backend/app/services/dashboard_service.py).
- All data displayed on the dashboard is sent to the front end by the `build_dashboard_payload()` function of [dashboard_service.py](backend/app/services/dashboard_service.py).
### Authentication
- Login sessions use JSON Web Tokens stored in small HTTP-only authentication cookies. 
	- Basic settings such as idle timeout and maximum session length are determined by environment variables set by the user hosting the website in [./backend/.env](backend/.env) during [setup](README.md).
- Currently, the username and password entered at login is directly compared against the environment variables in [./backend/.env](backend/.env) and thus only supports one account. 
	- The sponsor requested a three-tiered system:
		- View-Only
		- Admin
			- Can add/edit records in any field
			- Can create/approve View-Only accounts
		- Super Admin
			- Can promote/demote an account to/from Admin
	- Since there is currently no interface for record entry, all accounts are view-only, and this hierarchy must instead be maintained through [Google Drive file access rules](https://support.google.com/a/users/answer/12380484?hl=en) on the Consolidated Dashboard.

---
## Front End
#### Web Components
- **Framework & Routing**
	[React 18 with TypeScript](https://react.dev/learn/typescript)
- **Build Tool**
	[Vite](https://vite.dev/guide/)
- **Styling**
	[Tailwind CSS](https://tailwindcss.com/docs/)
### Figure Generation
- The majority of figures are created using [Plotly](https://docs.plotly.com/), though the KPI cards use Tailwind CSS-styled HTML elements. Figure data is received from the backend as `.json` and cast to a `DashboardPayload` class in the `fetchDashboard()` function of [App.tsx](frontend/src/App.tx). This payload is then used by [react-plotly.js](https://plotly.com/javascript/react/) to generate the figures.
	- In order for a new figure to be added, its data fields must be added to the properties of the `DashboardPayload` class to be received by the front end. 
	- Figures are memoized, and should be added to the `App()` function via `useMemo()` as written in [App.tsx](frontend/src/App.tx).
