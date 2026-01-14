# Security Improvements Summary

This document outlines all the high-priority security fixes implemented in the comunidad-uis backend.

## 1. Environment Variable Configuration ✅

### Changes Made:
- Added `python-decouple` for environment variable management
- Created `.gitignore` to exclude sensitive files
- Moved all sensitive configuration to environment variables:
  - `SECRET_KEY`
  - Database credentials (`DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`)
  - `DEBUG` flag
  - `ALLOWED_HOSTS`
  - `CORS_ALLOWED_ORIGINS`

### Files Modified:
- `config/settings.py` - Now uses `config()` from decouple
- `.gitignore` - Added to exclude `.env` files
- `requirements.txt` - Added `python-decouple==3.8`

### Next Steps:
- Create a `.env` file from `.env.example` with your actual credentials
- Never commit `.env` files to version control

## 2. Password Hashing ✅

### Changes Made:
- Updated `User` model to use Django's password hashing (`make_password`, `check_password`)
- Increased password field length from 100 to 128 characters (for hashed passwords)
- Added `set_password()` and `check_password()` methods to User model
- Updated `UserSerializer` to hash passwords on create/update
- Passwords are now write-only in the serializer (never returned in API responses)

### Files Modified:
- `core/models.py` - Added password hashing methods
- `core/serializer.py` - Updated UserSerializer to handle password hashing

### Migration Required:
```bash
python manage.py makemigrations
python manage.py migrate
```

**Important:** Existing users will need to reset their passwords as they are now stored as hashes.

## 3. JWT Authentication ✅

### Changes Made:
- Added `djangorestframework-simplejwt` for JWT token authentication
- Created custom authentication backend (`CustomJWTAuthentication`) for custom User model
- Created authentication endpoints:
  - `POST /api/auth/register/` - User registration
  - `POST /api/auth/login/` - User login
  - `POST /api/auth/token/refresh/` - Token refresh
- Configured JWT settings with secure defaults:
  - Access token lifetime: 1 hour
  - Refresh token lifetime: 7 days
  - Token rotation enabled

### Files Created:
- `core/auth_backend.py` - Custom JWT authentication
- `core/auth_views.py` - Authentication endpoints

### Files Modified:
- `config/settings.py` - Added JWT configuration
- `core/urls.py` - Added authentication routes
- `requirements.txt` - Added `djangorestframework-simplejwt==5.3.1`

## 4. CORS Security ✅

### Changes Made:
- Replaced `CORS_ALLOW_ALL_ORIGINS = True` with specific allowed origins
- Configured CORS to use environment variables
- Set `CORS_ALLOW_CREDENTIALS = True` for proper cookie handling
- Limited allowed methods and headers

### Files Modified:
- `config/settings.py` - Secure CORS configuration

### Configuration:
Set `CORS_ALLOWED_ORIGINS` in your `.env` file:
```env
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
```

## 5. Permission System ✅

### Changes Made:
- Fixed `IsCreatorOrReadOnly` permission to use authenticated user instead of query parameters
- Removed debug print statements
- Created `IsGroupMemberOrReadOnly` permission for announcements
- All views now require authentication by default
- Registration endpoint allows anonymous access

### Files Modified:
- `core/permissions.py` - Fixed permission logic
- `core/views.py` - Applied permissions to all viewsets

### Permission Classes:
- `IsAuthenticated` - Default for all endpoints
- `IsCreatorOrReadOnly` - For Group and Announcement editing
- `IsGroupMemberOrReadOnly` - For Announcement creation
- `AllowAny` - Only for registration endpoint

## 6. API Security Enhancements ✅

### Changes Made:
- All endpoints (except registration) now require authentication
- Updated views to use authenticated user instead of query parameters
- Fixed `subscribed` and `member_announcements` endpoints to use current user
- Added proper error handling and validation
- Added pagination (20 items per page)

### Files Modified:
- `core/views.py` - Updated all viewsets with proper authentication
- `config/settings.py` - Added pagination configuration

## 7. User Model Improvements ✅

### Changes Made:
- Added `unique=True` constraint to email field
- Added `is_active` field for user status management
- Added `created_at` and `updated_at` timestamps
- Added `Meta.ordering` for consistent query results

### Files Modified:
- `core/models.py` - Enhanced User model

### Migration Required:
```bash
python manage.py makemigrations
python manage.py migrate
```

## Testing the Changes

### 1. Register a new user:
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "securepassword123",
    "school": 1
  }'
```

### 2. Login:
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "securepassword123"
  }'
```

### 3. Use the access token:
```bash
curl -X GET http://localhost:8000/api/groups/ \
  -H "Authorization: Bearer <your-access-token>"
```

## Breaking Changes

⚠️ **Important:** These changes introduce breaking changes:

1. **All endpoints now require authentication** (except registration)
2. **Passwords must be reset** for existing users
3. **User ID in URLs removed** - endpoints now use authenticated user
4. **Email must be unique** - existing duplicate emails will cause migration issues

## Next Steps (Medium Priority)

1. Add email validation
2. Implement password reset functionality
3. Add rate limiting
4. Add comprehensive test coverage
5. Fix date fields in Announcement model (currently CharField)
6. Add database indexes for performance
7. Implement soft delete for data preservation

## Security Checklist

- [x] Environment variables for sensitive data
- [x] Password hashing
- [x] JWT authentication
- [x] Secure CORS configuration
- [x] Permission system
- [x] Protected API endpoints
- [x] Password exclusion from responses
- [ ] Rate limiting (TODO)
- [ ] Input validation (TODO)
- [ ] SQL injection protection (Django ORM handles this)
- [ ] XSS protection (API only, no templates)
- [ ] CSRF protection (handled by Django)
