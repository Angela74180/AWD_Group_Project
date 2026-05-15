# Creates the main application blueprint and imports the application's routes and database models

from flask import Blueprint

main = Blueprint('main', __name__)

from app import models, routes