# BlueKyteAI Project - Backend

This repository contains the backend code for the BlueKyteAI project.

## Prerequisites

Make sure you have the following prerequisites installed on your system:

- Python 3.10.12
- [pip](https://www.postgresql.org/download/linux/ubuntu/) (package installer for Python)
- [PostgreSQL](https://www.postgresql.org/download/linux/ubuntu/) (version 10 or higher)

## Getting Started

Follow these steps to set up and run the backend:

### 1. Create a Virtual Environment

```bash
sudo apt install python3.10-venv
python3 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure PostgreSQL
Install PostgreSQL on your machine.

Create a PostgreSQL user and database.

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

Update DATABASES relevant USER and PASSWORD for default and test in backend/task_manager/settings.py

### 4. Apply Migrations
```bash
python manage.py migrate
```

### 5. Create a Superuser
```bash
python manage.py createsuperuser
```
Follow the prompts to create a superuser account.

### 6. Run the Development Server
```bash
python manage.py runserver
```
The backend server will start at http://127.0.0.1:8000/.

### 7. Run the Tests
```bash
python manage.py test
```
This will create a test database, run tests which are in tests.py, give a status, and destroy the test database. The status should be OK.

### 8. Admin Interface
Open your web browser and go to http://127.0.0.1:8000/admin/
Log in using the superuser credentials created in the previous step. The Django admin interface allows you to manage and manipulate your application's data. You can add, edit, and delete records in your models, among other administrative tasks.