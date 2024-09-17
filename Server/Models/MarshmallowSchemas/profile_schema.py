from ..profile import Profile
from ..config import ma

class ProfileSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Profile
        load_instance = True  # If you want to deserialize input to model instances
        include_fk = True     # If your model has foreign key relationships
        # exclude = ["created_at" ]

    # You can also customize fields if needed
    # id = ma.auto_field()  # Mark id as read-only
    # username = ma.auto_field()
    # public_id = ma.auto_field()
    # bio = ma.auto_field()
    # profile_picture = ma.auto_field()
