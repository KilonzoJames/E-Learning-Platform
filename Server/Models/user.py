from .config import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(100))
    password = db.Column(db.String(80))
    admin = db.Column(db.Boolean)

    # Define relationship with Comment
    comments = db.relationship('Comment', backref='author')

    def __repr__(self):
        return f"<User(id={self.email}, with Id '{self.id}')>"