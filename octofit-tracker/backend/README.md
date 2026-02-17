OctoFit Tracker — Backend

This folder contains the Django backend for the OctoFit Tracker app.

Setup

1. Create a Python virtual environment in the backend folder:

   ```bash
   python3 -m venv octofit-tracker/backend/venv
   ```

2. Activate the virtual environment and install requirements:

   ```bash
   source octofit-tracker/backend/venv/bin/activate
   pip install -r octofit-tracker/backend/requirements.txt
   ```

Quick start (Linux)

```bash
# Activate the backend venv
source octofit-tracker/backend/venv/bin/activate

# Install requirements (if not already installed)
pip install -r octofit-tracker/backend/requirements.txt

# Verify Django is available
python -m django --version

# Example: run migrations and start the dev server
# python manage.py migrate
# python manage.py runserver 8000
```

3. Use Django's management commands to create the project and apps and run migrations.

Notes
- Use Django ORM for models and data migration (do not write direct MongoDB scripts).
- See the repository's root README for project goals and next steps.
