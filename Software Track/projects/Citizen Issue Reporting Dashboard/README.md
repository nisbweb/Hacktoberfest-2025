# 🏛 Citizen Issue Reporting Dashboard

A civic-tech portal where citizens can report local issues (e.g., potholes, streetlights not working), and officials can view, filter, and update their status through an **admin dashboard**. It’s simple at the core but designed for layered, complex contributions.

---

## 🚀 Tech Stack
- **Frontend**: React
- **Backend**: FastAPI (Python)
- **Database**: In-memory (can be replaced with SQLite/PostgreSQL)

---

## 🧱 MVP Features
- Citizens can submit new reports with title, category, and description
- Dashboard lists all reports
- Filter by category or status
- Officials can update status via PUT

---

## 🧪 Getting Started

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 📌 API Endpoints

| Method | Endpoint        | Description                    |
|--------|-----------------|---------------------------------|
| GET    | `/reports`      | List all reports              |
| POST   | `/reports`      | Submit a new report           |
| PUT    | `/reports/:id`  | Update report status          |

---

## 🛠 Future Enhancements
- Admin portal for managing reports
- Location-based filtering and dashboards
- Media upload (images, videos)
- Authentication & role-based access
- Data analytics for city management

---

## 🤝 Contribution Guidelines

This project is designed to **grow in complexity through structured contributions**. Each participant should aim to implement **well-scoped, modular, real-world features**.

### 🧭 Core Contribution Areas

#### 🖥 Frontend (React)
- Build **Admin Dashboard**:
  - Separate admin login page (role: “official”)
  - Display reports with category, location, and status filters
  - Implement “Accept”, “Mark as Processing”, “Mark as Done” actions
- Add **Location-Based Dashboard View**:
  - Group reports by city/ward/area
  - Filter or visualize them on a **map (Leaflet / OpenStreetMap)**  
- Add **Media Upload UI** for citizens to attach images/videos to reports
- Build a **Statistics Panel** with charts (Recharts/Chart.js) for issue trends.

#### ⚙️ Backend (FastAPI)
- Replace in-memory storage with **SQLAlchemy + SQLite/Postgres**.
- Implement **User Authentication** (FastAPI JWT / OAuth2):
  - Citizen: Can report issues
  - Admin: Can manage reports & update statuses
- Create **Report Model**:
  - Fields: id, title, category, description, location, status, attachments, created_at
- Implement **Location Clustering**:
  - Auto-group reports based on location (e.g., ward, area)
  - Optional: integrate reverse geocoding APIs
- Build **Status Workflow**:
  - New → Accepted → In Progress → Done
  - Admin can move reports between statuses

#### 🌍 Advanced Contributions
- **Analytics Endpoints**: Generate charts like “Issues per category”, “Open issues per area”.
- **ML/NLP Integration**:
  - Auto-classify reports into categories based on description text
  - Flag duplicate or spam reports
- **Push Notifications / Emails**:
  - Notify citizens when status of their report changes.

---

### 📝 Contribution Workflow
1. Fork the repo  
2. Create a feature branch  
3. Implement the feature with:
   - Proper folder structure  
   - Comments explaining logic  
   - API docs or UI screenshots  
4. Run local tests (backend + frontend)  
5. Commit clearly & open a PR with:
   - Feature description
   - Testing instructions
   - Any dependencies

---

### 🌱 Suggested Advanced Tasks
- [ ] Implement geofencing & map-based dashboards  
- [ ] Add AI-based auto categorization of issues  
- [ ] Build admin role management with multiple user levels  
- [ ] Integrate with external civic APIs or SMS services  
- [ ] Create a full analytics dashboard with charts and filters

---

This project mirrors **real municipal reporting systems**. Contributions should be clean, modular, and production-like — the more real, the better 🏗️
