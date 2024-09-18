from datetime import datetime
from .config import db

class Profile(db.Model):
    __tablename__ = "profiles"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.public_id'), nullable=False)  # Foreign key linking to User
    username = db.Column(db.String(100))
    email = db.Column(db.String(100))
    bio = db.Column(db.String(255))
    profile_picture = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Define relationship with User
    user = db.relationship('User', backref='profiles')


    def __repr__(self):
        return f"<Profile(id={self.username}, created at '{self.created_at}')>"