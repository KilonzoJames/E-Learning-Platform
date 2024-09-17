from flask_restful import Resource, Api
from flask import Blueprint, jsonify
from marshmallow import ValidationError

from .auth import token_required
from ..Models.profile import Profile
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
        profile = Profile.query.filter_by(public_id=public_id).first()
        schema = ProfileSchema()
        return schema.dump(profile)

api.add_resource(ProfileResource, '/profile')
api.add_resource(ProfileId, "/profile/<int:public_id>")

@profile_blue.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400
