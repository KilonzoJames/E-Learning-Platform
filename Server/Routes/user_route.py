from flask import Blueprint, jsonify, request
from flask_restful import Resource, Api
from marshmallow import ValidationError
from werkzeug.security import generate_password_hash
import uuid

from .auth import token_required
from ..Models.user import User
from ..Models.profile import Profile
from ..Models.MarshmallowSchemas.user_schema import UserSchema
from ..Models.config import db

user_blue = Blueprint('user', __name__)
api = Api(user_blue)

class UserResource(Resource):
    @token_required
    def get(self, current_user):
        if not current_user.admin:
            return jsonify({'message' : 'Cannot perform that function!'})

        users = User.query.all()
        user_schema = UserSchema(many=True)
        json_string = user_schema.dump(users) # Serialize the user list to a JSON string

        # Return the JSON string directly
        return {"results": json_string}
    

class UserId(Resource):
    @token_required
    def get(self, current_user, public_id):
        if not current_user.admin:
            return jsonify({'message' : 'Cannot perform that function!'})
        
        user = User.query.filter_by(public_id=public_id).first()
        if not user:
            return jsonify({'message': 'No user found!'})

        schema = UserSchema()
        return schema.dump(user)
    
class CreateUser(Resource):
    # @token_required
    def post(self):
        # if not current_user.admin:
        #     return jsonify({'message' : 'Cannot perform that function!'})
        
        data = request.get_json()  # Get JSON data from request

        # Log the incoming data to see what the backend is receiving
        print("Incoming request data:", data)

        if not data or 'email' not in data or 'password' not in data:
            return jsonify({'message': 'Invalid input!'}), 400

        hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
        # Convert the 'admin' string to a boolean
        admin_value = data.get('admin', '').lower() in ['true', '1', 'yes']
        new_user = User(public_id=str(uuid.uuid4()), email=data['email'], password=hashed_password, admin=admin_value)
        db.session.add(new_user)
        db.session.commit()

        # Create a corresponding profile for the user
        new_profile = Profile(
            user_id=new_user.public_id,  # Link the profile to the user
            username=data.get('username', ''),  # Default to empty string if not provided
            email=new_user.email,  # Use the same email as the user
            bio=data.get('bio', ''),  # Default to empty string if not provided
            profile_picture=data.get('profile_picture', '')  # Default to empty string if not provided
        )
        db.session.add(new_profile)
        db.session.commit()  # Commit the profile to the database

        return jsonify({'message': 'New user and profile created!'})
    
class PromoteUser(Resource):
    @token_required
    def put(self, current_user, public_id):
        if not current_user.admin:
            return jsonify({'message' : 'Cannot perform that function!'})
        
        user = User.query.filter_by(public_id=public_id).first()
        if not user:
            return jsonify({'message': 'No user found!'})

        user.admin = True
        db.session.commit()

        return jsonify({'message': 'The user has been promoted!'})

class DeleteUser(Resource):
    @token_required
    def delete(self, current_user, public_id):
        if not current_user.admin:
            return jsonify({'message' : 'Cannot perform that function!'})
        
        user = User.query.filter_by(public_id=public_id).first()

        if not user:
            return jsonify({'message' : 'No user found!'})

        db.session.delete(user)
        db.session.commit()

        return jsonify({'message' : 'The user has been deleted!'})


api.add_resource(UserResource, '/user')
api.add_resource(UserId, "/user/<public_id>")
api.add_resource(CreateUser, '/user/create')
api.add_resource(PromoteUser, '/user/promote/<public_id>')
api.add_resource(DeleteUser, '/user/delete/<public_id>')

@user_blue.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400