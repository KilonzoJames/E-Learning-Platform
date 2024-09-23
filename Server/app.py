#!/usr/bin/env python3
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from .Models import db, migrate, ma, Config
import os

# Register the blueprints for different routes in your app
from .Routes.user_route import user_blue
from .Routes.profile_route import profile_blue
from .Routes.post_route import post_blue
from .Routes.comment_route import comment_blue
from .Routes.auth import auth
from .Routes.upload import upload

# Initialize the Flask app
app = Flask(__name__)

# Configure SQLALCHEMY application settings
app.config["SQLALCHEMY_DATABASE_URI"] = os.getenv('DATABASE_URI')
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = True

# Initialize the SQLAlchemy database
db.init_app(app)
# Initialize Flask-Migrate with the app and db
migrate.init_app(app, db)

# Initialize Marshmallow with the Flask app
ma.init_app(app)

# Enable Cross-Origin Resource Sharing (CORS)
CORS(
    app,
    resources={
        r"/*": {
            "origins": "https://e-learning-platform-1-git-deploy-kilonzojames-projects.vercel.app",
            "methods": ["GET", "POST", "DELETE", "PUT"],
            "allow_headers": "Content-Type",
        }
    },
    supports_credentials=True,
)

# Initialize Flask-RESTful API
api = Api(app)

# Initialize JWT with the Flask app
app.config.from_object(Config)
jwt = JWTManager(app)

# Register the blueprints for different routes in the app
blueprints = [user_blue, profile_blue, post_blue, comment_blue, auth, upload]

for blueprint in blueprints:
    app.register_blueprint(blueprint)

# Run the application on port 5555 in debug mode
if __name__ == "__main__":
    app.run(port=5555, debug=True)
