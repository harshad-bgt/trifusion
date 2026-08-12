# Trifusion Technology Platform

This repository contains the source code for the Trifusion Technology LLP official website and platform.
The architecture has been intentionally designed for small-scale efficiency while retaining the ability to scale to a relational database in the future.

## Architecture

- **Frontend:** Next.js (React), unchanged from its original design, hosted on Vercel.
- **Backend:** FastAPI (Python), serving robust API endpoints for the frontend.
- **Persistence Layer:** Google Sheets via the official API for simple, accessible dataset management.

## Setup Instructions

### 1. Frontend Setup (Next.js)

The frontend is located in the `web/` directory.

```bash
cd web
npm install
# Create a .env.local file with: NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```
The frontend will start on `http://localhost:3000`.

### 2. Backend Setup (FastAPI)

The backend is located in the `backend/` directory. Requires Python 3.9+.

```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
```

#### Environment Variables
Create a `.env` file in `backend/` based on `.env.example`:
- `FRONTEND_URL=http://localhost:3000` (Configure this for production CORS)
- `JWT_SECRET=your_jwt_secret`
- `ADMIN_BOOTSTRAP_EMAIL` & `ADMIN_BOOTSTRAP_PASSWORD` (Used to create the initial admin user)
- `GOOGLE_PROJECT_ID`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SPREADSHEET_ID`

#### Google Sheets Setup
1. Create a Google Cloud project and enable the Google Sheets API.
2. Create a Service Account and download the JSON credentials. Use these in your `.env`.
3. Create a Google Sheet and share it with the service account email.
4. Create the following required worksheets:
   - `Leads` (Columns: id, leadRef, name, email, phone, message, status, createdAt)
   - `Services` (Columns: id, slug, title, shortDesc, description, status, published)
   - `AdminUsers` (Columns: id, email, password_hash, role)
   - *Add other worksheets (Industries, CaseStudies, Products, etc.) as needed by the frontend.*

#### Start Backend
```bash
python -m uvicorn app.main:app --reload --port 8000
```
API Documentation will be available at `http://localhost:8000/docs`.

### 3. Running Tests
```bash
cd backend
pytest tests/
```

## Admin Bootstrap
To initialize the admin account:
1. Set `ADMIN_BOOTSTRAP_EMAIL` and `ADMIN_BOOTSTRAP_PASSWORD` in `.env`.
2. Send a POST request to `/api/auth/bootstrap`.
3. The password will be hashed and stored in Google Sheets. You may then remove the bootstrap variables from `.env`.

## Future Database Migration
The backend utilizes the Repository pattern (`app/repositories/base.py`). To migrate from Google Sheets to PostgreSQL, implement a `PostgreSQLRepository` that fulfills the base repository interface. No frontend changes will be required.
