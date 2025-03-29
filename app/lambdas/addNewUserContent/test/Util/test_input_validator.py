import pytest
from src.Util.input_validator import InputValidator

@pytest.fixture
def valid_event():
    return {
        "user_id": "e4283478-8091-70d0-8813-6006f20efbdb",
        "s3_key": "user-content/test-image.jpg",
        "title": "Test Title",
        "description": "Test Description",
        "content_type": "image",
    }

@pytest.fixture
def invalid_event():
    return {
        "user_id": 12345,  # Invalid type
        "s3_key": None,  # Invalid type
        "title": "A" * 51,  # Exceeds max length
        "description": "A" * 251,  # Exceeds max length
        "content_type": "invalid_type",  # Not in valid_content_types
    }

def test_validate_success(valid_event):
    """
    Test that a valid event passes all validations.
    """
    validator = InputValidator(valid_event)
    assert validator.validate() is True
    assert validator.get_validated_event() == valid_event
    assert validator.get_error_messages() == []

def test_validate_failure(invalid_event):
    """
    Test that an invalid event fails validation and collects error messages.
    """
    validator = InputValidator(invalid_event)
    assert validator.validate() is False
    assert len(validator.get_error_messages()) == 1
    assert "user_id must be a string" in validator.get_error_messages()

def test_validate_user_id_missing():
    """
    Test that missing user_id fails validation.
    """
    event = {"s3_key": "test-key", "title": "Test", "content_type": "image"}
    validator = InputValidator(event)
    assert validator.validate() is False
    assert "Missing user_id" in validator.get_error_messages()

def test_validate_s3_key_missing():
    """
    Test that missing s3_key fails validation.
    """
    event = {"user_id": "test-user", "title": "Test", "content_type": "image"}
    validator = InputValidator(event)
    assert validator.validate() is False
    assert "Missing s3_key" in validator.get_error_messages()

def test_validate_title_exceeds_length():
    """
    Test that a title exceeding max length fails validation.
    """
    event = {
        "user_id": "test-user",
        "s3_key": "test-key",
        "title": "A" * 51,  # Exceeds max length
        "content_type": "image",
    }
    validator = InputValidator(event)
    assert validator.validate() is False
    assert "title length of 51 characters" in validator.get_error_messages()

def test_validate_description_exceeds_length():
    """
    Test that a description exceeding max length fails validation.
    """
    event = {
        "user_id": "test-user",
        "s3_key": "test-key",
        "title": "Test",
        "description": "A" * 251,  # Exceeds max length
        "content_type": "image",
    }
    validator = InputValidator(event)
    assert validator.validate() is False
    assert "description exceeds maximum length of 250 characters" in validator.get_error_messages()

def test_validate_content_type_invalid():
    """
    Test that an invalid content_type fails validation.
    """
    event = {
        "user_id": "test-user",
        "s3_key": "test-key",
        "title": "Test",
        "content_type": "invalid_type",  # Not in valid_content_types
    }
    validator = InputValidator(event)
    assert validator.validate() is False
    assert "Invalid content_type. Must be one of ['image', 'story', 'audio', 'video']" in validator.get_error_messages()

def test_get_response_on_failure(invalid_event):
    """
    Test that get_response returns the correct failure response.
    """
    validator = InputValidator(invalid_event)
    validator.validate()
    response = validator.get_response()
    assert response["statusCode"] == 400
    assert response["body"]["status"] == "FAILURE"
    assert len(response["body"]["errors"]) == 1

def test_get_success_response(valid_event):
    """
    Test that get_success_response returns the correct success response.
    """
    validator = InputValidator(valid_event)
    validator.validate()
    response = validator.get_success_response()
    assert response["statusCode"] == 200
    assert response["body"]["status"] == "SUCCESS"
    assert response["body"]["validated_event"] == valid_event
