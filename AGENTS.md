# Repository Guidelines

## Project Structure & Module Organization
- `backend/` — Django + DRF API  
  - `config/` project settings and URLs  
  - `core/` app (models, serializers, viewsets, permissions)  
  - `data/` fixtures (`db.json`, `db1.json`)  
  - `docs/` OpenAPI schema (`schema.yaml`)
- `frontend/` — React (CRA + react-router) with pages/components under `src/`.
- `docs/` — auxiliary materials (diagrams, BlueJ implementation).

## Build, Test, and Development Commands
- Backend env setup: `cd backend && pip install -r requirements.txt`
- Backend migrations: `python manage.py makemigrations && python manage.py migrate`
- Backend run: `python manage.py runserver` (Swagger at `/api/schema/swagger-ui/`)
- Backend tests: `python manage.py test`
- Frontend install: `cd frontend && npm install`
- Frontend run dev server: `npm start`
- Frontend tests: `npm test`

## Coding Style & Naming Conventions
- Python: follow PEP 8; use 4-space indentation. Django app modules under `core/`; keep serializers in `serializer.py`, viewsets in `views.py`, routes in `urls.py`.
- JavaScript/JSX: prefer functional components with hooks; 2-space indentation (CRA default). Use PascalCase for components (`Navbar.js`), camelCase for functions/vars.
- Filenames: keep React assets/styles in `src/assets/`; pages under `src/pages/`.

## Testing Guidelines
- Backend: write `TestCase` classes in `backend/core/tests.py` or adjacent `tests/` modules; name tests with `test_*` methods.
- Frontend: use React Testing Library defaults via `npm test`; colocate component tests as `ComponentName.test.js`.
- Add tests for new endpoints, serializers, and any complex component logic.

## Commit & Pull Request Guidelines
- Commits: concise, imperative subject lines (e.g., `Add group subscription endpoint`, `Refactor navbar links`). Group related changes.
- Pull requests: include summary of changes, testing performed (`python manage.py test`, `npm test`), affected routes/components, and screenshots for UI changes when practical. Link issues/tasks if applicable.
