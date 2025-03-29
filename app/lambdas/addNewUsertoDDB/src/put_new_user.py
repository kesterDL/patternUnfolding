import logging
import boto3
from datetime import datetime
from botocore.exceptions import ClientError
from Util.constants import (WEAVE_AND_THE_WHEEL_PROFILES, REQUEST, USER_ATTRIBUTES, DYNAMODB, EMAIL, PREFERRED_USERNAME, SUB,PARTION_KEY, CREATION_DATE, SHARED_CONTENT, PROFILE_PIC)

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event: dict, context: object) -> dict:
    """
    Handles the PostConfirmation_ConfirmSignUp event from Cognito and adds the user to the DynamoDB table.
    Lambda named: putNewUser

    Args:
        event (dict): Event data from Cognito, including user attributes.
        context (object): Runtime information of the Lambda function.

    Example:
        {
            'userName': 'e4283478-8091-70d0-8813-6006f20efbdb',
            'triggerSource': 'PostConfirmation_ConfirmSignUp',
            'request': {
                'userAttributes': {
                    'sub': 'e4283478-8091-70d0-8813-6006f20efbdb',
                    'email_verified': 'true',
                    'cognito:user_status': 'CONFIRMED',
                    'preferred_username': 'AvElaMin',
                    'email': 'glimpsesOfThePattern@gmail.com'
                }
            },
            'response': {}
        }

    Returns:
        dict: The event data.
    """
    try:
        add_user_to_dynamodb(event[REQUEST][USER_ATTRIBUTES])
    except Exception as e:
        logger.error(f"An error occurred: {e}")
    return event

def add_user_to_dynamodb(user_attributes: dict) -> None:
    """
    Adds a new user to the DynamoDB table WeaveAndTheWheelProfiles.

    Args:
        user_attributes (dict): User attributes from the Cognito event.
    """
    try:
        dynamodb = boto3.resource(DYNAMODB)
        table = dynamodb.Table(WEAVE_AND_THE_WHEEL_PROFILES)
        creation_date = datetime.now().replace(microsecond=0).isoformat()

        item = {
            PARTION_KEY: user_attributes[SUB],
            EMAIL: user_attributes[EMAIL],
            PREFERRED_USERNAME: user_attributes[PREFERRED_USERNAME],
            SHARED_CONTENT: [],
            CREATION_DATE: creation_date,
            PROFILE_PIC: "https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/eyeless.webp"
        }

        table.put_item(Item=item)
    except ClientError as e:
        logger.error(f"Error adding user to DynamoDB: {e}")
    except KeyError as e:
        logger.error(f"KeyError missing user info: {e}")
