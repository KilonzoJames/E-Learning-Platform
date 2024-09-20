from flask_restful import Resource, Api
from flask import Blueprint, jsonify
from marshmallow import ValidationError

from .auth import token_required
from ..Models.post import Post
from ..Models.MarshmallowSchemas.post_schema import PostSchema

post_blue = Blueprint('post', __name__)
api = Api(post_blue)

class PostResource(Resource):
    # @token_required
    def get(self):
        posts = Post.query.all()
        post_schema = PostSchema(many=True)
        json_string = post_schema.dump(posts)
        return json_string

class PostId(Resource):
    @token_required
    def get(self, public_id):
        post = Post.query.filter_by(public_id=public_id).first()
        schema = PostSchema()
        return schema.dump(post)

api.add_resource(PostResource, '/posts')
api.add_resource(PostId, "/posts/<int:id>")

@post_blue.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400
