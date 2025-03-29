import pytest
from src.put_new_user_content import lambda_handler


@pytest.fixture
def event():
    return {
        'user_id': 'e4283478-8091-70d0-8813-6006f20efbdb',
        's3_key': 'https://weave-and-the-wheel-public-images.s3.us-east-1.amazonaws.com/user-created-content/test_one',
        'title': 'test_one',
        'description': 'test_one description',
        'content_type': 'image',
    }


@pytest.fixture
def context():
    return {}


def test_lambda_handler_success(monkeypatch, event, context):
    """
    Test that lambda_handler returns a success response when cataloging content succeeds.
    """

    class MockCataloger:
        def __init__(self, event, context):
            self.content_id = "mock-content-id"
            self.creation_date = "2025-03-28T14:45:30Z"

        def catalog_content(self):
            return True

    monkeypatch.setattr("src.put_new_user_content.Cataloger", MockCataloger)

    response = lambda_handler(event, context)

    assert response["statusCode"] == 200
    assert response["body"]["status"] == "SUCCESS"
    assert response["body"]["content_id"] == "mock-content-id"
    assert response["body"]["creation_date"] == "2025-03-28T14:45:30Z"


def test_lambda_handler_failure(monkeypatch, event, context):
    """
    Test that lambda_handler returns a failure response when cataloging content fails.
    """

    class MockCataloger:
        def __init__(self, event, context):
            self.content_id = "mock-content-id"
            self.creation_date = "2025-03-28T14:45:30Z"

        def catalog_content(self):
            return False

    monkeypatch.setattr("src.put_new_user_content.Cataloger", MockCataloger)

    response = lambda_handler(event, context)

    assert response["statusCode"] == 500
    assert response["body"]["status"] == "FAILURE"


def test_lambda_handler_exception(monkeypatch, event, context):
    """
    Test that lambda_handler handles exceptions and returns a failure response.
    """

    class MockCataloger:
        def __init__(self, event, context):
            raise Exception("Mock exception")

    monkeypatch.setattr("src.put_new_user_content.Cataloger", MockCataloger)

    response = lambda_handler(event, context)

    assert response["statusCode"] == 500
    assert response["body"]["status"] == "FAILURE"
