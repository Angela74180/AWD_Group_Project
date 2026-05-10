import os

basedir = os.path.abspath(os.path.dirname(__file__))
default_database_location = 'sqlite:///' + os.path.join(basedir, 'app.db')

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or default_database_location
    # Added the os.environ.get('SECRET_KEY') based on Flask Mega Tutorial
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret999'