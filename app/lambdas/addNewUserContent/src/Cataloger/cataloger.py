import logging
import boto3
from uuid import uuid4
from datetime import datetime
from botocore.exceptions import ClientError
from src.Util.constants import (
    WEAVE_AND_THE_WHEEL_PROFILES, 
    SHARED_CONTENT, 
    DYNAMODB, 
    SORT_KEY, 
    USER_ID,
    PARTITION_KEY, 
    UPLOAD_DATE, 
    WEAVE_AND_THE_WHEEL_USER_CONTENT,
    TITLE,
    DESCRIPTION,
    CONTENT_TYPE,
    S3_KEY,
    TYPE,
    LOCATION,
    USER_ID
    )

logger = logging.getLogger()
logger.setLevel(logging.INFO)

class Cataloger:
    def __init__(self, event: dict, context: object) -> None:
        """
        Initializes the Cataloger class with the event and context.

        Args:
            event (dict): user and content information.
            context (object): Runtime information of the Lambda function.
        """
        self.event = event
        self.dynamodb = boto3.resource(DYNAMODB)
        self.content_id: str = str(uuid4())
        self.user_id: str = event[USER_ID]
        self.creation_date: str = datetime.now().replace(microsecond=0).isoformat()
        self.profile_table = self.dynamodb.Table(WEAVE_AND_THE_WHEEL_PROFILES)
        self.user_content_table = self.dynamodb.Table(WEAVE_AND_THE_WHEEL_USER_CONTENT)

    def add_content_to_user(self, user_id: str, contentId: str) -> None:
        """
        Appends a new content ID to the shared_content list in the user's profile.

        Args:
            user_id (str): The user's unique ID (partition key).
            contentId (str): The content ID to append to the shared_content list.
        """
        try:
            # Update the shared_content list by appending the new contentId
            self.profile_table.update_item(
                Key={PARTITION_KEY: user_id},
                UpdateExpression="SET #sc = list_append(if_not_exists(#sc, :empty_list), :new_content)",
                ExpressionAttributeNames={
                    "#sc": SHARED_CONTENT
                },
                ExpressionAttributeValues={
                    ":new_content": [contentId],
                    ":empty_list": []
                }
            )
            logger.info(f"Successfully added content ID {contentId} to user {user_id}")
        except ClientError as e:
            logger.error(f"Error adding content ID {contentId} to user {user_id}: {e}")
            raise e
        except KeyError as e:
            logger.error(f"KeyError: Missing required key {e}")
            raise e

    def catalog_content(self) -> bool:
        """
        Catalogs the content by adding it to the user's profile and the user content table.
        """
        try:
            self.add_content_to_user(self.user_id, self.content_id)
            return self.add_content_to_table(self.event, self.creation_date, self.content_id)
        except Exception as e:
            logger.error(f"An error occurred while cataloging content: {e}")
            return False
        return False

    def add_content_to_table(self, event: dict, create_date: str, contentId: str) -> bool:
        """
        Adds new content to the DynamoDB table WeaveAndTheWheelUserContent.

        Args:
            event (dict): User attributes and content information.

        Returns:    
            bool: True if the content was added successfully, False otherwise.
        Raises:
            ValueError: If the content ID is invalid.
            TypeError: If the event structure is incorrect.
            ClientError: If there is an error with DynamoDB.
            KeyError: If required keys are missing in the event.
            Exception: For any other errors.
        """
        try:
            item = {
                PARTITION_KEY: contentId,
                SORT_KEY: event[USER_ID],
                UPLOAD_DATE: create_date,
                TITLE: event[TITLE],
                DESCRIPTION: event.get(DESCRIPTION, ""),
                TYPE: event[CONTENT_TYPE],
                LOCATION: event[S3_KEY],
            }

            response = self.user_content_table.put_item(Item=item)
            if (response['ResponseMetadata']['HTTPStatusCode'] == 200):
                logger.info(f"Content added successfully to DynamoDB: {item}")
                return True
            else:
                logger.error(f"Failed to add content to DynamoDB: {item}")
                return False
        except ValueError as e:
            logger.error(f"ValueError: {e}")
            raise e
        except TypeError as e:
            logger.error(f"TypeError: {e}")
            raise e
        except ClientError as e:
            logger.error(f"Error adding content to DynamoDB: {e}")
            raise e
        except KeyError as e:
            logger.error(f"KeyError missing user info: {e}")
            raise e
        except Exception as e:
            logger.error(f"An error occurred: {e}")
            raise e
        return False
