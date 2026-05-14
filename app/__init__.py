from flask import Flask
from flask_migrate import Migrate 
from flask_sqlalchemy import SQLAlchemy
from config import Config 
from flask_login import LoginManager

db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
login.login_view = "main.login"

def create_app(config_class=Config):

    app = Flask(__name__)
    app.config.from_object(config_class)

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)

    from app.blueprint import main
    app.register_blueprint(main)

    from app import models

    return app

app = create_app()
