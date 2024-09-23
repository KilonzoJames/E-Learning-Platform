from flask import Blueprint, jsonify, request, Response, json
from flask_restful import Resource, Api
from marshmallow import ValidationError
from werkzeug.security import generate_password_hash
import uuid
from sqlalchemy.exc import IntegrityError

from .auth import token_required
from ..Models.user import User
from ..Models.profile import Profile
from ..Models.MarshmallowSchemas.user_schema import UserSchema
from ..Models.config import db

user_blue = Blueprint("user", __name__)
api = Api(user_blue)


class UserResource(Resource):
    @token_required
    def get(self, current_user):
        if not current_user.admin:
            return jsonify({"message": "Cannot perform that function!"})

        users = User.query.all()
        user_schema = UserSchema(many=True)
        json_string = user_schema.dump(
            users
        )  # Serialize the user list to a JSON string

        # Return the JSON string directly
        return {"results": json_string}


class UserId(Resource):
    @token_required
    def get(self, current_user, public_id):
        if not current_user.admin:
            return jsonify({"message": "Cannot perform that function!"})

        user = User.query.filter_by(public_id=public_id).first()
        if not user:
            return jsonify({"message": "No user found!"})

        schema = UserSchema()
        return schema.dump(user)


class CreateUser(Resource):
    # @token_required
    def post(self):
        try:
            # Parse the incoming JSON data
            data = request.get_json()
            # Log the incoming data to see what the backend is receiving
            print("Incoming request data:", data)

            # Validate that both 'email' and 'password' are present
            if not data or "email" not in data or "password" not in data:
                return (
                    jsonify(
                        {"message": "Invalid input! Email and password are required."}
                    ),
                    400,
                )

            # Hash the password using a secure method
            hashed_password = generate_password_hash(
                data["password"], method="pbkdf2:sha256"
            )

            # Convert the 'admin' string to a boolean
            admin_value = data.get("admin", "").lower() in ["true", "1", "yes"]

            # Create a new user
            new_user = User(
                public_id=str(uuid.uuid4()),
                email=data["email"],
                password=hashed_password,
                admin=admin_value,
            )
            db.session.add(new_user)
            db.session.commit()

            # Create a corresponding profile for the new user
            new_profile = Profile(
                user_id=new_user.public_id,  # Link profile to user
                username=data.get(
                    "username", ""
                ),  # Default to empty string if not provided
                email=new_user.email,  # Use same email as user
                bio=data.get("bio", ""),  # Default to empty string if not provided
                profile_picture=data.get(
                    "profile_picture", ""
                ),  # Default to empty string if not provided
            )
            db.session.add(new_profile)
            db.session.commit()

            # Return success message 
            return jsonify({"message": "New user and profile created!"})
        except IntegrityError as e:
            # Catch unique constraint violations or other database errors
            db.session.rollback()  # Rollback changes to avoid partial commits

            # Check if it's a user already existing issue (specific to unique constraint)
            error_message = str(e.orig)  # Capture the original exception message
            if "UNIQUE constraint failed" in error_message:
                # return jsonify({"message": "User with this email already exists!"})
                print(f"Error: {e}")
                response_data = {"message": "User with this email already exists!"}
                response = Response(json.dumps(response_data), status=409, mimetype='application/json')
                return response
            # Generic error handling for other IntegrityErrors
            return Response(json.dumps({"message": "Invalid data or unique constraint error!"}), status=400, mimetype='application/json')

        except Exception as e:
            # Catch any other exceptions
            db.session.rollback()  # Rollback changes to avoid partial commits
            print(f"Error: {e}")  # Log the error for debugging
            return Response(json.dumps({"message": "An Exception error occurred while creating the user."}), status=400, mimetype='application/json')


class PromoteUser(Resource):
    @token_required
    def put(self, current_user, public_id):
        if not current_user.admin:
            return jsonify({"message": "Cannot perform that function!"})

        user = User.query.filter_by(public_id=public_id).first()
        if not user:
            return jsonify({"message": "No user found!"})

        user.admin = True
        db.session.commit()

        return jsonify({"message": "The user has been promoted!"})


class DeleteUser(Resource):
    @token_required
    def delete(self, current_user, public_id):
        if not current_user.admin:
            return jsonify({"message": "Cannot perform that function!"})

        user = User.query.filter_by(public_id=public_id).first()

        if not user:
            return jsonify({"message": "No user found!"})

        db.session.delete(user)
        db.session.commit()

        return jsonify({"message": "The user has been deleted!"})


api.add_resource(UserResource, "/user")
api.add_resource(UserId, "/user/<public_id>")
api.add_resource(CreateUser, "/user/create")
api.add_resource(PromoteUser, "/user/promote/<public_id>")
api.add_resource(DeleteUser, "/user/delete/<public_id>")


@user_blue.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400
