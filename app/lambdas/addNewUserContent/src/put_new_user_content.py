import logging
from src.Cataloger.cataloger import Cataloger
from src.Util.input_validator import InputValidator


logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event: dict, context: object) -> dict:
    """
    Handles the association of uploaded content to the user in the DynamoDB table WeaveAndTheWheelProfiles, and WeaveAndTheWheelUserContent.

    Args:
        event (dict): user and content information.
        context (object): Runtime information of the Lambda function.

    Example:
        {
            'user_id': 'e4283478-8091-70d0-8813-6006f20efbdb', (required, user sub)
            's3_key': 'https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/user-created-content/test_one', (required)
            'title': 'test_one', (required, max 50 characters)
            'description': 'test_one description', (optional, max 250 characters)
            'content_type': 'image', (required, Enum[image, story, audio, video])
        }

    Returns:
        dict: The event data.
    """
    try:
        # Validate the input data
        input_validator = InputValidator(event)
        is_valid = input_validator.validate()
        if not is_valid:
            logger.error(f"Validation errors: {input_validator.error_messages}")
            return {
                'statusCode': 400,
                'body': {
                    'status': 'FAILURE',
                    'error_messages': input_validator.error_messages,
                },
            }
        # Proceed with the cataloging process
        cataloger = Cataloger(event=event, context=context)
        add_to_catalog_successful = cataloger.catalog_content()

        if(add_to_catalog_successful):
            return {
                'statusCode': 200,
                'body': {
                    'status': 'SUCCESS',
                    'content_id': cataloger.content_id,
                    'creation_date': cataloger.creation_date,
                },
            }
    except Exception as e:
        logger.error(f"An error occurred: {e}")

    return {
                'statusCode': 500,
                'body': {
                    'status': 'FAILURE',
                },
            }
