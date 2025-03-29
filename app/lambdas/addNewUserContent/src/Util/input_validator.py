import logging

class InputValidator:
    def __init__(self, event: dict):
        self.event = event
        self.validated_event = {}
        self.error_messages = []
        self.max_title_length = 50
        self.max_description_length = 250
        self.valid_content_types = ['image', 'story', 'audio', 'video']

    def validate(self) -> bool:
        """
        Validates the input data.

        Returns:
            bool: True if validation is successful, False otherwise.
        """
        if not self.validate_user_id():
            return False
        if not self.validate_s3_key():
            return False
        if not self.validate_title():
            return False
        if not self.validate_description():
            return False
        if not self.validate_content_type():
            return False

        return True

    def validate_user_id(self) -> bool:
        """
        Validates the user ID.
        Returns:
            bool: True if user ID is valid, False otherwise.
        """
        if 'user_id' not in self.event:
            self.error_messages.append("Missing user_id")
            return False
        if not isinstance(self.event['user_id'], str):
            self.error_messages.append("user_id must be a string")
            return False
        self.validated_event['user_id'] = self.event['user_id']
        return True

    def validate_s3_key(self) -> bool:
        """
        Validates the S3 key.
        Returns:
            bool: True if S3 key is valid, False otherwise.
        """
        if 's3_key' not in self.event:
            self.error_messages.append("Missing s3_key")
            return False
        if not isinstance(self.event['s3_key'], str):
            self.error_messages.append("s3_key must be a string")
            return False
        self.validated_event['s3_key'] = self.event['s3_key']
        return True

    def validate_title(self) -> bool:
        """
        Validates the title.
        Returns:
            bool: True if title is valid, False otherwise.
        """ 
        if 'title' not in self.event:
            self.error_messages.append("Missing title")
            return False
        if not isinstance(self.event['title'], str):
            self.error_messages.append("title must be a string")
            return False
        title_len = len(self.event['title'])
        if title_len > self.max_title_length and title_len > 0:
            self.error_messages.append(f"title length of {title_len} characters")
            return False
        self.validated_event['title'] = self.event['title']
        return True

    def validate_description(self) -> bool:
        """
        Validates the description.
        Returns:
            bool: True if description is valid, False otherwise.
        """
        if 'description' in self.event:
            if not isinstance(self.event['description'], str):
                self.error_messages.append("description must be a string")
                return False
            if len(self.event['description']) > self.max_description_length:
                self.error_messages.append(f"description exceeds maximum length of {self.max_description_length} characters")
                return False
        self.validated_event['description'] = self.event.get('description', None)
        return True

    def validate_content_type(self) -> bool:
        """
        Validates the content type.
        Returns:
            bool: True if content type is valid, False otherwise.
        """
        if 'content_type' not in self.event:
            self.error_messages.append("Missing content_type")
            return False
        if not isinstance(self.event['content_type'], str):
            self.error_messages.append("content_type must be a string")
            return False
        if self.event['content_type'] not in self.valid_content_types:
            self.error_messages.append(f"Invalid content_type. Must be one of {self.valid_content_types}")
            return False
        self.validated_event['content_type'] = self.event['content_type']
        return True

    def get_validated_event(self) -> dict:
        """
        Returns the validated event data.
        Returns:
            dict: The validated event data.
        """
        return self.validated_event

    def get_error_messages(self) -> list:
        """
        Returns the error messages.
        Returns:
            list: The error messages.
        """
        return self.error_messages

    def log_errors(self):
        """
        Logs the error messages.
        """
        logger = logging.getLogger()
        logger.setLevel(logging.INFO)
        for error in self.error_messages:
            logger.error(error)

    def get_response(self) -> dict: 
        """
        Returns the response.
        Returns:
            dict: The response data.
        """
        return {
            'statusCode': 400,
            'body': {
                'status': 'FAILURE',
                'errors': self.error_messages,
            },
        }

    def get_success_response(self) -> dict:
        """
        Returns the success response.
        Returns:
            dict: The success response data.
        """
        return {
            'statusCode': 200,
            'body': {
                'status': 'SUCCESS',
                'validated_event': self.validated_event,
            },
        }
