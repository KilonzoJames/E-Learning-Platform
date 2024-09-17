from ..user import User
from ..config import ma

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True  # Allows deserialization to model instances
        include_fk = True     # Include foreign key fields if there are relationships
        
    # id = ma.auto_field()
    # public_id = ma.auto_field()
    # email = ma.auto_field()
    # password = ma.auto_field()
    # admin = ma.auto_field()
