from datetime import datetime
from .config import db

class Comment(db.Model):
    __tablename__ = 'comments'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String, db.ForeignKey('users.public_id'), nullable=False)  # Reference to users.id
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)  # Foreign key linking to Post
    content = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

  
    # Define relationship with Post
    post = db.relationship('Post', backref='comments')
        
    def __repr__(self):
        return f'<Comment {self.content}, posted at {self.created_at}.>'
    