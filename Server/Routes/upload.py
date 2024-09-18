import os
from dotenv import load_dotenv
import cloudinary.uploader
from flask import Blueprint, request
from flask_restful import Api, Resource
from ..Models.profile import Profile
from ..Models.config import db
from ..Models.user import User

dotenv_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env.cloudinary')
loaded = load_dotenv(dotenv_path)

# Access Cloudinary credentials
cloudinary_api_key = os.getenv("CLOUDINARY_API_KEY")
cloudinary_api_secret = os.getenv("CLOUDINARY_API_SECRET")
cloudinary_cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME")
# Configure Cloudinary
cloudinary.config(
    cloud_name=cloudinary_cloud_name,
    api_key=cloudinary_api_key,
    api_secret=cloudinary_api_secret
)

upload = Blueprint("cloud", __name__)
api = Api(upload)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class Upload(Resource):
    def post(self, public_id): 
        # Retrieve the user
        user = User.query.filter_by(public_id=public_id).first()
        profile = Profile.query.filter_by(user_id=user.public_id).first()
        if profile is None:
            return {'message': 'Profile not found'}, 40
        
        # Check if the 'file' key exists in the request.files
        if 'file' not in request.files:
            return {'message': 'No file part'}, 400

        file = request.files['file']
        
        # Validate the file type
        if not allowed_file(file.filename):
            return {'message': 'Invalid file type. Supported types are: png, jpg, jpeg, gif'}, 400

        # Upload the image to Cloudinary
        try:
            result = cloudinary.uploader.upload(file)
            image_url = result['secure_url']

            # Update the user's profile picture URL
            profile.profile_picture = image_url

            db.session.commit()
            response_data = {
                'message': 'Profile picture uploaded and updated successfully',
                'url': image_url
            }

            return response_data, 200
        except Exception as e:
            return {'message': f'Error uploading image: {str(e)}'}, 500
    
api.add_resource(Upload, '/upload-profile-picture/<string:public_id>')  # Make sure to specify the type of the ID