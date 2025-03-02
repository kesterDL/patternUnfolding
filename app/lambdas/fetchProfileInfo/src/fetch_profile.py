import json
import os
import boto3
from botocore.exceptions import ClientError
from Utils.check_cors import check_cors_call
import base64
import jwt
from jwt.exceptions import InvalidTokenError

def lambda_handler(event, context):
    '''
    {
        "httpMethod": "POST",
        "jwt": "JWT_TOKEN",
    }
    '''
    if event.get("httpMethod") == "OPTIONS":
        return check_cors_call(event)
    # Parse form data from the incoming event
    jwt_token = event.get('jwt')
    if not jwt_token:
        return {
            "statusCode": 400,
            "body": json.dumps("Missing User Info")
        }

    # Validate and decode the JWT
    try:
        cognito_key: str = os.environ['COGNITO_KEY']
        decoded_token = jwt.decode(jwt_token, cognito_key, algorithms=['RS256'])
    except InvalidTokenError as e:
        return {
            "statusCode": 400,
            "body": json.dumps(f"Invalid Credentials")
        }

    sub = decoded_token.get('sub')
    # Log the decoded token for debugging purposes
    print("========================= Decoded Token:", sub)

