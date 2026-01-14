# ComunidadUIS
Platform for discovering, creating, and joining recreational groups at Universidad Industrial de Santander (UIS).

## Repository layout
- `backend/` – Django + DRF backend  
  - `manage.py`, `requirements.txt`
  - `config/` – Django project config (`settings.py`, `urls.py`, `wsgi.py`, `asgi.py`)
  - `core/` – app with models (`Faculty`, `School`, `User`, `Group`, `UserGroup`, `Announcement`), serializers, viewsets, permissions
  - `data/` – sample fixtures (`db.json`, `db1.json`)
  - `docs/` – API schema (`schema.yaml`)
- `frontend/` – React app (CRA + react-router)
- `docs/` – auxiliary materials (diagrams, BlueJ implementation)

## Getting started
### Backend
1) `cd backend`  
2) Create/activate your virtualenv.  
3) `pip install -r requirements.txt`  
4) Update database credentials in `config/settings.py` (section `DATABASES`, PostgreSQL by default).  
5) Create the database in PostgreSQL.  
6) `python manage.py makemigrations && python manage.py migrate`  
7) (Optional) Load sample data: `python manage.py loaddata data/db.json`  
8) Run: `python manage.py runserver` → http://127.0.0.1:8000/ (Swagger: http://127.0.0.1:8000/api/schema/swagger-ui/)

### Frontend
1) `cd frontend`  
2) `npm install`  
3) `npm start` → http://localhost:3000

## Tech stack
- Frontend: React, react-router-dom, Create React App
- Backend: Django, Django REST Framework, drf-spectacular, PostgreSQL

## Authors
- Fabiana Acuña López
- Janer Alberto Vega Jacome
