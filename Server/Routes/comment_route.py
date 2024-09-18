from flask import Blueprint, jsonify, request
from flask_restful import Resource, Api
from marshmallow import ValidationError

from .auth import token_required
from ..Models.comment import Comment
from ..Models.user import User
from ..Models.MarshmallowSchemas.comment_schema import CommentSchema
from ..Models.config import db

comment_blue = Blueprint('comment', __name__)
api = Api(comment_blue)

class CommentResource(Resource):
    # @token_required
    def get(self):
        comments = Comment.query.all()
        comment_schema = CommentSchema(many=True)
        json_string = comment_schema.dump(comments)
        return json_string

class CommentId(Resource):
    # @token_required
    def get(self, public_id):
        comment = Comment.query.filter_by(public_id=public_id).first()
        schema = CommentSchema()
        return schema.dump(comment)
class CommentPost(Resource):
    def post(self, public_id):
        data = request.get_json()
        new_comment = Comment(content=data['comment'], user_id=data['public_id'], post_id=data['post_id'])
        db.session.add(new_comment)
        db.session.commit()
class CommentDelete(Resource):
    def delete(self, public_id):\
        # Find the user by public_id
        user = User.query.filter_by(public_id=public_id).first()
        if not user:
            return {'message': 'User not found'}
         # Check if the user has any comments
        comment = Comment.query.filter_by(user_id=user.id).first()
        if not comment:
            return {'message': 'Comment not found'}
        db.session.delete(comment)
        db.commit()
api.add_resource(CommentResource, '/comments')
api.add_resource(CommentId, "/comments/<string:public_id>")
api.add_resource(CommentPost, "/comments/<string:public_id>")
api.add_resource(CommentDelete, "/comments/<string:public_id>")

@comment_blue.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return jsonify(e.messages), 400
