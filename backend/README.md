# Comunidad UIS Backend

Django REST Framework backend for the UIS community platform.

## Features

- User authentication with JWT tokens
- Faculty and School management
- Group management with quotas
- Announcements system
- User-Group memberships

## Security Improvements

This project has been updated with the following security enhancements:

- ✅ JWT-based authentication
- ✅ Password hashing (bcrypt)
- ✅ Environment variable configuration
- ✅ Secure CORS configuration
- ✅ Proper permission system
- ✅ Protected API endpoints

## Setup

### Prerequisites

- Python 3.8+
- PostgreSQL
- pip

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the project root:
```bash
cp .env.example .env
```

5. Edit `.env` with your configuration:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DB_NAME=comunidad_uis
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
```

6. Create the database:
```bash
createdb comunidad_uis
```

7. Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

8. Create a superuser (optional):
```bash
python manage.py createsuperuser
```

9. Run the development server:
```bash
python manage.py runserver
```

## API Endpoints

### Authentication

- `POST /api/auth/register/` - Register a new user
- `POST /api/auth/login/` - Login and get JWT tokens
- `POST /api/auth/token/refresh/` - Refresh access token

### API Documentation

- Swagger UI: `http://localhost:8000/api/schema/swagger-ui/`
- ReDoc: `http://localhost:8000/api/schema/redoc/`
- OpenAPI Schema: `http://localhost:8000/api/schema/`

### Protected Endpoints

All endpoints except registration require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-access-token>
```

## Database Migrations

After the security updates, you need to create and run migrations for the User model changes:

```bash
python manage.py makemigrations
python manage.py migrate
```

**Note:** Existing users will need to reset their passwords as passwords are now hashed.

## Testing

Run tests with:
```bash
python manage.py test
```

## Production Deployment

Before deploying to production:

1. Set `DEBUG=False` in `.env`
2. Generate a new `SECRET_KEY`
3. Configure proper `ALLOWED_HOSTS`
4. Set up proper CORS origins
5. Use environment variables for all sensitive data
6. Set up proper database credentials
7. Configure static files serving
8. Set up SSL/HTTPS

## License

[Your License Here]
