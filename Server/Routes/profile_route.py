from flask_restful import Resource, Api
from flask import Blueprint, jsonify, request
from marshmallow import ValidationError
from uuid import UUID

from .auth import token_required
from ..Models.profile import Profile
from ..Models.user import User
from ..Models.config import db
from ..Models.MarshmallowSchemas.profile_schema import ProfileSchema

profile_blue = Blueprint('profile', __name__)
api = Api(profile_blue)

class ProfileResource(Resource):
    # @token_required
    def get(self):
        profiles = Profile.query.all()
        profile_schema = ProfileSchema(many=True)
        json_string = profile_schema.dump(profiles)
        return {"results": json_string}

class ProfileId(Resource):
    # @token_required 
    def get(self, public_id):
        try:
            UUID(public_id, version=4)
        except ValueError:
            return jsonify({'message': 'Invalid UUID format!'}), 400
        
        user = User.query.filter_by(public_id=public_id).first()
        if not user:
            return jsonify({'message': 'No user found!'}), 404
        
        profile = Profile.query.filter_by(user_id=user.public_id).first()
        if not profile:
            return jsonify({'message': 'No profile found!'}), 404
        schema = ProfileSchema()
        return schema.dump(profile)
    
class ProfilePut(Resource):
     def put(self, public_id):
        try:
            UUID(public_id, version=4)
        except ValueError:
            return jsonify({'message': 'Invalid UUID format!'}), 400

        data = request.get_json()
        user = User.query.filter_by(public_id=public_id).first()
        if not user:
            return jsonify({'message': 'No user found!'}), 404
        
        profile = Profile.query.filter_by(user_id=user.public_id).first()
        if not profile:
            return jsonify({'message': 'No profile found!'}), 404

        # Update profile fields
        profile.username = data.get('username', profile.username)
        profile.email = data.get('email', profile.email)
        profile.bio = data.get('bio', profile.bio)
        profile.profile_picture = data.get('profile_picture', profile.profile_picture)
        
        db.session.commit()
        
        schema = ProfileSchema()
        return schema.dump(profile)

api.add_resource(ProfileResource, '/profile')
api.add_resource(ProfileId, "/profile/<string:public_id>")
api.add_resource(ProfilePut, "/profile/<string:public_id>")

@profile_blue.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400
