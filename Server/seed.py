from datetime import datetime
from werkzeug.security import generate_password_hash
from .app import app  # Import the Flask app
from .Models.config import db
from .Models.user import User
from .Models.comment import Comment
from .Models.post import Post
from .Models.profile import Profile

def seed_data():
    with app.app_context():
        print("🌱 Dropping existing tables...")
        db.drop_all()  # Drop all tables
        print("🌱 Creating new tables...")
        db.create_all()  # Create new tables

        print("🌱 Seeding data...")

        # Sample data for Users with hashed passwords
        users = [
            User(email="alice@example.com", public_id="722577344", admin=True, password=generate_password_hash("password1")),
            User(email="bob@example.com", public_id="0744556688", admin=False, password=generate_password_hash("password2")),
            User(email="charlie@example.com", public_id="722577345", admin=True, password=generate_password_hash("password3")),
            User(email="david@example.com", public_id="4444444444", admin=False, password=generate_password_hash("password4")),
        ]
        db.session.add_all(users)
        db.session.commit()

        # Sample data for Profiles
        profiles = [
            Profile(email="david@example.com", public_id=1, bio="Alice's bio", profile_picture="https://unsplash.com/photos/brown-starfish-on-blue-sand-2M_sDJ_agvs"),
            Profile(email="david@example.com", public_id=2, bio="Bob's bio", profile_picture="https://unsplash.com/photos/brown-starfish-on-blue-sand-2M_sDJ_agvs"),
            Profile(email="david@example.com", public_id=3, bio="Charlie's bio", profile_picture="https://unsplash.com/photos/brown-starfish-on-blue-sand-2M_sDJ_agvs"),
            Profile(email="david@example.com", public_id=4, bio="David's bio", profile_picture="https://unsplash.com/photos/brown-starfish-on-blue-sand-2M_sDJ_agvs"),
        ]
        db.session.add_all(profiles)
        db.session.commit()

        # Sample data for Posts
        posts = [
            Post(public_id=1, title="Alice's first post", content="This is the content of Alice's first post", created_at=datetime.utcnow()),
            Post(public_id=2, title="Bob's first post", content="This is the content of Bob's first post", created_at=datetime.utcnow()),
            Post(public_id=3, title="Charlie's first post", content="This is the content of Charlie's first post", created_at=datetime.utcnow()),
            Post(public_id=4, title="David's first post", content="This is the content of David's first post", created_at=datetime.utcnow()),
        ]
        db.session.add_all(posts)
        db.session.commit()

        # Sample data for Comments
        comments = [
            Comment(user_id=1, post_id=1, content="Alice's comment on her own post", created_at=datetime.utcnow()),
            Comment(user_id=2, post_id=2, content="Bob's comment on his own post", created_at=datetime.utcnow()),
            Comment(user_id=3, post_id=3, content="Charlie's comment on his own post", created_at=datetime.utcnow()),
            Comment(user_id=4, post_id=4, content="David's comment on his own post", created_at=datetime.utcnow()),
        ]
        db.session.add_all(comments)
        db.session.commit()

        print("✅ Seeding completed!")

if __name__ == '__main__':
    with app.app_context():
        seed_data()