from .config import db

post_comment = db.Table('post_comment', 
                        db.Column('post_id', db.Integer, db.ForeignKey('posts.id')), 
                        db.Column('comment_id', db.Integer, db.ForeignKey('comments.id')))