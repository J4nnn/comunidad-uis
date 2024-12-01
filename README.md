# PROJECT TITLE: ComunidadUIS
## PURPOSE OF PROJECT
"ComunidadUIS" is a platform designed to centralize and facilitate access to recreational groups at the Industrial University of Santander. Its purpose is to provide a space where members of the UIS community can discover groups aligned with their interests, join them, participate in their scheduled activities, and connect with people who share their interests. Additionally, it seeks to promote well-being and balance between academic life and personal enjoyment, contributing to a more enriching and manageable university experience.

## VERSION: 1.0
## HOW TO START THIS PROJECT:
All of this technologies were used in the development of the project and are needed to start it.

- Technologies used in the development of the project:
	- React
	- Django
	- Django Rest Framework
	- PostgreSQL
	- Git
- Technologies needed to start the project:
	- Node.js
	- NPM
	- Python
	- Pip
	- PostgreSQL

## AUTHORS:
- Fabiana Acuña López
- Janer Alberto Vega Jacome

## USER INSTRUCTIONS: 
### Instrucciones para hacer funcionar el proyecto (traducir)
1. Clone the repository: `git clone https://github.com/J4nnn/comunidad-uis.git`
2. Install Backend dependencies: `cd backend && pip install -r requirements.txt`
3. Install Frontend dependencies: `cd frontend-comunidaduis && npm install`
4. Set up the database:
    1. Configure the database connection in `backend/settings.py`
        - Open your `settings.py` file and find the `DATABASES` and modify the default configuration to look like this:
        `DATABASES = {
	    	'default': {
        		'ENGINE': 'django.db.backends.postgresql_psycopg2',
        		'NAME': 'your_database_name',
        		'USER': 'your_database_user',
        		'PASSWORD': 'your_database_password',
        		'HOST': 'localhost',
        		'PORT': '5432', # Default PostgreSQL start
		    }
		}`

5. Migrate Django models: `python manage.py makemigrations && python manage.py migrate`


# Guia para despliegue (local)

1. Backend

- python manage.py runserver
- http://127.0.0.1:8000/api/schema/swagger-ui/

2. Frontend

- npm start
- http://localhost:3000