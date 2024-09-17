from ..comment import Comment 
from ..config import ma

class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        load_instance = True
        include_fk = True

    # id = ma.auto_field(dump_only=True)  # Mark id as read-only
    # content = ma.auto_field()
    # post_id = ma.auto_field()
    # created_at = ma.auto_field()
