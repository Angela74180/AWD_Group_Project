from flask import Flask
from flask_migrate import Migrate 
from flask_sqlalchemy import SQLAlchemy
from config import Config 
from flask_login import LoginManager

import os
from dotenv import load_dotenv, set_key
from flask_wtf.csrf import generate_csrf
from flask_wtf import CSRFProtect
from secrets import token_hex

db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
login.login_view = "main.login"

csrf = CSRFProtect()

def create_app(config_class=Config):

    app = Flask(__name__)
    app.config.from_object(config_class)

    env_path = ".env"
    load_dotenv(env_path)
    secret_key = os.environ.get("SECRET_KEY")

    if not secret_key:
        secret_key = token_hex(32)
        set_key(env_path, "SECRET_KEY", secret_key)


    app.config["SECRET_KEY"] = secret_key

    csrf.init_app(app)

    app.jinja_env.globals['csrf_token'] = generate_csrf

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)

    from app.blueprint import main
    app.register_blueprint(main)

    from app import models

    return app

app = create_app()


##################################################################
# import os
# from dotenv import load_dotenv, set_key
# from flask_wtf.csrf import generate_csrf
# from flask_wtf import CSRFProtect
# from secrets import token_hex

# env_path = ".env"
# load_dotenv(env_path)
# secret_key = os.environ.get("SECRET_KEY")

# if not secret_key:
#     secret_key = token_hex(32)
#     set_key(env_path, "SECRET_KEY", secret_key)


# app.config["SECRET_KEY"] = secret_key
# csrf = CSRFProtect(app)
# app.jinja_env.globals['csrf_token'] = generate_csrf
##################################################################