import jwt
import datetime
from functools import wraps
from flask import Blueprint, request, jsonify, current_app, make_response
from marshmallow import ValidationError
from werkzeug.security import check_password_hash, generate_password_hash
from flask_restful import Resource, Api
from ..Models.config import secret_key
from ..Models.user import User

# Blueprint for authentication routes
auth = Blueprint('auth', __name__)
api = Api(auth)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message' : 'Token is missing!'}), 401

        try: 
             # Use current_app to access the config in the decorator
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(public_id=data['public_id']).first()
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid!'}), 401

        return f(current_user, *args, **kwargs)

    return decorated


class Login(Resource):
    def post(self):
        # auth = request.authorization

        # Check if the authorization header is missing or empty
        # if not auth or not auth.username or not auth.password:
        #     return make_response( jsonify({'message': 'Authorization header missing or incomplete'}),
        #         401,
        #         {'WWW-Authenticate': 'Basic realm="Login required!"'}
        #     )
        
        # Get JSON data from request
        data = request.get_json()  
        print(data)
        # Find the user by email & Check if the password is incorrect
        user = User.query.filter_by(email=data['email']).first()
        print("User Found:", user)  # Debug if user is found correctly

        if not user or not check_password_hash(user.password, data['password']):
            return make_response(jsonify({'message': 'Invalid email  or password'}),
                401,
                {'WWW-Authenticate': 'Basic realm="Login required!"'}
            )

        token = jwt.encode({
            'public_id' : user.public_id, 
            'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, current_app.config['SECRET_KEY'])

        return jsonify({"token": token, "public_id": user.public_id })    

class Logout(Resource):
    @token_required
    def delete(self):
        return {"Message": "You have been Logged out Successfully!"}


# Define routes and link them to resources
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
# api.add_resource(ResetPassword, '/resetpassword')
# api.add_resource(ConfirmEmail, '/confirm_email/<token>')

@auth.errorhandler(ValidationError)
def handle_marshmallow_error(e):
    return (e.messages), 400