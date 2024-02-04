# BlueKyteAI Project - Backend

This repository contains the backend code for the BlueKyteAI project.

## Prerequisites / Developed on this specs

- Python 3.10.12
- pip (package installer for Python)
- PostgreSQL (>=10)

## Getting Started

Follow these steps to set up and run the backend:

1. **Create a Virtual Environment:**
    ```bash
    sudo apt install python3.10-venv
    python3 -m venv venv
    source venv/bin/activate
    ```

2. **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3. **Configure PostgreSQL:**
    - Install PostgreSQL on your machine.
    - Create a PostgreSQL user and database.
        ```bash
        sudo -u postgres psql
        CREATE USER mypostgresuser WITH PASSWORD 'mypostgrespassword';
        CREATE DATABASE mydjangodb;
        GRANT ALL PRIVILEGES ON DATABASE mydjangodb TO mypostgresuser;
        ALTER ROLE mypostgresuser WITH SUPERUSER;
        ALTER ROLE mypostgresuser WITH CREATEDB;
        \q
        ```
        ```bash
        sudo -u postgres psql
        CREATE USER mytestpostgresuser WITH PASSWORD 'mytestpostgrespassword';
        CREATE DATABASE mydjangotestdb;
        GRANT ALL PRIVILEGES ON DATABASE mydjangotestdb TO mytestpostgresuser;
        ALTER ROLE mytestpostgresuser WITH SUPERUSER;
        ALTER ROLE mytestpostgresuser WITH CREATEDB;
        \q
        ```
    - Update Django settings in `backend/task_manager/settings.py`:
        ```python
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.postgresql',
                'NAME': 'mydjangodb',
                'USER': 'mypostgresuser',
                'PASSWORD': 'mypostgrespassword',
                'HOST': 'localhost',
                'PORT': '5432',
            }
        }
        ```

4. **Apply Migrations:**
    ```bash
    python backend/manage.py migrate
    ```

5. **Create a Superuser:**
    ```bash
    python backend/manage.py createsuperuser
    ```
    Follow the prompts to create a superuser account.

6. **Run the Development Server:**
    ```bash
    python backend/manage.py runserver
    ```
    The backend server will start at http://127.0.0.1:8000/.

7. **Admin Interface:**
    Open your web browser and go to http://127.0.0.1:8000/admin/
    Log in using the superuser credentials created in the previous step.
    The Django admin interface allows you to manage and manipulate your application's data. 
    You can add, edit, and delete records in your models, among other administrative tasks.

