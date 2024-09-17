from flask import Blueprint, jsonify
from flask_restful import Resource, Api
from marshmallow import ValidationError

from .auth import token_required
from ..Models.comment import Comment
from ..Models.MarshmallowSchemas.comment_schema import CommentSchema

comment_blue = Blueprint('comment', __name__)
api = Api(comment_blue)

class CommentResource(Resource):
    # @token_required
    def get(self):
        comments = Comment.query.all()
        comment_schema = CommentSchema(many=True)
        json_string = comment_schema.dump(comments)
        return {"results": json_string}

class CommentId(Resource):
    @token_required
    def get(self, public_id):
        comment = Comment.query.filter_by(public_id=public_id).first()
        schema = CommentSchema()
        return schema.dump(comment)

api.add_resource(CommentResource, '/comments')
api.add_resource(CommentId, "/comments/<int:id>")

@comment_blue.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400
