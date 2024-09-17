from datetime import datetime
from .config import db
from .post_comment import post_comment

class Post(db.Model):
    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Foreign key linking to User
    title = db.Column(db.String(100))
    content = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    edited_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    
    # # Define relationship with User
    user = db.relationship('User', backref='posts')
    # # Define relationship with Comment
    posts = db.relationship('Comment', secondary=post_comment, backref='comments')

    def __repr__(self):
        return f'<Post {self.title}, published at {self.created_at}.>'