import os
import secrets
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow

secret_key = secrets.token_hex(64) # Generate a secret key for JWT
db = SQLAlchemy()
migrate = Migrate()  # Initialize Flask-Migrate for database migrations
ma = Marshmallow()

class Config:
    SECRET_KEY = secret_key
