from sqlalchemy import UniqueConstraint
from .config import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String())
    admin = db.Column(db.Boolean)
    
    # Explicitly defining a unique constraint on 'email'
    __table_args__ = (
        UniqueConstraint('email', name='uq_user_email'),
    )
    # Define relationship with Comment
    comments = db.relationship('Comment', backref='author')

    def __repr__(self):
        return f"<User(id={self.email}, with Id '{self.id}')>"