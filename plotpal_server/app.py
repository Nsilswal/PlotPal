from flask import Flask, request, jsonify
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
app.secret_key = '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'
GOOGLE_CLIENT_ID = '201155962894-g4bsvj7jpl11l3j093q5ap4jbv8nvufc.apps.googleusercontent.com'

@app.route('/')
def index():
    return 'Welcome to the Google Login Demo'

@app.route('/callback', methods=['POST'])
def callback():
    token = request.json.get('token')
    try:
        id_info = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        if id_info['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
            raise ValueError('Wrong issuer.')

        # ID token is valid. Get the user's Google Account ID from the decoded token.
        user_id = id_info['sub']
        email = id_info['email']
        return jsonify({'user_id': user_id, 'email': email})
    except ValueError as e:
        # Invalid token
        return 'Token verification failed: {}'.format(e), 400

if __name__ == '__main__':
    app.run(debug=True)
