from ..post import Post 
from ..config import ma

class PostSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Post
        load_instance = True
        include_fk = True

    # id = fields.Int(dump_only=True)  # Mark id as read-only
    # public_id = fields.Str(required=True)
    # title = fields.Str(required=True)
    # content = fields.Str(required=True)
    # created_at = fields.DateTime()  # Add this if your model has a date field
    # # Add other fields as per your model
